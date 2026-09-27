import React from "react";
import { cn } from "@/lib/utils";

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  description?: string;
  accent?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  description,
  accent,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative bg-white rounded-3xl p-6 sm:p-7 text-center border border-[#F6DCE5]",
        "shadow-[0_4px_20px_rgba(217,139,165,0.08)] hover:shadow-[0_16px_36px_rgba(217,139,165,0.18)]",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D98BA5]",
        className
      )}
      {...props}
    >
      <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#33313A] tracking-tight">
        {value}
      </div>

      <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D98BA5]">
        {label}
      </div>

      {description && (
        <p className="mt-1.5 text-xs text-[#686474] leading-relaxed font-light">
          {description}
        </p>
      )}

      {accent && (
        <div className="mt-4 pt-3 border-t border-[#F6DCE5] inline-block">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#D98BA5] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F6DCE5]">
            {accent}
          </span>
        </div>
      )}
    </div>
  );
};
