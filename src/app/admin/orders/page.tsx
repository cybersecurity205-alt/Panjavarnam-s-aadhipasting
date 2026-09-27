"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Package,
} from "lucide-react";
import { Order, OrderStatus } from "@/lib/db/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Modals
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>("pending");
  const [newNotes, setNewNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // New Order Form
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    itemName: "Tamil Daily Calendar Block (15x20 in)",
    itemQty: 1000,
    itemPrice: 45,
    status: "pending" as OrderStatus,
    notes: "",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/orders?status=${statusFilter}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, search]);

  const handleOpenStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setNewNotes(order.notes || "");
    setIsStatusModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          notes: newNotes,
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? data.order : o))
        );
        setIsStatusModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, orderNumber: string) => {
    if (!window.confirm(`Delete order record ${orderNumber}?`)) return;
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const totalAmount = Number(newOrder.itemQty) * Number(newOrder.itemPrice);
      const payload = {
        customerName: newOrder.customerName,
        phone: newOrder.phone,
        email: newOrder.email || undefined,
        address: newOrder.address || undefined,
        items: [
          {
            productId: "custom",
            name: newOrder.itemName,
            quantity: Number(newOrder.itemQty),
            price: Number(newOrder.itemPrice),
          },
        ],
        totalAmount,
        status: newOrder.status,
        notes: newOrder.notes,
      };

      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "processing":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "shipped":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#C5A059]/25 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#55122C] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#C5A059]/35">
              Fulfillment & Dispatch
            </span>
            <span className="text-xs text-[#7D7886]">•</span>
            <span className="text-xs text-[#595561]">{orders.length} Orders</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#232126] tracking-tight">
            Production Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-[#595561] mt-1 font-light">
            Monitor bulk commercial batches, tinning delivery milestones, and dispatch billing.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-burgundy-gold px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px]"
        >
          <Plus className="w-4 h-4" />
          <span>Record Order</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#C5A059]/25 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === tab
                  ? "btn-burgundy-gold shadow-2xs"
                  : "bg-white/80 hover:bg-[#FAF7F2] text-[#595561] hover:text-[#55122C] border border-[#C5A059]/25"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D7886]" />
          <input
            type="text"
            placeholder="Search order # or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#C5A059]/25 shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-xs text-[#7D7886]">Loading production orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#7D7886]">
            No orders found for the selected filter.
          </div>
        ) : (
          <div className="divide-y divide-[#C5A059]/15">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 hover:bg-[#FAF7F2]/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#55122C]">
                      {order.orderNumber}
                    </span>
                    <span className="text-sm font-bold text-[#232126]">{order.customerName}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-[11px] text-[#7D7886]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#595561]">
                    <div className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{order.phone}</span>
                    </div>
                    {order.address && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="line-clamp-1">{order.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Line Items */}
                  <div className="bg-[#FAF7F2]/70 p-2.5 rounded-xl border border-[#C5A059]/20 space-y-1 text-xs">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#232126]">
                        <span>
                          {it.name} <span className="text-[#7D7886]">x {it.quantity}</span>
                        </span>
                        <span className="font-mono font-medium">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <span className="font-bold">Production Note:</span> {order.notes}
                    </div>
                  )}
                </div>

                {/* Right Total & Actions */}
                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#C5A059]/20">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-[#7D7886] block">
                      Order Value
                    </span>
                    <span className="font-mono text-lg font-bold text-[#232126]">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenStatusModal(order)}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#55122C] text-[#55122C] hover:text-[#FAF7F2] border border-[#C5A059]/30 text-xs font-semibold transition-colors"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => handleDelete(order.id, order.orderNumber)}
                      className="p-1.5 rounded-full text-[#7D7886] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Order Status Modal */}
      {isStatusModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#C5A059]/35 shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20 mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#232126]">
                  Update Order {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[#7D7886]">Client: {selectedOrder.customerName}</p>
              </div>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="p-1.5 rounded-full text-[#7D7886] hover:text-[#232126] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Fulfillment Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                >
                  <option value="pending">Pending (Awaiting Raw Materials / Approval)</option>
                  <option value="processing">Processing (On Press / Tinning / Gluing)</option>
                  <option value="shipped">Shipped (Dispatched via Freight)</option>
                  <option value="delivered">Delivered (Completed)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Dispatch / Tracking Note</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="LR Number, lorry booking slip, pallet count..."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#C5A059]/20">
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#595561] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleUpdateStatus}
                  className="btn-burgundy-gold px-5 py-2 rounded-xl text-xs font-semibold shadow-sm"
                >
                  {submitting ? "Updating..." : "Save Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Order Creation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#C5A059]/35 shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20 mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#232126]">
                  Record Production Order
                </h3>
                <p className="text-xs text-[#7D7886]">Enter client details and billing line items</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-[#7D7886] hover:text-[#232126] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    placeholder="e.g. Sivakasi Printers Association"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    placeholder="+91 90808 XXXXX"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Delivery Address</label>
                <input
                  type="text"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  placeholder="Plot / Street / City"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Calendar Item Description *</label>
                <input
                  type="text"
                  required
                  value={newOrder.itemName}
                  onChange={(e) => setNewOrder({ ...newOrder, itemName: e.target.value })}
                  placeholder="e.g. Daily Tamil Block Mounting"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Quantity Units *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newOrder.itemQty}
                    onChange={(e) => setNewOrder({ ...newOrder, itemQty: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Unit Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newOrder.itemPrice}
                    onChange={(e) => setNewOrder({ ...newOrder, itemPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2]/50 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#C5A059]/25 flex justify-between items-center text-xs">
                <span className="font-medium text-[#595561]">Calculated Order Total:</span>
                <span className="font-bold font-mono text-base text-[#55122C]">
                  ₹{(Number(newOrder.itemQty) * Number(newOrder.itemPrice)).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#C5A059]/20">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#595561] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-burgundy-gold px-5 py-2 rounded-xl text-xs font-semibold shadow-sm"
                >
                  {submitting ? "Recording..." : "Record Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
