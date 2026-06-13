import { createFileRoute } from "@tanstack/react-router";
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

/* ============================================================
   EASY-EDIT CONTENT  — change anything below to update slides
   ============================================================ */
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

const PROJECTS = [
  {
    name: "Expense Tracker App",
    desc: "Real-time sync and budget analytics to help users manage daily spends.",
    tech: "Flutter · Firebase · Provider",
    highlight: "10k+ downloads on Play Store",
  },
  {
    name: "StudyMate",
    desc: "Collaborative study planner with shared notes and Pomodoro timer.",
    tech: "React Native · Node.js · MongoDB",
    highlight: "Winner — College Hackathon 2025",
  },
  {
    name: "HealthPulse",
    desc: "Wellness tracker with heart-rate logging and smart reminders.",
    tech: "Kotlin · Jetpack Compose · REST API",
    highlight: "Featured in University showcase",
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

/* ============================================================ */

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
        <div className="relative w-[min(95vw,1080px)] aspect-square">
          <img
            src={vinyl}
            alt="Pink vinyl record"
            className="vinyl-spin absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />

          {/* Track numbers */}
          {[
            { n: "02", top: "21%", left: "44%" },
            { n: "01", top: "32%", left: "9%" },
            { n: "04", top: "78%", left: "16%" },
            { n: "03", top: "85%", left: "47%" },
            { n: "05", top: "72%", left: "70%" },
          ].map((t) => (
            <span
              key={t.n}
              className="absolute text-black"
              style={{ fontSize: "clamp(10px,1.1vw,15px)", top: t.top, left: t.left }}
            >
              {t.n}
            </span>
          ))}

          <span
            className="absolute text-black"
            style={{ fontSize: "clamp(11px,1.2vw,16px)", top: "52%", left: "78%" }}
          >
            2026
          </span>

          <span
            className="absolute text-black z-10"
            style={{
              fontSize: "clamp(22px,3.4vw,60px)",
              top: "62%",
              left: "62%",
              whiteSpace: "nowrap",
            }}
          >
            App Developer
          </span>

          {/* Swastika — pulled down a bit */}
          <h2
            className="absolute text-black leading-none z-10 script"
            style={{
              fontSize: "clamp(110px,16vw,260px)",
              top: "22%",
              left: "50%",
              transform: "translateX(-50%) rotate(-6deg)",
              whiteSpace: "nowrap",
            }}
          >
            Swastika
          </h2>

          {/* Portfolio — slightly bigger, centered */}
          <h1
            className="absolute text-black leading-none z-10 script"
            style={{
              fontSize: "min(19vw, 230px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-8deg)",
              whiteSpace: "nowrap",
            }}
          >
            Portfolio
          </h1>
        </div>
      </section>

      {/* ===================== SLIDE 2 — About Me (vinyl bg) ===================== */}
      <section className="slide pink-bg relative overflow-hidden">
        {/* Spinning vinyl background */}
        <img
          src={vinyl}
          alt=""
          aria-hidden
          className="vinyl-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(110vw,1100px)] aspect-square object-contain opacity-95 pointer-events-none select-none"
          draggable={false}
        />

        <div className="relative z-10 w-full max-w-[1100px]">
          {/* Top labels */}
          <div className="flex justify-between mb-10 md:mb-16">
            <p className="text-sm md:text-lg font-medium leading-tight">
              welcome to<br />my portfolio
            </p>
            <p className="text-sm md:text-lg font-medium">about me</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
            {/* LEFT — polaroid + Hello + intro */}
            <div>
              <div
                className="w-[170px] md:w-[200px] aspect-[3/4] bg-white shadow-lg rotate-[-4deg]"
                style={{ padding: "10px 10px 38px" }}
              >
                <div className="w-full h-full border border-dashed border-gray-300 flex items-center justify-center text-[10px] text-gray-400">
                  your photo
                </div>
              </div>
              <h3 className="script text-6xl md:text-7xl mt-6 leading-none">
                {ABOUT.hello}
              </h3>
              <p className="body-text mt-3 max-w-[240px]">{ABOUT.intro}</p>
            </div>

            {/* MIDDLE — Experience / Education (sits over vinyl label) */}
            <div className="space-y-5 md:mt-40">
              <div>
                <p className="h-section">Experience</p>
                {ABOUT.experience.map((e) => (
                  <p key={e} className="body-text">{e}</p>
                ))}
              </div>
              <div>
                <p className="h-section">Education</p>
                {ABOUT.education.map((e) => (
                  <p key={e} className="body-text">{e}</p>
                ))}
              </div>
            </div>

            {/* RIGHT — Language / Contact / Software skills */}
            <div className="space-y-5 md:mt-40">
              <div>
                <p className="h-section">Language</p>
                {ABOUT.languages.map((l) => (
                  <p key={l} className="body-text">{l}</p>
                ))}
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
                    <span
                      key={t}
                      className="w-8 h-8 grid place-items-center bg-black text-white text-[10px] font-semibold rounded"
                    >
                      {t.slice(0, 2)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SLIDE 3 — Featured Projects ===================== */}
      <section className="slide pink-bg">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-end justify-between mb-8">
            <h2 className="script text-5xl md:text-7xl leading-none">Projects</h2>
            <p className="text-sm md:text-base">featured work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-pink-100"
              >
                <div className="aspect-[4/5] bg-pink-50 rounded-xl mb-4 flex items-center justify-center text-xs text-gray-400 border border-dashed border-pink-200">
                  app mockup
                </div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="body-text mt-1">{p.desc}</p>
                <p className="text-xs text-pink-700 mt-2 font-medium">{p.tech}</p>
                <p className="text-xs mt-2 italic">★ {p.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SLIDE 4 — Skills & Tech Stack ===================== */}
      <section className="slide pink-bg">
        <div className="w-full max-w-[1100px]">
          <div className="flex items-end justify-between mb-8">
            <h2 className="script text-5xl md:text-7xl leading-none">Skills</h2>
            <p className="text-sm md:text-base">tech stack</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div
                key={cat}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-pink-100"
              >
                <p className="h-section text-pink-700">{cat}</p>
                <ul className="mt-3 space-y-2">
                  {items.map((i) => (
                    <li key={i} className="flex items-center gap-2 body-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      {i}
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

          {/* Flow */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {PROCESS.map((step, i) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span className="px-3 py-2 md:px-5 md:py-3 bg-black text-white rounded-full text-xs md:text-sm">
                  {step}
                </span>
                {i < PROCESS.length - 1 && (
                  <span className="text-pink-500 text-lg">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.label}
                className="bg-white/70 rounded-2xl p-5 text-center border border-pink-100"
              >
                <p className="script text-4xl md:text-5xl text-pink-700 leading-none">
                  {a.value}
                </p>
                <p className="text-xs md:text-sm mt-2">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SLIDE 6 — Contact & Future Goals ===================== */}
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
              <p className="script text-3xl md:text-4xl text-pink-700 mt-6 leading-snug">
                "{CONTACT.closing}"
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-2xl shadow-md flex items-center justify-center border border-pink-100">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-[repeating-conic-gradient(#000_0_25%,#fff_0_50%)] [background-size:12px_12px] rounded-md opacity-80" />
              </div>
              <p className="text-xs mt-3 text-gray-600">scan to visit portfolio</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-12">
            © 2026 Swastika Singh · Built with care
          </p>
        </div>
      </section>
    </div>
  );
}
