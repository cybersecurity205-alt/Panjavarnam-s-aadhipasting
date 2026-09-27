"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { siteContent, GalleryItem } from "@/data/siteContent";

export const GallerySection: React.FC = () => {
  const { gallery } = siteContent;
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = [
    "All",
    "Calendar Pasting",
    "Chits Pasting",
    "Sticker Pasting",
    "Label Pasting",
    "Promotional Pasting",
    "Bulk Production",
  ];

  const filteredItems =
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeFilter);

  const currentIndex = selectedItem
    ? filteredItems.findIndex((x) => x.id === selectedItem.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    } else {
      setSelectedItem(filteredItems[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    } else {
      setSelectedItem(filteredItems[filteredItems.length - 1]);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 scroll-mt-20 relative">
      <Container>
        <SectionHeading
          badge="Finished Production Portfolio"
          title="Our Work in Action"
          highlight="— Visual Archive"
          subtitle="Explore real samples of daily and monthly calendar mounting, reinforced chit fund passbooks, die-cut sticker application, and high-capacity dispatch."
        />

        {/* Filter Pills with Luxury Gold & Burgundy Accents */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "btn-burgundy-gold text-[#FAF6EE] shadow-sm"
                  : "bg-white/80 backdrop-blur-md border border-[#C5A059]/30 text-[#1F1D24] hover:text-[#55122C] hover:border-[#C5A059]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Works */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              onClick={() => setSelectedItem(item)}
              className="group relative cursor-pointer rounded-3xl overflow-hidden liquid-glass-card border border-[#C5A059]/25 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Soft Hover Overlay */}
                <div className="absolute inset-0 bg-[#14030A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-2.5 rounded-full btn-burgundy-gold text-white shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C]">
                  {item.category}
                </div>
              </div>

              {/* Text Card Footer */}
              <div className="p-4 bg-white/90 border-t border-[#C5A059]/20">
                <h4 className="font-serif text-sm font-bold text-[#1F1D24] group-hover:text-[#55122C] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                {item.caliperOrSize && (
                  <p className="text-[11px] font-mono text-[#55122C] mt-1 font-semibold">
                    {item.caliperOrSize}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          isOpen={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </Container>
    </section>
  );
};
