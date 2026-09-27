"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { FloatingPetals } from "@/components/ui/FloatingPetals";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F4EFE6]/60 py-12 sm:py-16 lg:py-20 border-b border-[#C5A059]/20"
    >
      {/* 1. Subtle, slow floating petals (minimal, graceful champagne accent) */}
      <FloatingPetals count={2} />

      {/* 2. Showroom Ambient Spotlight Effect */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-br from-[#C5A059]/10 via-[#8C224D]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-gradient-to-tr from-[#55122C]/5 via-[#C5A059]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* 3. Subtle Studio Corner Flourish */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-20 -translate-x-3 -translate-y-3">
        <FloralDecor variant="crest" className="w-24 h-24 text-[#C5A059]" />
      </div>

      <Container className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Typography & Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Atelier Brand Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#3D0C20] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>AADHI PASTING • ATELIER OF CALENDAR FINISHING</span>
            </div>

            {/* Refined Headline */}
            <div className="space-y-3.5">
              <h1 className="font-serif text-3.5xl sm:text-4.5xl lg:text-[48px] font-bold tracking-tight text-[#232126] leading-[1.12]">
                Artisanal Calendars <br />
                <span className="italic font-normal text-[#55122C]">
                  Engineered for Absolute Precision
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#595561] font-light leading-relaxed max-w-xl">
                Crafted with the meticulous tolerances of an automotive atelier. From authentic Tamil & English daily tear-offs to bespoke corporate desk planners, we combine micron-calibrated greyboard mounting, zero-warp adhesive technology, and seamless metal tinning.
              </p>
            </div>

            {/* Automotive Atelier Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="#categories"
                className="btn-burgundy-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/services"
                className="btn-liquid-glass inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-wide"
              >
                <span>Bespoke Solutions</span>
              </Link>
            </div>

            {/* Trust Proof Points */}
            <div className="pt-5 border-t border-[#C5A059]/20 flex flex-wrap items-center gap-4 sm:gap-7 text-xs font-medium text-[#3B3840]">
              <div className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[#55122C]">
                <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" />
                <span>Zero-Warp Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[#55122C]">
                <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" />
                <span>Precision Tinning & Wire-O</span>
              </div>
              <div className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[#55122C]">
                <CheckCircle2 className="h-4 w-4 text-[#C5A059] shrink-0" />
                <span>Sivakasi & Chennai Dispatch</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Realistic Desk Calendar Mockup with Showroom Pedestal Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft Ambient Gold & Velvet Halo behind the showroom frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F4EFE6] via-[#FAF7F2] to-[#E5D0A1]/35 rounded-3xl blur-2xl transform -rotate-1 scale-95" />

              {/* Main Showroom Liquid Glass Frame */}
              <div className="liquid-glass-card relative rounded-3xl p-3 sm:p-3.5 border border-[#C5A059]/30 overflow-hidden shadow-card">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#C5A059]/20">
                  <Image
                    src="/images/blush/hero-calendar-desk.jpg"
                    alt="Artisanal desk calendar mockup on wooden table with pink cherry blossoms and stationery"
                    fill
                    className="object-cover object-center transform hover:scale-[1.03] transition-transform duration-600 ease-out"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                {/* Floating Bottom Badge */}
                <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#595561]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#C5A059] animate-pulse" />
                    <span className="font-serif font-medium text-xs text-[#232126]">
                      2025 - 2026 Collection
                    </span>
                  </div>
                  <span className="text-[10px] font-sans text-[#55122C] uppercase tracking-widest font-bold">
                    Handcrafted Finish
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
