import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category?: string;
  title: string;
  description: string;
  specs?: string[];
  href?: string;
  imagePlaceholder?: React.ReactNode;
  popular?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  title,
  description,
  specs = [],
  href = "/services",
  imagePlaceholder,
  popular = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-[#F6DCE5]",
        "shadow-[0_4px_20px_rgba(217,139,165,0.08)] hover:shadow-[0_16px_36px_rgba(217,139,165,0.18)]",
        "transition-all duration-300 ease-out hover:-translate-y-1.5",
        popular && "border-[#D98BA5] shadow-[0_8px_30px_rgba(217,139,165,0.2)]",
        className
      )}
      {...props}
    >
      <div>
        {/* Visual Frame / Photography Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#FFF1F5] border border-[#F6DCE5] mb-5 overflow-hidden flex items-center justify-center p-3">
          {imagePlaceholder ? (
            imagePlaceholder
          ) : (
            <div className="text-center space-y-2">
              <div className="h-11 w-11 mx-auto rounded-full bg-white border border-[#D98BA5]/40 shadow-xs flex items-center justify-center text-[#D98BA5]">
                <span className="font-serif font-bold text-sm">AP</span>
              </div>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#8E8A9B]">
                Aadhi Pasting Substrate
              </span>
            </div>
          )}

          {popular && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D98BA5] text-white shadow-xs">
              Featured Solution
            </span>
          )}
        </div>

        {/* Category Badge */}
        {category && (
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#D98BA5] mb-1.5">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#33313A] group-hover:text-[#D98BA5] transition-colors leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-[#686474] leading-relaxed font-light">
          {description}
        </p>

        {/* Specifications / Highlights */}
        {specs.length > 0 && (
          <ul className="mt-4 space-y-2 pt-3.5 border-t border-[#F6DCE5]">
            {specs.map((spec, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-[#33313A]">
                <span className="h-4 w-4 rounded-full bg-[#FFF1F5] text-[#D98BA5] flex items-center justify-center shrink-0 border border-[#F6DCE5]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA Button */}
      <div className="mt-6 pt-3.5 border-t border-[#F6DCE5]">
        <Button
          variant={popular ? "gold" : "primary"}
          size="sm"
          href={href}
          className="w-full justify-center"
          icon={<ArrowRight className="h-3.5 w-3.5" />}
        >
          View Specifications
        </Button>
      </div>
    </div>
  );
};
