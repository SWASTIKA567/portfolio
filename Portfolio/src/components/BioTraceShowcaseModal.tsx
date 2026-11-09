import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Leaf,
  FlaskConical,
  Dna,
  Binary,
  Clock,
  Share2,
  Sparkles,
  Cpu,
  FileSpreadsheet,
  CheckCircle2,
  ArrowDown,
} from "lucide-react";
import { PremiumPhoneFrame } from "@/components/PremiumPhoneFrame";

interface BioTraceShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BioTraceShowcaseModal({
  isOpen,
  onClose,
}: BioTraceShowcaseModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const scrollToOpportunity = () => {
    const el = document.getElementById("showcase-opportunity");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] overflow-y-auto bg-black/90 backdrop-blur-md font-sans"
      onClick={onClose}
    >
      <div
        className="min-h-full w-full flex flex-col items-center justify-start p-0 sm:py-6 md:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── MAIN SHOWCASE DOCUMENT CONTAINER ── */}
        <main
          ref={scrollRef}
          className="w-full max-w-[1240px] bg-white shadow-2xl rounded-none sm:rounded-[36px] overflow-hidden text-neutral-900 flex flex-col border border-neutral-800/40 my-auto relative"
        >
          {/* =========================================================================
              SECTION 00: THE EXACT HERO (Matches Screenshot 1)
              Deep Black Canvas, "Bio" in White, "Trace" in Coral Pink #F6A5A5
              ========================================================================= */}
          <section className="bg-[#090C0A] text-white px-6 sm:px-12 lg:px-20 pt-8 pb-16 lg:pb-20 relative overflow-hidden flex flex-col justify-between min-h-[92vh]">
            {/* Top Navigation Row */}
            <div className="flex items-center justify-between pb-8 border-b border-white/10 w-full">
              <div className="flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-white" />
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  BioTrace
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={scrollToOpportunity}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>EXPLORE PROJECT</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close Showcase"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all border border-white/15 cursor-pointer shadow-xs"
                >
                  <span>Close</span>
                  <X className="w-4 h-4 text-[#F6A5A5]" />
                </button>
              </div>
            </div>

            {/* Middle Main Content */}
            <div className="py-12 lg:py-16">
              {/* Category Subheadings */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.22em] text-[#F6A5A5] mb-4">
                <span>BUILD WITH BHARAT</span>
                <span>HACKATHON PROJECT</span>
              </div>

              {/* Giant Two-Tone Title: "Bio" (White) + "Trace" (Coral Pink) */}
              <h1 className="text-[76px] sm:text-[110px] lg:text-[148px] font-black tracking-tighter leading-none mb-10 select-none">
                <span className="text-white">Bio</span>
                <span className="text-[#F6A5A5]">Trace</span>
              </h1>

              {/* Two-Column Copy */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-4 border-t border-white/10">
                {/* Left Serif Statement */}
                <div className="lg:col-span-7">
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl text-white/95 font-normal leading-snug"
                    style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', serif" }}
                  >
                    Biodiversity intelligence, powered by environmental DNA.
                  </h2>
                </div>

                {/* Right Sans Paragraph */}
                <div className="lg:col-span-5">
                  <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed font-normal">
                    A mobile-first platform for researchers to analyze eDNA, understand species presence, monitor ecological change, and collaborate across shared ecosystems.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row: 01 DETECT / Phone Top Peeking / 02 UNDERSTAND */}
            <div className="relative pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#F6A5A5]">
                01 DETECT
              </span>

              {/* Center Premium Phone Top Peeking */}
              <div className="w-[200px] sm:w-[230px] h-[55px] overflow-hidden mx-auto relative flex items-start justify-center">
                <div className="translate-y-[-10px]">
                  <PremiumPhoneFrame
                    imageSrc="/screenshots/biotrace/biotrace-results.png"
                    alt="eDNA Species Portal"
                    width={200}
                    height={420}
                    showButtons={false}
                    glare={false}
                  />
                </div>
              </div>

              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#F6A5A5]">
                02 UNDERSTAND
              </span>
            </div>
          </section>

          {/* =========================================================================
              SECTION 01: THE OPPORTUNITY (Clean Off-White #FAFAF8)
              ========================================================================= */}
          <section id="showcase-opportunity" className="bg-[#FAFAF8] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8">
                01 / THE OPPORTUNITY
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-neutral-900 leading-[1.04] tracking-[-0.03em]">
                    Research data should reveal a living ecosystem—not remain trapped in silos.
                  </h2>
                </div>

                <div className="lg:col-span-5 space-y-6 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal pt-2">
                  <p>
                    Traditional biodiversity surveys can be time-consuming, expensive, and difficult to scale.
                    Researchers often process sequences, manage datasets, visualize results, and compare periods across separate tools.
                  </p>
                  <p>
                    BioTrace brings the post-sequencing workflow into one connected research platform: from raw scientific data to accessible, long-term biodiversity monitoring.
                  </p>
                </div>
              </div>

              {/* Quote Callout Banner with eDNA inside badge */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl text-[#144527] font-serif leading-none select-none">
                    “
                  </span>
                  <p className="text-lg sm:text-2xl font-bold text-neutral-900 leading-snug">
                    Not another DNA analysis tool. A digital intelligence layer for biodiversity research.
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-3 self-end sm:self-center bg-[#F4FAF6] border border-[#144527]/20 px-5 py-3 rounded-full">
                  <Dna className="w-5 h-5 text-[#144527]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#144527]">
                    eDNA INSIDE
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 02: FROM SAMPLE TO SIGNAL (Deep Forest Green #144527)
              ========================================================================= */}
          <section className="bg-[#144527] text-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300/80 mb-8">
                02 / FROM SAMPLE TO SIGNAL
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 border-b border-white/15 pb-12">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-[-0.03em]">
                    One continuous research workflow.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                    BioTrace connects field collection with computation, ecological context, and shared knowledge.
                  </p>
                </div>
              </div>

              {/* 6-Grid Process Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-300">01</span>
                    <FlaskConical className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sample</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      Collect environmental material from water, soil, or habitat.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-300">02</span>
                    <Binary className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sequence</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      Upload processed eDNA datasets through a guided mobile workflow.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-300">03</span>
                    <Dna className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Classify</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      Match sequences against reference databases and assign taxonomy.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-300">04</span>
                    <Leaf className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Understand</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      Translate computational output into biodiversity intelligence.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-300">05</span>
                    <Clock className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Monitor</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      Compare sampling periods and detect ecological change over time.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-emerald-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-300">06</span>
                    <Share2 className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Collaborate</h3>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">
                      Discover and contribute to permissioned research projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 03: RESEARCHER WORKSPACE (Matches User Image #3: Soft Blush #FCEAEF)
              Typography: "Complex results. Clear next steps." & Dual Tilted Phones
              ========================================================================= */}
          <section className="bg-[#FCEAEF] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-pink-200/50 relative overflow-hidden">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex items-center justify-between mb-10 pb-2">
                <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-500">
                  03 / RESEARCHER WORKSPACE
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-12 h-px bg-[#144527]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#144527]">
                    ANALYSIS RESULT
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Typography Block */}
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-[#111111] leading-[0.96] tracking-[-0.035em]">
                    Complex<br />
                    results.<br />
                    Clear next<br />
                    steps.
                  </h2>

                  <p className="text-sm sm:text-[15px] text-neutral-600 leading-[1.65] font-normal max-w-md pt-2">
                    The dashboard turns scientific output into a concise mobile view—surfacing predicted species, confidence, taxonomic context, habitat, range, and recent analyses.
                  </p>
                </div>

                {/* Right Dual Premium Smartphone Mockups */}
                <div className="lg:col-span-7 flex items-center justify-center relative min-h-[540px]">
                  {/* Back Left Phone (Tilted Left) */}
                  <div className="absolute left-0 sm:left-4 top-8 z-10 transition-transform hover:scale-105 duration-300">
                    <PremiumPhoneFrame
                      imageSrc="/screenshots/biotrace/biotrace-results.png"
                      alt="Researcher Workspace"
                      width={230}
                      height={470}
                      rotate={-8}
                      showButtons={true}
                      glare={true}
                    />
                  </div>

                  {/* Front Right Phone (Tilted Right, In Focus) */}
                  <div className="relative z-20 translate-x-12 sm:translate-x-16 transition-transform hover:scale-105 duration-300">
                    <PremiumPhoneFrame
                      imageSrc="/screenshots/biotrace/biotrace-results.png"
                      alt="eDNA Species Portal Details"
                      width={255}
                      height={520}
                      rotate={4}
                      showButtons={true}
                      glare={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 04: DATA INGESTION (Matches Screenshot 2: Clean White Bezel Phone)
              NO Black Bar Artifacts, Floating Badges & Step Breadcrumb
              ========================================================================= */}
          <section className="bg-[#F8FAF8] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60 relative overflow-hidden">
            {/* Soft Sage Background Radial Glow */}
            <div
              className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ background: "#C8E6C9" }}
            />

            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Phone Visual with Floating Badges */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                {/* Floating Pill Left: BATCH-READY */}
                <div className="absolute -left-3 sm:left-2 top-28 z-30 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 border border-white/20">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>BATCH-READY</span>
                </div>

                {/* Floating Pill Right: PIPELINE CLOUD PROCESSED */}
                <div className="absolute -right-3 sm:right-2 bottom-24 z-30 px-4 py-2 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-2 border border-white/20">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PIPELINE CLOUD PROCESSED</span>
                </div>

                {/* Premium Phone Mockup */}
                <PremiumPhoneFrame
                  imageSrc="/screenshots/biotrace/biotrace-input.png"
                  alt="Researcher Input Screen"
                  width={255}
                  height={520}
                  showButtons={true}
                  glare={true}
                />

                {/* Step Sequence Breadcrumb */}
                <div className="mt-6 flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-neutral-600 uppercase tracking-widest bg-white border border-neutral-200/90 px-5 py-2 rounded-full shadow-md">
                  <span>SELECT</span>
                  <span>→</span>
                  <span>UPLOAD</span>
                  <span>→</span>
                  <span>TRACK</span>
                  <span>→</span>
                  <span className="text-[#144527] font-black">REPORT</span>
                </div>
              </div>

              {/* Right Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                  04 / DATA INGESTION
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-[1.05] tracking-[-0.03em]">
                  A lightweight door into heavy computation.
                </h2>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  Researchers select a project, attach sampling information, upload sequencing data, submit it for processing, and follow the analysis through to a biodiversity report.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-[#144527]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Supports Multiple Input Workflows</span>
                  </div>
                  <p>
                    Handles processed CSV/TSV ground-truth benchmarks for field validation, and FASTA/FASTQ sequence archives for cloud bioinformatics pipelines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 05: SPECIES INTELLIGENCE (Dark Slate #0E1410)
              ========================================================================= */}
          <section className="bg-[#0E1410] text-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                  05 / SPECIES INTELLIGENCE
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-[-0.03em]">
                  Every detection carries ecological context.
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  Hierarchical taxonomy, habitat, distribution, and conservation information make a sequence match useful beyond a single result.
                </p>

                <div className="pt-2">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-2">
                    Taxonomic Path
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
                    <span className="text-white font-bold">CLASS</span>
                    <span>—</span>
                    <span className="text-white font-bold">ORDER</span>
                    <span>—</span>
                    <span className="text-white font-bold">FAMILY</span>
                    <span>—</span>
                    <span className="text-white font-bold">GENUS</span>
                    <span>—</span>
                    <span className="text-emerald-400 font-bold">SPECIES</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
                  <span>📍 Location-linked observations</span>
                </div>
              </div>

              {/* Right Species Visual Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[340px] rounded-3xl bg-neutral-900 border border-neutral-800 p-5 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                    <span>SPECIES PROFILE</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[10px]">
                      Least Concern
                    </span>
                  </div>

                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-neutral-800 border border-white/10 relative">
                    <img
                      src="/screenshots/biotrace/biotrace-project-detail.png"
                      alt="Amphibian Survey"
                      className="w-full h-full object-cover object-top scale-[1.04]"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
                      Amphibia · Anura
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white italic">
                      Tomopterna milletihorsini
                    </h3>
                    <p className="text-xs text-neutral-400">Mali Screeching Frog</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-neutral-300 leading-relaxed">
                    Endemic to sub-tropical freshwater wetlands and riverine habitats. Sequence matches confirmed across 4 sampling sites.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 06: OPEN RESEARCH (Soft Mint / Light Sage #E3F0E6)
              ========================================================================= */}
          <section className="bg-[#E3F0E6] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-emerald-200/60">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#144527]">
                  06 / OPEN RESEARCH
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-tight tracking-[-0.03em]">
                  One ecosystem. Many independent projects.
                </h2>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  Researchers can discover public studies connected to a location, contribute where access is permitted, or create independent projects—preserving ownership without isolating knowledge.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono font-semibold">
                  <span className="px-3 py-1.5 rounded-lg bg-white/80 border border-[#144527]/20 text-[#144527]">
                    #eDNA
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/80 border border-[#144527]/20 text-[#144527]">
                    #Conservation
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/80 border border-[#144527]/20 text-[#144527]">
                    #Rainforest
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/80 border border-[#144527]/20 text-[#144527]">
                    #Open Data
                  </span>
                </div>
              </div>

              {/* Premium Phone Mockup for Community */}
              <div className="lg:col-span-6 flex justify-center">
                <PremiumPhoneFrame
                  imageSrc="/screenshots/biotrace/biotrace-community.png"
                  alt="Open Projects & Community"
                  width={255}
                  height={520}
                  showButtons={true}
                  glare={true}
                />
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 07: SYSTEM ARCHITECTURE (Crisp White #FFFFFF)
              ========================================================================= */}
          <section className="bg-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8">
                07 / SYSTEM ARCHITECTURE
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-tight tracking-[-0.03em]">
                    The mobile experience is only the visible layer.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    Computational work happens beyond the device, keeping the research interface focused and responsive.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                      INTERFACE
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 mb-2">Mobile app</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Projects, uploads, results and research workflows.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                      CONNECTION
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 mb-2">Backend API</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Authentication, datasets, projects and users.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                      SCIENCE
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 mb-2">Bioinformatics</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Quality control, denoising and taxonomic analysis.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                      INTELLIGENCE
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 mb-2">AI / ML layer</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Trends, anomalies, risk signals and interpretation.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                      MEMORY
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 mb-2">Data storage</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Locations, taxonomy and historical results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F4FAF6] border border-[#144527]/20 flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#144527] flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  <strong className="text-neutral-900">
                    AI supports scientific interpretation—it does not replace validated bioinformatics.
                  </strong>{" "}
                  Trend analysis, anomaly detection, risk signals, and summaries remain decision-support insights rather than definitive ecological diagnoses.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 08: CONTRIBUTION & FOOTER (Deep Forest Green #103B20)
              ========================================================================= */}
          <section className="bg-[#103B20] text-white pt-20 pb-12 px-6 sm:px-14 lg:px-20">
            <div className="max-w-[1100px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20 border-b border-white/15 pb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-[-0.03em]">
                    Translating scientific complexity to an intuitive mobile research experience.
                  </h2>
                </div>

                <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                    CONTRIBUTION
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">Swastika Singh</h3>
                  <p className="text-xs text-emerald-100/80 leading-snug">
                    Mobile Application Development
                  </p>
                  <p className="text-xs text-emerald-100/60 leading-snug">
                    Application & Backend Integration
                  </p>
                </div>
              </div>

              {/* Marquee Ticker Tape */}
              <div className="overflow-hidden select-none whitespace-nowrap border-y border-white/15 py-3.5 mb-12">
                <div className="inline-flex items-center gap-6 text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-300/80 animate-marquee">
                  {[1, 2, 3].map((g) => (
                    <span key={g} className="flex items-center gap-6">
                      <span>Research collaboration</span>
                      <span>•</span>
                      <span>Biodiversity intelligence</span>
                      <span>•</span>
                      <span>Environmental DNA</span>
                      <span>•</span>
                      <span>Longitudinal monitoring</span>
                      <span>•</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/60">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">BioTrace</span>
                </div>

                <p className="text-center sm:text-left">
                  AI-powered eDNA biodiversity monitoring and research collaboration.
                </p>

                <span className="font-mono text-[10px] tracking-wider text-emerald-300 font-bold">
                  BUILD WITH BHARAT HACKATHON PROJECT
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>,
    document.body
  );
}
