import React from "react";
import { cn } from "@/lib/utils";

interface FloralDecorProps extends React.SVGAttributes<SVGSVGElement> {
  variant?: "branch" | "bloom" | "flourish" | "crest" | "corner" | "rose" | "cherry-blossom";
  className?: string;
}

export const FloralDecor: React.FC<FloralDecorProps> = ({
  variant = "flourish",
  className,
  ...props
}) => {
  if (variant === "crest") {
    return (
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-12 h-12 text-[#D98BA5]", className)}
        {...props}
      >
        <circle cx="30" cy="30" r="27" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="30" cy="30" r="24" stroke="#F6DCE5" strokeWidth="0.8" />
        {/* Crown flourish on top */}
        <path
          d="M24 16L30 11L36 16L34 21H26L24 16Z"
          fill="#FFF1F5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Stylized rose blossom */}
        <circle cx="30" cy="30" r="5" fill="#D98BA5" />
        <path
          d="M30 22C25 22 23 26 23 30C23 35 27 38 30 38C33 38 37 35 37 30C37 26 35 22 30 22Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M26 27C27 25 33 25 34 27"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Wreath branches */}
        <path
          d="M17 38C15 32 17 25 22 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M43 38C45 32 43 25 38 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="30" cy="45" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "cherry-blossom") {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-28 h-28 text-[#D98BA5]", className)}
        {...props}
      >
        {/* Curved branch */}
        <path
          d="M10 10C35 25 60 50 110 110"
          stroke="#C6718E"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M50 40C65 30 80 25 95 30"
          stroke="#C6718E"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M70 65C85 65 95 80 105 85"
          stroke="#C6718E"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Cherry blossom 1 */}
        <g transform="translate(48, 38)">
          <circle cx="0" cy="-7" r="4.5" fill="#F6DCE5" />
          <circle cx="7" cy="-2" r="4.5" fill="#F6DCE5" />
          <circle cx="4" cy="6" r="4.5" fill="#F6DCE5" />
          <circle cx="-4" cy="6" r="4.5" fill="#F6DCE5" />
          <circle cx="-7" cy="-2" r="4.5" fill="#F6DCE5" />
          <circle cx="0" cy="0" r="2.2" fill="#D98BA5" />
        </g>
        {/* Cherry blossom 2 */}
        <g transform="translate(92, 32)">
          <circle cx="0" cy="-6" r="4" fill="#FCE7EC" />
          <circle cx="6" cy="-2" r="4" fill="#FCE7EC" />
          <circle cx="4" cy="5" r="4" fill="#FCE7EC" />
          <circle cx="-4" cy="5" r="4" fill="#FCE7EC" />
          <circle cx="-6" cy="-2" r="4" fill="#FCE7EC" />
          <circle cx="0" cy="0" r="2" fill="#D98BA5" />
        </g>
        {/* Cherry blossom 3 */}
        <g transform="translate(72, 70)">
          <circle cx="0" cy="-7" r="4.5" fill="#F6DCE5" />
          <circle cx="7" cy="-2" r="4.5" fill="#F6DCE5" />
          <circle cx="4" cy="6" r="4.5" fill="#F6DCE5" />
          <circle cx="-4" cy="6" r="4.5" fill="#F6DCE5" />
          <circle cx="-7" cy="-2" r="4.5" fill="#F6DCE5" />
          <circle cx="0" cy="0" r="2.2" fill="#D98BA5" />
        </g>
        {/* Bud */}
        <circle cx="28" cy="22" r="2.5" fill="#D98BA5" opacity="0.8" />
        <circle cx="102" cy="82" r="2.5" fill="#D98BA5" opacity="0.8" />
      </svg>
    );
  }

  if (variant === "rose" || variant === "bloom") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-7 h-7 text-[#D98BA5]", className)}
        {...props}
      >
        <circle cx="24" cy="24" r="3.5" fill="#D98BA5" />
        <path
          d="M24 13C24 17 19 20 19 24C19 28 24 31 24 35C24 31 29 28 29 24C29 20 24 17 24 13Z"
          fill="#F6DCE5"
          fillOpacity="0.75"
        />
        <path
          d="M13 24C17 24 20 29 24 24C29 24 31 19 35 24C31 24 29 29 24 29C20 29 17 24 13 24Z"
          fill="#F6DCE5"
          fillOpacity="0.6"
        />
        <circle cx="24" cy="24" r="10" stroke="#E8BACB" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
      </svg>
    );
  }

  if (variant === "corner") {
    return (
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-12 h-12 text-[#D98BA5]/60", className)}
        {...props}
      >
        <path d="M4 4H45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M4 4V45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M8 8H35" stroke="#F6DCE5" strokeWidth="0.6" opacity="0.8" />
        <path d="M8 8V35" stroke="#F6DCE5" strokeWidth="0.6" opacity="0.8" />
        <circle cx="16" cy="16" r="3" fill="#D98BA5" fillOpacity="0.6" />
        <circle cx="4" cy="4" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "branch") {
    return (
      <svg
        viewBox="0 0 140 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-32 h-8 text-[#D98BA5] opacity-80", className)}
        {...props}
      >
        <path
          d="M10 25C40 23 80 18 130 15"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Leaf / petal pairs */}
        <path
          d="M32 24C32 17 38 16 42 19C40 23 35 25 32 24Z"
          fill="#F6DCE5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M60 21C62 14 68 14 70 18C67 22 62 22 60 21Z"
          fill="#F6DCE5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M88 19C88 12 94 11 97 15C95 19 90 20 88 19Z"
          fill="#F6DCE5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="112" cy="16" r="3" fill="#D98BA5" />
      </svg>
    );
  }

  // Default subtle filigree flourish divider
  return (
    <svg
      viewBox="0 0 160 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-32 h-5 text-[#D98BA5]/70", className)}
      {...props}
    >
      <path
        d="M5 14C35 14 55 7 80 7C105 7 125 14 155 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="80" cy="7" r="3" fill="#F6DCE5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="80" cy="7" r="1.2" fill="#D98BA5" />
      <path
        d="M72 10C76 9 78 7 80 7C82 7 84 9 88 10"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="35" cy="13" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="125" cy="13" r="1.2" fill="currentColor" opacity="0.6" />
    </svg>
  );
};
