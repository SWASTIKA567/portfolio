import { SKILLS } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin, Code, Layers, Server, Wrench, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tilt3D } from "@/components/Tilt3D";

export function Slide4() {
  const experiences = [
    {
      role: "Mobile Application and Web Development",
      company: "Swayamfin Financial Services Pvt. Ltd",
      location: "Delhi, India",
      duration: "May 2026 - Present",
      points: [
        "Identified, debugged, and resolved critical bugs across web and mobile platforms through systematic testing and root cause analysis",
        "Implemented SEO best practices including meta tags, keyword optimization, and structured data markup to improve search engine rankings",
      ],
    },
    {
      role: "Mobile Application Development",
      company: "Team Conatus",
      location: "Ghaziabad, Uttar Pradesh",
      duration: "Sept 2025 - Present",
      points: [
        "Developed 3+ Flutter applications using Firebase for backend services",
        "Integrated REST APIs and handled dynamic data for real-time app functionality",
        "Implemented Firebase Firestore for real-time database operations and data synchronization, collaborating with team members on UI development, debugging, and testing",
      ],
    },
  ];

  const getIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "languages":
        return <Code className="w-5 h-5 text-pink-600" />;
      case "frameworks":
        return <Layers className="w-5 h-5 text-pink-600" />;
      case "backend":
        return <Server className="w-5 h-5 text-pink-600" />;
      default:
        return <Wrench className="w-5 h-5 text-pink-600" />;
    }
  };

  return (
    <section className="slide pink-bg relative overflow-hidden">
      {/* 3D decorative background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,86,154,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[1120px] relative z-10 px-4 md:px-0 py-12 md:py-20">
        {/* Section Header */}
        <ScrollReveal animation="3d-rise">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-pink-200/50 pb-6">
            <div>
              <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900 drop-shadow-xs">
                Journey
              </h2>
              <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-pink-600 font-bold mt-1 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Experience & Technical Stack
              </p>
            </div>
            <div className="text-right text-xs font-semibold text-neutral-500 hidden md:block">
              <span className="px-3 py-1 rounded-full bg-white/70 border border-pink-100">
                May 2026 — Present
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Experience */}
          <ScrollReveal animation="3d-rise" delay={150} className="lg:col-span-7 w-full">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-100 p-2.5 rounded-xl shadow-xs">
                  <Briefcase className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">
                  Work Experience
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-pink-200/60 space-y-10 ml-3">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative group">
                    {/* 3D Timeline pulsing node */}
                    <div className="absolute -left-[35px] top-4 bg-[#fff5fa] p-1.5 rounded-full border-2 border-pink-500 transition-all duration-300 group-hover:scale-125 group-hover:border-pink-600 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500 group-hover:bg-pink-600" />
                      <div className="absolute inset-0 rounded-full bg-pink-400 opacity-40 animate-ping pointer-events-none" />
                    </div>

                    {/* 3D Card with Tilt */}
                    <Tilt3D
                      maxTilt={10}
                      perspective={1000}
                      scale={1.02}
                      glare={true}
                      glareMaxOpacity={0.25}
                      className="w-full"
                    >
                      <div className="bg-white/80 hover:bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-pink-100/90 hover:border-pink-300 shadow-md hover:shadow-2xl hover:shadow-pink-900/10 transition-all duration-400">
                        {/* Date badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[11px] font-bold uppercase tracking-wider text-pink-600 mb-3.5 border border-pink-100/70 shadow-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.duration}
                        </div>

                        <h4 className="text-lg md:text-xl font-bold text-neutral-900 group-hover:text-pink-600 transition-colors duration-300">
                          {exp.role}
                        </h4>

                        {exp.company && (
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-neutral-600 font-medium">
                            <span className="text-pink-600 font-bold">{exp.company}</span>
                            {exp.location && (
                              <span className="flex items-center gap-1 text-xs text-neutral-400">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        )}

                        <ul className="mt-4 space-y-2.5">
                          {exp.points.map((pt, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-700 leading-relaxed"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Tilt3D>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: 3D Technical Stack */}
          <ScrollReveal animation="3d-rise" delay={300} className="lg:col-span-5 w-full">
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-100 p-2.5 rounded-xl shadow-xs">
                  <Code className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">
                  Technical Stack
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                {Object.entries(SKILLS).map(([cat, items]) => (
                  <Tilt3D
                    key={cat}
                    maxTilt={8}
                    perspective={900}
                    scale={1.02}
                    glare={false}
                    className="w-full"
                  >
                    <div className="bg-white/80 hover:bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-pink-100/90 hover:border-pink-300 shadow-md hover:shadow-xl hover:shadow-pink-900/10 transition-all duration-300">
                      <div className="flex items-center gap-2.5 mb-4 border-b border-pink-100 pb-2.5">
                        {getIcon(cat)}
                        <p className="font-bold text-neutral-800 tracking-tight text-base">
                          {cat}
                        </p>
                      </div>

                      {/* 3D Pop Tech Chips */}
                      <div className="flex flex-wrap gap-2.5">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 text-neutral-700 hover:text-pink-700 border border-neutral-200/80 hover:border-pink-300 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-pink-300/40 hover:-translate-y-1 hover:scale-108 active:scale-95 transition-all duration-250 cursor-default inline-block select-none"
                            style={{
                              transform: "translateZ(10px)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Tilt3D>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
