export interface ContactConfig {
  brandName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  whatsappMessage: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  workingHours: string;
  turnaroundTime: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  alt: string;
  features: string[];
  popular?: boolean;
  minOrder?: string;
  typicalTurnaround?: string;
  href?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string;
  image: string;
  alt: string;
}

export interface WhyPoint {
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  caliperOrSize?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  alt: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  review: string;
  serviceUsed: string;
}

export interface SiteContent {
  contact: ContactConfig;
  hero: {
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    image: string;
    imageAlt: string;
    stats: { value: string; label: string }[];
  };
  trustIntro: {
    badge: string;
    heading: string;
    subheading: string;
    description1: string;
    description2: string;
    image: string;
    imageAlt: string;
    metrics: { value: string; label: string; sub: string }[];
  };
  services: ServiceItem[];
  process: ProcessStep[];
  whyUs: {
    heading: string;
    subheading: string;
    image: string;
    imageAlt: string;
    points: WhyPoint[];
    badge: string;
  };
  gallery: GalleryItem[];
  industries: IndustryItem[];
  quality: {
    badge: string;
    heading: string;
    subheading: string;
    image: string;
    imageAlt: string;
    features: { title: string; description: string }[];
    stats: { value: string; label: string }[];
  };
  testimonials: TestimonialItem[];
  cta: {
    heading: string;
    subtext: string;
    primaryBtn: string;
    secondaryBtn: string;
    bgImage: string;
    phoneHighlight: string;
  };
}

export const siteContent: SiteContent = {
  contact: {
    brandName: "Aadhi Pasting",
    tagline: "Artisanal Calendar Pasting & Chits Book Finishing",
    phone: "+91 90808 67822",
    phoneDisplay: "+91 90808 67822",
    whatsapp: "919080867822",
    whatsappDisplay: "+91 90808 67822",
    whatsappMessage:
      "Hello Aadhi Pasting, I have a requirement for calendar pasting / chits book binding / rigid board finishing. Please share a quotation.",
    email: "contact@aadhipasting.com",
    address: {
      street: "Plot No. 42, Industrial Estate Road",
      area: "Near Sivakasi / Chennai Industrial Corridor",
      city: "Sivakasi & Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "626123",
    },
    workingHours: "Monday to Saturday: 8:30 AM - 8:30 PM",
    turnaroundTime: "24 - 48 Hours for Express Bulk Orders",
  },

  hero: {
    badge: "Royal Craftsmanship • Tamil Nadu Commercial Pasting Infrastructure",
    headline: "Artisanal Calendar Pasting",
    highlight: "& Chits Book Finishing.",
    subheadline:
      "Aadhi Pasting delivers precision daily & monthly calendar mountings, reinforced chit fund books, and rigid chipboard solutions engineered with zero paper warping, micro-calibrated edge alignment, and prompt regional dispatch.",
    primaryCtaText: "Request a Quote",
    secondaryCtaText: "Explore Our Craft",
    image: "/images/roses/hero-roses.jpg",
    imageAlt: "Aadhi Pasting Luxury Rose Floral Calendar and Board Finishing Exhibition",
    stats: [
      { value: "0.003mm", label: "Edge Alignment Precision" },
      { value: "Zero Warp", label: "Anti-Moisture Adhesive" },
      { value: "100K+", label: "Daily Sheet Throughput" },
      { value: "24-48h", label: "Fast Dispatch Turnaround" },
    ],
  },

  trustIntro: {
    badge: "The Hallmark of Quality",
    heading: "Where Industrial Scale Meets Masterful Finishing.",
    subheading:
      "From traditional Tamil daily calendars to executive chit fund ledgers, we bring royal elegance and micro-precision to every printed sheet.",
    description1:
      "At Aadhi Pasting, we specialize in the crucial post-press operations that determine the final elegance and lifespan of your print products. Our temperature-controlled pasting facilities mount thousands of daily tear-offs, monthly wall calendars, and chit cards each hour without air bubbles or edge lifting.",
    description2:
      "Using archival-grade, pH-balanced adhesives and multi-stage roller compression, our sheets retain planar flatness even through Southern India's intense humidity fluctuations, safeguarding your brand's prestige from press to customer hands.",
    image: "/images/about/craftsmanship-facility.jpg",
    imageAlt: "Master craftsman inspecting calendar sheet registration at Aadhi Pasting plant",
    metrics: [
      { value: "100%", label: "Edge Alignment", sub: "Digital caliper verified" },
      { value: "100K+", label: "Daily Output", sub: "High-volume line readiness" },
      { value: "Zero Creep", label: "Adhesive Bond", sub: "Anti-humidity formulation" },
      { value: "On-Time", label: "Regional Fleet", sub: "Direct Sivakasi & Chennai delivery" },
    ],
  },

  services: [
    {
      id: "calendar-pasting",
      title: "Calendar Pasting & Tinning",
      shortDesc:
        "High-tolerance Tamil & English daily calendar mounting, monthly sheets, and rigid wall calendars with tinning headers.",
      fullDesc:
        "Specialized mounting of daily Tamil & English calendar tear-offs, multi-page monthly wall sheets, and desktop easel backers onto rigid greyboard with zero misalignment and anti-warping adhesive application.",
      image: "/images/services/calendar-pasting.jpg",
      alt: "Precision calendar pasting and tinning header assembly",
      features: [
        "Daily Tamil tear-offs & monthly wall calendar backers",
        "Edge-to-edge sheet alignment with zero dimensional creep",
        "Reinforced metal tinning, rimming, eyeleting, and hangers",
        "Anti-moisture pH-neutral glue formulation prevents paper curl",
      ],
      popular: true,
      minOrder: "500 Units",
      typicalTurnaround: "24 - 48 Hours",
      href: "/calendar-pasting",
    },
    {
      id: "chits-pasting",
      title: "Chits Business Pasting & Binding",
      shortDesc:
        "Specialized passbook mounting, monthly collection card pasting, and tamper-resistant chit fund ledger binding.",
      fullDesc:
        "Engineered for chit fund corporations, cooperative credit societies, and private financiers. We produce rigid monthly savings passbooks, heavy-cardboard collection sheets, customer ledger cards, and security-bonded ledger covers.",
      image: "/images/gallery/custom-rigid-binding.jpg",
      alt: "Chit fund passbooks and rigid ledger card binding sample",
      features: [
        "Rigid chit passbook cover pasting (1.5mm to 3.0mm greyboard)",
        "Monthly installment tracking card mounting",
        "High-tack tamper-evident security adhesive bonds",
        "Linen cloth hinge spine reinforcement for multi-year durability",
      ],
      popular: true,
      minOrder: "250 Books / Cards",
      typicalTurnaround: "1 - 3 Days",
      href: "/chits",
    },
    {
      id: "chipboard-pasting",
      title: "Rigid Chipboard & Greyboard Mounting",
      shortDesc:
        "Structural mounting on 1.5mm to 4.0mm heavy greyboard, kappa board, and strawboard backers.",
      fullDesc:
        "Heavy-duty substrate pasting designed to give marketing collateral, book covers, and calendar backs rock-solid structural integrity without bending, twisting, or corner delamination.",
      image: "/images/services/custom-pasting.jpg",
      alt: "Multi-ply rigid greyboard and chipboard mounting swatches",
      features: [
        "Calibrated board calipers from 1.5mm up to 4.0mm",
        "Dual-sided sheet pasting with balanced grain tension",
        "Beveled edge trimming and clean wrapped margins",
        "Heavy hydraulic pressing prevents bowing under moisture",
      ],
      popular: false,
      minOrder: "500 Units",
      typicalTurnaround: "2 - 3 Days",
      href: "/services#chipboard-mounting",
    },
    {
      id: "sticker-pasting",
      title: "Commercial Sticker & Vinyl Pasting",
      shortDesc:
        "Bubble-free hydraulic roller mounting of printed adhesive vinyl and paper stickers on rigid promotional sheets.",
      fullDesc:
        "Flawless application of gloss and matte printed vinyl, die-cut promotional stickers, and release liners onto sunboard, foam sheets, and acrylic display surfaces.",
      image: "/images/services/sticker-pasting.jpg",
      alt: "Technician applying precision printed sticker sheets onto rigid backing",
      features: [
        "Progressive roller pressing guarantees zero trapped bubbles",
        "Die-cut contour & kiss-cut sheet registration",
        "High-tack permanent and removable adhesive options",
        "Indoor and outdoor weather-resistant bond strength",
      ],
      minOrder: "250 Units",
      typicalTurnaround: "1 - 3 Days",
      href: "/services#sticker-pasting",
    },
    {
      id: "label-pasting",
      title: "FMCG Carton & Box Label Pasting",
      shortDesc:
        "Accurate product label pasting for retail packaging boxes, rigid cartons, canisters, and jars.",
      fullDesc:
        "Precision centering and flat application for luxury retail gift boxes, food packaging, cosmetic cartons, and industrial outer boxes with scratch-free handling.",
      image: "/images/services/label-pasting.jpg",
      alt: "Product packaging boxes receiving accurate label pasting in clean workshop",
      features: [
        "Rigid carton & box wrap label mounting with flush corners",
        "Spot-on registration and centered alignment",
        "High-tack food & FMCG grade adhesives",
        "Scratch-free gentle handling of finished goods",
      ],
      popular: false,
      minOrder: "1,000 Units",
      typicalTurnaround: "24 Hours",
      href: "/services#label-pasting",
    },
    {
      id: "bulk-pasting",
      title: "High-Volume Bulk Production",
      shortDesc:
        "High-speed automated production lines capable of exceeding 100,000 sheets daily for major seasonal campaigns.",
      fullDesc:
        "Engineered specifically for commercial printing presses and large publication houses facing stringent festival and New Year delivery schedules.",
      image: "/images/services/bulk-pasting.jpg",
      alt: "Pallets of bulk calendar and board pasting orders in massive distribution facility",
      features: [
        "Over 100,000 sheets daily throughput capacity",
        "Continuous automated adhesive spreading & hydraulic rollers",
        "Palletized shrink-wrapping with heavy corner protectors",
        "Dedicated logistics coordination across Tamil Nadu and South India",
      ],
      popular: true,
      minOrder: "5,000 Units",
      typicalTurnaround: "High-Capacity Scheduling",
      href: "/services#bulk-production",
    },
  ],

  process: [
    {
      step: "01",
      title: "Material Intake & Grain Audit",
      description: "Inspection of raw printed sheets, greyboard calipers, and moisture levels.",
      details:
        "We log sheet batches, check grain direction alignment, and verify humidity balance to eliminate risk of post-production warping.",
      image: "/images/process/step1-receive.jpg",
      alt: "Receiving raw printed calendar sheets and board inventory",
    },
    {
      step: "02",
      title: "Pre-Pasting Calibration",
      description: "Surface cleaning, registration template setup, and adhesive formulation.",
      details:
        "Test prints are registered against backer templates to calibrate margin margins to within fractions of a millimeter.",
      image: "/images/process/step2-quality.jpg",
      alt: "Technician carrying out pre-mounting quality inspection",
    },
    {
      step: "03",
      title: "Precision Adhesive Application",
      description: "Automated adhesive dispensing with hydraulic multi-roller compression.",
      details:
        "A micro-thin, uniform layer of pH-neutral high-tack adhesive is applied, followed by progressive pressure rollers to expel air pockets.",
      image: "/images/process/step3-pasting.jpg",
      alt: "Applying precision adhesive bond during calendar pasting",
    },
    {
      step: "04",
      title: "Tinning & Caliper Inspection",
      description: "Metal tinning rim application, eyeleting, and digital micrometer flatness check.",
      details:
        "Trained quality inspectors examine every calendar header, verify tinning clamp firmness, and check planar flatness.",
      image: "/images/process/step4-inspection.jpg",
      alt: "Digital micrometer verification of pasted board edge caliper",
    },
    {
      step: "05",
      title: "Moisture-Barrier Dispatch",
      description: "Shrink-wrapping, rigid edge guards, pallet strapping, and prompt delivery.",
      details:
        "Finished calendars and chit books are sealed against transport humidity and dispatched directly to your warehouse.",
      image: "/images/process/step5-delivery.jpg",
      alt: "Orderly pallets packaged and staged for regional delivery",
    },
  ],

  whyUs: {
    heading: "Why Print Leaders Choose Aadhi Pasting",
    subheading:
      "When commercial deadlines are firm and your client expects flawless presentation, Aadhi Pasting combines massive industrial capacity with artisanal rose-boutique attention to detail.",
    image: "/images/why/why-choose-us.jpg",
    imageAlt: "Aadhi Pasting quality master showcasing finished calendar sheets in production plant",
    badge: "The Aadhi Distinction",
    points: [
      {
        title: "Specialized Calendar & Chits Expertise",
        description:
          "Decades of focused know-how in Tamil daily calendars, monthly wall hangings, tinning, and chit fund ledger binding.",
      },
      {
        title: "Micro-Calibrated Zero-Warp Technology",
        description:
          "Grain direction matching and pH-neutral adhesive viscosity calibrated specifically for Southern India's climate.",
      },
      {
        title: "High-Volume Production Capacity",
        description:
          "Multi-line roller infrastructure capable of dispatching 100,000+ sheets per day during peak seasonal windows.",
      },
      {
        title: "Flawless Edge Alignment",
        description:
          "Optical alignment jigs ensure every calendar header and chit book margin aligns with mathematical symmetry.",
      },
      {
        title: "Prompt Tamil Nadu Logistics",
        description:
          "Regular daily delivery routes connecting Sivakasi, Madurai, Trichy, Coimbatore, Salem, and Chennai printing clusters.",
      },
      {
        title: "Direct WhatsApp Collaboration",
        description:
          "Instant quotes, prototype sample evaluations, and real-time dispatch tracking directly on WhatsApp.",
      },
    ],
  },

  gallery: [
    {
      id: "1",
      title: "Daily Calendar Header Pasting & Tinning",
      category: "Calendar Pasting",
      description: "Tamil daily calendar mounted with reinforced tinning header and hanging loop.",
      image: "/images/gallery/calendar-pasting-detail.jpg",
      alt: "Close up of daily calendar pasting on chipboard",
      caliperOrSize: "15 x 20 in • 2.0mm Board",
    },
    {
      id: "2",
      title: "Chits Fund Passbook & Card Binding",
      category: "Chits Pasting",
      description: "Reinforced hardcover passbook with monthly payment grid and tamper-resistant bond.",
      image: "/images/gallery/custom-rigid-binding.jpg",
      alt: "Custom chit fund book cover and sample board calipers",
      caliperOrSize: "2.5mm Archival Board",
    },
    {
      id: "3",
      title: "Die-Cut Commercial Sticker Mounting",
      category: "Sticker Pasting",
      description: "High-tack promotional vinyl mounted cleanly onto sunboard backer.",
      image: "/images/gallery/sticker-application.jpg",
      alt: "Professional sticker sheet application",
      caliperOrSize: "Gloss Vinyl • Release Liner",
    },
    {
      id: "4",
      title: "FMCG Carton Outer Box Labeling",
      category: "Label Pasting",
      description: "Centered retail carton label pasting with smooth scratch-free matte finish.",
      image: "/images/gallery/packaging-labels.jpg",
      alt: "Product boxes with pasted labels",
      caliperOrSize: "Full Wrap • 120 GSM",
    },
    {
      id: "5",
      title: "Retail POS Countertop Showcard",
      category: "Promotional Pasting",
      description: "Tabletop marketing display with sturdy easel stand and double-sided lamination.",
      image: "/images/gallery/promotional-displays.jpg",
      alt: "Promotional POP marketing boards",
      caliperOrSize: "Kappa Board • 3.0mm",
    },
    {
      id: "6",
      title: "Bulk Seasonal Palletized Calendar Dispatch",
      category: "Bulk Production",
      description: "High-volume Tamil calendar order shrink-wrapped and staged for statewide distribution.",
      image: "/images/gallery/bulk-production-pallets.jpg",
      alt: "Pallets of pasted calendars ready for delivery",
      caliperOrSize: "50,000 Units • 48hr Run",
    },
    {
      id: "7",
      title: "Micro-Tolerance Caliper Bonding",
      category: "Precision Engineering",
      description: "Calibrated hydraulic compression achieving 0.003mm planar tolerance.",
      image: "/images/gallery/macro-precision-bonding.jpg",
      alt: "Digital micrometer verification on pasted board edge",
      caliperOrSize: "0.003mm Tolerance",
    },
    {
      id: "8",
      title: "Manual Inspection & Verification",
      category: "Quality Assurance",
      description: "Hands-on registration audit on finished calendar print runs.",
      image: "/images/gallery/craftsmanship-inspection.jpg",
      alt: "Plant manager inspecting calendar print registration",
      caliperOrSize: "Zero Offset Standard",
    },
  ],

  industries: [
    {
      id: "calendar-publishers",
      name: "Calendar & Press Publishers",
      headline: "Tamil & English Daily/Monthly Runs",
      description:
        "High-speed mounting for New Year and festival calendar editions with automated tinning and eyeleting.",
      image: "/images/industries/education.jpg",
      alt: "Calendar and press publishing production",
      deliverables: ["Daily Tamil Calendars", "12-Sheet Monthly Planners", "Table Easels"],
    },
    {
      id: "chit-funds",
      name: "Chit Funds & Financial Firms",
      headline: "Passbooks & Ledger Backings",
      description:
        "Durable, tamper-evident savings passbooks, monthly contribution cards, and rigid client portfolios.",
      image: "/images/industries/corporate.jpg",
      alt: "Chit fund and financial corporate passbook pasting",
      deliverables: ["Chit Passbooks", "Monthly Ledger Boards", "Member Cards"],
    },
    {
      id: "retail",
      name: "Retail & FMCG Brands",
      headline: "Product Labels & Outer Packaging",
      description:
        "High-volume carton labeling, jar stickers, promo packaging blanks, and supermarket shelf wobblers.",
      image: "/images/industries/retail.jpg",
      alt: "Retail packaging labels and promotional material pasting",
      deliverables: ["Carton Labels", "Retail Stickers", "Header Cards"],
    },
    {
      id: "manufacturing",
      name: "Industrial & Manufacturing",
      headline: "Durable Compliance & Box Labels",
      description:
        "Heavy-duty barcode labels, machine rating plates, and rigid outer crate identification pasting.",
      image: "/images/industries/manufacturing.jpg",
      alt: "Industrial manufacturing box pasting and pallet identification",
      deliverables: ["Rigid Outer Cartons", "Compliance Labels", "Drum Labels"],
    },
    {
      id: "events",
      name: "Events & Exhibitions",
      headline: "Standees & Directional Displays",
      description:
        "Trade show booth showcards, entrance easel standees, delegate badges, and exhibition venue signage.",
      image: "/images/industries/events.jpg",
      alt: "Event promotional standees and exhibition board pasting",
      deliverables: ["Show Standees", "Venue Danglers", "Sponsorship Showcards"],
    },
    {
      id: "agencies",
      name: "Advertising & POS Agencies",
      headline: "Point-of-Sale (POS) Collateral",
      description:
        "Fast-turnaround POS kits, retail display units, seasonal sales danglers, and branded marketing giveaways.",
      image: "/images/industries/agencies.jpg",
      alt: "Agency POS marketing displays and die cut stickers",
      deliverables: ["Floor Standees", "Counter Displays", "Promotional Kits"],
    },
    {
      id: "small-business",
      name: "Boutique & Artisan Brands",
      headline: "Agile Runs & Branded Seals",
      description:
        "Low-minimum label application for boutique food brands, local cosmetics, artisans, and packaging startups.",
      image: "/images/industries/small-business.jpg",
      alt: "Small business artisanal packaging and sticker pasting",
      deliverables: ["Boutique Jar Labels", "Branded Box Seals", "Thank-You Cards"],
    },
    {
      id: "local-business",
      name: "Tamil Nadu Commercial Printers",
      headline: "Subcontract Pasting Partner",
      description:
        "Trusted post-press contract pasting for Sivakasi, Madurai, and Chennai printers during seasonal capacity overflow.",
      image: "/images/industries/local-business.jpg",
      alt: "Traditional Tamil calendar pasting for local merchants",
      deliverables: ["Capacity Overflow Runs", "Emergency Dispatch", "Contract Rimming"],
    },
  ],

  quality: {
    badge: "Master Finishing Standards",
    heading: "The Art of Micro-Tolerance Pasting.",
    subheading:
      "Beneath every pristine calendar sheet and bonded chit book lies a stringent protocol of adhesive chemistry, roller tension, and optical verification.",
    image: "/images/quality/precision-macro.jpg",
    imageAlt: "Close up digital micrometer measuring edge tolerance of pasted boards",
    features: [
      {
        title: "Hydraulic Multi-Roller Compression",
        description:
          "Progressive pressure rollers distribute adhesive evenly from edge to edge, expelling all trapped air bubbles before curing.",
      },
      {
        title: "Climate-Equilibrated Adhesives",
        description:
          "Specially formulated pH-neutral glue balanced for Southern India's seasonal humidity to prevent warping or edge lifting.",
      },
      {
        title: "Laser-Checked Registration",
        description:
          "Optical alignment jigs guarantee that every calendar header and chit book edge sits parallel to within fractions of a millimeter.",
      },
      {
        title: "Moisture-Barrier Shrink Packaging",
        description:
          "Orders are sealed in heavy protective barrier film and secured with edge guards to ensure zero transit warp.",
      },
    ],
    stats: [
      { value: "0.003mm", label: "Planar Edge Tolerance" },
      { value: "100%", label: "Defect-Free Standard" },
      { value: "100,000+", label: "Units Daily Run Capacity" },
      { value: "24h", label: "Express Turnaround Available" },
    ],
  },

  testimonials: [
    {
      id: "1",
      clientName: "S. Murugan",
      role: "Production Director",
      company: "Sri Meenakshi Commercial Printers",
      location: "Sivakasi, Tamil Nadu",
      rating: 5,
      review:
        "During our peak Diwali and New Year calendar season, Aadhi Pasting handled over 250,000 daily calendar sheets for us without a single warped board or misaligned header. Their delivery timeline saved our publication schedule.",
      serviceUsed: "Bulk Calendar Pasting & Tinning",
    },
    {
      id: "2",
      clientName: "R. Venkatesh",
      role: "Managing Director",
      company: "Sri Lakshmi Chit Funds & Investments",
      location: "Madurai, Tamil Nadu",
      rating: 5,
      review:
        "Our monthly chit fund passbooks and customer ledger cards require heavy board backing that can withstand years of frequent handling. Aadhi Pasting's rigid binding is the finest we've seen in Tamil Nadu.",
      serviceUsed: "Chits Passbook & Card Binding",
    },
    {
      id: "3",
      clientName: "Karthik R.",
      role: "Brand Operations Manager",
      company: "Apex FMCG Pack Solutions",
      location: "Chennai, Tamil Nadu",
      rating: 5,
      review:
        "The label and sticker pasting quality on our rigid product packaging cartons is remarkable. Perfectly centered, zero bubbling, and the turnarounds are consistently ahead of schedule.",
      serviceUsed: "Label & Carton Application",
    },
    {
      id: "4",
      clientName: "Anandhi Natarajan",
      role: "Creative Partner",
      company: "Velan Creative Media & POS",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      review:
        "For our retail client showcards and hanging danglers, the board rigidity and clean edge beveling were top-tier. Finding a reliable pasting specialist in Tamil Nadu has elevated our entire client offering.",
      serviceUsed: "Promotional POS Pasting",
    },
  ],

  cta: {
    heading: "Ready for Impeccable Calendar & Chits Pasting?",
    subtext:
      "Transform your printed sheets into rigid, pristine products that command respect. Fast quotations, prototype sample evaluations, and high-volume scheduling ready.",
    primaryBtn: "Request a Fast Quotation",
    secondaryBtn: "Chat on WhatsApp",
    bgImage: "/images/roses/rose-backdrop.jpg",
    phoneHighlight: "+91 90808 67822",
  },
};
