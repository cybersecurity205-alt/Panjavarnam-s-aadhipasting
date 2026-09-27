import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Award, Sparkles, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IntroTrustSection } from "@/components/sections/IntroTrustSection";
import { WhyAadhiSection } from "@/components/sections/WhyAadhiSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FloralDecor } from "@/components/ui/FloralDecor";

export const metadata: Metadata = {
  title: "About Aadhi Pasting | Post-Press Finishing Excellence in Tamil Nadu",
  description:
    "Discover Aadhi Pasting - premier post-press finishing house specializing in calendar mounting, chit fund passbook binding, and rigid chipboard solutions in Sivakasi and Chennai.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Refined Luxury Showroom Hero Header */}
      <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F4EFE6]/60 border-b border-[#C5A059]/25">
        <div className="absolute top-0 right-0 pointer-events-none opacity-20">
          <FloralDecor variant="cherry-blossom" className="w-56 h-56 text-[#C5A059]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C] text-xs font-semibold uppercase tracking-widest shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              Our Heritage & Craft
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1D24] leading-tight">
              About <span className="text-[#55122C]">Aadhi Pasting</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5F5B66] leading-relaxed font-light">
              Rooted in Tamil Nadu’s vibrant printing capital of Sivakasi and serving Chennai and all South India, Aadhi Pasting has set the benchmark for high-precision calendar pasting, reinforced chits fund bookbinding, and industrial greyboard lamination.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1F1D24]">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#C5A059]" />
                Sivakasi & Chennai Industrial Facilities
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#C5A059]" />
                Zero-Warp Adhesive Chemistry
              </span>
            </div>
          </div>
        </Container>
      </section>

      <IntroTrustSection />
      <WhyAadhiSection />
      <CtaSection />
    </div>
  );
}
