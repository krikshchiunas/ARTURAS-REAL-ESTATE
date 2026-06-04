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

// Реальные проекты с Пхукета. Данные взяты из официальных презентаций,
// брошюр и прайс-листов застройщиков. Где информации нет — поле опускается
// (никаких выдуманных значений).
export type ProjectFact = { label: string; value: string };
export type ProjectUnit = { type: string; area: string };

export type Project = {
  slug: string;
  name: string;
  developer?: string;
  developerNote?: string;
  location: string;
  type: string;
  image: string;
  priceFrom: string;
  // 1–2 коротких преимущества для карточки-витрины (образ жизни/локация/бренд,
  // не инвест-цифры). Держим карточку лёгкой для сканирования взглядом.
  keyPoints: string[];
  summary: string;
  // Контент детальной страницы:
  concept: string;
  gallery: string[];
  highlights: ProjectFact[];
  units: ProjectUnit[];
  amenities: string[];
  locationPoints: ProjectFact[];
  features: string[];
  investment: string;
  payment?: string;
  spec: ProjectFact[];
};

export const projects: Project[] = [
  {
    slug: "silhouette",
    name: "Silhouette",
    developer: "The Zero Phuket",
    developerNote:
      "Британский девелопер с 25+ годами опыта и продажами более £120M. Принцип «British Standard — Thai Excellence», полностью интегрированное in-house управление.",
    location: "Най Янг Бич",
    type: "Кондоминиум",
    image: "/projects/silhouette.jpg",
    priceFrom: "от $125K",
    keyPoints: ["350 м до пляжа", "Рядом парк Сиринат"],
    summary:
      "Резиденция у пляжа Най Янг с прогнозируемой доходностью около 11% годовых.",
    concept:
      "Малоэтажный комплекс «природно-утончённого» прибрежного проживания в нескольких шагах от национального парка Сиринат на западном побережье Пхукета. EIA-одобренная эко-архитектура вдохновлена прибрежным светом и природными формами, формируя приватное малоплотное сообщество для тех, кто ищет уединение, связь с природой и инвестиционную отдачу.",
    gallery: [
      "/projects/silhouette/01-aerial.jpg",
      "/projects/silhouette/02-exterior.jpg",
      "/projects/silhouette/03-rooftop.jpg",
      "/projects/silhouette/04-suite-living.jpg",
      "/projects/silhouette/05-2bed-living.jpg",
      "/projects/silhouette/06-1bed-living.jpg",
      "/projects/silhouette/07-studio.jpg",
    ],
    highlights: [
      { label: "Доходность", value: "≈ 11% ROI" },
      { label: "Этажность", value: "5 этажей" },
      { label: "Резиденций", value: "150" },
      { label: "До пляжа", value: "350 м" },
    ],
    units: [
      { type: "Studio", area: "29,5–36,3 м²" },
      { type: "1 спальня", area: "37,5–46 м²" },
      { type: "1 спальня +", area: "44,4–52,4 м²" },
      { type: "2 спальни", area: "53,9–66,7 м²" },
      { type: "Penthouse Suite · 3 спальни", area: "83,8–108,3 м²" },
    ],
    amenities: [
      "Бассейн на крыше и Rooftop Bar",
      "Тренажёрный зал, спа, сауна и паровая",
      "Ice bath и зона восстановления",
      "Корты Padel и Pickleball",
      "Гольф-симулятор",
      "Открытый кинотеатр",
      "Коворкинг и переговорные",
      "Детский клуб",
      "Ресторан и wellness-центр",
      "EV-зарядки и шаттл на солнечной энергии",
      "Подземный паркинг",
      "Консьерж и охрана 24/7",
    ],
    locationPoints: [
      { label: "Пляж Най Янг", value: "350 м · 1 мин" },
      { label: "Парк Сиринат", value: "600 м" },
      { label: "Аэропорт Пхукета", value: "2,5 км · 5 мин" },
      { label: "Пляж Най Тон", value: "10 мин" },
      { label: "Blue Canyon Country Club", value: "12 мин" },
      { label: "Laguna Golf Phuket", value: "26 мин" },
    ],
    features: [
      "Прогнозируемая доходность ~11% ROI и потенциал роста в развивающейся локации",
      "Несколько шагов до пляжа Най Янг и парка Сиринат",
      "EIA-одобренная эко-устойчивая архитектура: солнечные панели, сбор дождевой воды",
      "Полностью интегрированное in-house управление и программа Zero Privilege",
      "Британские стандарты застройки: опыт 25+ лет, £120M+ продаж",
    ],
    investment:
      "Прогнозируемая доходность около 11% ROI с сильным потенциалом долгосрочного роста. Управление объектом и арендой — собственная команда девелопера, владельцам доступна эксклюзивная программа Zero Privilege.",
    payment:
      "Бронирование ≈ $2 900, первый платёж через 15 дней, далее гибкая рассрочка. Скидка 10% при полной оплате.",
    spec: [
      { label: "Срок сдачи", value: "2028 (старт 2026)" },
      { label: "Этажность", value: "5 этажей" },
      { label: "Резиденций", value: "150" },
      { label: "Площадь застройки", value: "13 476 м²" },
      { label: "Застройщик", value: "The Zero Phuket" },
    ],
  },
  {
    slug: "ayana-heights",
    name: "AYANA Heights",
    developer: "T.H Group",
    developerNote:
      "Международная компания (Китай, Таиланд, Испания, Австралия) в сфере недвижимости, гостеприимства и зелёной энергетики. Лауреат PropertyGuru и Dot Property Awards 2020–2023.",
    location: "Bangtao Bay · вид на море",
    type: "Кондо и таунхаусы",
    image: "/projects/ayana.jpg",
    priceFrom: "от $155K",
    keyPoints: ["Вид на море 270°", "Собственный парк"],
    summary:
      "Seaview-резиденции с собственным парком AYANA Park и панорамой на море под углом 270°.",
    concept:
      "Премиальный комплекс под слоганом «Flow your way». Концепция строится на низкой плотности застройки (коэффициент 1.2) и обилии пространства между зданиями — это гарантирует приватность и панорамные виды на море под углом 270°. Пятизвёздочный уровень сервиса и апартаменты с гостиничным управлением для тех, кто ищет единение с природой.",
    gallery: [
      "/projects/ayana/01-aerial.jpg",
      "/projects/ayana/02-exterior.jpg",
      "/projects/ayana/03-park.jpg",
      "/projects/ayana/04-exterior.jpg",
      "/projects/ayana/05-fitness.jpg",
      "/projects/ayana/06-lobby.jpg",
      "/projects/ayana/07-coworking.jpg",
    ],
    highlights: [
      { label: "Доходность", value: "9–12% годовых" },
      { label: "Территория", value: "31 рай · 8 зданий" },
      { label: "Резиденций", value: "543" },
      { label: "Бассейн", value: "1 800 м²" },
    ],
    units: [
      { type: "Студия (A)", area: "37,6 м²" },
      { type: "1 спальня (B1)", area: "43,42 м²" },
      { type: "1 спальня семейная (B2)", area: "57,57 м²" },
      { type: "2 спальни семейная (B3)", area: "57,57 м²" },
      { type: "2 спальни · вид на море (C)", area: "75,21 м²" },
      { type: "3 спальни · панорама 270° (D)", area: "112,89 м²" },
      { type: "Пентхаус (E) · freehold", area: "360,79 м²" },
    ],
    amenities: [
      "Бассейн 1 800 м²",
      "Общественный сад 8 000 м²",
      "Парк AYANA Park",
      "Фитнес-зал и сауна",
      "Коворкинг",
      "Детский клуб",
      "Pet-friendly зоны",
      "Лобби и общая гостиная 1 000 м²",
      "Два лифта на каждое здание",
      "Паркинг 260+ мест",
      "Охрана 24/7 и видеонаблюдение",
      "Электронные замки",
    ],
    locationPoints: [
      { label: "Пляж Layan", value: "3 мин" },
      { label: "Пляж Bangtao", value: "5 мин" },
      { label: "Пляж Naithon", value: "10 мин" },
      { label: "Laguna Golf", value: "5 мин" },
      { label: "Boat Avenue · Porto de Phuket", value: "10 мин" },
      { label: "Аэропорт Пхукета", value: "25 мин" },
    ],
    features: [
      "Низкая плотность застройки (1.2) — приватность и простор",
      "Панорамный вид на море под углом 270°",
      "Пятизвёздочный сервис и апартаменты с гостиничным управлением",
      "Привилегии владельцам: скидки на отель, рестораны и спа, приоритетное бронирование",
      "Локация рядом с Banyan Tree и Amanpuri",
    ],
    investment:
      "Годовая доходность от аренды 9–12%, рост стоимости при перепродаже через 3–5 лет — 20–50%. Управление и аренда обеспечиваются профессиональной командой; апартаменты с гостиничным управлением. Плата за обслуживание — ≈ $1,7/м² в месяц.",
    spec: [
      { label: "Территория", value: "31 рай · 49 600 м²" },
      { label: "Зданий", value: "8" },
      { label: "Резиденций", value: "543" },
      { label: "Пентхаусы", value: "Freehold" },
      { label: "Застройщик", value: "T.H Group" },
    ],
  },
  {
    slug: "sun-hills-layan",
    name: "Sun Hills Layan",
    developer: "Sun Hills Development",
    developerNote:
      "Девелопер с подрядным опытом с 2009 года и более 1,2 млн м² построенного. Управление объектом и арендой — Unicorn Hospitality (12+ отелей и 750+ апартаментов в 7+ странах).",
    location: "Лаян",
    type: "Кондоминиум",
    image: "/projects/sunhills-layan.jpg",
    priceFrom: "от $89K",
    keyPoints: ["Амбассадор — Хабиб", "Вертикальный сад"],
    summary:
      "Архитектура «вертикального сада» в Лаяне. Официальный амбассадор бренда — Хабиб Нурмагомедов.",
    concept:
      "Премиальный комплекс с архитектурой «вертикального сада»: каскадные террасы, утопающие в тропической зелени, и многоуровневые бассейны в центре. Официальный амбассадор бренда — Хабиб Нурмагомедов; партнёрство построено на ценностях дисциплины и долгосрочного мышления. Управление и сопровождение — Unicorn Hospitality, один из ведущих гостиничных операторов Юго-Восточной Азии.",
    gallery: [
      "/projects/sunhills-layan/01-exterior.jpg",
      "/projects/sunhills-layan/02-exterior.jpg",
      "/projects/sunhills-layan/03-pool.jpg",
      "/projects/sunhills-layan/04-terrace.jpg",
      "/projects/sunhills-layan/05-fitness.jpg",
      "/projects/sunhills-layan/06-restaurant.jpg",
      "/projects/sunhills-layan/07-lobby.jpg",
      "/projects/sunhills-layan/08-kids.jpg",
    ],
    highlights: [
      { label: "Доходность", value: "до 10% годовых" },
      { label: "Срок сдачи", value: "01.12.2027" },
      { label: "Резиденций", value: "585" },
      { label: "Управление", value: "Unicorn" },
    ],
    units: [
      { type: "Студия", area: "26,5–31,4 м²" },
      { type: "Студия + / 1 спальня", area: "35,6–45 м²" },
      { type: "1–2 спальни", area: "47,7–53,4 м²" },
      { type: "2 спальни", area: "60,8–72,9 м²" },
      { type: "2 спальни + (B+B)", area: "85 м²" },
    ],
    amenities: [
      "Многоуровневые открытые бассейны",
      "Зоны спа и джакузи у воды",
      "Фитнес-зал с панорамным видом",
      "Студия йоги",
      "Рестораны и зоны изысканной кухни",
      "Лаунж-зоны и лобби",
      "Коворкинг и переговорные",
      "Детский клуб",
      "Ландшафтные сады и зелёные террасы",
    ],
    locationPoints: [
      { label: "Район", value: "Лаян, западный берег Пхукета" },
      { label: "Пляжи Layan и Bangtao", value: "рядом" },
    ],
    features: [
      "Официальный амбассадор бренда — Хабиб Нурмагомедов",
      "Архитектура «вертикального сада» с каскадными зелёными террасами",
      "Управление Unicorn Hospitality — топ-оператор Юго-Восточной Азии",
      "Отделка «под ключ» включена в стоимость",
      "Рассрочка без удорожания до сдачи",
      "Чистая доходность ~9–10%+ по ключевым типам",
    ],
    investment:
      "Чистая доходность (Net Yield) от ~7%, по студиям и 1-спальным — около 9–10%+ к 8–10 году; ROI за 10 лет — до 270%+. Управление и аренда — Unicorn Hospitality. Отделка «под ключ» уже включена в стоимость юнита.",
    payment:
      "Рассрочка без удорожания: первоначальный взнос 35%, далее 15% / 20% / 20% / 10% — поэтапно до 01.12.2027.",
    spec: [
      { label: "Срок сдачи", value: "01.12.2027" },
      { label: "Резиденций", value: "585" },
      { label: "Управление", value: "Unicorn Hospitality" },
      { label: "Застройщик", value: "Sun Hills Development" },
    ],
  },
  {
    slug: "sun-hills-lakeside",
    name: "Sun Hills Lakeside",
    developer: "Sun Hills Development",
    developerNote:
      "Девелопер с 16+ годами опыта. Земля выкуплена в полную собственность ещё в 2019 году без кредитов. Управление — Unicorn Hospitality. Получены EIA и Construction Permit, блок А возведён «под крышу».",
    location: "Банг Тао · Лагуна",
    type: "Кондоминиум",
    image: "/projects/lakeside.jpg",
    priceFrom: "≈ $228K",
    keyPoints: ["Khabib Gym 1 500 м²", "7 мин до пляжа"],
    summary:
      "Резиденция у озёр Лагуны с тренировочным центром Khabib Gym. Официальный партнёр — Хабиб Нурмагомедов.",
    concept:
      "Премиальная резиденция у озёр Лагуны в Банг Тао, созданная как гибрид жилья и гостиничного бизнеса. Официальный партнёр проекта — Хабиб Нурмагомедов: на территории строится тренировочный центр мирового уровня Khabib Gym площадью 1 500 м² с программами спорта, wellness и восстановления. Актив «три-в-одном»: комфортная среда для жизни, стабильная аренда и выгодная перепродажа.",
    gallery: [
      "/projects/lakeside/01-exterior.jpg",
      "/projects/lakeside/02-exterior.jpg",
      "/projects/lakeside/03-aerial.jpg",
      "/projects/lakeside/04-pool.jpg",
      "/projects/lakeside/05-interior.jpg",
      "/projects/lakeside/06-interior.jpg",
      "/projects/lakeside/07-interior.jpg",
    ],
    highlights: [
      { label: "Доходность", value: "до 10% годовых" },
      { label: "Khabib Gym", value: "1 500 м²" },
      { label: "До пляжа Layan", value: "7 мин" },
      { label: "Капитализация", value: "от 40%" },
    ],
    units: [
      { type: "Студии", area: "30 / 35,6 / 40 / 47 / 48 м²" },
      { type: "1 спальня", area: "41,5 / 53,6 / 60 / 77 м²" },
      { type: "2 спальни", area: "71,2 / 89,2 м²" },
      { type: "3 спальни", area: "124,8 м²" },
    ],
    amenities: [
      "Khabib Gym — спортивный центр 1 500 м²",
      "Wellness и SPA-центр",
      "Бассейн на крыше + два бассейна во дворе (24 м и 15 м)",
      "Детский бассейн",
      "Rooftop-зоны с панорамой 360°",
      "Ресторан 155 м² и лаунж-бар",
      "Коворкинг и бизнес-зоны",
      "Детский клуб, площадки и летний кинотеатр",
      "Подземный паркинг",
      "Охрана 24/7 и шаттл до пляжа Layan",
      "Мобильное приложение и сервис 24/7",
      "Pet-friendly",
    ],
    locationPoints: [
      { label: "Пляж Layan", value: "7 мин" },
      { label: "Хайвей", value: "5 мин" },
      { label: "Porto de Phuket", value: "10 мин" },
      { label: "Аэропорт Пхукета", value: "20 мин" },
      { label: "Район", value: "Банг Тао · Лагуна" },
    ],
    features: [
      "Официальное партнёрство с Хабибом Нурмагомедовым и центр Khabib Gym",
      "Премиальная локация Банг Тао / Лагуна с видами на озёра",
      "Цена входа на 20–40% ниже аналогов, капитализация от 40%",
      "Гибрид жилья и отеля с управлением Unicorn Hospitality",
      "Богатая инфраструктура: спорт, SPA, бассейны, ресторан, коворкинг",
      "Круглогодичная загрузка 75–85%",
    ],
    investment:
      "Доходность до 10% годовых, капитализация за время строительства — от 40%, среднегодовая загрузка 75–85%. Управление — Unicorn Hospitality. Земля выкуплена в собственность в 2019 году, получены EIA и Construction Permit.",
    payment:
      "План на 5 платежей: взнос 30%, далее 20% (июль 2026), 20% (декабрь 2026), 20% (апрель 2027), 10% (сентябрь 2027). Рассрочка от застройщика — до марта 2028.",
    spec: [
      { label: "Срок сдачи", value: "Сентябрь 2027" },
      { label: "Khabib Gym", value: "1 500 м²" },
      { label: "Управление", value: "Unicorn Hospitality" },
      { label: "Застройщик", value: "Sun Hills Development" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

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
