"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FileText,
  SearchCheck,
  Layers,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteContent } from "@/data/siteContent";

export const ProcessSection: React.FC = () => {
  const { process } = siteContent;

  const icons = [
    <FileText key="1" className="h-4 w-4 text-[#C5A059]" />,
    <SearchCheck key="2" className="h-4 w-4 text-[#C5A059]" />,
    <Layers key="3" className="h-4 w-4 text-[#C5A059]" />,
    <CheckCircle key="4" className="h-4 w-4 text-[#C5A059]" />,
    <Truck key="5" className="h-4 w-4 text-[#C5A059]" />,
  ];

  return (
    <section id="process" className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 scroll-mt-20 relative">
      <Container>
        <SectionHeading
          badge="Standard Operating Procedure"
          title="From Raw Print to Royal Finish"
          highlight="— 5-Step Workflow"
          subtitle="Every sheet and calendar board moves through a documented protocol of calibration and inspection to eliminate paper curl and guarantee lasting beauty."
        />

        {/* 5-Step Process Timeline Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {process.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative flex flex-col justify-between liquid-glass-card rounded-3xl overflow-hidden border border-[#C5A059]/25 hover:border-[#C5A059]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Step Image */}
              <div className="relative aspect-[4/3] w-full bg-[#F4EFE6] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />

                {/* Step Number Badge */}
                <div className="absolute top-3 left-3 h-7 w-7 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C] font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                  {item.step}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 rounded-md bg-[#FAF6EE] border border-[#C5A059]/30">
                      {icons[index]}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#55122C]">
                      Phase {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1F1D24] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#5F5B66] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#C5A059]/20 text-[11px] text-[#7A7580] font-medium">
                  {item.details}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
