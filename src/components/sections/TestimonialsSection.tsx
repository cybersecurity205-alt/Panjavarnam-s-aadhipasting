"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteContent } from "@/data/siteContent";

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = siteContent;

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 relative">
      <Container>
        <SectionHeading
          badge="Verified Client Commendations"
          title="What Our Partners Say"
          highlight="— Commercial Praise"
          subtitle="Real testimonials from commercial calendar publishers, chit fund enterprises, and packaging heads across Tamil Nadu."
        />

        {/* 4 Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl liquid-glass-card border border-[#C5A059]/25 hover:border-[#C5A059]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                {/* 5 Stars in Champagne Gold */}
                <div className="flex items-center gap-1 text-[#C5A059] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-xs sm:text-sm text-[#1F1D24] leading-relaxed italic">
                  “{item.review}”
                </p>
              </div>

              {/* Client Info & Service Used */}
              <div className="mt-6 pt-4 border-t border-[#C5A059]/20 space-y-2">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1F1D24] leading-tight">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-[#55122C] font-semibold mt-0.5">
                    {item.role}, {item.company}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#5F5B66] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#C5A059]" />
                    {item.location}
                  </span>
                  <span className="font-medium text-[#55122C] bg-[#FAF6EE] border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full text-[10px]">
                    {item.serviceUsed}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
