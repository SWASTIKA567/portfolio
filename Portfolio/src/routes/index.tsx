import { createFileRoute } from "@tanstack/react-router";
import vinyl from "@/assets/pink-vinyl.png";
import { ABOUT, SKILLS, PROCESS, ACHIEVEMENTS } from "@/data/portfolio";
import { Slide2 } from "@/components/Slide2";
import { Slide3 } from "@/components/Slide3";
import { Slide6 } from "@/components/Slide6";
import "./fonts.css";


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

      {/* ===================== SLIDE 4 — Skills ===================== */}
      <section className="slide pink-bg">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-end justify-between mb-8">
            <h2 className="script text-5xl md:text-7xl leading-none">Skills</h2>
            <p className="text-sm md:text-base">tech stack</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-pink-100">
                <p className="h-section text-pink-700">{cat}</p>
                <ul className="mt-3 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 body-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SLIDE 5 — Process & Achievements ===================== */}
      <section className="slide pink-bg">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-end justify-between mb-8">
            <h2 className="script text-5xl md:text-7xl leading-none">Process</h2>
            <p className="text-sm md:text-base">how I build</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {PROCESS.map((step, i) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span className="px-3 py-2 md:px-5 md:py-3 bg-black text-white rounded-full text-xs md:text-sm">{step}</span>
                {i < PROCESS.length - 1 && <span className="text-pink-500 text-lg">→</span>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className="bg-white/70 rounded-2xl p-5 text-center border border-pink-100">
                <p className="script text-4xl md:text-5xl text-pink-700 leading-none">{a.value}</p>
                <p className="text-xs md:text-sm mt-2">{a.label}</p>
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
