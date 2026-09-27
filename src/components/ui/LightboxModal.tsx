"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { GalleryItem } from "@/data/siteContent";

export interface LightboxModalProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  item,
  onClose,
  onNext,
  onPrev,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#14030A]/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl liquid-glass-card border border-[#C5A059]/35 shadow-2xl flex flex-col md:flex-row bg-[#FAF7F2]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/30 text-[#1F1D24] hover:text-[#55122C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm"
              aria-label="Close image viewer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left/Main Image Container */}
            <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto min-h-[300px] md:min-h-[480px] bg-[#F4EFE6] flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />

              {/* Prev Button */}
              {onPrev && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/30 text-[#1F1D24] hover:text-[#55122C] transition-colors shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* Next Button */}
              {onNext && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/30 text-[#1F1D24] hover:text-[#55122C] transition-colors shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Right Information Details */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white/90 backdrop-blur-xl border-t md:border-t-0 md:border-l border-[#C5A059]/25 text-[#1F1D24]">
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#55122C] bg-[#FAF6EE] border border-[#C5A059]/30 px-3 py-1 rounded-full">
                  {item.category}
                </span>

                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#1F1D24]">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5F5B66] leading-relaxed font-light">
                  {item.description}
                </p>

                {item.caliperOrSize && (
                  <div className="pt-4 border-t border-[#C5A059]/20">
                    <span className="text-xs uppercase font-semibold text-[#7A7580] tracking-wider block mb-1">
                      Technical Spec / Scale
                    </span>
                    <p className="text-sm font-mono text-[#55122C] font-semibold">
                      {item.caliperOrSize}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[#C5A059]/20 mt-6 flex items-center justify-between">
                <span className="text-xs text-[#7A7580] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                  Aadhi Pasting Finished Specimen
                </span>
                <a
                  href="/contact"
                  onClick={onClose}
                  className="text-xs font-semibold text-[#55122C] hover:text-[#3D0C20] hover:underline"
                >
                  Request Sample →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
