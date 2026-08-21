"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MapControls, Html, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import type { ProjectPin, RegionId } from "@/components/map/phuketGeo";
import { REGIONS } from "@/components/map/phuketGeo";
import vectors from "@/components/map/phuketVectors.json";
import heights from "@/components/map/phuketHeights.json";

// Сцена карты в стиле Hubtown, на РЕАЛЬНОЙ географии Пхукета и с РЕАЛЬНЫМ 3D-
// рельефом: тёмная вода, объёмный остров (высоты из DEM OpenStreetMap/terrarium,
// phuketHeights.json), поверх — светящаяся серебряная сеть дорог и береговой
// линии (phuketVectors.json). При наклоне камеры видно горы и depth. Свечение —
// Bloom. Основной цвет — серебряный (не синий).

// ─── Высоты рельефа (б­илинейная выборка из baked-грида) ──────────────────────
const HG = heights as {
  nx: number; nz: number; minx: number; maxx: number; minz: number; maxz: number; h: number[];
};
function sampleHeight(x: number, z: number): number {
  const { nx, nz, minx, maxx, minz, maxz, h } = HG;
  let fx = ((x - minx) / (maxx - minx)) * (nx - 1);
  let fz = ((z - minz) / (maxz - minz)) * (nz - 1);
  fx = Math.max(0, Math.min(nx - 1, fx));
  fz = Math.max(0, Math.min(nz - 1, fz));
  const x0 = Math.floor(fx), z0 = Math.floor(fz);
  const x1 = Math.min(x0 + 1, nx - 1), z1 = Math.min(z0 + 1, nz - 1);
  const tx = fx - x0, tz = fz - z0;
  const h00 = h[z0 * nx + x0], h10 = h[z0 * nx + x1];
  const h01 = h[z1 * nx + x0], h11 = h[z1 * nx + x1];
  return (h00 * (1 - tx) + h10 * tx) * (1 - tz) + (h01 * (1 - tx) + h11 * tx) * tz;
}

// ─── Рельефная суша (3D-меш из грида высот; морские квады пропускаем) ─────────
let _terrainGeo: THREE.BufferGeometry | null = null;
function Terrain() {
  const geometry = useMemo(() => {
    if (_terrainGeo) return _terrainGeo;
    const { nx, nz, minx, maxx, minz, maxz, h } = HG;
    const positions: number[] = [];
    const colors: number[] = [];
    // Светлее прежнего: рельеф должен ЧИТАТЬСЯ при наклоне, как в референсе.
    const low = new THREE.Color("#121821");
    const high = new THREE.Color("#38424f");
    for (let j = 0; j < nz; j++) {
      for (let i = 0; i < nx; i++) {
        const x = minx + ((maxx - minx) * i) / (nx - 1);
        const z = minz + ((maxz - minz) * j) / (nz - 1);
        const y = h[j * nx + i];
        positions.push(x, y, z);
        const c = low.clone().lerp(high, THREE.MathUtils.clamp(y / 3.2, 0, 1));
        colors.push(c.r, c.g, c.b);
      }
    }
    const indices: number[] = [];
    const seaEps = 0.02;
    for (let j = 0; j < nz - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = j * nx + i, b = j * nx + i + 1, c = (j + 1) * nx + i, d = (j + 1) * nx + i + 1;
        // пропускаем квад, если весь он на уровне моря — там видна вода
        if (h[a] < seaEps && h[b] < seaEps && h[c] < seaEps && h[d] < seaEps) continue;
        indices.push(a, c, b, b, c, d);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    _terrainGeo = geo;
    return geo;
  }, []);
  // dispose={null} обязателен: геометрия переиспользуется между монтированиями,
  // а R3F по умолчанию уничтожает её при размонтировании (в dev React монтирует
  // дважды) — после этого сцена рендерилась пустой.
  return (
    <mesh geometry={geometry} frustumCulled={false} dispose={null}>
      {/* Lambert вместо Standard: рельеф матовый и тёмный, PBR-расчёты (GGX,
          металличность) на 126k вершинах не дают визуальной разницы, но заметно
          дороже по фрагментам. */}
      <meshLambertMaterial vertexColors />
    </mesh>
  );
}

// ─── Горизонтали рельефа (marching squares по гриду высот) ───────────────────
// Тонкие топографические линии поверх рельефа — как в референсе Hubtown.
// Геометрия горизонталей считается ОДИН раз за сессию и кэшируется в модуле:
// раньше marching squares (300×420 × 10 уровней ≈ 1.2 млн вызовов) выполнялся
// синхронно при каждом монтировании сцены и подвешивал поток на загрузке.
let _contourGeo: THREE.BufferGeometry | null = null;
function contourGeometry(): THREE.BufferGeometry {
  if (_contourGeo) return _contourGeo;
  {
    const { nx, nz, minx, maxx, minz, maxz, h } = HG;
    const dx = (maxx - minx) / (nx - 1);
    const dz = (maxz - minz) / (nz - 1);
    const verts: number[] = [];
    const step = 3; // крупнее шаг — втрое меньше работы, рисунок тот же
    const levels: number[] = [];
    for (let L = 0.35; L <= 3.6; L += 0.46) levels.push(L);

    for (const level of levels) {
      for (let j = 0; j < nz - step; j += step) {
        for (let i = 0; i < nx - step; i += step) {
          const x0 = minx + dx * i, z0 = minz + dz * j;
          const x1 = x0 + dx * step, z1 = z0 + dz * step;
          const a = h[j * nx + i];                     // (x0,z0)
          const b = h[j * nx + i + step];              // (x1,z0)
          const c = h[(j + step) * nx + i + step];     // (x1,z1)
          const d = h[(j + step) * nx + i];            // (x0,z1)
          const pts: number[][] = [];
          const cross = (p: number, q: number, px: number, pz: number, qx: number, qz: number) => {
            if ((p < level && q >= level) || (q < level && p >= level)) {
              const t = (level - p) / (q - p);
              pts.push([px + (qx - px) * t, pz + (qz - pz) * t]);
            }
          };
          cross(a, b, x0, z0, x1, z0);
          cross(b, c, x1, z0, x1, z1);
          cross(c, d, x1, z1, x0, z1);
          cross(d, a, x0, z1, x0, z0);
          for (let k = 0; k + 1 < pts.length; k += 2) {
            verts.push(pts[k][0], level + 0.03, pts[k][1]);
            verts.push(pts[k + 1][0], level + 0.03, pts[k + 1][1]);
          }
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    _contourGeo = geo;
    return geo;
  }
}

function Contours() {
  const geometry = useMemo(() => contourGeometry(), []);
  return (
    <lineSegments geometry={geometry} frustumCulled={false} dispose={null}>
      <lineBasicMaterial color="#8f9bab" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

// ─── Линии дорог/берега, наброшенные на рельеф ───────────────────────────────
// Каждую ломаную разбиваем на пары вершин; y = высота рельефа в точке + отступ.
function buildSegments(lines: number[][], lift: number): THREE.BufferGeometry {
  const verts: number[] = [];
  for (const line of lines) {
    for (let i = 0; i < line.length - 2; i += 2) {
      const x0 = line[i], z0 = line[i + 1], x1 = line[i + 2], z1 = line[i + 3];
      verts.push(x0, sampleHeight(x0, z0) + lift, z0);
      verts.push(x1, sampleHeight(x1, z1) + lift, z1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  return geo;
}

const _segCache = new Map<string, THREE.BufferGeometry>();
function cachedSegments(key: string, lines: number[][], lift: number): THREE.BufferGeometry {
  const hit = _segCache.get(key);
  if (hit) return hit;
  const geo = buildSegments(lines, lift);
  _segCache.set(key, geo);
  return geo;
}

function VectorMap() {
  const coast = useMemo(() => cachedSegments("coast", vectors.coast as number[][], 0.1), []);
  const major = useMemo(() => cachedSegments("major", vectors.major as number[][], 0.08), []);
  const minor = useMemo(() => cachedSegments("minor", vectors.minor as number[][], 0.06), []);
  return (
    <group>
      {/* Мелкие улицы — тусклое серебро */}
      <lineSegments geometry={minor} dispose={null}>
        <lineBasicMaterial color="#94a1b2" transparent opacity={0.62} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      {/* Магистрали — яркое серебро */}
      <lineSegments geometry={major} dispose={null}>
        <lineBasicMaterial color="#dbe3ed" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      {/* Береговая линия — самое яркое серебро, задаёт силуэт */}
      <lineSegments geometry={coast} dispose={null}>
        <lineBasicMaterial color="#eef2f6" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
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
  uniform vec3 uDeep; uniform vec3 uShallow;
  varying vec3 vWorld;
  void main(){
    float d = length(vWorld.xz - vec2(-6.0, -12.0));
    float band = smoothstep(6.0, 40.0, d);
    vec3 col = mix(uShallow, uDeep, band);
    gl_FragColor = vec4(col,1.0);
  }
`;

function Ocean({ animate }: { animate: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#04060a") },
      uShallow: { value: new THREE.Color("#0b1016") },
    }),
    [],
  );
  useFrame((_, dt) => {
    if (animate && mat.current) mat.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.08}>
      {/* 24×24 вместо 90×90: рябь еле заметна, а вершин анимируется в 14 раз меньше */}
      <planeGeometry args={[400, 400, 24, 24]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={WATER_VERT} fragmentShader={WATER_FRAG} />
    </mesh>
  );
}

// ─── Ромб-кластер района ─────────────────────────────────────────────────────
function RegionDiamond({
  id, name, count, position, active, dimmed, projectsWord, onSelect,
}: {
  id: RegionId; name: string; count: number; position: [number, number, number];
  active: boolean; dimmed: boolean; projectsWord: string; onSelect: (id: RegionId) => void;
}) {
  const base = dimmed ? 0.35 : 1;
  const wrap = useRef<HTMLDivElement>(null);
  const group = useRef<THREE.Group>(null);
  const fade = useRef(1);

  // Обратная кубам логика: чем ближе камера, тем прозрачнее ромб — точка
  // «передаёт эстафету» кубам проектов.
  const shown = useRef(-1); // последнее записанное в DOM значение
  useFrame(({ camera }) => {
    if (!wrap.current || !group.current) return;
    const d = camera.position.distanceTo(group.current.position);
    const target = THREE.MathUtils.clamp((d - CUBE_NEAR) / (CUBE_FAR - CUBE_NEAR), 0, 1);
    fade.current = THREE.MathUtils.lerp(fade.current, target, 0.12);
    const next = base * fade.current;
    // Пишем в DOM только при заметном изменении: раньше стиль переписывался
    // каждый кадр на 4 элементах и провоцировал постоянный пересчёт стилей.
    if (Math.abs(next - shown.current) < 0.01) return;
    shown.current = next;
    const st = wrap.current.style;
    st.opacity = next.toFixed(2);
    st.visibility = next < 0.02 ? "hidden" : "visible";
    st.pointerEvents = next < 0.25 ? "none" : "auto";
  });

  return (
    <group ref={group} position={position}>
      <Html center zIndexRange={[30, 0]}>
        <div ref={wrap}>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect(id); }}
          className="group flex flex-col items-center gap-2"
        >
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
        </div>
      </Html>
    </group>
  );
}

// ─── Пин проекта ─────────────────────────────────────────────────────────────
// Как в референсе Hubtown: проект — светящийся 3D-куб, стоящий на рельефе и
// подсвечивающий землю вокруг. Подпись всплывает при наведении/выборе, чтобы
// вблизи карта оставалась чистой.
// Размер куба ограничен реальной близостью проектов: ближайшая пара стоит в
// 0.55 ед. (446 м), поэтому ребро 0.34 оставляет заметный зазор ~0.21 ед. и кубы
// не слипаются. Видимость добирается не размером, а подлётом камеры.
const CUBE = 0.38;
// Дистанции появления куба: дальше FAR — куб скрыт (виден ромб-кластер района),
// ближе NEAR — куб «вырос» полностью. Между ними плавный переход, поэтому при
// приближении точки превращаются в кубы, а при отдалении — обратно.
const CUBE_FAR = 22;
const CUBE_NEAR = 12;

// ПРОИЗВОДИТЕЛЬНОСТЬ: раньше под каждым кубом висел pointLight. При зуме кубы
// проявлялись → число источников в сцене менялось → three пересобирал шейдеры
// ВСЕХ материалов (включая рельеф на 126k вершин), отсюда рывки именно в момент
// приближения. Теперь подсветка земли — плоское аддитивное пятно с радиальным
// градиентом: ноль источников света, один общий текстурный ресурс.
let _glowTex: THREE.CanvasTexture | null = null;
function glowTexture(): THREE.CanvasTexture {
  if (_glowTex) return _glowTex;
  const S = 128;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  // Тугой спад: пятно должно читаться как лужица света у основания, а не как
  // большое белое облако. Центр не белый — иначе под кубом выжигается пятно.
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(176,193,214,0.55)");
  g.addColorStop(0.22, "rgba(150,170,196,0.3)");
  g.addColorStop(0.55, "rgba(120,142,172,0.09)");
  g.addColorStop(1, "rgba(100,120,150,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  _glowTex = new THREE.CanvasTexture(c);
  return _glowTex;
}
// Геометрия пятна общая на все маркеры — 13 одинаковых плоскостей.
const GLOW_GEO = new THREE.PlaneGeometry(1, 1);
// Куб единичный: реальный размер задаётся масштабом, поэтому в шейдере локальная
// координата всегда лежит в ±0.5 — на этом строятся градиент и рёбра.
const CUBE_GEO = new THREE.BoxGeometry(1, 1, 1);

// Материал куба: не плоская заливка, а «живой» серебряный блок — грани освещены
// по-разному, верх светлее низа, по рёбрам и силуэту идёт свечение (rim).
const CUBE_VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vP; varying vec3 vV;
  void main(){
    vN = normalize(normalMatrix * normal);
    vP = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;
const CUBE_FRAG = /* glsl */ `
  uniform vec3 uDark; uniform vec3 uLight; uniform vec3 uRim; uniform float uBoost;
  varying vec3 vN; varying vec3 vP; varying vec3 vV;
  void main(){
    vec3 N = normalize(vN);
    vec3 V = normalize(vV);
    // Направленный ключевой свет — грани получают разную яркость.
    float key = dot(N, normalize(vec3(-0.55, 0.75, 0.35))) * 0.5 + 0.5;
    // Вертикальный градиент внутри куба: верх светлее основания.
    float up = clamp(vP.y + 0.5, 0.0, 1.0);
    vec3 col = mix(uDark, uLight, key * 0.76 + up * 0.24);
    // Свечение по силуэту.
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);
    // Свечение по рёбрам: ребро там, где СРЕДНЯЯ из |x|,|y|,|z| близка к 0.5.
    vec3 a = abs(vP);
    float mx = max(a.x, max(a.y, a.z));
    float mn = min(a.x, min(a.y, a.z));
    float mid = a.x + a.y + a.z - mx - mn;
    float edge = smoothstep(0.40, 0.5, mid);
    col += uRim * (fres * 0.5 + edge * 0.55);
    gl_FragColor = vec4(col * uBoost, 1.0);
  }
`;

function Marker({
  pin, active, onSelect, animate,
}: {
  pin: ProjectPin; active: boolean; onSelect: (slug: string) => void; animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const cube = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [near, setNear] = useState(false); // куб «проявлен» — можно звать подпись
  const grow = useRef(0);
  const surfaceY = sampleHeight(pin.position[0], pin.position[2]);

  // Свой материал на маркер (программа шейдера общая — перекомпиляции нет).
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: CUBE_VERT,
        fragmentShader: CUBE_FRAG,
        uniforms: {
          uDark: { value: new THREE.Color("#42505f") },
          uLight: { value: new THREE.Color("#ccd9e8") },
          uRim: { value: new THREE.Color("#dce8f7") },
          uBoost: { value: 1 },
        },
      }),
    [],
  );

  useFrame(({ clock, camera }) => {
    if (!cube.current || !group.current) return;
    const d = camera.position.distanceTo(group.current.position);
    const target = THREE.MathUtils.clamp((CUBE_FAR - d) / (CUBE_FAR - CUBE_NEAR), 0, 1);
    grow.current = THREE.MathUtils.lerp(grow.current, target, 0.14);
    const g = grow.current;

    const hot = active || hovered;
    const k = CUBE * g * (hot ? 1.22 : 1); // мировой размер ребра
    const vis = k > 0.01;
    cube.current.visible = vis;
    if (glow.current) glow.current.visible = vis;
    // Если куб не виден — не трогаем матрицы и не считаем анимацию.
    if (!vis) {
      if (near) setNear(false);
      return;
    }
    cube.current.scale.setScalar(k);
    // куб вырастает из земли: половина ребра масштабируется вместе с ним
    const lift = animate ? Math.sin(clock.elapsedTime * 1.6 + pin.position[0]) * 0.05 * g : 0;
    cube.current.position.y = k * 0.5 + lift;
    mat.uniforms.uBoost.value = hot ? 1.5 : 1;

    if (glow.current) {
      // Пятно компактное и «дышит» — читается как живой свет, а не как ореол.
      const pulse = animate ? 1 + Math.sin(clock.elapsedTime * 1.9 + pin.position[2]) * 0.06 : 1;
      const gs = (hot ? 2.05 : 1.6) * g * pulse;
      glow.current.scale.set(gs, gs, 1);
      (glow.current.material as THREE.MeshBasicMaterial).opacity =
        (hot ? 0.85 : 0.6) * g * pulse;
    }

    // Гистерезис: порог включения/выключения разнесён, иначе на границе
    // состояние дребезжит и каждый кадр идёт ре-рендер React.
    const isNear = near ? g > 0.12 : g > 0.2;
    if (isNear !== near) setNear(isNear);
  });

  return (
    <group ref={group} position={[pin.position[0], surfaceY, pin.position[2]]}>
      {/* Куб проекта — собственный шейдер (грани, градиент, свечение рёбер) */}
      <mesh
        ref={cube}
        geometry={CUBE_GEO}
        material={mat}
        position={[0, CUBE * 0.5, 0]}
        dispose={null}
        onClick={(e) => { e.stopPropagation(); onSelect(pin.project.slug); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
      />
      {/* Свечение на земле вокруг куба — плоское пятно вместо источника света. */}
      <mesh ref={glow} geometry={GLOW_GEO} rotation-x={-Math.PI / 2} position={[0, 0.05, 0]} dispose={null}>
        <meshBasicMaterial
          map={glowTexture()}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.55}
        />
      </mesh>
      {/* Подпись — только при наведении или когда проект выбран */}
      {near && (hovered || active) && (
        <Html center position={[0, CUBE + 0.75 + pin.labelLane * 0.35, 0]} zIndexRange={[40, 0]}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onSelect(pin.project.slug); }}
            className={`whitespace-nowrap border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 ${
              active
                ? "border-offwhite bg-offwhite text-night"
                : "border-offwhite/60 bg-night/80 text-offwhite"
            }`}
          >
            {pin.project.name}
          </button>
        </Html>
      )}
    </group>
  );
}

// ─── Управление ──────────────────────────────────────────────────────────────
// Прицел — на западное побережье; камера заметно наклонена (перспектива/3D).
const DEFAULT_TARGET = new THREE.Vector3(-2, 0, -11);

function Controls({
  controlsRef,
  touch,
}: {
  controlsRef: React.MutableRefObject<any>;
  touch: boolean;
}) {
  // Во время движения камеры просим R3F временно снизить качество (AdaptiveDpr
  // ниже подхватывает) — кадры короче, камера идёт за пальцем без отставания.
  const regress = useThree((s) => s.performance.regress);
  return (
    <MapControls
      ref={controlsRef}
      makeDefault
      onChange={regress}
      enableDamping
      // Было 0.08 — камера догоняла палец ~0.5 с, это и читалось как «лаг».
      // 0.25 сохраняет плавность, но отклик почти мгновенный.
      dampingFactor={0.25}
      rotateSpeed={0.85}
      zoomSpeed={1.1}
      minDistance={5}
      maxDistance={70}
      maxPolarAngle={Math.PI / 2.15}
      minPolarAngle={0.2}
      target={DEFAULT_TARGET}
      screenSpacePanning={false}
      // Жесты пальцами закреплены явно, а не оставлены на умолчания библиотеки:
      // ОДИН палец — перемещение по карте, ДВА — щипок (приближение/отдаление)
      // и одновременно поворот с наклоном камеры при движении пары вверх/вниз.
      touches={{ ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE }}
      // На тач-экране палец толще курсора: чуть спокойнее поворот, чтобы карта
      // не «вырывалась» при двухпальцевом жесте.
      panSpeed={touch ? 1.35 : 1}
    />
  );
}

export default function MapScene({
  pins, activeSlug, selectedRegion, onSelect, onRegionSelect, controlsRef, reduceMotion = false, projectsWord, touch = false,
}: {
  pins: ProjectPin[];
  activeSlug: string | null;
  selectedRegion: RegionId | null;
  onSelect: (slug: string) => void;
  onRegionSelect: (id: RegionId) => void;
  controlsRef: React.MutableRefObject<any>;
  reduceMotion?: boolean;
  projectsWord: string;
  touch?: boolean;
}) {
  const animate = !reduceMotion;
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of pins) c[p.region] = (c[p.region] ?? 0) + 1;
    return c;
  }, [pins]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      // Наклонённый старт (перспектива), азимут 0 — компас 000°.
      camera={{ fov: 42, near: 0.1, far: 400, position: [-2, 26, 31] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      // Жесты должна получать сцена, а не браузер: иначе перетаскивание уходит в
      // прокрутку страницы, а щипок — в зум всей страницы. Обёртке ставим
      // touch-action здесь, а самому канвасу — правилом .map-canvas в globals.css:
      // OrbitControls при отключении прописывает канвасу инлайновый
      // touch-action: auto, и перебить его можно только !important.
      className="map-canvas"
      style={{ touchAction: "none" }}
      // Пока идёт жест — разрешение временно падает (AdaptiveDpr ниже), чтобы
      // кадр укладывался в бюджет и управление оставалось «липким» к пальцу.
      performance={{ min: 0.5 }}
      frameloop={reduceMotion ? "demand" : "always"}
      role="img"
      aria-label="Interactive 3D map of Phuket projects"
    >
      <color attach="background" args={["#05070b"]} />
      <fog attach="fog" args={["#05070b", 75, 230]} />
      {/* Низкий ambient + сильный боковой свет = выраженная светотень склонов
          (эффект hillshade, как на топокартах). */}
      <ambientLight intensity={0.38} color="#b8c2ce" />
      <directionalLight position={[-16, 14, 8]} intensity={1.9} color="#eaf0f6" />
      <directionalLight position={[12, 10, 24]} intensity={0.45} color="#93a3b8" />
      <Ocean animate={animate} />
      <Terrain />
      <Contours />
      <VectorMap />

      {/* Ромбы всех районов; тот, к которому подлетели, сам растворяется по
          близости камеры — на его месте вырастают кубы проектов. */}
      {REGIONS.map((r) => (
        <RegionDiamond
          key={r.id}
          id={r.id}
          name={r.name}
          count={counts[r.id] ?? 0}
          position={[r.marker[0], sampleHeight(r.marker[0], r.marker[1]) + r.lift, r.marker[1]]}
          active={selectedRegion === r.id}
          dimmed={selectedRegion !== null && selectedRegion !== r.id}
          projectsWord={projectsWord}
          onSelect={onRegionSelect}
        />
      ))}

      {/* Кубы всех проектов присутствуют всегда; проявляются сами по близости
          камеры (см. CUBE_FAR/CUBE_NEAR), поэтому зум в любое место острова
          «выращивает» кубы, а не только клик по району. */}
      {pins.map((pin) => (
        <Marker
          key={pin.project.slug}
          pin={pin}
          active={activeSlug === pin.project.slug}
          onSelect={onSelect}
          animate={animate}
        />
      ))}

      <Controls controlsRef={controlsRef} touch={touch} />
      <AdaptiveDpr />

      {!reduceMotion && (
        <EffectComposer>
          {/* Высокий порог: цветут только самые яркие пиксели (магистрали, берег),
          кубы при этом сохраняют форму и не превращаются в белые пятна. */}
      <Bloom intensity={1.1} luminanceThreshold={0.38} luminanceSmoothing={0.8} mipmapBlur radius={0.72} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
