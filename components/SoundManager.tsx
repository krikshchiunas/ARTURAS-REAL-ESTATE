"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Звуковой слой редизайна (как у референса): эмбиент-луп + короткие UI-звуки.
// Всё через WebAudio, буферы грузятся лениво только после включения звука —
// до этого ни одного сетевого запроса и ни одного AudioContext (автоплей-политики).
// Выбор пользователя живёт в localStorage; по умолчанию звук выключен.

export type UiSound = "hover" | "click" | "modal";

const SOUND_FILES: Record<UiSound | "ambient", string> = {
  hover: "/audio/hover.wav",
  click: "/audio/click.wav",
  modal: "/audio/modal-open.wav",
  ambient: "/audio/ambient-loop.wav",
};

const UI_GAIN: Record<UiSound, number> = {
  hover: 0.5,
  click: 0.7,
  modal: 0.8,
};

const AMBIENT_GAIN = 0.35;
const STORAGE_KEY = "arturas-sound";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: UiSound) => void;
};

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const ambientRef = useRef<{ src: AudioBufferSourceNode; gain: GainNode } | null>(null);
  // Троттлинг hover-звука: плотная сетка ссылок не должна «трещать».
  const lastHoverRef = useRef(0);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "on") setEnabled(true);
  }, []);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const loadBuffer = useCallback(
    async (key: keyof typeof SOUND_FILES) => {
      const cached = buffersRef.current.get(key);
      if (cached) return cached;
      const res = await fetch(SOUND_FILES[key]);
      const buf = await getCtx().decodeAudioData(await res.arrayBuffer());
      buffersRef.current.set(key, buf);
      return buf;
    },
    [getCtx],
  );

  const startAmbient = useCallback(async () => {
    if (ambientRef.current) return;
    const ctx = getCtx();
    const buffer = await loadBuffer("ambient");
    // Пока буфер грузился, звук могли успеть выключить.
    if (ambientRef.current || localStorage.getItem(STORAGE_KEY) !== "on") return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(AMBIENT_GAIN, ctx.currentTime + 2.5);
    src.connect(gain).connect(ctx.destination);
    src.start();
    ambientRef.current = { src, gain };
  }, [getCtx, loadBuffer]);

  const stopAmbient = useCallback(() => {
    const ambient = ambientRef.current;
    const ctx = ctxRef.current;
    if (!ambient || !ctx) return;
    ambientRef.current = null;
    ambient.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    ambient.src.stop(ctx.currentTime + 0.7);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      if (next) {
        void startAmbient();
        // Прогреваем короткие звуки заранее — первый hover не должен запаздывать.
        void loadBuffer("hover");
        void loadBuffer("click");
        void loadBuffer("modal");
      } else {
        stopAmbient();
      }
      return next;
    });
  }, [loadBuffer, startAmbient, stopAmbient]);

  // Если звук был включён в прошлой сессии, эмбиент можно запускать только
  // после первого жеста пользователя — иначе браузер заблокирует AudioContext.
  useEffect(() => {
    if (!enabled || ambientRef.current) return;
    const resume = () => void startAmbient();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [enabled, startAmbient]);

  useEffect(() => () => stopAmbient(), [stopAmbient]);

  const play = useCallback(
    (name: UiSound) => {
      if (!enabled) return;
      if (name === "hover") {
        const now = performance.now();
        if (now - lastHoverRef.current < 90) return;
        lastHoverRef.current = now;
      }
      void (async () => {
        const ctx = getCtx();
        const buffer = await loadBuffer(name);
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = UI_GAIN[name];
        src.connect(gain).connect(ctx.destination);
        src.start();
      })();
    },
    [enabled, getCtx, loadBuffer],
  );

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// Тумблер «Sound On/Off» в стиле HUD: mono-подпись + мигающий индикатор-точка.
export function SoundToggle({ labels }: { labels: { on: string; off: string } }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className="group inline-flex items-center gap-2 font-mono text-11 uppercase tracking-4 text-offwhite/60 transition-colors duration-300 hover:text-offwhite"
    >
      <span
        className={`inline-block h-1 w-1 ${
          enabled ? "animate-pulse bg-offwhite" : "bg-offwhite/30"
        }`}
        aria-hidden
      />
      {enabled ? labels.on : labels.off}
    </button>
  );
}
