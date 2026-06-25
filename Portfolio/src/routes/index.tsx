import { createFileRoute } from "@tanstack/react-router";
import vinyl from "@/assets/pink-vinyl.png";
import { ABOUT, PROCESS, ACHIEVEMENTS } from "@/data/portfolio";
import { Slide3 } from "@/components/Slide3";
import { Slide6 } from "@/components/Slide6";
import { Slide2 } from "@/components/Slide2";
import { Slide4 } from "@/components/Slide4";

import "./fonts.css";
const portrait = "/screenshots/postly-1.png"


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swastika — Portfolio" },
      { name: "description", content: "Portfolio of Swastika Singh, App Developer." },
       { property: "og:description", content: "Portfolio of Swastika Singh, App Developer." },
       { property: "og:title", content: "Swastika — Portfolio" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Allura&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div
      className="w-full"
      style={{ fontFamily: "Inter, sans-serif", background: "#fff5fa" }}
    >
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes vinyl-spin { to { transform: rotate(360deg); } }
        .vinyl-spin { animation: vinyl-spin 24s linear infinite; }
        .script { font-family: 'Allura', cursive; }
        .pink-bg { background: radial-gradient(circle at 50% 40%, #ffd9ec 0%, #ffeaf4 55%, #fff5fa 100%); }
        .slide { min-height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; padding: 48px 20px; }
        .h-section { font-weight: 600; font-size: 14px; letter-spacing: 0.04em; margin-bottom: 6px; }
        .body-text { font-size: 13px; line-height: 1.55; color: #222; }
        @media (min-width: 768px) {
          .h-section { font-size: 16px; }
          .body-text { font-size: 15px; }
        }
      `}</style>

      {/* ===================== SLIDE 1 — Hero ===================== */}
      <section className="slide pink-bg relative overflow-hidden">
        <div className="mt-[-110px]">
          <div className="relative w-[min(75vw,880px)] aspect-square">
            <img
              src={vinyl}
              alt="Pink vinyl record"
              className="vinyl-spin absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
            {[
              { n: "02", top: "21%", left: "44%" },
              { n: "01", top: "32%", left: "9%" },
              { n: "04", top: "78%", left: "16%" },
              { n: "03", top: "85%", left: "47%" },
              { n: "05", top: "72%", left: "70%" },
            ].map((t) => (
              <span key={t.n} className="absolute text-black" style={{ fontSize: "clamp(10px,1.1vw,15px)", top: t.top, left: t.left }}>
                {t.n}
              </span>
            ))}
            <span className="absolute text-black" style={{ fontSize: "clamp(11px,1.2vw,16px)", top: "52%", left: "75%" }}>2026</span>
            <span className="absolute text-black z-10" style={{ fontSize: "clamp(32px,4.4vw,70px)", top: "62%", left: "62%", whiteSpace: "nowrap" }}>
              App Developer
            </span>
            <h2 className="absolute text-black leading-none z-10 script" style={{ fontSize: "clamp(25px,5vw,50px)", top: "37%", left: "35%", transform: "translateX(-50%) rotate(-6deg)", whiteSpace: "nowrap", fontFamily: "jungle-george.regular" }}>
              This is
            </h2>
            <h2 className="absolute text-black leading-none z-10 script" style={{ fontSize: "clamp(120px,26vw,270px)", top: "27%", left: "50%", transform: "translateX(-50%) rotate(-6deg)", whiteSpace: "nowrap", fontFamily: "'QwitcherGrypen-Bold', cursive" }}>
              Swastika
            </h2>
          </div>
        </div>
      </section>

      
 {/* ===================== SLIDE 2 — About Me ===================== */}
<Slide2 />
      {/* ===================== SLIDE 3 — Projects ===================== */}
      <Slide3 />

      {/* ===================== SLIDE 4 — Experience & Skills ===================== */}
      <Slide4 />

      {/* ===================== SLIDE 5 — Process ===================== */}
<section className="slide pink-bg relative overflow-hidden">
  {/* Background Vinyl with low opacity */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
    <img
      src={vinyl}
      alt=""
      aria-hidden="true"
      className="vinyl-spin w-[120vh] h-[120vh] opacity-[0.2] select-none"
    />
  </div>

  <div className="w-full max-w-[1100px] relative z-10">
    <div className="flex items-end justify-between mb-4">
      <h2 className="script text-5xl md:text-7xl leading-none">Process</h2>
      <p className="text-sm md:text-base">how I build</p>
    </div>
    <p className="text-sm md:text-base text-neutral-600 max-w-2xl mb-8 leading-relaxed">
      Every project I build follows the same five-step process — research-driven
      ideas, intentional design, clean development, thorough testing, and
      confident shipping. It&apos;s how I keep quality consistent from start to
      finish.
    </p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      {PROCESS.map((step, i) => (
        <div
          key={step.name}
          className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-pink-100/80 rounded-2xl p-6 h-[220px] flex flex-col justify-between transition-all duration-500 hover:bg-white/95 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-900/5 cursor-pointer"
        >
          {/* Step number top-right inside card */}
          <span className="absolute top-4 right-4 text-3xl font-extrabold text-pink-100 group-hover:text-pink-400 transition-colors duration-500 select-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          
          <div className="flex flex-col h-full justify-end mt-8">
            <h3 className="font-semibold text-lg text-neutral-800 transition-transform duration-500 group-hover:-translate-y-2 group-hover:text-pink-600">
              {step.name}
            </h3>
            <p className="text-xs text-neutral-600 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[120px] overflow-hidden transition-all duration-500 ease-in-out mt-1 leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* ===================== SLIDE 6 — Contact ===================== */}
      <Slide6 />
    </div>
  );
}
