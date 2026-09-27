"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Award, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const StatsRibbonSection: React.FC = () => {
  const stats = [
    {
      value: "100,000+",
      label: "Daily Sheets Pasting Capacity",
      icon: <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-[#55122C]" />,
    },
    {
      value: "30+ Years",
      label: "Sivakasi & Chennai Finishing Legacy",
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#55122C]" />,
    },
    {
      value: "100%",
      label: "Zero-Warp Anti-Curling Guarantee",
      icon: <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#55122C]" />,
    },
    {
      value: "500+",
      label: "Commercial Printers & Corporate Clients",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#55122C]" />,
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-[#F4EFE6]/50 border-y border-[#C5A059]/20 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5 p-3 sm:p-4 rounded-2xl liquid-glass-card border border-[#C5A059]/25 hover:border-[#C5A059]/50 hover:-translate-y-0.5 transition-all duration-300 ease-out shadow-card"
            >
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#FAF7F2] border border-[#C5A059]/35 flex items-center justify-center shrink-0 shadow-xs">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <div className="font-serif font-bold text-base sm:text-xl text-[#232126] leading-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#595561] font-medium leading-snug mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
