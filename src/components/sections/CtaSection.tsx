"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteContent } from "@/data/siteContent";

export const CtaSection: React.FC = () => {
  const { cta, contact } = siteContent;

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20">
      <Container>
        <div className="relative rounded-3xl overflow-hidden liquid-glass-card p-8 sm:p-14 lg:p-20 text-center specular-shine border border-[#C5A059]/30 shadow-xl bg-gradient-to-b from-white/90 via-[#FAF7F2]/95 to-[#F4EFE6]/90">
          {/* Subtle corner blossom */}
          <div className="absolute top-0 right-0 pointer-events-none opacity-20 translate-x-6 -translate-y-6">
            <FloralDecor variant="cherry-blossom" className="w-56 h-56 text-[#C5A059]" />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/40 text-[#55122C] text-xs font-semibold uppercase tracking-widest shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              Fast Quote Turnaround Guaranteed
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1D24] tracking-tight leading-tight">
              {cta.heading}
            </h2>

            <p className="text-base sm:text-lg text-[#5F5B66] max-w-2xl mx-auto leading-relaxed font-light">
              {cta.subtext}
            </p>

            <div className="flex justify-center pt-1">
              <FloralDecor variant="flourish" className="w-28 h-5 text-[#C5A059]/50" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                icon={<ArrowRight className="h-4 w-4" />}
                className="btn-burgundy-gold"
              >
                {cta.primaryBtn}
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                  contact.whatsappMessage
                )}`}
                icon={<WhatsAppIcon className="h-4 w-4 fill-current" />}
              >
                Chat on WhatsApp
              </Button>

              <Button
                variant="outline"
                size="lg"
                href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                icon={<Phone className="h-4 w-4" />}
                className="btn-liquid-glass"
              >
                Call: {contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
