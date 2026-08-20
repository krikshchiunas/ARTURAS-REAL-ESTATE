// Строки оболочки и страниц редизайна. EN и RU — авторские, UK/DE/TH — полные
// переводы (фаза «Контент и локали»). Названия районов Пхукета остаются
// латиницей во всех языках — это устоявшиеся топонимы.

import type { Locale } from "@/lib/i18n/config";

type Chapter = {
  tag: string;
  title: string;
  body: string;
  cta?: string;
  ctaHref: "projects" | "about" | "contact" | "map";
};

export type ChromeDict = {
  menu: string;
  close: string;
  soundOn: string;
  soundOff: string;
  chat: string;
  prev: string;
  next: string;
  projectsWord: string;
  links: string;
  workTitle: string;
  workBody: string;
  workCta: string;
  rights: string;
  nav: { home: string; about: string; projects: string; contact: string };
  preloader: { loading: string; loaded: string; ready: string };
  stubs: {
    about: { chapter: string; title: string; sub: string };
    projects: { chapter: string; title: string; sub: string };
    contact: { chapter: string; title: string; sub: string };
  };
  about: {
    specTitle: string;
    specSubtitle: string;
    specs: readonly (readonly [string, string])[];
    processChapter: string;
  };
  contactPage: {
    infoTitle: string;
    infoSubtitle: string;
    formTitle: string;
    directLabel: string;
    socialsLabel: string;
  };
  home: {
    chapters: readonly Chapter[];
    scrollHint: string;
    fallbackNote: string;
  };
  mapPage: {
    hudTitle: string;
    projectList: string;
    close: string;
    filters: string;
    allRegions: string;
    zoom: string;
    discoverMore: string;
    clickToExplore: string;
    projectLabel: string;
    locationLabel: string;
    typeLabel: string;
    regionLabel: string;
    resetView: string;
    introTitle: string;
    introCards: readonly { title: string; body: string }[];
    enterMap: string;
  };
  projectsPage: {
    chapter: string;
    title: string;
    sub: string;
    openOnMap: string;
    headers: { project: string; location: string; type: string };
  };
};

const en: ChromeDict = {
  menu: "Menu",
  close: "Close",
  soundOn: "Sound On",
  soundOff: "Sound Off",
  chat: "Chat with us",
  prev: "Prev.",
  next: "Next",
  projectsWord: "Projects",
  links: "Links",
  workTitle: "Work with us",
  workBody:
    "We are not just brokers. We are analysts, negotiators, legal guides and locals — coming together to shape your future in Phuket.",
  workCta: "Get in touch",
  rights: "All rights reserved",
  nav: { home: "Home", about: "About", projects: "Projects", contact: "Contact" },
  preloader: { loading: "Loading content", loaded: "Loaded", ready: "Ready to Explore" },
  stubs: {
    about: {
      chapter: "002 — About",
      title: "The most trusted advisor in Phuket",
      sub: "Fifteen years of hands-on experience in real estate, analysis and investment.",
    },
    projects: {
      chapter: "003 — Projects",
      title: "Spaces that matter",
      sub: "Thirteen developments across Bang Tao, Layan, Nai Yang and Laguna.",
    },
    contact: {
      chapter: "004 — Contact",
      title: "Get in touch",
      sub: "Contact us to learn about the Arturas vision — and your next property.",
    },
  },
  about: {
    specTitle: "About Arturas",
    specSubtitle: "Information Data",
    specs: [
      ["Experience", "15+ years"],
      ["Founder", "Arturas"],
      ["Base", "Phuket, Thailand"],
      ["Focus", "Residential · Investment"],
      ["Languages", "RU · UK · EN · DE · TH"],
      ["Approach", "Personal, end-to-end"],
    ],
    processChapter: "005 — Process",
  },
  contactPage: {
    infoTitle: "Contact info",
    infoSubtitle: "Direct channels",
    formTitle: "Drop us a line",
    directLabel: "Direct",
    socialsLabel: "All channels",
  },
  home: {
    scrollHint: "Scroll to explore",
    fallbackNote: "Motion reduced — story shown as pages.",
    chapters: [
      {
        tag: "Future",
        title: "We shape your future in Phuket",
        body: "For fifteen years Arturas has guided buyers and investors through the island's real estate — from the first viewing to the keys, and beyond.",
        cta: "Explore projects",
        ctaHref: "projects",
      },
      {
        tag: "Insight",
        title: "Numbers before promises",
        body: "More than five hundred investment models calculated. Every recommendation starts with data — yield, risk, exit.",
        cta: "Our approach",
        ctaHref: "about",
      },
      {
        tag: "Network",
        title: "A network of trusted experts",
        body: "Developers, lawyers, banks and local specialists — one team assembled around your goal.",
        ctaHref: "about",
      },
      {
        tag: "Precision",
        title: "Only fifty make the cut",
        body: "Two hundred properties analyzed in detail. Fewer than a quarter pass our screening — you see only the strongest.",
        cta: "See the map",
        ctaHref: "map",
      },
      {
        tag: "Purpose",
        title: "Property that serves your goal",
        body: "Living, lifestyle, rental income or capital growth — the strategy comes first, the property follows.",
        ctaHref: "about",
      },
      {
        tag: "Legacy",
        title: "Assets that endure",
        body: "We build relationships measured in years and portfolios that outlast trends. Phuket is just the beginning.",
        cta: "Start the journey",
        ctaHref: "contact",
      },
    ],
  },
  mapPage: {
    hudTitle: "Phuket — Interactive map",
    projectList: "Project list",
    close: "Close",
    filters: "Filters",
    allRegions: "All regions",
    zoom: "Zoom",
    discoverMore: "Discover more",
    clickToExplore: "Click to explore",
    projectLabel: "Project",
    locationLabel: "Location",
    typeLabel: "Type",
    regionLabel: "Region",
    resetView: "Reset view",
    introTitle: "How to use the map",
    introCards: [
      { title: "Scroll", body: "Zoom in and out of the map" },
      { title: "Drag", body: "Move around" },
      { title: "Click", body: "View project details" },
    ],
    enterMap: "Enter the map",
  },
  projectsPage: {
    chapter: "003 — Projects",
    title: "Spaces that matter",
    sub: "Thirteen developments across Bang Tao, Layan, Nai Yang and Laguna — each screened for quality, yield and location.",
    openOnMap: "Open on map",
    headers: { project: "Project", location: "Location", type: "Type" },
  },
};

const ru: ChromeDict = {
  menu: "Меню",
  close: "Закрыть",
  soundOn: "Звук вкл",
  soundOff: "Звук выкл",
  chat: "Напишите нам",
  prev: "Назад",
  next: "Далее",
  projectsWord: "Проектов",
  links: "Ссылки",
  workTitle: "Работаем вместе",
  workBody:
    "Мы не просто брокеры. Мы аналитики, переговорщики, юридические проводники и местные — вместе строим ваше будущее на Пхукете.",
  workCta: "Связаться",
  rights: "Все права защищены",
  nav: { home: "Главная", about: "О нас", projects: "Проекты", contact: "Контакт" },
  preloader: { loading: "Загрузка контента", loaded: "Загружено", ready: "Готово к просмотру" },
  stubs: {
    about: {
      chapter: "002 — О нас",
      title: "Надёжный советник по Пхукету",
      sub: "Пятнадцать лет практики в недвижимости, аналитике и инвестициях.",
    },
    projects: {
      chapter: "003 — Проекты",
      title: "Пространства со смыслом",
      sub: "Тринадцать проектов в Bang Tao, Layan, Nai Yang и Laguna.",
    },
    contact: {
      chapter: "004 — Контакт",
      title: "Свяжитесь с нами",
      sub: "Расскажем о подходе Arturas — и вашем следующем объекте.",
    },
  },
  about: {
    specTitle: "Об Arturas",
    specSubtitle: "Информационные данные",
    specs: [
      ["Опыт", "15+ лет"],
      ["Основатель", "Артурас"],
      ["База", "Пхукет, Таиланд"],
      ["Фокус", "Жильё · Инвестиции"],
      ["Языки", "RU · UK · EN · DE · TH"],
      ["Подход", "Личный, под ключ"],
    ],
    processChapter: "005 — Процесс",
  },
  contactPage: {
    infoTitle: "Контакты",
    infoSubtitle: "Прямые каналы",
    formTitle: "Напишите нам",
    directLabel: "Напрямую",
    socialsLabel: "Все каналы",
  },
  home: {
    scrollHint: "Листайте вниз",
    fallbackNote: "Анимации отключены — история показана страницами.",
    chapters: [
      {
        tag: "Будущее",
        title: "Мы строим ваше будущее на Пхукете",
        body: "Пятнадцать лет Артурас ведёт покупателей и инвесторов по рынку острова — от первого просмотра до ключей и дальше.",
        cta: "Смотреть проекты",
        ctaHref: "projects",
      },
      {
        tag: "Аналитика",
        title: "Сначала цифры, потом обещания",
        body: "Более пятисот инвестиционных моделей. Каждая рекомендация начинается с данных — доходность, риски, выход.",
        cta: "Наш подход",
        ctaHref: "about",
      },
      {
        tag: "Команда",
        title: "Сеть проверенных экспертов",
        body: "Застройщики, юристы, банки и местные специалисты — одна команда вокруг вашей цели.",
        ctaHref: "about",
      },
      {
        tag: "Отбор",
        title: "Проходят только пятьдесят",
        body: "Двести объектов детально изучены. Меньше четверти проходят наш отбор — вы видите только сильнейшие.",
        cta: "Открыть карту",
        ctaHref: "map",
      },
      {
        tag: "Цель",
        title: "Недвижимость под вашу цель",
        body: "Жизнь, лайфстайл, аренда или рост капитала — сначала стратегия, потом объект.",
        ctaHref: "about",
      },
      {
        tag: "Наследие",
        title: "Активы, которые остаются",
        body: "Мы строим отношения на годы и портфели, которые переживают тренды. Пхукет — только начало.",
        cta: "Начать путь",
        ctaHref: "contact",
      },
    ],
  },
  mapPage: {
    hudTitle: "Пхукет — интерактивная карта",
    projectList: "Список проектов",
    close: "Закрыть",
    filters: "Фильтры",
    allRegions: "Все районы",
    zoom: "Масштаб",
    discoverMore: "Подробнее",
    clickToExplore: "Нажмите, чтобы изучить",
    projectLabel: "Проект",
    locationLabel: "Локация",
    typeLabel: "Тип",
    regionLabel: "Район",
    resetView: "Сбросить вид",
    introTitle: "Как пользоваться картой",
    introCards: [
      { title: "Скролл", body: "Приближайте и отдаляйте карту" },
      { title: "Перетаскивание", body: "Перемещайтесь по карте" },
      { title: "Клик", body: "Открывайте детали проекта" },
    ],
    enterMap: "Открыть карту",
  },
  projectsPage: {
    chapter: "003 — Проекты",
    title: "Пространства со смыслом",
    sub: "Тринадцать проектов в Bang Tao, Layan, Nai Yang и Laguna — каждый проверен на качество, доходность и локацию.",
    openOnMap: "Открыть на карте",
    headers: { project: "Проект", location: "Локация", type: "Тип" },
  },
};

const uk: ChromeDict = {
  menu: "Меню",
  close: "Закрити",
  soundOn: "Звук увімк",
  soundOff: "Звук вимк",
  chat: "Напишіть нам",
  prev: "Назад",
  next: "Далі",
  projectsWord: "Проєктів",
  links: "Посилання",
  workTitle: "Працюймо разом",
  workBody:
    "Ми не просто брокери. Ми аналітики, перемовники, юридичні провідники та місцеві — разом будуємо ваше майбутнє на Пхукеті.",
  workCta: "Зв'язатися",
  rights: "Всі права захищені",
  nav: { home: "Головна", about: "Про нас", projects: "Проєкти", contact: "Контакт" },
  preloader: { loading: "Завантаження", loaded: "Завантажено", ready: "Готово до перегляду" },
  stubs: {
    about: {
      chapter: "002 — Про нас",
      title: "Надійний радник із Пхукету",
      sub: "П'ятнадцять років практики в нерухомості, аналітиці та інвестиціях.",
    },
    projects: {
      chapter: "003 — Проєкти",
      title: "Простори зі змістом",
      sub: "Тринадцять проєктів у Bang Tao, Layan, Nai Yang та Laguna.",
    },
    contact: {
      chapter: "004 — Контакт",
      title: "Зв'яжіться з нами",
      sub: "Розповімо про підхід Arturas — і ваш наступний об'єкт.",
    },
  },
  about: {
    specTitle: "Про Arturas",
    specSubtitle: "Інформаційні дані",
    specs: [
      ["Досвід", "15+ років"],
      ["Засновник", "Артурас"],
      ["База", "Пхукет, Таїланд"],
      ["Фокус", "Житло · Інвестиції"],
      ["Мови", "RU · UK · EN · DE · TH"],
      ["Підхід", "Особистий, під ключ"],
    ],
    processChapter: "005 — Процес",
  },
  contactPage: {
    infoTitle: "Контакти",
    infoSubtitle: "Прямі канали",
    formTitle: "Напишіть нам",
    directLabel: "Напряму",
    socialsLabel: "Всі канали",
  },
  home: {
    scrollHint: "Гортайте вниз",
    fallbackNote: "Анімації вимкнено — історію показано сторінками.",
    chapters: [
      {
        tag: "Майбутнє",
        title: "Ми будуємо ваше майбутнє на Пхукеті",
        body: "П'ятнадцять років Артурас веде покупців та інвесторів ринком острова — від першого перегляду до ключів і далі.",
        cta: "Дивитися проєкти",
        ctaHref: "projects",
      },
      {
        tag: "Аналітика",
        title: "Спершу цифри, потім обіцянки",
        body: "Понад п'ятсот інвестиційних моделей. Кожна рекомендація починається з даних — дохідність, ризики, вихід.",
        cta: "Наш підхід",
        ctaHref: "about",
      },
      {
        tag: "Команда",
        title: "Мережа перевірених експертів",
        body: "Забудовники, юристи, банки та місцеві фахівці — одна команда навколо вашої мети.",
        ctaHref: "about",
      },
      {
        tag: "Відбір",
        title: "Проходять лише п'ятдесят",
        body: "Двісті об'єктів детально вивчено. Менше чверті проходять наш відбір — ви бачите лише найсильніші.",
        cta: "Відкрити мапу",
        ctaHref: "map",
      },
      {
        tag: "Мета",
        title: "Нерухомість під вашу мету",
        body: "Життя, лайфстайл, оренда чи зростання капіталу — спершу стратегія, потім об'єкт.",
        ctaHref: "about",
      },
      {
        tag: "Спадок",
        title: "Активи, що залишаються",
        body: "Ми будуємо стосунки на роки та портфелі, які переживають тренди. Пхукет — лише початок.",
        cta: "Почати шлях",
        ctaHref: "contact",
      },
    ],
  },
  mapPage: {
    hudTitle: "Пхукет — інтерактивна мапа",
    projectList: "Список проєктів",
    close: "Закрити",
    filters: "Фільтри",
    allRegions: "Всі райони",
    zoom: "Масштаб",
    discoverMore: "Детальніше",
    clickToExplore: "Натисніть, щоб дослідити",
    projectLabel: "Проєкт",
    locationLabel: "Локація",
    typeLabel: "Тип",
    regionLabel: "Район",
    resetView: "Скинути вид",
    introTitle: "Як користуватися мапою",
    introCards: [
      { title: "Скрол", body: "Наближайте та віддаляйте мапу" },
      { title: "Перетягування", body: "Пересувайтеся мапою" },
      { title: "Клік", body: "Відкривайте деталі проєкту" },
    ],
    enterMap: "Відкрити мапу",
  },
  projectsPage: {
    chapter: "003 — Проєкти",
    title: "Простори зі змістом",
    sub: "Тринадцять проєктів у Bang Tao, Layan, Nai Yang та Laguna — кожен перевірено на якість, дохідність і локацію.",
    openOnMap: "Відкрити на мапі",
    headers: { project: "Проєкт", location: "Локація", type: "Тип" },
  },
};

const de: ChromeDict = {
  menu: "Menü",
  close: "Schließen",
  soundOn: "Ton an",
  soundOff: "Ton aus",
  chat: "Schreiben Sie uns",
  prev: "Zurück",
  next: "Weiter",
  projectsWord: "Projekte",
  links: "Links",
  workTitle: "Arbeiten wir zusammen",
  workBody:
    "Wir sind nicht nur Makler. Wir sind Analysten, Verhandler, juristische Begleiter und Einheimische — gemeinsam gestalten wir Ihre Zukunft auf Phuket.",
  workCta: "Kontakt aufnehmen",
  rights: "Alle Rechte vorbehalten",
  nav: { home: "Start", about: "Über uns", projects: "Projekte", contact: "Kontakt" },
  preloader: { loading: "Inhalte laden", loaded: "Geladen", ready: "Bereit zum Erkunden" },
  stubs: {
    about: {
      chapter: "002 — Über uns",
      title: "Der vertrauenswürdige Berater für Phuket",
      sub: "Fünfzehn Jahre Praxis in Immobilien, Analyse und Investment.",
    },
    projects: {
      chapter: "003 — Projekte",
      title: "Räume mit Bedeutung",
      sub: "Dreizehn Projekte in Bang Tao, Layan, Nai Yang und Laguna.",
    },
    contact: {
      chapter: "004 — Kontakt",
      title: "Kontakt aufnehmen",
      sub: "Erfahren Sie mehr über den Arturas-Ansatz — und Ihre nächste Immobilie.",
    },
  },
  about: {
    specTitle: "Über Arturas",
    specSubtitle: "Informationsdaten",
    specs: [
      ["Erfahrung", "15+ Jahre"],
      ["Gründer", "Arturas"],
      ["Basis", "Phuket, Thailand"],
      ["Fokus", "Wohnen · Investment"],
      ["Sprachen", "RU · UK · EN · DE · TH"],
      ["Ansatz", "Persönlich, schlüsselfertig"],
    ],
    processChapter: "005 — Prozess",
  },
  contactPage: {
    infoTitle: "Kontaktinfo",
    infoSubtitle: "Direkte Kanäle",
    formTitle: "Schreiben Sie uns",
    directLabel: "Direkt",
    socialsLabel: "Alle Kanäle",
  },
  home: {
    scrollHint: "Scrollen zum Erkunden",
    fallbackNote: "Bewegung reduziert — die Geschichte wird als Seiten gezeigt.",
    chapters: [
      {
        tag: "Zukunft",
        title: "Wir gestalten Ihre Zukunft auf Phuket",
        body: "Seit fünfzehn Jahren begleitet Arturas Käufer und Investoren auf dem Immobilienmarkt der Insel — von der ersten Besichtigung bis zu den Schlüsseln und darüber hinaus.",
        cta: "Projekte entdecken",
        ctaHref: "projects",
      },
      {
        tag: "Analyse",
        title: "Erst Zahlen, dann Versprechen",
        body: "Über fünfhundert Investmentmodelle berechnet. Jede Empfehlung beginnt mit Daten — Rendite, Risiko, Exit.",
        cta: "Unser Ansatz",
        ctaHref: "about",
      },
      {
        tag: "Netzwerk",
        title: "Ein Netzwerk verlässlicher Experten",
        body: "Bauträger, Anwälte, Banken und lokale Spezialisten — ein Team rund um Ihr Ziel.",
        ctaHref: "about",
      },
      {
        tag: "Präzision",
        title: "Nur fünfzig bestehen",
        body: "Zweihundert Objekte im Detail analysiert. Weniger als ein Viertel besteht unsere Prüfung — Sie sehen nur die stärksten.",
        cta: "Zur Karte",
        ctaHref: "map",
      },
      {
        tag: "Ziel",
        title: "Immobilien, die Ihrem Ziel dienen",
        body: "Wohnen, Lifestyle, Mieteinnahmen oder Kapitalwachstum — zuerst die Strategie, dann die Immobilie.",
        ctaHref: "about",
      },
      {
        tag: "Vermächtnis",
        title: "Werte, die bleiben",
        body: "Wir bauen Beziehungen über Jahre und Portfolios, die Trends überdauern. Phuket ist erst der Anfang.",
        cta: "Jetzt starten",
        ctaHref: "contact",
      },
    ],
  },
  mapPage: {
    hudTitle: "Phuket — Interaktive Karte",
    projectList: "Projektliste",
    close: "Schließen",
    filters: "Filter",
    allRegions: "Alle Regionen",
    zoom: "Zoom",
    discoverMore: "Mehr erfahren",
    clickToExplore: "Klicken zum Erkunden",
    projectLabel: "Projekt",
    locationLabel: "Lage",
    typeLabel: "Typ",
    regionLabel: "Region",
    resetView: "Ansicht zurücksetzen",
    introTitle: "So nutzen Sie die Karte",
    introCards: [
      { title: "Scrollen", body: "Karte vergrößern und verkleinern" },
      { title: "Ziehen", body: "Auf der Karte bewegen" },
      { title: "Klicken", body: "Projektdetails ansehen" },
    ],
    enterMap: "Karte öffnen",
  },
  projectsPage: {
    chapter: "003 — Projekte",
    title: "Räume mit Bedeutung",
    sub: "Dreizehn Projekte in Bang Tao, Layan, Nai Yang und Laguna — geprüft auf Qualität, Rendite und Lage.",
    openOnMap: "Auf der Karte öffnen",
    headers: { project: "Projekt", location: "Lage", type: "Typ" },
  },
};

const th: ChromeDict = {
  menu: "เมนู",
  close: "ปิด",
  soundOn: "เปิดเสียง",
  soundOff: "ปิดเสียง",
  chat: "แชทกับเรา",
  prev: "ก่อนหน้า",
  next: "ถัดไป",
  projectsWord: "โครงการ",
  links: "ลิงก์",
  workTitle: "ร่วมงานกับเรา",
  workBody:
    "เราไม่ใช่แค่นายหน้า เราคือนักวิเคราะห์ นักเจรจา ที่ปรึกษากฎหมาย และคนท้องถิ่น — ร่วมกันสร้างอนาคตของคุณที่ภูเก็ต",
  workCta: "ติดต่อเรา",
  rights: "สงวนลิขสิทธิ์",
  nav: { home: "หน้าแรก", about: "เกี่ยวกับเรา", projects: "โครงการ", contact: "ติดต่อ" },
  preloader: { loading: "กำลังโหลด", loaded: "โหลดแล้ว", ready: "พร้อมสำรวจ" },
  stubs: {
    about: {
      chapter: "002 — เกี่ยวกับเรา",
      title: "ที่ปรึกษาที่ไว้ใจได้ในภูเก็ต",
      sub: "ประสบการณ์จริงสิบห้าปีในอสังหาริมทรัพย์ การวิเคราะห์ และการลงทุน",
    },
    projects: {
      chapter: "003 — โครงการ",
      title: "พื้นที่ที่มีความหมาย",
      sub: "สิบสามโครงการใน Bang Tao, Layan, Nai Yang และ Laguna",
    },
    contact: {
      chapter: "004 — ติดต่อ",
      title: "ติดต่อเรา",
      sub: "เรียนรู้วิสัยทัศน์ของ Arturas — และอสังหาฯ ชิ้นต่อไปของคุณ",
    },
  },
  about: {
    specTitle: "เกี่ยวกับ Arturas",
    specSubtitle: "ข้อมูลสรุป",
    specs: [
      ["ประสบการณ์", "15+ ปี"],
      ["ผู้ก่อตั้ง", "Arturas"],
      ["ฐานที่ตั้ง", "ภูเก็ต ประเทศไทย"],
      ["โฟกัส", "ที่อยู่อาศัย · การลงทุน"],
      ["ภาษา", "RU · UK · EN · DE · TH"],
      ["แนวทาง", "ส่วนตัว ครบวงจร"],
    ],
    processChapter: "005 — ขั้นตอน",
  },
  contactPage: {
    infoTitle: "ข้อมูลติดต่อ",
    infoSubtitle: "ช่องทางตรง",
    formTitle: "ส่งข้อความถึงเรา",
    directLabel: "โดยตรง",
    socialsLabel: "ทุกช่องทาง",
  },
  home: {
    scrollHint: "เลื่อนเพื่อสำรวจ",
    fallbackNote: "ปิดแอนิเมชัน — แสดงเรื่องราวแบบหน้า",
    chapters: [
      {
        tag: "อนาคต",
        title: "เราสร้างอนาคตของคุณที่ภูเก็ต",
        body: "สิบห้าปีที่ Arturas นำผู้ซื้อและนักลงทุนผ่านตลาดอสังหาฯ ของเกาะ — จากการชมครั้งแรกจนถึงรับกุญแจและต่อจากนั้น",
        cta: "ดูโครงการ",
        ctaHref: "projects",
      },
      {
        tag: "ข้อมูลเชิงลึก",
        title: "ตัวเลขมาก่อนคำสัญญา",
        body: "แบบจำลองการลงทุนกว่าห้าร้อยชุด ทุกคำแนะนำเริ่มจากข้อมูล — ผลตอบแทน ความเสี่ยง ทางออก",
        cta: "แนวทางของเรา",
        ctaHref: "about",
      },
      {
        tag: "เครือข่าย",
        title: "เครือข่ายผู้เชี่ยวชาญที่ไว้ใจได้",
        body: "ผู้พัฒนา นักกฎหมาย ธนาคาร และผู้เชี่ยวชาญท้องถิ่น — ทีมเดียวรอบเป้าหมายของคุณ",
        ctaHref: "about",
      },
      {
        tag: "ความแม่นยำ",
        title: "ผ่านการคัดเลือกเพียงห้าสิบ",
        body: "วิเคราะห์อย่างละเอียดสองร้อยโครงการ ผ่านเกณฑ์ไม่ถึงหนึ่งในสี่ — คุณเห็นเฉพาะที่แข็งแกร่งที่สุด",
        cta: "ดูแผนที่",
        ctaHref: "map",
      },
      {
        tag: "เป้าหมาย",
        title: "อสังหาฯ ที่ตอบโจทย์ของคุณ",
        body: "อยู่อาศัย ไลฟ์สไตล์ ปล่อยเช่า หรือเพิ่มมูลค่า — กลยุทธ์มาก่อน แล้วจึงเลือกทรัพย์",
        ctaHref: "about",
      },
      {
        tag: "มรดก",
        title: "สินทรัพย์ที่ยั่งยืน",
        body: "เราสร้างความสัมพันธ์ที่วัดเป็นปี และพอร์ตที่อยู่เหนือกระแส ภูเก็ตเป็นเพียงจุดเริ่มต้น",
        cta: "เริ่มต้นเลย",
        ctaHref: "contact",
      },
    ],
  },
  mapPage: {
    hudTitle: "ภูเก็ต — แผนที่อินเทอร์แอกทีฟ",
    projectList: "รายการโครงการ",
    close: "ปิด",
    filters: "ตัวกรอง",
    allRegions: "ทุกพื้นที่",
    zoom: "ซูม",
    discoverMore: "ดูเพิ่มเติม",
    clickToExplore: "คลิกเพื่อสำรวจ",
    projectLabel: "โครงการ",
    locationLabel: "ทำเล",
    typeLabel: "ประเภท",
    regionLabel: "พื้นที่",
    resetView: "รีเซ็ตมุมมอง",
    introTitle: "วิธีใช้แผนที่",
    introCards: [
      { title: "เลื่อน", body: "ซูมเข้าและออกจากแผนที่" },
      { title: "ลาก", body: "เลื่อนดูรอบ ๆ" },
      { title: "คลิก", body: "ดูรายละเอียดโครงการ" },
    ],
    enterMap: "เข้าสู่แผนที่",
  },
  projectsPage: {
    chapter: "003 — โครงการ",
    title: "พื้นที่ที่มีความหมาย",
    sub: "สิบสามโครงการใน Bang Tao, Layan, Nai Yang และ Laguna — คัดกรองด้านคุณภาพ ผลตอบแทน และทำเล",
    openOnMap: "เปิดบนแผนที่",
    headers: { project: "โครงการ", location: "ทำเล", type: "ประเภท" },
  },
};

const dicts: Record<string, ChromeDict> = { en, ru, uk, de, th };

export function chromeDict(lang: Locale | string): ChromeDict {
  return dicts[lang] ?? en;
}

// Районы Пхукета со счётчиками проектов для меню. Пока статично (13 объектов
// из lib/i18n/meta.ts, распределение по location из локалей); синхронизировано
// с components/redesign/map/phuketGeo.ts.
export const menuRegions = [
  { name: "Bang Tao", count: 3 },
  { name: "Layan", count: 4 },
  { name: "Nai Yang", count: 4 },
  { name: "Laguna", count: 2 },
] as const;

// Порядок страниц редизайна для Prev./Next в футере. Карта — отдельный
// полноэкранный режим без футера, в цикл не входит.
export const pageOrder = ["", "/about", "/contact"] as const;
