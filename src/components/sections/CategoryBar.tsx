"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarRange,
  BookOpen,
  Layers,
  Sparkles,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

interface FeatureBarItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}

const barItems: FeatureBarItem[] = [
  {
    icon: <CalendarDays className="h-4 w-4 text-[#55122C] group-hover:text-[#FAF7F2] transition-colors" />,
    title: "Daily Tear-Offs",
    subtitle: "Tamil & English blocks",
    href: "/calendar-pasting",
  },
  {
    icon: <CalendarRange className="h-4 w-4 text-[#55122C] group-hover:text-[#FAF7F2] transition-colors" />,
    title: "Monthly Wall Planners",
    subtitle: "Tinning & eyelet hangers",
    href: "/calendar-pasting",
  },
  {
    icon: <BookOpen className="h-4 w-4 text-[#55122C] group-hover:text-[#FAF7F2] transition-colors" />,
    title: "Desk Spiral Calendars",
    subtitle: "Wire-o easel stand",
    href: "/calendar-pasting",
  },
  {
    icon: <Layers className="h-4 w-4 text-[#55122C] group-hover:text-[#FAF7F2] transition-colors" />,
    title: "Rigid Greyboard Lining",
    subtitle: "Zero-warp 1.5–4.0mm",
    href: "/services",
  },
  {
    icon: <Sparkles className="h-4 w-4 text-[#55122C] group-hover:text-[#FAF7F2] transition-colors" />,
    title: "Chits & Custom Books",
    subtitle: "Passbooks & ledgers",
    href: "/chits",
  },
  {
    icon: <Truck className="h-4 w-4 text-[#55122C] group-hover:text-[#FAF7F2] transition-colors" />,
    title: "Bulk Sivakasi Dispatch",
    subtitle: "Statewide fast transit",
    href: "/contact",
  },
];

export const CategoryBar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#FAF7F2]/95 backdrop-blur-xl border-y border-[#C5A059]/20 py-3.5 sm:py-4 shadow-xs relative z-20"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {barItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-center gap-2 sm:gap-2.5 p-2 sm:px-3 sm:py-2 rounded-2xl bg-white/60 hover:bg-white border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-200 hover:text-[#55122C] active:scale-[0.98] shadow-2xs hover:shadow-xs min-w-0"
            >
              <div className="h-8 w-8 rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C5A059] group-hover:bg-[#55122C] transition-all duration-300 ease-out shadow-xs">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#232126] group-hover:text-[#55122C] transition-colors duration-200 truncate">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#595561] font-medium truncate">
                  {item.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};
