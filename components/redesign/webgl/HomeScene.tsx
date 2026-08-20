"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

// WebGL-сцена главной в стиле Hubtown: яркий бирюзовый куб-монолит с панелями
// на гранях и раскалённой верхушкой, парящий над тёмной водой между холмами,
// подсвеченными его свечением. Всё процедурное (ни одного внешнего ассета);
// свечение даёт bloom-постобработка. Камера летит по кривой между главами —
// прогресс приходит из HomeNarrative через ref (без ре-рендеров React).

type Rig = MutableRefObject<number>;

const DEEP = new THREE.Color("#020a19");

// ─── Куб-монолит ─────────────────────────────────────────────────────────────
const CUBE_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vObj;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vObj = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const CUBE_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vObj;
  varying vec3 vNormal;
  varying vec3 vView;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

  // Панельная сетка: тонкие тёмные грувы + лёгкий разброс яркости блоков.
  float panels(vec2 uv, float cells, out float blockVar){
    vec2 g = uv * cells;
    vec2 id = floor(g);
    vec2 f = abs(fract(g) - 0.5);
    float line = smoothstep(0.0, 0.03, min(f.x, f.y));   // 0 на грувах
    blockVar = hash(id);
    return line;
  }

  void main(){
    // Вертикальный градиент по локальной Y: раскалённый верх → глубокий низ.
    float gy = clamp((vObj.y + 1.3) / 2.6, 0.0, 1.0);
    vec3 col = mix(uLow, uHigh, pow(gy, 0.7));

    // Двухуровневые панели: крупные блоки + мелкая расшивка.
    float bv1; float l1 = panels(vUv, 4.0, bv1);
    float bv2; float l2 = panels(vUv, 12.0, bv2);
    col *= mix(0.62, 1.0, l1);
    col *= mix(0.82, 1.0, l2);
    col *= 0.88 + bv1 * 0.24;

    // Раскалённый «горячий» угол (верх-право грани) — как на референсе.
    float hs = smoothstep(0.55, 1.0, vUv.x) * smoothstep(0.5, 1.0, vUv.y);
    col += uHigh * hs * 0.4;

    // Френель по краям — свечение силуэта.
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
    col += uHigh * fres * 0.45;

    // Мягкое дыхание яркости.
    col *= 0.94 + 0.06 * sin(uTime * 0.8);

    // Умеренный HDR-подъём для bloom — куб цветной, не выбеленный.
    gl_FragColor = vec4(col * 1.08, 1.0);
  }
`;

export function Monolith() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uLow: { value: new THREE.Color("#0a3f86") },
      uHigh: { value: new THREE.Color("#6ec3ff") },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (mat.current) mat.current.uniforms.uTime.value = t;
    if (group.current) {
      group.current.rotation.y = -0.35 + Math.sin(t * 0.12) * 0.05;
      group.current.position.y = 2.35 + Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <group ref={group} position={[0, 2.35, 0]} rotation-y={-0.35}>
      <mesh>
        <boxGeometry args={[2.6, 2.6, 2.6]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={CUBE_VERT}
          fragmentShader={CUBE_FRAG}
        />
      </mesh>
      {/* Раскалённые рёбра */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.62, 2.62, 2.62)]} />
        <lineBasicMaterial color="#eaf6ff" transparent opacity={0.9} />
      </lineSegments>
      {/* Внутренний свет — подсвечивает воду и ближние склоны холмов */}
      <pointLight color="#4db4ff" intensity={110} distance={40} decay={2} />
    </group>
  );
}

// ─── Ореол за кубом ──────────────────────────────────────────────────────────
export function Halo() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    g.addColorStop(0, "rgba(120,200,255,0.85)");
    g.addColorStop(0.28, "rgba(60,150,255,0.45)");
    g.addColorStop(0.6, "rgba(20,70,160,0.12)");
    g.addColorStop(1, "rgba(2,10,25,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }, []);
  return (
    <sprite position={[0, 3.1, -2.5]} scale={[19, 19, 1]}>
      <spriteMaterial map={tex} blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.7} />
    </sprite>
  );
}

// ─── Фон-градиент (небо) ─────────────────────────────────────────────────────
export function Backdrop() {
  const { viewport, camera } = useThree();
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      depthWrite: false,
      uniforms: { uTop: { value: new THREE.Color("#05132a") }, uBottom: { value: DEEP.clone() } },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.999, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform vec3 uTop; uniform vec3 uBottom;
        void main(){
          // Ночь: почти чёрное небо, узкий столб свечения строго за кубом.
          vec2 p = vUv - vec2(0.5, 0.58);
          float glow = smoothstep(0.42, 0.0, length(p * vec2(1.7, 1.0)));
          vec3 col = mix(uBottom, uTop, pow(vUv.y, 1.6));
          col = mix(col, vec3(0.07, 0.22, 0.44), glow * 0.5);
          // Сильная виньетка по краям — кадр тонет в темноте.
          col *= 1.0 - smoothstep(0.35, 0.9, length(vUv - vec2(0.5, 0.55))) * 0.7;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);
  void viewport;
  void camera;
  // Полноэкранный треугольник в clip-space — рисуется позади всего.
  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ─── Холмы ───────────────────────────────────────────────────────────────────
export function Hill({ side }: { side: -1 | 1 }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 44, 40, 28);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Купол к центру + рельеф.
      const dome = Math.max(0, 1 - Math.hypot(x / 30, y / 22));
      const ridge =
        Math.sin(x * 0.18 + side) * 1.6 + Math.sin(x * 0.42 - y * 0.2) * 0.8 + Math.sin(y * 0.3) * 0.6;
      pos.setZ(i, (8 + ridge) * dome * dome);
    }
    geo.computeVertexNormals();
    return geo;
  }, [side]);

  // Внутренний склон обращён к кубу — его подсветит pointLight монолита.
  // Холмы уведены к краям и назад, чтобы по центру-переду открылась вода.
  return (
    <mesh
      geometry={geometry}
      rotation-x={-Math.PI / 2}
      rotation-z={side * 0.16}
      position={[side * 22, -0.6, -12]}
    >
      <meshStandardMaterial color="#04101f" roughness={0.94} metalness={0.04} flatShading />
    </mesh>
  );
}

// ─── Вода ────────────────────────────────────────────────────────────────────
const WATER_VERT = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying vec3 vNormal;
  float wave(vec2 p, float t){
    return 0.14*sin(p.x*0.26+t*0.7) + 0.10*sin((p.x*0.5+p.y*0.6)*0.3+t*1.05) + 0.05*sin(p.y*0.5-t*0.5);
  }
  void main(){
    vec3 pos = position;
    vec2 p = position.xy;
    pos.z += wave(p, uTime);
    float e = 0.4;
    float hx = wave(p+vec2(e,0.0),uTime)-wave(p-vec2(e,0.0),uTime);
    float hy = wave(p+vec2(0.0,e),uTime)-wave(p-vec2(0.0,e),uTime);
    vNormal = normalize((modelMatrix*vec4(normalize(vec3(-hx/(2.0*e), -hy/(2.0*e), 1.0)),0.0)).xyz);
    vec4 w = modelMatrix*vec4(pos,1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix*viewMatrix*w;
  }
`;
const WATER_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uDeep; uniform vec3 uGlow; uniform float uTime;
  varying vec3 vWorld; varying vec3 vNormal;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  void main(){
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float fres = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
    vec3 col = mix(uDeep, uDeep + vec3(0.02,0.08,0.18), fres);

    // Столб отражения куба: ярче ближе к оси X=0.
    float axis = exp(-abs(vWorld.x) * 0.12);
    float depth = smoothstep(-2.0, 12.0, vWorld.z);
    vec3 reflDir = reflect(-normalize(vec3(0.0,3.0,0.0)-vWorld), vNormal);
    float spec = pow(max(reflDir.y, 0.0), 8.0);
    col += uGlow * (spec * 0.9 + 0.25) * axis * depth;

    // Искры на гребнях.
    float sp = step(0.997, hash(floor(vWorld.xz*10.0)+floor(uTime*1.5)));
    col += uGlow * sp * 0.8 * (0.3 + axis);

    // Туман к горизонту.
    float fog = smoothstep(20.0, 90.0, length(cameraPosition - vWorld));
    col = mix(col, uDeep, fog);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function Water() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#020c1c") },
      uGlow: { value: new THREE.Color("#2f8fff") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.15}>
      <planeGeometry args={[260, 260, 140, 140]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={WATER_VERT} fragmentShader={WATER_FRAG} />
    </mesh>
  );
}

// ─── Искры-боке ──────────────────────────────────────────────────────────────
export function Sparkles() {
  const ref = useRef<THREE.Points>(null);
  const { positions, tex } = useMemo(() => {
    const n = 600;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 70;
      arr[i * 3 + 1] = Math.random() * 9 - 0.3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50 + 2;
    }
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(190,230,255,1)");
    g.addColorStop(1, "rgba(190,230,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    return { positions: arr, tex: t };
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        color="#bfe6ff"
        size={0.16}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Камера по главам ────────────────────────────────────────────────────────
// Первая точка смотрит чуть вверх: куб уходит в верхнюю треть кадра, а
// центрированный текст главы ложится на тёмную воду (читаемость как в референсе).
const CAM_POINTS = [
  new THREE.Vector3(0, 1.4, 11.6),
  new THREE.Vector3(5.6, 1.6, 7.4),
  new THREE.Vector3(1.2, 6.4, 8.6),
  new THREE.Vector3(-6.2, 2.1, 6.8),
  new THREE.Vector3(-1.8, 1.2, 4.6),
  new THREE.Vector3(0, 3.4, 13.0),
];
const LOOK_POINTS = [
  new THREE.Vector3(0, 4.4, 0),
  new THREE.Vector3(0, 2.2, 0),
  new THREE.Vector3(0, 1.9, 0),
  new THREE.Vector3(0, 2.3, 0),
  new THREE.Vector3(0, 2.8, 0),
  new THREE.Vector3(0, 2.4, 0),
];

function CameraRig({ progressRef, parallax }: { progressRef: Rig; parallax: boolean }) {
  const { camera, pointer } = useThree();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(CAM_POINTS, false, "catmullrom", 0.4), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const pos = curve.getPoint(p);
    const seg = p * (LOOK_POINTS.length - 1);
    const i = Math.min(Math.floor(seg), LOOK_POINTS.length - 2);
    look.lerpVectors(LOOK_POINTS[i], LOOK_POINTS[i + 1], seg - i);
    const t = clock.elapsedTime;
    const px = parallax ? pointer.x * 0.4 : 0;
    const py = parallax ? pointer.y * 0.25 : 0;
    camera.position.set(pos.x + px, pos.y + Math.sin(t * 0.5) * 0.05 + py, pos.z);
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
      camera={{ fov: 42, near: 0.1, far: 260, position: [0, 2.7, 10.2] }}
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      aria-hidden
    >
      <color attach="background" args={["#020a19"]} />
      <fog attach="fog" args={["#020a19", 30, 110]} />
      <ambientLight intensity={0.1} color="#16305c" />
      <Backdrop />
      <Halo />
      <Monolith />
      <Hill side={-1} />
      <Hill side={1} />
      <Water />
      <Sparkles />
      <CameraRig progressRef={progressRef} parallax={parallax} />
      {/* Байтовый буфер: half-float на части GPU-профилей даёт чёрный кадр. */}
      <EffectComposer frameBufferType={THREE.UnsignedByteType}>
        <Bloom intensity={0.9} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur radius={0.65} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
