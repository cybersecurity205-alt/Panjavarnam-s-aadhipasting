import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaSection } from "@/components/sections/CtaSection";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Insights & Technical Guides | Aadhi Pasting",
  description:
    "Technical articles on paper grain direction, moisture equilibrium, adhesive selection, and calendar manufacturing efficiency.",
};

const articles = [
  {
    id: "1",
    tag: "Technical Engineering",
    title: "Eliminating Warping in High-Caliper Chipboard and Greyboard Pasting",
    excerpt:
      "A deep dive into paper grain alignment, adhesive water-activity, and multi-stage roller compression in tropical humidity environments.",
    readTime: "6 min read",
    author: "Production Operations",
    date: "September 2026",
  },
  {
    id: "2",
    tag: "Publication Planning",
    title: "Seasonal Bulk Calendar Production: Scheduling for Flawless On-Time Delivery",
    excerpt:
      "Strategic insights for publishers on sheet registration buffers, automated tinning headers, and moisture-sealed pallet dispatch.",
    readTime: "5 min read",
    author: "Commercial Estimating",
    date: "August 2026",
  },
  {
    id: "3",
    tag: "Packaging Science",
    title: "High-Tack vs. Removable Adhesives for Retail Carton & Bottle Labeling",
    excerpt:
      "Evaluating substrate compatibility, surface energy, and temperature resistance for commercial FMCG packaging applications.",
    readTime: "4 min read",
    author: "Adhesives QA Lab",
    date: "July 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-12 bg-[#FFF1F5]">
      <Container>
        <SectionHeading
          badge="Knowledge & Craft"
          title="Insights & Technical Guides"
          highlight="— Post-Press Perspectives"
          subtitle="Articles on adhesive formulations, board calipers, and production engineering from our shop floor."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
          {articles.map((art) => (
            <div
              key={art.id}
              className="flex flex-col justify-between p-7 rounded-3xl bg-white border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,139,165,0.08)] hover:shadow-[0_16px_36px_rgba(217,139,165,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D98BA5]"
            >
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#D98BA5] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F6DCE5]">
                  {art.tag}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#33313A] leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#686474] leading-relaxed font-light">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F6DCE5] flex items-center justify-between text-xs text-[#8E8A9B]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#D98BA5]" />
                  {art.readTime}
                </span>
                <span className="font-semibold text-[#D98BA5]">
                  {art.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <CtaSection />
    </div>
  );
}
