"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { primaryNavItems } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Passive scroll listener for smooth floating burgundy glass transition
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle pointer specular reflection movement on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navContainerRef.current) return;
    const rect = navContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Isolate Admin panel from storefront navbar
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
          scrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-3.5"
        )}
      >
        <Container>
          <div
            ref={navContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
            className={cn(
              "w-full relative overflow-hidden transition-all duration-300 ease-out px-3.5 sm:px-6 flex items-center justify-between",
              scrolled
                ? "h-[66px] sm:h-[70px] burgundy-glass-nav-scrolled rounded-2xl lg:rounded-full"
                : "h-[74px] sm:h-[78px] burgundy-glass-nav rounded-2xl lg:rounded-full"
            )}
          >
            {/* Desktop Specular Pointer Glow (Refined Velvet Burgundy & Champagne Gold Specular Reflection) */}
            {isHoveringNav && (
              <div
                className="hidden lg:block absolute inset-0 pointer-events-none transition-opacity duration-300 -z-10"
                style={{
                  background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(140, 34, 77, 0.2), rgba(197, 160, 89, 0.1) 45%, transparent 75%)`,
                }}
              />
            )}

            {/* Subtle Metallic Gold Specular Accent Lip */}
            <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/65 to-transparent pointer-events-none" />

            {/* Subtle Bottom Burgundy Ambient Highlight */}
            <div className="absolute bottom-0 inset-x-12 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#8C224D]/35 to-transparent pointer-events-none" />

            {/* Brand Logo & Name */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-2xl p-1 shrink-0"
              aria-label="AadhiPasting - Home"
            >
              {/* Emblem A with Metallic Ring & Deep Burgundy Showroom Finish */}
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full p-1 bg-gradient-to-br from-[#3D0C20] via-[#240614] to-[#14030A] border border-[#C5A059]/40 shadow-[0_2px_14px_rgba(0,0,0,0.5)] group-hover:border-[#C5A059]/80 group-hover:shadow-[0_0_22px_rgba(140,34,77,0.5),0_0_12px_rgba(197,160,89,0.4)] group-hover:scale-105 transition-all duration-300 shrink-0 flex items-center justify-center overflow-hidden">
                {/* Specular glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                <Image
                  src="/images/brand-a-emblem.png"
                  alt="AadhiPasting Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#FAF7F2] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    Aadhi
                  </span>
                  <span className="font-serif font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-[#FAF7F2] via-[#E5D0A1] to-[#C5A059] bg-clip-text text-transparent leading-none ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                    Pasting
                  </span>
                </div>
                <span className="hidden sm:block text-[9px] sm:text-[10px] font-medium tracking-[0.24em] uppercase text-[#E5D0A1]/85 font-sans mt-0.5">
                  Calendar & Finishing Atelier
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Smooth Burgundy Glass Pill */}
            <nav
              className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 relative p-1 rounded-full bg-black/35 border border-[#C5A059]/20 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
              aria-label="Primary Navigation"
            >
              {primaryNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1 z-10",
                      isActive
                        ? "text-[#FAF7F2] font-semibold shadow-xs"
                        : "text-[#EBE3D5] hover:text-white hover:bg-white/10"
                    )}
                  >
                    {/* Animated Burgundy Glass Pill Morphing Behind Active Item */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-burgundy-pill"
                        className="burgundy-glass-pill absolute inset-0 rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}

                    <span>{item.title}</span>

                    {item.badge && (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#3D0C20] text-[#E5D0A1] border border-[#C5A059]/30">
                        {item.badge}
                      </span>
                    )}

                    {/* Subtle Centered Active Gold Dot Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-gold-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Primary CTA Button */}
            <div className="hidden lg:flex items-center space-x-2.5 shrink-0">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-[#EBE3D5] hover:text-[#FAF7F2] bg-white/5 hover:bg-white/12 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] border border-white/10 hover:border-[#C5A059]/40"
                aria-label="Search calendars"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/products#wishlist"
                className="relative p-2 rounded-full text-[#EBE3D5] hover:text-[#FAF7F2] bg-white/5 hover:bg-white/12 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] border border-white/10 hover:border-[#C5A059]/40"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-[#55122C] text-[#E5D0A1] text-[9px] font-bold flex items-center justify-center border border-[#C5A059]/35">
                  0
                </span>
              </Link>

              {/* Cart / Quotation Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 rounded-full text-[#EBE3D5] hover:text-[#FAF7F2] bg-white/5 hover:bg-white/12 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] border border-white/10 hover:border-[#C5A059]/40"
                aria-label={`Open Cart (${totalItems} items)`}
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-[#8C224D] to-[#C5A059] text-white text-[9px] font-bold flex items-center justify-center shadow-xs"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Luxury Burgundy + Gold Accent Button */}
              <Link
                href="/products"
                className="btn-burgundy-gold inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs font-semibold tracking-wide group"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Admin Login Button */}
              <Link
                href="/admin/login"
                className="group/admin relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide text-[#FAF7F2] bg-gradient-to-r from-[#2B0715] via-[#3D0C20] to-[#1A040D] border border-[#C5A059]/40 shadow-[0_2px_12px_rgba(0,0,0,0.45)] hover:border-[#C5A059]/80 hover:shadow-[0_0_18px_rgba(140,34,77,0.45),0_0_8px_rgba(197,160,89,0.35)] hover:scale-[1.02] transition-all duration-300 shrink-0"
                aria-label="Admin Login Portal"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059] transition-transform duration-200 group-hover/admin:scale-110" />
                <span className="hidden xl:inline">Admin Login</span>
                <span className="xl:hidden">Admin</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 sm:p-2.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[#EBE3D5] hover:text-white bg-white/5 hover:bg-white/12 border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={openCart}
                className="p-2 sm:p-2.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[#EBE3D5] hover:text-white bg-white/5 hover:bg-white/12 border border-white/10 relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                aria-label={`Open Basket (${totalItems} items)`}
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-gradient-to-r from-[#8C224D] to-[#C5A059] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Animated Luxury Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 sm:p-2.5 rounded-2xl text-[#EBE3D5] bg-white/10 border border-[#C5A059]/30 hover:bg-white/15 hover:border-[#C5A059]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] transition-all flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    "w-4 h-0.5 bg-[#EBE3D5] rounded-full transition-all duration-300",
                    isOpen ? "rotate-45 translate-y-2 bg-[#C5A059]" : ""
                  )}
                />
                <span
                  className={cn(
                    "w-4 h-0.5 bg-[#EBE3D5] rounded-full transition-all duration-200",
                    isOpen ? "opacity-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "w-4 h-0.5 bg-[#EBE3D5] rounded-full transition-all duration-300",
                    isOpen ? "-rotate-45 -translate-y-2 bg-[#C5A059]" : ""
                  )}
                />
              </button>
            </div>
          </div>
        </Container>

        {/* Search Overlay Drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2"
            >
              <Container>
                <div className="burgundy-glass-mobile rounded-2xl p-4 flex items-center gap-3 border border-[#C5A059]/30 shadow-2xl">
                  <Search className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search daily Tamil calendars, monthly wall planners, chit fund passbooks..."
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-[#FAF7F2] placeholder-[#C5A059]/60 focus:outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs font-semibold text-[#E5D0A1] hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                  <Link
                    href={`/products?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchOpen(false)}
                    className="btn-burgundy-gold px-4 py-1.5 rounded-full text-white text-xs font-semibold"
                  >
                    Search
                  </Link>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Dropdown Panel (Smooth Burgundy Glass with Staggered Items) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2"
            >
              <Container>
                <div className="burgundy-glass-mobile rounded-3xl p-5 border border-[#C5A059]/30 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                      Navigation Menu
                    </span>
                    <span className="text-[10px] text-[#E5D0A1]/80">
                      Aadhi Pasting Atelier
                    </span>
                  </div>

                  <nav className="flex flex-col space-y-1">
                    {primaryNavItems.map((item, idx) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                      return (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03, duration: 0.2 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all",
                              isActive
                                ? "burgundy-glass-pill text-[#FAF7F2] font-bold border border-[#C5A059]/35"
                                : "text-[#EBE3D5] hover:bg-white/10 hover:text-white"
                            )}
                          >
                            <span>{item.title}</span>
                            {item.badge ? (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3D0C20] text-[#E5D0A1] border border-[#C5A059]/30">
                                {item.badge}
                              </span>
                            ) : isActive ? (
                              <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" />
                            ) : null}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <div className="pt-3 border-t border-[#C5A059]/20 flex flex-col gap-2.5">
                    {totalItems > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          openCart();
                        }}
                        className="w-full burgundy-glass-pill py-2.5 rounded-2xl text-center text-xs font-semibold flex items-center justify-center gap-2 text-white border border-[#C5A059]/35 shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>
                          View Basket ({totalItems} {totalItems === 1 ? "item" : "items"})
                        </span>
                      </button>
                    )}

                    <Link
                      href="/products"
                      onClick={() => setIsOpen(false)}
                      className="w-full btn-burgundy-gold py-3 rounded-2xl text-center text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/contact#quote"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-3 rounded-2xl text-center text-xs font-semibold flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white border border-[#C5A059]/30 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Request Quote Specification</span>
                    </Link>

                    {/* Full-Width Mobile Admin Login Portal Button */}
                    <div className="pt-2 border-t border-[#C5A059]/20">
                      <Link
                        href="/admin/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 rounded-2xl text-center text-xs font-semibold flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#2B0715] via-[#3D0C20] to-[#1A040D] border border-[#C5A059]/50 shadow-[0_4px_16px_rgba(20,3,10,0.5)] hover:border-[#C5A059] hover:shadow-[0_0_20px_rgba(140,34,77,0.4)] transition-all duration-300"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                        <span>Admin Login Portal</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
