"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Upload,
  X,
  AlertCircle,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { GalleryItemRecord } from "@/lib/db/types";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItemRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Calendar Pasting",
    description: "",
    image: "/images/blush/cat-wall-calendar.jpg",
    alt: "",
    caliperOrSize: "15x20 in / 2.0mm Greyboard",
    displayOrder: 1,
    isPublished: true,
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Calendar Pasting",
      description: "",
      image: "/images/blush/cat-wall-calendar.jpg",
      alt: "",
      caliperOrSize: "15x20 in / 2.0mm Greyboard",
      displayOrder: items.length + 1,
      isPublished: true,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItemRecord) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      alt: item.alt,
      caliperOrSize: item.caliperOrSize || "",
      displayOrder: item.displayOrder,
      isPublished: item.isPublished,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setModalError(null);

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        setModalError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      setModalError("Error uploading image file.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);

    try {
      const url = editingItem
        ? `/api/admin/gallery/${editingItem.id}`
        : "/api/admin/gallery";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setModalError(data.error || "Failed to save gallery item.");
        setSubmitting(false);
        return;
      }

      setIsModalOpen(false);
      fetchGallery();
    } catch (err) {
      setModalError("Server error while saving gallery item.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete photo item "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
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
              Visual Showcase
            </span>
            <span className="text-xs text-[#8E8A9B]">•</span>
            <span className="text-xs text-[#686474]">{items.length} Photographs</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#33313A] tracking-tight">
            Portfolio Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#686474] mt-1 font-light">
            Showcase post-press precision, calendar mounting blocks, and facility craftsmanship.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#D94F83]/20 transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px]"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photograph</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-16 text-xs text-[#8E8A9B]">Loading gallery...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-16 text-xs text-[#8E8A9B]">
            No photographs found. Click &quot;Upload Photograph&quot; to add.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#F6DCE5] overflow-hidden shadow-[0_2px_12px_rgba(217,79,131,0.04)] hover:shadow-[0_6px_20px_rgba(217,79,131,0.08)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 border-b border-[#F6DCE5]">
                  <Image
                    src={item.image || "/images/blush/cat-wall-calendar.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#F6DCE5] text-[10px] font-bold uppercase tracking-wider text-[#D94F83]">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.isPublished
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-serif font-bold text-base text-[#33313A] line-clamp-1">
                    {item.title}
                  </h3>
                  {item.caliperOrSize && (
                    <span className="text-[10px] font-mono text-[#D94F83] bg-[#FFF1F5] px-2 py-0.5 rounded border border-[#F6DCE5] mt-1 inline-block">
                      {item.caliperOrSize}
                    </span>
                  )}
                  <p className="text-xs text-[#686474] mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 bg-[#FFF1F5]/40 border-t border-[#F6DCE5] flex items-center justify-between">
                <span className="text-[11px] text-[#8E8A9B]">Order: {item.displayOrder}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-[#686474] hover:text-[#D94F83] hover:bg-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg text-[#8E8A9B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F6DCE5] shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F6DCE5] mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#33313A]">
                  {editingItem ? "Edit Gallery Item" : "Add Portfolio Photograph"}
                </h3>
                <p className="text-xs text-[#8E8A9B]">Upload workshop or finished product photo</p>
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
                <label className="text-xs font-bold text-[#33313A]">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Daily Tamil Block Mounting"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Wall Calendars"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Caliper / Dimensions</label>
                  <input
                    type="text"
                    value={formData.caliperOrSize}
                    onChange={(e) => setFormData({ ...formData, caliperOrSize: e.target.value })}
                    placeholder="15x20 in / 2.0mm"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2 pt-2 border-t border-[#F6DCE5]/80">
                <label className="text-xs font-bold text-[#33313A]">Photograph *</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative border border-[#F6DCE5] shrink-0">
                    <Image
                      src={formData.image || "/images/blush/cat-wall-calendar.jpg"}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/blush/..."
                      className="w-full px-3 py-1.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-lg text-xs font-mono text-[#33313A]"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF1F5] hover:bg-[#F6DCE5] text-[#D94F83] text-xs font-semibold rounded-lg border border-[#F6DCE5] cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading..." : "Upload Local Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Notes on finishing craftsmanship..."
                  className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[#D94F83] border-[#F6DCE5] focus:ring-[#D94F83]"
                  />
                  <span className="text-xs font-semibold text-[#33313A]">Published in Gallery</span>
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
                  {submitting ? "Saving..." : editingItem ? "Update Item" : "Save Photograph"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
