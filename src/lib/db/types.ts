export type Role = "super_admin" | "admin";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: Role;
  expiresAt: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tag: string;
  description: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductAvailability = "in_stock" | "out_of_stock" | "made_to_order";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  stock?: number;
  availability: ProductAvailability;
  isFeatured: boolean;
  isActive: boolean;
  image: string;
  images: string[];
  specs: string[];
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = "new" | "in_progress" | "quoted" | "completed" | "cancelled";

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  quantity?: string;
  message?: string;
  status: EnquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "new"
  | "pending"
  | "pending_confirmation"
  | "confirmed"
  | "processing"
  | "ready_for_dispatch"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "partially_paid"
  | "refunded"
  | "failed";

export interface OrderItem {
  id?: string;
  productId: string;
  name: string;
  sku?: string;
  image?: string;
  quantity: number;
  price: number;
  lineTotal?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  companyName?: string;
  gstin?: string;
  orderType?: string;
  items: OrderItem[];
  subtotal?: number;
  discountAmount?: number;
  deliveryCharges?: number;
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus?: PaymentStatus;
  paymentReference?: string;
  status: OrderStatus;
  courierName?: string;
  trackingId?: string;
  trackingUrl?: string;
  notes?: string;
  adminNotes?: string;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  bannerImage?: string;
  discountPercentage?: number;
  discountCode?: string;
  startDate: string;
  endDate: string;
  destinationUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  caliperOrSize?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteContent {
  hero: {
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    image: string;
  };
  trustIntro: {
    badge: string;
    heading: string;
    subheading: string;
    description1: string;
    description2: string;
  };
  vision: {
    badge: string;
    heading: string;
    highlight: string;
    description: string;
    points: string[];
    image: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  updatedAt: string;
}

export interface BusinessSettings {
  brandName: string;
  legalName: string;
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
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  updatedAt: string;
}
