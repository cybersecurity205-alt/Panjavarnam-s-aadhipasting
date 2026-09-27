import React from "react";
import { cn } from "@/lib/utils";

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  category?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  placeholderText?: string;
  imageNode?: React.ReactNode;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  title,
  category,
  aspectRatio = "landscape",
  placeholderText,
  imageNode,
  className,
  ...props
}) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div
      className={cn(
        "group relative rounded-3xl overflow-hidden bg-white border border-[#F6DCE5] shadow-[0_4px_20px_rgba(217,139,165,0.08)] hover:shadow-[0_16px_36px_rgba(217,139,165,0.18)] hover:border-[#D98BA5] transition-all duration-300 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[#FFF1F5] flex items-center justify-center p-6",
          aspectClasses[aspectRatio]
        )}
      >
        {imageNode ? (
          imageNode
        ) : (
          <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-500">
            <div className="h-11 w-11 mx-auto rounded-2xl bg-white border border-[#F6DCE5] shadow-xs flex items-center justify-center text-[#D98BA5]">
              <span className="font-serif font-bold text-xs tracking-wider">
                AADHI
              </span>
            </div>
            <p className="text-xs font-semibold text-[#8E8A9B] tracking-wide">
              {placeholderText || "Production Sample"}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 bg-white border-t border-[#F6DCE5]">
        {category && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D98BA5] block mb-1">
            {category}
          </span>
        )}
        <h4 className="font-serif font-bold text-base sm:text-lg text-[#33313A] group-hover:text-[#D98BA5] transition-colors leading-snug">
          {title}
        </h4>
      </div>
    </div>
  );
};
