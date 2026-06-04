// Контент сайта. Здесь только реальная информация, предоставленная клиентом.
// Каталог объектов недвижимости пока не добавлен — будет наполнен реальными
// объектами (фото, цены, спецификации) после их выгрузки.

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "15", label: "лет опыта в недвижимости" },
  { value: "70+", label: "объектов в портфеле" },
  { value: "Пхукет", label: "фокус-регион работы" },
  { value: "Под ключ", label: "от подбора до управления объектом" },
];

// Реальные проекты с Пхукета. Данные взяты из брошюр и прайс-листов клиента.
// Где информации нет — поле не заполняется (никаких выдуманных значений).
export type ProjectFact = { label: string; value: string };

export type Project = {
  name: string;
  developer?: string;
  location: string;
  type: string;
  image: string;
  priceFrom: string;
  summary: string;
  facts: ProjectFact[];
};

export const projects: Project[] = [
  {
    name: "Silhouette",
    developer: "The Zero Phuket",
    location: "Най Янг Бич",
    type: "Кондоминиум",
    image: "/projects/silhouette.jpg",
    priceFrom: "от ฿4,4M",
    summary:
      "Резиденция у пляжа Най Янг с прогнозируемой доходностью около 11% годовых.",
    facts: [
      { label: "Планировки", value: "Studio 35.2 · 1BR 37.5 · 2BR 54 · 3BR 91 м²" },
      { label: "Доходность", value: "≈ 11% годовых" },
      { label: "Локация", value: "Най Янг, север Пхукета" },
    ],
  },
  {
    name: "AYANA Heights",
    developer: "AYANA",
    location: "Вид на море и горы",
    type: "Кондо и таунхаусы",
    image: "/projects/ayana.jpg",
    priceFrom: "от ฿5,43M",
    summary:
      "Seaview-резиденции с собственным парком AYANA Park площадью более 8000 м².",
    facts: [
      { label: "Планировки", value: "1BR 43–58 · 2BR 52–76 · 3BR 113–117 м²" },
      { label: "Таунхаусы", value: "131–180 м²" },
      { label: "Инфраструктура", value: "AYANA Park 8000+ м²" },
    ],
  },
  {
    name: "Sun Hills Layan",
    location: "Лаян",
    type: "Кондоминиум",
    image: "/projects/sunhills-layan.jpg",
    priceFrom: "от ฿3,13M",
    summary:
      "Проект в Лаяне с амбассадором Хабибом Нурмагомедовым. Доходность до 10% годовых.",
    facts: [
      { label: "Планировки", value: "Studio 30.4 · 1BR 35.6–42.5 · 2BR 51.8–53.8 м²" },
      { label: "Доходность", value: "до 10% годовых" },
      { label: "Срок сдачи", value: "01.12.2027" },
    ],
  },
  {
    name: "Sun Hills Lakeside",
    location: "Банг Тао · Лагуна",
    type: "Кондоминиум",
    image: "/projects/lakeside.jpg",
    priceFrom: "≈ ฿8M",
    summary:
      "Резиденция у озера в районе Лагуны. Партнёрство с Хабибом, доходность до 10% годовых.",
    facts: [
      { label: "Планировки", value: "Studio 30 / 40 / 47 · 1-room 41.5 / 53.6 м²" },
      { label: "Доходность", value: "до 10% годовых" },
      { label: "Срок сдачи", value: "Сентябрь 2027" },
    ],
  },
];

export type Service = {
  title: string;
  body: string;
  span: string;
  image?: string;
};

// Семь услуг из брифа. Асимметричный bento без пустых ячеек (6-колоночная сетка).
export const services: Service[] = [
  {
    title: "Подбор недвижимости",
    body: "Выбор объекта под вашу цель: жизнь, образ жизни, арендный доход или инвестиция.",
    span: "md:col-span-3 md:row-span-2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Сопровождение сделки",
    body: "Полная поддержка от выбора объекта до регистрации права собственности.",
    span: "md:col-span-3",
  },
  {
    title: "Инвестиционный анализ",
    body: "Оценка арендной доходности, потенциала роста и стратегии вложения.",
    span: "md:col-span-3",
  },
  {
    title: "Проверка застройщика",
    body: "Анализ репутации девелопера, качества проекта и рисков до покупки.",
    span: "md:col-span-2",
  },
  {
    title: "Управление объектом",
    body: "Решения по управлению недвижимостью после покупки.",
    span: "md:col-span-2",
  },
  {
    title: "Сдача в аренду",
    body: "Подготовка и позиционирование объекта для арендного дохода.",
    span: "md:col-span-2",
  },
  {
    title: "Релокация в Таиланд",
    body: "Сопровождение переезда: от первого визита до обустройства жизни на Пхукете.",
    span: "md:col-span-6",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=80",
  },
];
