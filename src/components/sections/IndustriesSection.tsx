"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteContent } from "@/data/siteContent";

export const IndustriesSection: React.FC = () => {
  const { industries } = siteContent;

  return (
    <section id="industries" className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 scroll-mt-20 relative">
      <Container>
        <SectionHeading
          badge="Sectors & Client Verticals"
          title="Solutions for Every Sector"
          highlight="— Tailored Applications"
          subtitle="From calendar publication conglomerates and chit fund organizations to retail FMCG brands and Tamil Nadu commercial printing houses."
        />

        {/* 8 Sector Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group relative flex flex-col justify-between liquid-glass-card rounded-3xl overflow-hidden border border-[#C5A059]/25 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[4/3] w-full bg-[#F4EFE6] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14030A]/85 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C158] block mb-0.5">
                      Sector 0{index + 1}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white leading-snug">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="text-xs font-semibold text-[#55122C]">
                    {item.headline}
                  </div>

                  <p className="text-xs text-[#5F5B66] leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#C5A059]/20 space-y-1.5">
                    {item.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#1F1D24] font-medium">
                        <CheckCircle2 className="h-3 w-3 text-[#C5A059] shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Quote link */}
              <div className="p-4 sm:p-5 pt-0">
                <a
                  href={`/contact?industry=${encodeURIComponent(item.name)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F1D24] group-hover:text-[#55122C] transition-colors"
                >
                  <span>Inquire for {item.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
