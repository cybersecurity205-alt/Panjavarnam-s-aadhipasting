"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  z: number; // 0.5 to 1.5 depth scale
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  opacity: number;
  colorType: number; // Index to pre-rendered petal canvas
  vx: number;
  vy: number;
}

export const RosePetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for gentle breeze interaction
    let mouseX = -1000;
    let mouseY = -1000;
    let targetBreezeX = 0;
    let currentBreezeX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - mouseX) * 0.05;
      targetBreezeX = Math.max(-2, Math.min(2, deltaX));
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      targetBreezeX = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- Pre-render 5 Botanical Rose Petal Sprites for 60fps performance ---
    const petalPalettes = [
      { primary: "#650019", shadow: "#35000F", highlight: "#C00035", vein: "#850022" }, // Deep Crimson
      { primary: "#8B0021", shadow: "#4A0012", highlight: "#E11D48", vein: "#AA002B" }, // Royal Burgundy Red
      { primary: "#C00035", shadow: "#6B001D", highlight: "#F43F5E", vein: "#E11D48" }, // Vibrant Rose
      { primary: "#9E0028", shadow: "#520015", highlight: "#FB7185", vein: "#C00035" }, // Ruby Velvet
      { primary: "#D4AF37", shadow: "#8C6D1F", highlight: "#FDE68A", vein: "#B8860B" }, // Rare Gold Dust Petal
    ];

    const spriteSize = 64;
    const sprites: HTMLCanvasElement[] = petalPalettes.map((pal) => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = spriteSize;
      offCanvas.height = spriteSize;
      const oCtx = offCanvas.getContext("2d");
      if (!oCtx) return offCanvas;

      oCtx.save();
      oCtx.translate(spriteSize / 2, spriteSize / 2);

      // Create realistic botanical rose petal path
      oCtx.beginPath();
      oCtx.moveTo(0, -24);
      // Top delicate notch / curve
      oCtx.bezierCurveTo(8, -26, 18, -18, 22, -6);
      oCtx.bezierCurveTo(26, 6, 22, 20, 0, 26);
      oCtx.bezierCurveTo(-22, 20, -26, 6, -22, -6);
      oCtx.bezierCurveTo(-18, -18, -8, -26, 0, -24);
      oCtx.closePath();

      // Rich radial velvet gradient
      const grad = oCtx.createRadialGradient(-4, -6, 2, 0, 0, 28);
      grad.addColorStop(0, pal.highlight);
      grad.addColorStop(0.5, pal.primary);
      grad.addColorStop(1, pal.shadow);
      oCtx.fillStyle = grad;
      oCtx.fill();

      // Subtle outer edge glow
      oCtx.strokeStyle = pal.highlight;
      oCtx.lineWidth = 0.8;
      oCtx.globalAlpha = 0.5;
      oCtx.stroke();

      // Delicate organic petal vein line
      oCtx.beginPath();
      oCtx.moveTo(0, 22);
      oCtx.quadraticCurveTo(2, 4, 0, -18);
      oCtx.strokeStyle = pal.vein;
      oCtx.lineWidth = 0.9;
      oCtx.globalAlpha = 0.6;
      oCtx.stroke();

      oCtx.restore();
      return offCanvas;
    });

    // --- Initialize 140 Petals (Desktop) or 60 Petals (Mobile) ---
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 65 : 145;

    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * (height + 200) - 200,
        z: 0.6 + Math.random() * 0.9, // depth multiplier
        size: 16 + Math.random() * 22,
        speedY: 0.8 + Math.random() * 1.5,
        swaySpeed: 0.015 + Math.random() * 0.025,
        swayAmp: 25 + Math.random() * 45,
        swayOffset: Math.random() * Math.PI * 2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.008 + Math.random() * 0.018,
        rotSpeedZ: 0.005 + Math.random() * 0.015,
        opacity: 0.55 + Math.random() * 0.4,
        colorType: Math.random() < 0.08 ? 4 : Math.floor(Math.random() * 4), // 8% gold petals, 92% ruby/crimson
        vx: 0,
        vy: 0,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      currentBreezeX += (targetBreezeX - currentBreezeX) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // 3D rotation update
        p.rotX += p.rotSpeedX;
        p.rotY += p.rotSpeedY;
        p.rotZ += p.rotSpeedZ;

        // Falling velocity and sinusoidal drift
        const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * (p.swayAmp * 0.025);
        p.x += sway * p.z + currentBreezeX * p.z + p.vx;
        p.y += p.speedY * p.z + p.vy;

        // Interactive cursor gentle breeze
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 16000) {
            // within ~125px
            const force = (1 - Math.sqrt(distSq) / 125) * 1.5;
            p.vx += (dx > 0 ? 1 : -1) * force * 0.3;
            p.vy += (dy > 0 ? 1 : -0.5) * force * 0.2;
          }
        }

        // Dampen dynamic impulse
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Wrap around boundaries seamlessly
        if (p.y > height + 60) {
          p.y = -50;
          p.x = Math.random() * width;
        }
        if (p.x < -60) p.x = width + 50;
        if (p.x > width + 60) p.x = -50;

        // Compute simulated 3D projection scales
        const scaleX = Math.cos(p.rotX) * p.z;
        const scaleY = Math.sin(p.rotY) * p.z;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotZ);
        ctx.scale(Math.max(0.15, Math.abs(scaleX)), Math.max(0.2, Math.abs(scaleY)));
        ctx.globalAlpha = p.opacity;

        const currentSprite = sprites[p.colorType];
        const half = spriteSize / 2;
        ctx.drawImage(currentSprite, -half, -half, spriteSize, spriteSize);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full select-none"
      aria-hidden="true"
    />
  );
};
