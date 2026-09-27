"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FloralDecor } from "@/components/ui/FloralDecor";

interface CategoryItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    id: "wall-calendars",
    name: "Wall Calendars",
    tag: "High Volume",
    description: "Multi-sheet monthly wall planners with reinforced tinning strips and hanging eyelets.",
    image: "/images/blush/cat-wall-calendar.jpg",
    href: "/calendar-pasting",
  },
  {
    id: "monthly-calendars",
    name: "Monthly Calendars",
    tag: "Desk & Office",
    description: "Wire-o spiral desktop calendars mounted on stiff, perfectly flat kappa board.",
    image: "/images/blush/cat-monthly-calendar.jpg",
    href: "/calendar-pasting",
  },
  {
    id: "corporate-calendars",
    name: "Corporate Calendars",
    tag: "Executive Series",
    description: "Easel-stand branded triangle calendars with elegant foil stamping and custom finishing.",
    image: "/images/blush/cat-corporate-calendar.jpg",
    href: "/calendar-pasting",
  },
  {
    id: "religious-calendars",
    name: "Religious Calendars",
    tag: "Artisanal Edition",
    description: "Tamil daily tear-off calendar blocks mounted onto high-caliper greyboard backings.",
    image: "/images/blush/cat-devotional-calendar.jpg",
    href: "/calendar-pasting",
  },
  {
    id: "custom-designs",
    name: "Custom Designs",
    tag: "Bespoke & Chits",
    description: "Specialized chit fund passbooks, collection cards, and personalized embossed binding.",
    image: "/images/blush/cat-custom-designs.jpg",
    href: "/chits",
  },
];

export const CategorySection: React.FC = () => {
  return (
    <section id="categories" className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] scroll-mt-20 relative">
      <Container>
        {/* Section Heading with gentle fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#3D0C20] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Curated Collections</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#232126] tracking-tight">
            Shop by <span className="italic font-normal text-[#55122C]">Category</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#595561] font-light leading-relaxed">
            Discover our signature calendar styles and post-press finishing lines, precision-engineered for publishers, businesses, and artisanal retailers.
          </p>

          <div className="pt-1 flex justify-center">
            <FloralDecor variant="flourish" className="w-24 h-4 text-[#C5A059]/60" />
          </div>
        </motion.div>

        {/* 5 Category Cards with Staggered Scroll-Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={cat.href}
                className="group relative flex flex-col justify-between h-full liquid-glass-card rounded-3xl p-4 border border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:-translate-y-1.5 transition-all duration-300 ease-out shadow-card hover:shadow-card-hover"
              >
                <div>
                  {/* Product Mockup Image Container */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F2] mb-3.5 border border-[#C5A059]/20">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                    {/* Subtle Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[#3D0C20] border border-[#C5A059]/35 text-[10px] font-semibold tracking-wider uppercase shadow-xs">
                      {cat.tag}
                    </div>
                  </div>

                  {/* Category Title & Description */}
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#232126] group-hover:text-[#55122C] transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#595561] font-light mt-1.5 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Action with Circular Arrow Button */}
                <div className="mt-4 pt-3 border-t border-[#C5A059]/15 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#55122C] group-hover:text-[#3D0C20] transition-colors duration-200">
                    Explore Designs
                  </span>

                  <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#C5A059]/35 text-[#55122C] group-hover:bg-[#55122C] group-hover:text-[#FAF7F2] group-hover:border-[#C5A059] flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
