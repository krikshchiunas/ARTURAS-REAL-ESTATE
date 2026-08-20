import { getProjects, type Project } from "@/lib/i18n";

// География карты Пхукета для редизайна. В отличие от прежней процедурной
// «болванки» острова, теперь геометрия берётся из реальных данных OpenStreetMap
// (береговая линия + дорожная сеть, файл phuketVectors.json), а проекты стоят на
// своих настоящих координатах западного побережья: Nai Yang → Layan → Bang Tao →
// Laguna (с севера на юг).
//
// ── Проекция lat/lng → мировые координаты сцены (плоскость XZ) ────────────────
// Равнопромежуточная проекция с центром на острове. Восток = +X, север = −Z
// (камера стартует с юга, компас показывает 000°). Те же константы зашиты в
// scripts, которыми сгенерирован phuketVectors.json — менять их нужно
// синхронно, иначе дороги и пины «разъедутся».
const LAT0 = 7.9375;
const LNG0 = 98.345;
const M_PER_LAT = 111320;
const M_PER_LNG = 111320 * Math.cos((LAT0 * Math.PI) / 180);
const SCALE = 0.001227; // мировых единиц на метр (весь остров ≈ 60 ед. в высоту)

export function projectLatLng(lat: number, lng: number): [number, number] {
  const east = (lng - LNG0) * M_PER_LNG;
  const north = (lat - LAT0) * M_PER_LAT;
  return [east * SCALE, -north * SCALE];
}

export type RegionId = "nai-yang" | "layan" | "bang-tao" | "laguna";

export type Region = {
  id: RegionId;
  name: string;
  // focus — реальный центроид района (куда летит камера при выборе).
  focus: [number, number];
  // marker — точка отрисовки ромба-кластера (всегда на суше).
  marker: [number, number];
  // lift — высота ромба над рельефом. Layan/Bang Tao/Laguna в реальности
  // примыкают друг к другу, и на общем плане их подписи наслаивались. Разводим
  // их не по карте (география осталась честной), а ПО ВЫСОТЕ — подписи встают на
  // разных уровнях экрана и перестают сталкиваться.
  lift: number;
};

// marker-позиции сверены с рельефом: каждая уверенно на суше (в радиусе 0.6 ед.
// нет воды). Прежний marker Bang Tao [-10, -6.6] попадал в море — берег на той
// широте начинается только с x≈-7.3, а «высота 10 м» там была артефактом DEM
// на мелководье.
export const REGIONS: Region[] = [
  { id: "nai-yang", name: "Nai Yang", focus: [-5.1, -20.5], marker: [-5.5, -20.5], lift: 3.2 },
  { id: "layan", name: "Layan", focus: [-5.4, -9.6], marker: [-6.2, -11.2], lift: 4.0 },
  { id: "bang-tao", name: "Bang Tao", focus: [-6.5, -8.1], marker: [-6.4, -8.3], lift: 3.6 },
  { id: "laguna", name: "Laguna", focus: [-5.4, -8.3], marker: [-4.2, -6.6], lift: 0.9 },
];

// Реальные координаты проектов (lat, lng). Приблизительны с точностью до
// пляжа/участка — Артурас сверит и поправит точечно. Порядок роли не играет:
// привязка к району идёт через regionOf(location), а позиция — отсюда.
export const PROJECT_COORDS: Record<string, [number, number]> = {
  // Nai Yang (север, у аэропорта)
  silhouette: [8.0875, 98.3055],
  balcony: [8.0795, 98.3005],
  serenity: [8.0935, 98.308],
  olive: [8.0905, 98.315],
  // Layan
  "bellevue-beachfront": [8.016, 98.2945],
  "sun-hills-layan": [8.007, 98.3035],
  "layan-green-park": [8.008, 98.308],
  "layan-verde": [8.001, 98.313],
  // Bang Tao
  "gardens-of-eden": [8.001, 98.287],
  "ayana-heights": [7.993, 98.2995],
  "siamese-bangtao": [7.9955, 98.3045],
  // Laguna
  "the-ozone": [7.9975, 98.301],
  "sun-hills-lakeside": [7.999, 98.3095],
};

// Классификация проекта по строке location. Порядок важен: «Laguna» проверяем
// раньше «Bang Tao», т.к. Laguna лежит внутри района Bang Tao и часто пишется
// как «Laguna · Bang Tao».
export function regionOf(location: string): RegionId {
  const l = location.toLowerCase();
  if (l.includes("nai yang") || l.includes("naiyang")) return "nai-yang";
  if (l.includes("laguna")) return "laguna";
  if (l.includes("layan")) return "layan";
  return "bang-tao"; // Bang Tao / Bangtao / всё прочее западное побережье
}

// Детерминированный хэш slug → [0,1). Нужен только как запасной раскладчик, если
// у проекта вдруг нет реальных координат в PROJECT_COORDS.
function hash01(str: string, salt: number): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export type ProjectPin = {
  project: Project;
  region: RegionId;
  position: [number, number, number]; // x, y, z в мире
  labelLane: number; // 0..2 — вертикальная «дорожка» подписи против наложений
};

// Раскладываем проекты по их настоящим координатам. Если координат нет —
// падаем на детерминированный разброс вокруг центроида района (страховка).
export function buildPins(lang: string): ProjectPin[] {
  const projects = getProjects(lang);
  const perRegion: Record<RegionId, number> = {
    "nai-yang": 0,
    layan: 0,
    "bang-tao": 0,
    laguna: 0,
  };

  return projects.map((project) => {
    const region = regionOf(project.location);
    const idx = perRegion[region]++;
    const coord = PROJECT_COORDS[project.slug];
    let x: number;
    let z: number;
    if (coord) {
      [x, z] = projectLatLng(coord[0], coord[1]);
    } else {
      const r = REGIONS.find((v) => v.id === region)!;
      const golden = 2.399963;
      const t = idx + 0.6;
      const radius = 2 * Math.sqrt(t / 4) * (0.6 + hash01(project.slug, 7) * 0.5);
      const angle = t * golden + hash01(project.slug, 13) * 0.6;
      x = r.focus[0] + Math.cos(angle) * radius;
      z = r.focus[1] + Math.sin(angle) * radius;
    }
    return { project, region, position: [x, 1.4, z], labelLane: idx % 3 };
  });
}

export function regionCounts(lang: string): Record<RegionId, number> {
  const counts: Record<RegionId, number> = {
    "nai-yang": 0,
    layan: 0,
    "bang-tao": 0,
    laguna: 0,
  };
  for (const p of getProjects(lang)) counts[regionOf(p.location)]++;
  return counts;
}
