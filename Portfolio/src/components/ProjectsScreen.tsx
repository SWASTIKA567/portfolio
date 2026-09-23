import React, { useState, useEffect, useRef } from "react";
import vinyl from "@/assets/pink-vinyl.png";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Tilt3D } from "@/components/Tilt3D";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Play,
  Pause,
  CheckCircle2,
  Layers,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectsScreen({ isOpen, onClose }: Props) {
  const [stage, setStage] = useState<"splash" | "shifted">("splash");
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const bgVinylRef = useRef<HTMLImageElement>(null);

  const activeProject: Project = PROJECTS[activeAppIndex];

  // Whenever the screen is opened, start with the vinyl splash, then shift to corner
  useEffect(() => {
    if (isOpen) {
      setStage("splash");
      setPageIndex(0);

      // Lock body scroll while project screen is open
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        setStage("shifted");
      }, 950);

      return () => {
        clearTimeout(timer);
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

  // Reset pageIndex when switching app
  useEffect(() => {
    setPageIndex(0);
  }, [activeAppIndex]);

  // Automatic pages slideshow on the phone screen
  useEffect(() => {
    if (!isOpen || isPaused || stage !== "shifted") return;

    const interval = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % activeProject.screenshots.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, stage, activeProject.screenshots.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen overflow-hidden bg-[#fdf8fa] text-neutral-900 select-none animate-fade-in">
      {/* ================= BACKGROUND / AMBIENT LIGHTING ================= */}
      <div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, #f472b6 0%, #ec4899 40%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30 blur-[90px]"
        style={{ background: "radial-gradient(circle, #c084fc 0%, #a855f7 40%, transparent 70%)" }}
      />

      {/* ================= HEADER / TOP BAR ================= */}
      <div className="absolute top-6 left-6 md:left-12 right-6 md:right-12 z-50 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-800">
            Selected Works
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 hover:bg-black text-white text-xs font-semibold tracking-wider uppercase border border-pink-500/30 shadow-lg hover:shadow-pink-500/20 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>Close</span>
          <X className="w-4 h-4 text-pink-400 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* =========================================================================
          THE PINK VINYL:
          Stage "splash": Giant in center
          Stage "shifted": Simple vinyl quarter in top-right (exactly like in About Me)
          ========================================================================= */}
      {stage === "splash" ? (
        /* Splash in the center */
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative w-[min(70vw,440px)] aspect-square transition-all duration-700">
            <img
              src={vinyl}
              alt="Pink Vinyl Splash"
              className="vinyl-spin w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(236,72,153,0.5)]"
              style={{ animationDuration: "6s" }}
            />
            {/* Center Sticker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] aspect-square rounded-full flex flex-col items-center justify-center bg-white/95 border-2 border-pink-400/50 shadow-md">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
                SWAS-VINYL
              </span>
              <span className="font-black text-xs text-neutral-900 tracking-tight">
                PROJECTS
              </span>
            </div>
          </div>
          <div className="mt-6 text-center animate-fade-in">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-pink-600">
              ✦ Opening Projects ✦
            </span>
          </div>
        </div>
      ) : (
        /* Shifted to top-right corner: Simple Vinyl Quarter like in About Me */
        <div className="pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-0">
          <img
            ref={bgVinylRef}
            src={vinyl}
            alt=""
            aria-hidden="true"
            className="vinyl-spin h-[140vh] md:h-[180vh] w-[140vh] md:w-[180vh] max-w-none select-none pointer-events-none opacity-85 transition-transform duration-500 ease-out"
          />
        </div>
      )}

      {/* =========================================================================
          MAIN INTERFACE (Visible once shifted)
          ========================================================================= */}
      <div
        className={`w-full h-full relative z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24 transition-all duration-700 ${
          stage === "shifted" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* ════════ LEFT SIDE: SMARTPHONE SCREEN & SLIDESHOW (6 Columns) ════════ */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center gap-6 md:gap-8 justify-center lg:justify-start">
            {/* 3D Phone Mockup */}
            <Tilt3D maxTilt={10} scale={1.02} glare={true} className="flex-shrink-0">
              <div className="relative w-[240px] sm:w-[270px] md:w-[290px] aspect-[9/19] bg-neutral-950 rounded-[44px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.35),0_10px_25px_rgba(236,72,153,0.22)] border-[3.5px] border-neutral-800">
                {/* Dynamic Island Pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-22 h-4.5 bg-black rounded-full z-40 flex items-center justify-between px-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800" />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                </div>

                {/* Phone Glass Display */}
                <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-neutral-900 flex flex-col justify-between">
                  {/* Screenshots Slideshow Canvas */}
                  <div className="relative w-full h-full">
                    {activeProject.screenshots.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${activeProject.name} screen ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out ${
                          index === pageIndex
                            ? "opacity-100 z-10 scale-100"
                            : "opacity-0 z-0 scale-105 pointer-events-none"
                        }`}
                      />
                    ))}

                    {/* Left / Right Navigation Buttons */}
                    {activeProject.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setPageIndex(
                              (prev) =>
                                (prev - 1 + activeProject.screenshots.length) % activeProject.screenshots.length
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-sm"
                          title="Previous Screen"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setPageIndex((prev) => (prev + 1) % activeProject.screenshots.length)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-sm"
                          title="Next Screen"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Bottom Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none" />

                    {/* Page Indicator Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/55 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {activeProject.screenshots.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPageIndex(i)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            i === pageIndex ? "w-5 bg-pink-400" : "w-1.5 bg-white/50 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3D>

            {/* Active App Information */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-extrabold uppercase tracking-wider border border-pink-200 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                {activeProject.highlight}
              </span>

              <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {activeProject.name}
              </h3>
              <p className="text-xs font-mono text-pink-600 font-semibold mt-1">
                {activeProject.tech}
              </p>

              <p className="text-xs md:text-sm text-neutral-600 mt-2 leading-relaxed">
                {activeProject.desc}
              </p>

              {/* Slideshow Status & Play/Pause */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
                >
                  {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                  <span>{isPaused ? "Play" : "Slideshow On"}</span>
                </button>

                <span className="text-[11px] font-mono text-neutral-500">
                  Screen {pageIndex + 1} of {activeProject.screenshots.length}
                </span>
              </div>
            </div>
          </div>

          {/* ════════ RIGHT SIDE: FLOATING APP LOGOS OVER THE VINYL QUARTER (6 Columns) ════════ */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
            {/* Section Tag */}
            <div className="mb-4 text-center lg:text-right lg:pr-8">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-600 font-bold uppercase block">
                Vinyl Quarter • Select App
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Tap floating logo to launch in phone
              </p>
            </div>

            {/* Floating App Logos */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-4 sm:gap-5 w-full max-w-[360px] z-20">
              {PROJECTS.map((project, idx) => {
                const isActive = idx === activeAppIndex;

                const borderStyle = isActive
                  ? "border-pink-500 ring-4 ring-pink-400/30"
                  : "border-pink-200/80 hover:border-pink-400";
                const bgStyle = isActive
                  ? "bg-neutral-950 text-white shadow-2xl shadow-pink-900/25 lg:-translate-x-3 scale-[1.03]"
                  : "bg-white/90 hover:bg-white text-neutral-800 shadow-md hover:shadow-xl hover:scale-[1.02]";

                return (
                  <button
                    key={project.name}
                    onClick={() => {
                      setActiveAppIndex(idx);
                      setPageIndex(0);
                    }}
                    className={`group relative flex items-center gap-3.5 p-3.5 md:p-4 rounded-2xl md:rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-md w-full text-left ${borderStyle} ${bgStyle} ${
                      idx === 0 ? "float-card-1" : idx === 1 ? "float-card-2" : "float-card-3"
                    }`}
                  >
                    {/* App Logo / Screenshot Icon */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border border-neutral-200 bg-neutral-900">
                      <img
                        src={project.screenshots[0]}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white drop-shadow-sm" />
                        </div>
                      )}
                    </div>

                    {/* App Label */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-mono tracking-widest font-bold uppercase ${
                            isActive ? "text-pink-400" : "text-pink-600"
                          }`}
                        >
                          App 0{idx + 1}
                        </span>
                        {isActive && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-extrabold tracking-tight truncate mt-0.5">
                        {project.name}
                      </h4>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          isActive ? "text-neutral-300" : "text-neutral-500"
                        }`}
                      >
                        {project.tech}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS for floating app cards */}
      <style>{`
        @keyframes float-c1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes float-c2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes float-c3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .float-card-1 { animation: float-c1 4.2s ease-in-out infinite; }
        .float-card-2 { animation: float-c2 4.8s ease-in-out infinite 0.5s; }
        .float-card-3 { animation: float-c3 4.5s ease-in-out infinite 1s; }
      `}</style>
    </div>
  );
}
