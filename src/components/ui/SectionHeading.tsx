import React from "react";
import { FloralDecor } from "@/components/ui/FloralDecor";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  showFlourish?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  theme = "light",
  showFlourish = true,
  className,
  ...props
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase",
            "bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#55122C] shadow-2xs"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
          {badge}
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.18] text-[#1F1D24]">
        {title}{" "}
        {highlight && (
          <span className="text-[#55122C] block sm:inline font-serif italic font-normal">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed font-light max-w-2xl text-[#5F5B66]",
            isCenter ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}

      {showFlourish && (
        <div className={cn("pt-2 flex", isCenter ? "justify-center" : "justify-start")}>
          <FloralDecor variant="flourish" className="w-28 h-5 text-[#C5A059]/50" />
        </div>
      )}
    </div>
  );
};
