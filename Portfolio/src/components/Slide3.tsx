import { useState } from "react";
import { PROJECTS } from "@/data/portfolio.ts";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Slide3() {
  const [active, setActive] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const activeProject = PROJECTS[active];

  const getPhoneClass = (index: number) => {
    const isCenter = index === active;
    const isLeft = index === (active - 1 + PROJECTS.length) % PROJECTS.length;

    if (isCenter) {
      if (isFocused) {
        // Active & Focused: slides left on desktop, slides up on mobile
        return "left-1/2 -translate-x-1/2 -translate-y-[70px] scale-85 md:translate-y-0 md:-translate-x-[calc(50%+200px)] md:scale-100 z-20 opacity-100 pointer-events-auto";
      } else {
        // Active & Carousel Center
        return "left-1/2 -translate-x-1/2 scale-100 md:scale-105 z-20 opacity-100 pointer-events-auto cursor-pointer hover:scale-110 active:scale-102";
      }
    } else if (isLeft) {
      // Left Phone: disappears when focused
      return isFocused
        ? "left-1/2 -translate-x-[calc(50%+300px)] scale-50 z-0 opacity-0 pointer-events-none"
        : "left-1/2 -translate-x-[calc(50%+90px)] md:-translate-x-[calc(50%+200px)] scale-75 z-10 opacity-30 pointer-events-auto cursor-pointer hover:opacity-50";
    } else {
      // Right Phone: disappears when focused
      return isFocused
        ? "left-1/2 -translate-x-[calc(50%-300px)] scale-50 z-0 opacity-0 pointer-events-none"
        : "left-1/2 -translate-x-[calc(50%-90px)] md:-translate-x-[calc(50%-200px)] scale-75 z-10 opacity-30 pointer-events-auto cursor-pointer hover:opacity-50";
    }
  };

  const getDetailsClass = () => {
    if (isFocused) {
      // Slides in on the right for desktop, slides up from below on mobile
      return "left-1/2 -translate-x-1/2 translate-y-[220px] md:translate-y-0 md:translate-x-[40px] opacity-100 scale-100 pointer-events-auto z-20 w-[290px] md:w-[380px]";
    } else {
      // Hidden below/to the right
      return "left-1/2 -translate-x-1/2 translate-y-[400px] md:translate-y-0 md:translate-x-[200px] opacity-0 scale-90 pointer-events-none z-0 w-[290px] md:w-[380px]";
    }
  };

  return (
    <section className="slide" style={{ background: "#fafafa", padding: "60px 20px" }}>
      <div style={{ width: "100%", maxWidth: 1180 }}>
        {/* Header */}
        <ScrollReveal animation="slide-up">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="script" style={{ fontSize: 32, color: "#d4569a", margin: 0 }}>
              Projects
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 600, margin: "4px 0 0", color: "#111" }}>
              featured work
            </h2>
            <p style={{ fontSize: 12, color: "#777", marginTop: 8 }}>
              {isFocused 
                ? "interact with the active phone screen or return to projects"
                : "click the center phone to focus and see project details"
              }
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel Stage */}
        <div
          className="relative w-full mx-auto flex items-center justify-center overflow-visible"
          style={{ minHeight: 570, maxWidth: 960 }}
        >
          {/* Left Arrow Button */}
          {!isFocused && (
            <button
              onClick={() => setActive((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
              className="absolute left-0 md:left-4 z-30 bg-white/95 hover:bg-pink-50 text-neutral-800 hover:text-pink-600 w-12 h-12 rounded-full flex items-center justify-center border border-neutral-150 hover:border-pink-200 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
              title="Previous Project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Carousel Wrapper */}
          <div className="relative w-full h-[555px] overflow-visible">
            {PROJECTS.map((p, i) => {
              const isCenter = i === active;
              const phoneClass = getPhoneClass(i);
              return (
                <div
                  key={p.name}
                  className={`absolute top-0 transition-all duration-500 ease-in-out ${phoneClass}`}
                  onClick={() => {
                    if (!isCenter) {
                      setActive(i);
                    } else if (!isFocused) {
                      setIsFocused(true);
                    }
                  }}
                >
                  <PhoneFrame project={p} paused={!isCenter} autoplay={isCenter} />
                </div>
              );
            })}
          </div>

          {/* Details Card (Absolute Positioned, Animates into View) */}
          <div
            className={`absolute top-0 md:top-6 transition-all duration-500 ease-in-out bg-white/80 hover:bg-white backdrop-blur-md border border-pink-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-pink-900/5 ${getDetailsClass()}`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 mb-2">
              Project {String(active + 1).padStart(2, "0")} of {PROJECTS.length}
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-3 tracking-tight">
              {activeProject.name}
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-4">
              {activeProject.desc}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-[10px] font-semibold border border-pink-100/50">
                {activeProject.highlight}
              </span>
            </div>

            <div className="text-[11px] md:text-xs text-neutral-500 mb-6">
              <strong className="text-neutral-800">Tech Stack:</strong> {activeProject.tech}
            </div>

            <button
              onClick={() => setIsFocused(false)}
              className="bg-neutral-900 hover:bg-neutral-800 text-white border-none py-2.5 px-6 rounded-full text-xs font-semibold shadow hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              ← Back to projects
            </button>
          </div>

          {/* Right Arrow Button */}
          {!isFocused && (
            <button
              onClick={() => setActive((prev) => (prev + 1) % PROJECTS.length)}
              className="absolute right-0 md:right-4 z-30 bg-white/95 hover:bg-pink-50 text-neutral-800 hover:text-pink-600 w-12 h-12 rounded-full flex items-center justify-center border border-neutral-150 hover:border-pink-200 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
              title="Next Project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Carousel indicator helper (only visible in carousel mode) */}
        <div
          className="mt-8 text-center transition-all duration-500"
          style={{
            opacity: isFocused ? 0 : 1,
            transform: isFocused ? "translateY(15px)" : "translateY(0)",
            pointerEvents: isFocused ? "none" : "auto",
          }}
        >
          <button
            onClick={() => setIsFocused(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-100/50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200/30 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Explore {activeProject.name} Details →
          </button>
        </div>
      </div>
    </section>
  );
}
