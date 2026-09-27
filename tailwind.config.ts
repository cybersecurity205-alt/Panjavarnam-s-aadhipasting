import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Quiet Luxury Automotive Showroom & Atelier Palette
        brand: {
          bg: "#FAF7F2", // Primary Warm Ivory / Alabaster
          blush: "#F4EFE6", // Secondary Warm Champagne Surface
          rose: "#55122C", // Signature Deep Burgundy
          deep: "#3D0C20", // Deepest Velvet Burgundy
          dark: "#1A040D", // Obsidian Midnight Burgundy
          border: "rgba(197, 160, 89, 0.22)", // Subtle Metallic Hairline Border
        },
        burgundy: {
          950: "#14030A", // Showroom Obsidian Black-Burgundy
          900: "#1A040D", // Midnight Burgundy
          850: "#2B0715", // Deep Velvet Burgundy
          800: "#3D0C20", // Regal Dark Burgundy
          700: "#55122C", // Brand Primary Burgundy
          600: "#6E183A", // Rich Burgundy Satin
          500: "#8C224D", // Accent Burgundy
          400: "#A83E6A",
          300: "#C96790",
          200: "#E5A4BF",
          100: "#F4D2E1",
          50: "#FBF0F5",
          DEFAULT: "#55122C",
        },
        gold: {
          50: "#FDFCF9",
          100: "#FAF6EE",
          200: "#F3E8CE",
          300: "#E5D0A1",
          400: "#D4B870",
          500: "#C5A059", // Signature Polished Champagne Gold
          600: "#A88440",
          700: "#86682D",
          800: "#654E20",
          900: "#443414",
          DEFAULT: "#C5A059",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#FAF7F2", // Showroom Alabaster / Warm Ivory
          200: "#F4EFE6", // Champagne Tinted Surface
          300: "#EBE3D5", // Subtle Divider Tone
          400: "#D8CDBA",
          500: "#B8AA94",
          DEFAULT: "#FAF7F2",
        },
        charcoal: {
          950: "#0D0C0E",
          900: "#161518",
          800: "#232126", // Primary Editorial Charcoal
          700: "#3B3840", // Secondary Body
          600: "#595561", // Muted Explanatory
          500: "#7D7886", // Metadata
          400: "#A5A0AE",
          300: "#CBC7D2",
          200: "#E5E3E9",
          DEFAULT: "#232126",
        },
        // Compatibility aliases for existing components
        blush: {
          50: "#FAF7F2",
          100: "#FAF7F2",
          200: "#F4EFE6",
          300: "#EBE3D5",
          400: "#D8CDBA",
          500: "#55122C",
          600: "#3D0C20",
          700: "#2B0715",
          800: "#1A040D",
          900: "#14030A",
          btn: "#55122C",
          btnhov: "#3D0C20",
          DEFAULT: "#FAF7F2",
        },
        rose: {
          50: "#FAF7F2",
          100: "#FAF7F2",
          200: "#F4EFE6",
          300: "#E5D0A1",
          400: "#A83E6A",
          500: "#55122C",
          600: "#3D0C20",
          700: "#2B0715",
          800: "#1A040D",
          DEFAULT: "#55122C",
        },
        crimson: {
          DEFAULT: "#55122C",
          900: "#1A040D",
          800: "#3D0C20",
          700: "#55122C",
          600: "#6E183A",
          500: "#8C224D",
        },
        rosered: {
          DEFAULT: "#55122C",
          700: "#3D0C20",
          600: "#55122C",
          500: "#6E183A",
          400: "#A83E6A",
        },
        ruby: {
          DEFAULT: "#55122C",
          700: "#3D0C20",
          600: "#55122C",
          500: "#6E183A",
          400: "#A83E6A",
        },
        navy: {
          950: "#14030A",
          900: "#1A040D",
          800: "#232126",
          DEFAULT: "#232126",
        },
        brandorange: {
          DEFAULT: "#C5A059",
          500: "#C5A059",
        },
        brandamber: {
          DEFAULT: "#C5A059",
          500: "#C5A059",
        },
      },
      fontFamily: {
        serif: [
          '"Playfair Display"',
          '"Cormorant Garamond"',
          "Georgia",
          "serif",
        ],
        sans: [
          "Poppins",
          "Lato",
          '"Plus Jakarta Sans"',
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(26, 4, 13, 0.04)",
        card: "0 4px 24px -2px rgba(26, 4, 13, 0.05), 0 1px 2px rgba(26, 4, 13, 0.02)",
        "card-hover": "0 16px 40px -8px rgba(61, 12, 32, 0.12), 0 2px 6px rgba(26, 4, 13, 0.04)",
        "card-gold": "0 10px 30px -5px rgba(197, 160, 89, 0.15), 0 0 0 1px rgba(197, 160, 89, 0.25)",
        "glow-rose": "0 10px 30px -4px rgba(85, 18, 44, 0.35)",
        "liquid-pill": "0 2px 8px rgba(26, 4, 13, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        "liquid-nav": "0 10px 35px 0 rgba(20, 3, 10, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)",
        "liquid-nav-scrolled": "0 16px 44px -4px rgba(15, 2, 8, 0.65), inset 0 1px 1px 0 rgba(255, 255, 255, 0.18)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
