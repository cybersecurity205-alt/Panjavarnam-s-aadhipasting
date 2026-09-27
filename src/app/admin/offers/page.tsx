"use client";

import React, { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Sparkles,
  Percent,
  CheckCircle,
  X,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Offer } from "@/lib/db/types";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "Festival Season Advance Booking",
    description: "Book early for bulk 2027 calendar pasting runs and save on tinning rim fabrication.",
    discountPercentage: 15,
    discountCode: "FESTIVE15",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    destinationUrl: "/products",
    isActive: true,
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/offers");
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({
      title: "Bulk Order Pre-Booking Offer",
      description: "Enjoy exclusive seasonal discounts on high-volume calendar tinning orders.",
      discountPercentage: 10,
      discountCode: "BULK10",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      destinationUrl: "/products",
      isActive: true,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discountPercentage: offer.discountPercentage ?? 10,
      discountCode: offer.discountCode || "",
      startDate: offer.startDate ? offer.startDate.split("T")[0] : "",
      endDate: offer.endDate ? offer.endDate.split("T")[0] : "",
      destinationUrl: offer.destinationUrl || "/products",
      isActive: offer.isActive,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);

    try {
      const url = editingOffer ? `/api/admin/offers/${editingOffer.id}` : "/api/admin/offers";
      const method = editingOffer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setModalError(data.error || "Failed to save offer.");
        setSubmitting(false);
        return;
      }

      setIsModalOpen(false);
      fetchOffers();
    } catch (err) {
      setModalError("Server error while saving offer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete promotional offer "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOffers((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (offer: Offer) => {
    try {
      const res = await fetch(`/api/admin/offers/${offer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !offer.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setOffers((prev) =>
          prev.map((o) => (o.id === offer.id ? { ...o, isActive: !o.isActive } : o))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.05)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D94F83] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F6DCE5]">
              Campaigns & Promos
            </span>
            <span className="text-xs text-[#8E8A9B]">•</span>
            <span className="text-xs text-[#686474]">{offers.length} Offers</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#33313A] tracking-tight">
            Special Offers & Seasonal Promos
          </h1>
          <p className="text-xs sm:text-sm text-[#686474] mt-1 font-light">
            Manage advance-booking festive discounts, coupon codes, and announcement banners.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#D94F83]/20 transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px]"
        >
          <Plus className="w-4 h-4" />
          <span>New Promo</span>
        </button>
      </div>

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-16 text-xs text-[#8E8A9B]">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="col-span-full text-center py-16 text-xs text-[#8E8A9B]">
            No promotional campaigns found. Create one to display an active banner!
          </div>
        ) : (
          offers.map((offer) => {
            const isExpired = new Date(offer.endDate) < new Date();

            return (
              <div
                key={offer.id}
                className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#F6DCE5] p-6 shadow-[0_2px_12px_rgba(217,79,131,0.04)] hover:shadow-[0_6px_20px_rgba(217,79,131,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#FFF1F5] border border-[#F6DCE5] flex items-center justify-center text-[#D94F83]">
                        <Tag className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#33313A]">{offer.title}</h3>
                        {offer.discountCode && (
                          <span className="font-mono text-xs font-bold text-[#D94F83] bg-[#FFF1F5] px-2 py-0.5 rounded border border-[#F6DCE5]">
                            Code: {offer.discountCode}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleActive(offer)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                        offer.isActive && !isExpired
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {isExpired ? "Expired" : offer.isActive ? "Active" : "Paused"}
                    </button>
                  </div>

                  <p className="text-xs text-[#686474] leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <div className="p-3 bg-[#FFF1F5]/60 rounded-xl border border-[#F6DCE5] flex items-center justify-between text-xs mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-[#33313A]">
                      <Percent className="w-4 h-4 text-[#D94F83]" />
                      <span>{offer.discountPercentage}% Discount</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#8E8A9B]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        Valid till {new Date(offer.endDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F6DCE5] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8E8A9B] font-mono">Link: {offer.destinationUrl}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(offer)}
                      className="p-1.5 rounded-lg text-[#686474] hover:text-[#D94F83] hover:bg-[#FFF1F5] transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(offer.id, offer.title)}
                      className="p-1.5 rounded-lg text-[#8E8A9B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F6DCE5] shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F6DCE5] mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#33313A]">
                  {editingOffer ? "Edit Promotional Offer" : "Create Festive Offer"}
                </h3>
                <p className="text-xs text-[#8E8A9B]">Banner announcement configuration</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#8E8A9B] hover:text-[#33313A] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Festival Season Advance Booking"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Promo Coupon Code</label>
                  <input
                    type="text"
                    value={formData.discountCode}
                    onChange={(e) => setFormData({ ...formData, discountCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. FESTIVE15"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A] uppercase font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Announcement Text</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Customer incentive copy..."
                  className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Destination URL</label>
                <input
                  type="text"
                  value={formData.destinationUrl}
                  onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
                  placeholder="/products or /contact"
                  className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#D94F83] border-[#F6DCE5] focus:ring-[#D94F83]"
                  />
                  <span className="text-xs font-semibold text-[#33313A]">Active Campaign Banner</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#F6DCE5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#686474] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  {submitting ? "Saving..." : editingOffer ? "Update Offer" : "Launch Promo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
