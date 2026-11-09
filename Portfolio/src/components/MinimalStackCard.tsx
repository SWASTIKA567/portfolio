import React from "react";
import type { ProjectShowcaseData } from "@/data/projectsData";
import { ArrowUpRight, Trophy } from "lucide-react";

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
      className="absolute top-0 left-0 right-0 w-full h-[520px] md:h-[480px] rounded-[32px] bg-white border border-neutral-200/80 cursor-pointer select-none overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col"
    >
      {/* Top minimal color accent line */}
      <div
        className="w-full h-2 flex-shrink-0"
        style={{ backgroundColor: project.theme.primary }}
      />

      {/* Card Content Grid */}
      <div className="w-full flex-1 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white overflow-hidden">
        {/* ── Left Column: Clean Specs & Typography (md:col-span-7) ── */}
        <div className="md:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Top Index & Badge Row */}
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span
                className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: project.theme.badgeBg,
                  color: project.theme.badgeText,
                }}
              >
                [ {project.codeNumber} ]
              </span>

              <span
                className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs"
                style={{
                  backgroundColor: project.theme.badgeBg,
                  color: project.theme.badgeText,
                }}
              >
                <Trophy className="w-3.5 h-3.5" />
                {project.badge}
              </span>

              <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                0{index + 1} / 0{total}
              </span>
            </div>

            {/* Clean Bold Title */}
            <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-neutral-900 tracking-tight leading-none mb-2 font-sans">
              {project.name}
            </h3>

            {/* Themed Subtitle */}
            <p
              className="text-xs sm:text-sm font-bold tracking-wide uppercase mb-4 leading-snug"
              style={{ color: project.theme.primary }}
            >
              {project.tagline}
            </p>

            {/* Minimal Narrative Paragraph */}
            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal mb-5 line-clamp-3">
              {project.heroSummary}
            </p>

            {/* Feature Tag Pills with ✦ */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tagChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/80"
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
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer group"
            >
              <span className="border-b-2 border-neutral-900 pb-0.5 group-hover:border-neutral-500 transition-colors">
                Explore Case Study
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: project.theme.primary }}
              />
            </button>

            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              Tap card to view details
            </span>
          </div>
        </div>

        {/* ── Right Column: Clean Screenshot Presentation (md:col-span-5) ── */}
        <div className="md:col-span-5 h-full flex flex-col items-center justify-center">
          <div
            className="w-full h-full max-h-[380px] rounded-2xl p-3 border flex flex-col items-center justify-center shadow-xs transition-transform duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: project.theme.lightBg,
              borderColor: project.theme.border,
            }}
          >
            {/* Clean Screenshot Frame */}
            <div className="w-full h-[85%] rounded-xl overflow-hidden shadow-sm border border-neutral-200/80 bg-white">
              <img
                src={project.mockupCover}
                alt={project.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Subtle caption */}
            <div className="mt-2 text-center">
              <span className="text-[11px] font-medium text-neutral-500 truncate block">
                {project.screenshots[0]?.title || "App Interface Preview"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
