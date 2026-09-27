"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { footerServiceLinks, footerCompanyLinks } from "@/data/navigation";
import { siteContent } from "@/data/siteContent";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#14030A] via-[#1A040D] to-[#0D0206] text-[#FAF7F2] border-t border-[#C5A059]/30 relative overflow-hidden">
      {/* Top Specular Gold Hairline */}
      <div className="absolute top-0 inset-x-8 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent pointer-events-none" />

      {/* Subtle Studio Ambient Spotlight */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[350px] bg-gradient-to-tl from-[#55122C]/15 via-[#C5A059]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Upper Footer Columns */}
      <div className="py-14 sm:py-16 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#3D0C20] via-[#240614] to-[#14030A] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shadow-xs group-hover:scale-105 group-hover:border-[#C5A059]/80 transition-all duration-300">
                  <FloralDecor variant="crest" className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div>
                  <div className="flex items-center font-serif font-bold text-xl sm:text-2xl tracking-tight leading-none text-white">
                    <span>AADHI</span>
                    <span className="bg-gradient-to-r from-[#FAF7F2] via-[#E5D0A1] to-[#C5A059] bg-clip-text text-transparent ml-1.5">
                      PASTING
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E5D0A1]/85 mt-0.5 block font-sans">
                    Calendar & Finishing Atelier
                  </span>
                </div>
              </Link>

              <p className="text-xs sm:text-sm text-[#EBE3D5]/75 leading-relaxed max-w-sm font-light">
                A premier post-press finishing house in Tamil Nadu. Specializing in high-tolerance Tamil & English daily calendar mounting, monthly wall calendars with tinning, chit fund passbook binding, and high-volume commercial production.
              </p>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${siteContent.contact.whatsapp}?text=${encodeURIComponent(
                    siteContent.contact.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold shadow-xs hover:bg-[#20BA5A] hover:shadow-[0_6px_18px_rgba(37,211,102,0.3)] transition-all"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 fill-current" />
                  <span>WhatsApp Inquiry Line</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {footerCompanyLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-[#EBE3D5]/75 hover:text-[#C5A059] hover:translate-x-0.5 transition-all duration-200 inline-block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Pasting Solutions
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {footerServiceLinks.map((service) => (
                  <li key={service.title}>
                    <Link
                      href={service.href}
                      className="text-[#EBE3D5]/75 hover:text-[#C5A059] hover:translate-x-0.5 transition-all duration-200 flex items-center justify-between group"
                    >
                      <span>{service.title}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Location */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                Facility & Inquiries
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#EBE3D5]/75">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>
                    Plot No. 42, Industrial Estate Road, Sivakasi & Chennai, Tamil Nadu
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <a
                    href={`tel:${siteContent.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-[#C5A059] transition-colors font-mono"
                  >
                    {siteContent.contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="hover:text-[#C5A059] transition-colors font-mono"
                  >
                    {siteContent.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span>Mon - Sat: 8:30 AM - 8:30 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#C5A059]/15 py-5 bg-black/40">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EBE3D5]/60">
            <div>
              © {currentYear} Aadhi Pasting Atelier. All rights reserved.
            </div>

            <div className="flex items-center gap-5">
              <Link href="/about" className="hover:text-[#C5A059] transition-colors">
                About Us
              </Link>
              <Link href="/products" className="hover:text-[#C5A059] transition-colors">
                Products
              </Link>
              <Link href="/calendar-pasting" className="hover:text-[#C5A059] transition-colors">
                Calendar Pasting
              </Link>
              <Link href="/contact" className="hover:text-[#C5A059] transition-colors">
                Contact & Quote
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
