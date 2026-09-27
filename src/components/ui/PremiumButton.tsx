import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const PremiumButton = React.forwardRef<
  HTMLButtonElement,
  PremiumButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      icon,
      iconPosition = "right",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer tracking-wide relative overflow-hidden";

    const variantStyles = {
      primary:
        "btn-burgundy-gold text-[#FAF6EE] font-semibold hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "btn-liquid-glass text-[#1F1D24] hover:-translate-y-0.5 active:translate-y-0",
      outline:
        "border border-[#C5A059]/50 text-[#55122C] bg-white/70 backdrop-blur-xs hover:bg-[#C5A059]/10 hover:border-[#C5A059] hover:text-[#3D0C20] hover:-translate-y-0.5 active:translate-y-0",
      ghost:
        "text-[#1F1D24] hover:text-[#55122C] hover:bg-[#C5A059]/10",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs gap-1.5",
      md: "h-11 px-6 text-sm gap-2",
      lg: "h-13 px-8 text-base gap-2.5 font-medium",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";
