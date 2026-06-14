import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";        // ← STEP 1: add useState, useEffect
import type { ReactNode } from "react";
import vinyl from "@/assets/pink-vinyl.png";

// ── STEP 2: import your screenshots like this ──────────────────────────────
// import postlyScreen1 from "@/assets/postly/screen1.png";
// import postlyScreen2 from "@/assets/postly/screen2.png";
// import graphScreen1  from "@/assets/graphguard/screen1.png";
// import graphScreen2  from "@/assets/graphguard/screen2.png";
// (uncomment and add your real paths when you have the images)
// ───────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swastika — Portfolio" },
      { name: "description", content: "Portfolio of Swastika Singh, App Developer." },
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

// ── DATA ───────────────────────────────────────────────────────────────────

const ABOUT = {
  hello: "Hello",
  intro:
    "I am Swastika Singh, a third year student at Dr. APJ Abdul Kalam Technical University. Passionate about creating intuitive and impactful mobile applications that solve real-world problems.",
  experience: [
    "Organized a Technical Event | College Fest | 2025",
    "App Developer Intern | Fintech Company | 2025 - Now",
  ],
  education: [
    "B.Tech in Information Technology",
    "Dr. APJ Abdul Kalam Technical University | 2024 - Now",
  ],
  contact: {
    email: "swastika.singh@example.com",
    phone: "+91 98765 43210",
  },
  languages: ["Hindi — mother tongue", "English — fluent"],
  tools: ["Flutter", "Firebase", "Figma", "VS Code"],
};

// ── STEP 3: add screenshots array to each project ─────────────────────────
const PROJECTS = [
  {
    name: "Postly",
    desc: "Poster e-commerce app with real-time cart and Firebase backend.",
    tech: "Flutter · Firebase · GetX",
    highlight: "Built during internship",
    color: "#111",
    screenshots: [
      // postlyScreen1,   ← uncomment when you have images
      // postlyScreen2,
    ] as string[],
  },
  {
    name: "GraphGuard",
    desc: "GitHub repo vulnerability scanner with FCM push notifications.",
    tech: "Flutter · TigerGraph · GetX",
    highlight: "Top 5 — Devcation Delhi 2026",
    color: "#1a1a2e",
    screenshots: [
      // graphScreen1,
      // graphScreen2,
    ] as string[],
  },
  {
    name: "GameZone",
    desc: "A fun gaming companion app.",
    tech: "Flutter · Firebase",
    highlight: "Coming soon",
    color: "#00796B",
    screenshots: [] as string[],
  },
];
// ───────────────────────────────────────────────────────────────────────────

const SKILLS = {
  Languages: ["Dart", "Java", "Kotlin", "JavaScript"],
  Frameworks: ["Flutter", "React Native", "Android SDK"],
  Backend: ["Firebase", "Node.js", "REST APIs"],
  Tools: ["Git", "GitHub", "Figma", "VS Code", "Android Studio"],
};

const PROCESS = ["Idea", "UI Design", "Development", "Testing", "Deployment"];

const ACHIEVEMENTS = [
  { label: "Projects Completed", value: "12+" },
  { label: "Hackathons", value: "5" },
  { label: "Certifications", value: "8" },
  { label: "Open-Source PRs", value: "20+" },
  { label: "Internships", value: "2" },
];

const CONTACT = {
  email: "swastika.singh@example.com",
  linkedin: "linkedin.com/in/swastika-singh",
  github: "github.com/swastika-singh",
  closing:
    "Passionate about creating intuitive and impactful mobile applications that solve real-world problems.",
};

// ── STEP 4: PhoneCarousel component (swipeable + auto-slide) ──────────────
function PhoneCarousel({
  screenshots,
  fallbackColor,
  fallbackName,
  fallbackTech,
}: {
  screenshots: string[];
  fallbackColor: string;
  fallbackName: string;
  fallbackTech: string;
}) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const total = screenshots.length;

  // auto-slide every 2.5 s (only if there are images)
  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 2500);
    return () => clearInterval(timer);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || total < 2) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 30) setCurrent((prev) => (prev + 1) % total);
    if (diff < -30) setCurrent((prev) => (prev - 1 + total) % total);
    setTouchStart(null);
  };

  // ── no screenshots yet → show color placeholder ──
  if (total === 0) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 pt-6"
        style={{ background: fallbackColor }}
      >
        <span style={{ color: "white", fontSize: "clamp(11px,1.2vw,15px)", fontWeight: 700, letterSpacing: "0.05em" }}>{fallbackName}</span>
        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(8px,0.9vw,11px)", textAlign: "center", padding: "0 12px" }}>{fallbackTech}</span>
      </div>
    );
  }

  // ── has screenshots → sliding carousel ──
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* sliding strip */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${total * 100}%`,
        }}
      >
        {screenshots.map((src, idx) => (
          <div
            key={idx}
            style={{ width: `${100 / total}%`, flexShrink: 0, height: "100%" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: current === idx ? "14px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background:
                  current === idx
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.35)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.25s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Slide3() {
  // ✦ CHANGED — tracks which phone is active (clicked/tapped)
  const [active, setActive] = useState<number | null>(null);
 
  return (
    <section className="slide pink-bg">
      <div className="w-full max-w-[1100px]">
        <div className="flex items-end justify-between mb-12">
          <h2 className="script text-5xl md:text-7xl leading-none">Projects</h2>
          <p className="text-sm md:text-base">featured work</p>
        </div>
 
        {/* ✦ CHANGED — items-center so all phones sit at same baseline (no stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {PROJECTS.map((p, i) => {
            const isActive = active === i; // ✦ CHANGED
            return (
              <div
                key={p.name}
                className="flex flex-col items-center cursor-pointer"
                // ✦ CHANGED — click toggles active phone
                onClick={() => setActive(isActive ? null : i)}
                style={{
                  // ✦ CHANGED — active phone scales up and lifts; others stay flat
                  transform: isActive ? "scale(1.08) translateY(-12px)" : "scale(1)",
                  transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  zIndex: isActive ? 10 : 1,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    // ✦ CHANGED — deeper shadow when active
                    filter: isActive
                      ? "drop-shadow(0 40px 60px rgba(0,0,0,0.35))"
                      : "drop-shadow(0 20px 32px rgba(0,0,0,0.18))",
                    transition: "filter 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "clamp(160px, 18vw, 240px)",
                      aspectRatio: "9/19.5",
                      background: "linear-gradient(145deg, #f0ede8, #d8d4ce)",
                      borderRadius: "clamp(32px, 4vw, 48px)",
                      padding: "clamp(5px, 0.7vw, 8px)",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div style={{ position: "absolute", left: "-4px", top: "18%", width: "4px", height: "7%", background: "#bbb", borderRadius: "3px 0 0 3px" }} />
                    <div style={{ position: "absolute", left: "-4px", top: "27%", width: "4px", height: "10%", background: "#bbb", borderRadius: "3px 0 0 3px" }} />
                    <div style={{ position: "absolute", left: "-4px", top: "39%", width: "4px", height: "10%", background: "#bbb", borderRadius: "3px 0 0 3px" }} />
                    <div style={{ position: "absolute", right: "-4px", top: "26%", width: "4px", height: "14%", background: "#bbb", borderRadius: "0 3px 3px 0" }} />
 
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "clamp(26px, 3.5vw, 42px)",
                        background: p.color,
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "clamp(6px,0.8vw,10px) clamp(10px,1.2vw,16px) 3px", fontSize: "clamp(7px,0.8vw,9px)", color: "rgba(255,255,255,0.85)", flexShrink: 0, position: "relative" }}>
                        <span style={{ fontWeight: 600 }}>9:41</span>
                        <div style={{ position: "absolute", top: "clamp(4px,0.5vw,7px)", left: "50%", transform: "translateX(-50%)", width: "clamp(36px,4vw,52px)", height: "clamp(7px,0.9vw,10px)", background: "#000", borderRadius: "20px" }} />
                        <div style={{ display: "flex", gap: "2px", alignItems: "center", fontSize: "clamp(6px,0.7vw,8px)" }}>
                          <span>▲▲▲</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <PhoneCarousel
                          screenshots={p.screenshots}
                          fallbackColor={p.color}
                          fallbackName={p.name}
                          fallbackTech={p.tech}
                        />
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", padding: "clamp(4px,0.5vw,8px) 0", flexShrink: 0 }}>
                        <div style={{ width: "35%", height: "3px", background: "rgba(255,255,255,0.45)", borderRadius: "2px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


// ── PAGE ──────────────────────────────────────────────────────────────────
function Index() {
  return (
    <div
      className="w-full"
      style={{ fontFamily: "Inter, sans-serif", background: "#fff5fa" }}
    >
      <style>{`
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

      {/* ===================== SLIDE 1 ===================== */}
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
            <span className="absolute text-black" style={{ fontSize: "clamp(11px,1.2vw,16px)", top: "52%", left: "78%" }}>2026</span>
            <span className="absolute text-black z-10" style={{ fontSize: "clamp(22px,3.4vw,60px)", top: "62%", left: "62%", whiteSpace: "nowrap" }}>
              App Developer
            </span>
            <h2 className="absolute text-black leading-none z-10 script" style={{ fontSize: "clamp(110px,16vw,260px)", top: "22%", left: "50%", transform: "translateX(-50%) rotate(-6deg)", whiteSpace: "nowrap" }}>
              Swastika
            </h2>
            <h1 className="absolute text-black leading-none z-10 script" style={{ fontSize: "min(19vw, 230px)", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-8deg)", whiteSpace: "nowrap" }}>
              Portfolio
            </h1>
          </div>
        </div>
      </section>

      {/* ===================== SLIDE 2 — About Me ===================== */}
      <section className="slide pink-bg relative overflow-hidden">
        <img src={vinyl} alt="" aria-hidden className="vinyl-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(75vw,880px)] aspect-square object-contain opacity-95 pointer-events-none select-none" draggable={false} />
        <div className="relative z-10 w-full max-w-[1100px]">
          <div className="flex justify-between mb-10 md:mb-16">
            <p className="text-sm md:text-lg font-medium leading-tight">welcome to<br />my portfolio</p>
            <p className="text-sm md:text-lg font-medium">about me</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
            <div>
              <div className="w-[170px] md:w-[200px] aspect-[3/4] bg-white shadow-lg rotate-[-4deg]" style={{ padding: "10px 10px 38px" }}>
                <div className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">your photo</div>
              </div>
              <h3 className="script text-6xl md:text-7xl mt-6 leading-none">{ABOUT.hello}</h3>
              <p className="body-text mt-3 max-w-[240px]">{ABOUT.intro}</p>
            </div>
            <div className="space-y-5 md:mt-40">
              <div>
                <p className="h-section">Experience</p>
                {ABOUT.experience.map((e) => <p key={e} className="body-text">{e}</p>)}
              </div>
              <div>
                <p className="h-section">Education</p>
                {ABOUT.education.map((e) => <p key={e} className="body-text">{e}</p>)}
              </div>
            </div>
            <div className="space-y-5 md:mt-40">
              <div>
                <p className="h-section">Language</p>
                {ABOUT.languages.map((l) => <p key={l} className="body-text">{l}</p>)}
              </div>
              <div>
                <p className="h-section">Contact</p>
                <p className="body-text">{ABOUT.contact.email}</p>
                <p className="body-text">Telephone {ABOUT.contact.phone}</p>
              </div>
              <div>
                <p className="h-section">Software skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ABOUT.tools.map((t) => (
                    <span key={t} className="w-8 h-8 grid place-items-center bg-black text-white text-[10px] font-semibold rounded">
                      {t.slice(0, 2)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section className="slide pink-bg">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-end justify-between mb-8">
            <h2 className="script text-5xl md:text-7xl leading-none">Let's Talk</h2>
            <p className="text-sm md:text-base">contact</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div>
                <p className="h-section">Email</p>
                <p className="body-text">{CONTACT.email}</p>
              </div>
              <div>
                <p className="h-section">LinkedIn</p>
                <p className="body-text">{CONTACT.linkedin}</p>
              </div>
              <div>
                <p className="h-section">GitHub</p>
                <p className="body-text">{CONTACT.github}</p>
              </div>
              <p className="script text-3xl md:text-4xl text-pink-700 mt-6 leading-snug">"{CONTACT.closing}"</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-2xl shadow-md flex items-center justify-center border border-pink-100">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-[repeating-conic-gradient(#000_0_25%,#fff_0_50%)] [background-size:12px_12px] rounded-md opacity-80" />
              </div>
              <p className="text-xs mt-3 text-gray-600">scan to visit portfolio</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-12">© 2026 Swastika Singh · Built with care</p>
        </div>
      </section>
    </div>
  );
}
