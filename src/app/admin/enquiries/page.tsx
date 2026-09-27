"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  Trash2,
  Edit3,
  X,
  Plus,
  Send,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Enquiry, EnquiryStatus } from "@/lib/db/types";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Modal / Detail state
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [editStatus, setEditStatus] = useState<EnquiryStatus>("new");
  const [editNotes, setEditNotes] = useState("");

  // New enquiry form
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Tamil Daily Calendar Block Mounting",
    quantity: "5000 Units",
    message: "",
    status: "new" as EnquiryStatus,
    notes: "",
  });

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/enquiries?status=${statusFilter}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to load enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, search]);

  const handleOpenDetail = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.status);
    setEditNotes(enquiry.notes || "");
    setIsDetailOpen(true);
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          notes: editNotes,
        }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e))
        );
        setSelectedEnquiry(data.enquiry);
        setIsDetailOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string, enquiryNumber: string) => {
    if (!window.confirm(`Delete enquiry ${enquiryNumber}?`)) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setIsDetailOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEnquiry),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddOpen(false);
        fetchEnquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "new":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "in_progress":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "quoted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.05)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D94F83] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F6DCE5]">
              Commercial CRM
            </span>
            <span className="text-xs text-[#8E8A9B]">•</span>
            <span className="text-xs text-[#686474]">{enquiries.length} Enquiries</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#33313A] tracking-tight">
            Commercial Quotes & Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#686474] mt-1 font-light">
            Manage incoming inquiries, customer specifications, follow-up notes, and direct WhatsApp quotations.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#D94F83]/20 transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px]"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Enquiry</span>
        </button>
      </div>

      {/* Status Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#F6DCE5]">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(["all", "new", "in_progress", "quoted", "completed", "cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === tab
                  ? "bg-[#D94F83] text-white shadow-2xs"
                  : "bg-[#FFF1F5]/60 hover:bg-[#FFF1F5] text-[#686474] border border-[#F6DCE5]"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8A9B]" />
          <input
            type="text"
            placeholder="Search client, phone, or #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FFF1F5]/40 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A] placeholder-[#8E8A9B] focus:outline-none focus:ring-2 focus:ring-[#D94F83]/30 focus:border-[#D94F83]"
          />
        </div>
      </div>

      {/* Enquiries List */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.04)] overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-xs text-[#8E8A9B]">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#8E8A9B]">
            No commercial enquiries found matching the selected filter.
          </div>
        ) : (
          <div className="divide-y divide-[#F6DCE5]/60">
            {enquiries.map((enq) => {
              const waMessage = `Hello ${enq.name}, thanking you for contacting Aadhi Pasting regarding inquiry ${enq.enquiryNumber} (${enq.service}). We have prepared your commercial quotation:`;
              const waUrl = `https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(waMessage)}`;

              return (
                <div
                  key={enq.id}
                  className="p-5 sm:p-6 hover:bg-[#FFF1F5]/25 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#D94F83]">
                        {enq.enquiryNumber}
                      </span>
                      <span className="text-sm font-bold text-[#33313A]">{enq.name}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        {enq.status.replace("_", " ")}
                      </span>
                      <span className="text-[11px] text-[#8E8A9B]">
                        {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#686474]">
                      <div className="flex items-center gap-1 font-mono">
                        <Phone className="w-3.5 h-3.5 text-[#D94F83]" />
                        <span>{enq.phone}</span>
                      </div>
                      {enq.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-[#D94F83]" />
                          <span>{enq.email}</span>
                        </div>
                      )}
                      <div className="font-medium text-[#33313A]">
                        Service: <span className="text-[#D94F83]">{enq.service}</span>
                        {enq.quantity ? ` • Volume: ${enq.quantity}` : ""}
                      </div>
                    </div>

                    {enq.message && (
                      <p className="text-xs text-[#686474] bg-[#FFF1F5]/50 p-2.5 rounded-xl border border-[#F6DCE5]/70 italic">
                        &quot;{enq.message}&quot;
                      </p>
                    )}

                    {enq.notes && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <span className="font-bold">Admin Note:</span> {enq.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Quote</span>
                    </a>

                    <button
                      onClick={() => handleOpenDetail(enq)}
                      className="px-3.5 py-2 rounded-full bg-[#FFF1F5] hover:bg-[#D94F83] text-[#D94F83] hover:text-white border border-[#F6DCE5] text-xs font-semibold transition-colors"
                    >
                      Status / Notes
                    </button>

                    <button
                      onClick={() => handleDelete(enq.id, enq.enquiryNumber)}
                      className="p-2 rounded-full text-[#8E8A9B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Status & Notes Modal */}
      {isDetailOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F6DCE5] shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F6DCE5] mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#33313A]">
                  Update Enquiry {selectedEnquiry.enquiryNumber}
                </h3>
                <p className="text-xs text-[#8E8A9B]">Client: {selectedEnquiry.name}</p>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-1.5 rounded-full text-[#8E8A9B] hover:text-[#33313A] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Pipeline Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as EnquiryStatus)}
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A] focus:outline-none focus:ring-2 focus:ring-[#D94F83]/30"
                >
                  <option value="new">New (Awaiting Review)</option>
                  <option value="in_progress">In Progress (Estimating & Specs Check)</option>
                  <option value="quoted">Quoted (Commercial Estimate Sent)</option>
                  <option value="completed">Completed (Order Confirmed / Closed)</option>
                  <option value="cancelled">Cancelled (Declined / Out of Scope)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Internal Admin Notes</label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record quotation rate, paper thickness discussed, tinning rim specs, or sample shipment tracking..."
                  className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A] focus:outline-none focus:ring-2 focus:ring-[#D94F83]/30"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#F6DCE5]">
                <button
                  type="button"
                  onClick={() => setIsDetailOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#686474] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={savingNotes}
                  onClick={handleUpdateStatusAndNotes}
                  className="px-5 py-2 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  {savingNotes ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Enquiry Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F6DCE5] shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F6DCE5] mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#33313A]">
                  Log Commercial Inquiry
                </h3>
                <p className="text-xs text-[#8E8A9B]">Record an incoming phone call or plant walk-in</p>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1.5 rounded-full text-[#8E8A9B] hover:text-[#33313A] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEnquiry} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newEnquiry.name}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newEnquiry.phone}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                    placeholder="+91 90808 XXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Email (Optional)</label>
                <input
                  type="email"
                  value={newEnquiry.email}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                  placeholder="client@company.com"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Service Requested</label>
                  <input
                    type="text"
                    value={newEnquiry.service}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, service: e.target.value })}
                    placeholder="e.g. Daily Calendar Pasting"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Estimated Quantity</label>
                  <input
                    type="text"
                    value={newEnquiry.quantity}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, quantity: e.target.value })}
                    placeholder="e.g. 5,000 Pcs"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Customer Message / Specs</label>
                <textarea
                  rows={2}
                  value={newEnquiry.message}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, message: e.target.value })}
                  placeholder="Client notes on caliper thickness, delivery date..."
                  className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#F6DCE5]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#686474] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Record Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
