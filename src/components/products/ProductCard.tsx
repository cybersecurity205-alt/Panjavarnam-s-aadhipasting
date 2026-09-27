"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { Product } from "@/lib/db/types";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  layout?: "grid" | "horizontal";
  showSpecs?: boolean;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = "grid",
  showSpecs = true,
  onQuickView,
  className,
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const activePrice =
    typeof product.salePrice === "number" && product.salePrice > 0
      ? product.salePrice
      : product.price;

  const hasDiscount =
    typeof product.salePrice === "number" &&
    product.salePrice > 0 &&
    product.salePrice < product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(1000, prev + delta)));
  };

  if (layout === "horizontal") {
    return (
      <div
        className={cn(
          "group relative liquid-glass-card rounded-3xl overflow-hidden p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:border-[#C5A059]/60 transition-all duration-300 shadow-card hover:shadow-card-hover",
          className
        )}
      >
        {/* Thumbnail Frame */}
        <div className="relative aspect-[4/3] sm:w-56 rounded-2xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#C5A059]/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 224px"
          />
          {hasDiscount && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#55122C] text-[#FAF7F2] border border-[#C5A059]/40 shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D0C20] liquid-glass-pill px-2.5 py-0.5 rounded-full">
                {product.categoryName}
              </span>
              <span className="text-[10px] font-mono text-[#7D7886]">
                SKU: {product.sku}
              </span>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#232126] group-hover:text-[#55122C] transition-colors leading-snug">
              {product.name}
            </h3>

            <p className="text-xs text-[#595561] mt-1.5 line-clamp-2 leading-relaxed font-light">
              {product.shortDescription || product.description}
            </p>

            {showSpecs && product.specs && product.specs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {product.specs.slice(0, 3).map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] text-[#232126] bg-white/80 px-2.5 py-0.5 rounded-md border border-[#C5A059]/25"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[#C5A059]" />
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-[#C5A059]/15">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-xl font-bold text-[#55122C]">
                  ₹{activePrice.toLocaleString("en-IN")}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-[#7D7886] line-through">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-[11px] text-[#595561]">/ unit</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center liquid-glass-pill px-1.5 py-1 rounded-full border border-[#C5A059]/30">
                <button
                  type="button"
                  onClick={() => handleQtyChange(-1)}
                  className="h-8 w-8 rounded-full bg-white/90 text-[#232126] hover:bg-white active:scale-95 flex items-center justify-center transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="px-2.5 text-xs font-bold font-mono text-[#232126] min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(1)}
                  className="h-8 w-8 rounded-full bg-white/90 text-[#232126] hover:bg-white active:scale-95 flex items-center justify-center transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={cn(
                  "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm",
                  isAdded
                    ? "bg-[#2B0715] text-[#C5A059] border border-[#C5A059]"
                    : "btn-burgundy-gold"
                )}
              >
                {isAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Layout
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between liquid-glass-card rounded-3xl overflow-hidden hover:border-[#C5A059]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-card hover:shadow-card-hover",
        className
      )}
    >
      <div>
        {/* Product Visual Container with Hover Actions */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#FAF7F2] border-b border-[#C5A059]/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF7F2]/95 backdrop-blur-md text-[#3D0C20] border border-[#C5A059]/35 shadow-xs">
              {product.categoryName}
            </span>

            {hasDiscount ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#55122C] text-[#FAF7F2] border border-[#C5A059]/40 shadow-xs">
                {discountPercent}% OFF
              </span>
            ) : product.isFeatured ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#55122C] to-[#8C224D] text-[#FAF7F2] border border-[#C5A059]/40 shadow-xs flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-[#C5A059]" />
                Featured
              </span>
            ) : null}
          </div>

          {/* Quick View Button on Hover */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="absolute bottom-3 right-3 p-2 rounded-full bg-white/95 text-[#232126] hover:text-[#55122C] hover:bg-white border border-[#C5A059]/30 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}

          {/* Availability Indicator */}
          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wide bg-white/95 text-[#232126] border border-[#C5A059]/30 flex items-center gap-1.5 shadow-2xs">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                product.availability === "in_stock"
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-amber-500"
              )}
            />
            <span>
              {product.availability === "in_stock"
                ? "In Production / Fast Dispatch"
                : "Custom Pasting Batch"}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-[#7D7886]">
            <span>SKU: {product.sku}</span>
            {product.stock && product.stock > 0 && (
              <span>Capacity: {product.stock.toLocaleString("en-IN")}+ sets</span>
            )}
          </div>

          <h3 className="font-serif text-lg font-bold text-[#232126] group-hover:text-[#55122C] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-[#595561] leading-relaxed font-light line-clamp-2">
            {product.shortDescription || product.description}
          </p>

          {/* Specs Checklist */}
          {showSpecs && product.specs && product.specs.length > 0 && (
            <div className="pt-2 border-t border-[#C5A059]/15 space-y-1.5">
              {product.specs.slice(0, 2).map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[11px] text-[#232126]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer with Price, Quantity, & Add to Cart */}
      <div className="p-5 sm:p-6 pt-0 space-y-3">
        <div className="flex items-baseline justify-between pt-3 border-t border-[#C5A059]/15">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#55122C]">
                ₹{activePrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#7D7886] line-through">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#7D7886]">
              Standard Wholesale Rate
            </span>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center liquid-glass-pill px-1.5 py-1 rounded-full border border-[#C5A059]/30">
            <button
              type="button"
              onClick={() => handleQtyChange(-1)}
              className="h-8 w-8 rounded-full bg-white/90 text-[#232126] hover:bg-white active:scale-95 flex items-center justify-center transition-all text-xs shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-2.5 text-xs font-bold font-mono text-[#232126] min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQtyChange(1)}
              className="h-8 w-8 rounded-full bg-white/90 text-[#232126] hover:bg-white active:scale-95 flex items-center justify-center transition-all text-xs shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 shadow-sm",
            isAdded
              ? "bg-[#2B0715] text-[#C5A059] border border-[#C5A059]"
              : "btn-burgundy-gold"
          )}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added to Basket!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Basket</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
