"use client";

import React from "react";
import Image from "next/image";
import { Award, Layers, Zap, Truck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteContent } from "@/data/siteContent";

export const IntroTrustSection: React.FC = () => {
  const { trustIntro } = siteContent;

  const trustPoints = [
    {
      icon: <Award className="h-4 w-4 text-[#C5A059]" />,
      title: "Artisanal Alignment",
      desc: "Micro-calibrated roller pressing ensuring bubble-free, planar velvet-smooth finish.",
    },
    {
      icon: <Layers className="h-4 w-4 text-[#C5A059]" />,
      title: "Chits & Calendar Precision",
      desc: "Uniform adhesive chemistry across thousands of sheets with zero edge curling.",
    },
    {
      icon: <Zap className="h-4 w-4 text-[#C5A059]" />,
      title: "100K+ Bulk Scalability",
      desc: "High-throughput pressing lines engineered to absorb seasonal festival publication spikes.",
    },
    {
      icon: <Truck className="h-4 w-4 text-[#C5A059]" />,
      title: "Reliable Regional Logistics",
      desc: "Moisture-barrier shrink-wrapped dispatch across Sivakasi, Chennai, and Tamil Nadu hubs.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-24 bg-[#FAF7F2] border-y border-[#C5A059]/20 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Workshop Facility Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden liquid-glass-card p-3 border border-[#C5A059]/25 shadow-lg">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F4EFE6]">
                <Image
                  src={trustIntro.image}
                  alt={trustIntro.imageAlt}
                  fill
                  className="object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Verified Badge Pill */}
              <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#C5A059]/40 text-[#1F1D24] shadow-md flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-xs font-semibold tracking-wide text-[#1F1D24]">
                  Tamil Nadu Pasting Specialist
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Story & Features */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge={trustIntro.badge}
              title={trustIntro.heading}
              subtitle={trustIntro.subheading}
              align="left"
              theme="light"
            />

            <div className="space-y-3.5 text-sm sm:text-base text-[#5F5B66] leading-relaxed font-light">
              <p>{trustIntro.description1}</p>
              <p>{trustIntro.description2}</p>
            </div>

            {/* 4 Feature Points in Liquid Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {trustPoints.map((point, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl liquid-glass-card flex items-start gap-3 hover:border-[#C5A059]/50 transition-colors"
                >
                  <div className="p-2 rounded-xl bg-white/90 shrink-0 mt-0.5 border border-[#C5A059]/25 shadow-xs">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D24]">
                      {point.title}
                    </h4>
                    <p className="text-xs text-[#5F5B66] mt-1 leading-snug font-light">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics Callout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#C5A059]/20">
              {trustIntro.metrics.map((metric, i) => (
                <div key={i} className="text-center p-3.5 rounded-2xl liquid-glass-card">
                  <div className="text-xl sm:text-2xl font-bold font-serif text-[#1F1D24]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-[#55122C] mt-0.5">
                    {metric.label}
                  </div>
                  <div className="text-[10px] text-[#7A7580] mt-0.5">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
