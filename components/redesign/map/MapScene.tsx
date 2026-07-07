"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MapControls, Html } from "@react-three/drei";
import type { ProjectPin, RegionId } from "@/components/redesign/map/phuketGeo";
import { REGIONS } from "@/components/redesign/map/phuketGeo";

// Сцена карты в стиле Hubtown: почти чёрный рельеф с едва заметными
// горизонталями, тёмная вода, ромбовидные маркеры-кластеры районов
// («NN PROJECTS / NAME»); пины проектов появляются при выборе района.

// ─── Маска острова (силуэт Пхукета) ─────────────────────────────────────────
function islandMask(x: number, z: number): number {
  let d = Math.hypot(x / 22, z / 34);
  const coast = 0.12 * Math.sin(z * 0.18) + 0.08 * Math.sin(x * 0.3 + z * 0.1);
  d += coast;
  const bay = Math.exp(-((x + 16) ** 2) / 60 - (z ** 2) / 900) * 0.25;
  d += bay;
  return THREE.MathUtils.clamp(1 - d, 0, 1);
}

function terrainHeight(x: number, z: number): number {
  const mask = islandMask(x, z);
  if (mask <= 0.02) return -0.5;
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
    // Почти чёрная гамма: суша едва темнее/светлее воды, читается рельефом.
    const low = new THREE.Color("#050e1d");
    const high = new THREE.Color("#0b1c36");
    const shore = new THREE.Color("#0a1930");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h = terrainHeight(x, y);
      pos.setZ(i, h);
      const mask = islandMask(x, y);
      const c = new THREE.Color()
        .copy(mask < 0.14 ? shore : low)
        .lerp(high, THREE.MathUtils.clamp(h / 8, 0, 1));
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshStandardMaterial vertexColors roughness={0.96} metalness={0.02} flatShading />
    </mesh>
  );
}

// Горизонтали рельефа — тонкие «топографические» кольца, как HUD-оверлей.
function ContourLines() {
  const lines = useMemo(() => {
    const group: { points: THREE.Vector3[] }[] = [];
    for (let level = 1; level <= 5; level++) {
      const target = level * 1.5;
      const points: THREE.Vector3[] = [];
      // Грубая трассировка: по сетке ищем точки, близкие к уровню.
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 90) {
        for (let r = 2; r < 40; r += 0.4) {
          const x = Math.cos(a) * r * 0.72;
          const z = Math.sin(a) * r;
          const h = terrainHeight(x, z);
          if (Math.abs(h - target) < 0.18) {
            points.push(new THREE.Vector3(x, h + 0.06, z));
            break;
          }
        }
      }
      if (points.length > 12) group.push({ points });
    }
    return group;
  }, []);

  return (
    <>
      {lines.map((l, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(l.points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1c3258" transparent opacity={0.35} />
        </line>
      ))}
    </>
  );
}

// ─── Вода ────────────────────────────────────────────────────────────────────
const WATER_VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  void main(){
    vec3 p = position;
    p.z += sin(p.x*0.3 + uTime*0.5)*0.08 + sin(p.y*0.4 - uTime*0.4)*0.06;
    vec4 w = modelMatrix * vec4(p,1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const WATER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep; uniform vec3 uShallow;
  varying vec3 vWorld;
  void main(){
    float d = length(vWorld.xz);
    float band = smoothstep(4.0, 30.0, d);
    vec3 col = mix(uShallow, uDeep, band);
    gl_FragColor = vec4(col,1.0);
  }
`;

function Ocean({ animate }: { animate: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#01060f") },
      uShallow: { value: new THREE.Color("#041226") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (animate && mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.05}>
      <planeGeometry args={[400, 400, 90, 90]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={WATER_VERT} fragmentShader={WATER_FRAG} />
    </mesh>
  );
}

// ─── Ромб-кластер района ─────────────────────────────────────────────────────
function RegionDiamond({
  id,
  name,
  count,
  position,
  active,
  dimmed,
  projectsWord,
  onSelect,
}: {
  id: RegionId;
  name: string;
  count: number;
  position: [number, number, number];
  active: boolean;
  dimmed: boolean;
  projectsWord: string;
  onSelect: (id: RegionId) => void;
}) {
  const opacity = dimmed ? 0.35 : 1;

  // Весь маркер — экранный (DOM поверх сцены): ромб остаётся ровным при любом
  // ракурсе камеры, как в референсе.
  return (
    <group position={position}>
      <Html center distanceFactor={40} zIndexRange={[30, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
          className="group flex flex-col items-center gap-2"
          style={{ opacity }}
        >
          {/* Ромб с точкой в центре */}
          <span
            className={`relative block h-6 w-6 rotate-45 border transition-colors duration-300 ${
              active ? "border-offwhite" : "border-offwhite/60 group-hover:border-offwhite"
            }`}
          >
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-offwhite" />
          </span>
          <span className="mt-1 whitespace-nowrap bg-offwhite px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-night">
            {String(count).padStart(2, "0")} {projectsWord}
          </span>
          <span className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-offwhite">
            {name}
          </span>
        </button>
      </Html>
    </group>
  );
}

// ─── Пин проекта (внутри выбранного района) ──────────────────────────────────
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
    if (!animate) {
      ring.current.scale.setScalar(active ? 1.4 : 1);
      return;
    }
    const s = 1 + Math.sin(clock.elapsedTime * 2 + pin.position[0]) * 0.15;
    ring.current.scale.setScalar(active ? s * 1.4 : s);
  });
  return (
    <group position={pin.position}>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.4, 6]} />
        <meshBasicMaterial color="#9db8ff" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ring} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.18, 0.26, 24]} />
        <meshBasicMaterial color="#6fa3ff" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
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

// ─── Управление ──────────────────────────────────────────────────────────────
const DEFAULT_TARGET = new THREE.Vector3(-9, 0, -3);

function Controls({ controlsRef }: { controlsRef: React.MutableRefObject<any> }) {
  return (
    <MapControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={12}
      maxDistance={70}
      maxPolarAngle={Math.PI / 2.35}
      minPolarAngle={0.15}
      target={DEFAULT_TARGET}
      screenSpacePanning={false}
    />
  );
}

export default function MapScene({
  pins,
  activeSlug,
  selectedRegion,
  onSelect,
  onRegionSelect,
  controlsRef,
  reduceMotion = false,
  projectsWord,
}: {
  pins: ProjectPin[];
  activeSlug: string | null;
  selectedRegion: RegionId | null;
  onSelect: (slug: string) => void;
  onRegionSelect: (id: RegionId) => void;
  controlsRef: React.MutableRefObject<any>;
  reduceMotion?: boolean;
  projectsWord: string;
}) {
  const animate = !reduceMotion;
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of pins) c[p.region] = (c[p.region] ?? 0) + 1;
    return c;
  }, [pins]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      // Старт строго с юга (азимут 0) — компас показывает 000°, как в референсе.
      camera={{ fov: 40, near: 0.1, far: 400, position: [-9, 30, 37] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={reduceMotion ? "demand" : "always"}
      role="img"
      aria-label="Interactive 3D map of Phuket projects"
    >
      <color attach="background" args={["#01060f"]} />
      <fog attach="fog" args={["#01060f", 90, 260]} />
      <ambientLight intensity={0.35} color="#2c4576" />
      <directionalLight position={[-10, 45, 20]} intensity={0.7} color="#8fb0e8" />
      <Island />
      <ContourLines />
      <Ocean animate={animate} />

      {/* Ромбы районов; выбранный скрывается — его место занимают пины проектов */}
      {REGIONS.filter((r) => r.id !== selectedRegion).map((r) => (
        <RegionDiamond
          key={r.id}
          id={r.id}
          name={r.name}
          count={counts[r.id] ?? 0}
          position={[r.anchor[0], 3.2, r.anchor[1]]}
          active={false}
          dimmed={selectedRegion !== null}
          projectsWord={projectsWord}
          onSelect={onRegionSelect}
        />
      ))}

      {/* Пины проектов выбранного района */}
      {pins
        .filter((p) => selectedRegion !== null && p.region === selectedRegion)
        .map((pin) => (
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
