"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const [waHovered, setWaHovered] = useState(false);
  const [callHovered, setCallHovered] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const formattedPhone = siteContent.contact.phoneDisplay || "+91 90808 67822";
  const telHref = "tel:+919080867822";
  const whatsappUrl = `https://wa.me/919080867822?text=${encodeURIComponent(
    siteContent.contact.whatsappMessage
  )}`;

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none"
      aria-label="Quick Contact Floating Actions"
    >
      {/* 1. Floating Call Button (Positioned Directly Above WhatsApp Button) */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {callHovered && (
          <div
            role="tooltip"
            className="hidden sm:block px-3.5 py-1.5 rounded-full bg-[#3D0A1E]/95 text-white text-xs font-semibold shadow-xl border border-[#E5C158]/40 backdrop-blur-md animate-in fade-in slide-in-from-right-2 tracking-wide"
          >
            Call Directly: {formattedPhone}
          </div>
        )}
        <a
          href={telHref}
          onMouseEnter={() => setCallHovered(true)}
          onMouseLeave={() => setCallHovered(false)}
          className="group relative flex items-center justify-center h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-gradient-to-br from-[#7D1D43] via-[#540F2A] to-[#360619] text-white shadow-xl hover:shadow-[0_0_22px_rgba(85,18,44,0.6),0_0_10px_rgba(197,160,89,0.4)] hover:scale-108 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/40 border-2 border-[#E5C158]/50"
          aria-label={`Call Aadhi Pasting at ${formattedPhone}`}
        >
          {/* Subtle inner metallic specular sheen */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
          <Phone className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-white relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
        </a>
      </div>

      {/* 2. Floating WhatsApp Button (Positioned at Bottom-Right) */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {waHovered && (
          <div
            role="tooltip"
            className="hidden sm:block px-3.5 py-1.5 rounded-full bg-white/95 text-[#1F1D24] text-xs font-semibold shadow-xl border border-[#C5A059]/30 backdrop-blur-md animate-in fade-in slide-in-from-right-2 tracking-wide"
          >
            Chat on WhatsApp ({formattedPhone})
          </div>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
          className="group relative flex items-center justify-center h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-[0_0_24px_rgba(37,211,102,0.55)] hover:scale-108 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 border-2 border-white/80"
          aria-label={`Chat with Aadhi Pasting on WhatsApp at ${formattedPhone}`}
        >
          {/* Official WhatsApp Icon */}
          <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10 transition-transform duration-300 group-hover:scale-105" />
        </a>
      </div>
    </div>
  );
};
