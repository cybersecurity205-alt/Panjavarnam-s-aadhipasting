"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function OfferBanner() {
  const pathname = usePathname();
  const [offer, setOffer] = useState<{
    id: string;
    title: string;
    description: string;
    discountPercentage?: number;
    discountCode?: string;
    destinationUrl?: string;
  } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on public storefront, not in admin panel
    if (pathname.startsWith("/admin")) return;

    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.offers && data.offers.length > 0) {
          setOffer(data.offers[0]);
        }
      })
      .catch(() => {});
  }, [pathname]);

  if (!offer || dismissed || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#14030A] via-[#2A0815] to-[#14030A] border-b border-[#C5A059]/25 text-[#FAF7F2] py-2 px-4 relative z-50 text-xs shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E5C158] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#E5C158]" />
            Exclusive Atelier Offer
          </span>
          <span className="font-normal text-xs text-[#E5DFC5]/90">
            <strong className="text-white font-semibold">{offer.title}</strong>
            {offer.discountPercentage ? ` — Enjoy ${offer.discountPercentage}% Volume Rebate` : ""}
            {offer.discountCode ? ` with code ` : ""}
            {offer.discountCode ? (
              <span className="font-mono font-bold bg-[#14030A] px-1.5 py-0.5 rounded border border-[#C5A059]/50 text-[#E5C158]">
                {offer.discountCode}
              </span>
            ) : null}
          </span>
          {offer.destinationUrl && (
            <Link
              href={offer.destinationUrl}
              className="inline-flex items-center gap-1 font-semibold text-[#E5C158] hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full text-[#E5DFC5]/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
