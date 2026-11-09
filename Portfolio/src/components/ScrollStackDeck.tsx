import React, { useState, useEffect, useRef } from "react";
import {
  SHOWCASE_PROJECTS,
  type ProjectShowcaseData,
} from "@/data/projectsData";
import { MinimalStackCard } from "@/components/MinimalStackCard";
import { ArrowDown } from "lucide-react";

interface ScrollStackDeckProps {
  onSelectProject?: (project: ProjectShowcaseData) => void;
}

// Hermite cubic ease for smooth physical feel
function smoothStep(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

export function ScrollStackDeck({ onSelectProject }: ScrollStackDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(900);

  const total = SHOWCASE_PROJECTS.length; // 3 projects

  // Track viewport height
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Butter-smooth 60fps scroll progress tracker
  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Distance from top of container to top of viewport
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    const onScroll = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(() => {
          updateScrollProgress();
          animationFrameId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  /**
   * Scroll Progress Phases (0.00 to 1.00):
   * Phase 1 (0.00 - 0.15): Card 0 resting and in full view.
   * Phase 2 (0.15 - 0.50): Card 1 slides up from bottom and settles on top of Card 0.
   * Phase 3 (0.50 - 0.65): Card 1 resting on top of Card 0.
   * Phase 4 (0.65 - 0.95): Card 2 slides up from bottom and settles on top of Card 1.
   * Phase 5 (0.95 - 1.00): Card 2 resting on top.
   *
   * On reverse scroll (scroll up):
   * Moves backwards through these exact math phases, smoothly unstacking cards down!
   */

  // Transition 1 (Card 1 onto Card 0): 0.15 -> 0.50
  const t1 = smoothStep((scrollProgress - 0.15) / 0.35);

  // Transition 2 (Card 2 onto Card 1): 0.65 -> 0.95
  const t2 = smoothStep((scrollProgress - 0.65) / 0.30);

  // Card 0 (Base / BioTrace)
  // When Card 1 arrives (t1), Card 0 shifts to translateY: -16px, scale: 0.96
  // When Card 2 arrives (t2), Card 0 shifts to translateY: -32px, scale: 0.92
  const card0TranslateY = -16 * t1 - 16 * t2;
  const card0Scale = 1 - 0.04 * t1 - 0.04 * t2;
  const card0Opacity = 1 - 0.12 * t1 - 0.12 * t2;

  // Card 1 (GraphGuard)
  // Starts below viewport (translateY = viewportHeight * 0.9)
  // When t1 goes from 0 -> 1, translateY moves to 0
  // When Card 2 arrives (t2), Card 1 shifts to translateY: -16px, scale: 0.96
  const card1SlideIn = (1 - t1) * (viewportHeight * 0.95);
  const card1TranslateY = card1SlideIn - 16 * t2;
  const card1Scale = 1 - 0.04 * t2;
  const card1Opacity = t1 < 0.02 ? 0 : 1 - 0.12 * t2;

  // Card 2 (Postly)
  // Starts below viewport, slides in during t2
  const card2SlideIn = (1 - t2) * (viewportHeight * 0.95);
  const card2TranslateY = card2SlideIn;
  const card2Scale = 1;
  const card2Opacity = t2 < 0.02 ? 0 : 1;

  // Determine which card is currently active on top
  const activeIndex = t2 >= 0.5 ? 2 : t1 >= 0.5 ? 1 : 0;

  return (
    <div
      ref={containerRef}
      // 300vh provides a comfortable, smooth scroll distance
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      {/* ── Sticky Viewport (100vh pinned) ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-8 md:px-14 overflow-hidden bg-[#FAF7F9]">
        {/* Subtle Ambient Background Light */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{ background: "#FFEAF4" }}
        />

        {/* ── Top Header Bar ── */}
        <div className="relative z-40 w-full max-w-[1080px] mx-auto flex items-end justify-between border-b border-pink-200/50 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-pink-600">
                Selected Work // 01 — 0{total}
              </span>
            </div>
            <h2 className="script text-4xl sm:text-5xl text-neutral-900 leading-none">
              Featured Projects
            </h2>
          </div>

          {/* Interactive Stack Indicators & Scroll Hint */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SHOWCASE_PROJECTS.map((proj, i) => (
                <div
                  key={proj.id}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? "w-7 h-2 bg-neutral-900"
                      : i < activeIndex
                      ? "w-2 h-2 bg-neutral-400"
                      : "w-2 h-2 bg-neutral-200"
                  }`}
                  title={proj.name}
                />
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 bg-white/70 border border-neutral-200/80 px-3 py-1 rounded-full shadow-xs">
              <ArrowDown className="w-3 h-3 text-pink-500 animate-bounce" />
              <span>Scroll to stack / unstack</span>
            </div>
          </div>
        </div>

        {/* ── Center Stage: Stacked Cards Container ── */}
        <div className="relative z-20 w-full max-w-[1080px] mx-auto h-[520px] md:h-[480px] my-auto">
          {/* Card 0 (BioTrace) */}
          <MinimalStackCard
            project={SHOWCASE_PROJECTS[0]}
            index={0}
            total={total}
            translateY={card0TranslateY}
            scale={card0Scale}
            opacity={card0Opacity}
            zIndex={10}
            isTop={activeIndex === 0}
            onClick={() => onSelectProject?.(SHOWCASE_PROJECTS[0])}
          />

          {/* Card 1 (GraphGuard) */}
          <MinimalStackCard
            project={SHOWCASE_PROJECTS[1]}
            index={1}
            total={total}
            translateY={card1TranslateY}
            scale={card1Scale}
            opacity={card1Opacity}
            zIndex={20}
            isTop={activeIndex === 1}
            onClick={() => onSelectProject?.(SHOWCASE_PROJECTS[1])}
          />

          {/* Card 2 (Postly) */}
          <MinimalStackCard
            project={SHOWCASE_PROJECTS[2]}
            index={2}
            total={total}
            translateY={card2TranslateY}
            scale={card2Scale}
            opacity={card2Opacity}
            zIndex={30}
            isTop={activeIndex === 2}
            onClick={() => onSelectProject?.(SHOWCASE_PROJECTS[2])}
          />
        </div>

        {/* ── Bottom Status Bar ── */}
        <div className="relative z-40 w-full max-w-[1080px] mx-auto flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-200/50">
          <span className="font-mono text-[11px]">
            Active: <strong className="text-neutral-900">{SHOWCASE_PROJECTS[activeIndex].name}</strong> ({activeIndex + 1}/{total})
          </span>
          <span className="font-mono text-[11px] hidden sm:inline">
            Scroll down for next stack · Scroll up to peel back
          </span>
        </div>
      </div>
    </div>
  );
}
