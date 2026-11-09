import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ArrowDown,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Layers,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Package,
  Cpu,
  ArrowUpRight,
  Palette,
  Camera,
  BellRing,
  FileSpreadsheet,
} from "lucide-react";
import { PremiumPhoneFrame } from "@/components/PremiumPhoneFrame";

interface KechiShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KechiShowcaseModal({ isOpen, onClose }: KechiShowcaseModalProps) {
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
    const el = document.getElementById("kechi-opportunity");
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
              SECTION 00: THE HERO (Clean Obsidian Canvas, Pure White Title, Zero Neon Orange)
              ========================================================================= */}
          <section className="bg-[#09080A] text-white px-6 sm:px-12 lg:px-20 pt-8 pb-16 lg:pb-20 relative overflow-hidden flex flex-col justify-between min-h-[92vh]">
            {/* Subtle, Deep Dark Wine Ambient Background Light (No Bright Orange) */}
            <div
              className="absolute -top-32 right-1/4 w-[600px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(158, 27, 50, 0.4) 0%, transparent 70%)",
              }}
            />

            {/* Top Navigation Row */}
            <div className="flex items-center justify-between pb-8 border-b border-white/10 w-full relative z-10">
              <div className="flex items-center gap-3">
                <img
                  src="/screenshots/kechi/kechi-logo.jpg"
                  alt="Kechi Stitched Leather Badge"
                  className="w-8 h-8 rounded-lg object-cover shadow-md border border-amber-500/30"
                />
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Kechi
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                    Studio
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
                  <X className="w-4 h-4 text-neutral-300" />
                </button>
              </div>
            </div>

            {/* Middle Main Content */}
            <div className="py-12 lg:py-16 relative z-10">
              {/* Category Subheadings - Clean Rose/Muted Tone */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.22em] text-rose-200/80 mb-4">
                <span>FULL-STACK E-COMMERCE</span>
                <span>PRINT-ON-DEMAND STUDIO</span>
              </div>

              {/* Giant Two-Tone Title: "Ke" (White) + "chi" (Orange #F24E1E) */}
              <h1 className="text-[76px] sm:text-[110px] lg:text-[148px] font-black tracking-tighter leading-none mb-10 select-none">
                <span className="text-white">Ke</span>
                <span className="text-[#F24E1E]">chi</span>
              </h1>

              {/* Two-Column Editorial Copy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start pt-4 border-t border-white/10">
                <p className="text-2xl sm:text-3xl font-serif leading-snug tracking-tight text-neutral-100">
                  Turn your digital posters into premium prints—custom sized, regionally validated, and delivered seamlessly.
                </p>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                    A mobile-first print-on-demand platform connecting user artwork uploads, reactive paper format pricing, intelligent NCR regional delivery validation, and real-time Shadowfax courier tracking.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Flutter (GetX)", "Node.js & Express", "MongoDB", "Razorpay", "Shadowfax 3PL", "Cloudinary CDN"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/10 text-neutral-300 text-xs font-mono tracking-wider border border-white/10"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Hero Peeking Mockup (Kechi Home Screen) */}
            <div className="relative mt-8 sm:mt-12 flex justify-center w-full">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] -mb-32 sm:-mb-40 z-20">
                <PremiumPhoneFrame
                  imageSrc="/screenshots/kechi/kechi-home.png"
                  alt="Kechi Home Discovery Screen"
                  variant="silver"
                  width={275}
                  height={560}
                  className="shadow-2xl shadow-black/90 mx-auto"
                />

                {/* Left Floating Badge: Studio Formats */}
                <div className="absolute -left-6 sm:-left-12 top-28 bg-[#111827]/95 border border-white/15 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 text-xs text-white">
                  <span className="w-2 h-2 rounded-full bg-[#9E1B32] animate-pulse" />
                  <span className="font-mono uppercase font-bold tracking-wider text-[11px]">
                    A5 · A4 · A3 SIZING
                  </span>
                </div>

                {/* Right Floating Badge: 3PL Tracking */}
                <div className="absolute -right-6 sm:-right-14 bottom-44 bg-[#111827]/95 border border-white/15 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl hidden sm:flex items-center gap-2.5 text-xs text-white">
                  <Truck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="font-mono uppercase font-bold tracking-wider text-[11px]">
                    SHADOWFAX 3PL TRACKING
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Process Strip */}
            <div className="pt-36 sm:pt-44 flex flex-wrap items-center justify-between text-xs font-mono font-bold tracking-widest text-neutral-400 border-t border-white/10 gap-4 relative z-10">
              <span className="flex items-center gap-2 text-rose-200">
                <Camera className="w-4 h-4 text-rose-300" /> UPLOAD & COMPRESS
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-rose-200">
                <Palette className="w-4 h-4 text-rose-300" /> FORMAT (A5 / A4 / A3)
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-rose-200">
                <MapPin className="w-4 h-4 text-rose-300" /> NCR REGIONAL ROUTING
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-rose-200">
                <CreditCard className="w-4 h-4 text-rose-300" /> RAZORPAY & COD
              </span>
              <span className="hidden sm:inline text-neutral-600">→</span>
              <span className="flex items-center gap-2 text-rose-200">
                <Truck className="w-4 h-4 text-rose-300" /> 7-STAGE AWB TRACKING
              </span>
            </div>
          </section>

          {/* =========================================================================
              SECTION 01: THE OPPORTUNITY (Clean Off-White #FAFAF8)
              ========================================================================= */}
          <section
            id="kechi-opportunity"
            className="bg-[#FAFAF8] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60"
          >
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8">
                01 / THE OPPORTUNITY
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-neutral-900 leading-[1.04] tracking-[-0.03em]">
                    Custom wall art should be effortless—not a maze of desktop forms and print delays.
                  </h2>
                </div>

                <div className="lg:col-span-5 space-y-6 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal pt-2">
                  <p>
                    Traditional print ordering requires manual aspect ratio cropping, opaque offline quotation, and generic flat-rate courier rules that frequently lead to delivery failures across regional districts.
                  </p>
                  <p>
                    Kechi unifies mobile photo ingestion, reactive dimension pricing, intelligent NCR boundary validation, and automated 3PL dispatch into a single high-performance platform.
                  </p>
                </div>
              </div>

              {/* Quote Callout Banner */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl text-[#9E1B32] font-serif leading-none select-none">
                    “
                  </span>
                  <p className="text-lg sm:text-2xl font-bold text-neutral-900 leading-snug">
                    Not another static poster shop. A complete digital-to-press print studio.
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-3 self-end sm:self-center bg-[#FDECE8] border border-[#9E1B32]/20 px-5 py-3 rounded-full">
                  <Sparkles className="w-5 h-5 text-[#9E1B32]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9E1B32]">
                    PRINT STUDIO INSIDE
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 02: FROM UPLOAD TO PRESS (Deep Crimson #7A1426)
              ========================================================================= */}
          <section className="bg-[#7A1426] text-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-rose-200/80 mb-8">
                02 / FROM UPLOAD TO PRESS
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 border-b border-white/15 pb-12">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-[-0.03em]">
                    One continuous fulfillment pipeline.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed font-normal">
                    Kechi connects user image capture with commercial press production, regional routing, and automated courier delivery.
                  </p>
                </div>
              </div>

              {/* 6-Grid Process Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-rose-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-rose-300">01</span>
                    <Camera className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ingest</h3>
                    <p className="text-xs text-rose-100/70 leading-relaxed">
                      Upload from Gallery or Camera with automated client-side compression to preserve sharpness.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-rose-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-rose-300">02</span>
                    <Palette className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Format Sizing</h3>
                    <p className="text-xs text-rose-100/70 leading-relaxed">
                      Select A5 (₹39), A4 (₹59), or A3 (₹99) with live reactive pricing and bulk discounts.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-rose-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-rose-300">03</span>
                    <Layers className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Cloudinary CDN</h3>
                    <p className="text-xs text-rose-100/70 leading-relaxed">
                      Secure, high-DPI rasterization storage directly ready for physical press operators.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-rose-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-rose-300">04</span>
                    <MapPin className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">NCR Validator</h3>
                    <p className="text-xs text-rose-100/70 leading-relaxed">
                      Integrated ncrHelper checks district postal boundaries across Delhi, Haryana, UP, and Rajasthan.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-rose-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-rose-300">05</span>
                    <CreditCard className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Razorpay & COD</h3>
                    <p className="text-xs text-rose-100/70 leading-relaxed">
                      Dynamic key endpoint (/payment/config) supporting UPI, Cards, and phone-verified COD.
                    </p>
                  </div>
                </div>

                <div className="p-7 rounded-2xl bg-white/5 border border-white/15 hover:border-rose-400/50 transition-colors flex flex-col justify-between min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-rose-300">06</span>
                    <Truck className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Shadowfax 3PL</h3>
                    <p className="text-xs text-rose-100/70 leading-relaxed">
                      Automated Air Waybill (AWB) generation with 7-stage live tracking and free reprint guarantee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 03: CATALOG & CUSTOMIZER WORKSPACE (Soft Blush #FCEAEF)
              ========================================================================= */}
          <section className="bg-[#FCEAEF] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-pink-200/50 relative overflow-hidden">
            <div className="max-w-[1140px] mx-auto">
              <div className="flex items-center justify-between mb-10 pb-2">
                <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-500">
                  03 / CATALOG & CUSTOMIZER WORKSPACE
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-12 h-px bg-[#9E1B32]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#9E1B32]">
                    PRODUCT DETAIL
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Typography Block */}
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-[#111111] leading-[0.96] tracking-[-0.035em]">
                    Print it.<br />
                    Frame it.<br />
                    Love it.
                  </h2>

                  <p className="text-sm sm:text-[15px] text-neutral-600 leading-[1.65] font-normal max-w-md pt-2">
                    The mobile studio turns digital artwork into tangible gallery prints—surfacing standard dimensions, reactive pricing, finish previews, and related category collections.
                  </p>

                  <div className="pt-2 space-y-2 text-xs font-mono text-neutral-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#9E1B32]" />
                      <span>Standard Formats: A5 (₹39) · A4 (₹59) · A3 (₹99)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#9E1B32]" />
                      <span>Glassmorphic cards & animated gradient ambient blobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#9E1B32]" />
                      <span>Emoji taxonomy: Anime, Cinema, Music, Sports & Art</span>
                    </div>
                  </div>
                </div>

                {/* Right Dual Premium Smartphone Mockups */}
                <div className="lg:col-span-7 flex items-center justify-center relative min-h-[540px]">
                  {/* Back Left Phone (Tilted Left) - Kechi Home */}
                  <div className="absolute left-0 sm:left-4 top-8 z-10 transition-transform hover:scale-105 duration-300">
                    <PremiumPhoneFrame
                      imageSrc="/screenshots/kechi/kechi-home.png"
                      alt="Kechi Discovery Feed"
                      width={230}
                      height={470}
                      rotate={-8}
                      showButtons={true}
                      glare={true}
                    />
                  </div>

                  {/* Front Right Phone (Tilted Right, In Focus) - Rosé Detail */}
                  <div className="relative z-20 translate-x-12 sm:translate-x-16 transition-transform hover:scale-105 duration-300">
                    <PremiumPhoneFrame
                      imageSrc="/screenshots/kechi/kechi-detail.png"
                      alt="Rosé Magazine Style Detail Customizer"
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
              SECTION 04: SMART CART & REGIONAL INGESTION
              ========================================================================= */}
          <section className="bg-[#F8FAF8] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60 relative overflow-hidden">
            {/* Soft Warm Blush Glow */}
            <div
              className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-30 blur-3xl"
              style={{ background: "#FFDCD5" }}
            />

            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Phone Visual with Floating Badges */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
                {/* Floating Pill Left: MIN 4 POSTERS */}
                <div className="absolute -left-3 sm:left-2 top-28 z-30 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 border border-white/20">
                  <Package className="w-3.5 h-3.5 text-rose-400" />
                  <span>MIN 4 POSTERS REQUIRED</span>
                </div>

                {/* Floating Pill Right: NCR VALIDATED */}
                <div className="absolute -right-3 sm:right-2 bottom-24 z-30 px-4 py-2 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-2 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NCR REGIONAL VALIDATED</span>
                </div>

                {/* Premium Phone Mockup (Cart Screen) */}
                <PremiumPhoneFrame
                  imageSrc="/screenshots/kechi/kechi-cart.png"
                  alt="Kechi Cart & Checkout Screen"
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
                  <span>VALIDATE</span>
                  <span>→</span>
                  <span className="text-[#9E1B32] font-black">DISPATCH</span>
                </div>
              </div>

              {/* Right Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                  04 / SMART CART & REGIONAL LOGIC
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-[1.05] tracking-[-0.03em]">
                  Intelligent gates for custom press fulfillment.
                </h2>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  Custom print runs require operational order minimums. Kechi embeds reactive checkout rules alongside an automated NCR regional validator to guarantee delivery SLAs.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-[#9E1B32]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Intelligent Regional Validator (ncrHelper)</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-light">
                    Validates pin codes across Delhi, Gurgaon, Noida, Ghaziabad, Faridabad, Sonipat, Meerut, and Alwar to provide accurate freight calculations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Dynamic Free Delivery Tier</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-light">
                    Standard flat ₹39 delivery automatically drops to ₹0 when 7 or more prints are added to cart.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 05: 3PL LOGISTICS & TRACKING
              ========================================================================= */}
          <section className="bg-[#100C0F] text-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-rose-300/80 mb-8">
                05 / 3PL LOGISTICS & REAL-TIME TRACKING
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 border-b border-white/15 pb-12">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-[-0.03em]">
                    Real-time Shadowfax courier pipeline.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                    Automated Air Waybill (AWB) generation and 7-stage order status synchronization from press to door.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center mb-6">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      7-Stage Order Lifecycle
                    </h3>
                    <p className="text-xs font-mono text-[#00E5FF] mb-4">
                      Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Out for Delivery ➔ Delivered
                    </p>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                      Deep-link tracking via tracker.shadowfax.in with one-tap AWB copy and dedicated Android notification channel <code className="text-[#00E5FF]">kechi_order_updates</code>.
                    </p>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#9E1B32]/20 text-rose-300 flex items-center justify-center mb-6">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Razorpay Gateway & COD
                    </h3>
                    <p className="text-xs font-mono text-rose-300 mb-4">
                      UPI (GPay / PhonePe / Paytm) · Cards · NetBanking · COD
                    </p>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                      Dynamic key negotiation endpoint (/payment/config) preventing client-side secret exposure, backed by cryptographic server verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 06: ZERO-DEFECT GUARANTEE
              ========================================================================= */}
          <section className="bg-[#FFF2EF] px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-rose-200/60">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#9E1B32] mb-8">
                06 / DEFECT REPLACEMENT & ASSURANCE
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-[1.05] tracking-[-0.03em]">
                    100% free reprint on transit damage.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    Physical prints demand customer trust. Kechi embeds an in-app photo proof claim flow with direct Cloudinary upload and one-tap admin reprint dispatch.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs">
                  <Camera className="w-5 h-5 text-[#9E1B32] mb-3" />
                  <h4 className="text-base font-bold text-neutral-900 mb-1">
                    Multi-Photo Proof
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Capture damaged corners or paper crinkles; uploaded directly to Cloudinary.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs">
                  <RefreshCw className="w-5 h-5 text-[#9E1B32] mb-3" />
                  <h4 className="text-base font-bold text-neutral-900 mb-1">
                    Replacement State
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Requested ➔ Approved ➔ In Production ➔ Shipped ➔ Delivered.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs">
                  <BellRing className="w-5 h-5 text-[#9E1B32] mb-3" />
                  <h4 className="text-base font-bold text-neutral-900 mb-1">
                    Automated Emails
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Transactional emails guarantee 100% free reprint without return paperwork.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 07: SYSTEM ARCHITECTURE
              ========================================================================= */}
          <section className="bg-white px-6 sm:px-14 lg:px-20 py-20 lg:py-28 border-b border-neutral-200/60">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-8">
                07 / SYSTEM ARCHITECTURE
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 leading-[1.05] tracking-[-0.03em]">
                    Resilient full-stack e-commerce architecture.
                  </h2>
                </div>
                <div className="lg:col-span-5 pt-2">
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    Decoupled microservice layers separating mobile clients from cloud print queues, 3PL couriers, and payment verification.
                  </p>
                </div>
              </div>

              {/* 5 Architecture Layer Cards */}
              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Mobile App (Flutter & GetX)",
                    desc: "Reactive state management, optimistic UI caching, dynamic theme blobs, and pinch-to-zoom inspect.",
                    tech: "Dart · GetX · PhotoView",
                  },
                  {
                    num: "02",
                    title: "Backend REST API (Node.js & Express)",
                    desc: "JWT auth, bcrypt hashing, 6-digit TTL OTP verification, NCR pincode routing, and order state machines.",
                    tech: "Express.js · Mongoose · Helmet",
                  },
                  {
                    num: "03",
                    title: "Database Layer (MongoDB)",
                    desc: "Product catalogs, customer address book with NCR tagging, and 10-minute auto-expiring TTL OTPs.",
                    tech: "MongoDB Atlas · TTL Indexes",
                  },
                  {
                    num: "04",
                    title: "Media CDN & Payments Gateway",
                    desc: "Cloudinary CDN for ultra-high-resolution print file storage; Razorpay API for authenticated UPI and card payments.",
                    tech: "Cloudinary REST · Razorpay",
                  },
                  {
                    num: "05",
                    title: "Logistics, Messaging & Admin Portal",
                    desc: "Shadowfax 3PL API for automated AWB generation, FCM push notifications, and in-app AdminPostersView portal.",
                    tech: "Shadowfax 3PL · Firebase FCM · Nodemailer",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-6 rounded-2xl bg-[#FAF9F9] border border-neutral-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-mono font-bold text-[#9E1B32]">
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
                    <span className="text-xs font-mono text-[#9E1B32] self-start md:self-center shrink-0">
                      {item.tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 08: CONTRIBUTION & FOOTER
              ========================================================================= */}
          <section className="bg-[#1A0A10] text-white pt-20 pb-12 px-6 sm:px-14 lg:px-20">
            <div className="max-w-[1100px] mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/screenshots/kechi/kechi-logo.jpg"
                      alt="Kechi Logo"
                      className="w-10 h-10 rounded-xl object-cover shadow-md border border-amber-500/40"
                    />
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white">
                        Kechi Studio
                      </h3>
                      <p className="text-xs font-mono text-rose-300">
                        Custom Print-on-Demand Studio & E-Commerce Platform
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm max-w-xl font-light">
                    Designed and built end-to-end by{" "}
                    <strong className="text-white font-medium">Swastika Singh</strong> as a production-grade full-stack mobile e-commerce platform.
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
                    className="px-6 py-2.5 rounded-full bg-[#9E1B32] hover:bg-[#831427] text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#9E1B32]/30"
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
                  <span>RAZORPAY</span>
                  <span>SHADOWFAX</span>
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
