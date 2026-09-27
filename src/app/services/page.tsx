import React from "react";
import { Metadata } from "next";
import { Layers, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/Button";
import { FloralDecor } from "@/components/ui/FloralDecor";

export const metadata: Metadata = {
  title: "Pasting & Binding Solutions | Aadhi Pasting",
  description:
    "Comprehensive Tamil daily calendar pasting, chit fund passbook binding, rigid chipboard mounting, commercial sticker application, and bulk publishing production by Aadhi Pasting.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Services Hero Header */}
      <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F4EFE6]/60 border-b border-[#C5A059]/25">
        <div className="absolute top-0 right-0 pointer-events-none opacity-20">
          <FloralDecor variant="cherry-blossom" className="w-56 h-56 text-[#C5A059]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C] text-xs font-semibold uppercase tracking-widest shadow-2xs">
              <Layers className="h-3.5 w-3.5 text-[#C5A059]" />
              Comprehensive Post-Press Portfolio
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1D24] leading-tight">
              Pasting Solutions{" "}
              <span className="text-[#55122C] font-serif italic font-normal">
                & Finishing Services
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5F5B66] leading-relaxed font-light">
              Engineered with micro-calibrated tolerances, pH-balanced adhesive formulations, and rapid bulk scalability for commercial printers, publishers, and financial institutions across South India.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button variant="primary" size="md" href="/calendar-pasting" icon={<ArrowRight className="h-4 w-4" />} className="btn-burgundy-gold">
                Calendar Pasting
              </Button>
              <Button variant="outline" size="md" href="/chits" icon={<ArrowRight className="h-4 w-4" />} className="btn-liquid-glass">
                Chits Book Binding
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <ServicesSection />
      <ProcessSection />
      <QualitySection />
      <CtaSection />
    </div>
  );
}
