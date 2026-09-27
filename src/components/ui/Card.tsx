import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blush" | "bordered" | "interactive" | "glass" | "burgundy";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "liquid-glass-card text-[#1F1D24] rounded-3xl p-6 sm:p-8 border border-[#C5A059]/25 shadow-sm",
      blush:
        "bg-[#FAF6EE]/80 backdrop-blur-md text-[#1F1D24] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-xs",
      bordered:
        "bg-white/90 backdrop-blur-md border border-[#C5A059]/35 text-[#1F1D24] rounded-3xl p-6 sm:p-8 shadow-2xs",
      interactive:
        "liquid-glass-card text-[#1F1D24] rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1 hover:border-[#C5A059]/50 hover:shadow-card-gold border border-[#C5A059]/20",
      glass:
        "bg-white/80 backdrop-blur-xl border border-[#C5A059]/25 rounded-3xl p-6 sm:p-8 shadow-sm",
      burgundy:
        "bg-gradient-to-br from-[#14030A] to-[#1A040D] text-white border border-[#C5A059]/35 rounded-3xl p-6 sm:p-8 shadow-md",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F1D24]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs sm:text-sm text-[#5F5B66] leading-relaxed font-light", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-[#1F1D24]", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 border-t border-[#C5A059]/20 mt-6", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
