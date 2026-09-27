"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Award, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/data/siteContent";

export const WhyAadhiSection: React.FC = () => {
  const { whyUs, contact } = siteContent;

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 overflow-hidden relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionHeading
              badge={whyUs.badge}
              title={whyUs.heading}
              subtitle={whyUs.subheading}
              align="left"
            />

            {/* 6 Checked Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {whyUs.points.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="p-4 rounded-2xl liquid-glass-card hover:border-[#C5A059]/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Check className="h-3.5 w-3.5 stroke-[3] text-[#C5A059]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#1F1D24] leading-snug">
                        {point.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#5F5B66] leading-relaxed font-light">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                href="#contact"
                icon={<ArrowRight className="h-4 w-4" />}
                className="btn-burgundy-gold"
              >
                Discuss Pasting & Chits Volume
              </Button>
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                className="text-xs font-semibold text-[#1F1D24] hover:text-[#55122C] underline underline-offset-4"
              >
                Direct Call: {contact.phoneDisplay}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Workshop Image with Soft Card Framing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden liquid-glass-card p-3 border border-[#C5A059]/25 shadow-lg">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#F4EFE6]">
                <Image
                  src={whyUs.image}
                  alt={whyUs.imageAlt}
                  fill
                  className="object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Floating Bottom Quote Callout */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C5A059]/30 shadow-md">
                <div className="flex items-center gap-2 text-[#C5A059] mb-1">
                  <Award className="h-4 w-4 text-[#C5A059]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#55122C]">
                    Aadhi Pasting Quality Seal
                  </span>
                </div>
                <p className="font-serif text-xs font-semibold text-[#1F1D24] leading-snug italic">
                  “Zero sheet slippage, flawless glue lines, and uncompromising respect for calendar and publication deadlines.”
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
