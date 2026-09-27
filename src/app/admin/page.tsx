"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Inbox,
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  MessageSquare,
  Sparkles,
  Phone,
  AlertCircle,
  RefreshCw,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalCategories: number;
  activeCategories: number;
  totalEnquiries: number;
  pendingEnquiries: number;
  totalOrders: number;
  pendingOrders: number;
  totalOrderRevenue: number;
  activeOffers: number;
  totalGalleryItems: number;
  recentEnquiries: Array<{
    id: string;
    enquiryNumber: string;
    name: string;
    phone: string;
    service: string;
    quantity?: string;
    status: string;
    createdAt: string;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: Array<{ name: string; quantity: number }>;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-[#FAF7F2] text-[#55122C] border-[#C5A059]/35";
      case "in_progress":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "quoted":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "completed":
      case "delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "processing":
      case "shipped":
        return "bg-purple-50 text-purple-800 border-purple-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-2 border-[#C5A059]/30 border-t-[#55122C] rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-semibold text-[#7D7886]">
          Gathering live studio metrics...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#C5A059]/25 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#55122C] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#C5A059]/35">
              Executive Overview
            </span>
            <span className="text-xs text-[#7D7886]">•</span>
            <span className="text-xs text-[#595561]">Aadhi Pasting Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#232126] tracking-tight">
            Studio Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#595561] mt-1 font-light">
            Monitor real-time calendar pasting orders, commercial enquiries, product inventory, and site content.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="p-2.5 bg-white hover:bg-[#FAF7F2] text-[#595561] hover:text-[#55122C] rounded-xl border border-[#C5A059]/25 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#55122C]" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/admin/products"
            className="btn-burgundy-gold px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 hover:translate-y-[-1px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Products */}
        <Link
          href="/admin/products"
          className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#C5A059]/25 shadow-card hover:border-[#C5A059]/60 hover:-translate-y-1 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7886]">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#232126]">
              {stats?.totalProducts || 0}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#595561]">
              <span>{stats?.activeProducts || 0} active in catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#55122C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>

        {/* Card 2: Categories */}
        <Link
          href="/admin/categories"
          className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#C5A059]/25 shadow-card hover:border-[#C5A059]/60 hover:-translate-y-1 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7886]">
              Calendar Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#232126]">
              {stats?.totalCategories || 0}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#595561]">
              <span>{stats?.activeCategories || 0} live sections</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#55122C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>

        {/* Card 3: Enquiries */}
        <Link
          href="/admin/enquiries"
          className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#C5A059]/25 shadow-card hover:border-[#C5A059]/60 hover:-translate-y-1 transition-all group relative overflow-hidden"
        >
          {stats && stats.pendingEnquiries > 0 && (
            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#55122C]"></span>
            </span>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7886]">
              Commercial Enquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#232126]">
              {stats?.totalEnquiries || 0}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-[#55122C] font-semibold">
                {stats?.pendingEnquiries || 0} pending action
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#55122C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>

        {/* Card 4: Orders & Revenue */}
        <Link
          href="/admin/orders"
          className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#C5A059]/25 shadow-card hover:border-[#C5A059]/60 hover:-translate-y-1 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D7886]">
              Production Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-bold text-[#232126]">
              ₹{(stats?.totalOrderRevenue || 0).toLocaleString("en-IN")}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#595561]">
              <span>{stats?.totalOrders || 0} orders ({stats?.pendingOrders || 0} active)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#55122C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Navigation Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <Link
          href="/admin/enquiries"
          className="p-4 bg-white/80 hover:bg-white rounded-2xl border border-[#C5A059]/25 hover:border-[#C5A059]/60 transition-all flex items-center gap-3 shadow-2xs group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
            <Inbox className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-[#232126]">Enquiry Desk</p>
            <p className="text-[10px] text-[#7D7886]">Reply to clients</p>
          </div>
        </Link>

        <Link
          href="/admin/offers"
          className="p-4 bg-white/80 hover:bg-white rounded-2xl border border-[#C5A059]/25 hover:border-[#C5A059]/60 transition-all flex items-center gap-3 shadow-2xs group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
            <Tag className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-[#232126]">Festive Offers</p>
            <p className="text-[10px] text-[#7D7886]">{stats?.activeOffers || 0} live banners</p>
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="p-4 bg-white/80 hover:bg-white rounded-2xl border border-[#C5A059]/25 hover:border-[#C5A059]/60 transition-all flex items-center gap-3 shadow-2xs group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-[#232126]">Homepage CMS</p>
            <p className="text-[10px] text-[#7D7886]">Headlines & copy</p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-4 bg-white/80 hover:bg-white rounded-2xl border border-[#C5A059]/25 hover:border-[#C5A059]/60 transition-all flex items-center gap-3 shadow-2xs group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-center text-[#55122C] group-hover:scale-110 transition-transform">
            <FloralDecor variant="crest" className="w-4 h-4 text-[#55122C]" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-[#232126]">Business Info</p>
            <p className="text-[10px] text-[#7D7886]">Contacts & security</p>
          </div>
        </Link>
      </div>

      {/* Main Split Tables: Recent Enquiries & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Enquiries */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#C5A059]/25 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20 mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#232126]">
                Recent Commercial Inquiries
              </h2>
              <p className="text-xs text-[#7D7886]">
                Direct quote submissions from print buyers & publishers
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#55122C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!stats?.recentEnquiries || stats.recentEnquiries.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#7D7886]">
              No commercial enquiries logged yet.
            </div>
          ) : (
            <div className="divide-y divide-[#C5A059]/15">
              {stats.recentEnquiries.map((enq) => {
                const waMessage = `Hello ${enq.name}, regarding your inquiry ${enq.enquiryNumber} for ${enq.service} with Aadhi Pasting:`;
                const waUrl = `https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMessage)}`;

                return (
                  <div key={enq.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#232126]">{enq.name}</span>
                        <span className="font-mono text-[10px] text-[#7D7886]">({enq.enquiryNumber})</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(enq.status)}`}>
                          {enq.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-[#595561]">
                        <span className="font-medium text-[#232126]">{enq.service}</span>
                        {enq.quantity ? ` • Qty: ${enq.quantity}` : ""}
                      </p>
                      <p className="text-[11px] text-[#7D7886]">
                        {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-emerald-800 hover:text-white border border-[#25D366]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>

                      <Link
                        href={`/admin/enquiries?id=${enq.id}`}
                        className="px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#55122C] text-[#55122C] hover:text-[#FAF7F2] border border-[#C5A059]/30 text-xs font-semibold transition-colors"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Recent Orders */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#C5A059]/25 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20 mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#232126]">
                Recent Production Orders
              </h2>
              <p className="text-xs text-[#7D7886]">
                Batch delivery & dispatch tracking
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#55122C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!stats?.recentOrders || stats.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#7D7886]">
              No active orders recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-[#C5A059]/15">
              {stats.recentOrders.map((ord) => (
                <div key={ord.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#232126]">{ord.orderNumber}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(ord.status)}`}>
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#595561] font-medium">{ord.customerName}</p>
                    <p className="text-[11px] text-[#7D7886]">
                      {ord.items && ord.items.length > 0 ? `${ord.items.length} item(s)` : "Commercial batch"}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-bold font-mono text-[#55122C]">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <Link
                      href={`/admin/orders`}
                      className="text-[11px] text-[#55122C] hover:underline font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
