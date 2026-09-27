"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Inbox,
  ShoppingBag,
  Tag,
  Image as ImageIcon,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
  Clock,
  Sparkles,
  Phone,
  Bell,
} from "lucide-react";
import { FloralDecor } from "@/components/ui/FloralDecor";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Layers },
  { name: "Commercial Enquiries", href: "/admin/enquiries", icon: Inbox },
  { name: "Orders & Production", href: "/admin/orders", icon: ShoppingBag },
  { name: "Promos & Offers", href: "/admin/offers", icon: Tag },
  { name: "Portfolio Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Website CMS Content", href: "/admin/content", icon: FileText },
  { name: "Settings & Security", href: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Admin session details if not login page
  useEffect(() => {
    if (isLoginPage) return;

    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.authenticated && data.user) {
          setAdminUser(data.user);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, isLoginPage, router]);

  // Close sidebar drawer on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to end this admin session?")) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  // If on login page, render children directly without admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1D24] flex flex-col font-sans antialiased">
      {/* Top Bar */}
      <header className="h-16 sm:h-18 bg-white/90 backdrop-blur-2xl border-b border-[#C5A059]/25 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1F1D24] hover:bg-[#FAF6EE] hover:text-[#55122C] border border-[#C5A059]/25 transition-colors"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo & Studio title */}
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-full bg-[#FAF6EE] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] shadow-xs group-hover:scale-105 transition-transform">
              <FloralDecor variant="crest" className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-serif font-bold text-lg leading-tight text-[#1F1D24]">
                <span>AADHI</span>
                <span className="text-[#55122C]">PASTING</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-[#7A7580] block font-sans">
                Admin Control Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live Clock */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#5F5B66] bg-white/60 px-3 py-1.5 rounded-full border border-[#C5A059]/25">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-mono text-[11px] font-medium">{currentTime}</span>
          </div>

          {/* Live Website Link */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F5B66] hover:text-[#55122C] btn-liquid-glass px-3.5 py-1.5 rounded-full shadow-xs transition-colors"
          >
            <span className="hidden sm:inline">View Public Store</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
          </Link>

          {/* Admin Profile & Status */}
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-[#C5A059]/25">
            <div className="text-right">
              <div className="text-xs font-bold text-[#1F1D24] leading-tight">
                {adminUser?.name || "Administrator"}
              </div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Super Admin
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FAF6EE] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] font-bold text-xs shadow-xs">
              AP
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Log Out"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main App Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static top-16 sm:top-18 bottom-0 left-0 w-64 sm:w-68 bg-white/90 lg:bg-white/75 backdrop-blur-2xl border-r border-[#C5A059]/25 z-30 flex flex-col justify-between py-6 px-4 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Navigation Links */}
          <div className="space-y-6 overflow-y-auto pr-1">
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#7A7580] mb-2">
                Business Management
              </div>
              <nav className="space-y-1">
                {navItems.slice(0, 5).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group
                        ${
                          isActive
                            ? "btn-burgundy-gold font-semibold text-white"
                            : "text-[#5F5B66] hover:bg-[#FAF6EE] hover:text-[#55122C]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#C5A059] group-hover:scale-110 transition-transform"}`} />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? "text-white" : "text-[#7A7580]"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#7A7580] mb-2">
                Storefront & Content
              </div>
              <nav className="space-y-1">
                {navItems.slice(5).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group
                        ${
                          isActive
                            ? "btn-burgundy-gold font-semibold text-white"
                            : "text-[#5F5B66] hover:bg-[#FAF6EE] hover:text-[#55122C]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#C5A059] group-hover:scale-110 transition-transform"}`} />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? "text-white" : "text-[#7A7580]"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer info */}
          <div className="pt-4 border-t border-[rgba(218,143,173,0.25)]">
            <div className="p-3 liquid-glass-card rounded-2xl text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#39313A] mb-1">
                <span>Production Facility</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-[#6B6570]">
                Aadhi Pasting Central Unit, Sivakasi & Chennai
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
