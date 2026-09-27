"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Sparkles, Filter } from "lucide-react";
import { GalleryItem } from "@/data/siteContent";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { cn } from "@/lib/utils";

export interface GalleryGridProps {
  items: GalleryItem[];
  categories?: string[];
  initialCategory?: string;
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  className?: string;
  onItemSelect?: (item: GalleryItem) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  categories,
  initialCategory = "All",
  columns = 4,
  showFilters = true,
  className,
  onItemSelect,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Derive unique categories if not provided
  const filterList =
    categories || [
      "All",
      ...Array.from(new Set(items.map((it) => it.category))).filter(Boolean),
    ];

  const filteredItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

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

  const handleCardClick = (item: GalleryItem) => {
    if (onItemSelect) {
      onItemSelect(item);
    } else {
      setSelectedItem(item);
    }
  };

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Category Filter Pills */}
      {showFilters && filterList.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterList.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]",
                  isActive
                    ? "btn-burgundy-gold text-[#FAF6EE] shadow-sm"
                    : "bg-white/80 backdrop-blur-md border border-[#C5A059]/30 text-[#1F1D24] hover:text-[#55122C] hover:border-[#C5A059]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Works */}
      <div className={cn("grid gap-6", colClass)}>
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            onClick={() => handleCardClick(item)}
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

      {/* Lightbox Modal (rendered if internal state used) */}
      {!onItemSelect && (
        <LightboxModal
          isOpen={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};
