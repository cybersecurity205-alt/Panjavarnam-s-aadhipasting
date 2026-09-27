import React from "react";
import { Metadata } from "next";
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Chits Business Pasting & Binding Services | Aadhi Pasting",
  description:
    "Specialized chit fund passbooks, monthly installment tracking cards, ledger board mounting, and tamper-resistant rigid binding by Aadhi Pasting across Tamil Nadu.",
};

const chitSolutions = [
  {
    title: "Chit Fund Monthly Passbooks",
    tag: "High Durability",
    desc: "Multi-year member passbooks with rigid 2.0mm–3.0mm greyboard covers, reinforced spine cloth, and smooth foil-stamped headers.",
    specs: ["Cover: 2.0mm to 3.0mm Calibrated Greyboard", "Spine: Reinforced Linen Cloth Hinge", "Inner: 120-170 GSM Bond Paper Grid"],
  },
  {
    title: "Monthly Collection & Ledger Cards",
    tag: "Field Agent Ready",
    desc: "Rigid heavy-cardboard collection cards engineered for daily and monthly field agents, resistant to moisture, creasing, and abrasion.",
    specs: ["Caliper: 1.5mm to 2.5mm Rigid Board", "Dual-sided lamination available", "Clean rounded corners"],
  },
  {
    title: "Auction & Group Summary Ledgers",
    tag: "Financial Records",
    desc: "Large-format accounting and group auction registry books bound with archival adhesive to ensure decade-long record preservation.",
    specs: ["Sizes: Legal, Foolscap, A3 & Bespoke", "pH-neutral archival glue prevents decay", "Heavy-duty screw or thread binding"],
  },
  {
    title: "Cooperative & Private Credit Passbooks",
    tag: "Custom Branding",
    desc: "Customized savings society and microfinance passbooks with company crests, tamper-evident seals, and barcoded member slips.",
    specs: ["Gold or silver metallic foil stamping", "Scratch-resistant velvet matte lamination", "Zero-bubble compression"],
  },
];

export default function ChitsPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero Header */}
      <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F4EFE6]/60 border-b border-[#C5A059]/25">
        <div className="absolute top-0 right-0 pointer-events-none opacity-20">
          <FloralDecor variant="cherry-blossom" className="w-56 h-56 text-[#C5A059]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C] text-xs font-semibold uppercase tracking-widest shadow-2xs">
              <BookOpen className="h-3.5 w-3.5 text-[#C5A059]" />
              Specialized Financial Post-Press
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1D24] leading-tight">
              Chits Business Pasting{" "}
              <span className="text-[#55122C] font-serif italic font-normal">
                & Rigid Book Binding
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5F5B66] leading-relaxed font-light">
              Crafting tamper-resistant monthly passbooks, collection ledger boards, and member accounts designed to endure years of intensive handling for registered chit funds, cooperative credit societies, and private financiers across South India.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <Button variant="primary" size="md" href="#contact" icon={<ArrowRight className="h-4 w-4" />} className="btn-burgundy-gold">
                Request Chits Binding Quote
              </Button>
              <Button
                variant="outline"
                size="md"
                className="btn-liquid-glass"
                icon={<WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
                href={`https://wa.me/${siteContent.contact.whatsapp}?text=${encodeURIComponent(
                  "Hello Aadhi Pasting, I need a quotation for Chit Fund Passbook Pasting & Binding."
                )}`}
              >
                Inquire on WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading
            badge="Financial Durability"
            title="Chits Binding & Pasting Formats"
            highlight="— Built for Trust"
            subtitle="Engineered with reinforced cloth hinges, high-tack adhesives, and calibrated board calipers to withstand repetitive monthly record-keeping."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {chitSolutions.map((item, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl liquid-glass-card hover:border-[#C5A059]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#55122C] bg-[#FAF6EE] border border-[#C5A059]/30 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <FloralDecor variant="crest" className="w-7 h-7 text-[#C5A059]/50" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1F1D24] mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5F5B66] leading-relaxed font-light mb-6">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#C5A059]/20">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#1F1D24] font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Value Props Ribbon */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl liquid-glass-card border border-[#C5A059]/25 text-[#1F1D24] grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-[#55122C]">
                Security & Adhesion
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1F1D24]">Tamper-Evident Bonding</h4>
              <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                High-tensile permanent bonding prevents page substitution or deliberate cover tampering, protecting financial records.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-[#55122C]">
                Linen Spine Strength
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1F1D24]">Reinforced Cloth Hinge</h4>
              <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                Traditional woven bookbinder cloth spine reinforcement guarantees 3 to 5 years of daily opening and closing without split covers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-[#55122C]">
                Scale & Delivery
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1F1D24]">Turnkey Batch Runs</h4>
              <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                From pilot batches of 250 member passbooks to 50,000 corporate chit fund editions, dispatched across Tamil Nadu with shrink-wrapped care.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Form */}
      <ContactSection />
      <CtaSection />
    </div>
  );
}
