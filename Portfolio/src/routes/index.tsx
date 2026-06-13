import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import vinyl from "@/assets/pink-vinyl.png";

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

// ── STEP: import your screenshots like this ────────────────────────────────
// import postlyScreen1 from "@/assets/postly/screen1.png";
// import postlyScreen2 from "@/assets/postly/screen2.png";
// import graphScreen1  from "@/assets/graphguard/screen1.png";
// (uncomment and add your real paths when you have the images)
// ───────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "Postly",
    tagline: "Poster printing & ordering",
    desc: "Poster e-commerce app with real-time cart, wishlist, dynamic pricing, and Firebase backend.",
    tech: ["Flutter", "Firebase", "GetX"],
    highlight: "Built during internship",
    color: "#1a0a15",
    accent: "#e91e8c",
    screenshots: [
      // postlyScreen1,
      // postlyScreen2,
    ] as string[],
  },
  {
    name: "GraphGuard",
    tagline: "GitHub vulnerability scanner",
    desc: "Scans GitHub repos for security vulnerabilities using TigerGraph with FCM push notifications.",
    tech: ["Flutter", "TigerGraph", "GetX"],
    highlight: "Top 5 — Devcation Delhi 2026",
    color: "#060d1a",
    accent: "#4f7cff",
    screenshots: [] as string[],
  },
  {
    name: "GameZone",
    tagline: "Gaming companion app",
    desc: "A fun gaming companion with leaderboards, real-time scores, and social features.",
    tech: ["Flutter", "Firebase"],
    highlight: "Coming soon",
    color: "#001a15",
    accent: "#00e5a0",
    screenshots: [] as string[],
  },
];

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

// ── PhoneCarousel ──────────────────────────────────────────────────────────
function PhoneCarousel({
  screenshots,
  fallbackColor,
  fallbackAccent,
  fallbackName,
  fallbackTech,
}: {
  screenshots: string[];
  fallbackColor: string;
  fallbackAccent: string;
  fallbackName: string;
  fallbackTech: string[];
}) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = screenshots.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % total), 2500);
    return () => clearInterval(timer);
  }, [total]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || total < 2) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 30) setCurrent((p) => (p + 1) % total);
    if (diff < -30) setCurrent((p) => (p - 1 + total) % total);
    setTouchStart(null);
  };

  if (total === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: fallbackColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", letterSpacing: "0.12em", marginBottom: "4px" }}>
          swipe ←→
        </div>
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: fallbackAccent + "22",
            border: `1.5px solid ${fallbackAccent}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
          }}
        >
          📱
        </div>
        <span style={{ color: "white", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em" }}>
          {fallbackName}
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center" }}>
          {fallbackTech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "9px",
                background: fallbackAccent + "33",
                color: fallbackAccent,
                borderRadius: "20px",
                padding: "2px 8px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: 0,
          right: 0,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>swipe ←→</span>
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: `translateX(-${current * 100}%)`,
          width: `${total * 100}%`,
        }}
      >
        {screenshots.map((src, idx) => (
          <div key={idx} style={{ width: `${100 / total}%`, flexShrink: 0, height: "100%" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
      {total > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            zIndex: 5,
          }}
        >
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: current === idx ? "16px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background: current === idx ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
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

// ── PhoneMockup ────────────────────────────────────────────────────────────
function PhoneMockup({
  project,
  scale = 1,
}: {
  project: (typeof PROJECTS)[number];
  scale?: number;
}) {
  const baseW = 200;
  return (
    <div
      style={{
        position: "relative",
        width: `${baseW * scale}px`,
        aspectRatio: "9/19.5",
        background: "linear-gradient(145deg, #f0ede8, #d0ccc6)",
        borderRadius: `${44 * scale}px`,
        padding: `${7 * scale}px`,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.12), 0 ${30 * scale}px ${60 * scale}px rgba(0,0,0,0.3)`,
        flexShrink: 0,
      }}
    >
      <div style={{ position: "absolute", left: `${-4 * scale}px`, top: "18%", width: `${4 * scale}px`, height: "7%", background: "#bbb", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", left: `${-4 * scale}px`, top: "27%", width: `${4 * scale}px`, height: "10%", background: "#bbb", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", left: `${-4 * scale}px`, top: "39%", width: `${4 * scale}px`, height: "10%", background: "#bbb", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", right: `${-4 * scale}px`, top: "26%", width: `${4 * scale}px`, height: "14%", background: "#bbb", borderRadius: "0 3px 3px 0" }} />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: `${38 * scale}px`,
          overflow: "hidden",
          background: project.color,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `${8 * scale}px ${14 * scale}px ${3 * scale}px`,
            fontSize: `${8 * scale}px`,
            color: "rgba(255,255,255,0.85)",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <span style={{ fontWeight: 600 }}>9:41</span>
          <div
            style={{
              position: "absolute",
              top: `${6 * scale}px`,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${48 * scale}px`,
              height: `${9 * scale}px`,
              background: "#000",
              borderRadius: "20px",
            }}
          />
          <span style={{ fontSize: `${7 * scale}px` }}>▲▲▲</span>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <PhoneCarousel
            screenshots={project.screenshots}
            fallbackColor={project.color}
            fallbackAccent={project.accent}
            fallbackName={project.name}
            fallbackTech={project.tech}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: `${6 * scale}px 0`, flexShrink: 0 }}>
          <div style={{ width: "35%", height: `${3 * scale}px`, background: "rgba(255,255,255,0.4)", borderRadius: "2px" }} />
        </div>
      </div>
    </div>
  );
}

// ── Slide3 ─────────────────────────────────────────────────────────────────
function Slide3() {
  const [active, setActive] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "ringing" | "open">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePhoneClick = (i: number) => {
    if (active === i && phase === "open") {
      setPhase("idle");
      setActive(null);
      return;
    }
    setActive(i);
    setPhase("ringing");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPhase("open"), 680);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const isOpen = phase === "open";
  const isRinging = phase === "ringing";
  const proj = active !== null ? PROJECTS[active] : null;

  return (
    <section
      className="slide pink-bg"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Blurred backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: isOpen ? "blur(18px) brightness(0.82)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(18px) brightness(0.82)" : "none",
          transition: "backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Close tap zone */}
      {isOpen && (
        <div
          style={{ position: "absolute", inset: 0, zIndex: 6, cursor: "pointer" }}
          onClick={() => { setPhase("idle"); setActive(null); }}
        />
      )}

      {/* Header + phones grid */}
      <div
        className="w-full max-w-[1100px]"
        style={{
          position: "relative",
          zIndex: isOpen ? 0 : 10,
          transition: "opacity 0.35s",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
      >
        <div className="flex items-end justify-between mb-12">
          <h2 className="script text-5xl md:text-7xl leading-none">Projects</h2>
          <p className="text-sm md:text-base">tap a phone to explore</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "clamp(20px, 5vw, 60px)",
            flexWrap: "wrap",
          }}
        >
          {PROJECTS.map((p, i) => {
            const isMe = active === i;
            const isOther = active !== null && active !== i;

            let transform = "scale(1) translateY(0px)";
            if (isMe && isRinging) transform = "scale(1.04) translateY(-8px)";
            else if (isMe && isOpen) transform = "scale(1.12) translateY(-20px)";
            else if (isOther) transform = "scale(0.88) translateY(16px)";

            return (
              <div
                key={p.name}
                onClick={() => handlePhoneClick(i)}
                style={{
                  position: "relative",
                  zIndex: isMe ? 15 : 1,
                  transform,
                  transition: isMe && isRinging
                    ? "transform 0.12s ease, filter 0.3s, opacity 0.3s"
                    : "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease, opacity 0.4s ease",
                  filter: isOther
                    ? "brightness(0.55)"
                    : isMe && isOpen
                    ? `drop-shadow(0 40px 60px ${p.accent}66)`
                    : "drop-shadow(0 18px 32px rgba(0,0,0,0.22))",
                  opacity: isOther ? 0.45 : 1,
                  cursor: "pointer",
                  animation: isMe && isRinging ? "dial-ring 0.12s ease-in-out 3 alternate" : "none",
                }}
              >
                <PhoneMockup project={p} scale={0.95} />
                <div
                  style={{
                    marginTop: "16px",
                    textAlign: "center",
                    opacity: isOther ? 0.3 : 1,
                    transition: "opacity 0.35s",
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: "13px", margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: "11px", color: "#777", margin: "2px 0 0" }}>{p.highlight}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active phone floating above peek box */}
      {proj && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: isOpen ? "translate(-50%, 0)" : "translate(-50%, -80px)",
            bottom: "clamp(220px, 42vh, 380px)",
            zIndex: 22,
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.55s cubic-bezier(0.34,1.3,0.64,1), opacity 0.45s ease",
            pointerEvents: "none",
          }}
        >
          <PhoneMockup project={proj} scale={1.05} />
        </div>
      )}

      {/* Peek detail box */}
      {proj && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: isOpen ? "translate(-50%, 0)" : "translate(-50%, 120px)",
            bottom: "clamp(20px, 5vh, 60px)",
            zIndex: 20,
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.55s cubic-bezier(0.34,1.3,0.64,1), opacity 0.4s ease",
            pointerEvents: isOpen ? "auto" : "none",
            width: "clamp(300px, 80vw, 560px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              background: "rgba(255, 245, 250, 0.82)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              borderRadius: "28px",
              border: "1px solid rgba(255,200,220,0.5)",
              padding: "24px 28px",
              boxShadow: "0 32px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.6) inset",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
              <div>
                <h3 style={{ fontFamily: "Allura, cursive", fontSize: "clamp(32px,5vw,48px)", lineHeight: 1, margin: 0 }}>
                  {proj.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0", fontStyle: "italic" }}>
                  {proj.tagline}
                </p>
              </div>
              <button
                onClick={() => { setPhase("idle"); setActive(null); }}
                style={{
                  background: "rgba(0,0,0,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#444",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#333", margin: "0 0 16px" }}>
              {proj.desc}
            </p>
            <div style={{ height: "1px", background: "rgba(200,150,180,0.3)", margin: "0 0 16px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      background: proj.accent + "18",
                      color: proj.accent,
                      borderRadius: "20px",
                      padding: "4px 10px",
                      border: `1px solid ${proj.accent}33`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  background: "#fff0f6",
                  border: "1px solid #f9c8e0",
                  color: "#c45080",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontWeight: 500,
                }}
              >
                ✦ {proj.highlight}
              </span>
            </div>
          </div>
          {proj.screenshots.length > 0 && (
            <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(180,100,140,0.7)", marginTop: "10px", letterSpacing: "0.06em" }}>
              swipe the phone screen to see more ↑
            </p>
          )}
        </div>
      )}
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
        @keyframes dial-ring {
          0%   { transform: scale(1.04) translateY(-8px) rotate(-2.5deg); }
          100% { transform: scale(1.04) translateY(-8px) rotate(2.5deg); }
        }
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