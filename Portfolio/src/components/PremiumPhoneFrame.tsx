import React from "react";

interface PremiumPhoneFrameProps {
  imageSrc?: string;
  screenshotUrl?: string; // alias for compatibility
  alt?: string;
  altText?: string; // alias for compatibility
  width?: number; // width in px, default 280
  height?: number; // height in px, default 580
  rotate?: number; // rotation in deg
  showButtons?: boolean;
  glare?: boolean;
  className?: string;
  badge?: React.ReactNode;
  variant?: "silver" | "gold" | "slate" | "black";
}

export function PremiumPhoneFrame({
  imageSrc,
  screenshotUrl,
  alt,
  altText,
  width = 280,
  height = 580,
  rotate = 0,
  showButtons = true,
  glare = true,
  className = "",
  badge,
  variant = "black",
}: PremiumPhoneFrameProps) {
  const finalSrc = imageSrc || screenshotUrl || "";
  const finalAlt = alt || altText || "App Screen";

  // Bezel border styles
  const bezelGradients: Record<string, string> = {
    silver: "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 40%, #d1d5db 70%, #4b5563 100%)",
    gold: "linear-gradient(135deg, #fef3c7 0%, #d97706 40%, #fde68a 70%, #78350f 100%)",
    slate: "linear-gradient(135deg, #64748b 0%, #334155 40%, #475569 70%, #0f172a 100%)",
    black: "linear-gradient(135deg, #4b5563 0%, #1f2937 40%, #374151 70%, #111827 100%)",
  };

  const bezelBg = bezelGradients[variant] || bezelGradients.black;

  return (
    <div
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: "center center",
      }}
      className={`relative inline-block select-none transition-transform duration-500 ${className}`}
    >
      {/* ── Hardware Buttons (Volume & Power) ── */}
      {showButtons && (
        <>
          {/* Action Button (Left Top) */}
          <div className="absolute -left-[3px] top-[72px] w-[3px] h-6 bg-gradient-to-r from-neutral-500 to-neutral-700 rounded-l-xs shadow-xs" />
          {/* Volume Up Button (Left) */}
          <div className="absolute -left-[3px] top-[110px] w-[3px] h-10 bg-gradient-to-r from-neutral-500 to-neutral-700 rounded-l-xs shadow-xs" />
          {/* Volume Down Button (Left) */}
          <div className="absolute -left-[3px] top-[162px] w-[3px] h-10 bg-gradient-to-r from-neutral-500 to-neutral-700 rounded-l-xs shadow-xs" />
          {/* Power / Side Button (Right) */}
          <div className="absolute -right-[3px] top-[125px] w-[3px] h-14 bg-gradient-to-l from-neutral-500 to-neutral-700 rounded-r-xs shadow-xs" />
        </>
      )}

      {/* ── Outer Metallic Bezel Rim ── */}
      <div
        className="p-[3.5px] rounded-[52px] shadow-[0_35px_90px_-20px_rgba(0,0,0,0.55),0_15px_40px_-15px_rgba(0,0,0,0.35)]"
        style={{ background: bezelBg }}
      >
        {/* ── Inner Ultra-Dark OLED Housing ── */}
        <div className="p-[7px] sm:p-[8px] rounded-[49px] bg-[#0A0B0D] border border-neutral-800/80 relative">
          {/* Top Speaker Earpiece Grille Slit */}
          <div className="absolute top-[3.5px] left-1/2 -translate-x-1/2 w-14 h-[3.5px] bg-[#16181D] rounded-full z-40 border border-neutral-800/60" />

          {/* ── OLED Screen Surface ── */}
          <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className="relative rounded-[42px] overflow-hidden bg-[#111] shadow-inner flex flex-col"
          >
            {/* Dynamic Island / Sensor Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[98px] h-[22px] bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-md border border-neutral-900/60">
              {/* Front Camera Lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#080d1a] border border-neutral-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/40 shadow-[0_0_2px_#3b82f6]" />
              </div>
              {/* Ambient FaceID Sensor Dot */}
              <div className="w-2 h-2 rounded-full bg-[#111111]" />
            </div>

            {/* Screen Screenshot */}
            {finalSrc ? (
              <img
                src={finalSrc}
                alt={finalAlt}
                className="w-full h-full object-cover object-top scale-[1.04] select-none pointer-events-none"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-500 text-xs font-mono">
                No Preview
              </div>
            )}

            {/* Diagonal Specular Glare Reflection on Glass */}
            {glare && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 32%, transparent 50%, rgba(255,255,255,0.06) 100%)",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Optional Overlay Badge */}
      {badge && <div className="absolute z-50">{badge}</div>}
    </div>
  );
}
