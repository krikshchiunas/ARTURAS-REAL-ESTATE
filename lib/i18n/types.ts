// Типы локализованного контента. Один файл локали (lib/i18n/locales/<lang>.ts)
// поставляет объект LocaleData целиком: интерфейсные строки (ui), мета сайта
// (site), цифры (stats), услуги (services) и тексты объектов (projects).
//
// Языко-НЕЗАВИСИМЫЕ данные (slug, картинки, галереи, ссылки, span сетки) живут
// в lib/i18n/meta.ts и НЕ дублируются по языкам.

export type Stat = { value: string; label: string };

export type ProjectFact = { label: string; value: string };
export type ProjectUnit = { type: string; area: string };

// Переводимая часть объекта (тексты). Ключуется по slug в каждой локали.
export type ProjectText = {
  name: string;
  developer?: string;
  developerNote?: string;
  location: string;
  type: string;
  priceFrom: string;
  keyPoints: string[];
  summary: string;
  concept: string;
  highlights: ProjectFact[];
  units: ProjectUnit[];
  amenities: string[];
  locationPoints: ProjectFact[];
  features: string[];
  investment: string;
  payment?: string;
  spec: ProjectFact[];
};

// Переводимая часть услуги (заголовок + описание). Ключуется по key.
export type ServiceText = { title: string; body: string };

// Интерфейсные строки.
export type Dictionary = {
  nav: { approach: string; projects: string; founder: string; services: string; contact: string };
  a11y: { mainNav: string; menu: string; footerNav: string; skipToContent: string };
  common: { whatsapp: string; telegram: string; allChannels: string; socialChannelLabel: string };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleEmphasis: string;
    titleRest: string;
    body: string;
  };
  intro: {
    eyebrow: string;
    manifesto: string;
  };
  stats: { eyebrow: string; title: string; body: string };
  projectsSection: { eyebrow: string; heading: string; cardCta: string };
  founder: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    p1: string;
    p2: string;
    p3: string;
    note: string;
  };
  services: { eyebrow: string; title: string; body: string };
  contact: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    body: string;
    fields: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      budgetHelper: string;
      message: string;
      messagePlaceholder: string;
      telegram: string;
      telegramPlaceholder: string;
      whatsapp: string;
      whatsappPlaceholder: string;
      optional: string;
    };
    errors: {
      name: string;
      message: string;
      contact: string;
      generic: string;
      network: string;
    };
    consent: string;
    submit: string;
    submitting: string;
    success: { title: string; body: string; again: string };
  };
  footer: { rights: string; privacy: string; terms: string };
  project: {
    backToProjects: string;
    conceptEyebrow: string;
    conceptTitle: string;
    learnMore: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryAlt: string; // содержит {n}
    unitsEyebrow: string;
    unitsTitle: string;
    amenitiesEyebrow: string;
    amenitiesTitle: string;
    locationEyebrow: string;
    investmentEyebrow: string;
    investmentTitle: string;
    paymentLabel: string;
    featuresEyebrow: string;
    featuresTitle: string;
    developerEyebrow: string;
    specEyebrow: string;
    specTitle: string;
    ctaTitle: string; // содержит {name}
    ctaBody: string;
  };
  meta: {
    tagline: string;
    region: string;
    description: string;
    homeTitle: string; // содержит {name} и {tagline} — собирается в layout
  };
};

export type LocaleData = {
  dictionary: Dictionary;
  stats: Stat[];
  services: Record<string, ServiceText>;
  projects: Record<string, ProjectText>;
};
