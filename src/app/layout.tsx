import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { OfferBanner } from "@/components/layout/OfferBanner";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { siteContent } from "@/data/siteContent";

export const viewport: Viewport = {
  themeColor: "#14030A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aadhi Pasting | Artisanal Calendar Pasting & Finishing",
  description:
    "Aadhi Pasting is a premier post-press finishing house in Tamil Nadu specializing in daily & monthly calendar mounting with tinning, chits fund passbook & ledger pasting, rigid chipboard lining, and high-volume commercial production.",
  metadataBase: new URL("https://aadhipasting.com"),
  keywords: [
    "Aadhi Pasting",
    "Calendar Pasting Tamil Nadu",
    "Chits Pasting and Binding",
    "Chit Fund Passbook Binding",
    "Daily Calendar Pasting Sivakasi",
    "Monthly Wall Calendar Pasting Chennai",
    "Calendar Tinning and Eyeleting",
    "Rigid Chipboard Mounting",
    "Greyboard Lining",
    "Commercial Sticker Pasting",
    "Product Label Pasting",
    "Post-press Finishing Services",
  ],
  authors: [{ name: "Aadhi Pasting", url: "https://aadhipasting.com" }],
  creator: "Aadhi Pasting",
  publisher: "Aadhi Pasting",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aadhipasting.com",
    title: "Aadhi Pasting | Artisanal Calendar Pasting & Finishing",
    description:
      "Precision calendar mounting, chit fund passbook binding, and rigid chipboard solutions for businesses that value quality, durability, and on-time delivery.",
    siteName: "Aadhi Pasting",
    images: [
      {
        url: "/images/blush/hero-calendar-desk.jpg",
        width: 1200,
        height: 630,
        alt: "Aadhi Pasting Elegant Blush Calendar Exhibition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadhi Pasting | Artisanal Calendar Pasting & Finishing",
    description:
      "Precision calendar mounting, chit fund passbook binding, and promotional board pasting solutions.",
    images: ["/images/blush/hero-calendar-desk.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Aadhi Pasting",
    image: "https://aadhipasting.com/images/blush/hero-calendar-desk.jpg",
    "@id": "https://aadhipasting.com",
    url: "https://aadhipasting.com",
    telephone: siteContent.contact.phone,
    email: siteContent.contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContent.contact.address.street,
      addressLocality: siteContent.contact.address.city,
      addressRegion: siteContent.contact.address.state,
      postalCode: siteContent.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.4533,
      longitude: 77.7947,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:30",
      closes: "20:30",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Calendar & Chits Pasting Services",
      itemListElement: siteContent.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.shortDesc,
        },
      })),
    },
  };

  return (
    <html lang="en" className="scroll-smooth bg-[#FAF7F2]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#232126] font-sans flex flex-col selection:bg-[#55122C]/15 selection:text-[#55122C] relative">
        <CartProvider>
          <OfferBanner />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
