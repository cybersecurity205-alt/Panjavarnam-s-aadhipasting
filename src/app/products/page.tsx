import React from "react";
import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/db";
import { CategorySection } from "@/components/sections/CategorySection";
import { ProductCatalogSection } from "@/components/products/ProductCatalogSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Calendar Products & Pasting Catalog | Aadhi Pasting",
  description:
    "Explore our signature wall calendars, monthly desk calendars, corporate executive sets, devotional tear-offs, and custom chits passbooks with instant quotation basket.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Visual Category Showcase */}
      <CategorySection />

      {/* Interactive Product Catalog with Add-to-Cart & Quantity Stepper */}
      <ProductCatalogSection
        initialProducts={products}
        categories={categories}
      />

      <IndustriesSection />
      <GallerySection />
      <CtaSection />
    </div>
  );
}
