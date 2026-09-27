"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layout,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { WebsiteContent } from "@/lib/db/types";

export default function AdminContentPage() {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Website copy successfully updated in database!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update website content." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error saving content." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-3 border-[#D94F83]/30 border-t-[#D94F83] rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-semibold text-[#8E8A9B]">
          Loading website copy...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.05)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D94F83] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F6DCE5]">
              Storefront CMS
            </span>
            <span className="text-xs text-[#8E8A9B]">•</span>
            <span className="text-xs text-[#686474]">Live Homepage Content</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#33313A] tracking-tight">
            Website Content & Copy
          </h1>
          <p className="text-xs sm:text-sm text-[#686474] mt-1 font-light">
            Edit hero headlines, badges, value proposition statements, and manufacturing stats.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#D94F83]/20 transition-all flex items-center gap-1.5 self-start sm:self-auto hover:translate-y-[-1px] disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Website Copy"}</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-2.5 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero Section */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.04)] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F6DCE5]">
            <Sparkles className="w-4 h-4 text-[#D94F83]" />
            <h2 className="font-serif font-bold text-lg text-[#33313A]">
              1. Hero Header & Headline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#33313A]">Top Pill Badge</label>
              <input
                type="text"
                value={content.hero.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33313A]">Headline Line 1</label>
              <input
                type="text"
                value={content.hero.headline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, headline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33313A]">
                Highlighted Serif Accent
              </label>
              <input
                type="text"
                value={content.hero.highlight}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, highlight: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#33313A]">Subheadline Description</label>
              <textarea
                rows={2}
                value={content.hero.subheadline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subheadline: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33313A]">Primary Button Text</label>
              <input
                type="text"
                value={content.hero.primaryCtaText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, primaryCtaText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33313A]">Secondary Button Text</label>
              <input
                type="text"
                value={content.hero.secondaryCtaText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, secondaryCtaText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Trust Intro */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.04)] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F6DCE5]">
            <ShieldCheck className="w-4 h-4 text-[#D94F83]" />
            <h2 className="font-serif font-bold text-lg text-[#33313A]">
              2. Trust & Heritage Section
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#33313A]">Section Badge</label>
              <input
                type="text"
                value={content.trustIntro.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trustIntro: { ...content.trustIntro, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33313A]">Heading</label>
              <input
                type="text"
                value={content.trustIntro.heading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trustIntro: { ...content.trustIntro, heading: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#33313A]">Subheading Highlight</label>
              <input
                type="text"
                value={content.trustIntro.subheading}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trustIntro: { ...content.trustIntro, subheading: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#33313A]">Paragraph 1</label>
              <textarea
                rows={2}
                value={content.trustIntro.description1}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trustIntro: { ...content.trustIntro, description1: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#33313A]">Paragraph 2</label>
              <textarea
                rows={2}
                value={content.trustIntro.description2}
                onChange={(e) =>
                  setContent({
                    ...content,
                    trustIntro: { ...content.trustIntro, description2: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-[#FFF1F5]/30 border border-[#F6DCE5] rounded-xl text-xs text-[#33313A]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Key Numerical Statistics */}
        <div className="bg-white/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,79,131,0.04)] space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F6DCE5]">
            <Layout className="w-4 h-4 text-[#D94F83]" />
            <h2 className="font-serif font-bold text-lg text-[#33313A]">
              3. Homepage Numeric Proof Points
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="p-4 bg-[#FFF1F5]/40 rounded-2xl border border-[#F6DCE5] space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#8E8A9B]">Metric #{idx + 1}</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...content.stats];
                    newStats[idx].value = e.target.value;
                    setContent({ ...content, stats: newStats });
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-[#F6DCE5] rounded-lg text-sm font-bold text-[#D94F83]"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...content.stats];
                    newStats[idx].label = e.target.value;
                    setContent({ ...content, stats: newStats });
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-[#F6DCE5] rounded-lg text-xs text-[#686474]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#D94F83] hover:bg-[#C23C6F] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#D94F83]/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Publish Website Copy"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
