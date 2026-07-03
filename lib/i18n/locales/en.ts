import type { LocaleData } from "../types";

// English — meaning-based translation of the Russian source, in a premium
// real-estate register (not literal).
export const en: LocaleData = {
  dictionary: {
    nav: {
      approach: "Approach",
      projects: "Projects",
      founder: "About",
      services: "Services",
      contact: "Contact",
    },
    a11y: {
      mainNav: "Main navigation",
      menu: "Menu",
      footerNav: "Footer navigation",
      skipToContent: "Skip to content",
    },
    common: {
      whatsapp: "Message on WhatsApp",
      telegram: "Message on Telegram",
      allChannels: "All channels",
      socialChannelLabel: "Telegram channel",
      whatsappPrefill: "Hello! I'm interested in property in Phuket.",
    },
    cookie: {
      text: "We use cookies for analytics and to improve the site.",
      accept: "Accept",
      decline: "Decline",
    },
    hero: {
      eyebrow: "Real estate in Phuket",
      titleTop: "Real estate won't make you rich overnight.",
      titleEmphasis: "It makes you rich over 10 years.",
      titleRest: "",
      body: "Curated investment property on Phuket island for capital growth, passive income and long-term preservation of your wealth.",
    },
    intro: {
      eyebrow: "How I work",
      manifesto:
        "You don't just get a selection of good properties — only the options that truly match your goals, objectives and strategy. My main task is not to sell you a property, but to help you reach your goal through real estate.",
    },
    stats: {
      title: "Reputation, measured in numbers",
      body: "Behind every number is hands-on experience in property analysis, risk assessment and working with investments.",
    },
    projectsSection: {
      eyebrow: "Projects",
      heading: "Properties selected around your goal",
      cardCta: "Learn more",
    },
    founder: {
      eyebrow: "A personal approach",
      titleLead: "Behind every deal — ",
      titleEmphasis: "one person",
      p1: "15 years of experience in real estate and property valuation help find the best solutions on the market for clients.",
      p2: "Every property is selected with your goals, budget and value-growth prospects in mind.",
      note: "Full support — from choosing the property to receiving the keys and ongoing management of the asset.",
    },
    services: {
      eyebrow: "Process",
      title: "Service",
      body: "You receive full support and guidance at every stage of the deal.",
      steps: [
        "Identifying your goals and needs",
        "Selecting the best properties for your objectives",
        "Arranging and conducting viewings",
        "Negotiating additional discounts and bonuses with the developer",
        "Preparing and reviewing the transaction documents",
        "Signing the contract and overseeing the settlements",
        "Construction oversight and regular monitoring of the property",
        "Professional handover inspection after construction is completed",
        "Handing the property over to management for passive income",
      ],
    },
    contact: {
      eyebrow: "Contacts",
      titleLead: "Quick ",
      titleEmphasis: "connection",
      body: "Choose the way that suits you — WhatsApp, Telegram or sending a request. One message today can be the start of one of the best investments of your life.",
      fields: {
        name: "Name",
        namePlaceholder: "How should I address you",
        email: "Email",
        emailPlaceholder: "you@private.com",
        budget: "Budget",
        budgetPlaceholder: "Approximate, in $",
        budgetHelper: "Helps me match properties more precisely.",
        message: "Goal and request",
        messagePlaceholder:
          "Location, property type, goal (living / rental / investment), timeline",
        telegram: "Telegram",
        telegramPlaceholder: "@username or link",
        whatsapp: "WhatsApp",
        whatsappPlaceholder: "Your phone number",
        optional: "optional",
      },
      errors: {
        name: "Please enter your name",
        message: "Describe your goal and request",
        contact: "Add at least one contact — Telegram or WhatsApp",
        generic: "Couldn't send your request. Please try again.",
        network:
          "Couldn't send your request. Check your connection and try again.",
      },
      consent:
        "Your request goes straight to Telegram. By submitting the form you agree to the processing of your data.",
      submit: "Send request",
      submitting: "Sending…",
      success: {
        title: "Request sent",
        body: "Thank you! I'll get back to you shortly via the contact you provided.",
        again: "Send another request",
      },
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
    },
    project: {
      backToProjects: "All projects",
      conceptEyebrow: "Concept",
      conceptTitle: "About the project",
      learnMore: "Learn more",
      galleryEyebrow: "Gallery",
      galleryTitle: "Project visualisations",
      galleryAlt: "visualisation {n}",
      unitsEyebrow: "Floor plans",
      unitsTitle: "Types and areas",
      amenitiesEyebrow: "Amenities",
      amenitiesTitle: "Facilities and service",
      locationEyebrow: "Location",
      investmentEyebrow: "Investment",
      investmentTitle: "Yield and payment",
      paymentLabel: "Payment plan",
      featuresEyebrow: "Advantages",
      featuresTitle: "Why this project",
      developerEyebrow: "Developer",
      specEyebrow: "Specifications",
      specTitle: "Key facts",
      ctaTitle: "Let's match {name} to your goal",
      ctaBody:
        "Current prices, floor plans and terms — personally, from the first call to the handover of keys.",
    },
    guides: {
      indexEyebrow: "Guides",
      indexTitle: "How to buy property in Phuket safely",
      indexSubtitle:
        "Practical material on legal structures, taxes, yield and pitfalls of foreign-buyer transactions in Phuket.",
      backToGuides: "All guides",
      tableOfContents: "Table of contents",
      faqEyebrow: "Frequent questions",
      faqTitle: "What buyers ask most",
      readingMinutes: "{n} min read",
      updatedLabel: "Updated",
      ctaTitle: "Let's discuss your goal — I'll show projects that fit",
      ctaBody:
        "Together we work out which legal structure and which project fit your specific case — income, capital or life in Phuket.",
      ctaWhatsapp: "Message on WhatsApp",
    },
    meta: {
      tagline: "Phuket real estate matched to your goals",
      region: "Phuket, Thailand",
      description:
        "Arturas Real Estate helps you choose property in Phuket around personal goals: living, lifestyle, preserving capital, rental income and long-term investment. We don't sell listings — we help you make the right decision.",
      homeTitle: "Arturas Real Estate — Phuket real estate matched to your goals",
    },
  },
  stats: [
    { value: "15+", label: "years of real-estate experience" },
    { value: "500+", label: "investment models calculated" },
    { value: "200+", label: "properties analyzed in detail" },
    { value: "50+", label: "properties passing strict investment screening" },
  ],
  services: {
    selection: {
      title: "Property selection",
      body: "Choosing a property for your goal: living, lifestyle, rental income or investment.",
    },
    deal: {
      title: "Deal support",
      body: "Full support from choosing the property to registering ownership.",
    },
    analysis: {
      title: "Investment analysis",
      body: "Assessing rental yield, growth potential and your investment strategy.",
    },
    developer: {
      title: "Developer due diligence",
      body: "Reviewing the developer's reputation, project quality and risks before you buy.",
    },
    management: {
      title: "Property management",
      body: "Solutions for managing your property after the purchase.",
    },
    rental: {
      title: "Letting",
      body: "Preparing and positioning your property for rental income.",
    },
    relocation: {
      title: "Relocation to Thailand",
      body: "Support for your move: from the first visit to settling into life in Phuket.",
    },
  },
  projects: {
    silhouette: {
      name: "Silhouette",
      developer: "The Zero Phuket",
      developerNote:
        "A British developer with 25+ years of experience and over £120M in sales. Built on a “British Standard — Thai Excellence” principle with fully integrated in-house management.",
      location: "Nai Yang Beach",
      type: "Condominium",
      keyPoints: ["350 m to the beach", "Next to Sirinat Park"],
      summary:
        "A residence by Nai Yang Beach with a projected yield of around 11% per year.",
      concept:
        "A low-rise community of “nature-refined” coastal living, steps from Sirinat National Park on Phuket's west coast. EIA-approved eco-architecture draws on coastal light and natural forms, creating a private, low-density community for those seeking seclusion, a connection with nature and investment returns.",
      highlights: [
        { label: "Floors", value: "5 floors" },
        { label: "Built area", value: "13,476 m²" },
        { label: "Developer", value: "The Zero Phuket" },
        { label: "Completion", value: "June 2028" },
      ],
      units: [
        { type: "Studio", area: "29.5–36.3 m²" },
        { type: "1 bedroom", area: "37.5–46 m²" },
        { type: "1 bedroom +", area: "44.4–52.4 m²" },
        { type: "2 bedrooms", area: "53.9–66.7 m²" },
        { type: "Penthouse Suite · 3 bedrooms", area: "83.8–108.3 m²" },
      ],
      amenities: [
        "Rooftop pool and rooftop bar",
        "Gym, spa, sauna and steam room",
        "Ice bath and recovery zone",
        "Padel and pickleball courts",
        "Golf simulator",
        "Open-air cinema",
        "Co-working and meeting rooms",
        "Kids' club",
        "Restaurant and wellness centre",
        "EV charging and solar-powered shuttle",
        "Underground parking",
        "Concierge and 24/7 security",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "350 m · 1 min" },
        { label: "Sirinat Park", value: "600 m" },
        { label: "Phuket Airport", value: "2.5 km · 5 min" },
        { label: "Nai Thon Beach", value: "10 min" },
        { label: "Blue Canyon Country Club", value: "12 min" },
        { label: "Laguna Golf Phuket", value: "26 min" },
      ],
      features: [
        "Projected yield of ~11% ROI with growth potential in an emerging location",
        "Steps from Nai Yang Beach and Sirinat Park",
        "EIA-approved, eco-sustainable architecture: solar panels, rainwater harvesting",
        "Fully integrated in-house management and the Zero Privilege programme",
        "British build standards: 25+ years of experience, £120M+ in sales",
      ],
      investment:
        "A projected yield of around 11% ROI with strong long-term growth potential. Property and rental management is handled by the developer's own team, and owners gain access to the exclusive Zero Privilege programme.",
      payment:
        "Reservation ≈ $2,900, first payment after 15 days, then a flexible instalment plan. 10% discount on full payment.",
      spec: [
        { label: "Floors", value: "5 floors" },
        { label: "Residences", value: "150" },
        { label: "Built area", value: "13,476 m²" },
        { label: "Developer", value: "The Zero Phuket" },
        { label: "Completion", value: "June 2028" },
      ],
    },
    "ayana-heights": {
      name: "AYANA Heights",
      developer: "T.H Group",
      developerNote:
        "An international company (China, Thailand, Spain, Australia) in real estate, hospitality and green energy. Winner of PropertyGuru and Dot Property Awards 2020–2023.",
      location: "Bangtao Bay · sea view",
      type: "Condos and townhouses",
      keyPoints: ["270° sea view", "Private park"],
      summary:
        "Sea-view residences with their own AYANA Park and a 270° panorama of the sea.",
      concept:
        "A premium community under the slogan “Flow your way”. The concept is built on low-density development (a 1.2 ratio) and generous space between buildings — ensuring privacy and 270° panoramic sea views. Five-star service and hotel-managed apartments for those seeking a closeness to nature.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "T.H Group" },
        { label: "Completion", value: "End of 2027" },
      ],
      units: [
        { type: "Studio (A)", area: "37.6 m²" },
        { type: "1 bedroom (B1)", area: "43.42 m²" },
        { type: "1 bedroom family (B2)", area: "57.57 m²" },
        { type: "2 bedrooms family (B3)", area: "57.57 m²" },
        { type: "2 bedrooms · sea view (C)", area: "75.21 m²" },
        { type: "3 bedrooms · 270° panorama (D)", area: "112.89 m²" },
        { type: "Penthouse (E) · freehold", area: "360.79 m²" },
      ],
      amenities: [
        "1,800 m² pool",
        "8,000 m² communal garden",
        "AYANA Park",
        "Fitness room and sauna",
        "Co-working",
        "Kids' club",
        "Pet-friendly areas",
        "1,000 m² lobby and shared lounge",
        "Two lifts per building",
        "260+ parking spaces",
        "24/7 security and CCTV",
        "Electronic locks",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "3 min" },
        { label: "Bangtao Beach", value: "5 min" },
        { label: "Naithon Beach", value: "10 min" },
        { label: "Laguna Golf", value: "5 min" },
        { label: "Boat Avenue · Porto de Phuket", value: "10 min" },
        { label: "Phuket Airport", value: "25 min" },
      ],
      features: [
        "Low-density development (1.2) — privacy and space",
        "270° panoramic sea view",
        "Five-star service and hotel-managed apartments",
        "Owner privileges: discounts at the hotel, restaurants and spa, priority booking",
        "Located near Banyan Tree and Amanpuri",
      ],
      investment:
        "Annual rental yield of 9–12%, with 20–50% appreciation on resale after 3–5 years. Management and rental are handled by a professional team; apartments are hotel-managed. Maintenance fee ≈ $1.7/m² per month.",
      spec: [
        { label: "Site", value: "31 rai · 49,600 m²" },
        { label: "Buildings", value: "8" },
        { label: "Residences", value: "543" },
        { label: "Penthouses", value: "Freehold" },
        { label: "Developer", value: "T.H Group" },
      ],
    },
    "sun-hills-layan": {
      name: "Sun Hills Layan",
      developer: "Sun Hills Development",
      developerNote:
        "A developer with contracting experience since 2009 and over 1.2 million m² built. Property and rental management by Unicorn Hospitality (12+ hotels and 750+ apartments across 7+ countries).",
      location: "Layan",
      type: "Condominium",
      keyPoints: ["Ambassador — Khabib", "Vertical garden"],
      summary:
        "“Vertical garden” architecture in Layan. The brand's official ambassador is Khabib Nurmagomedov.",
      concept:
        "A premium community with “vertical garden” architecture: cascading terraces buried in tropical greenery and multi-level pools at its heart. The brand's official ambassador is Khabib Nurmagomedov, a partnership built on the values of discipline and long-term thinking. Management and support by Unicorn Hospitality, one of the leading hotel operators in Southeast Asia.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "Sun Hills Development" },
        { label: "Completion", value: "End of 2027" },
      ],
      units: [
        { type: "Studio", area: "26.5–31.4 m²" },
        { type: "Studio + / 1 bedroom", area: "35.6–45 m²" },
        { type: "1–2 bedrooms", area: "47.7–53.4 m²" },
        { type: "2 bedrooms", area: "60.8–72.9 m²" },
        { type: "2 bedrooms + (B+B)", area: "85 m²" },
      ],
      amenities: [
        "Multi-level open-air pools",
        "Waterside spa and jacuzzi areas",
        "Gym with panoramic views",
        "Yoga studio",
        "Restaurants and fine-dining areas",
        "Lounge areas and lobby",
        "Co-working and meeting rooms",
        "Kids' club",
        "Landscaped gardens and green terraces",
      ],
      locationPoints: [
        { label: "Area", value: "Layan, Phuket's west coast" },
        { label: "Layan and Bangtao beaches", value: "nearby" },
      ],
      features: [
        "Brand's official ambassador — Khabib Nurmagomedov",
        "“Vertical garden” architecture with cascading green terraces",
        "Managed by Unicorn Hospitality — a top Southeast Asian operator",
        "Turnkey finishing included in the price",
        "Interest-free instalments until completion",
        "Net yield of ~9–10%+ on key unit types",
      ],
      investment:
        "Net yield from ~7%, and around 9–10%+ for studios and 1-bedrooms by year 8–10; 10-year ROI of up to 270%+. Management and rental by Unicorn Hospitality. Turnkey finishing is already included in the unit price.",
      payment:
        "Interest-free instalments: a 35% down payment, then 15% / 20% / 20% / 10% — in stages until 01.12.2027.",
      spec: [
        { label: "Residences", value: "585" },
        { label: "Management", value: "Unicorn Hospitality" },
        { label: "Developer", value: "Sun Hills Development" },
        { label: "Completion", value: "End of 2027" },
      ],
    },
    "sun-hills-lakeside": {
      name: "Sun Hills Lakeside",
      developer: "Sun Hills Development",
      developerNote:
        "A developer with 16+ years of experience. The land was bought outright back in 2019 with no loans. Managed by Unicorn Hospitality. EIA and Construction Permit obtained; Block A built to roof level.",
      location: "Bang Tao · Laguna",
      type: "Condominium",
      keyPoints: ["Khabib Gym 1,500 m²", "7 min to the beach"],
      summary:
        "A residence by the Laguna lakes with the Khabib Gym training centre. Official partner — Khabib Nurmagomedov.",
      concept:
        "A premium residence by the Laguna lakes in Bang Tao, designed as a hybrid of home and hotel business. The project's official partner is Khabib Nurmagomedov: a world-class 1,500 m² Khabib Gym training centre is being built on-site, with sport, wellness and recovery programmes. A three-in-one asset: a comfortable place to live, stable rental income and a profitable resale.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "Sun Hills Development" },
        { label: "Completion", value: "September 2027" },
      ],
      units: [
        { type: "Studios", area: "30 / 35.6 / 40 / 47 / 48 m²" },
        { type: "1 bedroom", area: "41.5 / 53.6 / 60 / 77 m²" },
        { type: "2 bedrooms", area: "71.2 / 89.2 m²" },
        { type: "3 bedrooms", area: "124.8 m²" },
      ],
      amenities: [
        "Khabib Gym — a 1,500 m² sports centre",
        "Wellness and spa centre",
        "Rooftop pool + two courtyard pools (24 m and 15 m)",
        "Children's pool",
        "Rooftop areas with a 360° panorama",
        "155 m² restaurant and lounge bar",
        "Co-working and business areas",
        "Kids' club, playgrounds and summer cinema",
        "Underground parking",
        "24/7 security and a shuttle to Layan Beach",
        "Mobile app and 24/7 service",
        "Pet-friendly",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "7 min" },
        { label: "Highway", value: "5 min" },
        { label: "Porto de Phuket", value: "10 min" },
        { label: "Phuket Airport", value: "20 min" },
        { label: "Area", value: "Bang Tao · Laguna" },
      ],
      features: [
        "Official partnership with Khabib Nurmagomedov and the Khabib Gym centre",
        "Premium Bang Tao / Laguna location with lake views",
        "Entry price 20–40% below comparable projects, capital growth from 40%",
        "A home-and-hotel hybrid managed by Unicorn Hospitality",
        "Rich amenities: sport, spa, pools, restaurant, co-working",
        "Year-round occupancy of 75–85%",
      ],
      investment:
        "A yield of up to 10% per year, capital growth of 40%+ during construction, and average annual occupancy of 75–85%. Managed by Unicorn Hospitality. The land was bought outright in 2019, with EIA and Construction Permit obtained.",
      payment:
        "A 5-payment plan: a 30% down payment, then 20% (July 2026), 20% (December 2026), 20% (April 2027), 10% (September 2027). Developer instalments available until March 2028.",
      spec: [
        { label: "Khabib Gym", value: "1,500 m²" },
        { label: "Management", value: "Unicorn Hospitality" },
        { label: "Developer", value: "Sun Hills Development" },
        { label: "Completion", value: "September 2027" },
      ],
    },
    balcony: {
      name: "The Balcony",
      developer: "The Title",
      developerNote:
        "The Title is the residential brand of Rhom Bho Property, a Phuket developer with an award-winning hospitality track record. Its projects blend resort-grade architecture, rich shared facilities and professional management.",
      location: "Nai Yang Beach · beachfront",
      type: "Condominium",
      keyPoints: ["Beachfront", "542 residences"],
      summary:
        "A beachfront condominium on Nai Yang Beach with 53 facilities across three landscaped pool zones.",
      concept:
        "A modern crafted beachfront condominium set directly on Nai Yang Beach, beside Sirinat National Park and the pine forest. Nine low-rise residential buildings wrap around three landscaped zones — Laguna, Costa and Foresta — with more than 13,000 m² of shared space, lagoon pools, beachfront lawns and a private walking track that opens straight onto the sand.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "The Title" },
        { label: "Completion", value: "Q2 2028" },
      ],
      units: [
        { type: "1 bedroom M", area: "33–35 m²" },
        { type: "1 bedroom L", area: "37–39 m²" },
        { type: "1 bedroom Plus", area: "45–47 m²" },
        { type: "2 bedrooms S", area: "50–55 m²" },
        { type: "2 bedrooms M", area: "63–70 m²" },
        { type: "Penthouse", area: "135–139 m²" },
      ],
      amenities: [
        "Lap pool 6×25 m and lagoon pools",
        "Beachfront lawns and sea-view pavilions",
        "Whirlpool, jacuzzi and therapy pools",
        "Kids' sea, toddler pool and treehouse park",
        "Coastal yoga lawn and private walking track",
        "Sauna, steam and onsen rooms",
        "Fitness and boxing zone",
        "Lobby lounge and co-working",
        "Playroom and board-game zone",
        "Semi-outdoor lounges with treehouse views",
        "Covered parking (153 lots)",
        "24/7 security",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "Beachfront" },
        { label: "Pine Tree Park", value: "In front" },
        { label: "Tops & 7-Eleven", value: "250 m" },
        { label: "Mingle Mall Naiyang", value: "350 m" },
        { label: "Phuket Airport", value: "5 min" },
        { label: "Sirinat National Park", value: "Nearby" },
      ],
      features: [
        "Direct beachfront position on Nai Yang Beach",
        "53 facilities — 23 outdoor and 30 indoor",
        "Three landscaped pool zones: Laguna, Costa, Foresta",
        "More than 13,000 m² of shared space",
        "Next to Salute Beach Club and an international-chain hotel",
        "By The Title — an award-winning Phuket hospitality developer",
      ],
      investment:
        "A beachfront resort-style asset by The Title with extensive facilities and professional management — built for both lifestyle and rental demand in the established Nai Yang / airport district.",
      spec: [
        { label: "Residences", value: "542" },
        { label: "Buildings", value: "9 + parking" },
        { label: "Land area", value: "22,027 m²" },
        { label: "Developer", value: "The Title" },
        { label: "Completion", value: "Q2 2028" },
      ],
    },
    serenity: {
      name: "The Title Serenity Naiyang",
      developer: "The Title",
      developerNote:
        "The Title is the residential brand of Rhom Bho Property, a Phuket developer with an award-winning hospitality track record. Its projects blend resort-grade architecture, rich shared facilities and professional management.",
      location: "Nai Yang · Soi Naiyang 2",
      type: "Condominium",
      keyPoints: ["400 m to the beach", "814 residences"],
      summary:
        "A modern oceanic-style condominium 400 m from Nai Yang Beach and 5 minutes from Phuket airport.",
      concept:
        "A serene beachside community in Soi Naiyang 2, just 400 m from Nai Yang Beach and beside Sirinat National Park. Six seven-storey buildings in a modern oceanic architectural style sit around more than 1,050 m² of amenities and 3,750 m² of greenery, designed for multi-generational living and built on four pillars: sustainability, wellbeing, service and technology.",
      highlights: [
        { label: "Floors", value: "7 floors" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "The Title" },
        { label: "Completion", value: "Completed" },
      ],
      units: [
        { type: "1 bedroom S", area: "26–28 m²" },
        { type: "1 bedroom M", area: "30–32 m²" },
        { type: "1 bedroom LX", area: "36–39 m²" },
        { type: "2 bedrooms S", area: "56–58 m²" },
        { type: "2 bedrooms M", area: "60–62 m²" },
        { type: "2 bedrooms L", area: "61–65 m²" },
        { type: "3 bedrooms", area: "112–117 m²" },
        { type: "3 bedrooms L", area: "119–123 m²" },
      ],
      amenities: [
        "Main pool, kids' pool and lazy pool",
        "Sport pool, jacuzzi and pool bar",
        "Hydrotherapy corner and BBQ area",
        "Yoga / training lawn and climbing wall",
        "Rooftop infinity pool and rooftop yoga",
        "Sauna, steam and onsen",
        "Clubhouse with fitness and rooftop jacuzzi",
        "Theatre and karaoke pavilion",
        "Business lounge and co-working",
        "Shared kitchen and cafe",
        "Kids' playground and games room",
        "Separate parking building with double parking",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "400 m" },
        { label: "Sirinat National Park", value: "600 m" },
        { label: "Phuket Airport", value: "5 min" },
        { label: "Mingle Mall", value: "Nearby" },
        { label: "Blue Canyon Golf", value: "Nearby" },
        { label: "Bumrungrad Hospital (planned)", value: "≈ 1 km" },
      ],
      features: [
        "Just 400 m from Nai Yang Beach, 5 min from the airport",
        "Modern oceanic architecture across six 7-storey buildings",
        "Four design pillars: sustainability, wellbeing, service, technology",
        "1,050 m² of amenities and 3,750 m² of greenery",
        "Rooftop infinity pool, onsen and clubhouse",
        "By The Title — an award-winning Phuket hospitality developer",
      ],
      investment:
        "A beachside community by The Title in the established Nai Yang / airport area, with strong year-round rental demand from its location 400 m from the beach and 5 minutes from Phuket International Airport.",
      spec: [
        { label: "Residences", value: "814" },
        { label: "Buildings", value: "6 × 7 floors" },
        { label: "Land area", value: "22,053 m²" },
        { label: "Developer", value: "The Title" },
        { label: "Completion", value: "Completed" },
      ],
    },
    olive: {
      name: "The Olive",
      developer: "The Title",
      developerNote:
        "The Title is the residential brand of Rhom Bho Property, a Phuket developer with an award-winning hospitality track record. Its projects blend resort-grade architecture, rich shared facilities and professional management.",
      location: "Nai Yang · hillside",
      type: "Condominium",
      keyPoints: ["Mediterranean design", "291 residences"],
      summary:
        "A Mediterranean, nature-inspired and pet-friendly condominium in the Nai Yang hills near Phuket airport.",
      concept:
        "A modern classic Mediterranean, nature-inspired community on the green slopes above Nai Yang — “where happiness grows and life prospers”. Two pet-friendly residential buildings and a dedicated facility building sit among olive-grove landscaping, with rooftop pools, garden lounges and ground-floor shops, minutes from the beach and Phuket airport.",
      highlights: [
        { label: "Floors", value: "8 floors" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "The Title" },
        { label: "Completion", value: "Q2 2029" },
      ],
      units: [
        { type: "1 bedroom", area: "On request" },
        { type: "1 bedroom Plus", area: "On request" },
        { type: "2 bedrooms S", area: "On request" },
        { type: "2 bedrooms M", area: "On request" },
        { type: "Commercial shop", area: "On request" },
      ],
      amenities: [
        "Lap pool and rooftop pools",
        "Kids' pool",
        "Pet park (pet-friendly)",
        "Yoga lawn and landscaped gardens",
        "Sauna and steam room",
        "Fitness",
        "Co-working",
        "Kids' club",
        "Lobby lounge",
        "Ground-floor shops and cafe",
        "EV charging",
        "Parking (115 lots)",
      ],
      locationPoints: [
        { label: "Nai Yang Beach", value: "Nearby" },
        { label: "Phuket Airport", value: "Nearby" },
        { label: "Mingle Naiyang", value: "Nearby" },
        { label: "Hotel Indigo", value: "Nearby" },
        { label: "The Slate", value: "Nearby" },
        { label: "Sirinat National Park", value: "Nearby" },
      ],
      features: [
        "Modern classic Mediterranean, nature-inspired design",
        "Pet-friendly residential buildings",
        "29 facilities — 14 outdoor and 15 indoor",
        "Rooftop pools and olive-grove landscaping",
        "Ground-floor shops for daily convenience",
        "By The Title — an award-winning Phuket hospitality developer",
      ],
      investment:
        "A boutique, pet-friendly Mediterranean-style community by The Title in the growing Nai Yang area near Phuket airport, with on-site shops and resort facilities supporting both lifestyle and rental use.",
      spec: [
        { label: "Residences", value: "291" },
        { label: "Buildings", value: "2 + facility" },
        { label: "Land area", value: "6,490 m²" },
        { label: "Developer", value: "The Title" },
        { label: "Floors", value: "8" },
      ],
    },
    "gardens-of-eden": {
      name: "Gardens of Eden",
      location: "Bang Tao Beach · Cherng Talay",
      type: "Branded residences",
      keyPoints: ["50 m to Bang Tao Beach", "Etro-designed residences"],
      summary:
        "A beachfront garden resort on Bang Tao Beach where parks, gardens and lakes cover 70% of the grounds, built across three phases.",
      concept:
        "Gardens of Eden is the first Phuket project built around its own private park: only 30% of the estate is built, while landscaped parks, gardens and lakes fill the remaining 70%. The gated, secured resort sits just 50 m from Bang Tao Beach and unfolds over three phases — Eden, Park and Lake Residences — plus the Etro Residences, the first homes in Thailand created with the legendary Italian fashion house Etro. A 1,000 m² wellness centre, white-sand “Blue Lagoon” pool, open-air cinema, eight restaurants and a 3.5 km walking trail turn the estate into a self-contained world, with all roads routed underground around the perimeter.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "—" },
        { label: "Completion", value: "Q1 2029" },
      ],
      units: [
        { type: "1 bedroom", area: "49–75 m²" },
        { type: "2 bedrooms", area: "79–158 m²" },
        { type: "3 bedrooms", area: "122–226 m²" },
        { type: "4 bedrooms", area: "218–223 m²" },
        { type: "Penthouses", area: "132–259 m²" },
        { type: "Etro Residences", area: "220–420 m²" },
      ],
      amenities: [
        "Top-tier Asian wellness centre with 1,000 m² gym",
        "White-sand “Blue Lagoon” swimming pool",
        "Open-air cinema",
        "Six swimming pools and panoramic rooftop pools",
        "Eight restaurants and a Sky Bar",
        "Two clubhouses and two kids' clubs",
        "5-star, 100-room hotel",
        "6,000 m² business centre with co-working",
        "8,000 m² Adventure Gardens",
        "Spa garden, wellness waterfall and Banyan garden",
        "Pet park, maze and yoga lawn",
        "Underground parking with lift access, 24/7 security",
      ],
      locationPoints: [
        { label: "Bang Tao Beach", value: "50 m · 1 min" },
        { label: "Laguna Phuket", value: "1 min" },
        { label: "Boat Avenue & Porto de Phuket", value: "5 min" },
        { label: "Blue Tree", value: "10 min" },
        { label: "Phuket Airport", value: "20 min" },
        { label: "British International School", value: "30 min" },
      ],
      features: [
        "First Phuket resort built around its own private park (70% green)",
        "50 m from Bang Tao Beach on the island's west coast",
        "Etro Residences — first Etro-designed homes in Thailand",
        "1,000 m² wellness centre, eight restaurants, open-air cinema",
        "Three phases: Eden, Park and Lake Residences",
        "Fully finished interiors with built-in kitchens and wardrobes",
      ],
      investment:
        "A large-scale branded garden resort with a 5-star hotel, extensive facilities and a beachfront position on Bang Tao — built for both lifestyle and rental demand. Residences are offered on a 120-year leasehold (4 × 30 years) with a freehold option.",
      spec: [
        { label: "Residences", value: "1,288" },
        { label: "Phases", value: "3" },
        { label: "Built area", value: "30% of estate" },
        { label: "Ownership", value: "Leasehold / Freehold" },
        { label: "Completion", value: "Q1 2029" },
      ],
    },
    "layan-green-park": {
      name: "Layan Green Park",
      location: "Layan · Bang Tao",
      type: "Branded residences",
      developer: "Villacarte Group",
      developerNote:
        "Developed by Villacarte Group with a managed rental programme run by La Green Hotel & Residence.",
      keyPoints: ["2 min to Layan Beach", "EDGE green-certified"],
      summary:
        "An eco-conscious resort community a few minutes from Layan and Bang Tao beaches, delivered turnkey with designer furniture and more than 30 layouts.",
      concept:
        "Layan Green Park is a green, low-rise resort community set among tropical gardens between Layan and Bang Tao on Phuket's west coast. The project is built to EDGE green-building standards with energy- and water-saving engineering, and is delivered fully turnkey — designer furniture, built-in kitchens and appliances included. Residences feature 2.7 m ceilings, SPC flooring and central hot-water supply. Phase 1 was delivered in 2024 and Phase 2 completes in 2026, with a professional managed-rental programme run on site by La Green Hotel & Residence.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "Villacarte Group" },
        { label: "Completion", value: "End of 2026" },
      ],
      units: [
        { type: "Studios", area: "30–37 m²" },
        { type: "1 bedroom", area: "45–75 m²" },
        { type: "2 bedrooms", area: "65–91 m²" },
        { type: "3 bedrooms", area: "121–148 m²" },
        { type: "Duplexes", area: "up to 269 m²" },
      ],
      amenities: [
        "Resort swimming pools with sun terraces",
        "Fitness centre and yoga areas",
        "Lobby and lounge with concierge",
        "Co-working and meeting spaces",
        "On-site restaurants and cafés",
        "Kids' club and play areas",
        "Landscaped tropical gardens",
        "Managed rental programme by La Green",
        "24/7 security and parking",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "2 min" },
        { label: "Bang Tao Beach", value: "10 min" },
        { label: "Boat Avenue & Porto de Phuket", value: "10 min" },
        { label: "Laguna Phuket", value: "10 min" },
        { label: "Phuket Airport", value: "20 min" },
        { label: "British International School", value: "25 min" },
      ],
      features: [
        "EDGE green-building certification with energy- and water-saving design",
        "Turnkey delivery with designer furniture and appliances",
        "2.7 m ceilings, SPC flooring and central hot water",
        "More than 30 layouts from studios to duplexes",
        "Phase 1 delivered 2024, Phase 2 completion 2026",
        "Managed rental programme run by La Green Hotel & Residence",
      ],
      investment:
        "A turnkey, green-certified resort community minutes from Layan Beach with a professional managed-rental programme — a low-maintenance option built for both personal stays and rental demand.",
      spec: [
        { label: "Phases", value: "2" },
        { label: "Ceilings", value: "2.7 m" },
        { label: "Layouts", value: "30+" },
        { label: "Certification", value: "EDGE green" },
        { label: "Completion", value: "End of 2026" },
      ],
    },
    "layan-verde": {
      name: "Layan Verde",
      location: "Bang Tao · Layan",
      type: "Hotel-managed condominium",
      developerNote:
        "A hotel-managed condominium operated to 5-star standards by Dusit International, with BOI certification.",
      keyPoints: ["2 min drive to Layan Beach", "Dusit-managed, BOI-certified"],
      summary:
        "A bionic-architecture resort condominium on a 7.5-hectare green hillside near Layan Beach, managed to 5-star standards by Dusit International across Luxury and Premium collections.",
      concept:
        "Layan Verde is a large-scale resort condominium set across a 7.5-hectare green hillside in the Bang Tao area, a two-minute drive from Layan Beach. Its bionic architecture blends organic, nature-inspired forms with cascading planted terraces, 300+ plant species and more than 30,000 m² of landscaping designed by SHMA. The estate is operated as a hotel-managed condominium to 5-star standards by Dusit International and holds BOI certification. Two collections — Luxury (5 buildings, 93 residences) and Premium (10 buildings, 681 residences) — share 65 infrastructure facilities including two hotels, an Ocean Club, a wellness centre and nine swimming pools.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "—" },
        { label: "Completion", value: "End of 2028" },
      ],
      units: [
        { type: "Premium · Studio", area: "from 37.3 m²" },
        { type: "Premium · 1 bedroom", area: "from 56.0 m²" },
        { type: "Premium · 2 bedrooms", area: "from 100.5 m²" },
        { type: "Premium · 3 bedrooms", area: "from 155.2 m²" },
        { type: "Luxury · 1–3 bedrooms", area: "from 100.7 m²" },
        { type: "Luxury · 4 bed & penthouses", area: "from 394.4 m²" },
      ],
      amenities: [
        "Two on-site hotels under Dusit management",
        "Nine swimming pools and a 50 m lap pool",
        "1,500 m² wellness centre with spa and onsen",
        "Ocean Club for up to 300 guests",
        "16+ restaurants, cafés and bars",
        "Co-working, meeting rooms and golf simulator",
        "Two padel courts, squash court and sports lawn",
        "Kids' clubs, playgrounds and climbing wall",
        "5,000 m² of retail and a supermarket",
        "2 km of walking trails through landscaped gardens",
        "Pet area, BBQ zones and rooftop pools",
        "1,000+ parking spaces, 24/7 security",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "2 min" },
        { label: "Bang Tao Beach", value: "10 min" },
        { label: "Boat Avenue & Porto de Phuket", value: "10 min" },
        { label: "Laguna Phuket", value: "10 min" },
        { label: "Phuket Airport", value: "25 min" },
        { label: "British International School", value: "25 min" },
      ],
      features: [
        "Bionic architecture with cascading planted terraces",
        "5-star hotel management by Dusit International",
        "BOI-certified project with foreign-ownership advantages",
        "7.5-hectare green estate with 300+ plant species",
        "65 infrastructure facilities across Luxury and Premium",
        "Landscape design by SHMA, completion 2028",
      ],
      investment:
        "A Dusit-managed, BOI-certified resort condominium near Layan Beach with two hotels and 65 facilities on a green hillside — a hotel-grade asset built for strong year-round rental demand. Leasehold and freehold options are available.",
      spec: [
        { label: "Estate", value: "7.5 ha" },
        { label: "Residences", value: "774" },
        { label: "Collections", value: "Luxury / Premium" },
        { label: "Management", value: "Dusit International" },
        { label: "Completion", value: "End of 2028" },
      ],
    },
    "the-ozone": {
      name: "The Ozone Condominium",
      location: "Laguna · Bang Tao",
      type: "Condominium",
      developer: "The Ozone Group Phuket",
      keyPoints: ["1 km to Laguna & Boat Avenue", "Golf, mountain & garden views"],
      summary:
        "A modern luxury 8-storey condominium of 164 residences beside Laguna Phuket, with full-height glazing framing the Laguna golf course, mountains and gardens.",
      concept:
        "The Ozone Condominium is a modern luxury low-rise of 164 residences across eight storeys, set a kilometre from Laguna Phuket and Boat Avenue in the heart of Bang Tao. Designed for expansive living with uninterrupted views, every home has full-height glass windows that open onto the Laguna golf course, the mountains or lush tropical gardens, blurring the line between indoor and outdoor living. Three unit types — one-bedroom, two-bedroom and duplex two-bedroom layouts — are paired with a large L-shaped swimming pool, a well-equipped fitness centre and landscaped grounds.",
      highlights: [
        { label: "Floors", value: "8 floors" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "The Ozone Group" },
        { label: "Completion", value: "Completed" },
      ],
      units: [
        { type: "1 bedroom · Type A", area: "42 m²" },
        { type: "1 bedroom · Type B", area: "51 m²" },
        { type: "2 bedrooms", area: "88 m²" },
        { type: "Duplex 2 bedrooms", area: "85–88 m²" },
      ],
      amenities: [
        "L-shaped swimming pool (5×24 m + 4×13 m)",
        "Well-equipped fitness centre",
        "Lobby lounge with garden views",
        "Full-height glazing in every residence",
        "Laguna golf, mountain and garden views",
        "Landscaped tropical grounds",
        "Covered parking and 24/7 security",
      ],
      locationPoints: [
        { label: "Laguna Golf Course", value: "1 km" },
        { label: "Boat Avenue & Porto de Phuket", value: "1–2 km" },
        { label: "Bang Tao Beach", value: "2 km" },
        { label: "Layan Beach", value: "2 km" },
        { label: "Blue Tree Waterpark", value: "3.5 km" },
        { label: "Phuket Airport", value: "16 km" },
      ],
      features: [
        "Modern luxury 8-storey condominium of 164 residences",
        "One kilometre from Laguna Phuket and Boat Avenue",
        "Full-height glazing with golf, mountain and garden views",
        "Three layouts including duplex two-bedroom homes",
        "L-shaped pool and well-equipped fitness centre",
        "Seamless indoor–outdoor living with natural light",
      ],
      investment:
        "A modern luxury condominium beside Laguna Phuket and Boat Avenue, in one of the island's most established and rental-friendly districts — a compact, well-connected asset for lifestyle and rental demand alike.",
      spec: [
        { label: "Storeys", value: "8" },
        { label: "Residences", value: "164" },
        { label: "Unit types", value: "3" },
        { label: "Developer", value: "The Ozone Group" },
        { label: "Views", value: "Golf / Mountain / Garden" },
      ],
    },
    "bellevue-beachfront": {
      name: "Bellevue Beachfront",
      location: "Layan Beach",
      type: "Beachfront condominium",
      developer: "Bellevue",
      developerNote:
        "The second project in the Bellevue brand, set just 50 metres from Layan Beach.",
      keyPoints: ["50 m to Layan Beach", "Bellevue brand, beachfront"],
      summary:
        "A modern beachfront condominium just 50 metres from Layan Beach, with curved-balcony architecture wrapped around landscaped pool courtyards.",
      concept:
        "Bellevue Beachfront is the second project of the Bellevue brand, set in a rare beachfront location just 50 metres from Layan Beach on Phuket's quiet north-west coast. Low-rise buildings with softly curved balconies frame landscaped courtyards and a resort swimming pool. Each residence is modern in design, with a kitchenette or pantry, a breakfast bar or dining area, comfortable bedrooms and, in many layouts, a private balcony. A grand lobby and reception complete a calm, beach-side lifestyle minutes from Bang Tao, Laguna and Boat Avenue.",
      highlights: [
        { label: "Floors", value: "—" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "Bellevue" },
        { label: "Completion", value: "October 2026" },
      ],
      units: [
        { type: "Studio", area: "32 m²" },
        { type: "1 bedroom", area: "40 m²" },
        { type: "2 bedrooms", area: "64 m²" },
        { type: "2 bedrooms (large)", area: "80 m²" },
      ],
      amenities: [
        "Resort swimming pool with sun terraces",
        "Grand lobby and reception",
        "Landscaped courtyard gardens",
        "Kitchenette or pantry in every residence",
        "Breakfast bar or dining area",
        "Private balconies in many layouts",
        "Beachfront setting 50 m from Layan Beach",
        "Parking and 24/7 security",
      ],
      locationPoints: [
        { label: "Layan Beach", value: "50 m · 1 min" },
        { label: "Bang Tao Beach", value: "4 min" },
        { label: "Boat Avenue & Villa Market", value: "10 min" },
        { label: "Central Porto de Phuket", value: "12 min" },
        { label: "Catch Beach Club", value: "15 min" },
        { label: "Phuket Airport", value: "25 min" },
      ],
      features: [
        "Rare beachfront location 50 m from Layan Beach",
        "Second project in the established Bellevue brand",
        "Curved-balcony architecture around pool courtyards",
        "Four layouts from studios to 80 m² two-bedrooms",
        "Modern interiors with kitchenette and dining area",
        "Grand lobby, reception and resort pool",
      ],
      investment:
        "A beachfront condominium just 50 metres from Layan Beach from the established Bellevue brand — a rare front-line position on Phuket's north-west coast built for lifestyle and strong holiday-rental demand.",
      spec: [
        { label: "To the beach", value: "50 m" },
        { label: "Buildings", value: "6" },
        { label: "Unit types", value: "4" },
        { label: "Developer", value: "Bellevue" },
        { label: "Position", value: "Beachfront" },
      ],
    },
    "siamese-bangtao": {
      name: "Siamese Bangtao",
      location: "Bang Tao",
      type: "Lakefront condominium",
      developer: "Siamese Stone Developments",
      developerNote:
        "A consortium led by Siamese Asset PLC with Cornerstone and Dynasty Development, uniting some of Thailand's most established developers.",
      keyPoints: ["5 lakefront infinity pools", "Heart of Bang Tao"],
      summary:
        "A lakefront condominium in the heart of Bang Tao, built around five lakefront infinity pools and a resort-grade wellness, work and lifestyle programme.",
      concept:
        "Siamese Bangtao sits in Phuket's most coveted address, minutes from Bang Tao's beaches and vibrant nightlife. Three low-rise buildings of seven storeys frame five lakefront infinity pools, with residences ranging from compact studios to spacious duplexes. Delivered by a consortium of Thailand's leading developers, the project pairs bold, modern architecture with an exceptional amenity programme — wellness, sport, co-working and dining — designed for those who want to live, relax and earn in one of the island's strongest rental locations.",
      highlights: [
        { label: "Floors", value: "7 floors" },
        { label: "Built area", value: "—" },
        { label: "Developer", value: "Siamese Stone" },
        { label: "Completion", value: "August 2027" },
      ],
      units: [
        { type: "Studio", area: "30 m²" },
        { type: "1 bedroom", area: "45.25 m²" },
        { type: "2 bedrooms", area: "79.5 m²" },
        { type: "Duplex", area: "92 m²" },
      ],
      amenities: [
        "Five lakefront infinity pools, plus lap, shallow and kids' pools",
        "Thermal room with sauna, steam, onsen and ice bath",
        "Fully equipped gym and jogging track",
        "Golf simulator and padel tennis court",
        "Co-working space, podcast studio and meeting room",
        "Restaurant and café on site",
        "Outdoor cinema and rooftop BBQ",
        "Pet-friendly park",
        "Reception and lobby with 24/7 security",
      ],
      locationPoints: [
        { label: "Bang Tao Beach", value: "Minutes" },
        { label: "Boat Avenue & Porto de Phuket", value: "Nearby" },
        { label: "Laguna Phuket", value: "Nearby" },
        { label: "Layan Beach", value: "Nearby" },
        { label: "Blue Tree Phuket", value: "Nearby" },
        { label: "Phuket Airport", value: "~25 min" },
      ],
      features: [
        "Five lakefront infinity pools as the project's centrepiece",
        "Built by a consortium of Thailand's leading developers",
        "Studios to duplexes across three low-rise buildings",
        "Resort-grade wellness with thermal room and onsen",
        "Golf simulator, padel court and full gym",
        "Co-working space, podcast studio and outdoor cinema",
      ],
      investment:
        "A lakefront condominium in the heart of Bang Tao from a consortium of Thailand's leading developers — five infinity pools and a resort-grade amenity programme in one of Phuket's strongest rental locations.",
      spec: [
        { label: "Buildings", value: "3" },
        { label: "Storeys", value: "7" },
        { label: "Unit types", value: "4" },
        { label: "Completion", value: "August 2027" },
        { label: "Developer", value: "Siamese Stone" },
      ],
    },
  },
  guides: {
    "buying-in-phuket-as-foreigner": {
      title:
        "How to buy property in Phuket as a foreigner in 2026: legal structures, taxes, checklist",
      description:
        "A practical, end-to-end guide for foreign buyers of Phuket real estate. Freehold and leasehold, taxes, payment schedules, due diligence, real rental yield and a step-by-step checklist.",
      category: "Legal guide",
      readingMinutes: 12,
      intro:
        "Phuket is one of the most attractive residential markets in the world for foreign investors: 7–12% net rental yield on strong off-plan projects, robust tourism demand, and a transparent legal framework. But foreign purchases in Thailand run on their own rules — a non-Thai cannot own land outright, yet can freely own a condominium unit. This guide covers everything you need to know to buy safely and model returns before signing.",
      sections: [
        {
          heading: "What a foreigner can and cannot buy in Thailand",
          paragraphs: [
            "Thai law prohibits foreigners from owning land, but clearly permits foreign freehold ownership of condominium units — this is the legal backbone of about 90% of investment transactions in Phuket.",
            "A villa with land is acquired via one of the legal routes: a 30-year leasehold with renewal options, ownership through a Thai company (under tighter scrutiny in 2026 — only with a qualified lawyer), or long land lease combined with freehold on the building itself.",
            "Completed condominiums, off-plan condominiums and hotel-managed apartments are all available to foreigners under freehold, provided the project's foreign quota is not yet full — by law, up to 49% of a condominium's saleable area can be owned by foreigners.",
          ],
          bullets: [
            "Condominium freehold — the simplest and cleanest structure for foreigners",
            "Leasehold 30+30+30 years — a working scheme for villas and part of condo stock",
            "Villa ownership via a Thai company — only with a qualified lawyer",
          ],
        },
        {
          heading: "Freehold vs Leasehold: what to choose",
          paragraphs: [
            "Freehold is full ownership registered at the Land Office, inheritable and resellable at any time. The only constraint is the 49% foreign quota per building.",
            "Leasehold is a registered long-term lease, typically 30 years with two renewal options (up to 90 years in total). It is legally weaker than freehold: renewal depends on the landowner (usually the developer), so the developer's reputation and precise contract wording matter.",
            "Rule of thumb: if freehold is available in the project at the price you want — take freehold. Leasehold is a fit when the quota is full, the unit is rare and the developer is strong.",
          ],
          bullets: [
            "Freehold: full title, Land Office registration, clean resale",
            "Leasehold: 30+30+30 years, legally weaker but valid and workable",
            "Foreign quota sells out fast in popular projects — freehold units appreciate",
          ],
        },
        {
          heading: "Off-plan vs completed: where yield is higher",
          paragraphs: [
            "Off-plan (purchase during construction) is the dominant format for investment transactions in Phuket. Payments are staged, entry price is 20–35% below completion price, and with a strong developer this format delivers the highest ROI.",
            "Completed properties suit buyers who want to move in immediately or start renting without waiting. Prices are higher, but there is no construction risk and cash flow starts on day one.",
            "The main criterion for off-plan is not price — it's the developer: EIA (environmental impact assessment), Construction Permit, delivery track record and post-handover management model.",
          ],
          bullets: [
            "Off-plan: 20–35% entry discount, staged payments, rental starts after handover",
            "Completed: immediate use or rental, higher price, less upside",
            "Non-negotiable checks: EIA, Construction Permit, developer track record, escrow",
          ],
        },
        {
          heading: "Payment schedule and money transfer",
          paragraphs: [
            "Typical off-plan schedule: 1–3% Reservation Fee, 20–30% on Sales & Purchase Agreement, 40–60% in construction tranches, 10–20% at key handover.",
            "Funds are wired from abroad to the developer's account or to your Thai account with the mandatory purpose note 'for the purpose of purchasing condominium'. Only such a transfer generates a Foreign Exchange Transaction Form (FET) — without it, foreign freehold registration is impossible.",
            "In 2026, buyers from Russia and CIS commonly route funds via friendly jurisdictions, licensed USDT-to-fiat conversion locally, or accounts in third countries. Each route needs individual planning so that the FET documentation ends up correct.",
          ],
          bullets: [
            "Reservation Fee: 1–3% on booking",
            "SPA: +20–30% on contract signing",
            "Construction tranches: 40–60% across milestones",
            "Handover: final 10–20%",
            "FET form is mandatory for foreign freehold registration",
          ],
        },
        {
          heading: "Taxes at purchase and during ownership",
          paragraphs: [
            "At registration, buyer and seller share: Transfer Fee 2% of appraised value, Specific Business Tax 3.3% (if seller owned less than 5 years), Stamp Duty 0.5% and Withholding Tax on a progressive scale. Standard Phuket practice is a 50/50 split — recorded in the contract.",
            "Annual holding costs are effectively two: Land and Building Tax (0.02–0.10% of appraised value for residential) and the service charge to the developer (not a tax — an infrastructure fee, 50–90 THB/m²/month).",
            "Rental tax for non-residents is 15% withholding on gross income. Through a Thai company, taxable base is reduced by expenses and the effective rate drops. Most hotel-managed programmes withhold automatically and issue the paperwork.",
          ],
          bullets: [
            "Transfer 2% + SBT 3.3% + Stamp 0.5% + WHT — split at closing",
            "Annual: Land & Building Tax 0.02–0.10% of appraisal",
            "Service charge 50–90 THB/m²/month (infrastructure, not tax)",
            "Non-resident rental tax: 15% WHT on gross",
          ],
        },
        {
          heading: "Due diligence: what to check before signing",
          paragraphs: [
            "Developer legal package: Chanote (Title Deed) on the land, Construction Permit, EIA, condominium registration permit, developer entity registered with MOC (Ministry of Commerce), no litigation and no encumbrances.",
            "Foreign quota — the percentage of the project already sold to foreigners on freehold. If the quota is exhausted you'll only be offered leasehold — no matter what the marketing calls it. Verify before signing the SPA.",
            "The SPA itself: payment schedule, penalties for delivery delay, defect warranty (typically 1 year on finishing, 5 years on structure), Force Majeure clauses, escrow provisions, leasehold renewal wording (where applicable).",
          ],
          bullets: [
            "Chanote, Construction Permit, EIA — the base developer package",
            "MOC registration + on-time delivery history",
            "Available foreign quota — critical for freehold registration",
            "SPA: schedule, penalties, warranties, escrow, leasehold renewal",
          ],
        },
        {
          heading: "Management and rental after handover",
          paragraphs: [
            "Three models: hotel-managed programme (developer or operator rents the unit on your behalf on a fixed or revenue-share model), independent property management (typically 20–25% fee), or self-management (only realistic if you live in Phuket).",
            "Hotel-managed often ships with a guaranteed yield for years 1–3–5 (5–7% p.a. on cost) — this is a marketing floor. The real upside is revenue-share after the guarantee, where strong projects deliver 8–12% net.",
            "Phuket occupancy: 65–85% annual in the strongest locations (Bang Tao, Layan, Nai Yang, Laguna) under professional management. Peak season December–March, low season June–September.",
          ],
          bullets: [
            "Hotel-managed: 5–7% guarantee early on + revenue-share after",
            "Independent management: 20–25% fee on income",
            "Occupancy 65–85% in top locations under professional operation",
            "Peak: December–March. Low season: June–September",
          ],
        },
        {
          heading: "Step-by-step buyer checklist",
          bullets: [
            "Define the goal: income, capital, home, relocation — everything follows from this",
            "Choose the location: Bang Tao, Layan, Nai Yang, Laguna — strongest for investment",
            "Shortlist 3–5 projects matching goal and budget",
            "Vet the developer: EIA, Construction Permit, delivery track record",
            "Model yield: 5–10 year yield forecast including seasonality",
            "Reservation: 1–3% Reservation Fee",
            "Due diligence: lawyer reviews SPA and developer corporate documents",
            "SPA signing: payment schedule and penalties",
            "Set up the transfer: FET form",
            "Construction tranches",
            "Snagging + key handover",
            "Onboard to management, launch rental",
          ],
        },
      ],
      faq: [
        {
          q: "Can a foreigner buy real estate in Thailand in their own name?",
          a: "Yes, but only certain asset types. A condominium unit — in your own name on freehold, provided the project's 49% foreign quota is not exhausted. Land — no direct freehold ownership; only a 30-year leasehold or a Thai company (with a qualified lawyer).",
        },
        {
          q: "What rental yield is realistic in Phuket in 2026?",
          a: "Strong off-plan projects in Bang Tao, Layan and Nai Yang deliver 7–12% net p.a. under professional management. The 5–7% guarantees in early years are a marketing floor — the real ceiling sits above.",
        },
        {
          q: "Which is safer — off-plan or completed?",
          a: "Both are legal and workable. Off-plan gives a 20–35% entry discount and higher ROI, but demands proper developer due diligence. Completed properties give less upside but zero construction risk and immediate cash flow.",
        },
        {
          q: "How do I transfer purchase funds in 2026 as a buyer from Russia or CIS?",
          a: "Via licensed USDT-to-fiat conversion locally, accounts in a friendly jurisdiction, or partner-structure payments. The critical requirement is to produce a correct FET form — without it, foreign freehold registration is impossible.",
        },
        {
          q: "Do I owe Thai taxes if I rent my unit out?",
          a: "Yes — 15% withholding tax on gross rental income for non-residents. Through a Thai company, the taxable base is reduced by expenses on a progressive scale. Most hotel-managed programmes withhold automatically and issue documentation.",
        },
        {
          q: "What if the developer misses the delivery date?",
          a: "The SPA sets the terms: late-delivery penalties (usually 5–15% p.a. on funds paid) and the buyer's right to cancel with refund after a defined delay window (often 12 months).",
        },
        {
          q: "Foreign quota — where's the risk?",
          a: "By law, up to 49% of a condominium's saleable area may be owned by foreigners on freehold. In popular off-plan projects that 49% sells out in the first 6–12 months — after that, foreigners can only take leasehold. Confirm available quota before signing the SPA.",
        },
      ],
    },
    "rental-yield-phuket-by-area": {
      title:
        "Real rental yield in Phuket 2026 by area: numbers without the marketing gloss",
      description:
        "How to calculate real net rental yield on Phuket real estate. Yield and occupancy ranges for Bang Tao, Layan, Laguna, Nai Yang, Cherng Talay and the older tourist districts. What eats yield fastest and how to pick a location for your specific goal.",
      category: "Investment analysis",
      readingMinutes: 10,
      intro:
        "Real rental yield is not the '5–7% guaranteed' printed in a marketing brochure. It's net yield after taxes, management fees, service charges and downtime. This guide covers realistic yield ranges for every investment-grade Phuket district, the costs that eat yield fastest, and a rule of thumb for matching location to goal.",
      sections: [
        {
          heading: "How to calculate yield properly",
          paragraphs: [
            "Three metrics not to confuse. Gross yield = annual rental income / property price — useful for a quick sanity check, but misleading. Net yield = (income − management − service charge − taxes − downtime − wear) / total transaction cost. Cash-on-cash return factors in staged payments and equity actually deployed at the moment — the most honest metric for an off-plan investor.",
            "Total transaction cost often lost in models: transfer fee and sinking fund at registration, wire fees, furniture (400–800k THB for a 1-bed), first service charge cycle, early months without tenants, insurance and furniture depreciation.",
            "The main yield killers: management fee 20–25% of gross, service charge 50–90 THB/m²/month, 15% non-resident withholding tax on gross, repairs and refresh every 3–5 years, low-season void periods.",
          ],
          bullets: [
            "Gross yield — quick comparison only",
            "Net yield — real return after every deduction",
            "Cash-on-cash — factors staged payments and leverage",
            "Total cost = price + furniture + fees + early void months",
          ],
        },
        {
          heading: "Bang Tao — the strongest rental market",
          paragraphs: [
            "Bang Tao is the epicentre of international rental demand on Phuket. Boat Avenue, Porto de Phuket, endless dining, golf clubs, Layan next door. Year-round demand from Asia, Europe, the Middle East and domestic tourism.",
            "Gross yield: 8–12% off-plan, 6–9% completed. Net yield after everything: 5–8%. Occupancy: 75–85% p.a. under professional management. ADR (average daily rate): 3,500–7,500 THB for a 1-bed, 8,000–15,000 THB for a 2-bed lakefront.",
            "Notable feature: a genuine shoulder season — solid performance May–October, not only in winter. Quickest resale liquidity on the island. The default off-plan investment destination.",
          ],
          bullets: [
            "Gross yield: 8–12% (off-plan), 6–9% (completed)",
            "Net yield: 5–8%",
            "Occupancy: 75–85% p.a.",
            "Year-round demand, broad source markets",
          ],
        },
        {
          heading: "Layan — premium with capital appreciation",
          paragraphs: [
            "Layan is the quiet enclave between Bang Tao and Cherng Talay. Lower new-build density than Bang Tao, so prices grow faster. Higher-end guest, longer stays, less short-term turnover.",
            "Gross yield: 7–10%. Net yield: 5–7%. Occupancy: 70–80%. Average stay length: 2–4 weeks (against 3–7 days in Patong) — much lighter operational load.",
            "Capital appreciation: 6–10% p.a. with a strong developer. Best district for long-term hold.",
          ],
          bullets: [
            "Gross yield: 7–10%",
            "Net yield: 5–7%",
            "Average stay length: 2–4 weeks",
            "Capital appreciation: 6–10% p.a.",
          ],
        },
        {
          heading: "Laguna Phuket — 25-year integrated resort ecosystem",
          paragraphs: [
            "Laguna is Phuket's oldest integrated resort estate (Banyan Tree, Angsana, Cassia, Dusit). Private beaches, golf, international clinic, school, family infrastructure.",
            "Gross yield: 6–9%. Net yield: 4–6%. Occupancy: 80–90% — the most predictable demand on the island. Higher entry ticket, lower yield, but minimum risk.",
            "Track record: in 25+ years of the estate's operation not a single project has traded down on resale. This is effectively Phuket's low-risk safe haven.",
          ],
          bullets: [
            "Gross yield: 6–9%",
            "Net yield: 4–6%",
            "Occupancy: 80–90% — the steadiest on Phuket",
            "Track record: 25+ years with no resale losses",
          ],
        },
        {
          heading: "Nai Yang — the emerging beachfront",
          paragraphs: [
            "Nai Yang sits on the north-west coast next to Sirinat National Park. Direct beach access with no permanent build-up, 15 minutes from the airport — critical for short stays. Young market with a low base and material upside.",
            "Gross yield: 9–12% off-plan (low base, high potential). Net yield: 6–8%. Occupancy: 65–75% — sharper seasonality than Bang Tao. Peak season: November–April.",
            "Main risk: the market is young, resale liquidity is thinner than Bang Tao/Layan. Best fit: mid-term hold (5–7 years) for rental income.",
          ],
          bullets: [
            "Gross yield: 9–12% off-plan",
            "Net yield: 6–8%",
            "Occupancy: 65–75%, sharper seasonality",
            "15 min from the airport — plus for short-term rental",
          ],
        },
        {
          heading: "Cherng Talay, Kamala, Kata, Karon, Patong",
          paragraphs: [
            "Cherng Talay borders Bang Tao — derivative demand with yields close to Bang Tao at a slightly lower entry. Kamala — premium villas, harder for short-term rental.",
            "Kata, Karon, Patong — the historic tourism core. Pros: established demand, lower entry. Cons: aged stock, high competition, short average stays, ADR below Bang Tao/Layan.",
            "Gross yield: 5–8%. Net yield: 3–5%. Works well for buy–renovate–resell, poorly for pure buy-and-hold rental.",
          ],
          bullets: [
            "Cherng Talay: near-Bang-Tao yield, lower entry",
            "Kata/Karon: net yield 3–5% on average",
            "Patong: high competition, short stays",
            "Best case: value-add renovation, not buy-and-hold",
          ],
        },
        {
          heading: "A real net-yield walkthrough (no gloss)",
          paragraphs: [
            "1-bedroom condo in Bang Tao, off-plan, 5.5M THB. Annual gross rental income: 480k THB (gross yield 8.7%).",
            "Deduct from gross: management fee 25% (−120k), service charge (−30k), 15% non-resident withholding on gross (−72k), reserve for repairs and downtime (−30k). Net income: 228k THB — net yield 4.1%.",
            "The 'guaranteed 6–7% on cost' quoted by hotel-managed programmes is not net yield — it's a fixed coupon, often only for years 1–3 or 1–5. Always ask which metric a number refers to.",
          ],
        },
        {
          heading: "How to match location to goal",
          bullets: [
            "Steady income + low risk: Laguna, large Bang Tao projects on hotel-management",
            "Maximum ROI: off-plan in Nai Yang or Bang Tao with a top developer",
            "Long-term capital appreciation: Layan",
            "Fastest exit liquidity: Bang Tao or Laguna",
            "Personal use + passive rental: Laguna, Nai Yang",
            "Not recommended for pure investment: Patong (high competition, weak ADR)",
          ],
        },
      ],
      faq: [
        {
          q: "What net yield is realistic in Phuket in 2026?",
          a: "5–8% net p.a. on strong off-plan projects in Bang Tao, Layan and Nai Yang under professional management. 'Guaranteed 5–7% on cost' is a fixed coupon from the hotel-managed programme, not net yield.",
        },
        {
          q: "Bang Tao or Layan for investment?",
          a: "Bang Tao if priority is liquidity, year-round demand and a fast exit. Layan if priority is capital appreciation, lighter operational load and longer average stays. Portfolios often combine both.",
        },
        {
          q: "What eats yield fastest?",
          a: "The 20–25% management fee, 15% non-resident withholding on gross, and low-season void periods — plus service charge and furniture depreciation. Gross-to-net gap is typically 3–5 percentage points.",
        },
        {
          q: "How much of the year does a Phuket condo sit empty?",
          a: "In Bang Tao and Laguna under professional management: 15–25% (occupancy 75–85%). In Nai Yang: 25–35% (sharper seasonality). In Patong: up to 40% off-peak.",
        },
        {
          q: "Is Patong a fit for pure buy-and-hold rental in 2026?",
          a: "Rarely. High competition, aged stock, short average stays. It works for buy–renovate–flip, not for long-term rental yield.",
        },
        {
          q: "How can I check whether an advertised yield is realistic?",
          a: "Ask the developer or operator for actual data from their already-delivered projects: average ADR by unit type, actual occupancy over the last 12 months, distribution structure. If they can't produce these numbers — that's a red flag.",
        },
      ],
    },
    "off-plan-risks-due-diligence": {
      title:
        "Off-plan property in Phuket: 5 key risks and the full 2026 due-diligence checklist",
      description:
        "Structured breakdown of the main risks in Thai off-plan real estate — developer failure, foreign quota exhaustion, delivery delay, finish-quality substitution, weak post-handover operations — plus a full step-by-step due-diligence checklist for foreign buyers.",
      category: "Legal guide",
      readingMinutes: 11,
      intro:
        "Off-plan gets you in at 20–35% below completion price and delivers the highest ROI when the developer is strong. The trade-off is real construction and legal risk that marketing never shows. This guide covers the 5 core risks of Phuket off-plan and a due-diligence checklist that removes about 90% of them.",
      sections: [
        {
          heading: "Why off-plan works on Phuket",
          paragraphs: [
            "Off-plan is the default format for investment transactions on the island. Staged payments: 1–3% reservation, 20–30% at SPA, 40–60% during construction, 10–20% at handover. Entry is 20–35% cheaper than completion price and, with a strong developer, ROI is 1.5–2× the completed-unit equivalent.",
            "Developer economics work in favour of off-plan too — payments arrive before completion, which reduces bank-loan reliance and enables early-tranche discounts. But this is exactly where risk originates: some developers fund construction with buyer money and have no reserve if sales slow.",
          ],
        },
        {
          heading: "Risk 1: developer failure or stalled construction",
          paragraphs: [
            "The worst-case scenario. If the developer goes bankrupt before handover, buyer funds without escrow are not fully protected — the Thai Condominium Act does not guarantee automatic refunds.",
            "How to reduce: work only with developers with ≥3 delivered projects, bank confirmation of financing and, ideally, an escrow account. Verify MOC registration, absence of litigation, delivery history.",
          ],
          bullets: [
            "Require escrow for pre-handover payments",
            "Minimum 3 previously delivered projects",
            "Litigation check via a Thai lawyer",
            "Bank confirmation of project financing",
          ],
        },
        {
          heading: "Risk 2: foreign quota and leasehold substitution",
          paragraphs: [
            "By law, 49% of a condominium's saleable area can be owned by foreigners on freehold. In popular projects this quota sells out in the first 6–12 months. Buyers arriving later are offered leasehold — legally weaker, but often sold under the same 'freehold' marketing.",
            "Important: leasehold is a legal and workable structure — but it should be a conscious choice. If you were promised freehold and the SPA is leasehold, that's either agent error or intentional misrepresentation.",
          ],
          bullets: [
            "Request a written foreign-quota statement as of the SPA date",
            "SPA explicitly states: freehold or leasehold",
            "Freehold/leasehold price gap is typically 5–15%",
            "Leasehold is fine — but must be intentional",
          ],
        },
        {
          heading: "Risk 3: delivery delay and penalty mechanics",
          paragraphs: [
            "Typical off-plan delay in Thailand: 3–9 months past scheduled completion. Sometimes 12+ months. Impact on investor IRR: expected yield year N shifts to N+1.",
            "What the SPA must contain: a specific Completion date, penalty clause (typically 5–15% p.a. on paid amounts for delay), buyer's right to terminate with refund after a defined delay window (12–24 months).",
          ],
          bullets: [
            "Delay penalty: 5–15% p.a. on paid amounts",
            "Termination right: after 12–24 months of delay",
            "Chargeback mechanism if project is abandoned",
            "Explicit dates — not 'Q4 2028' without a day",
          ],
        },
        {
          heading: "Risk 4: finish quality vs. show unit",
          paragraphs: [
            "The show unit is a shop window — top furniture, curated lighting, styled accessories. Serial delivery frequently differs: different tiling, cheaper sanitary ware, 'equivalent-grade' material substitutions.",
            "What the contract must fix: material specification (flooring, sanitary, kitchen, glazing), the developer's obligation to provide equivalents when a material is unavailable, warranty on finishes (1 year) and structure (5 years).",
            "Snagging is mandatory: an inspection with a checklist before signing acceptance. Professional snagging companies charge 5–15k THB per unit.",
          ],
          bullets: [
            "Material spec attached to SPA",
            "Substitution formula for unavailable materials",
            "Warranty: 1 year finishing, 5 years structural",
            "Mandatory professional snagging before acceptance",
          ],
        },
        {
          heading: "Risk 5: weak post-handover operations and rental underperformance",
          paragraphs: [
            "A well-built project still misses its yield target if the operator is weak — poor marketing, low ADR, prolonged voids. Critical for hotel-managed properties where your income depends directly on the operator.",
            "What to check: who the operator is (external brand like Dusit/Marriott/Wyndham or in-house), how many properties they manage, published occupancy and RevPAR figures for their existing portfolio.",
          ],
          bullets: [
            "Operator: known brand or proven in-house team",
            "Operator portfolio: ≥5 delivered properties",
            "Public occupancy/RevPAR figures",
            "Transparent revenue-split terms in the contract",
          ],
        },
        {
          heading: "Off-plan due-diligence checklist",
          bullets: [
            "Chanote (Title Deed) on the land",
            "Construction Permit issued and valid",
            "EIA (Environmental Impact Assessment) approved",
            "Condominium Registration Permit condition post-handover",
            "Developer entity MOC-registered, no litigation",
            "≥3 previously delivered projects with dates and addresses",
            "Escrow account for pre-handover payments",
            "SPA: explicit Completion date, delay penalty, chargeback",
            "SPA: material specification attached",
            "Foreign quota as of the SPA date — developer statement",
            "SPA explicitly states: freehold or leasehold",
            "Rental operator and their existing portfolio",
            "Reserve for snagging and first service-charge cycle",
          ],
        },
      ],
      faq: [
        {
          q: "How risky is an off-plan transaction in Thailand?",
          a: "With a developer with ≥3 delivered projects, escrow and a properly drafted SPA — risk is close to a completed-unit purchase plus timing risk. Without due diligence and with a weak developer — potential 20–30%+ loss on invested capital.",
        },
        {
          q: "What if the developer misses the delivery date?",
          a: "Refer to the SPA's penalty clause. Standard: 5–15% p.a. on paid amounts and the right to terminate with refund after 12–24 months of delay. All of this only works if the clause is properly worded in the contract.",
        },
        {
          q: "Is it worth paying the full amount upfront for a discount?",
          a: "Usually no. Staged payments protect you — if construction stalls, part of your money is still unpaid. A 3–7% 'full-payment' discount rarely offsets the risk, except with very established developers.",
        },
        {
          q: "Can I resell off-plan before handover?",
          a: "Yes — via assignment. The SPA typically permits assignment after a certain paid percentage (often 50%) with a 1–3% developer fee. It's a liquid exit for investors on an appreciating project.",
        },
        {
          q: "How do I actually verify a developer's reputation?",
          a: "Delivered portfolio (addresses, dates), owner feedback in Phuket communities, Thai lawyer check (litigation, MOC registration), in-person meeting with management and site visits to their delivered projects.",
        },
        {
          q: "Do I really need a Thai lawyer for an off-plan purchase?",
          a: "Yes. 30–70k THB to review the SPA and developer corporate documents. Skipping this line item is the most common — and most expensive — foreign-buyer mistake.",
        },
      ],
    },
    "rental-tax-non-resident-thailand": {
      title:
        "Non-resident rental tax in Thailand 2026: 15% withholding, Thai company, DTA",
      description:
        "End-to-end guide to rental-income tax on Thai real estate for non-residents: 15% withholding tax, ownership through a Thai company on a progressive scale, double-tax treaties, auto-withholding in hotel-managed programmes, and the mistakes foreign owners make most often.",
      category: "Tax guide",
      readingMinutes: 9,
      intro:
        "Tax on rental income for a foreign owner in Thailand is not a 'grey zone' — it's a well-defined system with two base modes: 15% withholding for non-residents and a progressive scale via a Thai company. This guide covers the mechanics of both, what hotel-managed programmes withhold, how double-tax treaties actually work, and the mistakes foreign owners make most often.",
      sections: [
        {
          heading: "Who is a 'non-resident' — and why it matters",
          paragraphs: [
            "A Thai tax resident is anyone who spends ≥180 days in the country in a calendar year. Everyone else is a non-resident. The distinction matters: non-residents face a fixed rental-income tax (15% withholding); residents follow a progressive scale.",
            "Citizenship is irrelevant — only actual day-count matters. Many property owners spend 2–3 months a year on Phuket: they are non-residents for tax purposes regardless of visa type.",
          ],
          bullets: [
            "Resident = ≥180 days in Thailand in a calendar year",
            "Citizenship doesn't factor in — only day-count",
            "Non-resident: 15% withholding on gross",
            "Resident: progressive scale with expenses",
          ],
        },
        {
          heading: "15% withholding tax — mechanics",
          paragraphs: [
            "The rent payer (tenant, hotel-managed operator, management company) is obligated to withhold 15% of gross rental income on behalf of a non-resident owner and remit it to the Thai Revenue Department.",
            "Key point: withholding is on gross, not net. Expenses (management fee, service charge, repairs) are not deductible from the base. Simple mechanics — but not the most efficient: the effective rate on real net income can be 25–40%.",
            "The owner receives a withholding tax certificate. This is critical for downstream use: inclusion in the home-country tax return via a DTA, foreign tax credit, reporting.",
          ],
          bullets: [
            "15% withheld by tenant or operator",
            "Base is gross income; expenses not deducted",
            "Withholding tax certificate issued to the owner",
            "Effective rate on net income can exceed 15%",
          ],
        },
        {
          heading: "Thai company — the progressive-scale route",
          paragraphs: [
            "Alternative structure: hold the property via a Thai company (under tighter scrutiny in 2026 — must be a real operating entity, not a shell). Taxation happens at company level: 20% corporate tax on profit after expenses.",
            "What reduces the base: management fee, service charge, furniture depreciation, repairs, insurance, legal and accounting. Effective rate on rental income via a company is typically 10–15% versus 15% withholding on gross for a non-resident.",
            "Downsides: accounting cost (10–20k THB/month), mandatory filings, dividend tax on profit extraction to the owner, and risk if the structure isn't robust under the tightened 2026 scrutiny.",
          ],
          bullets: [
            "20% corporate tax on profit (not revenue)",
            "Deductibles: management, service, repairs, depreciation",
            "Effective rate on rental income: 10–15%",
            "Requires a real operating entity and quality bookkeeping",
          ],
        },
        {
          heading: "Hotel-managed programmes — auto-withholding",
          paragraphs: [
            "Most hotel-managed operators on Phuket automatically withhold 15% from payouts to non-resident owners and remit the tax to the Revenue Department, issuing the corresponding certificates. This frees the owner from filing a separate Thai return.",
            "What to check in the contract: explicit language that the operator withholds and remits, regularly provides withholding tax certificates, and reports the full payout structure to you (gross income, deductions, net paid).",
          ],
          bullets: [
            "Operator withholds 15% and remits to the budget",
            "Issues withholding tax certificates to the owner",
            "Removes the need for the owner to file in Thailand",
            "Demand transparency on the payout structure",
          ],
        },
        {
          heading: "Double-tax treaties (DTA)",
          paragraphs: [
            "Thailand has >60 bilateral double-tax treaties, including most of Europe, China, India and the UAE. Treaty with Russia — active. With Ukraine — active. This means: tax withheld in Thailand can be credited against, or reduce liability in, your country of residence.",
            "Mechanics depend on the specific DTA and your local rules. In most European jurisdictions, individuals rely on the foreign tax credit: local tax on this income is reduced by the amount already paid in Thailand.",
            "In practice: the owner collects withholding tax certificates from the operator/tenant, attaches them to the home-country return, and receives a foreign tax credit or liability reduction.",
          ],
          bullets: [
            "60+ Thai DTAs, including RU, UA, EU, UAE",
            "Foreign tax credit — the standard mechanism",
            "Withholding tax certificate is required for credit",
            "Specifics depend on your local tax rules",
          ],
        },
        {
          heading: "Scenario 1: non-resident via hotel-managed programme",
          paragraphs: [
            "Owner lives in the EU, holds a Bang Tao condo on a hotel-managed programme. Annual gross rental income: 480k THB. Operator withholds 15% (72k THB) and remits it to the Thai Revenue Department, issuing a certificate.",
            "The owner receives 408k THB minus management fee and service charge. On the EU return, the income is declared, the DTA is applied, and the 72k THB already paid in Thailand is claimed as a foreign tax credit.",
          ],
        },
        {
          heading: "Scenario 2: Thai company holding several units",
          paragraphs: [
            "A company owns 3 condos, total gross rental income 1.5M THB. Deductions: management fee 375k, service charge 90k, furniture depreciation 120k, other expenses 60k. Profit: 855k. Corporate tax at 20%: 171k.",
            "Effective rate: 171/1500 = 11.4% of gross — meaningfully below 15% withholding. But add accounting at 180k/year, 10% dividend tax on extraction, and the gap narrows. The company route makes economic sense from around 1.2–1.5M THB gross rental income per year.",
          ],
        },
        {
          heading: "Common mistakes",
          bullets: [
            "Treating 15% withholding as a grey area and not remitting — audit triggers back-tax plus penalties",
            "Not collecting withholding tax certificates — losing the ability to credit them at home",
            "Setting up a shell Thai company for one condo — 2026 scrutiny may reclassify the structure",
            "Not declaring the income in the home country — CRS reporting catches up eventually",
            "Ignoring hotel-managed reporting — loss of control over payout structure",
          ],
        },
      ],
      faq: [
        {
          q: "What tax does a non-resident owner pay on rental income in Thailand?",
          a: "15% withholding tax on gross rental income. The tenant or hotel-managed operator withholds and remits it; the owner keeps 85% of gross minus other costs.",
        },
        {
          q: "Is a Thai company more tax-efficient?",
          a: "Effectively yes — 10–15% on gross rather than a straight 15%, because management, service charge, repairs and depreciation are deductible. But accounting costs and dividend tax on extraction reduce the gap. It makes economic sense from around 1.2–1.5M THB gross rental income per year.",
        },
        {
          q: "Do the Thai–Russia and Thai–Ukraine double-tax treaties work?",
          a: "Yes, both are active. The 15% withholding paid in Thailand is credited as a foreign tax credit at home. Specific credit mechanics follow local rules.",
        },
        {
          q: "What happens if I don't declare this income in my home country?",
          a: "Automatic tax-information exchange (CRS) covers Thailand and most jurisdictions. Undeclared income becomes visible to the home tax authority sooner or later — with back-tax and penalties.",
        },
        {
          q: "Does a hotel-managed programme auto-withhold tax?",
          a: "Usually yes for non-residents. Verify in the contract: explicit language on 15% withholding and issuance of withholding tax certificates. If the operator doesn't withhold, you are liable to pay yourself.",
        },
        {
          q: "Is there a tax on an empty apartment that isn't rented out?",
          a: "Withholding applies to actual income only — zero when the unit sits empty. But Land and Building Tax (0.02–0.10% of appraised value for residential) and the developer service charge still apply.",
        },
      ],
    },
    "phuket-vs-bali-vs-dubai": {
      title:
        "Phuket vs Bali vs Dubai: where investors should buy real estate in 2026",
      description:
        "Comparison of three leading resort real-estate markets for international investors: legal ownership structures, entry ticket, real yield and occupancy, taxes, resale liquidity, visa pathways. Pros and cons of each market and who each one suits.",
      category: "Investment comparison",
      readingMinutes: 11,
      intro:
        "Phuket, Bali and Dubai are the three primary destinations for international resort real-estate capital in 2026. Each runs on a different legal model, delivers different yield, different liquidity and different visa mechanics. This guide compares all three across 7 key metrics — no marketing gloss.",
      sections: [
        {
          heading: "Three markets seen through investor lens: quick take",
          paragraphs: [
            "Phuket — balanced market with a mature legal framework (Thai Condominium Act 1979) and yield focus. Bang Tao, Layan and Laguna are the strongest districts. Well-suited to investors wanting steady income and acceptable liquidity.",
            "Bali — the highest headline yields in Asia but the weakest foreign-owner legal position (no full freehold, only Hak Pakai / long lease). Works for risk-tolerant investors comfortable with weaker legal protection.",
            "Dubai — the only market of the three where foreigners get full freehold in designated freehold zones. The most liquid market with the clearest rules. Higher entry ticket, zero rental income tax, but realistic yield is lower than Asia.",
          ],
        },
        {
          heading: "Legal ownership structures",
          paragraphs: [
            "Phuket: freehold on condominium (49% foreign quota) and 30+30+30-year leasehold on villas. Registered at the Land Office. Legally clear with substantial case law.",
            "Bali: freehold (Hak Milik) not available to foreigners. Primary structures — Hak Pakai (~30 years with renewal), long lease (25–99 years), nominee-style structures via PT PMA (foreign-owned entity). Every structure has limits.",
            "Dubai: full freehold in designated freehold zones (Dubai Marina, Palm, Downtown, JVC, Business Bay, etc.). Registered at Dubai Land Department. Full foreign ownership without district-level restrictions.",
          ],
          bullets: [
            "Phuket: condo freehold + villa leasehold — working system",
            "Bali: no full foreign freehold",
            "Dubai: full freehold in freehold zones — strongest position",
          ],
        },
        {
          heading: "Entry ticket and total transaction cost",
          paragraphs: [
            "Phuket: 1-bed in investment districts — from 4–6M THB (~$120–180k). Total transaction cost +7–9% (transfer, sinking fund, furniture, lawyer).",
            "Bali: 1-bed villa in Canggu / Ulun — from $150–220k. Total transaction cost +8–12% (nominee structure, lawyer, inspections). More fragmented market.",
            "Dubai: 1-bed mid-market (JVC, Business Bay) — from $220–300k. Total transaction cost +6–8% (DLD fee 4%, broker, registration).",
          ],
          bullets: [
            "Phuket: from ~$120k all-in",
            "Bali: from ~$160k, higher legal complexity",
            "Dubai: from ~$240k, simplest process",
          ],
        },
        {
          heading: "Real yield and occupancy",
          paragraphs: [
            "Phuket: gross yield 7–12%, net yield 5–8%, occupancy 65–85% in top districts. Moderate seasonality with meaningful shoulder-season demand.",
            "Bali: gross yield 10–15% (headline), net yield 6–10% after realistic deductions. Occupancy 55–75%. Highly location-dependent: Canggu and Ulun work, secondary areas don't.",
            "Dubai: gross yield 6–9%, net yield 4–7%. Occupancy 70–85% in proven districts. Low seasonality, but new-supply pressure is meaningful.",
          ],
          bullets: [
            "Phuket: net yield 5–8%, steady",
            "Bali: net yield 6–10%, higher volatility",
            "Dubai: net yield 4–7%, lowest seasonality",
          ],
        },
        {
          heading: "Rental-income taxes",
          paragraphs: [
            "Phuket (Thailand): 15% withholding on gross for non-residents, or effective 10–15% via a Thai company. DTAs with most countries are in place.",
            "Bali (Indonesia): 10% withholding on gross for a non-resident individual, or 22% corporate tax via PT PMA (with expense deductions).",
            "Dubai (UAE): 0% tax on individual rental income. Only market of the three with no rental tax — a 1.5–2 percentage point net-yield advantage against Phuket/Bali.",
          ],
          bullets: [
            "Phuket: 15% withholding on gross",
            "Bali: 10% withholding on gross",
            "Dubai: 0% tax on rental income",
          ],
        },
        {
          heading: "Liquidity and exit",
          paragraphs: [
            "Phuket: average time to sell a quality Bang Tao condo — 3–9 months. Off-plan assignment permitted. International buyers active.",
            "Bali: selling to foreigners is harder due to legal structure. Average time — 6–18 months. Fewer institutional buyers.",
            "Dubai: the most liquid of the three. Average time in top districts — 2–6 months. Large international brokerages (Betterhomes, Allsopp, LuxuryProperty).",
          ],
          bullets: [
            "Phuket: 3–9 month exit, moderate liquidity",
            "Bali: 6–18 months, lower liquidity",
            "Dubai: 2–6 months, high liquidity",
          ],
        },
        {
          heading: "Visas and investment pathways",
          paragraphs: [
            "Phuket: Elite Visa (5–20 years), LTR Visa (10 years for investors), Retirement Visa (50+). Property purchase alone doesn't grant a visa, but LTR requires ≥$1M in assets, which may include real estate.",
            "Bali: KITAS (work), investment visas via PT PMA. No direct 'buy property, get visa' pathway, but investment through a company creates grounds.",
            "Dubai: Investor Visa (2 years) from $205k property purchase, Golden Visa (10 years) from $545k. The most direct 'property → visa' link of the three.",
          ],
          bullets: [
            "Phuket: Elite/LTR separate from property purchase",
            "Bali: only via PT PMA structure",
            "Dubai: direct property → visa pathway",
          ],
        },
        {
          heading: "Who each market suits",
          bullets: [
            "Steady income + acceptable yield + legal protection: Phuket (Laguna, Bang Tao)",
            "Maximum yield with legal-risk tolerance: Bali (Canggu, Ulun)",
            "Full freehold + visa + liquidity: Dubai (freehold zones)",
            "Portfolio diversification: Phuket (yield) + Dubai (liquidity/visa)",
            "First international investment: Dubai (clearest rules) or Phuket (mid ticket)",
            "Short rotation / speculation: Dubai (most liquid exit)",
          ],
        },
      ],
      faq: [
        {
          q: "Which market has the highest real yield — Phuket, Bali or Dubai?",
          a: "By net yield: Bali 6–10% (with strong management), Phuket 5–8%, Dubai 4–7%. Bali's higher yield offsets a weaker foreign-owner legal position and slower exit.",
        },
        {
          q: "Which market gives the strongest foreign-owner protection?",
          a: "Dubai — full freehold in designated zones. Phuket — freehold on condominium with 49% quota, legally well-developed. Bali — the weakest, no full foreign freehold.",
        },
        {
          q: "Which market grants a visa on property purchase?",
          a: "Dubai — Investor Visa from $205k, Golden Visa from $545k, direct link. Phuket and Bali don't grant visas directly on property purchase, though parallel programmes exist (Elite, LTR in Thailand).",
        },
        {
          q: "Where are rental taxes lowest?",
          a: "Dubai — 0% on individual rental income. Phuket — 15% withholding. Bali — 10% withholding. Dubai wins comfortably here.",
        },
        {
          q: "Which market is the most liquid on resale?",
          a: "Dubai — most liquid, 2–6 months in top districts, large international brokerages. Phuket — 3–9 months in Bang Tao/Layan. Bali — 6–18 months due to fragmented market and legal complexity.",
        },
        {
          q: "Can I combine these markets in one portfolio?",
          a: "Common practice for investors with $500k+ portfolios: Phuket for yield and steady income + Dubai for liquidity and visa options. Bali is optional — for investors comfortable with volatility.",
        },
      ],
    },
  },
};
