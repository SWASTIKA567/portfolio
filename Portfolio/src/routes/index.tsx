import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";     
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
type Project = {
  name: string;
  desc: string;
  tech: string;
  highlight: string;
  color: string;
  screenshots: string[];
};

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
function PhoneFrame({
  project,
  scale = 1,
  paused = false,
}: {
  project: Project;
  scale?: number;
  paused?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = project.screenshots.length;

  useEffect(() => {
    if (total < 2 || paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % total), 2500);
    return () => clearInterval(t);
  }, [total, paused]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || total < 2) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 30) setCurrent((p) => (p + 1) % total);
    if (diff < -30) setCurrent((p) => (p - 1 + total) % total);
    setTouchStart(null);
  };

  // outer dimensions (base)
  const W = 200;
  const H = 410;

  return (
    <div
      style={{
        width: W * scale,
        height: H * scale,
        transition: "width 0.5s ease, height 0.5s ease",
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          transition: "transform 0.5s ease",
          background: "#0b0b0b",
          borderRadius: 36,
          padding: 7,
          boxShadow:
            "0 25px 50px -12px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
          position: "relative",
        }}
      >
        {/* screen */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 30,
            overflow: "hidden",
            background: project.color,
            position: "relative",
          }}
        >
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 70,
              height: 18,
              background: "#000",
              borderRadius: 12,
              zIndex: 3,
            }}
          />

          {total === 0 ? (
            // placeholder
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.95)",
                textAlign: "center",
                padding: 16,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0.5 }}>
                {project.name}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 10.5,
                  opacity: 0.7,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                {project.tech}
              </div>
            </div>
          ) : (
            <>
              {/* sliding strip */}
              <div
                style={{
                  display: "flex",
                  width: `${total * 100}%`,
                  height: "100%",
                  transform: `translateX(-${current * (100 / total)}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {project.screenshots.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      width: `${100 / total}%`,
                      height: "100%",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              {/* dots */}
              {total > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
                    zIndex: 3,
                  }}
                >
                  {project.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent(i);
                      }}
                      style={{
                        width: current === i ? 14 : 5,
                        height: 5,
                        borderRadius: 3,
                        background:
                          current === i
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function Slide3() {
  const [active, setActive] = useState<number | null>(null);
  const activeProject = active !== null ? PROJECTS[active] : null;

  return (
    <section className="slide" style={{ background: "#fafafa" }}>
      <div style={{ width: "100%", maxWidth: 1180 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p className="script" style={{ fontSize: 28, color: "#d4569a", margin: 0 }}>
            Projects
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 600, margin: "4px 0 0" }}>
            featured work
          </h2>
          {active !== null && (
            <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
              tap the phone again to close
            </p>
          )}
        </div>

        {/* Stage */}
        <div
          style={{
            position: "relative",
            minHeight: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Row of phones */}
          <div
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
              transition: "opacity 0.4s ease, transform 0.5s ease",
              opacity: active !== null ? 0 : 1,
              transform: active !== null ? "translateY(20px)" : "translateY(0)",
              pointerEvents: active !== null ? "none" : "auto",
            }}
          >
            {PROJECTS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <PhoneFrame project={p} paused />
              </button>
            ))}
          </div>

          {/* Active detail view */}
          {activeProject && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 60,
                flexWrap: "wrap",
                padding: "0 20px",
                animation: "fade-in 0.5s ease both",
              }}
            >
              {/* phone left */}
              <div
                onClick={() => setActive(null)}
                style={{ cursor: "pointer", animation: "slide-in-left 0.5s ease both" }}
              >
                <PhoneFrame project={activeProject} scale={1.15} />
              </div>

              {/* details right */}
              <div
                style={{
                  maxWidth: 380,
                  animation: "slide-in-right 0.5s ease 0.05s both",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#d4569a",
                    margin: 0,
                  }}
                >
                  Project {String(active! + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontSize: 42, fontWeight: 600, margin: "6px 0 12px" }}>
                  {activeProject.name}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#333",
                    margin: "0 0 18px",
                  }}
                >
                  {activeProject.desc}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "#ffeaf4",
                    color: "#b83573",
                    fontWeight: 500,
                    marginBottom: 14,
                  }}
                >
                  {activeProject.highlight}
                </div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>
                  <strong style={{ color: "#222" }}>Tech:</strong> {activeProject.tech}
                </div>

                <button
                  onClick={() => setActive(null)}
                  style={{
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: 999,
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  ← Back to all projects
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Slide6() {
  const [copied, setCopied] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", msg: "" });
  const [sent, setSent] = useState(false);
  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };
  const channels = [
    { key: "email", label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: "✉" },
    { key: "linkedin", label: "LinkedIn", value: CONTACT.linkedin, href: `https://${CONTACT.linkedin}`, icon: "in" },
    { key: "github", label: "GitHub", value: CONTACT.github, href: `https://${CONTACT.github}`, icon: "◆" },
    { key: "phone", label: "Phone", value: ABOUT.contact.phone, href: `tel:${ABOUT.contact.phone.replace(/\s/g, "")}`, icon: "☎" },
  ];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.msg.trim()) return;
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(form.msg);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  };
  return (
    <section
      className="slide"
      style={{
        background: "#0e0a10",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes blob-a { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,-40px) scale(1.15)} }
        @keyframes blob-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,50px) scale(1.1)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.8);opacity:0} }
        .c-blob { position:absolute; border-radius:999px; filter:blur(80px); opacity:.55; pointer-events:none; }
        .c-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 18px 20px;
          display:flex; align-items:center; gap:14px;
          cursor:pointer;
          transition: all .35s cubic-bezier(.2,.7,.2,1);
          backdrop-filter: blur(10px);
        }
        .c-card:hover {
          transform: translateY(-4px);
          border-color: #d4569a;
          background: rgba(212,86,154,0.10);
          box-shadow: 0 18px 50px -20px rgba(212,86,154,0.55);
        }
        .c-icon {
          width:44px; height:44px; border-radius:12px;
          background: linear-gradient(135deg,#d4569a,#e88cb8);
          display:flex; align-items:center; justify-content:center;
          font-weight:700; color:#fff; font-size:18px; flex-shrink:0;
          font-family: Georgia, serif;
        }
        .c-input {
          width:100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          color:#fff; padding: 12px 14px; border-radius: 12px;
          font-size: 14px; outline:none;
          transition: border-color .2s, background .2s;
          font-family: inherit;
        }
        .c-input:focus { border-color:#d4569a; background: rgba(212,86,154,0.08); }
        .c-input::placeholder { color: rgba(255,255,255,0.35); }
        .c-send {
          background: linear-gradient(135deg,#d4569a,#e88cb8);
          color:#fff; border:none; padding: 13px 28px;
          border-radius: 999px; font-weight:600; font-size:14px;
          cursor:pointer; letter-spacing:.5px;
          transition: transform .2s, box-shadow .2s;
        }
        .c-send:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(212,86,154,.7); }
        .c-avail {
          display:inline-flex; align-items:center; gap:10px;
          padding: 8px 16px; border-radius: 999px;
          background: rgba(80,200,120,0.12); border: 1px solid rgba(80,200,120,0.3);
          font-size:12px; color:#9ee5b0; letter-spacing:.5px;
          position: relative;
        }
        .c-dot { width:8px; height:8px; border-radius:999px; background:#4ade80; position:relative; }
        .c-dot::after {
          content:""; position:absolute; inset:-2px; border-radius:999px;
          background:#4ade80; animation: pulse-ring 1.6s ease-out infinite;
        }
        .c-toast {
          position:absolute; top:-34px; left:50%; transform:translateX(-50%);
          background:#fff; color:#0e0a10; font-size:11px; font-weight:600;
          padding: 6px 12px; border-radius:6px; white-space:nowrap;
          animation: fade-in .2s ease-out;
        }
      `}</style>
      <div className="c-blob" style={{ width: 480, height: 480, background: "#d4569a", top: -120, left: -120, animation: "blob-a 14s ease-in-out infinite" }} />
      <div className="c-blob" style={{ width: 420, height: 420, background: "#7c3aed", bottom: -100, right: -80, animation: "blob-b 16s ease-in-out infinite" }} />
      <div style={{ maxWidth: 1080, width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="c-avail">
            <span className="c-dot" /> Available for opportunities
          </span>
          <p className="script" style={{ fontSize: 32, color: "#e88cb8", margin: "18px 0 0" }}>
            Let's create something
          </p>
          <h2 style={{ fontSize: 56, fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.03em" }}>
            together.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* LEFT — channels */}
          <div style={{ display: "grid", gap: 12 }}>
            {channels.map((c) => (
              <div
                key={c.key}
                className="c-card"
                onMouseEnter={() => setHover(c.key)}
                onMouseLeave={() => setHover(null)}
                onClick={() => window.open(c.href, c.key === "email" || c.key === "phone" ? "_self" : "_blank")}
                style={{ position: "relative" }}
              >
                {copied === c.key && <span className="c-toast">Copied!</span>}
                <div className="c-icon">{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: 14, color: "#fff", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.value}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); copy(c.key, c.value); }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: hover === c.key ? "#fff" : "rgba(255,255,255,0.5)",
                    padding: "6px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  copy
                </button>
              </div>
            ))}
          </div>
          {/* RIGHT — form */}
          <form
            onSubmit={submit}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 22,
              padding: 26,
              display: "grid",
              gap: 14,
              backdropFilter: "blur(10px)",
            }}
          >
            <div>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 2, textTransform: "uppercase" }}>
                Your name
              </label>
              <input
                className="c-input"
                type="text"
                maxLength={80}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                style={{ marginTop: 6 }}
              />
            </div>
            <div>
       <label style={{ fontSize: 11, color: "#a87a92", letterSpacing: 2, textTransform: "uppercase" }}>
                Message
              </label>
              <textarea
                className="c-input"
                maxLength={600}
                rows={4}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                placeholder="Tell me about your project..."
                style={{ marginTop: 6, resize: "none", fontFamily: "inherit" }}
              />
               <div style={{ textAlign: "right", fontSize: 10, color: "#b08a9e", marginTop: 4 }}>
                {form.msg.length}/600
              </div>
            </div>
            <button type="submit" className="c-send">
              {sent ? "Opening mail ✓" : "Send message →"}
            </button>
          </form>
        </div>
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
             color: "#a87a92",
            fontSize: 13,
            maxWidth: 560,
            margin: "32px auto 0",
          }}
        >
          "{CONTACT.closing}"
        </p>
        <p style={{ marginTop: 24, textAlign: "center", fontSize: 11, color: "#c9a8b8" }}>
          © 2026 Swastika Singh · Built with care
        </p>
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
       <Slide6 />
    </div>
  );
}
