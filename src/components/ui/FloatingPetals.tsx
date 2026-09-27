"use client";

import React from "react";

interface FloatingPetalsProps {
  className?: string;
  count?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  className = "",
  count = 7,
}) => {
  // Delicate subtle champagne botanical accents with gentle slow movement
  const petals = [
    { id: 1, left: "12%", size: 16, duration: "24s", delay: "0s", anim: "animate-petal-1", opacity: 0.25, color: "#C5A059", rotate: 20 },
    { id: 2, left: "32%", size: 14, duration: "28s", delay: "5s", anim: "animate-petal-2", opacity: 0.2, color: "#E5D0A1", rotate: -35 },
    { id: 3, left: "54%", size: 18, duration: "22s", delay: "10s", anim: "animate-petal-3", opacity: 0.18, color: "#C5A059", rotate: 60 },
    { id: 4, left: "72%", size: 15, duration: "30s", delay: "3s", anim: "animate-petal-4", opacity: 0.22, color: "#E5D0A1", rotate: -15 },
    { id: 5, left: "86%", size: 16, duration: "26s", delay: "12s", anim: "animate-petal-5", opacity: 0.2, color: "#C5A059", rotate: 95 },
    { id: 6, left: "94%", size: 13, duration: "29s", delay: "7s", anim: "animate-petal-2", opacity: 0.18, color: "#E5D0A1", rotate: -50 },
    { id: 7, left: "22%", size: 15, duration: "32s", delay: "14s", anim: "animate-petal-4", opacity: 0.18, color: "#C5A059", rotate: 40 },
  ].slice(0, count);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute ${petal.anim}`}
          style={{
            left: petal.left,
            top: "-30px",
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${petal.rotate}deg)` }}
          >
            {/* Elegant curved rose petal */}
            <path
              d="M12 2C7 2 2 8 2 17C2 25 7 30 12 30C17 30 22 25 22 17C22 8 17 2 12 2Z"
              fill={petal.color}
              fillOpacity="0.8"
            />
            {/* Delicate inner petal vein */}
            <path
              d="M12 5C12 12 11 20 12 27"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
