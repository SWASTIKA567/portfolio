import { useState } from "react";
import { PROJECTS } from "@/data/portfolio.ts";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tilt3D } from "@/components/Tilt3D";

export function Slide3() {
  const [active, setActive] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const activeProject = PROJECTS[active];

  const getPhoneTransform = (index: number) => {
    const isCenter = index === active;
    const isLeft = index === (active - 1 + PROJECTS.length) % PROJECTS.length;

    if (isCenter) {
      if (isFocused) {
        return {
          className:
            "left-1/2 -translate-x-1/2 -translate-y-[70px] scale-85 md:translate-y-0 md:-translate-x-[calc(50%+210px)] md:scale-100 z-30 opacity-100 pointer-events-auto",
          style: {
            transform: "perspective(1200px) rotateY(10deg) translateZ(30px)",
            filter: "drop-shadow(0 25px 45px rgba(212,86,154,0.25))",
          },
        };
      } else {
        return {
          className:
            "left-1/2 -translate-x-1/2 scale-100 md:scale-105 z-20 opacity-100 pointer-events-auto cursor-pointer",
          style: {
            transform: "perspective(1200px) rotateY(0deg) translateZ(60px)",
            filter: "drop-shadow(0 35px 50px rgba(0,0,0,0.35))",
          },
        };
      }
    } else if (isLeft) {
      return {
        className: isFocused
          ? "left-1/2 -translate-x-[calc(50%+320px)] scale-50 z-0 opacity-0 pointer-events-none"
          : "left-1/2 -translate-x-[calc(50%+90px)] md:-translate-x-[calc(50%+220px)] scale-75 z-10 opacity-40 hover:opacity-75 pointer-events-auto cursor-pointer",
        style: {
          transform: "perspective(1200px) rotateY(26deg) translateZ(-80px)",
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2)) blur(0.5px)",
        },
      };
    } else {
      return {
        className: isFocused
          ? "left-1/2 -translate-x-[calc(50%-320px)] scale-50 z-0 opacity-0 pointer-events-none"
          : "left-1/2 -translate-x-[calc(50%-90px)] md:-translate-x-[calc(50%-220px)] scale-75 z-10 opacity-40 hover:opacity-75 pointer-events-auto cursor-pointer",
        style: {
          transform: "perspective(1200px) rotateY(-26deg) translateZ(-80px)",
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2)) blur(0.5px)",
        },
      };
    }
  };

  const getDetailsClass = () => {
    if (isFocused) {
      return "left-1/2 -translate-x-1/2 translate-y-[210px] md:translate-y-0 md:translate-x-[40px] opacity-100 scale-100 pointer-events-auto z-30 w-[310px] md:w-[420px]";
    } else {
      return "left-1/2 -translate-x-1/2 translate-y-[380px] md:translate-y-0 md:translate-x-[180px] opacity-0 scale-90 pointer-events-none z-0 w-[310px] md:w-[420px]";
    }
  };

  return (
    <section className="slide relative overflow-hidden" style={{ background: "#faf8f6", padding: "60px 20px" }}>
      {/* Subtle ambient 3D glow circles in background */}
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div style={{ width: "100%", maxWidth: 1180, position: "relative", zIndex: 10 }}>
        {/* Header */}
        <ScrollReveal animation="3d-rise">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="script" style={{ fontSize: 36, color: "#d4569a", margin: 0 }}>
              Projects
            </p>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 700,
                margin: "4px 0 0",
                color: "#111",
                letterSpacing: "-0.02em",
              }}
            >
              featured work
            </h2>
            <p style={{ fontSize: 13, color: "#777", marginTop: 8 }}>
              {isFocused
                ? "interact with the active phone screen or return to projects"
                : "click the center phone or explore button to view 3D details"}
            </p>
          </div>
        </ScrollReveal>

        {/* 3D Carousel Stage */}
        <div
          className="relative w-full mx-auto flex items-center justify-center overflow-visible"
          style={{
            minHeight: 580,
            maxWidth: 1020,
            perspective: 1400,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Left Arrow Button with 3D Hover */}
          {!isFocused && (
            <button
              onClick={() => setActive((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
              className="absolute left-0 md:left-4 z-40 bg-white/90 hover:bg-white text-neutral-800 hover:text-pink-600 w-13 h-13 rounded-full flex items-center justify-center border border-pink-100 hover:border-pink-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-115 active:scale-95 cursor-pointer backdrop-blur-md"
              title="Previous Project"
              style={{
                boxShadow: "0 10px 25px -5px rgba(212,86,154,0.18)",
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Carousel Stage Wrapper */}
          <div
            className="relative w-full h-[560px] overflow-visible"
            style={{
              perspective: 1400,
              transformStyle: "preserve-3d",
            }}
          >
            {PROJECTS.map((p, i) => {
              const isCenter = i === active;
              const { className, style } = getPhoneTransform(i);
              return (
                <div
                  key={p.name}
                  className={`absolute top-0 transition-all duration-700 cubic-bezier(0.2, 0.9, 0.3, 1) ${className}`}
                  style={{
                    transformStyle: "preserve-3d",
                    ...style,
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setActive(i);
                    } else if (!isFocused) {
                      setIsFocused(true);
                    }
                  }}
                >
                  <PhoneFrame
                    project={p}
                    paused={!isCenter}
                    autoplay={isCenter}
                    enableTilt={isCenter}
                  />
                </div>
              );
            })}
          </div>

          {/* 3D Project Details Card */}
          <div
            className={`absolute top-0 md:top-6 transition-all duration-700 cubic-bezier(0.2, 0.9, 0.3, 1) ${getDetailsClass()}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Tilt3D
              maxTilt={12}
              perspective={1000}
              scale={1.02}
              className="w-full bg-white/85 hover:bg-white/95 backdrop-blur-xl border border-pink-150/90 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300"
              style={{
                boxShadow:
                  "0 25px 60px -15px rgba(212,86,154,0.22), 0 10px 25px -10px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ transform: "translateZ(15px)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/50">
                    Project {String(active + 1).padStart(2, "0")} / {PROJECTS.length}
                  </span>
                  <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-neutral-900 mb-3 tracking-tight">
                  {activeProject.name}
                </h3>

                <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-5">
                  {activeProject.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/60 text-pink-800 text-[11px] font-semibold border border-pink-200 shadow-sm">
                    <span>★</span> {activeProject.highlight}
                  </span>
                </div>

                <div className="text-[11px] md:text-xs text-neutral-600 mb-7 p-3 rounded-xl bg-neutral-50/80 border border-neutral-150">
                  <strong className="text-neutral-900 block mb-1 font-bold">Tech Stack</strong>
                  <span>{activeProject.tech}</span>
                </div>

                <button
                  onClick={() => setIsFocused(false)}
                  className="w-full bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-pink-600 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-full text-xs shadow-lg hover:shadow-pink-500/25 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>← Back to Carousel</span>
                </button>
              </div>
            </Tilt3D>
          </div>

          {/* Right Arrow Button with 3D Hover */}
          {!isFocused && (
            <button
              onClick={() => setActive((prev) => (prev + 1) % PROJECTS.length)}
              className="absolute right-0 md:right-4 z-40 bg-white/90 hover:bg-white text-neutral-800 hover:text-pink-600 w-13 h-13 rounded-full flex items-center justify-center border border-pink-100 hover:border-pink-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-115 active:scale-95 cursor-pointer backdrop-blur-md"
              title="Next Project"
              style={{
                boxShadow: "0 10px 25px -5px rgba(212,86,154,0.18)",
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Carousel indicator & 3D Interactive trigger */}
        <div
          className="mt-6 text-center transition-all duration-500"
          style={{
            opacity: isFocused ? 0 : 1,
            transform: isFocused ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isFocused ? "none" : "auto",
          }}
        >
          <button
            onClick={() => setIsFocused(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200 cursor-pointer shadow-md hover:shadow-xl hover:shadow-pink-200/50 hover:scale-108 active:scale-95 transition-all duration-300 group"
          >
            <span>Explore {activeProject.name} Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
