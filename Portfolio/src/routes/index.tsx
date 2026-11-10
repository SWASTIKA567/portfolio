import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import vinyl from "@/assets/pink-vinyl.png";
import { Slide6 } from "@/components/Slide6";
import { Slide2 } from "@/components/Slide2";
import { Slide3 } from "@/components/Slide3";
import { Slide4 } from "@/components/Slide4";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Navbar } from "@/components/Navbar";
import { Vinyl3D } from "@/components/Vinyl3D";

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
    <div className="w-full font-sans relative overflow-x-clip" style={{ background: "#fff5fa" }}>
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

      {/* ===================== SLIDE 3 — Featured Projects (Scroll Stack Deck) ===================== */}
      <div id="projects">
        <Slide3 />
      </div>

      {/* ===================== SLIDE 4 — Journey (Experience & Skills) ===================== */}
      <div id="journey">
        <Slide4 />
      </div>

      {/* ===================== SLIDE 6 — Contact ===================== */}
      <div id="contact">
        <Slide6 />
      </div>
    </div>
  );
}
