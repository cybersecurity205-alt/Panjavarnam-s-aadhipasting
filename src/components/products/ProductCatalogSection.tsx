"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Sparkles, Filter, PackageCheck, Eye, X } from "lucide-react";
import { Product, Category } from "@/lib/db/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";

export interface ProductCatalogSectionProps {
  initialProducts: Product[];
  categories?: Category[];
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  initialProducts,
  categories = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const [modalQty, setModalQty] = useState(1);

  // Body scroll lock and Escape key listener for Quick View Modal
  useEffect(() => {
    if (activeModalProduct) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActiveModalProduct(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeModalProduct]);

  // Category list
  const categoryFilters = useMemo(() => {
    const list = ["All"];
    initialProducts.forEach((p) => {
      if (p.categoryName && !list.includes(p.categoryName)) {
        list.push(p.categoryName);
      }
    });
    return list;
  }, [initialProducts]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.categoryName === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2]">
      <Container>
        <SectionHeading
          badge="Commercial Wholesale Catalog"
          title="Engineered Calendar Mounting"
          highlight="— Direct Factory Pricing"
          subtitle="Precision tear-off block mounting, multi-sheet tinning, Kappa easel stands, and tamper-evident chit passbooks manufactured to micron tolerances in Tamil Nadu."
        />

        {/* Filter and Search Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
                  selectedCategory === cat
                    ? "btn-burgundy-gold shadow-xs"
                    : "liquid-glass-pill text-[#232126] hover:text-[#55122C] border border-[#C5A059]/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7D7886]" />
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-liquid-glass w-full pl-9 pr-4 py-2 rounded-full text-base sm:text-xs"
            />
          </div>
        </div>

        {/* Product Count & Active Status */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#595561]">
          <span>
            Showing <strong className="text-[#232126]">{filteredProducts.length}</strong>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <PackageCheck className="h-3.5 w-3.5" />
            Seasonal Publisher Pre-Booking Active
          </span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 p-12 text-center liquid-glass-card rounded-3xl max-w-md mx-auto space-y-3 border border-[#C5A059]/25 shadow-card">
            <p className="font-serif text-lg font-bold text-[#232126]">
              No products found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-[#595561]">
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="btn-liquid-glass px-4 py-2 rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => {
                  setActiveModalProduct(p);
                  setModalQty(1);
                }}
              />
            ))}
          </div>
        )}

        {/* Quick View Modal */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4">
            <div
              className="absolute inset-0 bg-[#1A040D]/60 backdrop-blur-sm"
              onClick={() => setActiveModalProduct(null)}
              aria-hidden="true"
            />
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass-card rounded-3xl shadow-2xl p-5 sm:p-8 space-y-5 border border-[#C5A059]/35">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full liquid-glass-pill text-[#232126] hover:text-[#55122C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                aria-label="Close product preview"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
                <div className="relative aspect-[4/3] w-full sm:w-60 rounded-2xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#C5A059]/25">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2.5 sm:space-y-3 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider liquid-glass-pill px-2.5 py-0.5 rounded-full text-[#3D0C20]">
                    {activeModalProduct.categoryName}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#232126] leading-snug">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-xs text-[#595561] leading-relaxed font-light">
                    {activeModalProduct.description}
                  </p>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#55122C]">
                    ₹{(activeModalProduct.salePrice || activeModalProduct.price).toLocaleString("en-IN")}
                    <span className="text-xs text-[#7D7886] font-normal ml-1">/ unit</span>
                  </div>
                </div>
              </div>

              {activeModalProduct.specs && activeModalProduct.specs.length > 0 && (
                <div className="pt-3 border-t border-[#C5A059]/15">
                  <span className="text-xs uppercase font-semibold text-[#7D7886] tracking-wider block mb-2">
                    Production Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeModalProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[#232126]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#C5A059]/15 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addItem(activeModalProduct, modalQty);
                    setActiveModalProduct(null);
                  }}
                  className="btn-burgundy-gold px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold w-full sm:w-auto"
                >
                  Add to Quotation Basket
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
