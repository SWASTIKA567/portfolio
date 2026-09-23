import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import vinyl from "@/assets/pink-vinyl.png";
import { PROCESS } from "@/data/portfolio";
import { Slide6 } from "@/components/Slide6";
import { Slide2 } from "@/components/Slide2";
import { Slide4 } from "@/components/Slide4";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Navbar } from "@/components/Navbar";
import { Vinyl3D } from "@/components/Vinyl3D";
import { Tilt3D } from "@/components/Tilt3D";
import { Sparkles } from "lucide-react";

import "./fonts.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swastika — Portfolio | 3D Experience" },
      { name: "description", content: "Portfolio of Swastika Singh, Flutter & Mobile App Developer." },
      { property: "og:description", content: "Portfolio of Swastika Singh, Flutter & Mobile App Developer." },
      { property: "og:title", content: "Swastika — Portfolio | 3D Experience" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Allura&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Ambient mouse spotlight lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.left = `${e.clientX}px`;
      spotlightRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full font-sans relative overflow-x-hidden" style={{ background: "#fff5fa" }}>
      {/* Ambient Mouse Spotlight Light */}
      <div
        ref={spotlightRef}
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 transition-opacity duration-500 opacity-60 hidden md:block"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.09) 0%, rgba(244,114,182,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <style>{`
        @keyframes vinyl-spin { to { transform: rotate(360deg); } }
        .vinyl-spin { animation: vinyl-spin 24s linear infinite; }
        .script { font-family: var(--font-script); }
        .pink-bg { background: radial-gradient(circle at 50% 40%, #ffd9ec 0%, #ffeaf4 55%, #fff5fa 100%); }
        .slide { min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; padding: 48px 20px; }
        .h-section { font-weight: 600; font-size: 14px; letter-spacing: 0.04em; margin-bottom: 6px; }
        .body-text { font-size: 13px; line-height: 1.55; color: #222; }
        @media (min-width: 768px) {
          .slide { padding-left: 84px; }
          .h-section { font-size: 16px; }
          .body-text { font-size: 15px; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          width: 100%;
          background: #111111;
          border-top: 2px solid #ec4899;
          border-bottom: 2px solid #ec4899;
          box-shadow: 0 6px 30px rgba(236, 72, 153, 0.25);
        }
        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
      `}</style>

      {/* ===================== GLOBAL NAVBAR ===================== */}
      <Navbar />

      {/* ===================== SLIDE 1 — 3D Hero ===================== */}
      <section id="home" className="slide pink-bg relative overflow-hidden flex items-center justify-center">
        <div className="mt-[-80px] md:mt-[-100px] flex items-center justify-center">
          <Vinyl3D />
        </div>
      </section>

      {/* ===================== Animated Marquee Strip with 3D Depth ===================== */}
      <div className="marquee-container py-4 md:py-4.5 select-none relative z-20">
        <div className="marquee-content flex items-center text-xs md:text-sm tracking-[0.25em] font-bold uppercase">
          {[1, 2, 3, 4].map((groupKey) => (
            <span key={groupKey} className="flex items-center flex-shrink-0">
              <span className="text-pink-400 mx-6 md:mx-10 font-extrabold hover:text-pink-300 transition-colors cursor-default drop-shadow-sm">
                UI & UX
              </span>
              <span className="text-white/40">★</span>
              <span className="text-white mx-6 md:mx-10 font-extrabold hover:text-pink-200 transition-colors cursor-default">
                FLUTTER DEV
              </span>
              <span className="text-pink-500/50">★</span>
              <span className="text-pink-400 mx-6 md:mx-10 font-extrabold hover:text-pink-300 transition-colors cursor-default drop-shadow-sm">
                3D INTERACTIONS
              </span>
              <span className="text-white/40">★</span>
              <span className="text-white mx-6 md:mx-10 font-extrabold hover:text-pink-200 transition-colors cursor-default">
                MOBILE & WEB
              </span>
              <span className="text-pink-500/50">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===================== SLIDE 2 — About Me ===================== */}
      <div id="about">
        <Slide2 />
      </div>


      {/* ===================== SLIDE 4 — Journey (Experience & Skills) ===================== */}
      <div id="journey">
        <Slide4 />
      </div>

      {/* ===================== SLIDE 5 — 3D Process ===================== */}
      <section id="process" className="slide pink-bg relative overflow-hidden">
        {/* Background Vinyl with low opacity */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
          <img
            src={vinyl}
            alt=""
            aria-hidden="true"
            className="vinyl-spin w-[130vh] h-[130vh] opacity-[0.16] select-none"
          />
        </div>

        <div className="w-full max-w-[1120px] relative z-10">
          <ScrollReveal animation="3d-rise">
            <div className="flex items-end justify-between mb-4 border-b border-pink-200/40 pb-4">
              <div>
                <h2 className="script text-5xl md:text-7xl leading-none text-neutral-900">Process</h2>
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-pink-600 font-bold mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Engineering Methodology
                </p>
              </div>
              <p className="text-xs md:text-sm text-neutral-500 font-medium hidden sm:block">
                how I build quality apps
              </p>
            </div>
            <p className="text-sm md:text-base text-neutral-600 max-w-2xl mb-10 leading-relaxed font-normal">
              Every project follows the same disciplined five-step workflow — research-driven
              ideas, intentional design, clean modular development, thorough testing, and
              confident deployment.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="3d-rise" delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
              {PROCESS.map((step, i) => (
                <Tilt3D
                  key={step.name}
                  maxTilt={16}
                  perspective={900}
                  scale={1.04}
                  glare={true}
                  glareMaxOpacity={0.25}
                  className="w-full h-full"
                >
                  <div className="group relative overflow-hidden bg-white/80 hover:bg-white backdrop-blur-md border border-pink-150/90 rounded-2xl p-6 h-[230px] flex flex-col justify-between transition-all duration-400 hover:border-pink-400 shadow-md hover:shadow-2xl hover:shadow-pink-900/10 cursor-pointer">
                    {/* Floating 3D step number */}
                    <span
                      className="absolute top-4 right-4 text-4xl font-black text-pink-150 group-hover:text-pink-500 transition-all duration-400 select-none drop-shadow-xs"
                      style={{ transform: "translateZ(24px)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col h-full justify-end mt-8" style={{ transform: "translateZ(14px)" }}>
                      <h3 className="font-bold text-lg md:text-xl text-neutral-900 transition-all duration-300 group-hover:text-pink-600 group-hover:-translate-y-1">
                        {step.name}
                      </h3>
                      <p className="text-xs text-neutral-600 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[140px] overflow-hidden transition-all duration-400 ease-in-out mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Glowing bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Tilt3D>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===================== SLIDE 6 — Contact ===================== */}
      <div id="contact">
        <Slide6 />
      </div>
    </div>
  );
}
