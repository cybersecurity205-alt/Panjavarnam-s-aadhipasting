"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Upload,
  AlertCircle,
  X,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";
import { Category } from "@/lib/db/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    tag: "High Volume",
    description: "",
    image: "/images/blush/cat-wall-calendar.jpg",
    displayOrder: 1,
    isActive: true,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      tag: "Calendar Series",
      description: "",
      image: "/images/blush/cat-wall-calendar.jpg",
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      tag: category.tag || "",
      description: category.description || "",
      image: category.image || "/images/blush/cat-wall-calendar.jpg",
      displayOrder: category.displayOrder || 1,
      isActive: category.isActive,
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
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setModalError(data.error || "Failed to save category.");
        setSubmitting(false);
        return;
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      setModalError("Server error while saving category.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete category "${name}"? Existing products may lose their category link.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.error || "Failed to delete category.");
      }
    } catch (err) {
      alert("Error deleting category.");
    }
  };

  const handleToggleActive = async (category: Category) => {
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !category.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) =>
          prev.map((c) => (c.id === category.id ? { ...c, isActive: !c.isActive } : c))
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
              Taxonomy & Sections
            </span>
            <span className="text-xs text-[#8E8A9B]">•</span>
            <span className="text-xs text-[#686474]">{categories.length} Categories</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#33313A] tracking-tight">
            Calendar Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#686474] mt-1 font-light">
            Manage product collections, banners, display priorities, and section copy.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#D94F83]/20 transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px]"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-16 text-xs text-[#8E8A9B]">
            Loading calendar categories...
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#F6DCE5] overflow-hidden shadow-[0_2px_12px_rgba(217,79,131,0.04)] hover:shadow-[0_6px_20px_rgba(217,79,131,0.08)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-gray-100 border-b border-[#F6DCE5]">
                  <Image
                    src={cat.image || "/images/blush/cat-wall-calendar.jpg"}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#F6DCE5] text-[10px] font-bold uppercase tracking-wider text-[#D94F83]">
                      {cat.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-mono">
                      Order: {cat.displayOrder}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleToggleActive(cat)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-xs ${
                        cat.isActive
                          ? "bg-emerald-500 text-white border-emerald-600"
                          : "bg-gray-800 text-white border-gray-900"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Hidden"}
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif font-bold text-lg text-[#33313A]">{cat.name}</h3>
                    <span className="font-mono text-[10px] text-[#8E8A9B]">{cat.slug}</span>
                  </div>
                  <p className="text-xs text-[#686474] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-[#FFF1F5]/40 border-t border-[#F6DCE5] flex items-center justify-between">
                <span className="text-[11px] text-[#8E8A9B]">ID: {cat.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg text-[#686474] hover:text-[#D94F83] hover:bg-white transition-colors"
                    title="Edit category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-[#8E8A9B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F6DCE5] shadow-2xl w-full max-w-lg p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F6DCE5] mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#33313A]">
                  {editingCategory ? "Edit Category" : "Add Calendar Category"}
                </h3>
                <p className="text-xs text-[#8E8A9B]">Configure category banner and display priority</p>
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
                <label className="text-xs font-bold text-[#33313A]">Category Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Wall Calendars"
                  className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Subtitle Tag</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. High Volume"
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#33313A]">Display Priority Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#33313A]">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of calendar products in this category..."
                  className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2 pt-2 border-t border-[#F6DCE5]/80">
                <label className="text-xs font-bold text-[#33313A]">Cover Image</label>
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
                      placeholder="/images/blush/cat-wall-calendar.jpg"
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

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#D94F83] border-[#F6DCE5] focus:ring-[#D94F83]"
                  />
                  <span className="text-xs font-semibold text-[#33313A]">Visible on Public Website</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#F6DCE5] mt-6">
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
                  className="px-5 py-2 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  {submitting ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
