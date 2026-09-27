"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  Check,
  X,
  AlertCircle,
  Filter,
  CheckCircle2,
  Tag,
  Star,
  Eye,
} from "lucide-react";
import { Product, Category } from "@/lib/db/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    categoryId: "",
    price: 50,
    salePrice: "",
    stock: 1000,
    availability: "in_stock" as "in_stock" | "out_of_stock" | "made_to_order",
    isFeatured: false,
    isActive: true,
    image: "/images/blush/cat-wall-calendar.jpg",
    shortDescription: "",
    description: "",
    specs: "High-Caliper Greyboard, Precision Mounting, Zero-Slip Tinning",
  });

  // Fetch products and categories
  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        fetch(`/api/admin/products?search=${encodeURIComponent(search)}&categoryId=${selectedCategory}`),
        fetch("/api/admin/categories"),
      ]);

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodData.success) setProducts(prodData.products);
      if (catData.success) setCategories(catData.categories);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      sku: `AP-${Date.now().toString().slice(-4)}`,
      categoryId: categories[0]?.id || "",
      price: 50,
      salePrice: "",
      stock: 1000,
      availability: "in_stock",
      isFeatured: false,
      isActive: true,
      image: "/images/blush/cat-wall-calendar.jpg",
      shortDescription: "",
      description: "",
      specs: "High-Caliper Greyboard, Precision Mounting, Zero-Slip Tinning",
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      categoryId: product.categoryId,
      price: product.price,
      salePrice: product.salePrice ? String(product.salePrice) : "",
      stock: product.stock ?? 1000,
      availability: product.availability,
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      image: product.image,
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      specs: Array.isArray(product.specs) ? product.specs.join(", ") : "",
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

    const specsArray = formData.specs
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      sku: formData.sku,
      categoryId: formData.categoryId,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
      stock: Number(formData.stock),
      availability: formData.availability,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
      image: formData.image,
      images: [formData.image],
      shortDescription: formData.shortDescription,
      description: formData.description,
      specs: specsArray,
    };

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setModalError(data.error || "Failed to save product.");
        setSubmitting(false);
        return;
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setModalError("Server error while saving product.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Failed to delete product.");
      }
    } catch (err) {
      alert("Error deleting product.");
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isActive: !p.isActive } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#C5A059]/25 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#55122C] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#C5A059]/30">
              Catalogue & Inventory
            </span>
            <span className="text-xs text-[#7D7886]">•</span>
            <span className="text-xs text-[#595561]">{products.length} Products</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#232126] tracking-tight">
            Manage Products
          </h1>
          <p className="text-xs sm:text-sm text-[#595561] mt-1 font-light">
            Create, update pricing, upload photographs, and configure calendar specifications.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#55122C] hover:bg-[#400D21] text-[#FAF7F2] rounded-xl text-xs font-semibold shadow-sm shadow-[#55122C]/20 transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px]"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#C5A059]/25">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D7886]" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#7D7886] shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-60 px-3 py-2 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
          >
            <option value="all">All Calendar Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#C5A059]/25 shadow-card overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-xs text-[#7D7886]">Loading catalogue...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#7D7886]">
            No products found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2]/80 text-[#7D7886] uppercase font-bold text-[10px] tracking-wider border-b border-[#C5A059]/20">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Availability</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A059]/15 text-[#232126]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden relative border border-[#C5A059]/25 shrink-0">
                          <Image
                            src={product.image || "/images/blush/cat-wall-calendar.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm text-[#232126] line-clamp-1">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10px] text-[#7D7886]">{product.sku}</span>
                            {product.isFeatured && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                <Star className="w-2.5 h-2.5 fill-current" /> Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#595561]">
                      <span className="bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#C5A059]/25 text-[11px] font-medium">
                        {product.categoryName}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold font-mono text-[#232126]">₹{product.price}</div>
                      {product.salePrice && (
                        <div className="text-[10px] text-[#7D7886] line-through font-mono">
                          ₹{product.salePrice}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#595561]">
                      {product.stock ?? "N/A"}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          product.availability === "in_stock"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : product.availability === "made_to_order"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {product.availability.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(product)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                          product.isActive
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200"
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {product.isActive ? "Active" : "Hidden"}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-1.5 rounded-lg text-[#595561] hover:text-[#55122C] hover:bg-[#FAF7F2] transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 rounded-lg text-[#7D7886] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#C5A059]/30 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/20 mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#232126]">
                  {editingProduct ? "Edit Product" : "Add New Calendar Product"}
                </h3>
                <p className="text-xs text-[#7D7886]">
                  Configure commercial specifications, pricing, and visual assets
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#7D7886] hover:text-[#232126] hover:bg-[#FAF7F2]"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Daily Tamil Calendar Tear-Off Block (15x20 in)"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  />
                </div>

                {/* SKU */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">SKU Code</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="AP-CAL-001"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Category *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Regular Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  />
                </div>

                {/* Sale Price */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Sale Price (₹, optional)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="Optional discount price"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Available Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  />
                </div>

                {/* Availability */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#232126]">Availability Status</label>
                  <select
                    value={formData.availability}
                    onChange={(e: any) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#55122C]"
                  >
                    <option value="in_stock">In Stock (Ready for Dispatch)</option>
                    <option value="made_to_order">Made to Order (Commercial Run)</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Image Upload & Preview */}
              <div className="space-y-2 pt-2 border-t border-[#C5A059]/20">
                <label className="text-xs font-bold text-[#232126]">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative border border-[#C5A059]/25 shrink-0">
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
                      placeholder="Image URL or upload below"
                      className="w-full px-3 py-1.5 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-lg text-xs font-mono text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#55122C] text-xs font-semibold rounded-lg border border-[#C5A059]/30 cursor-pointer transition-colors">
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

              {/* Short Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Short Highlight Summary</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="e.g. Daily 365-day tear-off calendar on 2.0mm greyboard."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Full Specifications & Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of mounting tolerance, board thickness, adhesive, and tinning specs..."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                />
              </div>

              {/* Specs (comma separated) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#232126]">Technical Spec Bullets (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  placeholder="Sheet Size: 15x20 in, 2.0mm Greyboard, Anti-Warp Glue"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2]/60 border border-[#C5A059]/30 rounded-xl text-xs text-[#232126] placeholder-[#7D7886] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40"
                />
              </div>

              {/* Checkboxes: Featured & Active */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#55122C] border-[#C5A059]/40 focus:ring-[#C5A059]"
                  />
                  <span className="text-xs font-semibold text-[#232126]">Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#55122C] border-[#C5A059]/40 focus:ring-[#C5A059]"
                  />
                  <span className="text-xs font-semibold text-[#232126]">Active in Catalogue</span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#C5A059]/20 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#595561] hover:bg-[#FAF7F2] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#55122C] hover:bg-[#400D21] text-[#FAF7F2] rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  {submitting ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
