import { getProjects, type Project } from "@/lib/i18n";

// География стилизованной карты Пхукета для редизайна. Координаты — в мировом
// пространстве сцены (плоскость XZ, север = -Z). Реальные пляжи западного
// побережья идут с севера на юг: Nai Yang → Layan → Bang Tao → Laguna.
// Точные широты/долготы для клона не нужны — важен узнаваемый силуэт острова
// и корректная кластеризация проектов по районам.

export type RegionId = "nai-yang" | "layan" | "bang-tao" | "laguna";

export type Region = {
  id: RegionId;
  name: string;
  anchor: [number, number]; // центр района (x, z)
  spread: number; // радиус разброса маркеров
};

export const REGIONS: Region[] = [
  { id: "nai-yang", name: "Nai Yang", anchor: [-7, -26], spread: 6 },
  { id: "layan", name: "Layan", anchor: [-13, -6], spread: 5 },
  { id: "bang-tao", name: "Bang Tao", anchor: [-15, 8], spread: 5.5 },
  { id: "laguna", name: "Laguna", anchor: [-9, 16], spread: 4 },
];

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

// Детерминированный хэш slug → [0,1). Одинаковая раскладка маркеров при каждом
// рендере и на сервере, и на клиенте (без Math.random в разметке).
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

// Раскладываем проекты по их районам детерминированным «золотым» разбросом
// вокруг якоря, чтобы маркеры не накладывались.
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
    const r = REGIONS.find((x) => x.id === region)!;
    const idx = perRegion[region]++;
    // Спираль Вогеля: равномерное заполнение диска без наложений.
    const golden = 2.399963; // радианы
    const t = idx + 0.6;
    const radius = r.spread * Math.sqrt(t / 4) * (0.6 + hash01(project.slug, 7) * 0.5);
    const angle = t * golden + hash01(project.slug, 13) * 0.6;
    const x = r.anchor[0] + Math.cos(angle) * radius;
    const z = r.anchor[1] + Math.sin(angle) * radius;
    // Соседние по индексу подписи уводим на разные высоты (3 дорожки), чтобы
    // горизонтальный текст меток не перекрывался в плотных районах.
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
