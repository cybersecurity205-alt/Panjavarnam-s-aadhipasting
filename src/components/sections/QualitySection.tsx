"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteContent } from "@/data/siteContent";

export const QualitySection: React.FC = () => {
  const { quality } = siteContent;

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 relative overflow-hidden">
      <Container className="relative z-10">
        <SectionHeading
          badge={quality.badge}
          title={quality.heading}
          subtitle={quality.subheading}
          theme="light"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Macro Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden liquid-glass-card p-3 border border-[#C5A059]/25 shadow-lg">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#F4EFE6]">
                <Image
                  src={quality.image}
                  alt={quality.imageAlt}
                  fill
                  className="object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating Caliper Spec Badge */}
              <div className="absolute bottom-5 left-5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C5A059]/35 text-[#1F1D24] shadow-md flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/30 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                  0.003
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-[#1F1D24] leading-none">
                    Planar Caliper Tolerance
                  </div>
                  <div className="text-[10px] text-[#5F5B66] mt-0.5 font-sans">
                    Zero Sheet Slippage Certified
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 4 Technical Protocols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quality.features.map((feat, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl liquid-glass-card border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-300"
                >
                  <div className="h-7 w-7 rounded-lg bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center mb-2.5 border border-[#C5A059]/30">
                    <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1F1D24] mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4 Metric Counters */}
        <div className="mt-14 pt-8 border-t border-[#C5A059]/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {quality.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="text-center p-4 rounded-2xl liquid-glass-card border border-[#C5A059]/20 shadow-xs"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1D24] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#55122C] mt-1.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
