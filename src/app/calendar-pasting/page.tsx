import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Calendar Pasting & Tinning Services | Aadhi Pasting",
  description:
    "Specialized Tamil daily calendar pasting, monthly wall calendar mounting, tinning, eyeleting, and rigid chipboard backers in Sivakasi & Chennai by Aadhi Pasting.",
};

const calendarTypes = [
  {
    title: "Daily Tamil Calendar Tear-Offs",
    tag: "High Volume Seasonal",
    desc: "Mounting of 365-day Tamil & English tear-off daily calendar blocks onto stiff, high-caliper chipboard backers with exact registration.",
    specs: ["Size: 10x15 in, 15x20 in, 18x23 in", "Board: 1.5mm to 2.5mm Greyboard", "Tinning rim with hanging hook"],
  },
  {
    title: "Monthly Multi-Sheet Wall Calendars",
    tag: "Commercial Standard",
    desc: "Reinforced header mounting for 6-sheet and 12-sheet commercial and corporate wall planners with heavy wire-o or tinning clamping.",
    specs: ["Size: 15x20 in, 17x27 in, 20x30 in", "Anti-curl pH-neutral adhesive", "Precision eyelet punch"],
  },
  {
    title: "Tabletop & Executive Desk Calendars",
    tag: "Corporate Gifting",
    desc: "Tri-fold and easel-stand rigid board pasting for corporate desktop calendars, gold-foil stamped headers, and diaries.",
    specs: ["Hardcover Kappa board 2.5mm", "Linen and laminated sheet wrap", "Zero warping guarantee"],
  },
  {
    title: "Temple & Festival Commemoratives",
    tag: "Artisanal Edition",
    desc: "Luxury metallic foil and laminated devotional calendar sheets mounted onto velvet-finished or gold-bordered rigid mountings.",
    specs: ["Custom die-cut arched tops", "Heavy-duty brass eyelets", "Long-term moisture barrier"],
  },
];

export default function CalendarPastingPage() {
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
              <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
              Signature Post-Press Discipline
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1D24] leading-tight">
              Artisanal Calendar Pasting{" "}
              <span className="text-[#55122C] font-serif italic font-normal">
                & Tinning Headers
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5F5B66] leading-relaxed font-light">
              We mount hundreds of thousands of daily Tamil tear-offs, monthly wall calendars, and executive desk planners every year for leading printers and publishers across Sivakasi, Madurai, and Chennai.
            </p>

            <div className="pt-2 flex flex-wrap gap-3.5">
              <Button variant="primary" size="md" href="#contact" icon={<ArrowRight className="h-4 w-4" />} className="btn-burgundy-gold">
                Get Calendar Quotation
              </Button>
              <Button
                variant="outline"
                size="md"
                className="btn-liquid-glass"
                icon={<WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
                href={`https://wa.me/${siteContent.contact.whatsapp}?text=${encodeURIComponent(
                  "Hello Aadhi Pasting, I need a quote for Calendar Pasting & Tinning."
                )}`}
              >
                Inquire on WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Deep-Dive Grid */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading
            badge="Tailored Formats"
            title="Calendar Pasting Varieties"
            highlight="— Engineered for Longevity"
            subtitle="Explore our specialized production lines built to handle both high-volume seasonal publisher runs and boutique executive gift editions."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {calendarTypes.map((item, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl liquid-glass-card hover:border-[#C5A059]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#55122C] bg-[#FAF6EE] border border-[#C5A059]/30 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <FloralDecor variant="rose" className="w-6 h-6 text-[#C5A059]/50" />
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

          {/* Technical Protocol Banner */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl liquid-glass-card border border-[#C5A059]/25 text-[#1F1D24] grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-[#55122C]">
                Adhesive Formulation
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1F1D24]">pH-Neutral Bonding</h4>
              <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                Our proprietary adhesive blend matches the moisture absorption rate of raw paper, ensuring boards dry with zero warping even in high humidity.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-[#55122C]">
                Tinning & Eyeleting
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1F1D24]">Reinforced Rimming</h4>
              <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                Heavy-gauge galvanized steel and brass tinning rims crimped under calibrated pressure prevent sheet slip and sagging when hung.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold tracking-widest text-[#55122C]">
                Speed & Throughput
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1F1D24]">100K+ Sheets/Day</h4>
              <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                Continuous automated lines allow commercial publication houses to meet peak Diwali and New Year delivery windows without bottlenecks.
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
