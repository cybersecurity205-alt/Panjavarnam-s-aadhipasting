"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Building,
  FileText,
  MapPin,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useCart } from "@/context/CartContext";
import { siteContent } from "@/data/siteContent";

export default function CheckoutPage() {
  const { items, subtotal, savings, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    companyName: "",
    gstin: "",
    address: "",
    city: "Sivakasi",
    pincode: "",
    orderType: "Commercial Bulk Order",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    customerName: string;
    totalAmount: number;
  } | null>(null);

  const hubs = [
    "Sivakasi (Central Workshop)",
    "Chennai (Regional Hub)",
    "Madurai",
    "Coimbatore",
    "Tirupur",
    "Salem",
    "Trichy",
    "Bangalore",
    "Other South India",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      setErrorMsg("Please enter your name or authorized contact person.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number for dispatch coordination.");
      return;
    }

    if (items.length === 0) {
      setErrorMsg("Your basket is empty. Please add items before checking out.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          companyName: formData.companyName,
          gstin: formData.gstin,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          orderType: formData.orderType,
          notes: formData.notes,
          items: items.map((it) => ({
            productId: it.productId,
            name: it.name,
            sku: it.sku,
            quantity: it.quantity,
            price: it.salePrice || it.price,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit order.");
      }

      setOrderSuccess({
        orderNumber: data.orderNumber,
        customerName: formData.customerName,
        totalAmount: subtotal,
      });

      // Clear basket upon successful submission
      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (orderSuccess) {
    const whatsappText = encodeURIComponent(
      `Hello Aadhi Pasting team, I have just placed order *#${orderSuccess.orderNumber}* for ₹${orderSuccess.totalAmount.toLocaleString("en-IN")}. Please confirm dispatch timeline and proforma invoice.`
    );
    const whatsappUrl = `https://wa.me/${siteContent.contact.whatsapp}?text=${whatsappText}`;

    return (
      <div className="py-20 lg:py-28 bg-[#FAF7F2] min-h-[80vh] flex items-center">
        <Container>
          <div className="max-w-2xl mx-auto liquid-glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#C5A059]/35 shadow-xl bg-white/95">
            <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/30">
                Order Confirmed • Reference #{orderSuccess.orderNumber}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1D24]">
                Thank You, {orderSuccess.customerName}!
              </h1>
              <p className="text-sm text-[#5F5B66] max-w-md mx-auto leading-relaxed">
                Your calendar order and quotation specification has been submitted directly to our Sivakasi central production desk.
              </p>
            </div>

            {/* Quick Spec Card */}
            <div className="p-4 rounded-2xl bg-white/90 border border-[#C5A059]/20 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#C5A059]/15">
                <span className="text-[#7A7580]">Order Reference</span>
                <span className="font-mono font-bold text-[#1F1D24]">
                  {orderSuccess.orderNumber}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#C5A059]/15">
                <span className="text-[#7A7580]">Estimated Order Value</span>
                <span className="font-bold text-[#55122C]">
                  ₹{orderSuccess.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7A7580]">Next Step</span>
                <span className="text-emerald-700 font-medium">
                  Technical specification review & proforma invoice dispatch
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-burgundy-gold flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold shadow-md"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current" />
                <span>Confirm on WhatsApp</span>
              </a>

              <Link
                href="/products"
                className="btn-liquid-glass flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold"
              >
                <span>Continue Browsing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // EMPTY BASKET FALLBACK
  if (items.length === 0) {
    return (
      <div className="py-20 lg:py-28 bg-[#FAF7F2] min-h-[70vh] flex items-center">
        <Container>
          <div className="max-w-lg mx-auto text-center space-y-5 liquid-glass-card rounded-3xl p-8 sm:p-12 border border-[#C5A059]/25">
            <div className="h-16 w-16 rounded-full bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/30 flex items-center justify-center mx-auto">
              <ShoppingBag className="h-8 w-8 text-[#55122C]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#1F1D24]">
                Your Basket is Currently Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#5F5B66] leading-relaxed">
                Add calendar pasting packages, tear-off blocks, or chit passbook quantities to your basket before checking out.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-burgundy-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold"
            >
              <span>Explore Calendar Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2]">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C] text-xs font-semibold uppercase tracking-widest shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
            Commercial Order & Quotation Checkout
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1D24]">
            Review & Complete Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5B66]">
            Zero-curl calibrated pastings, verified rigid backers, and direct factory dispatch from Sivakasi & Chennai.
          </p>
        </div>

        {/* Checkout 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-[#C5A059]/25 shadow-sm"
            >
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Customer Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1F1D24] pb-2 border-b border-[#C5A059]/20">
                  <span className="h-6 w-6 rounded-full bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/30 flex items-center justify-center text-xs font-mono font-bold">
                    1
                  </span>
                  <span>Contact Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                      Full Name / Contact Person *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      placeholder="e.g. S. Ramanathan"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                      Mobile / WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 90808 67822"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                    Email Address (Optional, for Proforma Invoice)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. orders@printingpress.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              {/* Step 2: Shipping & Regional Hub */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1F1D24] pb-2 border-b border-[#C5A059]/20">
                  <span className="h-6 w-6 rounded-full bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/30 flex items-center justify-center text-xs font-mono font-bold">
                    2
                  </span>
                  <span>Logistics & Regional Delivery Hub</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                      Preferred Delivery Hub *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs cursor-pointer focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    >
                      {hubs.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                      Delivery Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 626123"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                    Delivery Address / Press Location
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    placeholder="Industrial estate, building name, road details for lorry transport delivery"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              {/* Step 3: Commercial & Tax Info */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1F1D24] pb-2 border-b border-[#C5A059]/20">
                  <span className="h-6 w-6 rounded-full bg-[#FAF6EE] text-[#55122C] border border-[#C5A059]/30 flex items-center justify-center text-xs font-mono font-bold">
                    3
                  </span>
                  <span>Commercial & GST Details (Optional)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                      Company / Press Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Sri Balaji Offset Printers"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                      GSTIN (For Tax Credit)
                    </label>
                    <input
                      type="text"
                      name="gstin"
                      placeholder="33AAAAA0000A1Z5"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs font-mono uppercase focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                    Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Commercial Bulk Order", "Sample Kit Request"].map((t) => (
                      <label
                        key={t}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${
                          formData.orderType === t
                            ? "bg-[#FAF6EE] border-[#C5A059] text-[#55122C] font-semibold"
                            : "bg-white/70 border-[#C5A059]/20 text-[#1F1D24]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value={t}
                          checked={formData.orderType === t}
                          onChange={handleInputChange}
                          className="text-[#55122C] focus:ring-[#C5A059]"
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F1D24] mb-1.5">
                    Custom Specifications / Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Specific caliper requirements, tinning metal preference, target festival dispatch deadline..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="input-liquid-glass w-full px-4 py-2.5 rounded-xl text-base sm:text-xs focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#C5A059]/20">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-burgundy-gold w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Order to Sivakasi Production...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Commercial Order & Request Invoice</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#7A7580] mt-2">
                  No payment required right now. Our coordinator will verify paper specs and confirm wholesale dispatch date.
                </p>
              </div>
            </form>
          </div>

          {/* Right Summary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Sticky Order Review Card */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 space-y-5 sticky top-24 border border-[#C5A059]/25 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20">
                <h3 className="font-serif text-lg font-bold text-[#1F1D24]">
                  Order Summary
                </h3>
                <span className="text-xs font-bold font-mono text-[#55122C] bg-[#FAF6EE] border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? "Product" : "Products"}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {items.map((item) => {
                  const activePrice = item.salePrice || item.price;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/80 border border-[#C5A059]/20"
                    >
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-[#1F1D24] truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-[#5F5B66]">
                          <span>
                            Qty: <strong className="text-[#1F1D24]">{item.quantity}</strong> × ₹{activePrice}
                          </span>
                          <span className="font-bold text-[#55122C]">
                            ₹{(activePrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#C5A059]/20 text-xs">
                <div className="flex items-center justify-between text-[#5F5B66]">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-[#1F1D24]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>Wholesale Volume Discount</span>
                    <span>- ₹{savings.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[#5F5B66]">
                  <span>Moisture-Barrier Packaging</span>
                  <span className="text-emerald-600 font-medium">Complimentary</span>
                </div>

                <div className="flex items-center justify-between text-[#5F5B66]">
                  <span>Transport Logistics</span>
                  <span>FOB Sivakasi / Hub Billed</span>
                </div>

                <div className="pt-2 border-t border-[#C5A059]/20 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#1F1D24]">
                    Total Estimated Amount
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#55122C]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Reassurance list */}
              <div className="pt-2 border-t border-[#C5A059]/20 space-y-2 text-[11px] text-[#5F5B66]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span>Zero-Curl Calibrated Roller Pressing Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span>Scheduled Lorry Transport Across All Tamil Nadu Districts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span>Direct Works Helpline: {siteContent.contact.phoneDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
