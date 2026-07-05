"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// WebGL-сцена главной: светящийся куб-монолит над тёмной водой между холмами.
// Всё процедурное — ни одного внешнего ассета: вода на кастомном шейдере,
// холмы на ridged-шуме, свечение куба на canvas-текстуре. Камера летит по
// Catmull-Rom-кривой между ключевыми точками глав, прогресс приходит из
// HomeNarrative через ref (без ре-рендеров React на каждый кадр).

type Rig = MutableRefObject<number>;

// ─── Вода ────────────────────────────────────────────────────────────────────
const WATER_VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  // Три пересекающиеся волны; нормаль — из аналитических производных.
  float waveH(vec2 p, float t) {
    return 0.16 * sin(p.x * 0.24 + t * 0.7)
         + 0.11 * sin((p.x * 0.5 + p.y * 0.65) * 0.32 + t * 1.1)
         + 0.06 * sin(p.y * 0.55 - t * 0.5);
  }

  void main() {
    vec3 pos = position;
    vec2 p = position.xy; // plane лежит в XY до поворота
    float t = uTime;
    pos.z += waveH(p, t);

    float e = 0.35;
    float hx = waveH(p + vec2(e, 0.0), t) - waveH(p - vec2(e, 0.0), t);
    float hy = waveH(p + vec2(0.0, e), t) - waveH(p - vec2(0.0, e), t);
    vec3 n = normalize(vec3(-hx / (2.0 * e), -hy / (2.0 * e), 1.0));

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vWorldPos = world.xyz;
    vNormal = normalize((modelMatrix * vec4(n, 0.0)).xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uSurface;
  uniform vec3 uGlow;
  uniform vec3 uGlowPos;
  uniform vec3 uFog;
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.2);
    vec3 col = mix(uDeep, uSurface, fresnel * 0.85);

    // Дорожка свечения от куба: фонг-блик в сторону его позиции.
    vec3 toGlow = normalize(uGlowPos - vWorldPos);
    vec3 reflDir = reflect(-toGlow, vNormal);
    float spec = pow(max(dot(reflDir, viewDir), 0.0), 24.0);
    float dist = length(uGlowPos.xz - vWorldPos.xz);
    float atten = 1.0 / (1.0 + dist * dist * 0.015);
    col += uGlow * (spec * 1.6 + 0.35) * atten;

    // Редкие «искры» на гребнях.
    float sparkle = step(0.9985, hash(floor(vWorldPos.xz * 14.0) + floor(uTime * 2.0)));
    col += uGlow * sparkle * 0.6 * atten;

    // Туман к горизонту.
    float fogF = smoothstep(30.0, 150.0, length(cameraPosition - vWorldPos));
    col = mix(col, uFog, fogF);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Water() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#020a19") },
      uSurface: { value: new THREE.Color("#0a2a5e") },
      uGlow: { value: new THREE.Color("#3d78ff") },
      uGlowPos: { value: new THREE.Vector3(0, 1.6, 0) },
      uFog: { value: new THREE.Color("#020a19") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={0}>
      <planeGeometry args={[320, 320, 160, 160]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={WATER_VERT}
        fragmentShader={WATER_FRAG}
      />
    </mesh>
  );
}

// ─── Холмы ───────────────────────────────────────────────────────────────────
function ridged(x: number, y: number): number {
  const s = (a: number) => Math.sin(a) * 0.5 + 0.5;
  let h = 0;
  h += 1.0 - Math.abs(Math.sin(x * 0.055 + y * 0.03));
  h += 0.5 * (1.0 - Math.abs(Math.sin(x * 0.12 - y * 0.07 + 1.7)));
  h += 0.25 * s(x * 0.3 + y * 0.21);
  return h / 1.75;
}

function Hill({ position, scale }: { position: [number, number, number]; scale: number }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(90, 60, 48, 32);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Купол к центру, изрезанный ridged-шумом.
      const dome = Math.max(0, 1 - Math.hypot(x / 45, y / 30));
      pos.setZ(i, (ridged(x + position[0], y) * 10 + 4) * dome * scale);
    }
    geo.computeVertexNormals();
    return geo;
  }, [position, scale]);

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2} position={position}>
      <meshStandardMaterial color="#04101f" roughness={0.95} metalness={0} flatShading />
    </mesh>
  );
}

// ─── Куб ─────────────────────────────────────────────────────────────────────
function GlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(90,140,255,0.9)");
    g.addColorStop(0.35, "rgba(45,90,220,0.35)");
    g.addColorStop(1, "rgba(2,10,25,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Monolith() {
  const group = useRef<THREE.Group>(null);
  const glowTex = GlowTexture();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.position.y = 2.1 + Math.sin(t * 0.6) * 0.12;
    }
  });
  return (
    <>
      <group ref={group} position={[0, 2.1, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <meshStandardMaterial
            color="#0a2b66"
            emissive="#1e56ff"
            emissiveIntensity={1.15}
            roughness={0.32}
            metalness={0.25}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.24, 2.24, 2.24)]} />
          <lineBasicMaterial color="#9db8ff" transparent opacity={0.75} />
        </lineSegments>
      </group>
      {/* Ореол — билборд с радиальным градиентом, аддитивно. */}
      <sprite position={[0, 2.1, 0]} scale={[13, 13, 1]}>
        <spriteMaterial map={glowTex} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      <pointLight position={[0, 2.4, 0]} color="#3d78ff" intensity={60} distance={40} decay={2} />
    </>
  );
}

// ─── Частицы над водой ──────────────────────────────────────────────────────
function Mist() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 350;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 90;
      arr[i * 3 + 1] = 0.2 + Math.random() * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.012;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#8fb0ff"
        size={0.09}
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Камера по главам ────────────────────────────────────────────────────────
const CAM_POINTS = [
  new THREE.Vector3(0, 2.4, 11.5), // Future — фронтально
  new THREE.Vector3(6.8, 1.3, 7.2), // Insight — низкий правый облёт
  new THREE.Vector3(1.0, 7.2, 9.0), // Network — сверху
  new THREE.Vector3(-7.4, 1.9, 6.6), // Precision — слева ближе
  new THREE.Vector3(-2.2, 1.1, 4.4), // Purpose — у самой воды
  new THREE.Vector3(0, 3.6, 14.5), // Legacy — широкий отъезд
];
const LOOK_POINTS = [
  new THREE.Vector3(0, 2.1, 0),
  new THREE.Vector3(0, 1.9, 0),
  new THREE.Vector3(0, 1.4, 0),
  new THREE.Vector3(0, 2.0, 0),
  new THREE.Vector3(0, 2.6, 0),
  new THREE.Vector3(0, 2.1, 0),
];

function CameraRig({ progressRef, parallax }: { progressRef: Rig; parallax: boolean }) {
  const { camera, pointer } = useThree();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(CAM_POINTS, false, "catmullrom", 0.4), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const pos = curve.getPoint(p);

    // Интерполяция цели взгляда между главами.
    const seg = p * (LOOK_POINTS.length - 1);
    const i = Math.min(Math.floor(seg), LOOK_POINTS.length - 2);
    look.lerpVectors(LOOK_POINTS[i], LOOK_POINTS[i + 1], seg - i);

    const t = clock.elapsedTime;
    const bobY = Math.sin(t * 0.5) * 0.06;
    const px = parallax ? pointer.x * 0.5 : 0;
    const py = parallax ? pointer.y * 0.3 : 0;

    camera.position.set(pos.x + px, pos.y + bobY + py, pos.z);
    camera.lookAt(look);
  });
  return null;
}

// ─── Сцена ───────────────────────────────────────────────────────────────────
export default function HomeScene({
  progressRef,
  parallax = true,
}: {
  progressRef: Rig;
  parallax?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 42, near: 0.1, far: 260, position: [0, 2.4, 11.5] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <color attach="background" args={["#020a19"]} />
      <fog attach="fog" args={["#020a19", 40, 170]} />
      <ambientLight intensity={0.25} color="#28406e" />
      <Monolith />
      <Water />
      <Hill position={[-62, 0, -30]} scale={1.15} />
      <Hill position={[64, 0, -36]} scale={0.9} />
      <Mist />
      <CameraRig progressRef={progressRef} parallax={parallax} />
    </Canvas>
  );
}
