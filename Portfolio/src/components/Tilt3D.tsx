import React, { useRef, useState, useEffect, useCallback } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number; // max tilt rotation in degrees (default: 14)
  perspective?: number; // perspective distance in px (default: 1000)
  scale?: number; // scale on hover (default: 1.03)
  glare?: boolean; // enable glossy glare effect (default: true)
  glareMaxOpacity?: number; // max glare opacity (default: 0.35)
  speed?: number; // interpolation speed (0-1, default: 0.12)
  resetOnLeave?: boolean; // smoothly return to center on mouse leave (default: true)
  disabled?: boolean;
}

export function Tilt3D({
  children,
  className = "",
  style = {},
  maxTilt = 14,
  perspective = 1000,
  scale = 1.03,
  glare = true,
  glareMaxOpacity = 0.35,
  speed = 0.12,
  resetOnLeave = true,
  disabled = false,
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Target values (set by mouse)
  const targetX = useRef(0);
  const targetY = useRef(0);
  const targetScale = useRef(1);
  const glareX = useRef(50);
  const glareY = useRef(50);
  const glareOpacity = useRef(0);

  // Current interpolated values (rendered)
  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentScale = useRef(1);
  const currentGlareOpacity = useRef(0);
  const currentGlareX = useRef(50);
  const currentGlareY = useRef(50);

  const animFrameId = useRef<number | null>(null);

  const updatePhysics = useCallback(() => {
    // Linear interpolation (lerp) for smooth butter physics
    currentX.current += (targetX.current - currentX.current) * speed;
    currentY.current += (targetY.current - currentY.current) * speed;
    currentScale.current += (targetScale.current - currentScale.current) * speed;
    currentGlareOpacity.current += (glareOpacity.current - currentGlareOpacity.current) * speed;
    currentGlareX.current += (glareX.current - currentGlareX.current) * speed;
    currentGlareY.current += (glareY.current - currentGlareY.current) * speed;

    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${currentX.current.toFixed(
        2
      )}deg) rotateY(${currentY.current.toFixed(2)}deg) scale3d(${currentScale.current.toFixed(
        3
      )}, ${currentScale.current.toFixed(3)}, 1)`;

      const glareEl = cardRef.current.querySelector<HTMLDivElement>(".tilt-3d-glare");
      if (glareEl) {
        glareEl.style.opacity = currentGlareOpacity.current.toFixed(3);
        glareEl.style.background = `radial-gradient(circle 320px at ${currentGlareX.current.toFixed(
          1
        )}% ${currentGlareY.current.toFixed(
          1
        )}%, rgba(255,255,255,${glareMaxOpacity}), rgba(255,255,255,0) 80%)`;
      }
    }

    // Keep running while hovered or returning to neutral
    const isMoving =
      Math.abs(targetX.current - currentX.current) > 0.05 ||
      Math.abs(targetY.current - currentY.current) > 0.05 ||
      Math.abs(targetScale.current - currentScale.current) > 0.002 ||
      Math.abs(glareOpacity.current - currentGlareOpacity.current) > 0.01;

    if (isHovered || isMoving) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      animFrameId.current = null;
    }
  }, [speed, perspective, glareMaxOpacity, isHovered]);

  const startAnimation = useCallback(() => {
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Relative -1 to 1 coordinates from center
    const xRel = (x / width) * 2 - 1;
    const yRel = (y / height) * 2 - 1;

    // RotateX is inverted from Y coordinate
    targetX.current = -yRel * maxTilt;
    targetY.current = xRel * maxTilt;
    targetScale.current = scale;

    // Glare position
    glareX.current = (x / width) * 100;
    glareY.current = (y / height) * 100;
    glareOpacity.current = 1;

    startAnimation();
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    targetScale.current = scale;
    startAnimation();
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    if (resetOnLeave) {
      targetX.current = 0;
      targetY.current = 0;
      targetScale.current = 1;
      glareOpacity.current = 0;
    }
    startAnimation();
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          className="tilt-3d-glare pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: 0,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
