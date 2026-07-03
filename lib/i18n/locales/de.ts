import type { LocaleData } from "../types";

// Deutsch — bedeutungsbasierte Übersetzung der russischen Quelle, in einem
// gehobenen Immobilien-Register (nicht wörtlich).
export const de: LocaleData = {
  dictionary: {
    nav: {
      approach: "Ansatz",
      projects: "Projekte",
      founder: "Über mich",
      services: "Leistungen",
      contact: "Kontakt",
    },
    a11y: {
      mainNav: "Hauptnavigation",
      menu: "Menü",
      footerNav: "Fußzeilen-Navigation",
      skipToContent: "Zum Inhalt springen",
    },
    common: {
      whatsapp: "Auf WhatsApp schreiben",
      telegram: "Auf Telegram schreiben",
      allChannels: "Alle Kanäle",
      socialChannelLabel: "Telegram-Kanal",
      whatsappPrefill: "Hallo! Ich interessiere mich für Immobilien auf Phuket.",
    },
    cookie: {
      text: "Wir verwenden Cookies für Analysen und zur Verbesserung der Website.",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
    hero: {
      eyebrow: "Immobilien auf Phuket",
      titleTop: "Immobilien machen Sie nicht über Nacht reich.",
      titleEmphasis: "Sie machen Sie in 10 Jahren reich.",
      titleRest: "",
      body: "Auswahl von Anlageimmobilien auf der Insel Phuket für Kapitalwachstum, passives Einkommen und den langfristigen Erhalt Ihres Vermögens.",
    },
    intro: {
      eyebrow: "Arbeitsweise",
      manifesto:
        "Sie erhalten nicht einfach eine Auswahl guter Objekte, sondern nur jene Optionen, die wirklich zu Ihren Zielen, Aufgaben und Ihrer Strategie passen. Meine wichtigste Aufgabe ist nicht, Ihnen ein Objekt zu verkaufen, sondern Ihnen zu helfen, Ihr Ziel mit Immobilien zu erreichen.",
    },
    stats: {
      title: "Reputation, in Zahlen ausgedrückt",
      body: "Hinter jeder Zahl steht praktische Erfahrung in Immobilienanalyse, Risikobewertung und Arbeit mit Investitionen.",
    },
    projectsSection: {
      eyebrow: "Projekte",
      heading: "Objekte, ausgewählt nach Ihrem Ziel",
      cardCta: "Mehr erfahren",
    },
    founder: {
      eyebrow: "Ein persönlicher Ansatz",
      titleLead: "Hinter jeder Transaktion — ",
      titleEmphasis: "ein Mensch",
      p1: "15 Jahre Erfahrung in Immobilien und Objektbewertung helfen, für Kunden die besten Lösungen am Markt zu finden.",
      p2: "Jedes Objekt wird unter Berücksichtigung Ihrer Ziele, Ihres Budgets und der Wertsteigerungsperspektiven ausgewählt.",
      note: "Vollständige Begleitung — von der Auswahl der Immobilie bis zur Schlüsselübergabe und der weiteren Verwaltung des Objekts.",
    },
    services: {
      eyebrow: "Ablauf",
      title: "Service",
      body: "Sie erhalten umfassende Begleitung und Unterstützung in jeder Phase der Transaktion.",
      steps: [
        "Ermittlung Ihrer Ziele und Bedürfnisse",
        "Auswahl der besten Objekte für Ihre Aufgaben",
        "Organisation und Durchführung von Besichtigungen",
        "Verhandlung zusätzlicher Rabatte und Boni mit dem Bauträger",
        "Vorbereitung und Prüfung der Unterlagen für die Transaktion",
        "Vertragsunterzeichnung und Begleitung der Zahlungen",
        "Baukontrolle und regelmäßiges Monitoring des Objekts",
        "Professionelle Abnahme der Immobilie nach Fertigstellung",
        "Übergabe des Objekts an die Verwaltung für passives Einkommen",
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      titleLead: "Schneller ",
      titleEmphasis: "Kontakt",
      body: "Wählen Sie den für Sie passenden Weg — WhatsApp, Telegram oder eine Anfrage. Eine Nachricht heute kann der Beginn einer der besten Investitionen Ihres Lebens sein.",
      fields: {
        name: "Name",
        namePlaceholder: "Wie darf ich Sie ansprechen",
        email: "E-Mail",
        emailPlaceholder: "you@private.com",
        budget: "Budget",
        budgetPlaceholder: "Richtwert in $",
        budgetHelper: "Hilft mir, Objekte präziser auszuwählen.",
        message: "Ziel und Anfrage",
        messagePlaceholder:
          "Lage, Objekttyp, Ziel (Wohnen / Vermietung / Investition), Zeitrahmen",
        telegram: "Telegram",
        telegramPlaceholder: "@username oder Link",
        whatsapp: "WhatsApp",
        whatsappPlaceholder: "Ihre Telefonnummer",
        optional: "optional",
      },
      errors: {
        name: "Bitte geben Sie Ihren Namen an",
        message: "Beschreiben Sie Ihr Ziel und Ihre Anfrage",
        contact: "Geben Sie mindestens einen Kontakt an — Telegram oder WhatsApp",
        generic: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        network:
          "Ihre Anfrage konnte nicht gesendet werden. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
      },
      consent:
        "Ihre Anfrage geht direkt an Telegram. Mit dem Absenden des Formulars stimmen Sie der Verarbeitung Ihrer Daten zu.",
      submit: "Anfrage senden",
      submitting: "Wird gesendet…",
      success: {
        title: "Anfrage gesendet",
        body: "Vielen Dank! Ich melde mich in Kürze über den von Ihnen angegebenen Kontakt bei Ihnen.",
        again: "Weitere Anfrage senden",
      },
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
    },
    project: {
      backToProjects: "Alle Projekte",
      conceptEyebrow: "Konzept",
      conceptTitle: "Über das Projekt",
      learnMore: "Mehr erfahren",
      galleryEyebrow: "Galerie",
      galleryTitle: "Projektvisualisierungen",
      galleryAlt: "Visualisierung {n}",
      unitsEyebrow: "Grundrisse",
      unitsTitle: "Typen und Flächen",
      amenitiesEyebrow: "Infrastruktur",
      amenitiesTitle: "Ausstattung und Service",
      locationEyebrow: "Lage",
      investmentEyebrow: "Investition",
      investmentTitle: "Rendite und Zahlung",
      paymentLabel: "Zahlungsplan",
      featuresEyebrow: "Vorteile",
      featuresTitle: "Warum dieses Projekt",
      developerEyebrow: "Bauträger",
      specEyebrow: "Eckdaten",
      specTitle: "Wesentliche Merkmale",
      ctaTitle: "Stimmen wir {name} auf Ihr Ziel ab",
      ctaBody:
        "Aktuelle Preise, Grundrisse und Konditionen — persönlich, vom ersten Anruf bis zur Schlüsselübergabe.",
    },
    guides: {
      indexEyebrow: "Ratgeber",
      indexTitle: "Wie Sie sicher Immobilien auf Phuket kaufen",
      indexSubtitle:
        "Praxisleitfäden zu Rechtsformen, Steuern, Rendite und Fallstricken für ausländische Käufer auf Phuket.",
      backToGuides: "Alle Ratgeber",
      tableOfContents: "Inhalt",
      faqEyebrow: "Häufige Fragen",
      faqTitle: "Was Käufer am meisten fragen",
      readingMinutes: "{n} Min. Lesezeit",
      updatedLabel: "Aktualisiert",
      ctaTitle: "Besprechen wir Ihr Ziel — ich zeige passende Objekte",
      ctaBody:
        "Wir klären gemeinsam, welche Rechtsform und welches Projekt zu Ihrem Fall passen — Einkommen, Kapital oder Leben auf Phuket.",
      ctaWhatsapp: "WhatsApp-Nachricht",
    },
    meta: {
      tagline: "Immobilien auf Phuket, abgestimmt auf Ihre Ziele",
      region: "Phuket, Thailand",
      description:
        "Arturas Real Estate hilft Ihnen, Immobilien auf Phuket nach persönlichen Zielen auszuwählen: Wohnen, Lebensstil, Kapitalerhalt, Mietertrag und langfristige Investition. Wir verkaufen keine Objekte von der Liste — wir helfen Ihnen, die richtige Entscheidung zu treffen.",
      homeTitle: "Arturas Real Estate — Immobilien auf Phuket, abgestimmt auf Ihre Ziele",
    },
  },
  stats: [
    { value: "15+", label: "Jahre Erfahrung in der Immobilienbranche" },
    { value: "500+", label: "durchgerechnete Investitionsmodelle" },
    { value: "200+", label: "detailliert analysierte Objekte" },
    { value: "50+", label: "Objekte nach strenger Investitionsauswahl" },
  ],
  services: {
    selection: {
      title: "Objektauswahl",
      body: "Auswahl eines Objekts für Ihr Ziel: Wohnen, Lebensstil, Mietertrag oder Investition.",
    },
    deal: {
      title: "Begleitung der Transaktion",
      body: "Vollständige Unterstützung von der Objektauswahl bis zur Eintragung des Eigentums.",
    },
    analysis: {
      title: "Investitionsanalyse",
      body: "Bewertung von Mietrendite, Wertsteigerungspotenzial und Ihrer Anlagestrategie.",
    },
    developer: {
      title: "Prüfung des Bauträgers",
      body: "Analyse von Reputation des Entwicklers, Projektqualität und Risiken vor dem Kauf.",
    },
    management: {
      title: "Objektverwaltung",
      body: "Lösungen für die Verwaltung Ihrer Immobilie nach dem Kauf.",
    },
    rental: {
      title: "Vermietung",
      body: "Vorbereitung und Positionierung Ihres Objekts für einen Mietertrag.",
    },
    relocation: {
      title: "Relocation nach Thailand",
      body: "Begleitung Ihres Umzugs: vom ersten Besuch bis zum Einrichten Ihres Lebens auf Phuket.",
    },
  },
  projects: {
    silhouette: {
      name: "Silhouette",
      developer: "The Zero Phuket",
      developerNote:
        "Ein britischer Bauträger mit über 25 Jahren Erfahrung und einem Verkaufsvolumen von mehr als £120M. Nach dem Prinzip „British Standard — Thai Excellence“, mit vollständig integriertem hauseigenem Management.",
      location: "Nai Yang Beach",
      type: "Eigentumswohnanlage",
      keyPoints: ["350 m bis zum Strand", "Direkt am Sirinat-Park"],
      summary:
        "Eine Residenz am Nai Yang Beach mit einer prognostizierten Rendite von rund 11 % pro Jahr.",
      concept:
        "Eine flache Wohnanlage für „naturveredeltes“ Küstenwohnen, nur wenige Schritte vom Sirinat-Nationalpark an Phukets Westküste entfernt. Die EIA-genehmigte Öko-Architektur lässt sich vom Licht der Küste und von natürlichen Formen inspirieren und schafft eine private, niedrig verdichtete Gemeinschaft für alle, die Abgeschiedenheit, Naturnähe und Investitionsertrag suchen.",
      highlights: [
        { label: "Geschosse", value: "5 Geschosse" },
        { label: "Bebaute Fläche", value: "13.476 m²" },
        { label: "Bauträger", value: "The Zero Phuket" },
        { label: "Fertigstellung", value: "Juni 2028" },
      ],
      units: [
        { type: "Studio", area: "29,5–36,3 m²" },
        { type: "1 Schlafzimmer", area: "37,5–46 m²" },
        { type: "1 Schlafzimmer +", area: "44,4–52,4 m²" },
        { type: "2 Schlafzimmer", area: "53,9–66,7 m²" },
        { type: "Penthouse Suite · 3 Schlafzimmer", area: "83,8–108,3 m²" },
      ],
      amenities: [
        "Dachpool und Rooftop-Bar",
        "Fitnessstudio, Spa, Sauna und Dampfbad",
        "Eisbad und Erholungsbereich",
        "Padel- und Pickleball-Plätze",
        "Golfsimulator",
        "Open-Air-Kino",
        "Coworking und Besprechungsräume",
        "Kinderclub",
        "Restaurant und Wellness-Zentrum",
        "EV-Ladestationen und solarbetriebener Shuttle",
        "Tiefgarage",
        "Concierge und Sicherheitsdienst rund um die Uhr",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "350 m · 1 Min." },
        { label: "Sirinat-Park", value: "600 m" },
        { label: "Flughafen Phuket", value: "2,5 km · 5 Min." },
        { label: "Nai Thon Beach", value: "10 Min." },
        { label: "Blue Canyon Country Club", value: "12 Min." },
        { label: "Laguna Golf Phuket", value: "26 Min." },
      ],
      features: [
        "Prognostizierte Rendite von ~11 % ROI mit Wertsteigerungspotenzial in einer aufstrebenden Lage",
        "Nur wenige Schritte bis zum Nai Yang Beach und zum Sirinat-Park",
        "EIA-genehmigte, ökologisch nachhaltige Architektur: Solarpaneele, Regenwassernutzung",
        "Vollständig integriertes hauseigenes Management und das Zero-Privilege-Programm",
        "Britische Baustandards: über 25 Jahre Erfahrung, mehr als £120M Verkaufsvolumen",
      ],
      investment:
        "Eine prognostizierte Rendite von rund 11 % ROI mit starkem Potenzial für langfristiges Wachstum. Objekt- und Mietverwaltung übernimmt das hauseigene Team des Bauträgers, Eigentümern steht das exklusive Zero-Privilege-Programm offen.",
      payment:
        "Reservierung ≈ $2.900, erste Zahlung nach 15 Tagen, danach ein flexibler Ratenplan. 10 % Rabatt bei vollständiger Zahlung.",
      spec: [
        { label: "Geschosse", value: "5 Geschosse" },
        { label: "Residenzen", value: "150" },
        { label: "Bebaute Fläche", value: "13.476 m²" },
        { label: "Bauträger", value: "The Zero Phuket" },
        { label: "Fertigstellung", value: "Juni 2028" },
      ],
    },
    "ayana-heights": {
      name: "AYANA Heights",
      developer: "T.H Group",
      developerNote:
        "Ein internationales Unternehmen (China, Thailand, Spanien, Australien) in den Bereichen Immobilien, Hospitality und grüne Energie. Preisträger der PropertyGuru und Dot Property Awards 2020–2023.",
      location: "Bangtao Bay · Meerblick",
      type: "Eigentumswohnungen und Stadthäuser",
      keyPoints: ["Meerblick 270°", "Eigener Park"],
      summary:
        "Residenzen mit Meerblick, eigenem AYANA Park und einem 270°-Panorama über das Meer.",
      concept:
        "Eine Premium-Anlage unter dem Leitmotiv „Flow your way“. Das Konzept beruht auf geringer Bebauungsdichte (Faktor 1,2) und großzügigen Abständen zwischen den Gebäuden — das sichert Privatsphäre und einen 270°-Panoramablick über das Meer. Fünf-Sterne-Service und hotelverwaltete Apartments für alle, die Naturnähe suchen.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "T.H Group" },
        { label: "Fertigstellung", value: "Ende 2027" },
      ],
      units: [
        { type: "Studio (A)", area: "37,6 m²" },
        { type: "1 Schlafzimmer (B1)", area: "43,42 m²" },
        { type: "1 Schlafzimmer Family (B2)", area: "57,57 m²" },
        { type: "2 Schlafzimmer Family (B3)", area: "57,57 m²" },
        { type: "2 Schlafzimmer · Meerblick (C)", area: "75,21 m²" },
        { type: "3 Schlafzimmer · 270°-Panorama (D)", area: "112,89 m²" },
        { type: "Penthouse (E) · Freehold", area: "360,79 m²" },
      ],
      amenities: [
        "Pool mit 1.800 m²",
        "Gemeinschaftsgarten mit 8.000 m²",
        "AYANA Park",
        "Fitnessraum und Sauna",
        "Coworking",
        "Kinderclub",
        "Haustierfreundliche Bereiche",
        "Lobby und Gemeinschaftslounge mit 1.000 m²",
        "Zwei Aufzüge pro Gebäude",
        "Über 260 Parkplätze",
        "Sicherheitsdienst rund um die Uhr und Videoüberwachung",
        "Elektronische Schlösser",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "3 Min." },
        { label: "Bangtao Beach", value: "5 Min." },
        { label: "Naithon Beach", value: "10 Min." },
        { label: "Laguna Golf", value: "5 Min." },
        { label: "Boat Avenue · Porto de Phuket", value: "10 Min." },
        { label: "Flughafen Phuket", value: "25 Min." },
      ],
      features: [
        "Geringe Bebauungsdichte (1,2) — Privatsphäre und Weite",
        "270°-Panoramablick über das Meer",
        "Fünf-Sterne-Service und hotelverwaltete Apartments",
        "Privilegien für Eigentümer: Rabatte im Hotel, in Restaurants und im Spa, bevorzugte Buchung",
        "Lage in der Nähe von Banyan Tree und Amanpuri",
      ],
      investment:
        "Jährliche Mietrendite von 9–12 %, dazu eine Wertsteigerung von 20–50 % beim Wiederverkauf nach 3–5 Jahren. Verwaltung und Vermietung übernimmt ein professionelles Team; die Apartments sind hotelverwaltet. Servicegebühr ≈ $1,7/m² pro Monat.",
      spec: [
        { label: "Areal", value: "31 Rai · 49.600 m²" },
        { label: "Gebäude", value: "8" },
        { label: "Residenzen", value: "543" },
        { label: "Penthouses", value: "Freehold" },
        { label: "Bauträger", value: "T.H Group" },
      ],
    },
    "sun-hills-layan": {
      name: "Sun Hills Layan",
      developer: "Sun Hills Development",
      developerNote:
        "Ein Bauträger mit Bauerfahrung seit 2009 und über 1,2 Mio. m² realisierter Fläche. Objekt- und Mietverwaltung durch Unicorn Hospitality (über 12 Hotels und mehr als 750 Apartments in mehr als 7 Ländern).",
      location: "Layan",
      type: "Eigentumswohnanlage",
      keyPoints: ["Markenbotschafter — Khabib", "Vertikaler Garten"],
      summary:
        "Architektur des „vertikalen Gartens“ in Layan. Offizieller Markenbotschafter ist Khabib Nurmagomedov.",
      concept:
        "Eine Premium-Anlage mit der Architektur eines „vertikalen Gartens“: kaskadierende Terrassen, eingebettet in tropisches Grün, und mehrstöckige Pools im Zentrum. Offizieller Markenbotschafter ist Khabib Nurmagomedov; die Partnerschaft gründet auf den Werten von Disziplin und langfristigem Denken. Verwaltung und Betreuung durch Unicorn Hospitality, einen der führenden Hotelbetreiber Südostasiens.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "Sun Hills Development" },
        { label: "Fertigstellung", value: "Ende 2027" },
      ],
      units: [
        { type: "Studio", area: "26,5–31,4 m²" },
        { type: "Studio + / 1 Schlafzimmer", area: "35,6–45 m²" },
        { type: "1–2 Schlafzimmer", area: "47,7–53,4 m²" },
        { type: "2 Schlafzimmer", area: "60,8–72,9 m²" },
        { type: "2 Schlafzimmer + (B+B)", area: "85 m²" },
      ],
      amenities: [
        "Mehrstöckige Pools unter freiem Himmel",
        "Spa- und Whirlpool-Bereiche am Wasser",
        "Fitnessstudio mit Panoramablick",
        "Yoga-Studio",
        "Restaurants und Fine-Dining-Bereiche",
        "Lounge-Bereiche und Lobby",
        "Coworking und Besprechungsräume",
        "Kinderclub",
        "Gestaltete Gärten und grüne Terrassen",
      ],
      locationPoints: [
        { label: "Gebiet", value: "Layan, Westküste von Phuket" },
        { label: "Strände Layan und Bangtao", value: "in der Nähe" },
      ],
      features: [
        "Offizieller Markenbotschafter — Khabib Nurmagomedov",
        "Architektur des „vertikalen Gartens“ mit kaskadierenden grünen Terrassen",
        "Verwaltung durch Unicorn Hospitality — einen Top-Betreiber Südostasiens",
        "Schlüsselfertiger Ausbau im Preis enthalten",
        "Zinsfreie Ratenzahlung bis zur Fertigstellung",
        "Nettorendite von ~9–10 %+ bei den wichtigsten Wohnungstypen",
      ],
      investment:
        "Nettorendite ab ~7 %, bei Studios und 1-Schlafzimmer-Einheiten rund 9–10 %+ bis zum 8.–10. Jahr; ROI über 10 Jahre von bis zu 270 %+. Verwaltung und Vermietung durch Unicorn Hospitality. Der schlüsselfertige Ausbau ist bereits im Preis der Einheit enthalten.",
      payment:
        "Zinsfreie Ratenzahlung: 35 % Anzahlung, danach 15 % / 20 % / 20 % / 10 % — in Etappen bis zum 01.12.2027.",
      spec: [
        { label: "Residenzen", value: "585" },
        { label: "Verwaltung", value: "Unicorn Hospitality" },
        { label: "Bauträger", value: "Sun Hills Development" },
        { label: "Fertigstellung", value: "Ende 2027" },
      ],
    },
    "sun-hills-lakeside": {
      name: "Sun Hills Lakeside",
      developer: "Sun Hills Development",
      developerNote:
        "Ein Bauträger mit über 16 Jahren Erfahrung. Das Grundstück wurde bereits 2019 vollständig und ohne Kredite erworben. Verwaltung durch Unicorn Hospitality. EIA und Construction Permit liegen vor; Block A ist bis zur Dachkante errichtet.",
      location: "Bang Tao · Laguna",
      type: "Eigentumswohnanlage",
      keyPoints: ["Khabib Gym 1.500 m²", "7 Min. bis zum Strand"],
      summary:
        "Eine Residenz an den Laguna-Seen mit dem Trainingszentrum Khabib Gym. Offizieller Partner — Khabib Nurmagomedov.",
      concept:
        "Eine Premium-Residenz an den Laguna-Seen in Bang Tao, konzipiert als Hybrid aus Wohnen und Hotelbetrieb. Offizieller Partner des Projekts ist Khabib Nurmagomedov: Auf dem Areal entsteht ein Trainingszentrum von Weltklasse, das Khabib Gym mit 1.500 m², samt Programmen für Sport, Wellness und Regeneration. Ein Drei-in-eins-Asset: eine komfortable Umgebung zum Leben, stabiler Mietertrag und ein lohnender Wiederverkauf.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "Sun Hills Development" },
        { label: "Fertigstellung", value: "September 2027" },
      ],
      units: [
        { type: "Studios", area: "30 / 35,6 / 40 / 47 / 48 m²" },
        { type: "1 Schlafzimmer", area: "41,5 / 53,6 / 60 / 77 m²" },
        { type: "2 Schlafzimmer", area: "71,2 / 89,2 m²" },
        { type: "3 Schlafzimmer", area: "124,8 m²" },
      ],
      amenities: [
        "Khabib Gym — ein Sportzentrum mit 1.500 m²",
        "Wellness- und Spa-Zentrum",
        "Dachpool + zwei Innenhof-Pools (24 m und 15 m)",
        "Kinderpool",
        "Rooftop-Bereiche mit 360°-Panorama",
        "Restaurant mit 155 m² und Lounge-Bar",
        "Coworking und Business-Bereiche",
        "Kinderclub, Spielplätze und Sommerkino",
        "Tiefgarage",
        "Sicherheitsdienst rund um die Uhr und Shuttle zum Layan Beach",
        "Mobile App und Service rund um die Uhr",
        "Haustierfreundlich",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "7 Min." },
        { label: "Highway", value: "5 Min." },
        { label: "Porto de Phuket", value: "10 Min." },
        { label: "Flughafen Phuket", value: "20 Min." },
        { label: "Gebiet", value: "Bang Tao · Laguna" },
      ],
      features: [
        "Offizielle Partnerschaft mit Khabib Nurmagomedov und dem Khabib Gym",
        "Premium-Lage Bang Tao / Laguna mit Seeblick",
        "Einstiegspreis 20–40 % unter vergleichbaren Projekten, Wertsteigerung ab 40 %",
        "Ein Hybrid aus Wohnen und Hotel unter der Verwaltung von Unicorn Hospitality",
        "Reiche Ausstattung: Sport, Spa, Pools, Restaurant, Coworking",
        "Ganzjährige Auslastung von 75–85 %",
      ],
      investment:
        "Eine Rendite von bis zu 10 % pro Jahr, eine Wertsteigerung von über 40 % während der Bauphase und eine durchschnittliche Jahresauslastung von 75–85 %. Verwaltung durch Unicorn Hospitality. Das Grundstück wurde 2019 vollständig erworben, EIA und Construction Permit liegen vor.",
      payment:
        "Ein Plan mit 5 Zahlungen: 30 % Anzahlung, danach 20 % (Juli 2026), 20 % (Dezember 2026), 20 % (April 2027), 10 % (September 2027). Ratenzahlung vom Bauträger bis März 2028 möglich.",
      spec: [
        { label: "Khabib Gym", value: "1.500 m²" },
        { label: "Verwaltung", value: "Unicorn Hospitality" },
        { label: "Bauträger", value: "Sun Hills Development" },
        { label: "Fertigstellung", value: "September 2027" },
      ],
    },
    balcony: {
      name: "The Balcony",
      developer: "The Title",
      developerNote:
        "The Title ist die Wohnmarke von Rhom Bho Property, einem Bauträger aus Phuket mit preisgekrönter Erfahrung im Hospitality-Bereich. Seine Projekte verbinden Resort-Architektur, umfangreiche Gemeinschaftsanlagen und professionelle Verwaltung.",
      location: "Nai Yang Beach · erste Reihe",
      type: "Eigentumswohnungen",
      keyPoints: ["Erste Strandreihe", "542 Residenzen"],
      summary:
        "Eine Eigentumsanlage in erster Strandreihe am Nai Yang Beach mit 53 Anlagen in drei landschaftlich gestalteten Poolzonen.",
      concept:
        "Eine moderne Eigentumsanlage direkt am Nai Yang Beach, neben dem Sirinat-Nationalpark und dem Kiefernwald. Neun niedrige Wohngebäude umschließen drei gestaltete Zonen — Laguna, Costa und Foresta — mit über 13.000 m² Gemeinschaftsfläche, Lagunenpools, Strandrasen und einem privaten Spazierweg, der direkt zum Sand führt.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "The Title" },
        { label: "Fertigstellung", value: "Q2 2028" },
      ],
      units: [
        { type: "1 Schlafzimmer M", area: "33–35 m²" },
        { type: "1 Schlafzimmer L", area: "37–39 m²" },
        { type: "1 Schlafzimmer Plus", area: "45–47 m²" },
        { type: "2 Schlafzimmer S", area: "50–55 m²" },
        { type: "2 Schlafzimmer M", area: "63–70 m²" },
        { type: "Penthouse", area: "135–139 m²" },
      ],
      amenities: [
        "Sportpool 6×25 m und Lagunenpools",
        "Strandrasen und Pavillons mit Meerblick",
        "Whirlpool, Jacuzzi und Therapiebecken",
        "Kindermeer, Kleinkindbecken und Baumhauspark",
        "Yoga-Rasen am Meer und privater Spazierweg",
        "Sauna, Dampfbad und Onsen",
        "Fitness- und Boxzone",
        "Lobby-Lounge und Coworking",
        "Spielzimmer und Brettspielzone",
        "Halboffene Lounges mit Baumkronenblick",
        "Überdachte Parkplätze (153 Stellplätze)",
        "Sicherheit rund um die Uhr",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "Erste Reihe" },
        { label: "Pine Tree Park", value: "Gegenüber" },
        { label: "Tops & 7-Eleven", value: "250 m" },
        { label: "Mingle Mall Naiyang", value: "350 m" },
        { label: "Flughafen Phuket", value: "5 Min." },
        { label: "Sirinat-Nationalpark", value: "In der Nähe" },
      ],
      features: [
        "Direkte Lage in erster Strandreihe am Nai Yang Beach",
        "53 Anlagen — 23 im Freien und 30 in Innenräumen",
        "Drei gestaltete Poolzonen: Laguna, Costa, Foresta",
        "Über 13.000 m² Gemeinschaftsfläche",
        "Neben Salute Beach Club und einem internationalen Kettenhotel",
        "Von The Title — einem preisgekrönten Hospitality-Bauträger auf Phuket",
      ],
      investment:
        "Ein Resort-Asset in erster Strandreihe von The Title mit umfangreichen Anlagen und professioneller Verwaltung — gebaut für Lifestyle und Mietnachfrage im etablierten Gebiet Nai Yang / Flughafen.",
      spec: [
        { label: "Residenzen", value: "542" },
        { label: "Gebäude", value: "9 + Parkhaus" },
        { label: "Grundstücksfläche", value: "22.027 m²" },
        { label: "Bauträger", value: "The Title" },
        { label: "Fertigstellung", value: "Q2 2028" },
      ],
    },
    serenity: {
      name: "The Title Serenity Naiyang",
      developer: "The Title",
      developerNote:
        "The Title ist die Wohnmarke von Rhom Bho Property, einem Bauträger aus Phuket mit preisgekrönter Erfahrung im Hospitality-Bereich. Seine Projekte verbinden Resort-Architektur, umfangreiche Gemeinschaftsanlagen und professionelle Verwaltung.",
      location: "Nai Yang · Soi Naiyang 2",
      type: "Eigentumswohnungen",
      keyPoints: ["400 m zum Strand", "814 Residenzen"],
      summary:
        "Eine moderne Eigentumsanlage im Ocean-Stil, 400 m vom Nai Yang Beach und 5 Minuten vom Flughafen Phuket entfernt.",
      concept:
        "Eine ruhige Strandgemeinschaft an der Soi Naiyang 2, nur 400 m vom Nai Yang Beach und neben dem Sirinat-Nationalpark. Sechs siebenstöckige Gebäude im modernen Ocean-Architekturstil umgeben über 1.050 m² Anlagen und 3.750 m² Grünfläche, gestaltet für mehrere Generationen und auf vier Säulen gebaut: Nachhaltigkeit, Wohlbefinden, Service und Technologie.",
      highlights: [
        { label: "Geschosse", value: "7 Geschosse" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "The Title" },
        { label: "Fertigstellung", value: "Fertiggestellt" },
      ],
      units: [
        { type: "1 Schlafzimmer S", area: "26–28 m²" },
        { type: "1 Schlafzimmer M", area: "30–32 m²" },
        { type: "1 Schlafzimmer LX", area: "36–39 m²" },
        { type: "2 Schlafzimmer S", area: "56–58 m²" },
        { type: "2 Schlafzimmer M", area: "60–62 m²" },
        { type: "2 Schlafzimmer L", area: "61–65 m²" },
        { type: "3 Schlafzimmer", area: "112–117 m²" },
        { type: "3 Schlafzimmer L", area: "119–123 m²" },
      ],
      amenities: [
        "Hauptpool, Kinderpool und Lazy-Pool",
        "Sportpool, Jacuzzi und Poolbar",
        "Hydrotherapie-Ecke und BBQ-Bereich",
        "Yoga-/Trainingsrasen und Kletterwand",
        "Infinity-Pool auf dem Dach und Rooftop-Yoga",
        "Sauna, Dampfbad und Onsen",
        "Clubhaus mit Fitness und Dach-Jacuzzi",
        "Theater- und Karaoke-Pavillon",
        "Business-Lounge und Coworking",
        "Gemeinschaftsküche und Café",
        "Kinderspielplatz und Spielzimmer",
        "Separates Parkhaus mit Doppelparkern",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "400 m" },
        { label: "Sirinat-Nationalpark", value: "600 m" },
        { label: "Flughafen Phuket", value: "5 Min." },
        { label: "Mingle Mall", value: "In der Nähe" },
        { label: "Blue Canyon Golf", value: "In der Nähe" },
        { label: "Bumrungrad-Klinik (geplant)", value: "≈ 1 km" },
      ],
      features: [
        "Nur 400 m vom Nai Yang Beach, 5 Min. vom Flughafen",
        "Moderne Ocean-Architektur in sechs 7-stöckigen Gebäuden",
        "Vier Design-Säulen: Nachhaltigkeit, Wohlbefinden, Service, Technologie",
        "1.050 m² Anlagen und 3.750 m² Grünfläche",
        "Infinity-Pool auf dem Dach, Onsen und Clubhaus",
        "Von The Title — einem preisgekrönten Hospitality-Bauträger auf Phuket",
      ],
      investment:
        "Eine Strandgemeinschaft von The Title im etablierten Gebiet Nai Yang / Flughafen mit starker ganzjähriger Mietnachfrage dank der Lage 400 m vom Strand und 5 Minuten vom internationalen Flughafen Phuket.",
      spec: [
        { label: "Residenzen", value: "814" },
        { label: "Gebäude", value: "6 × 7 Etagen" },
        { label: "Grundstücksfläche", value: "22.053 m²" },
        { label: "Bauträger", value: "The Title" },
        { label: "Fertigstellung", value: "Fertiggestellt" },
      ],
    },
    olive: {
      name: "The Olive",
      developer: "The Title",
      developerNote:
        "The Title ist die Wohnmarke von Rhom Bho Property, einem Bauträger aus Phuket mit preisgekrönter Erfahrung im Hospitality-Bereich. Seine Projekte verbinden Resort-Architektur, umfangreiche Gemeinschaftsanlagen und professionelle Verwaltung.",
      location: "Nai Yang · Hanglage",
      type: "Eigentumswohnungen",
      keyPoints: ["Mediterranes Design", "291 Residenzen"],
      summary:
        "Eine mediterrane, naturnahe und haustierfreundliche Eigentumsanlage in den Hügeln von Nai Yang nahe dem Flughafen Phuket.",
      concept:
        "Eine modern-klassische mediterrane, naturnahe Gemeinschaft an den grünen Hängen über Nai Yang — „wo Glück wächst und das Leben gedeiht“. Zwei haustierfreundliche Wohngebäude und ein eigenes Anlagengebäude liegen inmitten einer Olivenhain-Landschaft, mit Dachpools, Gartenlounges und Geschäften im Erdgeschoss, wenige Minuten vom Strand und vom Flughafen Phuket entfernt.",
      highlights: [
        { label: "Geschosse", value: "8 Geschosse" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "The Title" },
        { label: "Fertigstellung", value: "Q2 2029" },
      ],
      units: [
        { type: "1 Schlafzimmer", area: "Auf Anfrage" },
        { type: "1 Schlafzimmer Plus", area: "Auf Anfrage" },
        { type: "2 Schlafzimmer S", area: "Auf Anfrage" },
        { type: "2 Schlafzimmer M", area: "Auf Anfrage" },
        { type: "Gewerbefläche", area: "Auf Anfrage" },
      ],
      amenities: [
        "Sportpool und Dachpools",
        "Kinderpool",
        "Haustierpark (haustierfreundlich)",
        "Yoga-Rasen und gestaltete Gärten",
        "Sauna und Dampfbad",
        "Fitness",
        "Coworking",
        "Kinderclub",
        "Lobby-Lounge",
        "Geschäfte und Café im Erdgeschoss",
        "E-Auto-Ladestation",
        "Parkplätze (115 Stellplätze)",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "In der Nähe" },
        { label: "Flughafen Phuket", value: "In der Nähe" },
        { label: "Mingle Naiyang", value: "In der Nähe" },
        { label: "Hotel Indigo", value: "In der Nähe" },
        { label: "The Slate", value: "In der Nähe" },
        { label: "Sirinat-Nationalpark", value: "In der Nähe" },
      ],
      features: [
        "Modern-klassisches mediterranes, naturnahes Design",
        "Haustierfreundliche Wohngebäude",
        "29 Anlagen — 14 im Freien und 15 in Innenräumen",
        "Dachpools und Olivenhain-Landschaft",
        "Geschäfte im Erdgeschoss für den täglichen Bedarf",
        "Von The Title — einem preisgekrönten Hospitality-Bauträger auf Phuket",
      ],
      investment:
        "Eine kleine, haustierfreundliche Gemeinschaft im mediterranen Stil von The Title im wachsenden Gebiet Nai Yang nahe dem Flughafen Phuket, mit eigenen Geschäften und Resort-Anlagen für Wohnen und Vermietung.",
      spec: [
        { label: "Residenzen", value: "291" },
        { label: "Gebäude", value: "2 + Anlagengebäude" },
        { label: "Grundstücksfläche", value: "6.490 m²" },
        { label: "Bauträger", value: "The Title" },
        { label: "Etagen", value: "8" },
      ],
    },
    "gardens-of-eden": {
      name: "Gardens of Eden",
      location: "Bang Tao Beach · Cherng Talay",
      type: "Branded Residences",
      keyPoints: ["50 m zum Bang Tao Beach", "Residenzen im Etro-Design"],
      summary:
        "Ein Gartenresort in erster Strandreihe am Bang Tao Beach, in dem Parks, Gärten und Seen 70% des Geländes einnehmen. In drei Phasen errichtet.",
      concept:
        "Gardens of Eden ist das erste Projekt auf Phuket, das um einen eigenen Park herum gebaut wurde: Nur 30% des Geländes sind bebaut, die übrigen 70% bestehen aus gestalteten Parks, Gärten und Seen. Das geschlossene, bewachte Resort liegt nur 50 m vom Bang Tao Beach entfernt und entfaltet sich über drei Phasen — Eden, Park und Lake Residences — plus die Etro Residences, die ersten Wohnungen Thailands in Zusammenarbeit mit dem legendären italienischen Modehaus Etro. Ein 1.000 m² großes Wellnesszentrum, der weiße „Blue Lagoon“-Sandpool, ein Open-Air-Kino, acht Restaurants und ein 3,5 km langer Spazierweg machen das Resort zu einer eigenen Welt, während die gesamte Verkehrsinfrastruktur am Rand unterirdisch verläuft.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "—" },
        { label: "Fertigstellung", value: "Q1 2029" },
      ],
      units: [
        { type: "1 Schlafzimmer", area: "49–75 m²" },
        { type: "2 Schlafzimmer", area: "79–158 m²" },
        { type: "3 Schlafzimmer", area: "122–226 m²" },
        { type: "4 Schlafzimmer", area: "218–223 m²" },
        { type: "Penthäuser", area: "132–259 m²" },
        { type: "Etro Residences", area: "220–420 m²" },
      ],
      amenities: [
        "Erstklassiges asiatisches Wellnesszentrum mit 1.000 m² Gym",
        "Weißer „Blue Lagoon“-Sandpool",
        "Open-Air-Kino",
        "Sechs Pools und panoramische Dachpools",
        "Acht Restaurants und eine Sky Bar",
        "Zwei Clubhäuser und zwei Kinderclubs",
        "5-Sterne-Hotel mit 100 Zimmern",
        "6.000 m² Business-Center mit Coworking",
        "8.000 m² Adventure Gardens",
        "Spa-Garten, Wellness-Wasserfall und Banyan-Garten",
        "Haustierpark, Labyrinth und Yoga-Rasen",
        "Tiefgarage mit Aufzugzugang, Sicherheit rund um die Uhr",
      ],
      locationPoints: [
        { label: "Bang Tao Beach", value: "50 m · 1 Min." },
        { label: "Laguna Phuket", value: "1 Min." },
        { label: "Boat Avenue & Porto de Phuket", value: "5 Min." },
        { label: "Blue Tree", value: "10 Min." },
        { label: "Flughafen Phuket", value: "20 Min." },
        { label: "British International School", value: "30 Min." },
      ],
      features: [
        "Erstes Resort auf Phuket rund um einen eigenen Park (70% grün)",
        "50 m vom Bang Tao Beach an der Westküste der Insel",
        "Etro Residences — erste Wohnungen Thailands im Etro-Design",
        "1.000 m² Wellnesszentrum, acht Restaurants, Open-Air-Kino",
        "Drei Phasen: Eden, Park und Lake Residences",
        "Voll ausgestattete Innenräume mit Einbauküchen und Schränken",
      ],
      investment:
        "Ein großflächiges Branded-Gartenresort mit 5-Sterne-Hotel, umfangreichen Anlagen und Lage in erster Strandreihe am Bang Tao — für Wohnen und Mietnachfrage. Die Residenzen werden im Leasehold über 120 Jahre (4 × 30) mit Freehold-Option angeboten.",
      spec: [
        { label: "Residenzen", value: "1.288" },
        { label: "Phasen", value: "3" },
        { label: "Bebauung", value: "30% des Geländes" },
        { label: "Eigentumsform", value: "Leasehold / Freehold" },
        { label: "Fertigstellung", value: "Q1 2029" },
      ],
    },
    "layan-green-park": {
      name: "Layan Green Park",
      location: "Layan · Bang Tao",
      type: "Branded Residences",
      developer: "Villacarte Group",
      developerNote:
        "Entwickelt von der Villacarte Group; vor Ort läuft ein verwaltetes Mietprogramm von La Green Hotel & Residence.",
      keyPoints: ["2 Min. zum Layan Beach", "EDGE-Green-zertifiziert"],
      summary:
        "Eine umweltbewusste Resort-Community wenige Minuten von den Stränden Layan und Bang Tao, schlüsselfertig übergeben mit Designermöbeln und über 30 Grundrissen.",
      concept:
        "Layan Green Park ist eine grüne, niedrig gebaute Resort-Community inmitten tropischer Gärten zwischen Layan und Bang Tao an der Westküste Phukets. Das Projekt ist nach dem EDGE-Green-Building-Standard mit energie- und wassersparender Technik errichtet und wird vollständig schlüsselfertig übergeben — inklusive Designermöbel, Einbauküche und Geräten. Die Residenzen verfügen über 2,7 m Deckenhöhe, SPC-Böden und zentrale Warmwasserversorgung. Phase 1 wurde 2024 übergeben, Phase 2 wird 2026 fertiggestellt; vor Ort betreibt La Green Hotel & Residence ein professionelles verwaltetes Mietprogramm.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "Villacarte Group" },
        { label: "Fertigstellung", value: "Ende 2026" },
      ],
      units: [
        { type: "Studios", area: "30–37 m²" },
        { type: "1 Schlafzimmer", area: "45–75 m²" },
        { type: "2 Schlafzimmer", area: "65–91 m²" },
        { type: "3 Schlafzimmer", area: "121–148 m²" },
        { type: "Duplexe", area: "bis 269 m²" },
      ],
      amenities: [
        "Resort-Pools mit Sonnenterrassen",
        "Fitnesscenter und Yoga-Bereiche",
        "Lobby und Lounge mit Concierge",
        "Co-Working- und Besprechungsräume",
        "Restaurants und Cafés auf dem Gelände",
        "Kids' Club und Spielbereiche",
        "Angelegte tropische Gärten",
        "Verwaltetes Mietprogramm von La Green",
        "24/7-Sicherheit und Parkplätze",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "2 Min." },
        { label: "Bang Tao Beach", value: "10 Min." },
        { label: "Boat Avenue & Porto de Phuket", value: "10 Min." },
        { label: "Laguna Phuket", value: "10 Min." },
        { label: "Flughafen Phuket", value: "20 Min." },
        { label: "British International School", value: "25 Min." },
      ],
      features: [
        "EDGE-Green-Building-Zertifizierung mit energie- und wassersparender Bauweise",
        "Schlüsselfertige Übergabe mit Designermöbeln und Geräten",
        "2,7 m Deckenhöhe, SPC-Böden und zentrales Warmwasser",
        "Über 30 Grundrisse vom Studio bis zum Duplex",
        "Phase 1 übergeben 2024, Phase 2 Fertigstellung 2026",
        "Verwaltetes Mietprogramm von La Green Hotel & Residence",
      ],
      investment:
        "Eine schlüsselfertige, green-zertifizierte Resort-Community wenige Minuten vom Layan Beach mit professionellem verwaltetem Mietprogramm — eine pflegeleichte Option für Eigennutzung wie Mietnachfrage.",
      spec: [
        { label: "Phasen", value: "2" },
        { label: "Deckenhöhe", value: "2,7 m" },
        { label: "Grundrisse", value: "30+" },
        { label: "Zertifizierung", value: "EDGE green" },
        { label: "Fertigstellung", value: "Ende 2026" },
      ],
    },
    "layan-verde": {
      name: "Layan Verde",
      location: "Bang Tao · Layan",
      type: "Hotelgeführtes Condominium",
      developerNote:
        "Ein hotelgeführtes Condominium, betrieben nach 5-Sterne-Standards von Dusit International, mit BOI-Zertifizierung.",
      keyPoints: ["2 Min. zum Layan Beach", "Dusit-geführt, BOI-zertifiziert"],
      summary:
        "Ein Resort-Condominium in bionischer Architektur auf einem 7,5 Hektar großen grünen Hang nahe dem Layan Beach, von Dusit International nach 5-Sterne-Standards geführt — in den Kollektionen Luxury und Premium.",
      concept:
        "Layan Verde ist ein großflächiges Resort-Condominium auf einem 7,5 Hektar großen grünen Hang im Gebiet Bang Tao, zwei Fahrminuten vom Layan Beach entfernt. Die bionische Architektur verbindet organische, von der Natur inspirierte Formen mit kaskadierenden begrünten Terrassen, über 300 Pflanzenarten und mehr als 30.000 m² Landschaftsgestaltung des Büros SHMA. Die Anlage wird als hotelgeführtes Condominium nach 5-Sterne-Standards von Dusit International betrieben und ist BOI-zertifiziert. Zwei Kollektionen — Luxury (5 Gebäude, 93 Residenzen) und Premium (10 Gebäude, 681 Residenzen) — teilen sich 65 Infrastruktureinrichtungen, darunter zwei Hotels, einen Ocean Club, ein Wellnesscenter und neun Pools.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "—" },
        { label: "Fertigstellung", value: "Ende 2028" },
      ],
      units: [
        { type: "Premium · Studio", area: "ab 37,3 m²" },
        { type: "Premium · 1 Schlafzimmer", area: "ab 56,0 m²" },
        { type: "Premium · 2 Schlafzimmer", area: "ab 100,5 m²" },
        { type: "Premium · 3 Schlafzimmer", area: "ab 155,2 m²" },
        { type: "Luxury · 1–3 Schlafzimmer", area: "ab 100,7 m²" },
        { type: "Luxury · 4 Schlafz. & Penthouses", area: "ab 394,4 m²" },
      ],
      amenities: [
        "Zwei Hotels auf dem Gelände unter Dusit-Management",
        "Neun Pools und ein 50-m-Schwimmbecken",
        "1.500 m² Wellnesscenter mit Spa und Onsen",
        "Ocean Club für bis zu 300 Gäste",
        "16+ Restaurants, Cafés und Bars",
        "Co-Working, Besprechungsräume und Golfsimulator",
        "Zwei Padel-Courts, Squash-Court und Sportrasen",
        "Kids' Clubs, Spielplätze und Kletterwand",
        "5.000 m² Einzelhandel und ein Supermarkt",
        "2 km Spazierwege durch die Gartenlandschaft",
        "Haustierbereich, BBQ-Zonen und Dachpools",
        "1.000+ Parkplätze, 24/7-Sicherheit",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "2 Min." },
        { label: "Bang Tao Beach", value: "10 Min." },
        { label: "Boat Avenue & Porto de Phuket", value: "10 Min." },
        { label: "Laguna Phuket", value: "10 Min." },
        { label: "Flughafen Phuket", value: "25 Min." },
        { label: "British International School", value: "25 Min." },
      ],
      features: [
        "Bionische Architektur mit kaskadierenden begrünten Terrassen",
        "5-Sterne-Hotelmanagement durch Dusit International",
        "BOI-zertifiziert mit Vorteilen für ausländische Eigentümer",
        "7,5 Hektar grünes Gelände mit über 300 Pflanzenarten",
        "65 Infrastruktureinrichtungen in Luxury und Premium",
        "Landschaftsdesign von SHMA, Fertigstellung 2028",
      ],
      investment:
        "Ein Dusit-geführtes, BOI-zertifiziertes Resort-Condominium nahe dem Layan Beach mit zwei Hotels und 65 Einrichtungen auf einem grünen Hang — ein Asset auf Hotelniveau für eine starke ganzjährige Mietnachfrage. Leasehold- und Freehold-Optionen verfügbar.",
      spec: [
        { label: "Gelände", value: "7,5 ha" },
        { label: "Residenzen", value: "774" },
        { label: "Kollektionen", value: "Luxury / Premium" },
        { label: "Management", value: "Dusit International" },
        { label: "Fertigstellung", value: "Ende 2028" },
      ],
    },
    "the-ozone": {
      name: "The Ozone Condominium",
      location: "Laguna · Bang Tao",
      type: "Condominium",
      developer: "The Ozone Group Phuket",
      keyPoints: ["1 km zu Laguna & Boat Avenue", "Golf-, Berg- & Gartenblick"],
      summary:
        "Ein modernes Luxus-Condominium mit acht Etagen und 164 Residenzen neben Laguna Phuket, dessen raumhohe Verglasung den Laguna-Golfplatz, die Berge und Gärten einrahmt.",
      concept:
        "The Ozone Condominium ist ein modernes Luxus-Niedrigbau-Projekt mit 164 Residenzen auf acht Etagen, einen Kilometer von Laguna Phuket und Boat Avenue im Herzen von Bang Tao. Konzipiert für großzügiges Wohnen mit freiem Ausblick, öffnet sich in jeder Wohnung eine raumhohe Verglasung zum Laguna-Golfplatz, zu den Bergen oder zu üppigen tropischen Gärten und verwischt die Grenze zwischen Innen und Außen. Drei Wohnungstypen — Ein-Zimmer-, Zwei-Zimmer- und Maisonette-Zwei-Zimmer-Grundrisse — werden ergänzt durch einen großen L-förmigen Pool, ein gut ausgestattetes Fitnesscenter und angelegte Außenanlagen.",
      highlights: [
        { label: "Geschosse", value: "8 Geschosse" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "The Ozone Group" },
        { label: "Fertigstellung", value: "Fertiggestellt" },
      ],
      units: [
        { type: "1 Schlafzimmer · Typ A", area: "42 m²" },
        { type: "1 Schlafzimmer · Typ B", area: "51 m²" },
        { type: "2 Schlafzimmer", area: "88 m²" },
        { type: "Maisonette 2 Schlafzimmer", area: "85–88 m²" },
      ],
      amenities: [
        "L-förmiger Pool (5×24 m + 4×13 m)",
        "Gut ausgestattetes Fitnesscenter",
        "Lobby-Lounge mit Gartenblick",
        "Raumhohe Verglasung in jeder Residenz",
        "Laguna-Golf-, Berg- und Gartenblick",
        "Angelegte tropische Außenanlagen",
        "Überdachte Parkplätze und 24/7-Sicherheit",
      ],
      locationPoints: [
        { label: "Laguna Golf Course", value: "1 km" },
        { label: "Boat Avenue & Porto de Phuket", value: "1–2 km" },
        { label: "Bang Tao Beach", value: "2 km" },
        { label: "Layan Beach", value: "2 km" },
        { label: "Blue Tree Waterpark", value: "3,5 km" },
        { label: "Flughafen Phuket", value: "16 km" },
      ],
      features: [
        "Modernes Luxus-Condominium mit acht Etagen und 164 Residenzen",
        "Einen Kilometer von Laguna Phuket und Boat Avenue",
        "Raumhohe Verglasung mit Golf-, Berg- und Gartenblick",
        "Drei Grundrisse, darunter Maisonette-Zwei-Zimmer-Wohnungen",
        "L-förmiger Pool und gut ausgestattetes Fitnesscenter",
        "Nahtloses Innen-Außen-Wohnen mit viel Tageslicht",
      ],
      investment:
        "Ein modernes Luxus-Condominium neben Laguna Phuket und Boat Avenue, in einem der etabliertesten und vermietungsfreundlichsten Viertel der Insel — ein kompaktes, gut angebundenes Asset für Eigennutzung wie Mietnachfrage.",
      spec: [
        { label: "Etagen", value: "8" },
        { label: "Residenzen", value: "164" },
        { label: "Wohnungstypen", value: "3" },
        { label: "Entwickler", value: "The Ozone Group" },
        { label: "Aussicht", value: "Golf / Berge / Garten" },
      ],
    },
    "bellevue-beachfront": {
      name: "Bellevue Beachfront",
      location: "Layan Beach",
      type: "Strandnahes Condominium",
      developer: "Bellevue",
      developerNote:
        "Das zweite Projekt der Marke Bellevue, nur 50 Meter vom Layan Beach entfernt.",
      keyPoints: ["50 m zum Layan Beach", "Marke Bellevue, erste Strandreihe"],
      summary:
        "Ein modernes strandnahes Condominium nur 50 Meter vom Layan Beach, mit geschwungener Balkonarchitektur rund um begrünte Pool-Innenhöfe.",
      concept:
        "Bellevue Beachfront ist das zweite Projekt der Marke Bellevue in einer seltenen Lage in erster Strandreihe, nur 50 Meter vom Layan Beach an der ruhigen Nordwestküste Phukets. Niedrige Gebäude mit sanft geschwungenen Balkonen rahmen begrünte Innenhöfe und einen Resort-Pool. Jede Residenz ist modern gestaltet, mit Küchenzeile oder Pantry, Frühstücksbar oder Essbereich, komfortablen Schlafzimmern und — in vielen Grundrissen — einem privaten Balkon. Eine große Lobby und Rezeption runden einen ruhigen Lebensstil am Strand ab, wenige Minuten von Bang Tao, Laguna und Boat Avenue.",
      highlights: [
        { label: "Geschosse", value: "—" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "Bellevue" },
        { label: "Fertigstellung", value: "Oktober 2026" },
      ],
      units: [
        { type: "Studio", area: "32 m²" },
        { type: "1 Schlafzimmer", area: "40 m²" },
        { type: "2 Schlafzimmer", area: "64 m²" },
        { type: "2 Schlafzimmer (groß)", area: "80 m²" },
      ],
      amenities: [
        "Resort-Pool mit Sonnenterrassen",
        "Große Lobby und Rezeption",
        "Begrünte Innenhof-Gärten",
        "Küchenzeile oder Pantry in jeder Residenz",
        "Frühstücksbar oder Essbereich",
        "Private Balkone in vielen Grundrissen",
        "Lage in erster Strandreihe, 50 m zum Layan Beach",
        "Parkplätze und 24/7-Sicherheit",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "50 m · 1 Min." },
        { label: "Bang Tao Beach", value: "4 Min." },
        { label: "Boat Avenue & Villa Market", value: "10 Min." },
        { label: "Central Porto de Phuket", value: "12 Min." },
        { label: "Catch Beach Club", value: "15 Min." },
        { label: "Flughafen Phuket", value: "25 Min." },
      ],
      features: [
        "Seltene Lage in erster Strandreihe, 50 m zum Layan Beach",
        "Zweites Projekt der etablierten Marke Bellevue",
        "Geschwungene Balkonarchitektur rund um Pool-Innenhöfe",
        "Vier Grundrisse vom Studio bis zur 80-m²-Zwei-Zimmer-Wohnung",
        "Moderne Interieurs mit Küchenzeile und Essbereich",
        "Große Lobby, Rezeption und Resort-Pool",
      ],
      investment:
        "Ein strandnahes Condominium nur 50 Meter vom Layan Beach von der etablierten Marke Bellevue — eine seltene Lage in erster Reihe an Phukets Nordwestküste für Eigennutzung und starke Ferienvermietungsnachfrage.",
      spec: [
        { label: "Zum Strand", value: "50 m" },
        { label: "Gebäude", value: "6" },
        { label: "Wohnungstypen", value: "4" },
        { label: "Entwickler", value: "Bellevue" },
        { label: "Lage", value: "Erste Strandreihe" },
      ],
    },
    "siamese-bangtao": {
      name: "Siamese Bangtao",
      location: "Bang Tao",
      type: "Condominium am See",
      developer: "Siamese Stone Developments",
      developerNote:
        "Ein Konsortium unter Führung von Siamese Asset PLC mit Cornerstone und Dynasty Development — ein Zusammenschluss einiger der etabliertesten Entwickler Thailands.",
      keyPoints: ["5 Infinity-Pools am See", "Im Herzen von Bang Tao"],
      summary:
        "Ein Condominium am See im Herzen von Bang Tao, angelegt rund um fünf Infinity-Pools am See mit einem Wellness-, Arbeits- und Lifestyle-Programm auf Resort-Niveau.",
      concept:
        "Siamese Bangtao liegt in einer der begehrtesten Lagen Phukets, nur wenige Minuten von den Stränden und dem lebhaften Treiben Bang Taos entfernt. Drei niedrige Gebäude mit je sieben Geschossen umrahmen fünf Infinity-Pools am See, die Residenzen reichen von kompakten Studios bis zu großzügigen Maisonetten. Realisiert von einem Konsortium führender thailändischer Entwickler, verbindet das Projekt mutige, moderne Architektur mit einem außergewöhnlichen Ausstattungsprogramm — Wellness, Sport, Co-Working und Gastronomie — für alle, die in einer der stärksten Vermietungslagen der Insel leben, entspannen und verdienen möchten.",
      highlights: [
        { label: "Geschosse", value: "7 Geschosse" },
        { label: "Bebaute Fläche", value: "—" },
        { label: "Bauträger", value: "Siamese Stone" },
        { label: "Fertigstellung", value: "August 2027" },
      ],
      units: [
        { type: "Studio", area: "30 m²" },
        { type: "1 Schlafzimmer", area: "45,25 m²" },
        { type: "2 Schlafzimmer", area: "79,5 m²" },
        { type: "Maisonette", area: "92 m²" },
      ],
      amenities: [
        "Fünf Infinity-Pools am See sowie Lap-, Flach- und Kinderpool",
        "Thermalbereich mit Sauna, Dampfbad, Onsen und Eisbad",
        "Voll ausgestattetes Fitnessstudio und Joggingstrecke",
        "Golfsimulator und Padel-Tennisplatz",
        "Co-Working-Space, Podcast-Studio und Besprechungsraum",
        "Restaurant und Café auf dem Gelände",
        "Open-Air-Kino und Rooftop-BBQ",
        "Haustierfreundlicher Park",
        "Rezeption und Lobby, Sicherheit rund um die Uhr",
      ],
      locationPoints: [
        { label: "Bang Tao Beach", value: "Minuten" },
        { label: "Boat Avenue & Porto de Phuket", value: "In der Nähe" },
        { label: "Laguna Phuket", value: "In der Nähe" },
        { label: "Layan Beach", value: "In der Nähe" },
        { label: "Blue Tree Phuket", value: "In der Nähe" },
        { label: "Flughafen Phuket", value: "~25 Min" },
      ],
      features: [
        "Fünf Infinity-Pools am See als Herzstück des Projekts",
        "Errichtet von einem Konsortium führender Entwickler Thailands",
        "Studios bis Maisonetten in drei niedrigen Gebäuden",
        "Wellness auf Resort-Niveau mit Thermalbereich und Onsen",
        "Golfsimulator, Padel-Platz und vollwertiges Fitnessstudio",
        "Co-Working-Space, Podcast-Studio und Open-Air-Kino",
      ],
      investment:
        "Ein Condominium am See im Herzen von Bang Tao von einem Konsortium führender thailändischer Entwickler — fünf Infinity-Pools und ein Ausstattungsprogramm auf Resort-Niveau in einer der stärksten Vermietungslagen Phukets.",
      spec: [
        { label: "Gebäude", value: "3" },
        { label: "Geschosse", value: "7" },
        { label: "Wohnungstypen", value: "4" },
        { label: "Fertigstellung", value: "August 2027" },
        { label: "Entwickler", value: "Siamese Stone" },
      ],
    },
  },
  guides: {
    "buying-in-phuket-as-foreigner": {
      title:
        "Immobilienkauf auf Phuket als Ausländer 2026: Rechtsformen, Steuern, Checkliste",
      description:
        "Vollständiger Praxisleitfaden für ausländische Käufer von Immobilien auf Phuket. Freehold und Leasehold, Steuern, Zahlungsplan, Due Diligence, realistische Mietrendite und Schritt-für-Schritt-Checkliste.",
      category: "Rechtsleitfaden",
      readingMinutes: 12,
      intro:
        "Phuket zählt zu den weltweit attraktivsten Wohnimmobilienmärkten für ausländische Investoren: 7–12% Netto-Mietrendite p.a. auf starken Off-Plan-Projekten, stabile touristische Nachfrage und ein verständlicher Rechtsrahmen. Doch der Kauf durch Ausländer in Thailand folgt eigenen Regeln — Grundstückseigentum ist Nicht-Thailändern verwehrt, eine Eigentumswohnung im Kondominium dagegen problemlos möglich. Dieser Leitfaden enthält alles, was Sie brauchen, um sicher zu kaufen und die Rendite vorab realistisch zu modellieren.",
      sections: [
        {
          heading: "Was Ausländer in Thailand kaufen dürfen — und was nicht",
          paragraphs: [
            "Thailändisches Recht verbietet Ausländern Grundeigentum, erlaubt aber ausdrücklich das Freehold-Eigentum an Kondominiumseinheiten — dies ist die rechtliche Grundlage von rund 90% aller Investitionsgeschäfte auf Phuket.",
            "Eine Villa mit Grundstück lässt sich über eine der legalen Strukturen erwerben: 30-jähriges Leasehold mit Verlängerungsoption, Eigentum über eine thailändische Gesellschaft (2026 stärker kontrolliert — nur mit qualifiziertem Anwalt) oder langfristige Pacht des Grundstücks kombiniert mit Freehold am Gebäude.",
            "Fertige Kondominien, Off-Plan-Kondominien und Hotel-managed Apartments stehen Ausländern in Freehold offen, sofern die Foreign Quota des Projekts nicht ausgeschöpft ist — per Gesetz können bis zu 49% der verkaufbaren Fläche eines Kondominiums in ausländischem Besitz sein.",
          ],
          bullets: [
            "Kondominium-Freehold — die einfachste und sauberste Struktur für Ausländer",
            "Leasehold 30+30+30 Jahre — bewährtes Modell für Villen und Teile des Kondo-Bestands",
            "Villa-Eigentum über thailändische Gesellschaft — nur mit qualifiziertem Anwalt",
          ],
        },
        {
          heading: "Freehold vs. Leasehold: Was wählen",
          paragraphs: [
            "Freehold bedeutet volles Eigentum, eingetragen im Land Office, vererbbar und jederzeit veräußerbar. Einzige Grenze: die 49% Foreign Quota pro Gebäude.",
            "Leasehold ist eine eingetragene Langzeitpacht, meist 30 Jahre mit zwei Verlängerungsoptionen (bis zu 90 Jahre gesamt). Rechtlich schwächer als Freehold: Die Verlängerung hängt vom Grundeigentümer (meist dem Entwickler) ab — Reputation des Entwicklers und präzise Vertragsformulierung sind entscheidend.",
            "Faustregel: Ist Freehold zum gewünschten Preis verfügbar — Freehold nehmen. Leasehold ist die Wahl, wenn die Quote voll, die Einheit selten und der Entwickler stark ist.",
          ],
          bullets: [
            "Freehold: vollständiges Eigentum, Land-Office-Eintrag, saubere Weiterveräußerung",
            "Leasehold: 30+30+30 Jahre, rechtlich schwächer, aber legal und funktionsfähig",
            "49% Foreign Quota ist in gefragten Projekten schnell vergeben — Freehold-Einheiten werten auf",
          ],
        },
        {
          heading: "Off-Plan vs. fertig: Wo ist die Rendite höher",
          paragraphs: [
            "Off-Plan (Kauf während der Bauphase) ist das dominierende Format für Investitionsdeals auf Phuket. Zahlungen sind gestaffelt, der Einstiegspreis liegt 20–35% unter Fertigstellungspreis, und bei einem starken Entwickler liefert dieses Format den höchsten ROI.",
            "Fertige Objekte passen zu Käufern, die sofort einziehen oder ohne Wartezeit vermieten möchten. Der Preis ist höher, dafür gibt es kein Bauträgerrisiko und der Cashflow startet ab Tag eins.",
            "Das Hauptkriterium bei Off-Plan ist nicht der Preis, sondern der Entwickler: EIA (Umweltverträglichkeitsprüfung), Baugenehmigung (Construction Permit), pünktliche Übergaberekord und Betriebsmodell nach Fertigstellung.",
          ],
          bullets: [
            "Off-Plan: 20–35% Einstiegsrabatt, gestaffelte Zahlungen, Vermietung nach Übergabe",
            "Fertig: sofortige Nutzung/Vermietung, höherer Preis, geringeres Wertsteigerungspotenzial",
            "Unverhandelbare Checks: EIA, Baugenehmigung, Entwickler-Track-Record, Escrow",
          ],
        },
        {
          heading: "Zahlungsplan und Geldtransfer",
          paragraphs: [
            "Typischer Off-Plan-Plan: 1–3% Reservation Fee, 20–30% bei Unterzeichnung des Sales & Purchase Agreement (SPA), 40–60% in Bautranchen, 10–20% bei Schlüsselübergabe.",
            "Die Zahlung erfolgt aus dem Ausland auf das Konto des Entwicklers oder auf Ihr thailändisches Konto mit dem obligatorischen Verwendungszweck „for the purpose of purchasing condominium“. Nur ein solcher Transfer erzeugt das Foreign Exchange Transaction Form (FET) — ohne dieses Dokument ist die Freehold-Registrierung für Ausländer unmöglich.",
            "Für Käufer aus Russland und der GUS führen 2026 gängige Routen über befreundete Jurisdiktionen, lokal lizenzierte USDT-zu-Fiat-Konvertierung oder ein Konto in einem Drittstaat. Jede Route braucht eine individuelle Planung, damit die FET-Dokumentation korrekt bleibt.",
          ],
          bullets: [
            "Reservation Fee: 1–3% bei Reservierung",
            "SPA: +20–30% bei Vertragsunterzeichnung",
            "Bautranchen: 40–60% über Meilensteine",
            "Schlüsselübergabe: finale 10–20%",
            "FET-Formular ist Pflicht für die ausländische Freehold-Registrierung",
          ],
        },
        {
          heading: "Steuern bei Kauf und Eigentum",
          paragraphs: [
            "Bei der Registrierung teilen Käufer und Verkäufer: Transfer Fee 2% des Schätzwertes, Specific Business Tax 3.3% (wenn der Verkäufer weniger als 5 Jahre Eigentümer war), Stamp Duty 0.5% und Withholding Tax nach progressiver Skala. Standardpraxis auf Phuket ist eine 50/50-Aufteilung, die im Vertrag festgehalten wird.",
            "Jährliche Haltekosten sind faktisch zwei: Land and Building Tax (0.02–0.10% des Schätzwertes bei Wohnimmobilien) und die Service Charge des Entwicklers (keine Steuer, sondern eine Infrastrukturgebühr, 50–90 THB/m²/Monat).",
            "Mietsteuer für Nichtansässige: 15% Quellensteuer auf die Bruttoeinnahmen. Über eine thailändische Gesellschaft wird die Bemessungsgrundlage um Ausgaben reduziert, der effektive Satz sinkt. Die meisten Hotel-managed Programme behalten die Steuer automatisch ein und stellen die Unterlagen aus.",
          ],
          bullets: [
            "Transfer 2% + SBT 3.3% + Stempel 0.5% + WHT — beim Abschluss geteilt",
            "Jährlich: Land & Building Tax 0.02–0.10% des Schätzwertes",
            "Service Charge 50–90 THB/m²/Monat (Infrastruktur, keine Steuer)",
            "Miet-Quellensteuer Nichtansässige: 15% auf Bruttoeinnahmen",
          ],
        },
        {
          heading: "Due Diligence: Was vor der Unterschrift zu prüfen ist",
          paragraphs: [
            "Rechtspaket des Entwicklers: Chanote (Grundbuch) für das Grundstück, Baugenehmigung, EIA, Kondominiums-Registrierungsgenehmigung, Eintragung der Entwicklergesellschaft beim MOC (Ministry of Commerce), keine anhängigen Verfahren, keine Belastungen.",
            "Foreign Quota — wie viel Prozent des Projekts bereits an Ausländer im Freehold verkauft wurden. Ist die Quote ausgeschöpft, erhalten Sie nur Leasehold — egal, wie das Marketing es nennt. Vor SPA-Unterzeichnung prüfen.",
            "Der SPA selbst: Zahlungsplan, Verzugsstrafen, Mängelgewährleistung (üblich 1 Jahr Ausbau, 5 Jahre Konstruktion), Force-Majeure-Klauseln, Escrow, Leasehold-Verlängerungsklausel (falls anwendbar).",
          ],
          bullets: [
            "Chanote, Baugenehmigung, EIA — das Basispaket des Entwicklers",
            "MOC-Registrierung + pünktliche Übergabehistorie",
            "Verfügbare Foreign Quota — kritisch für Freehold-Registrierung",
            "SPA: Fristen, Strafen, Garantien, Escrow, Leasehold-Verlängerung",
          ],
        },
        {
          heading: "Verwaltung und Vermietung nach Übergabe",
          paragraphs: [
            "Drei Modelle: Hotel-managed Programm (Entwickler oder Operator vermietet in Ihrem Namen, Sie erhalten Einkommen nach festem Satz oder Revenue-Share), unabhängiges Property Management (üblich 20–25% Gebühr) oder Selbstverwaltung (realistisch nur, wenn Sie auf Phuket leben).",
            "Hotel-managed kommt oft mit garantierter Rendite in den ersten 3–5 Jahren (5–7% p.a. auf Kaufpreis) — das ist eher der Marketingboden. Das eigentliche Upside liegt im Revenue-Share nach Garantie, wo starke Projekte 8–12% netto liefern.",
            "Auslastung auf Phuket: 65–85% jährlich in den stärksten Lagen (Bang Tao, Layan, Nai Yang, Laguna) unter professioneller Verwaltung. Hochsaison Dezember–März, Nebensaison Juni–September.",
          ],
          bullets: [
            "Hotel-managed: 5–7% Garantie in den ersten Jahren + Revenue-Share danach",
            "Unabhängiges Management: 20–25% Provision auf Einkommen",
            "Auslastung 65–85% in Top-Lagen bei professionellem Betrieb",
            "Hochsaison: Dezember–März. Nebensaison: Juni–September",
          ],
        },
        {
          heading: "Schritt-für-Schritt-Checkliste für Käufer",
          bullets: [
            "Ziel definieren: Einkommen, Kapital, Wohnen, Umzug — davon hängt alles ab",
            "Lage wählen: Bang Tao, Layan, Nai Yang, Laguna — am stärksten für Investitionen",
            "Shortlist 3–5 Projekte nach Ziel und Budget",
            "Entwickler prüfen: EIA, Baugenehmigung, Übergabehistorie",
            "Rendite modellieren: 5–10-Jahres-Yield-Modell mit Saisonalität",
            "Reservierung: 1–3% Reservation Fee",
            "Due Diligence: Anwalt prüft SPA und Entwicklerunterlagen",
            "SPA-Unterzeichnung: Zahlungsplan und Verzugsstrafen",
            "Transfer einrichten: FET-Formular",
            "Bautranchen",
            "Snagging + Schlüsselübergabe",
            "Management aufsetzen, Vermietung starten",
          ],
        },
      ],
      faq: [
        {
          q: "Kann ein Ausländer in Thailand Immobilien auf den eigenen Namen kaufen?",
          a: "Ja, aber nur bestimmte Objektarten. Eine Kondominiumseinheit — auf den eigenen Namen im Freehold, sofern die 49% Foreign Quota des Projekts nicht ausgeschöpft ist. Grundstücke — nein, nur über 30-jähriges Leasehold oder eine thailändische Gesellschaft mit qualifiziertem Anwalt.",
        },
        {
          q: "Welche Mietrendite ist auf Phuket 2026 realistisch?",
          a: "Auf starken Off-Plan-Projekten in Bang Tao, Layan und Nai Yang: 7–12% netto p.a. bei professionellem Management. Die 5–7% Garantien der Anfangsjahre sind der Marketingboden — die reale Obergrenze liegt darüber.",
        },
        {
          q: "Was ist sicherer — Off-Plan oder fertig?",
          a: "Beide Formate sind legal und funktionieren. Off-Plan bringt 20–35% Einstiegsrabatt und höhere ROI, verlangt aber gründliche Entwickler-Due-Diligence. Fertige Objekte bieten weniger Wertsteigerung, aber kein Bauträgerrisiko und sofortigen Cashflow.",
        },
        {
          q: "Wie überweise ich 2026 als Käufer aus Russland/GUS die Kaufsumme?",
          a: "Über lokal lizenzierte USDT-zu-Fiat-Konvertierung, Konten in befreundeten Jurisdiktionen oder Zahlungen über Partnerstrukturen. Entscheidend ist eine korrekte FET-Form — ohne sie ist die Freehold-Registrierung für Ausländer unmöglich.",
        },
        {
          q: "Muss ich in Thailand Steuern zahlen, wenn ich die Wohnung vermiete?",
          a: "Ja — 15% Quellensteuer auf die Bruttomieteinnahmen für Nichtansässige. Über eine thailändische Gesellschaft wird die Bemessungsgrundlage progressiv um Ausgaben reduziert. Hotel-managed Programme behalten meist automatisch ein und stellen Belege aus.",
        },
        {
          q: "Was passiert, wenn der Entwickler die Übergabe verzögert?",
          a: "Der SPA regelt es: Verzugsstrafen (üblich 5–15% p.a. auf gezahlte Summen) und das Rücktrittsrecht des Käufers mit Rückerstattung nach definiertem Verzögerungszeitraum (oft 12 Monate).",
        },
        {
          q: "Foreign Quota — wo liegt das Risiko?",
          a: "Per Gesetz können bis zu 49% der verkaufbaren Fläche im Freehold an Ausländer verkauft werden. In gefragten Off-Plan-Projekten sind diese 49% in den ersten 6–12 Monaten weg — danach bleibt Ausländern nur Leasehold. Vor SPA-Unterzeichnung freie Quote prüfen.",
        },
      ],
    },
    "rental-yield-phuket-by-area": {
      title:
        "Reale Mietrendite auf Phuket 2026 nach Lage: Zahlen ohne Marketing-Glanz",
      description:
        "Wie Sie die reale Nettomietrendite auf Phuket berechnen, Rendite- und Auslastungsspannen für Bang Tao, Layan, Laguna, Nai Yang, Cherng Talay und die älteren Touristenbezirke. Was Rendite am schnellsten frisst und wie Sie die Lage passend zum Ziel wählen.",
      category: "Investitionsanalyse",
      readingMinutes: 10,
      intro:
        "Reale Rendite sind nicht die «garantierten 5–7%» aus dem Marketing-Prospekt. Es ist die Nettorendite nach Steuern, Managementgebühren, Service Charges und Leerstandszeiten. Dieser Leitfaden zeigt realistische Renditespannen für jede investitionswürdige Lage auf Phuket, die Faktoren, die die Rendite am stärksten mindern, und eine Faustregel zur Lageauswahl je nach Ziel.",
      sections: [
        {
          heading: "Wie man Rendite richtig berechnet",
          paragraphs: [
            "Drei Kennzahlen, die nicht zu verwechseln sind. Bruttorendite = Jahresmieteinnahmen / Kaufpreis — nützlich für einen schnellen Vergleich, aber irreführend. Nettorendite = (Einnahmen − Management − Service Charge − Steuern − Leerstand − Verschleiß) / Gesamttransaktionskosten. Cash-on-Cash-Return bezieht Ratenzahlungen und tatsächlich eingesetztes Eigenkapital ein — die ehrlichste Kennzahl für Off-Plan-Investoren.",
            "Häufig übersehene Gesamtkosten: Transfer Fee und Sinking Fund bei Registrierung, Überweisungsgebühren, Möblierung (400–800 Tsd. THB für 1-Zimmer), erste Service-Charge-Periode, erste Monate ohne Mieter, Versicherung, Möbelabschreibung.",
            "Die stärksten Renditefresser: Management Fee 20–25% vom Brutto, Service Charge 50–90 THB/m²/Monat, 15% Quellensteuer für Nichtansässige, Reparaturen und Erneuerung alle 3–5 Jahre, Leerstand in der Nebensaison.",
          ],
          bullets: [
            "Bruttorendite — nur für schnellen Vergleich",
            "Nettorendite — reale Rendite nach allen Abzügen",
            "Cash-on-Cash — mit Ratenzahlungen und Leverage",
            "Gesamtkosten = Preis + Möbel + Fees + erste Leerstandsmonate",
          ],
        },
        {
          heading: "Bang Tao — der stärkste Mietmarkt",
          paragraphs: [
            "Bang Tao ist das Epizentrum internationaler Vermietungsnachfrage auf Phuket. Boat Avenue, Porto de Phuket, riesige Auswahl an Restaurants, Golfclubs, das benachbarte Layan 5–10 Minuten entfernt. Ganzjährige Nachfrage aus Asien, Europa, dem Nahen Osten und aus dem Inland.",
            "Bruttorendite: 8–12% off-plan, 6–9% fertig. Nettorendite nach allen Kosten: 5–8%. Auslastung: 75–85% p.a. bei professionellem Management. ADR (durchschnittlicher Übernachtungspreis): 3.500–7.500 THB für 1-Zimmer-Condos, 8.000–15.000 THB für 2-Zimmer-Lakefront.",
            "Besonderheit: echte Shoulder Season — solide Zahlen Mai–Oktober, nicht nur im Winter. Schnellste Wiederverkaufsliquidität auf der Insel. Die Standardlage für Off-Plan-Investitionen.",
          ],
          bullets: [
            "Bruttorendite: 8–12% (off-plan), 6–9% (fertig)",
            "Nettorendite: 5–8%",
            "Auslastung: 75–85% p.a.",
            "Ganzjährige Nachfrage, breite Herkunftsmärkte",
          ],
        },
        {
          heading: "Layan — Premium mit Kapitalzuwachs",
          paragraphs: [
            "Layan ist die ruhige Enklave zwischen Bang Tao und Cherng Talay. Geringere Neubaudichte als Bang Tao, daher schnellerer Preisanstieg. Anspruchsvollere Gäste, längere Aufenthalte, weniger Kurzzeit-Turnover.",
            "Bruttorendite: 7–10%. Nettorendite: 5–7%. Auslastung: 70–80%. Durchschnittliche Aufenthaltsdauer: 2–4 Wochen (gegen 3–7 Tage in Patong) — deutlich geringere operative Belastung.",
            "Kapitalzuwachs: 6–10% p.a. bei starkem Entwickler. Beste Lage für langfristigen Bestand.",
          ],
          bullets: [
            "Bruttorendite: 7–10%",
            "Nettorendite: 5–7%",
            "Durchschnittliche Aufenthaltsdauer: 2–4 Wochen",
            "Kapitalzuwachs: 6–10% p.a.",
          ],
        },
        {
          heading: "Laguna Phuket — Ökosystem mit 25-jähriger Historie",
          paragraphs: [
            "Laguna ist Phukets älteste integrierte Resortanlage (Banyan Tree, Angsana, Cassia, Dusit). Eigene Strände, Golf, internationale Klinik, Schule, Familieninfrastruktur.",
            "Bruttorendite: 6–9%. Nettorendite: 4–6%. Auslastung: 80–90% — die berechenbarste Nachfrage auf der Insel. Höherer Einstiegspreis, niedrigere Rendite, aber minimales Risiko.",
            "Track Record: In 25+ Jahren hat kein Projekt in Laguna beim Wiederverkauf verloren. Faktisch der Phuket-Safehaven.",
          ],
          bullets: [
            "Bruttorendite: 6–9%",
            "Nettorendite: 4–6%",
            "Auslastung: 80–90% — die stabilste der Insel",
            "Track Record: 25+ Jahre ohne Preisverluste",
          ],
        },
        {
          heading: "Nai Yang — aufsteigende Beachfront-Lage",
          paragraphs: [
            "Nai Yang liegt im Nordwesten neben dem Sirinat National Park. Direkter Strandzugang ohne Bebauung, 15 Minuten vom Flughafen — kritisch für Kurzzeitvermietung. Junger Markt mit niedriger Basis und hohem Upside.",
            "Bruttorendite: 9–12% off-plan. Nettorendite: 6–8%. Auslastung: 65–75% — stärkere Saisonalität als Bang Tao. Hochsaison: November–April.",
            "Hauptrisiko: junger Markt, Wiederverkaufsliquidität geringer als Bang Tao/Layan. Optimal für mittelfristigen Bestand (5–7 Jahre) für Vermietung.",
          ],
          bullets: [
            "Bruttorendite: 9–12% off-plan",
            "Nettorendite: 6–8%",
            "Auslastung: 65–75%, stärkere Saisonalität",
            "15 Min zum Flughafen — Vorteil für Kurzzeitmiete",
          ],
        },
        {
          heading: "Cherng Talay, Kamala, Kata, Karon, Patong",
          paragraphs: [
            "Cherng Talay grenzt an Bang Tao — abgeleitete Nachfrage mit ähnlicher Rendite bei etwas niedrigerem Einstiegspreis. Kamala — Premium-Villen, schwieriger für Kurzzeitvermietung.",
            "Kata, Karon, Patong — das historische Tourismuszentrum. Vorteile: etablierte Nachfrage, günstigerer Einstieg. Nachteile: alter Bestand, hohe Konkurrenz, kurze durchschnittliche Aufenthaltsdauer, ADR niedriger als Bang Tao/Layan.",
            "Bruttorendite: 5–8%. Nettorendite: 3–5%. Gut für Kaufen–Renovieren–Verkaufen, schwach für reines Buy-and-Hold.",
          ],
          bullets: [
            "Cherng Talay: Bang-Tao-nahe Rendite, niedrigerer Einstieg",
            "Kata/Karon: Nettorendite 3–5%",
            "Patong: hohe Konkurrenz, kurze Aufenthalte",
            "Beste Nutzung: Value-Add-Renovierung, nicht Buy-and-Hold",
          ],
        },
        {
          heading: "Ein realer Nettorenditerechner (ohne Glanz)",
          paragraphs: [
            "1-Zimmer-Condo in Bang Tao, off-plan, 5,5 Mio. THB. Jährliche Bruttoeinnahmen: 480 Tsd. THB (Bruttorendite 8,7%).",
            "Abzug vom Brutto: Management Fee 25% (−120k), Service Charge (−30k), 15% Quellensteuer für Nichtansässige (−72k), Reserve für Reparaturen und Leerstand (−30k). Nettoeinkommen: 228 Tsd. THB — Nettorendite 4,1%.",
            "Die «garantierten 6–7% auf Kaufpreis» aus Hotel-managed Programmen sind keine Nettorendite, sondern ein fester Kupon, meist nur für die ersten 3–5 Jahre. Immer nachfragen, um welche Kennzahl es geht.",
          ],
        },
        {
          heading: "So passen Sie die Lage zum Ziel",
          bullets: [
            "Stetiges Einkommen + niedriges Risiko: Laguna, große Bang-Tao-Projekte mit Hotel-Management",
            "Maximale ROI: Off-Plan in Nai Yang oder Bang Tao mit Top-Entwickler",
            "Langfristiger Kapitalzuwachs: Layan",
            "Schnellste Exit-Liquidität: Bang Tao oder Laguna",
            "Eigennutzung + passive Vermietung: Laguna, Nai Yang",
            "Nicht empfohlen als reine Investition: Patong (hohe Konkurrenz, schwacher ADR)",
          ],
        },
      ],
      faq: [
        {
          q: "Welche Nettorendite ist auf Phuket 2026 realistisch?",
          a: "5–8% netto p.a. auf starken Off-Plan-Projekten in Bang Tao, Layan und Nai Yang bei professionellem Management. Die 5–7% Garantien sind ein fixer Kupon aus dem Hotel-managed-Programm, keine Nettorendite.",
        },
        {
          q: "Bang Tao oder Layan für Investment?",
          a: "Bang Tao bei Priorität Liquidität, ganzjährige Nachfrage und schneller Exit. Layan bei Priorität Kapitalzuwachs, geringere operative Belastung und längere Aufenthalte. Portfolios kombinieren häufig beide.",
        },
        {
          q: "Was frisst Rendite am schnellsten?",
          a: "20–25% Management Fee, 15% Quellensteuer für Nichtansässige und Leerstand in der Nebensaison — plus Service Charge und Möbelabschreibung. Brutto-zu-Netto-Lücke typisch 3–5 Prozentpunkte.",
        },
        {
          q: "Wie lange steht eine Phuket-Wohnung leer?",
          a: "In Bang Tao und Laguna bei professionellem Management: 15–25% (Auslastung 75–85%). In Nai Yang: 25–35% (stärkere Saisonalität). In Patong: bis zu 40% in der Nebensaison.",
        },
        {
          q: "Ist Patong 2026 als reine Renditeanlage geeignet?",
          a: "Eher nein. Hohe Konkurrenz, alter Bestand, kurze Aufenthalte. Funktioniert für Kaufen–Renovieren–Verkaufen, nicht für langfristige Vermietungsrendite.",
        },
        {
          q: "Wie überprüfe ich, ob eine beworbene Rendite realistisch ist?",
          a: "Fragen Sie den Entwickler oder Operator nach realen Zahlen aus bereits übergebenen Projekten: durchschnittlicher ADR nach Wohnungstyp, tatsächliche Auslastung der letzten 12 Monate, Zahlungsstruktur. Können sie diese Zahlen nicht liefern — Warnzeichen.",
        },
      ],
    },
    "off-plan-risks-due-diligence": {
      title:
        "Off-Plan auf Phuket: 5 Hauptrisiken und die vollständige Due-Diligence-Checkliste 2026",
      description:
        "Strukturierte Analyse der wichtigsten Risiken beim Off-Plan-Kauf in Thailand — Entwicklerausfall, Foreign-Quota-Erschöpfung, Übergabeverzögerung, Ausstattungsqualität, schwache Betriebsphase — plus vollständige Due-Diligence-Checkliste für ausländische Käufer.",
      category: "Rechtsleitfaden",
      readingMinutes: 11,
      intro:
        "Off-Plan bringt Sie 20–35% günstiger in ein Projekt und liefert bei starkem Entwickler den höchsten ROI. Der Preis dafür: reale Bau- und Rechtsrisiken, die im Marketing nicht auftauchen. Dieser Leitfaden deckt die 5 zentralen Risiken beim Phuket-Off-Plan und eine Due-Diligence-Checkliste, die rund 90% davon eliminiert.",
      sections: [
        {
          heading: "Warum Off-Plan auf Phuket funktioniert",
          paragraphs: [
            "Off-Plan ist das Standardformat für Investitionsdeals auf der Insel. Gestaffelte Zahlung: 1–3% Reservierung, 20–30% bei SPA, 40–60% während des Baus, 10–20% bei Übergabe. Einstiegspreis 20–35% unter Fertigstellungspreis, bei starkem Entwickler ist die ROI 1,5–2× so hoch wie bei fertigen Einheiten.",
            "Auch die Entwicklerökonomie favorisiert Off-Plan — Geld fließt vor Fertigstellung, senkt Bankkreditbedarf und macht Frühzeichnerrabatte möglich. Aber genau hier entstehen Risiken: Teil der Entwickler finanziert den Bau mit Käufergeld und hat bei Verkaufsverlangsamung keine Reserve.",
          ],
        },
        {
          heading: "Risiko 1: Entwickler-Insolvenz oder Baustopp",
          paragraphs: [
            "Das schlimmstmögliche Szenario. Bei Insolvenz vor Übergabe sind Käufergelder ohne Escrow nicht vollständig geschützt — der Thai Condominium Act garantiert keine automatische Rückerstattung.",
            "Risikominderung: nur Entwickler mit ≥3 übergebenen Projekten, Bankbestätigung der Finanzierung und idealerweise Escrow. MOC-Registrierung, Klagestand und Übergabehistorie prüfen.",
          ],
          bullets: [
            "Escrow für Zahlungen vor Übergabe fordern",
            "Mindestens 3 zuvor übergebene Projekte",
            "Klageprüfung durch thailändischen Anwalt",
            "Bankbestätigung der Projektfinanzierung",
          ],
        },
        {
          heading: "Risiko 2: Foreign Quota und Leasehold-Substitution",
          paragraphs: [
            "Per Gesetz können 49% der verkaufbaren Fläche eines Kondominiums an Ausländer im Freehold gehen. In gefragten Projekten sind diese 6–12 Monate früh vergriffen. Später einsteigende Käufer bekommen Leasehold — rechtlich schwächer, oft aber unter derselben «Freehold»-Vermarktung.",
            "Wichtig: Leasehold ist legal und funktionsfähig — muss aber bewusst gewählt sein. Wenn Freehold versprochen, im SPA aber Leasehold steht — entweder Fehler des Agenten oder gezielte Irreführung.",
          ],
          bullets: [
            "Schriftliche Foreign-Quota-Bestätigung zum SPA-Datum",
            "SPA nennt explizit: Freehold oder Leasehold",
            "Preisdifferenz Freehold/Leasehold typisch 5–15%",
            "Leasehold ist okay — aber bewusst gewählt",
          ],
        },
        {
          heading: "Risiko 3: Übergabeverzögerung und Strafmechanismen",
          paragraphs: [
            "Durchschnittliche Off-Plan-Verzögerung in Thailand: 3–9 Monate über geplantem Übergabedatum. Manchmal 12+. Das verschiebt die IRR: geplante Rendite ab Jahr N wird Jahr N+1.",
            "Was der SPA enthalten muss: konkretes Completion-Datum, Strafklausel (typisch 5–15% p.a. auf gezahlte Beträge), Rücktrittsrecht des Käufers mit Rückerstattung nach definierter Verzögerungsdauer (12–24 Monate).",
          ],
          bullets: [
            "Verzugsstrafe: 5–15% p.a. auf gezahlte Summen",
            "Rücktrittsrecht: nach 12–24 Monaten Verzug",
            "Chargeback-Mechanismus bei Projektabbruch",
            "Explizite Daten, nicht «Q4 2028» ohne Tag",
          ],
        },
        {
          heading: "Risiko 4: Ausstattungsqualität vs. Musterwohnung",
          paragraphs: [
            "Die Musterwohnung ist ein Schaufenster — Top-Möbel, kuratierte Beleuchtung, stylische Accessoires. Serienlieferung weicht oft ab: andere Fliesen, günstigere Sanitäranlagen, «gleichwertige» Materialsubstitutionen.",
            "Was der Vertrag fixieren muss: Materialspezifikation (Boden, Sanitär, Küche, Verglasung), Verpflichtung zur Bereitstellung eines Äquivalents bei Nichtverfügbarkeit, Garantie auf Ausbau (1 Jahr) und Konstruktion (5 Jahre).",
            "Snagging ist Pflicht: Inspektion mit Checkliste vor Abnahmeunterschrift. Professionelle Snagging-Firmen verlangen 5–15 Tsd. THB pro Einheit.",
          ],
          bullets: [
            "Materialspezifikation am SPA angehängt",
            "Substitutionsformel bei Materialengpass",
            "Garantie: 1 Jahr Ausbau, 5 Jahre Konstruktion",
            "Pflicht: professionelles Snagging vor Abnahme",
          ],
        },
        {
          heading: "Risiko 5: schwacher Betrieb und Vermietungsversagen",
          paragraphs: [
            "Auch ein gut gebautes Projekt erreicht die versprochene Rendite nicht, wenn der Operator schwach ist — schlechtes Marketing, niedriger ADR, lange Leerstände. Kritisch bei Hotel-managed Objekten, wo Ihr Einkommen direkt vom Operator abhängt.",
            "Zu prüfen: wer der Operator ist (externe Marke Dusit/Marriott/Wyndham oder In-House), wie viele Objekte in Verwaltung, öffentliche Auslastungs- und RevPAR-Zahlen aus dem bestehenden Portfolio.",
          ],
          bullets: [
            "Operator: bekannte Marke oder bewährtes In-House-Team",
            "Portfolio: ≥5 übergebene Objekte",
            "Öffentliche Auslastungs-/RevPAR-Zahlen",
            "Transparente Revenue-Split-Konditionen im Vertrag",
          ],
        },
        {
          heading: "Off-Plan-Due-Diligence-Checkliste",
          bullets: [
            "Chanote (Grundbuch) auf das Grundstück",
            "Baugenehmigung erteilt und gültig",
            "EIA (Umweltverträglichkeitsprüfung) genehmigt",
            "Bedingung Condominium Registration Permit nach Übergabe",
            "Entwicklergesellschaft MOC-registriert, keine Klagen",
            "≥3 zuvor übergebene Projekte mit Daten und Adressen",
            "Escrow für Zahlungen vor Übergabe",
            "SPA: explizites Completion-Datum, Verzugsstrafe, Chargeback",
            "SPA: Materialspezifikation angehängt",
            "Foreign Quota am SPA-Datum — schriftliche Entwicklerbestätigung",
            "SPA nennt explizit: Freehold oder Leasehold",
            "Vermietungsoperator und dessen Portfolio bekannt",
            "Reserve für Snagging und erste Service-Charge-Periode",
          ],
        },
      ],
      faq: [
        {
          q: "Wie riskant ist eine Off-Plan-Transaktion in Thailand?",
          a: "Bei einem Entwickler mit ≥3 übergebenen Projekten, Escrow und sauber formuliertem SPA — Risiko vergleichbar mit Fertigkauf plus Zeitrisiko. Bei schwachem Entwickler und ohne Due Diligence — potenzieller Verlust von 20–30%+ des eingesetzten Kapitals.",
        },
        {
          q: "Was passiert, wenn der Entwickler die Übergabe verpasst?",
          a: "Blick in die Strafklausel des SPA. Standard: 5–15% p.a. auf gezahlte Beträge und Rücktrittsrecht mit Rückerstattung nach 12–24 Monaten Verzögerung. Wirkt nur, wenn die Klausel sauber formuliert ist.",
        },
        {
          q: "Lohnt es sich, die volle Summe für einen Rabatt vorab zu zahlen?",
          a: "Meist nein. Ratenzahlung schützt Sie — bei Baustopp ist ein Teil unbezahlt. Ein 3–7% Rabatt bei Vollzahlung deckt selten das Risiko, außer bei sehr etablierten Entwicklern.",
        },
        {
          q: "Kann ich Off-Plan vor Übergabe weiterverkaufen?",
          a: "Ja — Mechanismus heißt Assignment (Übertragung). SPA erlaubt Assignment üblicherweise ab einem bestimmten Zahlungsanteil (oft 50%) mit Entwicklergebühr 1–3%. Liquider Exit für Investoren in einem wachsenden Projekt.",
        },
        {
          q: "Wie prüfe ich die Reputation eines Entwicklers?",
          a: "Portfolio übergebener Projekte (Adressen, Daten), Erfahrungsberichte in Phuket-Communities, Prüfung durch thailändischen Anwalt (Klagen, MOC), persönliches Treffen mit der Geschäftsführung und Besuch bestehender Projekte.",
        },
        {
          q: "Brauche ich für den Off-Plan-Kauf einen thailändischen Anwalt?",
          a: "Ja. 30–70 Tsd. THB für Prüfung des SPA und der Entwicklerunterlagen. An dieser Position zu sparen ist der häufigste — und teuerste — Fehler ausländischer Käufer.",
        },
      ],
    },
    "rental-tax-non-resident-thailand": {
      title:
        "Mietsteuer für Nichtansässige in Thailand 2026: 15% Quellensteuer, thailändische Gesellschaft, DBA",
      description:
        "Vollständiger Leitfaden zur Besteuerung von Mieteinnahmen aus Thai-Immobilien für Nichtansässige: 15% Quellensteuer, Halten über eine thailändische Gesellschaft mit progressiver Skala, Doppelbesteuerungsabkommen, automatische Einbehaltung in Hotel-managed Programmen und typische Fehler.",
      category: "Steuerleitfaden",
      readingMinutes: 9,
      intro:
        "Die Mietsteuer für ausländische Eigentümer in Thailand ist keine «Grauzone», sondern ein klar definiertes System mit zwei Grundmodi: 15% Quellensteuer für Nichtansässige und progressive Skala über eine thailändische Gesellschaft. Der Leitfaden erklärt beide, was Hotel-managed Programme einbehalten, wie Doppelbesteuerungsabkommen tatsächlich funktionieren und welche Fehler ausländische Eigentümer am häufigsten machen.",
      sections: [
        {
          heading: "Wer ist «Nichtansässiger» und warum ist das wichtig",
          paragraphs: [
            "Ein thailändischer Steueransässiger ist, wer im Kalenderjahr ≥180 Tage im Land verbringt. Alle anderen sind Nichtansässige. Der Unterschied ist grundsätzlich: bei Nichtansässigen fest 15% Quellensteuer, bei Ansässigen progressive Skala.",
            "Staatsangehörigkeit spielt keine Rolle — nur die tatsächliche Anzahl Tage. Viele Immobilieneigentümer verbringen 2–3 Monate pro Jahr auf Phuket: sie sind steuerlich Nichtansässige, unabhängig vom Visumtyp.",
          ],
          bullets: [
            "Ansässig = ≥180 Tage in Thailand pro Kalenderjahr",
            "Staatsangehörigkeit wirkt sich nicht aus — nur Tage",
            "Nichtansässig: 15% Quellensteuer auf Brutto",
            "Ansässig: progressive Skala mit Ausgabenabzug",
          ],
        },
        {
          heading: "Quellensteuer 15% — Mechanik",
          paragraphs: [
            "Der Mietzahler (Mieter, Hotel-managed Operator, Verwaltungsgesellschaft) ist verpflichtet, 15% der Bruttomieteinnahmen für den nichtansässigen Eigentümer einzubehalten und an das Thai Revenue Department abzuführen.",
            "Wichtig: Einbehalt vom Brutto, nicht vom Netto. Ausgaben (Management Fee, Service Charge, Reparaturen) mindern die Basis nicht. Einfache Mechanik — aber nicht die effizienteste: die Effektivbelastung auf reales Nettoeinkommen kann 25–40% erreichen.",
            "Der Eigentümer erhält ein Withholding Tax Certificate. Wichtig für die weitere Nutzung: Aufnahme in die Heimlandsteuererklärung über ein DBA, Berichterstattung.",
          ],
          bullets: [
            "15% werden vom Mieter oder Operator einbehalten",
            "Basis ist der Bruttoeinnahme, Ausgaben nicht abziehbar",
            "Withholding Tax Certificate für den Eigentümer",
            "Effektive Belastung auf Netto kann über 15% liegen",
          ],
        },
        {
          heading: "Thai-Gesellschaft — progressive Skala",
          paragraphs: [
            "Alternative Struktur: die Immobilie über eine thailändische Gesellschaft halten (2026 stärker kontrolliert — muss echte operative Gesellschaft sein, keine Shell). Besteuerung auf Gesellschaftsebene: 20% Körperschaftsteuer auf Gewinn nach Ausgaben.",
            "Was die Basis mindert: Management Fee, Service Charge, Möbelabschreibung, Reparaturen, Versicherung, Rechts- und Buchhaltungskosten. Effektive Belastung auf Mieteinkommen über eine Gesellschaft typisch 10–15% gegen 15% Quellensteuer auf Brutto beim Nichtansässigen.",
            "Nachteile: Buchhaltungskosten (10–20 Tsd. THB/Monat), Pflichtberichte, Dividendensteuer bei Gewinnentnahme, Strukturrisiko bei den verschärften 2026-Prüfungen.",
          ],
          bullets: [
            "20% Körperschaftsteuer auf Gewinn (nicht Umsatz)",
            "Abziehbar: Management, Service, Reparaturen, Abschreibung",
            "Effektive Belastung auf Mieteinkommen: 10–15%",
            "Erfordert echte Operation und qualifizierte Buchführung",
          ],
        },
        {
          heading: "Hotel-managed Programme — automatische Einbehaltung",
          paragraphs: [
            "Die meisten Hotel-managed Operator auf Phuket behalten automatisch 15% Quellensteuer bei Auszahlungen an nichtansässige Eigentümer ein und führen die Steuer an das Revenue Department ab, mit entsprechenden Bescheinigungen. Das befreit den Eigentümer von eigener Thai-Steuererklärung.",
            "Zu prüfen im Vertrag: ausdrücklich, dass Operator einbehält und abführt, regelmäßig Withholding Tax Certificates ausstellt, die Zahlungsstruktur an Sie reportet (Bruttoeinkommen, Abzüge, Nettoauszahlung).",
          ],
          bullets: [
            "Operator behält 15% ein und führt ab",
            "Stellt Withholding Tax Certificates aus",
            "Erspart eigene Thai-Steuererklärung",
            "Transparenz zur Auszahlungsstruktur einfordern",
          ],
        },
        {
          heading: "Doppelbesteuerungsabkommen (DBA)",
          paragraphs: [
            "Thailand hat >60 bilaterale DBA, darunter die meisten europäischen Länder, China, Indien, VAE. Abkommen mit Russland — aktiv. Mit der Ukraine — aktiv. Konkret: in Thailand einbehaltene Steuer kann im Heimatland angerechnet oder gegen die dortige Verbindlichkeit gestellt werden.",
            "Mechanik hängt vom konkreten DBA und den lokalen Regeln ab. In den meisten europäischen Jurisdiktionen greift für Privatpersonen der Foreign Tax Credit: die lokale Steuer auf diese Einkünfte wird um den in Thailand gezahlten Betrag reduziert.",
            "Praxis: der Eigentümer sammelt Withholding Tax Certificates vom Operator/Mieter, legt sie der Heimlanderklärung bei, erhält Foreign Tax Credit oder Steuerreduktion.",
          ],
          bullets: [
            "60+ Thai-DBA, inkl. RU, UA, EU, VAE",
            "Foreign Tax Credit — Standardmechanismus",
            "Withholding Tax Certificate für Anrechnung nötig",
            "Details richten sich nach lokalen Steuerregeln",
          ],
        },
        {
          heading: "Szenario 1: Nichtansässig über Hotel-managed Programm",
          paragraphs: [
            "Eigentümer wohnt in der EU, Condo in Bang Tao im Hotel-managed Programm. Jährliche Bruttoeinnahmen: 480 Tsd. THB. Operator behält 15% (72 Tsd. THB) ein und führt ab, mit Bescheinigung.",
            "Eigentümer erhält 408 Tsd. THB minus Management Fee und Service Charge. In der EU-Erklärung wird das Einkommen angegeben, das DBA angewendet — die in Thailand gezahlten 72 Tsd. THB als Foreign Tax Credit angerechnet.",
          ],
        },
        {
          heading: "Szenario 2: Über eine thailändische Gesellschaft",
          paragraphs: [
            "Gesellschaft hält 3 Condos, gesamtes Bruttoeinkommen 1,5 Mio. THB. Abzüge: Management 375 Tsd., Service Charge 90 Tsd., Möbelabschreibung 120 Tsd., sonstige Kosten 60 Tsd. Gewinn: 855 Tsd. Körperschaftsteuer 20%: 171 Tsd.",
            "Effektive Belastung: 171/1500 = 11,4% auf Brutto — spürbar unter 15% Quellensteuer. Aber Buchhaltung 180 Tsd./Jahr und 10% Dividendensteuer bei Entnahme relativieren den Vorteil. Wirtschaftlich sinnvoll ab ca. 1,2–1,5 Mio. THB Jahresbruttoeinnahme.",
          ],
        },
        {
          heading: "Typische Fehler",
          bullets: [
            "15% Quellensteuer als «Grauzone» behandeln und nicht abführen — bei Prüfung Nachforderung + Strafen",
            "Withholding Tax Certificates nicht anfordern — verlieren die Anrechnungsmöglichkeit im Heimatland",
            "Shell-Gesellschaft für 1 Condo aufsetzen — 2026 verschärfte Prüfungen, Umqualifikationsrisiko",
            "Einkommen im Heimatland nicht deklarieren — CRS-Meldung holt es früher oder später ein",
            "Hotel-managed Reporting ignorieren — Kontrollverlust über Auszahlungsstruktur",
          ],
        },
      ],
      faq: [
        {
          q: "Welche Steuer zahlt ein nichtansässiger Eigentümer auf Mieteinnahmen in Thailand?",
          a: "15% Quellensteuer auf Bruttomieteinnahmen. Mieter oder Hotel-managed Operator behält ein und führt ab; dem Eigentümer bleiben 85% vom Brutto minus sonstige Kosten.",
        },
        {
          q: "Ist eine thailändische Gesellschaft steuerlich effizienter?",
          a: "Effektiv ja — 10–15% auf Brutto statt fixer 15%, weil Management, Service Charge, Reparaturen und Abschreibung abziehbar sind. Aber Buchhaltungskosten und Dividendensteuer bei Entnahme relativieren die Differenz. Wirtschaftlich sinnvoll ab ca. 1,2–1,5 Mio. THB Jahresbruttoeinnahme.",
        },
        {
          q: "Funktioniert das DBA zwischen Thailand und Deutschland / Österreich?",
          a: "Ja, beide sind aktiv. Die in Thailand gezahlte 15% Quellensteuer wird im Heimatland als Foreign Tax Credit angerechnet. Konkrete Anrechnungsmechanik folgt lokalen Regeln.",
        },
        {
          q: "Was passiert, wenn ich das Einkommen im Heimatland nicht deklariere?",
          a: "Automatischer Informationsaustausch (CRS) umfasst Thailand und die meisten Länder. Undeklariertes Einkommen wird der heimischen Steuerbehörde früher oder später sichtbar — mit Nachforderung und Strafen.",
        },
        {
          q: "Behält ein Hotel-managed Programm die Steuer automatisch ein?",
          a: "In der Regel ja für Nichtansässige. Im Vertrag prüfen: ausdrückliche 15%-Einbehaltung und Ausstellung von Withholding Tax Certificates. Behält der Operator nicht ein — Sie sind selbst zahlungspflichtig.",
        },
        {
          q: "Gibt es Steuern auf eine leerstehende Wohnung, die nicht vermietet wird?",
          a: "Quellensteuer nur auf tatsächliche Einnahmen — bei Leerstand null. Aber Land and Building Tax (0,02–0,10% des Schätzwertes für Wohnimmobilien) und Service Charge des Entwicklers bleiben.",
        },
      ],
    },
    "phuket-vs-bali-vs-dubai": {
      title:
        "Phuket vs. Bali vs. Dubai: Wo Investoren 2026 Immobilien kaufen sollten",
      description:
        "Vergleich der drei führenden Resort-Immobilienmärkte für internationale Investoren: rechtliche Eigentumsformen, Einstiegsschwelle, reale Rendite und Auslastung, Steuern, Wiederverkaufsliquidität, Visawege. Vor- und Nachteile jedes Marktes und Passung zum Investor.",
      category: "Investitionsvergleich",
      readingMinutes: 11,
      intro:
        "Phuket, Bali und Dubai sind die drei Hauptziele für internationales Resort-Immobilienkapital 2026. Jeder Markt läuft auf einem anderen Rechtsmodell, liefert andere Rendite, andere Liquidität und andere Visummechanik. Dieser Leitfaden vergleicht alle drei anhand von 7 zentralen Kennzahlen — ohne Marketing-Glanz.",
      sections: [
        {
          heading: "Drei Märkte mit Investorenblick: die Kurzfassung",
          paragraphs: [
            "Phuket — ausgewogener Markt mit reifem Rechtsrahmen (Thai Condominium Act 1979) und Renditefokus. Bang Tao, Layan, Laguna sind die stärksten Lagen. Gut geeignet für Investoren, die stetiges Einkommen und akzeptable Liquidität suchen.",
            "Bali — die höchsten Schlagzeilenrenditen in Asien, aber die schwächste Rechtsposition für Ausländer (kein voller Freehold, nur Hak Pakai / Langzeitpacht). Für risikotolerante Investoren, die mit schwächerem Rechtsschutz umgehen können.",
            "Dubai — der einzige der drei Märkte, in dem Ausländer vollen Freehold in designierten Freehold Zones erhalten. Liquidester Markt mit den klarsten Regeln. Höhere Einstiegsschwelle, keine Mietsteuer, aber realistische Rendite liegt unter Asien.",
          ],
        },
        {
          heading: "Rechtliche Eigentumsformen",
          paragraphs: [
            "Phuket: Freehold auf Kondominium (49% Foreign Quota) und 30+30+30-Jahre-Leasehold auf Villen. Registrierung beim Land Office. Rechtlich klar, mit substanzieller Rechtsprechung.",
            "Bali: Freehold (Hak Milik) für Ausländer nicht verfügbar. Primäre Strukturen — Hak Pakai (~30 Jahre mit Verlängerung), Langpacht (25–99 Jahre), Nominee-Strukturen über PT PMA (ausländische Gesellschaft). Jede Struktur hat Grenzen.",
            "Dubai: Voller Freehold in designierten Freehold Zones (Dubai Marina, Palm, Downtown, JVC, Business Bay u.a.). Registrierung beim Dubai Land Department. Ausländer erhalten volles Eigentum ohne Quartierbeschränkungen.",
          ],
          bullets: [
            "Phuket: Condo-Freehold + Villa-Leasehold — funktionierendes System",
            "Bali: kein voller ausländischer Freehold",
            "Dubai: voller Freehold in Freehold Zones — stärkste Position",
          ],
        },
        {
          heading: "Einstiegsschwelle und Gesamttransaktionskosten",
          paragraphs: [
            "Phuket: 1-Zimmer-Condo in Investmentlagen — ab 4–6 Mio. THB (~$120–180k). Gesamtkosten +7–9% (Transfer, Sinking Fund, Möbel, Anwalt).",
            "Bali: 1-Zimmer-Villa in Canggu / Ulun — ab $150–220k. Gesamtkosten +8–12% (Nominee-Struktur, Anwalt, Inspektionen). Fragmentierterer Markt.",
            "Dubai: 1-Zimmer im Mittelsegment (JVC, Business Bay) — ab $220–300k. Gesamtkosten +6–8% (DLD Fee 4%, Makler, Registrierung).",
          ],
          bullets: [
            "Phuket: ab ~$120k Gesamtkosten",
            "Bali: ab ~$160k, höhere rechtliche Komplexität",
            "Dubai: ab ~$240k, einfachster Prozess",
          ],
        },
        {
          heading: "Reale Rendite und Auslastung",
          paragraphs: [
            "Phuket: Bruttorendite 7–12%, Nettorendite 5–8%, Auslastung 65–85% in Top-Lagen. Moderate Saisonalität mit tragfähiger Shoulder-Season-Nachfrage.",
            "Bali: Bruttorendite 10–15% (Schlagzeile), Nettorendite 6–10% nach realistischen Abzügen. Auslastung 55–75%. Stark lageabhängig: Canggu und Ulun funktionieren, sekundäre Gebiete nicht.",
            "Dubai: Bruttorendite 6–9%, Nettorendite 4–7%. Auslastung 70–85% in bewährten Lagen. Niedrige Saisonalität, aber Neubaudruck relevant.",
          ],
          bullets: [
            "Phuket: Nettorendite 5–8%, stabil",
            "Bali: Nettorendite 6–10%, höhere Volatilität",
            "Dubai: Nettorendite 4–7%, niedrigste Saisonalität",
          ],
        },
        {
          heading: "Steuern auf Mieteinkommen",
          paragraphs: [
            "Phuket (Thailand): 15% Quellensteuer auf Brutto für Nichtansässige oder effektiv 10–15% über eine thailändische Gesellschaft. DBA mit den meisten Ländern aktiv.",
            "Bali (Indonesien): 10% Quellensteuer auf Brutto für nichtansässige Privatperson oder 22% Körperschaftsteuer über PT PMA (mit Ausgabenabzug).",
            "Dubai (VAE): 0% Steuer auf privates Mieteinkommen. Einziger der drei Märkte ohne Mietsteuer — Nettorenditevorteil von 1,5–2 Prozentpunkten gegenüber Phuket/Bali.",
          ],
          bullets: [
            "Phuket: 15% Quellensteuer auf Brutto",
            "Bali: 10% Quellensteuer auf Brutto",
            "Dubai: 0% Steuer auf Mieteinkommen",
          ],
        },
        {
          heading: "Liquidität und Exit",
          paragraphs: [
            "Phuket: Durchschnittliche Verkaufsdauer eines guten Bang-Tao-Condos — 3–9 Monate. Off-Plan-Assignment erlaubt. Internationale Käufer aktiv.",
            "Bali: Verkauf an Ausländer schwieriger wegen der Rechtsstruktur. Durchschnittsdauer — 6–18 Monate. Weniger institutionelle Käufer.",
            "Dubai: der liquideste der drei. Durchschnittliche Verkaufsdauer in Top-Lagen — 2–6 Monate. Große internationale Makler (Betterhomes, Allsopp, LuxuryProperty).",
          ],
          bullets: [
            "Phuket: Exit 3–9 Monate, moderate Liquidität",
            "Bali: 6–18 Monate, niedrigere Liquidität",
            "Dubai: 2–6 Monate, hohe Liquidität",
          ],
        },
        {
          heading: "Visa und Investmentwege",
          paragraphs: [
            "Phuket: Elite Visa (5–20 Jahre), LTR Visa (10 Jahre für Investoren), Retirement Visa (50+). Der Immobilienkauf allein verleiht kein Visum, aber LTR verlangt Vermögen ≥$1 Mio., das Immobilien einschließen kann.",
            "Bali: KITAS (Arbeitsvisum), Investmentvisa über PT PMA. Kein direkter «Kauf-Immobilie–erhalte-Visum»-Pfad, aber Investment über eine Gesellschaft schafft Grundlage.",
            "Dubai: Investor Visa (2 Jahre) ab $205k Immobilienkauf, Golden Visa (10 Jahre) ab $545k. Der direkteste «Immobilie → Visum»-Zusammenhang der drei Märkte.",
          ],
          bullets: [
            "Phuket: Elite/LTR getrennt vom Immobilienkauf",
            "Bali: nur über PT-PMA-Struktur",
            "Dubai: direkte Immobilie-→-Visum-Verknüpfung",
          ],
        },
        {
          heading: "Zu wem passt welcher Markt",
          bullets: [
            "Stetiges Einkommen + akzeptable Rendite + Rechtsschutz: Phuket (Laguna, Bang Tao)",
            "Maximale Rendite bei Rechts-Risikotoleranz: Bali (Canggu, Ulun)",
            "Voller Freehold + Visum + Liquidität: Dubai (Freehold Zones)",
            "Portfolio-Diversifikation: Kombination Phuket (Rendite) + Dubai (Liquidität/Visum)",
            "Erste internationale Investition: Dubai (einfache Regeln) oder Phuket (moderate Einstiegsschwelle)",
            "Kurze Rotation / Spekulation: Dubai (liquidester Exit)",
          ],
        },
      ],
      faq: [
        {
          q: "Wo ist die höchste reale Rendite — Phuket, Bali oder Dubai?",
          a: "Nach Nettorendite: Bali 6–10% (mit starkem Management), Phuket 5–8%, Dubai 4–7%. Balis höhere Rendite kompensiert schwächere ausländische Rechtsposition und langsamerer Exit.",
        },
        {
          q: "Wo ist der stärkste Schutz für ausländische Eigentümer?",
          a: "Dubai — voller Freehold in designierten Zonen. Phuket — Freehold auf Kondominium mit 49% Quote, rechtlich sehr etabliert. Bali — die schwächste Position, kein voller ausländischer Freehold.",
        },
        {
          q: "Welcher Markt vergibt ein Visum beim Immobilienkauf?",
          a: "Dubai — Investor Visa ab $205k, Golden Visa ab $545k, direkte Verknüpfung. Phuket und Bali vergeben Visa nicht direkt beim Immobilienkauf, aber es gibt parallele Programme (Elite, LTR in Thailand).",
        },
        {
          q: "Wo sind Mietsteuern am niedrigsten?",
          a: "Dubai — 0% auf private Mieteinnahmen. Phuket — 15% Quellensteuer. Bali — 10% Quellensteuer. Hier gewinnt Dubai deutlich.",
        },
        {
          q: "Welcher Markt ist beim Wiederverkauf am liquidesten?",
          a: "Dubai — am liquidesten, 2–6 Monate in Top-Lagen, große internationale Makler. Phuket — 3–9 Monate in Bang Tao/Layan. Bali — 6–18 Monate wegen fragmentierten Marktes und rechtlicher Komplexität.",
        },
        {
          q: "Kann ich diese Märkte in einem Portfolio kombinieren?",
          a: "Übliche Praxis für Investoren mit $500k+ Portfolios: Phuket für Rendite und stetiges Einkommen + Dubai für Liquidität und Visumoptionen. Bali optional — für Investoren, die mit Volatilität umgehen können.",
        },
      ],
    },
  },
};
