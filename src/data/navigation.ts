export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export const primaryNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Products", href: "/products" },
  { title: "Services", href: "/services" },
  { title: "Gallery", href: "/gallery" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavItem[] = [
  { title: "Calendar Pasting & Tinning", href: "/calendar-pasting" },
  { title: "Chits Passbook & Card Binding", href: "/chits" },
  { title: "Rigid Chipboard Mounting", href: "/services#chipboard-mounting" },
  { title: "Commercial Sticker Pasting", href: "/services#sticker-pasting" },
  { title: "Packaging Label Application", href: "/services#label-pasting" },
  { title: "High-Volume Bulk Production", href: "/services#bulk-production" },
];

export const footerCompanyLinks: NavItem[] = [
  { title: "About Aadhi Pasting", href: "/about" },
  { title: "Substrates & Products", href: "/products" },
  { title: "Production Gallery", href: "/gallery" },
  { title: "Technical Insights", href: "/blog" },
  { title: "Request Rose-Theme Quote", href: "/contact" },
];
