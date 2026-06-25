import { SKILLS } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin, Code, Layers, Server, Wrench } from "lucide-react";

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

  // Helper to map skill categories to icons
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
      {/* Subtle decorative background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(244,63,94,0.06),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-[1100px] relative z-10 px-4 md:px-0 py-12 md:py-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-pink-100/50 pb-6">
          <div>
            <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900">
              Journey
            </h2>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-pink-600 font-semibold mt-1">
              Experience & Technical Stack
            </p>
          </div>
          <div className="text-right text-xs text-neutral-500 hidden md:block">
            <span>May 2026 — Present</span>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Experience (7/12 columns on large screens) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-100 p-2 rounded-xl">
                <Briefcase className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">
                Work Experience
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-pink-200/50 space-y-10 ml-3">
              {experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline bullet node */}
                  <div className="absolute -left-[35px] top-1 bg-[#fff5fa] p-1 rounded-full border-2 border-pink-500 transition-all duration-300 group-hover:bg-pink-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500 group-hover:bg-white" />
                  </div>

                  {/* Card wrapper */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-sm rounded-2xl p-6 border border-pink-100/80 transition-all duration-500 hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-300">
                    
                    {/* Date badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-3 border border-pink-100/50">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </div>

                    <h4 className="text-lg font-bold text-neutral-900 group-hover:text-pink-700 transition-colors duration-300">
                      {exp.role}
                    </h4>

                    {exp.company && (
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-neutral-600 font-medium">
                        <span className="text-pink-600 font-semibold">{exp.company}</span>
                        {exp.location && (
                          <span className="flex items-center gap-1 text-xs text-neutral-400">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    )}

                    <ul className="mt-4 space-y-2.5">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-700 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skills (5/12 columns on large screens) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-100 p-2 rounded-xl">
                <Code className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">
                Technical Stack
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {Object.entries(SKILLS).map(([cat, items]) => (
                <div
                  key={cat}
                  className="bg-white/80 hover:bg-white backdrop-blur-sm rounded-2xl p-5 border border-pink-100/80 transition-all duration-300 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-900/5 group"
                >
                  <div className="flex items-center gap-2.5 mb-3.5 border-b border-pink-50/50 pb-2">
                    {getIcon(cat)}
                    <p className="font-semibold text-neutral-800 tracking-tight text-sm md:text-base group-hover:text-pink-700 transition-colors duration-300">
                      {cat}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="bg-white hover:bg-pink-50 text-neutral-700 hover:text-pink-700 border border-neutral-100 hover:border-pink-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 active:scale-95 hover:shadow-md hover:shadow-pink-200/60 px-3 py-1.5 rounded-xl text-xs font-medium shadow-sm cursor-default inline-block select-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
