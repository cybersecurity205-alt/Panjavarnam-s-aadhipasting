"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, PackageCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteContent } from "@/data/siteContent";

export const ServicesSection: React.FC = () => {
  const { services } = siteContent;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF7F2] scroll-mt-20 relative">
      <Container>
        <SectionHeading
          badge="Bespoke Finishing Solutions"
          title="Our Pasting & Binding Services"
          highlight="— Master Craftsmanship"
          subtitle="Precision engineered for tight tolerances, pH-neutral adhesive bonding, and refined visual presentation across calendar sheets, chits passbooks, and rigid boards."
        />

        {/* 6 Rich Service Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between liquid-glass-card rounded-3xl overflow-hidden border border-[#C5A059]/25 hover:border-[#C5A059]/50 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Visual Image Container with subtle zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4EFE6]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Popular Flag */}
                  {service.popular && (
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#55122C] to-[#3D0C20] border border-[#C5A059]/40 text-[#FAF6EE] shadow-xs flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#C5A059]" />
                      Signature Craft
                    </span>
                  )}

                  {/* Step ID badge */}
                  <span className="absolute bottom-3.5 left-3.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md border border-[#C5A059]/30 text-[#55122C]">
                    0{index + 1} / SERVICE
                  </span>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-7 space-y-3.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F1D24] group-hover:text-[#55122C] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5F5B66] leading-relaxed font-light">
                    {service.shortDesc}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 pt-2 border-t border-[#C5A059]/20">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#1F1D24]">
                        <span className="h-4 w-4 rounded-full bg-[#FAF6EE] text-[#55122C] flex items-center justify-center shrink-0 mt-0.5 border border-[#C5A059]/30">
                          <Check className="h-2.5 w-2.5 stroke-[3] text-[#C5A059]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Footer with Actions */}
              <div className="p-6 sm:p-7 pt-0 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#5F5B66] font-medium border-t border-[#C5A059]/20 pt-3">
                  <span className="flex items-center gap-1">
                    <PackageCheck className="h-3.5 w-3.5 text-[#C5A059]" />
                    Min: {service.minOrder || "Inquire"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#C5A059]" />
                    {service.typicalTurnaround}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {service.href && service.href.startsWith("/") && !service.href.includes("#") ? (
                    <Button
                      variant="outline"
                      size="sm"
                      href={service.href}
                      className="justify-center text-xs btn-liquid-glass"
                    >
                      Details
                    </Button>
                  ) : null}

                  <Button
                    variant="primary"
                    size="sm"
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className={`justify-center text-xs btn-burgundy-gold ${
                      service.href && service.href.startsWith("/") && !service.href.includes("#")
                        ? ""
                        : "col-span-2"
                    }`}
                    icon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
