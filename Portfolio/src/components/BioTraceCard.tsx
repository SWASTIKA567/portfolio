// ✦ CHANGED — full file redesign: new font (Sora + Manrope), SVG logo, minimal layout
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame"; // ✦ CHANGED
import type { Project } from "@/data/portfolio"; // ✦ CHANGED

type BioTraceCardProps = {
  index?: string;
  total?: string;
  project: Project; // ✦ CHANGED — use screenshots: ["/projects/biotrace-screen.png"]
  onOpen?: () => void;
};

// ✦ CHANGED — BioTrace logo: rounded tile + helix strands + trace dot
export const BioTraceLogo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="BioTrace logo">
    <rect width="48" height="48" rx="14" fill="#14301f" />
    <path d="M16 11c0 8 16 10 16 18s-16 10-16 8" stroke="#8fe3a8" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M32 11c0 8-16 10-16 18s16 10 16 8" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
    <circle cx="24" cy="24" r="2.6" fill="#8fe3a8" />
  </svg>
);

const TAGS = [
  "eDNA Sequencing",
  "Taxonomic Classification",
  "Geospatial Mapping",
  "Longitudinal Monitoring",
  "Flutter & REST APIs",
];

export default function BioTraceCard({
  index = "01",
  total = "03",
  project, // ✦ CHANGED
  onOpen,
}: BioTraceCardProps) {
  return (
    <>
      {/* ✦ CHANGED — fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Sora:wght@500;600;700&display=swap');
        .bt-title { font-family: 'Sora', sans-serif; letter-spacing: -0.03em; }
        .bt-body  { font-family: 'Manrope', sans-serif; }
      `}</style>

      <article
        onClick={onOpen}
        className="bt-body group grid cursor-pointer gap-8 rounded-[28px] border border-[#e6ece8] bg-[#fbfcfb] p-6 shadow-[0_1px_2px_rgba(20,48,31,0.04)] transition hover:shadow-[0_12px_40px_rgba(20,48,31,0.08)] md:grid-cols-[1fr_1fr] md:p-10"
      >
        {/* ✦ CHANGED — left column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-[12px] text-[#7a8a80]">
           
            <span className="tabular-nums tracking-widest">
              {index} / {total}
            </span>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <BioTraceLogo />
            <h2 className="bt-title text-[40px] font-semibold leading-none text-[#0f1a14] md:text-[48px]">
              BioTrace
            </h2>
          </div>

          <p className="bt-title mt-5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#2f7a4a]">
            eDNA biodiversity monitoring
          </p>

          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[#55645a]">
            A cloud-based platform that helps researchers analyze environmental DNA and track
            biodiversity over time — from field sampling and sequencing to taxonomic
            classification and collaboration.
          </p>

          {/* ✦ CHANGED — plain text tags instead of pills */}
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#4a5a50]">
            {TAGS.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#2f7a4a]" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between pt-10">
            <span className="bt-title inline-flex items-center gap-1.5 border-b border-[#0f1a14] pb-1 text-[14px] font-semibold text-[#0f1a14]">
              Explore
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="hidden text-[12px] text-[#9aa89f] sm:block">Tap card to view details</span>
          </div>
        </div>

        {/* ✦ CHANGED — right column: soft panel, floating screenshot */}
        <div className="flex flex-col items-center justify-center rounded-[22px] bg-[#eef4f0] px-6 pb-14 pt-10">
          {/* ✦ CHANGED — large premium phone */}
          <PhoneFrame project={project} scale={1} autoplay enableTilt />
          <span className="mt-4 text-[12px] text-[#7a8a80]">eDNA Species Portal</span>
        </div>
      </article>
    </>
  );
}