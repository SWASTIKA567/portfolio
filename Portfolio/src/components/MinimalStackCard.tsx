import React from "react";
import type { ProjectShowcaseData } from "@/data/projectsData";
import { ArrowUpRight } from "lucide-react";
import { PremiumPhoneFrame } from "@/components/PremiumPhoneFrame";

interface MinimalStackCardProps {
  project: ProjectShowcaseData;
  index: number;
  total: number;
  translateY: number; // in px
  scale: number;
  opacity: number;
  zIndex: number;
  isTop: boolean;
  onClick: () => void;
}

export function MinimalStackCard({
  project,
  index,
  total,
  translateY,
  scale,
  opacity,
  zIndex,
  isTop,
  onClick,
}: MinimalStackCardProps) {
  // If card is far below or invisible, hide it completely from hit-testing
  const isHidden = opacity <= 0.02 || translateY > 550;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        transformOrigin: "center top",
        opacity,
        zIndex,
        visibility: isHidden ? "hidden" : "visible",
        pointerEvents: isHidden ? "none" : "auto",
        boxShadow: isTop
          ? "0 30px 70px -15px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06)"
          : "0 15px 40px -10px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(0, 0, 0, 0.04)",
        willChange: "transform, opacity",
      }}
      className="absolute top-0 left-0 right-0 w-full h-[540px] md:h-[490px] rounded-[32px] bg-white border border-neutral-200/80 cursor-pointer select-none overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col group/card"
    >
      {/* Top minimal color accent line */}
      <div
        className="w-full h-2 flex-shrink-0"
        style={{ backgroundColor: project.theme.primary }}
      />

      {/* Card Content Grid */}
      <div className="w-full flex-1 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white overflow-hidden">
        {/* ── Left Column: Clean Specs & Bold Big Typography (md:col-span-7) ── */}
        <div className="md:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Project Heading with font style used in starting (script) */}
            <h3 className="script text-5xl sm:text-6xl lg:text-[72px] text-neutral-900 leading-none mb-3 drop-shadow-xs select-none">
              {project.name}
            </h3>

            {/* Subtitle / Tagline */}
            <p
              className="text-xs sm:text-sm md:text-[15px] font-bold tracking-wider uppercase mb-3.5 leading-snug"
              style={{ color: project.theme.primary }}
            >
              {project.tagline}
            </p>

            {/* Concise Narrative Text (Larger, Less Wordy) */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-5 line-clamp-3">
              {project.heroSummary}
            </p>

            {/* Clean Feature Tag Pills with ✦ */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tagChips.slice(0, 5).map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/80"
                >
                  <span style={{ color: project.theme.primary }}>✦</span>
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer group"
            >
              <span className="border-b-2 border-neutral-900 pb-0.5 group-hover:border-neutral-500 transition-colors">
                Explore Case Study
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: project.theme.primary }}
              />
            </button>
          </div>
        </div>

        {/* ── Right Column: App Logo Badge or Smartphone Mockup (md:col-span-5) ── */}
        <div className="md:col-span-5 h-full flex flex-col items-center justify-center relative py-2">
          {project.logo ? (
            <div className="relative flex flex-col items-center justify-center group/logo">
              {/* Soft Ambient Brand Glow */}
              <div
                className="absolute w-[240px] h-[240px] rounded-full opacity-20 blur-3xl pointer-events-none transition-opacity duration-500 group-hover/logo:opacity-35"
                style={{ backgroundColor: project.theme.primary }}
              />

              {/* Ultra-Premium App Squircle Badge (Replacing Phone) */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-[44px] sm:rounded-[50px] p-2.5 bg-gradient-to-b from-white to-neutral-200/80 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35),0_10px_25px_-5px_rgba(0,0,0,0.15)] border border-white/60 transition-transform duration-500 group-hover/logo:scale-105 group-hover/logo:-translate-y-1.5 flex items-center justify-center overflow-hidden">
                <img
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  className="w-full h-full object-cover rounded-[36px] sm:rounded-[42px] select-none pointer-events-none shadow-inner bg-white"
                />

                {/* Subtle Specular Glare Sheen */}
                <div
                  className="absolute inset-0 rounded-[44px] sm:rounded-[50px] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 40%, transparent 60%, rgba(255,255,255,0.1) 100%)",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="transition-transform duration-500 hover:scale-105">
              <PremiumPhoneFrame
                imageSrc={project.mockupCover}
                alt={project.name}
                width={195}
                height={395}
                rotate={2}
                showButtons={true}
                glare={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
