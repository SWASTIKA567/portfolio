import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// 7 Phone Screens list (User can add/change images later)
const PHONE_SCREENS = [
  { id: 1, image: "/screenshots/postly-1.png", alt: "Screen 1" },
  { id: 2, image: "/screenshots/graph-1.jpeg", alt: "Screen 2" },
  { id: 3, image: "/screenshots/postly-2.png", alt: "Screen 3" },
  { id: 4, image: "/screenshots/gamezone-1.jpeg", alt: "Screen 4" },
  { id: 5, image: "/screenshots/graph-2.jpeg", alt: "Screen 5" },
  { id: 6, image: "/screenshots/postly-3.jpeg", alt: "Screen 6" },
  { id: 7, image: "/screenshots/gamezone-2.jpeg", alt: "Screen 7" },
];

export function ProjectsScreen({ isOpen, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Center phone (4th) active by default
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = PHONE_SCREENS.length;

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Keyboard navigation (ESC to close, Left/Right arrows to rotate dial)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        nextPhone();
      } else if (e.key === "ArrowLeft") {
        prevPhone();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex]);

  const nextPhone = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevPhone = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Mouse wheel scroll to spin dial
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 15) {
      if (e.deltaX > 20 || e.deltaY > 20) {
        nextPhone();
      } else if (e.deltaX < -20 || e.deltaY < -20) {
        prevPhone();
      }
    }
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 35) {
      nextPhone();
    } else if (diff < -35) {
      prevPhone();
    }
    setTouchStartX(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-white text-neutral-900 select-none flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Minimal Floating Close Button in top right */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-neutral-900/10 hover:bg-neutral-900 text-neutral-800 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md"
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* ── SPREAD-OUT 3D CIRCULAR ARC STAGE (7 PHONES WITH AMPLE SPACING) ── */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[98vw] h-[450px] sm:h-[530px] md:h-[600px] flex items-center justify-center overflow-visible"
        style={{
          perspective: "1100px",
          transformStyle: "preserve-3d",
        }}
      >
        {PHONE_SCREENS.map((screen, idx) => {
          // Calculate relative offset from center active phone (-3 to +3)
          let offset = idx - activeIndex;

          // Wrap-around math for continuous infinite dial loop
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          const sign = Math.sign(offset);

          // ── SPREAD-OUT OUTER DIAL ARC SPACING ──
          let translateX = 0;
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let zIndex = 60 - absOffset * 10;
          let opacity = 1;

          if (isCenter) {
            translateX = 0;
            translateZ = 0;
            rotateY = 0;
            scale = 1.05;
            zIndex = 70;
            opacity = 1;
          } else if (absOffset === 1) {
            translateX = sign * 215; // Wider breathing space
            translateZ = -45;
            rotateY = -sign * 28;
            scale = 0.88;
            opacity = 0.98;
          } else if (absOffset === 2) {
            translateX = sign * 400; // Spread further out
            translateZ = -130;
            rotateY = -sign * 42;
            scale = 0.76;
            opacity = 0.92;
          } else {
            translateX = sign * 570; // Outer edges widely spaced
            translateZ = -230;
            rotateY = -sign * 54;
            scale = 0.65;
            opacity = 0.82;
          }

          // Responsive adjustments for mobile / tablet viewports
          if (typeof window !== "undefined") {
            if (window.innerWidth < 640 && !isCenter) {
              translateX = sign * (absOffset * 95);
              translateZ = -absOffset * 50;
              scale *= 0.8;
            } else if (window.innerWidth < 1024 && !isCenter) {
              translateX = sign * (absOffset * 155);
            }
          }

          return (
            <div
              key={screen.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                transformStyle: "preserve-3d",
                position: "absolute",
              }}
              className={`cursor-pointer select-none transition-all duration-300 ${
                isCenter ? "cursor-default" : "hover:brightness-105"
              }`}
            >
              {/* SMARTPHONE MOCKUP FRAME (Exact match to reference image) */}
              <div
                className={`relative w-[190px] sm:w-[230px] md:w-[250px] aspect-[9/19] rounded-[36px] sm:rounded-[42px] p-2 sm:p-2.5 transition-all duration-500 ${
                  isCenter
                    ? "bg-black shadow-[0_35px_80px_rgba(0,0,0,0.35),0_15px_35px_rgba(0,0,0,0.2)] border-[3.5px] border-black"
                    : "bg-black/95 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-[2px] border-neutral-900"
                }`}
              >
                {/* Dynamic Island Pill Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-40 flex items-center justify-between px-2 shadow-xs border border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-800" />
                  <span className="w-1 h-1 rounded-full bg-neutral-700" />
                </div>

                {/* Smartphone Screen Display */}
                <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] overflow-hidden bg-neutral-900">
                  <img
                    src={screen.image}
                    alt={screen.alt}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Glass Glare Reflection Sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
