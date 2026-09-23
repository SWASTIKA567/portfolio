import React, { useState, useEffect, useRef } from "react";
import { PROJECTS } from "@/data/portfolio";
import { X, ChevronUp, ChevronDown } from "lucide-react";

// 4 Distinct Vinyl Themes matching the exact colors in reference image
const VINYL_THEMES = [
  {
    name: "Purple",
    primary: "#7c3aed",
    gradient: "radial-gradient(circle, #a78bfa 0%, #7c3aed 52%, #4c1d95 100%)",
    glow: "rgba(124, 58, 237, 0.45)",
    labelBg: "#f5f3ff",
    ringColor: "#c084fc",
  },
  {
    name: "Pink",
    primary: "#e11d48",
    gradient: "radial-gradient(circle, #fb7185 0%, #e11d48 52%, #881337 100%)",
    glow: "rgba(225, 29, 72, 0.45)",
    labelBg: "#fff1f2",
    ringColor: "#fda4af",
  },
  {
    name: "Blue",
    primary: "#0284c7",
    gradient: "radial-gradient(circle, #38bdf8 0%, #0284c7 52%, #0369a1 100%)",
    glow: "rgba(2, 132, 199, 0.45)",
    labelBg: "#f0f9ff",
    ringColor: "#7dd3fc",
  },
  {
    name: "Yellow",
    primary: "#eab308",
    gradient: "radial-gradient(circle, #fde047 0%, #eab308 52%, #854d0e 100%)",
    glow: "rgba(234, 179, 8, 0.45)",
    labelBg: "#fefce8",
    ringColor: "#fef08a",
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectsScreen({ isOpen, onClose }: Props) {
  const [activeAppIndex, setActiveAppIndex] = useState<number>(1);

  // Orbit rotation state (calibrated so active vinyl is positioned prominently on the right arc)
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startAngle: number; startRotation: number }>({
    startAngle: 0,
    startRotation: 0,
  });
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const [orbitRadius, setOrbitRadius] = useState<number>(290);
  const [vinylSize, setVinylSize] = useState<number>(210);

  // Dynamically ensure we have at least 4 items for the 4-vinyl orbit matching the reference
  const orbitItems = PROJECTS.length >= 4 ? PROJECTS : [
    ...PROJECTS,
    ...Array(Math.max(0, 4 - PROJECTS.length)).fill(0).map((_, i) => ({
      name: `Upcoming App 0${PROJECTS.length + i + 1}`,
      desc: "New project in development.",
      tech: "Flutter · Dart",
      highlight: "In Progress",
      color: "#333",
      screenshots: [PROJECTS[0]?.screenshots[0] || "/screenshots/postly-1.png"],
    }))
  ];

  const totalItems = orbitItems.length;
  // Tighter angular spacing between adjacent vinyl records (48 degrees apart)
  const anglePerStep = 48;

  // Responsive sizing for large vinyls in left quarter/arc of slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOrbitRadius(190);
        setVinylSize(140);
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(245);
        setVinylSize(175);
      } else {
        setOrbitRadius(305);
        setVinylSize(215);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Calculate pointer angle relative to orbit center
  const getPointerAngle = (clientX: number, clientY: number) => {
    if (!orbitContainerRef.current) return 0;
    const rect = orbitContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rad = Math.atan2(clientY - centerY, clientX - centerX);
    return (rad * 180) / Math.PI;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    const angle = getPointerAngle(e.clientX, e.clientY);
    dragStartRef.current = {
      startAngle: angle,
      startRotation: rotationAngle,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentAngle = getPointerAngle(e.clientX, e.clientY);
    const delta = currentAngle - dragStartRef.current.startAngle;
    setRotationAngle(dragStartRef.current.startRotation + delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Snap to nearest vinyl position
    const normalized = -rotationAngle;
    const nearestIndex = Math.max(0, Math.min(totalItems - 1, Math.round(normalized / anglePerStep)));
    selectProjectByRotating(nearestIndex);
  };

  // Smoothly rotate the selected project
  const selectProjectByRotating = (index: number) => {
    setActiveAppIndex(index);
    const target = -index * anglePerStep;
    setRotationAngle(target);
  };

  const rotateStep = (direction: number) => {
    const nextIndex = Math.max(0, Math.min(totalItems - 1, activeAppIndex + direction));
    selectProjectByRotating(nextIndex);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden text-neutral-900 select-none animate-fade-in flex flex-col justify-between"
      style={{
        background: "radial-gradient(circle at 35% 50%, #fbf8fe 0%, #f6effc 55%, #ede2f8 100%)",
      }}
    >
      {/* ── CLEAN TOP BAR ── */}
      <header className="relative z-30 flex items-center justify-between w-full px-8 md:px-14 py-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-700">
            Vinyl Selector
          </span>
        </div>

        {/* Minimal Close Button */}
        <button
          onClick={onClose}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-neutral-950 text-neutral-800 hover:text-white text-xs font-bold tracking-wider uppercase border border-purple-200/80 hover:border-neutral-900 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>Close</span>
          <X className="w-4 h-4 text-purple-600 group-hover:text-purple-300 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </header>

      {/* ── MAIN STAGE: LARGE 3D VINYL ORBIT IN LEFT QUARTER OF SLIDE (Matches Image) ── */}
      <main className="relative z-20 w-full flex-1 flex items-center overflow-hidden">
        {/* Orbit container positioned on the left side of screen */}
        <div
          ref={orbitContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute left-[-120px] sm:left-[-60px] md:left-[2%] lg:left-[4%] top-1/2 -translate-y-1/2 w-[540px] h-[540px] sm:w-[680px] sm:h-[680px] md:w-[780px] md:h-[780px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          {/* 1. Dotted Orbit Ring Line (Matches Reference Image) */}
          <div
            className="absolute rounded-full border-2 border-dashed border-purple-300/70 pointer-events-none shadow-[0_0_40px_rgba(168,85,247,0.12)]"
            style={{
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2}px`,
            }}
          />

          {/* 2. Directional Curved Orbit Rotation Arrows & Node (Matches Reference Image) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 800 800"
            fill="none"
          >
            <defs>
              <marker
                id="orbit-arrow"
                markerWidth="9"
                markerHeight="9"
                refX="6"
                refY="4.5"
                orient="auto"
              >
                <polygon points="0 0, 8 4.5, 0 9" fill="#a855f7" />
              </marker>
              <marker
                id="orbit-arrow-reverse"
                markerWidth="9"
                markerHeight="9"
                refX="2"
                refY="4.5"
                orient="auto-start-reverse"
              >
                <polygon points="8 0, 0 4.5, 8 9" fill="#a855f7" />
              </marker>
            </defs>

            {/* 3 Curved bi-directional arrows dynamically positioned between each adjacent vinyl pair */}
            {[-48, 0, 48].map((midAngle, arrowIdx) => {
              const startA = ((midAngle - 13 + rotationAngle) * Math.PI) / 180;
              const endA = ((midAngle + 13 + rotationAngle) * Math.PI) / 180;
              const cx = 400;
              const cy = 400;
              const r = 300;
              const x1 = cx + r * Math.cos(startA);
              const y1 = cy + r * Math.sin(startA);
              const x2 = cx + r * Math.cos(endA);
              const y2 = cy + r * Math.sin(endA);

              return (
                <path
                  key={arrowIdx}
                  d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  markerEnd="url(#orbit-arrow)"
                  markerStart="url(#orbit-arrow-reverse)"
                  className="opacity-80 transition-all duration-500"
                />
              );
            })}

            {/* Left Decorative Orbit Center Node (concentric purple circles in image) */}
            <circle cx="100" cy="400" r="10" fill="#7c3aed" className="opacity-90" />
            <circle cx="100" cy="400" r="24" stroke="#c084fc" strokeWidth="2" fill="none" opacity="0.4" />
          </svg>

          {/* 3. The 3D Vinyl Discs (Tightly clustered on the circular arc) */}
          {orbitItems.map((project, idx) => {
            // Tightly spaced angles: -72°, -24°, +24°, +72°
            const baseAngle = (idx - 1.5) * anglePerStep;
            const angle = baseAngle + rotationAngle;
            const rad = (angle * Math.PI) / 180;

            const x = orbitRadius * Math.cos(rad);
            const y = orbitRadius * Math.sin(rad);

            const isActive = idx === activeAppIndex;
            const theme = VINYL_THEMES[idx % VINYL_THEMES.length];

            return (
              <div
                key={`${project.name}-${idx}`}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  left: "50%",
                  top: "50%",
                  transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute z-20 transition-all ${
                  isActive ? "z-30 scale-105" : "scale-95 opacity-95 hover:scale-100 hover:opacity-100"
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectProjectByRotating(idx);
                  }}
                  className={`group relative rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "ring-4 ring-white/90 shadow-[0_28px_60px_rgba(0,0,0,0.38)]"
                      : "shadow-[0_16px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_22px_48px_rgba(0,0,0,0.32)]"
                  }`}
                  style={{
                    width: `${vinylSize}px`,
                    height: `${vinylSize}px`,
                  }}
                  title={project.name}
                >
                  {/* 3D Vinyl Disc Surface with Metallic Sheen & Grooves */}
                  <div
                    className="w-full h-full rounded-full relative flex items-center justify-center overflow-hidden border border-white/25"
                    style={{
                      background: theme.gradient,
                      boxShadow: `inset 0 0 32px rgba(0,0,0,0.45), 0 12px 36px ${theme.glow}`,
                    }}
                  >
                    {/* Realistic Grooves (Concentric Circles) */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none opacity-45"
                      style={{
                        backgroundImage:
                          "repeating-radial-gradient(circle, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1.5px, transparent 1.5px, transparent 4.5px), repeating-radial-gradient(circle, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 2px, transparent 2px, transparent 6px)",
                      }}
                    />

                    {/* Dynamic Conic Metallic Reflection Sheen */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none opacity-55"
                      style={{
                        background:
                          "conic-gradient(from 25deg, transparent 0deg, rgba(255,255,255,0.45) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.45) 225deg, transparent 270deg, transparent 360deg)",
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* ── APP LOGO CENTER HUB ── */}
                    <div
                      className="relative w-[38%] h-[38%] rounded-full flex flex-col items-center justify-center p-1 shadow-inner border-[3px] border-white/95 overflow-hidden transition-transform duration-500 group-hover:scale-105"
                      style={{ background: theme.labelBg }}
                    >
                      {/* App Logo / Screenshot Thumbnail */}
                      <img
                        src={project.screenshots[0]}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-full select-none pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                      />

                      {/* Center Spindle Hole */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neutral-900 border-2 border-white shadow-md flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT-SIDE MINIMAL SPIN CONTROLS ── */}
        <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30">
          <button
            type="button"
            onClick={() => rotateStep(-1)}
            className="w-11 h-11 rounded-full bg-white/90 hover:bg-neutral-900 text-neutral-800 hover:text-white border border-purple-200 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95 backdrop-blur-sm"
            title="Spin Up"
          >
            <ChevronUp className="w-5 h-5 text-purple-600 hover:text-white" />
          </button>

          <div className="flex flex-col items-center gap-2">
            {orbitItems.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectProjectByRotating(i)}
                className={`w-2 rounded-full transition-all cursor-pointer ${
                  i === activeAppIndex ? "h-6 bg-purple-600" : "h-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                title={`Track ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => rotateStep(1)}
            className="w-11 h-11 rounded-full bg-white/90 hover:bg-neutral-900 text-neutral-800 hover:text-white border border-purple-200 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95 backdrop-blur-sm"
            title="Spin Down"
          >
            <ChevronDown className="w-5 h-5 text-purple-600 hover:text-white" />
          </button>
        </div>
      </main>

      {/* ── FOOTER HINT ── */}
      <footer className="relative z-20 px-8 py-5 text-xs text-neutral-400 font-medium tracking-wide">
        Drag vinyl arc to rotate & explore
      </footer>
    </div>
  );
}
