import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/db";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryBar } from "@/components/sections/CategoryBar";
import { CategorySection } from "@/components/sections/CategorySection";
import { VisionSection } from "@/components/sections/VisionSection";
import { StatsRibbonSection } from "@/components/sections/StatsRibbonSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";

export default async function HomePage() {
  const allProducts = await getProducts();
  const featured = allProducts.filter((p) => p.isActive && p.isFeatured).slice(0, 4);
  const displayProducts = featured.length > 0 ? featured : allProducts.filter((p) => p.isActive).slice(0, 4);

  return (
    <div className="flex flex-col bg-[#FAF7F2]">
      {/* 1. Two-Column Hero (Compact height, realistic desk calendar mockup with stationery) */}
      <HeroSection />

      {/* 2. Slim Category Bar (Horizontal row of service icons/features below hero) */}
      <CategoryBar />

      {/* 3. Shop by Category (5 clean calendar category cards with real calendar mockup photos & arrow button) */}
      <CategorySection />

      {/* 4. Curated Showcase: Featured Calendar Editions */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#C5A059]/20 relative overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              badge="Curated Showcase"
              title="Featured Calendar"
              highlight="Editions"
              subtitle="Precision tear-off blocks, executive monthly planners, and Wire-O desk calendars calibrated for zero warping and high durability."
              align="left"
              showFlourish={false}
              className="max-w-2xl"
            />
            <Link
              href="/products"
              className="btn-burgundy-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide self-start md:self-auto shrink-0 shadow-sm group"
            >
              <span>View All Editions</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="grid"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Split Vision Section: 'Your Vision, Our Mechanical Precision' */}
      <VisionSection />

      {/* 6. Statistics Row */}
      <StatsRibbonSection />

      {/* 7. Commercial Contact & Quotation Specification Form (Clean light theme) */}
      <ContactSection />
    </div>
  );
}
