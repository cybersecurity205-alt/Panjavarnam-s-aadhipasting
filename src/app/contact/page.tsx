import React from "react";
import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Contact & Quotation Inquiries | Aadhi Pasting",
  description:
    "Direct commercial inquiry line and quote request for calendar mounting, sticker application, and bulk publishing production.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#FAF7F2] pt-6">
      <ContactSection />
      <CtaSection />
    </div>
  );
}
