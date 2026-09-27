import React from "react";
import { Metadata } from "next";
import { GallerySection } from "@/components/sections/GallerySection";
import { QualitySection } from "@/components/sections/QualitySection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Work Gallery & Portfolio | Aadhi Pasting",
  description:
    "Explore our high-resolution visual archive of calendar mounting, sticker application, and bulk publishing production.",
};

export default function GalleryPage() {
  return (
    <div className="bg-[#FAF7F2] pt-6">
      <GallerySection />
      <QualitySection />
      <CtaSection />
    </div>
  );
}
