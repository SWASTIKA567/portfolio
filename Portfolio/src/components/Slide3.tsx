import { useState } from "react";
import { PROJECTS } from "@/data/portfolio.ts";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Slide3() {
  const [active, setActive] = useState<number>(0);
  const activeProject = PROJECTS[active];

  const getPositionClass = (index: number) => {
    if (index === active) {
      // Center (Active)
      return "left-1/2 -translate-x-1/2 scale-100 md:scale-105 z-20 opacity-100 pointer-events-auto";
    } else if (index === (active - 1 + PROJECTS.length) % PROJECTS.length) {
      // Left
      return "left-1/2 -translate-x-[calc(50%+90px)] md:-translate-x-[calc(50%+200px)] scale-75 z-10 opacity-30 pointer-events-auto cursor-pointer hover:opacity-60";
    } else {
      // Right
      return "left-1/2 -translate-x-[calc(50%-90px)] md:-translate-x-[calc(50%-200px)] scale-75 z-10 opacity-30 pointer-events-auto cursor-pointer hover:opacity-60";
    }
  };

  return (
    <section className="slide" style={{ background: "#fafafa", padding: "60px 20px" }}>
      <div style={{ width: "100%", maxWidth: 1180 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="script" style={{ fontSize: 32, color: "#d4569a", margin: 0 }}>
            Projects
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 600, margin: "4px 0 0", color: "#111" }}>
            featured work
          </h2>
          <p style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
            click the side phones or arrows to cycle, tap the center screen to play
          </p>
        </div>

        {/* Carousel Stage */}
        <div
          className="relative w-full mx-auto flex items-center justify-center"
          style={{ minHeight: 570, maxWidth: 960 }}
        >
          {/* Left Arrow Button */}
          <button
            onClick={() => setActive((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
            className="absolute left-0 md:left-4 z-30 bg-white/95 hover:bg-pink-50 text-neutral-800 hover:text-pink-600 w-12 h-12 rounded-full flex items-center justify-center border border-neutral-150 hover:border-pink-200 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
            title="Previous Project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Carousel Wrapper */}
          <div className="relative w-full h-[555px] overflow-visible">
            {PROJECTS.map((p, i) => {
              const isCenter = i === active;
              const positionClass = getPositionClass(i);
              return (
                <div
                  key={p.name}
                  className={`absolute top-0 transition-all duration-500 ease-out ${positionClass}`}
                  onClick={() => {
                    if (!isCenter) {
                      setActive(i);
                    }
                  }}
                >
                  <PhoneFrame project={p} paused={!isCenter} autoplay={isCenter} />
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => setActive((prev) => (prev + 1) % PROJECTS.length)}
            className="absolute right-0 md:right-4 z-30 bg-white/95 hover:bg-pink-50 text-neutral-800 hover:text-pink-600 w-12 h-12 rounded-full flex items-center justify-center border border-neutral-150 hover:border-pink-200 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
            title="Next Project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Active Project Details Card */}
        <div
          key={active} // Re-run fade/slide animation when active project changes
          className="mt-12 mx-auto max-w-[600px] bg-white/70 backdrop-blur-sm border border-pink-100 rounded-3xl p-6 md:p-8 text-center shadow-lg shadow-pink-900/5 transition-all duration-500 hover:border-pink-300 hover:bg-white"
          style={{ animation: "fade-in 0.5s ease both" }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600 mb-2">
            Project {String(active + 1).padStart(2, "0")} of {PROJECTS.length}
          </p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
            {activeProject.name}
          </h3>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4 max-w-lg mx-auto">
            {activeProject.desc}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold border border-pink-100/50 shadow-sm">
              {activeProject.highlight}
            </span>
          </div>

          <div className="text-xs md:text-sm text-neutral-500">
            <strong className="text-neutral-800">Tech Stack:</strong> {activeProject.tech}
          </div>
        </div>
      </div>
    </section>
  );
}
