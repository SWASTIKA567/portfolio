import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ArrowDown,
  GraduationCap,
  Calendar,
  BookOpen,
  Bot,
  Users,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  Layers,
  Sparkles,
  ArrowUpRight,
  Calculator,
} from "lucide-react";
import { PremiumPhoneFrame } from "@/components/PremiumPhoneFrame";

interface CircleShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CircleShowcaseModal({ isOpen, onClose }: CircleShowcaseModalProps) {
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
    const el = document.getElementById("circle-opportunity");
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
              SECTION 00: THE HERO (Deep Midnight Violet Canvas, Neon Logo Emblem)
              ========================================================================= */}
          <section className="bg-[#0A0712] text-white px-6 sm:px-12 lg:px-20 pt-8 pb-16 lg:pb-20 relative overflow-hidden flex flex-col justify-between min-h-[92vh]">
            {/* Subtle Violet Radial Glow */}
            <div
              className="absolute -top-32 right-1/4 w-[600px] h-[500px] rounded-full pointer-events-none opacity-25 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, transparent 70%)",
              }}
            />

            {/* Top Navigation Row */}
            <div className="flex items-center justify-between pb-8 border-b border-white/10 w-full relative z-10">
              <div className="flex items-center gap-3">
                <img
                  src="/screenshots/circle/circle-logo.png"
                  alt="Circle App Logo"
                  className="w-8 h-8 rounded-full object-cover shadow-md border border-purple-400/40"
                />
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Circle
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A78BFA] bg-[#7C3AED]/20 px-2.5 py-0.5 rounded-full border border-[#7C3AED]/30">
                    Campus Platform
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={scrollToOpportunity}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
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
                  <X className="w-4 h-4 text-purple-300" />
                </button>
              </div>
            </div>

            {/* Middle Main Content */}
            <div className="py-12 lg:py-16 relative z-10">
              {/* Category Subheadings */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.22em] text-[#A78BFA] mb-4">
                <span>CAMPUS UTILITY ECOSYSTEM</span>
                <span>STUDENT LIFESTYLE HUB</span>
              </div>

              {/* Giant Title: Pure White Title */}
              <h1 className="text-[76px] sm:text-[110px] lg:text-[148px] font-black tracking-tighter leading-none mb-10 select-none text-white">
                Circle
              </h1>

              {/* Two-Column Editorial Copy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start pt-4 border-t border-white/10">
                <p className="text-2xl sm:text-3xl font-serif leading-snug tracking-tight text-neutral-100">
                  A full-stack campus utility designed to streamline academic resources, live attendance tracking, society updates, and campus queries.
                </p>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    Circle bridges disjointed college systems into a unified mobile application—featuring reverse-engineered AKGEC ERP token negotiation, a safe-bunk margin calculator, Cloudinary lecture notes storage, and an AI campus assistant.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Flutter (GetX)",
                      "Node.js & Express",
                      "MongoDB",
                      "Campus ERP API",
                      "Cloudinary CDN",
                      "AES Encryption",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/10 text-neutral-300 text-xs font-mono tracking-wider border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Hero Peeking Mockup (Circle Attendance Screen) */}
            <div className="relative mt-8 sm:mt-12 flex justify-center w-full">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] -mb-32 sm:-mb-40 z-20">
                <PremiumPhoneFrame
                  imageSrc="/screenshots/circle/circle-attendance.png"
                  alt="Circle Live ERP Attendance Screen"
                  variant="silver"
                  width={275}
                  height={560}
                  className="shadow-2xl shadow-black/90 mx-auto"
                />

                {/* Left Floating Badge: Live ERP Sync */}
                <div className="absolute -left-6 sm:-left-12 top-28 bg-[#110D20]/95 border border-purple-500/25 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 text-xs text-white">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
                  <span className="font-mono uppercase font-bold tracking-wider text-[11px] text-purple-200">
                    AKGEC ERP LIVE SYNC
                  </span>
                </div>

                {/* Right Floating Badge: 75% Bunk Calc */}
                <div className="absolute -right-6 sm:-right-14 bottom-44 bg-[#110D20]/95 border border-purple-500/25 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 text-xs text-white">
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono uppercase font-bold tracking-wider text-[11px] text-emerald-200">
                    75% MARGIN CALCULATOR
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Process Strip */}
            <div className="pt-36 sm:pt-44 flex flex-wrap items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 border-t border-white/10 gap-4 relative z-10">
              <span className="flex items-center gap-2 text-purple-300">
                <Lock className="w-4 h-4 text-purple-400" /> ERP HANDSHAKE
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-purple-300">
                <Calculator className="w-4 h-4 text-purple-400" /> ATTENDANCE & BUNK CALC
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-purple-300">
                <BookOpen className="w-4 h-4 text-purple-400" /> SEMESTER NOTES & PYQS
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-purple-300">
                <Users className="w-4 h-4 text-purple-400" /> CLUBS & EVENTS
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-purple-300">
                <Bot className="w-4 h-4 text-purple-400" /> AI CIRCLE BOT
              </span>
            </div>
          </section>

          {/* =========================================================================
              SECTION 01: THE OPPORTUNITY (Clean Off-White #FAFAF8)
              ========================================================================= */}
          <section
            id="circle-opportunity"
            className="bg-[#FAFAF8] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60"
          >
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8">
                01 / THE OPPORTUNITY
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-neutral-900 leading-[1.04] tracking-[-0.03em]">
                    Campus utilities should empower student life—not trap them in slow ERP portals.
                  </h2>
                </div>

                <div className="lg:col-span-5 space-y-6 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal pt-2">
                  <p>
                    College students juggle disjointed tools: slow and clunky college portals to check attendance percentages, scattered WhatsApp groups and Drive links for study materials, and missed notices about society recruitments.
                  </p>
                  <p>
                    Circle bridges this gap into a unified, high-performance mobile ecosystem—combining automated ERP sync, academic resource repositories, campus society directories, and an AI campus bot.
                  </p>
                </div>
              </div>

              {/* Quote Callout Banner */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl text-[#7C3AED] font-serif leading-none select-none">
                    “
                  </span>
                  <p className="text-lg sm:text-2xl font-bold text-neutral-900 leading-snug">
                    Not just another college app. An intelligent operating system for campus life.
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-3 self-end sm:self-center bg-[#F5F3FF] border border-[#7C3AED]/20 px-5 py-3 rounded-full">
                  <GraduationCap className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7C3AED]">
                    CAMPUS PLATFORM
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 02: FROM ERP TO CAMPUS HUB (Deep Violet #3B166E)
              ========================================================================= */}
          <section className="bg-[#2D1254] text-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300/80 mb-8">
                02 / CORE MODULES & FEATURES
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 border-b border-white/15 pb-12">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-[-0.03em]">
                    One connected campus workflow.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal">
                    Circle integrates administrative ERP sync with daily student academics, campus events, and AI support.
                  </p>
                </div>
              </div>

              {/* 6-Grid Process Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-purple-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-purple-300">01</span>
                    <Lock className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Live ERP Handshake</h3>
                    <p className="text-xs text-purple-100/70 leading-relaxed">
                      Reverse-engineered AKGEC EduMarshal API handshake with secure AES credential encryption.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-purple-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-purple-300">02</span>
                    <Calculator className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Bunk / Margin Calc</h3>
                    <p className="text-xs text-purple-100/70 leading-relaxed">
                      Tells students exactly how many classes they can safely skip while staying strictly above 75%.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-purple-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-purple-300">03</span>
                    <BookOpen className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Notes & PYQ Vault</h3>
                    <p className="text-xs text-purple-100/70 leading-relaxed">
                      Syllabus notes and previous years' question papers categorized by semester, branch, and subject.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-purple-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-purple-300">04</span>
                    <Users className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Societies Directory</h3>
                    <p className="text-xs text-purple-100/70 leading-relaxed">
                      Discovery portal for cultural and technical clubs, recruitment dates, and coordinator feeds.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-purple-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-purple-300">05</span>
                    <Calendar className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Campus Events Feed</h3>
                    <p className="text-xs text-purple-100/70 leading-relaxed">
                      Centralized notice board for college fests, workshops, and hackathons with registration links.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-purple-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-purple-300">06</span>
                    <Bot className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Circle Bot</h3>
                    <p className="text-xs text-purple-100/70 leading-relaxed">
                      Conversational assistant trained on department procedures, syllabus info, and campus queries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 03: DUAL WORKSPACE DISPLAY (Soft Lilac #F5F3FF)
              ========================================================================= */}
          <section className="bg-[#F5F3FF] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-purple-200/50 relative overflow-hidden">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex items-center justify-between mb-10 pb-2">
                <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-500">
                  03 / STUDENT WORKSPACE
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-12 h-px bg-[#7C3AED]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7C3AED]">
                    ACADEMIC SUITE
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Typography Block */}
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-[#111111] leading-[0.96] tracking-[-0.035em]">
                    Real-time<br />
                    records.<br />
                    Zero stress.
                  </h2>

                  <p className="text-sm sm:text-[15px] text-neutral-600 leading-[1.65] font-normal max-w-md pt-2">
                    Live ERP synchronization gives students instant access to subject-wise attendance percentages, safe-bunk counts, and semester lecture notes without portal logins.
                  </p>

                  <div className="pt-2 space-y-2 text-xs font-mono text-neutral-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                      <span>AKGEC EduMarshal reverse-engineered token negotiation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                      <span>Predictive margin: classes you can safely skip above 75%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                      <span>Categorized lecture units & Cloudinary PDF delivery</span>
                    </div>
                  </div>
                </div>

                {/* Right Dual Premium Smartphone Mockups */}
                <div className="lg:col-span-7 flex items-center justify-center relative min-h-[540px]">
                  {/* Back Left Phone (Tilted Left) - Home Screen */}
                  <div className="absolute left-0 sm:left-4 top-8 z-10 transition-transform hover:scale-105 duration-300">
                    <PremiumPhoneFrame
                      imageSrc="/screenshots/circle/circle-home.png"
                      alt="Circle Student Home Screen"
                      width={230}
                      height={470}
                      rotate={-8}
                      showButtons={true}
                      glare={true}
                    />
                  </div>

                  {/* Front Right Phone (Tilted Right, In Focus) - Attendance Tracker */}
                  <div className="relative z-20 translate-x-12 sm:translate-x-16 transition-transform hover:scale-105 duration-300">
                    <PremiumPhoneFrame
                      imageSrc="/screenshots/circle/circle-attendance.png"
                      alt="Circle ERP Attendance Tracker"
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
              SECTION 04: ACADEMIC RESOURCE REPOSITORY (Notes & PYQs)
              ========================================================================= */}
          <section className="bg-[#FAF8FC] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60 relative overflow-hidden">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Phone Visual with Floating Badges */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                {/* Floating Pill Left */}
                <div className="absolute -left-3 sm:left-2 top-28 z-30 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 border border-white/20">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>SEMESTER NOTES HUB</span>
                </div>

                {/* Floating Pill Right */}
                <div className="absolute -right-3 sm:right-2 bottom-24 z-30 px-4 py-2 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-2 border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CLOUDINARY PDF STREAMING</span>
                </div>

                {/* Premium Phone Mockup (Notes Screen) */}
                <PremiumPhoneFrame
                  imageSrc="/screenshots/circle/circle-notes.png"
                  alt="Circle Semester Notes Screen"
                  width={255}
                  height={520}
                  showButtons={true}
                  glare={true}
                />

                {/* Step Sequence Breadcrumb */}
                <div className="mt-6 flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-neutral-600 uppercase tracking-widest bg-white border border-neutral-200/90 px-5 py-2 rounded-full shadow-md">
                  <span>SELECT SEMESTER</span>
                  <span>→</span>
                  <span>BRANCH</span>
                  <span>→</span>
                  <span>SUBJECT</span>
                  <span>→</span>
                  <span className="text-[#7C3AED] font-black">VIEW PDF</span>
                </div>
              </div>

              {/* Right Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                  04 / ACADEMIC REPOSITORY
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-[1.05] tracking-[-0.03em]">
                  Curated study materials at student fingertips.
                </h2>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  No more chasing lost Google Drive links before exams. Circle centralizes professor lecture notes, recommended textbook units, and previous years' question papers into a fast cloud repository.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-[#7C3AED]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Multi-Semester Organization</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-light">
                    Direct access from 1st through 8th semester, indexed by university course codes (e.g. BCS-501 Database Management Systems).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Cloudinary PDF Delivery Pipeline</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-light">
                    Multi-part file uploads handled by multer with optimized Cloudinary CDN caching for instant mobile previews.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 05: SYSTEM ARCHITECTURE
              ========================================================================= */}
          <section className="bg-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8">
                05 / SYSTEM ARCHITECTURE
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-[1.05] tracking-[-0.03em]">
                    Enterprise-grade client-server campus pipeline.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    Decoupled microservice layers separating mobile clients from cloud document storage, reverse-engineered ERP token negotiation, and AI Q&A models.
                  </p>
                </div>
              </div>

              {/* 5 Architecture Layer Cards */}
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Mobile Client (Flutter & GetX)",
                    desc: "Reactive state management, custom Material Design system, shared_preferences offline caching, and responsive typography.",
                    tech: "Flutter · Dart · GetX · SharedPreferences",
                  },
                  {
                    num: "02",
                    title: "Backend REST API (Node.js & Express)",
                    desc: "JWT authentication, bcryptjs password hashing, AES credential encryption for ERP sessions, and role-based permissions.",
                    tech: "Node.js · Express.js · Crypto · JWT",
                  },
                  {
                    num: "03",
                    title: "Database Layer (MongoDB & Mongoose)",
                    desc: "Structured schemas for Users, Academic Notes, Campus Societies, Hackathon Events, and admin approval queues.",
                    tech: "MongoDB Atlas · Mongoose ODM",
                  },
                  {
                    num: "04",
                    title: "Media Storage & ERP Integration",
                    desc: "Cloudinary multi-part document delivery via multer; automated AKGEC EduMarshal ERP API token negotiation.",
                    tech: "Cloudinary CDN · Multer · ERP Handshake",
                  },
                  {
                    num: "05",
                    title: "AI Chatbot Service (Circle Bot)",
                    desc: "Microservice proxy to an ML question-answering model for campus procedure queries and contextual fact retrieval.",
                    tech: "ML Model Proxy · NLP · Knowledge Base",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-6 rounded-2xl bg-[#FAF9F9] border border-neutral-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-mono font-bold text-[#7C3AED]">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-neutral-900">
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-600 font-light mt-0.5 max-w-2xl">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#7C3AED] self-start md:self-center shrink-0">
                      {item.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 06: CONTRIBUTION & FOOTER
              ========================================================================= */}
          <section className="bg-[#120B20] text-white pt-20 pb-12 px-6 sm:px-14 lg:px-20">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/screenshots/circle/circle-logo.png"
                      alt="Circle Logo"
                      className="w-10 h-10 rounded-full object-cover shadow-md border border-purple-400/40"
                    />
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white">
                        Circle
                      </h3>
                      <p className="text-xs font-mono text-purple-300">
                        Full-Stack Campus Utility & Student Ecosystem
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm max-w-xl font-light">
                    Designed and built end-to-end by{" "}
                    <strong className="text-white font-medium">Swastika Singh</strong> as a production-grade campus ecosystem for college students.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors border border-white/15 cursor-pointer"
                  >
                    Back to Top ↑
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#7C3AED]/30"
                  >
                    Close Showcase
                  </button>
                </div>
              </div>

              {/* Bottom Credits Strip */}
              <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-neutral-500 gap-4">
                <span>© {new Date().getFullYear()} SWASTIKA SINGH · ALL RIGHTS RESERVED</span>
                <div className="flex items-center gap-6">
                  <span>FLUTTER / DART</span>
                  <span>NODE.JS / EXPRESS</span>
                  <span>MONGODB</span>
                  <span>ERP HANDSHAKE</span>
                  <span>CLOUDINARY</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>,
    document.body
  );
}
