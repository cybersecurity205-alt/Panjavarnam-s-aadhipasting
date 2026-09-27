export interface SiteConfig {
  name: string;
  legalName: string;
  domain: string;
  url: string;
  tagline: string;
  subtitle: string;
  description: string;
  services: {
    title: string;
    description: string;
  }[];
  contact: {
    email: string;
    phone: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    hours: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Aadhi Pasting",
  legalName: "Aadhi Pasting Solutions",
  domain: "aadhipasting.com",
  url: "https://aadhipasting.com",
  tagline: "Artisanal Calendar Pasting & Chits Book Finishing",
  subtitle: "Premium Calendar Mounting, Chits Binding & Rigid Board Solutions",
  description:
    "Aadhi Pasting is a premier post-press finishing house specializing in Tamil & English daily calendar mounting, monthly wall calendars with tinning, chits fund passbook & ledger pasting, rigid chipboard lining, and high-volume commercial production across Tamil Nadu.",
  services: [
    {
      title: "Calendar Pasting & Tinning",
      description:
        "High-precision daily Tamil/English calendar mounting, monthly tear-offs, and wall calendars with reinforced tinning headers and anti-curling adhesive.",
    },
    {
      title: "Chits Business Pasting & Binding",
      description:
        "Specialized monthly chit passbooks, collection ledger pasting, member cards, and tamper-resistant rigid backboard mounting.",
    },
    {
      title: "Rigid Chipboard & Greyboard Mounting",
      description:
        "High-caliper (1.5mm - 4.0mm) industrial greyboard lining, pasting, and lamination engineered for zero warping and lifelong durability.",
    },
    {
      title: "Commercial Sticker & Vinyl Pasting",
      description:
        "Hydraulic bubble-free roller application of die-cut stickers and printed adhesive vinyl onto rigid sunboard and foam sheets.",
    },
    {
      title: "FMCG Carton & Box Label Pasting",
      description:
        "Precision centered label application for retail packaging boxes, jars, and luxury product outer cartons.",
    },
    {
      title: "Bulk Publishing Production",
      description:
        "High-capacity automated processing lines designed to produce over 100,000 sheets daily for commercial printers and publishers.",
    },
  ],
  contact: {
    email: "contact@aadhipasting.com",
    phone: "+91 90808 67822",
    address: {
      line1: "Plot No. 42, Industrial Estate Road",
      line2: "Near Sivakasi / Chennai Industrial Corridor",
      city: "Sivakasi & Chennai",
      state: "Tamil Nadu",
      country: "India",
      postalCode: "626123",
    },
    hours: "Monday - Saturday: 8:30 AM - 8:30 PM",
  },
};
