"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteContent } from "@/data/siteContent";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
    savings,
  } = useCart();

  // Escape key listener to close drawer
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    },
    [isOpen, closeCart]
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

  // Construct WhatsApp order link
  const buildWhatsAppMessage = () => {
    if (items.length === 0) return "";
    let msg = `*Aadhi Pasting - Quotation & Order Request*\n\n`;
    items.forEach((item, idx) => {
      const price = item.salePrice || item.price;
      msg += `${idx + 1}. *${item.name}*\n   - Qty: ${item.quantity} ${item.unitNote || "pcs"}\n   - Rate: ₹${price} / pc\n   - Subtotal: ₹${(price * item.quantity).toLocaleString("en-IN")}\n\n`;
    });
    msg += `*Estimated Total:* ₹${subtotal.toLocaleString("en-IN")}\n\n`;
    msg += `Please confirm availability, bulk dispatch timeline, and formal commercial invoice for Tamil Nadu dispatch.`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${siteContent.contact.whatsapp}?text=${buildWhatsAppMessage()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#1A040D]/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sliding Liquid Glass Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md sm:max-w-lg bg-[#FAF7F2]/95 backdrop-blur-2xl border-l border-[#C5A059]/30 shadow-[0_10px_50px_rgba(26,4,13,0.35)] flex flex-col h-full z-10"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#C5A059]/20 flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/35 text-[#55122C] flex items-center justify-center shadow-xs">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#232126] leading-tight">
                    Quotation & Order Basket
                  </h3>
                  <p className="text-xs text-[#595561]">
                    {totalItems} {totalItems === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] font-semibold text-[#7D7886] hover:text-[#55122C] transition-colors px-2 py-1"
                    title="Clear Basket"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full liquid-glass-pill text-[#232126] hover:text-[#55122C] transition-colors focus:outline-none"
                  aria-label="Close cart drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {items.length === 0 ? (
                /* Empty Cart State */
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="h-20 w-20 rounded-full bg-[#FAF7F2] border border-[#C5A059]/35 flex items-center justify-center text-[#55122C] shadow-xs">
                    <FloralDecor variant="crest" className="w-10 h-10 text-[#C5A059]" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h4 className="font-serif text-xl font-bold text-[#232126]">
                      Your Basket is Empty
                    </h4>
                    <p className="text-xs text-[#595561] leading-relaxed">
                      Explore our handcrafted daily calendars, monthly wall planners, and rigid chit passbooks to request a quote or order.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="btn-burgundy-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md"
                  >
                    <span>Browse Calendar Products</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                /* Cart Items List */
                items.map((item) => {
                  const activePrice = item.salePrice || item.price;
                  const itemSubtotal = activePrice * item.quantity;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="liquid-glass-card rounded-2xl p-3.5 flex gap-3.5 relative overflow-hidden border border-[#C5A059]/25 shadow-xs"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative h-20 w-20 sm:h-22 sm:w-22 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#C5A059]/20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                          sizes="88px"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D0C20] liquid-glass-pill px-2 py-0.5 rounded-md truncate max-w-[160px] border border-[#C5A059]/25">
                              {item.categoryName}
                            </span>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-[#7D7886] hover:text-[#55122C] transition-colors p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#232126] leading-snug line-clamp-2 mt-1">
                            {item.name}
                          </h4>
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C5A059]/15">
                          <div>
                            <div className="text-xs font-bold text-[#55122C]">
                              ₹{activePrice.toLocaleString("en-IN")}
                              <span className="text-[10px] text-[#7D7886] font-normal ml-1">
                                / {item.unitNote || "pc"}
                              </span>
                            </div>
                            <div className="text-[11px] font-semibold text-[#232126]">
                              ₹{itemSubtotal.toLocaleString("en-IN")}
                            </div>
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-1 liquid-glass-pill px-1.5 py-1 rounded-full border border-[#C5A059]/30">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white active:scale-95 text-[#232126] flex items-center justify-center transition-all text-xs shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                              aria-label="Decrease quantity"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                              ) : (
                                <Minus className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <span className="text-xs font-bold font-mono text-[#232126] min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white active:scale-95 text-[#232126] flex items-center justify-center transition-all text-xs shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer / Checkout CTA */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#C5A059]/20 bg-white/90 backdrop-blur-md space-y-3">
                {/* Logistics Badge */}
                <div className="flex items-center justify-between text-[11px] text-[#595561] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#C5A059]/20">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Truck className="h-3.5 w-3.5 text-[#C5A059]" />
                    Sivakasi & Chennai Dispatch
                  </span>
                  <span className="font-semibold text-emerald-600">
                    Bulk Transport Ready
                  </span>
                </div>

                {/* Subtotal Calculation */}
                <div className="space-y-1">
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
                      <span>Total Savings</span>
                      <span>- ₹{savings.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-base font-bold text-[#232126]">
                    <span>Estimated Subtotal</span>
                    <span className="font-serif text-lg text-[#55122C]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7D7886]">
                    Taxes, custom embossing, and bulk logistics calculated at checkout.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-burgundy-gold w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md group"
                  >
                    <span>Proceed to Order / Quote Checkout</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-glass w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                    <span>Instant Quote via WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7D7886] pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>Aadhi Pasting Commercial Assurance • Zero Defect Guarantee</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
