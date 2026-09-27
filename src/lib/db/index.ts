import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  AdminUser,
  AdminSession,
  Category,
  Product,
  Enquiry,
  Order,
  Offer,
  GalleryItemRecord,
  WebsiteContent,
  BusinessSettings,
} from "./types";
import { siteContent } from "@/data/siteContent";
import { siteConfig } from "@/data/siteConfig";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import {
  mapDbProductToProduct,
  mapProductToDbProduct,
  mapDbOrderToOrder,
  mapOrderToDbOrder,
  mapItemToDbOrderItem,
} from "@/lib/supabase/mappers";

const DATA_DIR = path.join(process.cwd(), "data");

// Helper to ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Atomic file writer
function writeJsonAtomic(filePath: string, data: any) {
  ensureDataDir();
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

// Safe file reader with fallback
function readJsonSafe<T>(filePath: string, fallback: T): T {
  ensureDataDir();
  try {
    if (!fs.existsSync(filePath)) {
      writeJsonAtomic(filePath, fallback);
      return fallback;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

// File paths
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const OFFERS_FILE = path.join(DATA_DIR, "offers.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

// Initial Seeding Logic
function hashPasswordInternal(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { salt, hash };
}

// 1. Initial Admin
function seedAdmin(): AdminUser[] {
  const defaultPassword = process.env.ADMIN_PASSWORD || "AadhiAdmin2026!";
  const { salt, hash } = hashPasswordInternal(defaultPassword);
  return [
    {
      id: "admin-1",
      email: process.env.ADMIN_EMAIL || "admin@aadhipasting.com",
      name: "Aadhi Pasting Administrator",
      role: "super_admin",
      passwordHash: hash,
      passwordSalt: salt,
      createdAt: new Date().toISOString(),
    },
  ];
}

// 2. Initial Categories
function seedCategories(): Category[] {
  return [
    {
      id: "cat-wall-calendars",
      name: "Wall Calendars",
      slug: "wall-calendars",
      tag: "High Volume",
      description: "Multi-sheet monthly wall planners with reinforced tinning strips and hanging eyelets.",
      image: "/images/blush/cat-wall-calendar.jpg",
      displayOrder: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cat-monthly-calendars",
      name: "Monthly Calendars",
      slug: "monthly-calendars",
      tag: "Desk & Office",
      description: "Wire-o spiral desktop calendars mounted on stiff, perfectly flat kappa board.",
      image: "/images/blush/cat-monthly-calendar.jpg",
      displayOrder: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cat-corporate-calendars",
      name: "Corporate Calendars",
      slug: "corporate-calendars",
      tag: "Executive Series",
      description: "Easel-stand branded triangle calendars with elegant foil stamping and custom finishing.",
      image: "/images/blush/cat-corporate-calendar.jpg",
      displayOrder: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cat-religious-calendars",
      name: "Religious Calendars",
      slug: "religious-calendars",
      tag: "Artisanal Edition",
      description: "Tamil daily tear-off calendar blocks mounted onto high-caliper greyboard backings.",
      image: "/images/blush/cat-devotional-calendar.jpg",
      displayOrder: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cat-custom-designs",
      name: "Custom Designs & Chits",
      slug: "custom-designs",
      tag: "Bespoke & Chits",
      description: "Specialized chit fund passbooks, collection cards, and personalized embossed binding.",
      image: "/images/blush/cat-custom-designs.jpg",
      displayOrder: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

// 3. Initial Products
function seedProducts(): Product[] {
  return [
    {
      id: "prod-1",
      name: "Daily Tamil Calendar Tear-Off Block (15x20 in)",
      slug: "daily-tamil-calendar-tear-off-block",
      sku: "AP-CAL-001",
      categoryId: "cat-religious-calendars",
      categoryName: "Religious Calendars",
      description: "Complete mounting of 365-day Tamil & English tear-off daily calendar blocks onto 2.0mm high-caliper greyboard backing with precision tinning rim and hanging loop.",
      shortDescription: "Daily 365-day tear-off calendar on 2.0mm greyboard with tinning hanger.",
      price: 45,
      salePrice: 42,
      stock: 15000,
      availability: "in_stock",
      isFeatured: true,
      isActive: true,
      image: "/images/blush/cat-devotional-calendar.jpg",
      images: ["/images/blush/cat-devotional-calendar.jpg", "/images/blush/hero-calendar-desk.jpg"],
      specs: ["Sheet Size: 15x20 in", "Board: 2.0mm High-Caliper Greyboard", "Tinning: Galvanized Steel with Hanger", "Glue: Anti-Warp pH-Neutral"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-2",
      name: "Monthly Multi-Sheet Wall Calendar with Tinning (17x27 in)",
      slug: "monthly-multi-sheet-wall-calendar",
      sku: "AP-CAL-002",
      categoryId: "cat-wall-calendars",
      categoryName: "Wall Calendars",
      description: "Reinforced tinning header mounting for 6-sheet and 12-sheet monthly wall planners. Precision eyelet punching and crimped galvanized rim prevent sheet slippage.",
      shortDescription: "6/12-sheet wall planner with metal tinning strip & eyelet hook.",
      price: 65,
      salePrice: 58,
      stock: 8000,
      availability: "in_stock",
      isFeatured: true,
      isActive: true,
      image: "/images/blush/cat-wall-calendar.jpg",
      images: ["/images/blush/cat-wall-calendar.jpg"],
      specs: ["Sheet Size: 17x27 in", "Sheets: 6 or 12 Sheets (130 GSM Art Paper)", "Rim: Heavy Gauge Tinning with Eyelet", "Tolerance: Zero Slip Calibrated"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-3",
      name: "Executive Desk Spiral Calendar on Rigid Easel Stand",
      slug: "executive-desk-spiral-calendar",
      sku: "AP-DSK-003",
      categoryId: "cat-monthly-calendars",
      categoryName: "Monthly Calendars",
      description: "Wire-O spiral bound desk planner mounted onto sturdy 2.5mm Kappa triangular easel board. Includes luxury matte lamination and optional gold foil branding.",
      shortDescription: "Triangular easel desk calendar with Wire-O binding and rigid Kappa board.",
      price: 110,
      salePrice: 95,
      stock: 5000,
      availability: "in_stock",
      isFeatured: true,
      isActive: true,
      image: "/images/blush/cat-monthly-calendar.jpg",
      images: ["/images/blush/cat-monthly-calendar.jpg", "/images/blush/hero-calendar-desk.jpg"],
      specs: ["Base Size: 8.5x6 in", "Board: 2.5mm Rigid Kappa Easel Stand", "Binding: Double Wire-O Twin Loop", "Finish: Velvet Touch Lamination"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-4",
      name: "Corporate Triangle Easel Calendar with Foil Accents",
      slug: "corporate-triangle-easel-calendar",
      sku: "AP-CORP-004",
      categoryId: "cat-corporate-calendars",
      categoryName: "Corporate Calendars",
      description: "Artisanal corporate calendar created for banks, IT companies, and corporate gifting. Features gold-foil embossed header, monthly tabs, and anti-scuff varnish.",
      shortDescription: "Corporate tent calendar with gold foil hot-stamping and custom tabs.",
      price: 135,
      salePrice: 120,
      stock: 3500,
      availability: "in_stock",
      isFeatured: true,
      isActive: true,
      image: "/images/blush/cat-corporate-calendar.jpg",
      images: ["/images/blush/cat-corporate-calendar.jpg"],
      specs: ["Dimensions: 9x7 in", "Board: 3.0mm Imported Rigid Greyboard", "Embossing: Hot Foil Stamped Logo", "Dispatch: Individual Shrink Polybags"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-5",
      name: "Reinforced Chit Fund Monthly Savings Passbook",
      slug: "reinforced-chit-fund-passbook",
      sku: "AP-CHT-005",
      categoryId: "cat-custom-designs",
      categoryName: "Custom Designs & Chits",
      description: "Heavy-duty chit fund customer passbook with cloth-hinged spine reinforcement, tamper-evident security glue, and high-density greyboard cover lamination.",
      shortDescription: "Cloth-reinforced rigid chit passbook with tamper-evident binding.",
      price: 28,
      stock: 25000,
      availability: "in_stock",
      isFeatured: true,
      isActive: true,
      image: "/images/blush/cat-custom-designs.jpg",
      images: ["/images/blush/cat-custom-designs.jpg"],
      specs: ["Size: 4.5x7 in", "Cover: 1.5mm - 2.0mm Laminated Greyboard", "Spine: Heavy Woven Linen Cloth Reinforcement", "Security: Tamper-Resistant Adhesive Bond"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-6",
      name: "Chit Collection Monthly Ledger Card & Jacket",
      slug: "chit-collection-ledger-card",
      sku: "AP-CHT-006",
      categoryId: "cat-custom-designs",
      categoryName: "Custom Designs & Chits",
      description: "Durable monthly installment tracking card pasted onto rigid greyboard slipcovers. Built to withstand daily field collection handling by agents for up to 3 years.",
      shortDescription: "Daily field agent collection card with stiff protective slipcover.",
      price: 18,
      stock: 40000,
      availability: "in_stock",
      isFeatured: false,
      isActive: true,
      image: "/images/gallery/custom-rigid-binding.jpg",
      images: ["/images/gallery/custom-rigid-binding.jpg"],
      specs: ["Card Caliper: 400 GSM Rigid Card", "Jacket: 1.8mm Laminated Kappa", "Grid: 25/50 Monthly Payment Matrix", "Durability: Water-Resistant Outer Wrap"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-7",
      name: "Bespoke Botanical Calendar on Wooden Stand",
      slug: "bespoke-botanical-calendar-wooden-stand",
      sku: "AP-BES-007",
      categoryId: "cat-corporate-calendars",
      categoryName: "Corporate Calendars",
      description: "Artisanal floral monthly sheets on textured cotton paper mounted on a natural beechwood desk block with brass calendar binder pin.",
      shortDescription: "Botanical calendar with natural wood desk stand and textured art paper.",
      price: 240,
      salePrice: 199,
      stock: 1200,
      availability: "in_stock",
      isFeatured: true,
      isActive: true,
      image: "/images/blush/vision-calendar-desk.jpg",
      images: ["/images/blush/vision-calendar-desk.jpg"],
      specs: ["Sheet Size: 6x8 in", "Paper: 280 GSM Cotton Felt Texture", "Stand: Natural Beechwood Base", "Finishing: Hand-Clipped Brass Pin"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

// 4. Initial Enquiries
function seedEnquiries(): Enquiry[] {
  return [
    {
      id: "enq-101",
      enquiryNumber: "ENQ-2026-001",
      name: "Sundaramurthy M.",
      phone: "+91 94431 88920",
      email: "sundar@sivakasipress.in",
      service: "Calendar Pasting & Tinning",
      quantity: "15,000 Calendars",
      message: "Need 15,000 Daily Tamil calendars pasted on 2.0mm greyboard with galvanized tinning headers for Diwali 2026 release. Delivery to Sivakasi hub.",
      status: "quoted",
      notes: "Quote sent at ₹41/unit with tinning. Client awaiting sample approval on Tuesday.",
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "enq-102",
      enquiryNumber: "ENQ-2026-002",
      name: "Karthikeyan Radhakrishnan",
      phone: "+91 98410 44552",
      email: "karthik@chennaichits.com",
      service: "Chits Business Pasting & Binding",
      quantity: "5,000 Passbooks",
      message: "Looking for 5,000 hardbound 25-month installment passbooks with linen cloth spine reinforcement. Dispatch to Chennai Mount Road branch.",
      status: "new",
      notes: "High priority lead. Need to send physical passbook sample via courier.",
      createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    },
    {
      id: "enq-103",
      enquiryNumber: "ENQ-2026-003",
      name: "Anandhi Venkataraman",
      phone: "+91 97900 12345",
      email: "procurement@coimbatorediary.co",
      service: "Corporate Calendars",
      quantity: "2,500 Desk Planners",
      message: "Custom easel desk calendars with gold foil stamped logo on header. Require sample mock-up.",
      status: "in_progress",
      notes: "Artwork received. Prototype pressing scheduled for tomorrow.",
      createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    },
  ];
}

// 5. Initial Orders
function seedOrders(): Order[] {
  return [
    {
      id: "ord-201",
      orderNumber: "ORD-2026-001",
      customerName: "Sree Meenakshi Offset Printers",
      phone: "+91 98421 99881",
      email: "orders@meenakshioffset.com",
      address: "142 Kamarajar Road, Sivakasi, Tamil Nadu - 626123",
      items: [
        {
          productId: "prod-1",
          name: "Daily Tamil Calendar Tear-Off Block (15x20 in)",
          sku: "AP-CAL-001",
          quantity: 5000,
          price: 42,
        },
      ],
      totalAmount: 210000,
      status: "processing",
      notes: "First batch of 2,500 units dispatched via Sivakasi logistics truck.",
      createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: "ord-202",
      orderNumber: "ORD-2026-002",
      customerName: "Venkateshwara Benefit Chits Ltd",
      phone: "+91 98401 55667",
      email: "admin@vbchits.in",
      address: "88 Anna Salai, Chennai, Tamil Nadu - 600002",
      items: [
        {
          productId: "prod-5",
          name: "Reinforced Chit Fund Monthly Savings Passbook",
          sku: "AP-CHT-005",
          quantity: 2000,
          price: 28,
        },
      ],
      totalAmount: 56000,
      status: "delivered",
      notes: "Full consignment delivered and receipt confirmed by store manager.",
      createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    },
  ];
}

// 6. Initial Offers
function seedOffers(): Offer[] {
  return [
    {
      id: "offer-1",
      title: "Diwali & New Year 2026 Advance Calendar Booking",
      description: "Book high-volume daily tear-offs or wall calendar tinning in advance and get an exclusive 10% volume rebate with zero-delay delivery guarantee.",
      bannerImage: "/images/blush/hero-calendar-desk.jpg",
      discountPercentage: 10,
      discountCode: "FESTIVAL2026",
      startDate: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString().split("T")[0],
      endDate: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString().split("T")[0],
      destinationUrl: "/contact#quote",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

// 7. Initial Gallery
function seedGallery(): GalleryItemRecord[] {
  return siteContent.gallery.map((item, idx) => ({
    id: item.id || `gal-${idx + 1}`,
    title: item.title,
    category: item.category,
    description: item.description,
    image: item.image,
    alt: item.alt,
    caliperOrSize: item.caliperOrSize,
    displayOrder: idx + 1,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

// 8. Initial Content
function seedContent(): WebsiteContent {
  return {
    hero: {
      badge: "AADHI PASTING • ARTISANAL CALENDAR FINISHING",
      headline: "Beautiful Calendars",
      highlight: "for Every Moment",
      subheadline:
        "Elevate your year with finely crafted calendars. From authentic Tamil & English daily tear-offs to luxury corporate desk planners, we combine precision board mounting, zero-warp adhesive technology, and seamless tinning.",
      primaryCtaText: "Shop Now",
      secondaryCtaText: "Explore Designs",
      image: "/images/blush/hero-calendar-desk.jpg",
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
    },
    vision: {
      badge: "Bespoke Craftsmanship",
      heading: "Your Vision,",
      highlight: "Our Creative Touch",
      description:
        "At Aadhi Pasting, every calendar represents a harmonious balance of precision mechanical engineering and delicate artisanal aesthetics. Whether you require custom corporate calendars with gold foil accents or high-volume Tamil daily tear-offs, our automated lines ensure pristine flatness and lifelong durability.",
      points: [
        "High-Caliper Greyboard: 1.5mm to 4.0mm heavy board backing calibrated for zero warping in all humidity conditions.",
        "Hydraulic Roller Planar Bonding: Bubble-free, wrinkle-free adhesive distribution on every sheet.",
        "Complete Customization: Custom die-cutting, rust-resistant metal tinning, brass eyelets, and wire-o binding.",
      ],
      image: "/images/blush/vision-calendar-desk.jpg",
    },
    stats: [
      { value: "100,000+", label: "Daily Sheets Pasting Capacity" },
      { value: "30+ Years", label: "Sivakasi & Chennai Finishing Legacy" },
      { value: "100%", label: "Zero-Warp Anti-Curling Guarantee" },
      { value: "500+", label: "Commercial Printers & Corporate Clients" },
    ],
    updatedAt: new Date().toISOString(),
  };
}

// 9. Initial Settings
function seedSettings(): BusinessSettings {
  return {
    brandName: siteConfig.name,
    legalName: siteConfig.legalName,
    tagline: siteConfig.tagline,
    phone: siteConfig.contact.phone,
    phoneDisplay: siteConfig.contact.phone,
    whatsapp: "919080867822",
    whatsappDisplay: "+91 90808 67822",
    whatsappMessage: "Hello Aadhi Pasting, I would like to inquire about calendar pasting and chit book binding.",
    email: siteConfig.contact.email,
    address: {
      street: siteConfig.contact.address.line1,
      area: siteConfig.contact.address.line2,
      city: siteConfig.contact.address.city,
      state: siteConfig.contact.address.state,
      country: siteConfig.contact.address.country,
      pincode: siteConfig.contact.address.postalCode,
    },
    workingHours: siteConfig.contact.hours,
    socialLinks: {
      facebook: "https://facebook.com/aadhipasting",
      instagram: "https://instagram.com/aadhipasting",
      linkedin: "https://linkedin.com/company/aadhipasting",
    },
    updatedAt: new Date().toISOString(),
  };
}

// --- PUBLIC DB ACCESSORS ---

// Admin Users
export async function getAdminUsers(): Promise<AdminUser[]> {
  return readJsonSafe<AdminUser[]>(ADMIN_FILE, seedAdmin());
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find((u) => u.id === id) || null;
}

export async function saveAdminUser(user: AdminUser): Promise<void> {
  const users = await getAdminUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.push(user);
  }
  writeJsonAtomic(ADMIN_FILE, users);
}

// Sessions
export async function getSessions(): Promise<AdminSession[]> {
  return readJsonSafe<AdminSession[]>(SESSIONS_FILE, []);
}

export async function getSession(token: string): Promise<AdminSession | null> {
  const sessions = await getSessions();
  return sessions.find((s) => s.token === token) || null;
}

export async function saveSession(session: AdminSession): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.token === session.token);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.push(session);
  }
  writeJsonAtomic(SESSIONS_FILE, sessions);
}

export async function deleteSession(token: string): Promise<void> {
  const sessions = await getSessions();
  const filtered = sessions.filter((s) => s.token !== token);
  writeJsonAtomic(SESSIONS_FILE, filtered);
}

export async function cleanExpiredSessions(): Promise<void> {
  const sessions = await getSessions();
  const now = new Date();
  const active = sessions.filter((s) => new Date(s.expiresAt) > now);
  if (active.length !== sessions.length) {
    writeJsonAtomic(SESSIONS_FILE, active);
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const categories = readJsonSafe<Category[]>(CATEGORIES_FILE, seedCategories());
  return categories.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.id === id) || null;
}

export async function saveCategory(category: Category): Promise<Category> {
  const categories = await getCategories();
  const now = new Date().toISOString();
  const idx = categories.findIndex((c) => c.id === category.id);
  if (idx >= 0) {
    categories[idx] = { ...category, updatedAt: now };
  } else {
    categories.push({ ...category, createdAt: category.createdAt || now, updatedAt: now });
  }
  writeJsonAtomic(CATEGORIES_FILE, categories);
  return category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const categories = await getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length !== categories.length) {
    writeJsonAtomic(CATEGORIES_FILE, filtered);
    return true;
  }
  return false;
}

// Products
export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(mapDbProductToProduct);
      }
      if (error) {
        console.warn("Supabase getProducts error, using fallback:", error.message);
      }
    } catch (err) {
      console.warn("Supabase getProducts exception, using fallback:", err);
    }
  }
  return readJsonSafe<Product[]>(PRODUCTS_FILE, seedProducts());
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        return mapDbProductToProduct(data);
      }
    } catch (err) {
      console.warn("Supabase getProductById exception, using fallback:", err);
    }
  }
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        return mapDbProductToProduct(data);
      }
    } catch (err) {
      console.warn("Supabase getProductBySlug exception, using fallback:", err);
    }
  }
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function saveProduct(product: Product): Promise<Product> {
  const now = new Date().toISOString();
  const updatedProduct: Product = {
    ...product,
    createdAt: product.createdAt || now,
    updatedAt: now,
  };

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const dbRow = mapProductToDbProduct(updatedProduct);
      const { error } = await supabase
        .from("products")
        .upsert(dbRow, { onConflict: "id" });

      if (error) {
        console.warn("Supabase saveProduct error, syncing locally:", error.message);
      }
    } catch (err) {
      console.warn("Supabase saveProduct exception, syncing locally:", err);
    }
  }

  const products = readJsonSafe<Product[]>(PRODUCTS_FILE, seedProducts());
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = updatedProduct;
  } else {
    products.push(updatedProduct);
  }
  writeJsonAtomic(PRODUCTS_FILE, products);
  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase deleteProduct exception:", err);
    }
  }

  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length !== products.length) {
    writeJsonAtomic(PRODUCTS_FILE, filtered);
    return true;
  }
  return false;
}

// Enquiries
export async function getEnquiries(): Promise<Enquiry[]> {
  const enquiries = readJsonSafe<Enquiry[]>(ENQUIRIES_FILE, seedEnquiries());
  return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const enquiries = await getEnquiries();
  return enquiries.find((e) => e.id === id) || null;
}

export async function createEnquiry(enquiry: Omit<Enquiry, "id" | "enquiryNumber" | "createdAt" | "updatedAt">): Promise<Enquiry> {
  const enquiries = await getEnquiries();
  const id = `enq-${Date.now()}`;
  const enquiryNumber = `ENQ-${new Date().getFullYear()}-${String(enquiries.length + 1).padStart(3, "0")}`;
  const now = new Date().toISOString();

  const newEnquiry: Enquiry = {
    ...enquiry,
    id,
    enquiryNumber,
    createdAt: now,
    updatedAt: now,
  };

  enquiries.unshift(newEnquiry);
  writeJsonAtomic(ENQUIRIES_FILE, enquiries);
  return newEnquiry;
}

export async function updateEnquiry(id: string, updates: Partial<Enquiry>): Promise<Enquiry | null> {
  const enquiries = await getEnquiries();
  const idx = enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  enquiries[idx] = {
    ...enquiries[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeJsonAtomic(ENQUIRIES_FILE, enquiries);
  return enquiries[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const enquiries = await getEnquiries();
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length !== enquiries.length) {
    writeJsonAtomic(ENQUIRIES_FILE, filtered);
    return true;
  }
  return false;
}

// Orders
export async function getOrders(): Promise<Order[]> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!ordersError && ordersData) {
        if (ordersData.length === 0) {
          return [];
        }

        const orderIds = ordersData.map((o) => o.id);
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*")
          .in("order_id", orderIds);

        const itemsByOrderId: Record<string, any[]> = {};
        if (!itemsError && itemsData) {
          itemsData.forEach((it: any) => {
            if (!itemsByOrderId[it.order_id]) {
              itemsByOrderId[it.order_id] = [];
            }
            itemsByOrderId[it.order_id].push(it);
          });
        }

        const mapped = ordersData.map((row) =>
          mapDbOrderToOrder(row, itemsByOrderId[row.id] || [])
        );
        return mapped;
      }
      if (ordersError) {
        console.warn("Supabase getOrders error, using fallback:", ordersError.message);
      }
    } catch (err) {
      console.warn("Supabase getOrders exception, using fallback:", err);
    }
  }

  const orders = readJsonSafe<Order[]>(ORDERS_FILE, seedOrders());
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data: orderRow, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!orderError && orderRow) {
        const { data: itemsData } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", id);

        return mapDbOrderToOrder(orderRow, itemsData || []);
      }
    } catch (err) {
      console.warn("Supabase getOrderById exception, using fallback:", err);
    }
  }

  const orders = await getOrders();
  return orders.find((o) => o.id === id) || null;
}

export async function createOrder(
  order: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt"> & {
    id?: string;
    orderNumber?: string;
    createdAt?: string;
    updatedAt?: string;
  }
): Promise<Order> {
  const existingOrders = await getOrders();
  const id = order.id || `ord-${Date.now()}`;
  const orderNumber =
    order.orderNumber ||
    `ORD-${new Date().getFullYear()}-${String(existingOrders.length + 1).padStart(3, "0")}`;
  const now = new Date().toISOString();

  const subtotal =
    order.subtotal !== undefined
      ? order.subtotal
      : order.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const newOrder: Order = {
    ...order,
    id,
    orderNumber,
    subtotal,
    discountAmount: order.discountAmount ?? 0,
    deliveryCharges: order.deliveryCharges ?? 0,
    totalAmount: order.totalAmount ?? subtotal,
    paymentMethod: order.paymentMethod || "bank_transfer",
    paymentStatus: order.paymentStatus || "pending",
    status: order.status || "pending",
    isArchived: order.isArchived ?? false,
    createdAt: order.createdAt || now,
    updatedAt: order.updatedAt || now,
  };

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const orderDbRow = mapOrderToDbOrder(newOrder);
      const { error: orderError } = await supabase
        .from("orders")
        .insert(orderDbRow);

      if (!orderError && newOrder.items.length > 0) {
        const dbItems = newOrder.items.map((it) => mapItemToDbOrderItem(newOrder.id, it));
        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(dbItems);

        if (itemsError) {
          console.warn("Supabase order_items insert error:", itemsError.message);
        }
      } else if (orderError) {
        console.warn("Supabase order insert error:", orderError.message);
      }
    } catch (err) {
      console.warn("Supabase createOrder exception:", err);
    }
  }

  const localOrders = readJsonSafe<Order[]>(ORDERS_FILE, seedOrders());
  localOrders.unshift(newOrder);
  writeJsonAtomic(ORDERS_FILE, localOrders);

  return newOrder;
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const existing = await getOrderById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const updatedOrder: Order = {
    ...existing,
    ...updates,
    id,
    updatedAt: now,
  };

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const orderDbRow = mapOrderToDbOrder(updatedOrder);
      delete orderDbRow.created_at;

      const { error } = await supabase
        .from("orders")
        .update(orderDbRow)
        .eq("id", id);

      if (error) {
        console.warn("Supabase updateOrder error:", error.message);
      }

      if (updates.items && Array.isArray(updates.items)) {
        await supabase.from("order_items").delete().eq("order_id", id);
        const newDbItems = updates.items.map((it) => mapItemToDbOrderItem(id, it));
        if (newDbItems.length > 0) {
          await supabase.from("order_items").insert(newDbItems);
        }
      }
    } catch (err) {
      console.warn("Supabase updateOrder exception:", err);
    }
  }

  const localOrders = readJsonSafe<Order[]>(ORDERS_FILE, seedOrders());
  const idx = localOrders.findIndex((o) => o.id === id);
  if (idx >= 0) {
    localOrders[idx] = updatedOrder;
    writeJsonAtomic(ORDERS_FILE, localOrders);
  }

  return updatedOrder;
}

export async function deleteOrder(id: string): Promise<boolean> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      await supabase.from("order_items").delete().eq("order_id", id);
      await supabase.from("orders").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase deleteOrder exception:", err);
    }
  }

  const orders = readJsonSafe<Order[]>(ORDERS_FILE, seedOrders());
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length !== orders.length) {
    writeJsonAtomic(ORDERS_FILE, filtered);
    return true;
  }
  return false;
}

// Offers
export async function getOffers(): Promise<Offer[]> {
  return readJsonSafe<Offer[]>(OFFERS_FILE, seedOffers());
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const offers = await getOffers();
  return offers.find((o) => o.id === id) || null;
}

export async function saveOffer(offer: Offer): Promise<Offer> {
  const offers = await getOffers();
  const now = new Date().toISOString();
  const idx = offers.findIndex((o) => o.id === offer.id);
  if (idx >= 0) {
    offers[idx] = { ...offer, updatedAt: now };
  } else {
    offers.push({ ...offer, createdAt: offer.createdAt || now, updatedAt: now });
  }
  writeJsonAtomic(OFFERS_FILE, offers);
  return offer;
}

export async function deleteOffer(id: string): Promise<boolean> {
  const offers = await getOffers();
  const filtered = offers.filter((o) => o.id !== id);
  if (filtered.length !== offers.length) {
    writeJsonAtomic(OFFERS_FILE, filtered);
    return true;
  }
  return false;
}

// Gallery
export async function getGalleryItems(): Promise<GalleryItemRecord[]> {
  const gallery = readJsonSafe<GalleryItemRecord[]>(GALLERY_FILE, seedGallery());
  return gallery.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function saveGalleryItem(item: GalleryItemRecord): Promise<GalleryItemRecord> {
  const gallery = await getGalleryItems();
  const now = new Date().toISOString();
  const idx = gallery.findIndex((g) => g.id === item.id);
  if (idx >= 0) {
    gallery[idx] = { ...item, updatedAt: now };
  } else {
    gallery.push({ ...item, createdAt: item.createdAt || now, updatedAt: now });
  }
  writeJsonAtomic(GALLERY_FILE, gallery);
  return item;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const gallery = await getGalleryItems();
  const filtered = gallery.filter((g) => g.id !== id);
  if (filtered.length !== gallery.length) {
    writeJsonAtomic(GALLERY_FILE, filtered);
    return true;
  }
  return false;
}

// Content
export async function getWebsiteContent(): Promise<WebsiteContent> {
  return readJsonSafe<WebsiteContent>(CONTENT_FILE, seedContent());
}

export async function saveWebsiteContent(content: WebsiteContent): Promise<WebsiteContent> {
  const updated = { ...content, updatedAt: new Date().toISOString() };
  writeJsonAtomic(CONTENT_FILE, updated);
  return updated;
}

// Settings
export async function getBusinessSettings(): Promise<BusinessSettings> {
  return readJsonSafe<BusinessSettings>(SETTINGS_FILE, seedSettings());
}

export async function saveBusinessSettings(settings: BusinessSettings): Promise<BusinessSettings> {
  const updated = { ...settings, updatedAt: new Date().toISOString() };
  writeJsonAtomic(SETTINGS_FILE, updated);
  return updated;
}

// Database Stats Overview
export async function getDashboardStats() {
  const products = await getProducts();
  const categories = await getCategories();
  const enquiries = await getEnquiries();
  const orders = await getOrders();
  const offers = await getOffers();
  const gallery = await getGalleryItems();

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.isActive).length;
  const totalEnquiries = enquiries.length;
  const pendingEnquiries = enquiries.filter((e) => e.status === "new" || e.status === "in_progress").length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "new" || o.status === "pending" || o.status === "processing").length;
  const totalOrderRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const activeOffers = offers.filter((o) => o.isActive).length;
  const totalGalleryItems = gallery.length;

  return {
    totalProducts,
    activeProducts,
    totalCategories,
    activeCategories,
    totalEnquiries,
    pendingEnquiries,
    totalOrders,
    pendingOrders,
    totalOrderRevenue,
    activeOffers,
    totalGalleryItems,
    recentEnquiries: enquiries.slice(0, 5),
    recentOrders: orders.slice(0, 5),
  };
}
