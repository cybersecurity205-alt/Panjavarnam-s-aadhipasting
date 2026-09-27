"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FloralDecor } from "@/components/ui/FloralDecor";

export const VisionSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] relative overflow-hidden border-t border-[#C5A059]/20">
      {/* Subtle showroom ambient spotlight */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[350px] bg-gradient-to-r from-[#C5A059]/10 via-[#8C224D]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0 -translate-y-1/2" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typography & Luxury CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-5 text-left order-1"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#3D0C20] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Bespoke Atelier Craftsmanship</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#232126] tracking-tight leading-[1.15]">
                Your Vision, <br />
                <span className="italic font-normal text-[#55122C]">
                  Our Mechanical Precision
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#595561] font-light leading-relaxed">
                At Aadhi Pasting, every calendar represents a harmonious balance of precision mechanical tolerances and quiet luxury aesthetics. Whether you require bespoke corporate calendars with metallic foil accents or high-volume Tamil daily tear-offs, our automated lines ensure pristine flatness and lifelong structural integrity.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-[#232126]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                <span>
                  <strong>High-Caliper Greyboard:</strong> 1.5mm to 4.0mm heavy board backing calibrated for zero warping in all humidity conditions.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                <span>
                  <strong>Hydraulic Roller Planar Bonding:</strong> Bubble-free, wrinkle-free adhesive distribution on every sheet.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#C5A059] mt-0.5 shrink-0" />
                <span>
                  <strong>Complete Customization:</strong> Custom die-cutting, rust-resistant metal tinning, brass eyelets, and wire-o binding.
                </span>
              </div>
            </div>

            {/* Luxury CTA Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-burgundy-gold inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Realistic Calendar Mockup in Showroom Pedestal Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative order-2"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft gold ambient blur */}
              <div className="absolute inset-0 bg-[#E5D0A1]/25 rounded-3xl blur-2xl transform rotate-1 scale-95" />

              {/* Showroom Frame */}
              <div className="liquid-glass-card relative rounded-3xl p-3 sm:p-3.5 border border-[#C5A059]/30 overflow-hidden shadow-card">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#C5A059]/20">
                  <Image
                    src="/images/blush/vision-calendar-desk.jpg"
                    alt="Realistic custom calendar mockup on desk with cherry blossoms and stationery"
                    fill
                    className="object-cover object-center transform hover:scale-[1.03] transition-transform duration-600 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#595561]">
                  <span className="font-serif italic text-xs text-[#232126]">
                    Artisanal Botanical Edition
                  </span>
                  <span className="text-[10px] font-sans text-[#55122C] uppercase tracking-widest font-bold">
                    Rigid Board Finishing
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
