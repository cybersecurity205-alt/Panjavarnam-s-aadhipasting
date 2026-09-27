import React from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  badge,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#F6DCE5]",
        "shadow-[0_4px_20px_rgba(217,139,165,0.08)] hover:shadow-[0_16px_36px_rgba(217,139,165,0.18)]",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D98BA5]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-11 w-11 rounded-2xl bg-[#FFF1F5] border border-[#F6DCE5] flex items-center justify-center text-[#D98BA5] group-hover:scale-105 group-hover:bg-[#F6DCE5] transition-all duration-300 shadow-xs">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#FFF1F5] text-[#D98BA5] border border-[#F6DCE5]">
            {badge}
          </span>
        )}
      </div>

      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#33313A] group-hover:text-[#D98BA5] transition-colors">
        {title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-[#686474] leading-relaxed font-light">
        {description}
      </p>

      <div className="mt-4 pt-3 border-t border-[#F6DCE5] flex items-center text-xs font-semibold text-[#D98BA5] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>Explore Standard</span>
        <span className="ml-1 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </div>
  );
};
