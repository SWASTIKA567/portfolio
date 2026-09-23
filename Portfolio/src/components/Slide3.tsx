import React, { useState, useEffect, useRef } from "react";
import vinyl from "@/assets/pink-vinyl.png";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Tilt3D } from "@/components/Tilt3D";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers,
  Smartphone,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export function Slide3() {
  const [stage, setStage] = useState<"splash" | "shifted">("splash");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeProject: Project = PROJECTS[activeProjectIndex];

  // Function to run the splash -> quarter-shift sequence
  const triggerTransition = () => {
    setStage("splash");
    setPageIndex(0);
    // After 1100ms, smoothly shift the vinyl into the top-right corner
    setTimeout(() => {
      setStage("shifted");
    }, 1100);
  };

  // Listen to custom trigger event from About section button
  useEffect(() => {
    const handleTrigger = () => {
      triggerTransition();
    };

    window.addEventListener("trigger-projects-splash", handleTrigger);
    return () => window.removeEventListener("trigger-projects-splash", handleTrigger);
  }, []);

  // IntersectionObserver to auto-trigger when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            triggerTransition();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  // Reset pageIndex when active app changes
  useEffect(() => {
    setPageIndex(0);
  }, [activeProjectIndex]);

  // Automatic slideshow on the phone screen
  useEffect(() => {
    if (isPaused || stage !== "shifted") return;

    const timer = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % activeProject.screenshots.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused, stage, activeProject.screenshots.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full overflow-hidden text-neutral-900 flex items-center justify-center px-4 md:px-12 py-16 md:py-24"
      style={{
        background: "radial-gradient(circle at 40% 50%, #fff7fb 0%, #fdeef6 50%, #fae6f2 100%)",
      }}
    >
      {/* Ambient background blur lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #f472b6 0%, #ec4899 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-30 blur-[90px]"
        style={{
          background: "radial-gradient(circle, #c084fc 0%, #a855f7 40%, transparent 70%)",
        }}
      />

      {/* =========================================================================
          THE PINK VINYL: SPLASH STATE vs QUARTER CORNER SHIFT STATE
          ========================================================================= */}
      <div
        className={`pointer-events-none select-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
          stage === "splash"
            ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(75vw,520px)] aspect-square scale-100 opacity-100 drop-shadow-[0_25px_60px_rgba(236,72,153,0.5)]"
            : "absolute -top-28 -right-28 md:-top-44 md:-right-44 w-[480px] sm:w-[650px] md:w-[820px] aspect-square scale-100 opacity-95 drop-shadow-[0_20px_50px_rgba(236,72,153,0.3)]"
        }`}
      >
        <div className="relative w-full h-full">
          {/* Rotating Vinyl Disc */}
          <img
            src={vinyl}
            alt="Pink Vinyl"
            className={`w-full h-full object-contain rounded-full ${
              stage === "splash" ? "animate-spin-fast" : "animate-spin-smooth"
            }`}
          />

          {/* Dynamic Groove Light Sheen */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.25) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.25) 225deg, transparent 270deg, transparent 360deg)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Center Label */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full flex flex-col items-center justify-center p-2 text-center select-none shadow-md border-2 border-pink-400/50 ${
              stage === "splash" ? "animate-spin-fast" : "animate-spin-smooth"
            }`}
            style={{
              background: "radial-gradient(circle, #ffffff 0%, #ffeaf4 60%, #f472b6 100%)",
            }}
          >
            <span className="text-[7px] md:text-[9px] font-mono tracking-widest text-neutral-600 uppercase font-bold">
              SWAS-DISC
            </span>
            <span className="font-black text-[9px] md:text-[13px] leading-tight text-neutral-900 tracking-tight">
              {stage === "splash" ? "PROJECTS" : activeProject.name}
            </span>
            <span className="text-[6px] md:text-[8px] font-semibold text-pink-700 tracking-wider uppercase">
              33 ⅓ RPM
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SPLASH OVERLAY TEXT (Visible only during "splash" moment)
          ========================================================================= */}
      {stage === "splash" && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center pointer-events-none animate-fade-in select-none">
          <div className="mt-[360px] md:mt-[420px] text-center">
            <span className="px-4 py-1.5 rounded-full bg-black/80 text-white text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md shadow-lg border border-pink-500/40">
              ✦ Dropping The Needle ✦
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mt-3 drop-shadow-sm">
              Featured Projects
            </h2>
          </div>
        </div>
      )}

      {/* =========================================================================
          SHIFTED STATE: LEFT PHONE SCREEN + RIGHT QUARTER VINYL FLOATING LOGOS
          ========================================================================= */}
      <div
        className={`w-full max-w-[1260px] relative z-20 transition-all duration-1000 ${
          stage === "shifted" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 border-b border-pink-300/40 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.25em] text-pink-600 uppercase mb-1">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Interactive App Showcase</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
              Tap Logo to Launch App
            </h2>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-3">
            {/* Replay Vinyl Splash Button */}
            <button
              onClick={triggerTransition}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-pink-600 text-xs font-semibold tracking-wider uppercase border border-pink-200 shadow-sm transition-all cursor-pointer backdrop-blur-sm"
              title="Replay Vinyl Splash Transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Splash</span>
            </button>
          </div>
        </div>

        {/* Main Stage: Left Phone + Right Floating Quarter Logos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* ════════ LEFT SIDE: SMARTPHONE SCREEN & PAGES SLIDESHOW (6 Columns) ════════ */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full">
              {/* 3D Phone Mockup */}
              <Tilt3D maxTilt={12} scale={1.02} glare={true} className="flex-shrink-0">
                <div className="relative w-[260px] sm:w-[280px] md:w-[310px] aspect-[9/19] bg-neutral-950 rounded-[44px] p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.35),0_10px_30px_rgba(236,72,153,0.22)] border-[3.5px] border-neutral-800">
                  {/* Dynamic Island Pill */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                  </div>

                  {/* Phone Screen Display */}
                  <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-neutral-900 flex flex-col justify-between">
                    {/* Active Screenshot Canvas */}
                    <div className="relative w-full h-full">
                      {activeProject.screenshots.map((src, index) => (
                        <img
                          key={src}
                          src={src}
                          alt={`${activeProject.name} screen ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                            index === pageIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                          }`}
                        />
                      ))}

                      {/* Manual Previous / Next Screen Arrows */}
                      {activeProject.screenshots.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setPageIndex(
                                (prev) =>
                                  (prev - 1 + activeProject.screenshots.length) % activeProject.screenshots.length
                              )
                            }
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-sm"
                            title="Previous Screen"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setPageIndex((prev) => (prev + 1) % activeProject.screenshots.length)
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-sm"
                            title="Next Screen"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Bottom Gradient Protection */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none" />

                      {/* Slideshow Page Indicator Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
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

              {/* Active App Details & Controls */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[11px] font-extrabold uppercase tracking-wider border border-pink-200 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                  {activeProject.highlight}
                </span>

                <h3 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {activeProject.name}
                </h3>
                <p className="text-xs font-mono text-pink-600 font-semibold mt-1">
                  {activeProject.tech}
                </p>

                <p className="text-xs md:text-sm text-neutral-600 mt-2.5 leading-relaxed">
                  {activeProject.desc}
                </p>

                {/* Slideshow Play / Pause Toggle */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPaused ? "Play Slideshow" : "Slideshow On"}</span>
                  </button>

                  <span className="text-[11px] font-mono text-neutral-500">
                    Page {pageIndex + 1} of {activeProject.screenshots.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ════════ RIGHT SIDE: FLOATING APP LOGOS IN QUARTER VINYL (6 Columns) ════════ */}
          <div className="lg:col-span-6 relative flex flex-col justify-center min-h-[380px] md:min-h-[460px]">
            {/* Ambient title over the quarter arc */}
            <div className="mb-6 lg:mb-8 text-center lg:text-right lg:pr-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-500 font-bold uppercase block">
                Vinyl Arc • Select Track
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Tap floating logo to load into phone
              </p>
            </div>

            {/* ──── FLOATING APP LOGOS CONTAINER ──── */}
            <div className="relative w-full flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-4 sm:gap-6 z-20">
              {PROJECTS.map((project, idx) => {
                const isActive = idx === activeProjectIndex;

                // Color themes per project
                const colorBorder = isActive
                  ? "border-pink-500 ring-4 ring-pink-400/30"
                  : "border-pink-200/80 hover:border-pink-400";
                const bgActive = isActive
                  ? "bg-neutral-950 text-white shadow-2xl shadow-pink-900/25 -translate-x-2"
                  : "bg-white/90 hover:bg-white text-neutral-800 shadow-md hover:shadow-xl";

                return (
                  <button
                    key={project.name}
                    onClick={() => {
                      setActiveProjectIndex(idx);
                      setPageIndex(0);
                    }}
                    className={`group relative flex items-center gap-4 p-3.5 md:p-4 rounded-2xl md:rounded-3xl border transition-all duration-400 cursor-pointer backdrop-blur-md w-full max-w-[340px] text-left ${colorBorder} ${bgActive} ${
                      idx === 0 ? "float-anim-1" : idx === 1 ? "float-anim-2" : "float-anim-3"
                    }`}
                  >
                    {/* App Logo / Screenshot Thumbnail */}
                    <div className="relative w-13 h-13 md:w-15 md:h-15 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border border-neutral-200 bg-neutral-900">
                      <img
                        src={project.screenshots[0]}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />
                        </div>
                      )}
                    </div>

                    {/* App Name & Tech Details */}
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

                      <h4 className="text-base md:text-lg font-black tracking-tight truncate mt-0.5">
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

      {/* =========================================================================
          EMBEDDED CSS FOR SPINNING AND FLOATING LOGOS ANIMATION
          ========================================================================= */}
      <style>{`
        @keyframes vinyl-spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes vinyl-spin-smooth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: vinyl-spin-fast 4s linear infinite;
        }
        .animate-spin-smooth {
          animation: vinyl-spin-smooth 22s linear infinite;
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(9px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .float-anim-1 { animation: float1 4.5s ease-in-out infinite; }
        .float-anim-2 { animation: float2 5.2s ease-in-out infinite 0.6s; }
        .float-anim-3 { animation: float3 4.8s ease-in-out infinite 1.2s; }
      `}</style>
    </section>
  );
}
