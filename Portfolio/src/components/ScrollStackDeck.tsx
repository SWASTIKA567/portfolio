import React, { useState, useEffect, useRef } from "react";
import {
  SHOWCASE_PROJECTS,
  type ProjectShowcaseData,
} from "@/data/projectsData";
import { MinimalStackCard } from "@/components/MinimalStackCard";

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

  const total = SHOWCASE_PROJECTS.length; // 4 projects

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
   * Scroll Progress Phases for 4 Cards (0.00 to 1.00):
   * Phase 1: Card 0 resting.
   * Phase 2 (0.10 - 0.35): Card 1 (Circle) slides up and settles on Card 0.
   * Phase 3 (0.40 - 0.65): Card 2 (Kechi) slides up and settles on Card 1.
   * Phase 4 (0.70 - 0.95): Card 3 (GraphGuard) slides up and settles on Card 2.
   */

  // Transition 1 (Card 1 Circle onto Card 0 BioTrace): 0.10 -> 0.35
  const t1 = smoothStep((scrollProgress - 0.10) / 0.25);

  // Transition 2 (Card 2 Kechi onto Card 1 Circle): 0.40 -> 0.65
  const t2 = smoothStep((scrollProgress - 0.40) / 0.25);

  // Transition 3 (Card 3 GraphGuard onto Card 2 Kechi): 0.70 -> 0.95
  const t3 = smoothStep((scrollProgress - 0.70) / 0.25);

  // Card 0 (BioTrace)
  const card0TranslateY = -16 * t1 - 16 * t2 - 16 * t3;
  const card0Scale = 1 - 0.04 * t1 - 0.04 * t2 - 0.04 * t3;
  const card0Opacity = 1 - 0.12 * t1 - 0.12 * t2 - 0.12 * t3;

  // Card 1 (Circle)
  const card1SlideIn = (1 - t1) * (viewportHeight * 0.95);
  const card1TranslateY = card1SlideIn - 16 * t2 - 16 * t3;
  const card1Scale = 1 - 0.04 * t2 - 0.04 * t3;
  const card1Opacity = t1 < 0.02 ? 0 : 1 - 0.12 * t2 - 0.12 * t3;

  // Card 2 (Kechi)
  const card2SlideIn = (1 - t2) * (viewportHeight * 0.95);
  const card2TranslateY = card2SlideIn - 16 * t3;
  const card2Scale = 1 - 0.04 * t3;
  const card2Opacity = t2 < 0.02 ? 0 : 1 - 0.12 * t3;

  // Card 3 (GraphGuard)
  const card3SlideIn = (1 - t3) * (viewportHeight * 0.95);
  const card3TranslateY = card3SlideIn;
  const card3Scale = 1;
  const card3Opacity = t3 < 0.02 ? 0 : 1;

  // Determine active top card index
  const activeIndex = t3 >= 0.5 ? 3 : t2 >= 0.5 ? 2 : t1 >= 0.5 ? 1 : 0;

  return (
    <div
      ref={containerRef}
      // 400vh provides a comfortable, smooth scroll distance for 4 stacked projects
      className="relative w-full"
      style={{ height: "400vh" }}
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

          {/* Interactive Stack Indicators */}
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
        </div>

        {/* ── Center Stage: Stacked Cards Container ── */}
        <div className="relative z-20 w-full max-w-[1080px] mx-auto h-[540px] md:h-[490px] my-auto">
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

          {/* Card 1 (Circle) */}
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

          {/* Card 2 (Kechi) */}
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

          {/* Card 3 (GraphGuard) */}
          <MinimalStackCard
            project={SHOWCASE_PROJECTS[3]}
            index={3}
            total={total}
            translateY={card3TranslateY}
            scale={card3Scale}
            opacity={card3Opacity}
            zIndex={40}
            isTop={activeIndex === 3}
            onClick={() => onSelectProject?.(SHOWCASE_PROJECTS[3])}
          />
        </div>

        {/* ── Bottom Status Bar ── */}
        <div className="relative z-40 w-full max-w-[1080px] mx-auto flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-200/50">
          <span className="font-mono text-[11px]">
            Active: <strong className="text-neutral-900">{SHOWCASE_PROJECTS[activeIndex]?.name || ""}</strong> ({activeIndex + 1}/{total})
          </span>
          <span className="font-mono text-[11px] hidden sm:inline">
            Scroll down for next stack · Scroll up to peel back
          </span>
        </div>
      </div>
    </div>
  );
}
