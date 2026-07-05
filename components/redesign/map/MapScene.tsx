"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MapControls, Html } from "@react-three/drei";
import type { ProjectPin } from "@/components/redesign/map/phuketGeo";
import { REGIONS } from "@/components/redesign/map/phuketGeo";

// ─── Маска острова ───────────────────────────────────────────────────────────
// Стилизованный силуэт Пхукета: вытянутый с севера на юг, с изрезанным
// западным побережьем. Возвращает 0 (море) … 1 (центр суши).
function islandMask(x: number, z: number): number {
  // Базовый эллипс.
  let d = Math.hypot(x / 22, z / 34);
  // Волнистость береговой линии.
  const coast = 0.12 * Math.sin(z * 0.18) + 0.08 * Math.sin(x * 0.3 + z * 0.1);
  d += coast;
  // Западный «залив» (выемка под пляжи), где стоят проекты.
  const bay = Math.exp(-((x + 16) ** 2) / 60 - (z ** 2) / 900) * 0.25;
  d += bay;
  return THREE.MathUtils.clamp(1 - d, 0, 1);
}

function terrainHeight(x: number, z: number): number {
  const mask = islandMask(x, z);
  if (mask <= 0.02) return -0.5; // морское дно
  const hills =
    Math.sin(x * 0.25) * Math.cos(z * 0.2) * 1.4 +
    Math.sin(x * 0.5 + z * 0.3) * 0.7;
  return Math.pow(mask, 1.4) * (6 + hills) * 1.1;
}

function Island() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(70, 96, 150, 200);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors: number[] = [];
    // Более светлая гамма суши, чтобы остров читался на тёмной воде: берег
    // подсвечен, склоны голубеют к вершинам.
    const low = new THREE.Color("#12325c");
    const high = new THREE.Color("#3f6bb0");
    const shore = new THREE.Color("#1d4c8f");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // это z в мире после поворота
      const h = terrainHeight(x, y);
      pos.setZ(i, h);
      const mask = islandMask(x, y);
      const c = new THREE.Color().copy(mask < 0.14 ? shore : low).lerp(high, THREE.MathUtils.clamp(h / 7, 0, 1));
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial vertexColors roughness={0.92} metalness={0.05} flatShading />
    </mesh>
  );
}

// ─── Вода вокруг острова ─────────────────────────────────────────────────────
const WATER_VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  void main(){
    vec3 p = position;
    p.z += sin(p.x*0.3 + uTime*0.6)*0.12 + sin(p.y*0.4 - uTime*0.5)*0.09;
    vec4 w = modelMatrix * vec4(p,1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const WATER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uGlow;
  varying vec3 vWorld;
  void main(){
    float d = length(vWorld.xz);
    float band = smoothstep(6.0, 26.0, d);
    vec3 col = mix(uShallow, uDeep, band);
    // мягкое свечение у берега
    float ripple = 0.5 + 0.5*sin(d*0.6 - uTime*1.2);
    col += uGlow * (1.0-band) * ripple * 0.08;
    gl_FragColor = vec4(col,1.0);
  }
`;

function Ocean({ animate }: { animate: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#020a19") },
      uShallow: { value: new THREE.Color("#083463") },
      uGlow: { value: new THREE.Color("#3d78ff") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (animate && mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.05}>
      <planeGeometry args={[400, 400, 120, 120]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={WATER_VERT} fragmentShader={WATER_FRAG} />
    </mesh>
  );
}

// ─── Маркер проекта ──────────────────────────────────────────────────────────
function Marker({
  pin,
  active,
  onSelect,
  animate,
}: {
  pin: ProjectPin;
  active: boolean;
  onSelect: (slug: string) => void;
  animate: boolean;
}) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    // Без анимации кольцо статично (активное чуть крупнее для акцента).
    if (!animate) {
      ring.current.scale.setScalar(active ? 1.4 : 1);
      return;
    }
    const s = 1 + Math.sin(clock.elapsedTime * 2 + pin.position[0]) * 0.15;
    ring.current.scale.setScalar(active ? s * 1.4 : s);
  });
  return (
    <group position={pin.position}>
      {/* Стержень пина */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.4, 6]} />
        <meshBasicMaterial color="#9db8ff" transparent opacity={0.5} />
      </mesh>
      {/* Пульсирующее кольцо */}
      <mesh ref={ring} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.22, 0.32, 24]} />
        <meshBasicMaterial color="#3d78ff" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* HUD-подпись: высота по «дорожке» разводит соседние метки по вертикали */}
      <Html center distanceFactor={26} position={[0, 0.9 + pin.labelLane * 0.85, 0]} zIndexRange={[40, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pin.project.slug);
          }}
          className={`whitespace-nowrap border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 ${
            active
              ? "border-offwhite bg-offwhite text-night"
              : "border-offwhite/40 bg-night/70 text-offwhite hover:border-offwhite hover:bg-night"
          }`}
        >
          {pin.project.name}
        </button>
      </Html>
    </group>
  );
}

// ─── Ярлыки районов ──────────────────────────────────────────────────────────
function RegionLabels() {
  return (
    <>
      {REGIONS.map((r) => (
        <Html
          key={r.id}
          center
          distanceFactor={60}
          position={[r.anchor[0], 0.2, r.anchor[1]]}
          zIndexRange={[10, 0]}
        >
          <span className="pointer-events-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.35em] text-offwhite/35">
            {r.name}
          </span>
        </Html>
      ))}
    </>
  );
}

// ─── Управление камерой с ограничениями ──────────────────────────────────────
// Цель по умолчанию смещена на запад: проекты кластеризованы на западном
// побережье, и камера центрируется на них, а не на геометрическом центре острова.
const DEFAULT_TARGET = new THREE.Vector3(-9, 0, -3);

function Controls({ controlsRef }: { controlsRef: React.MutableRefObject<any> }) {
  return (
    <MapControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={14}
      maxDistance={70}
      maxPolarAngle={Math.PI / 2.35}
      minPolarAngle={0.15}
      target={DEFAULT_TARGET}
      // Ограничиваем панораму, чтобы остров не «убегал» из кадра.
      screenSpacePanning={false}
    />
  );
}

export default function MapScene({
  pins,
  activeSlug,
  onSelect,
  controlsRef,
  reduceMotion = false,
}: {
  pins: ProjectPin[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  controlsRef: React.MutableRefObject<any>;
  reduceMotion?: boolean;
}) {
  const animate = !reduceMotion;
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 40, near: 0.1, far: 400, position: [2, 30, 40] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      // При reduce-motion не гоняем render-loop вхолостую: перерисовка только
      // по взаимодействию (drag/zoom камеры), вода и пульсация заморожены.
      frameloop={reduceMotion ? "demand" : "always"}
      // Скринридерам маркеры/список доступны как DOM-кнопки; сам холст —
      // презентационный слой. Клавиатурный доступ ко всем проектам даёт панель
      // списка и текстовый fallback.
      role="img"
      aria-label="Interactive 3D map of Phuket projects"
    >
      <color attach="background" args={["#020a19"]} />
      <fog attach="fog" args={["#020a19", 80, 240]} />
      <ambientLight intensity={0.55} color="#4a68a0" />
      <directionalLight position={[-10, 45, 20]} intensity={1.6} color="#bcd2ff" />
      <directionalLight position={[30, 20, -20]} intensity={0.5} color="#3d78ff" />
      <Island />
      <Ocean animate={animate} />
      <RegionLabels />
      {pins.map((pin) => (
        <Marker
          key={pin.project.slug}
          pin={pin}
          active={activeSlug === pin.project.slug}
          onSelect={onSelect}
          animate={animate}
        />
      ))}
      <Controls controlsRef={controlsRef} />
    </Canvas>
  );
}
