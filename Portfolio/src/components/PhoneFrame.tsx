import React, { useState, useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";

type Props = {
  project: Project;
  scale?: number;
  paused?: boolean;
  autoplay?: boolean;
  enableTilt?: boolean;
};

// ✦ CHANGED — exact side-button gradient from the premium preview
const BTN = "linear-gradient(#b4b9b5, #6f7471)";

export function PhoneFrame({
  project,
  scale = 1,
  paused = false,
  autoplay = false,
  enableTilt = true,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [started, setStarted] = useState(autoplay);
  const [hovering, setHovering] = useState(false);
  const total = project.screenshots.length;

  const phoneRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const targetTiltX = useRef(0);
  const targetTiltY = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);
  const targetLift = useRef(0); // ✦ CHANGED — hover lift like the preview
  const currentLift = useRef(0); // ✦ CHANGED
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (total < 2 || paused || !started || hovering) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % total), 2400);
    return () => clearInterval(t);
  }, [total, paused, started, hovering]);

  useEffect(() => {
    if (!enableTilt) return;

    const loop = () => {
      currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.1;
      currentTiltY.current += (targetTiltY.current - currentTiltY.current) * 0.1;
      currentLift.current += (targetLift.current - currentLift.current) * 0.1; // ✦ CHANGED

      if (phoneRef.current) {
        // ✦ CHANGED — translateY adds the lift
        phoneRef.current.style.transform = `scale(${scale}) translateY(${currentLift.current.toFixed(
          2
        )}px) perspective(1000px) rotateX(${currentTiltX.current.toFixed(
          2
        )}deg) rotateY(${currentTiltY.current.toFixed(2)}deg)`;
      }

      if (glareRef.current) {
        const gx = 50 + currentTiltY.current * 3;
        const gy = 50 - currentTiltX.current * 3;
        // ✦ CHANGED — softer moving glare so the preview look stays clean
        glareRef.current.style.background = `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 70%)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [enableTilt, scale]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const xRel = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yRel = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetTiltX.current = -yRel * 8; // ✦ CHANGED — slightly gentler tilt
    targetTiltY.current = xRel * 8;
  };

  const handleMouseEnter = () => {
    setHovering(true);
    targetLift.current = -6; // ✦ CHANGED
  };

  const handleMouseLeave = () => {
    setHovering(false);
    targetTiltX.current = 0;
    targetTiltY.current = 0;
    targetLift.current = 0; // ✦ CHANGED
  };

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || total < 2) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 30) setCurrent((p) => (p + 1) % total);
    if (diff < -30) setCurrent((p) => (p - 1 + total) % total);
    setTouchStart(null);
  };

  const W = 320; // ✦ CHANGED — larger phone
  const H = 686; // ✦ CHANGED — keeps the 9 : 19.3 ratio
  const showSlider = total > 0 && started;
  const displayIndex = total > 0 ? (showSlider ? current : 0) : 0;

  return (
    <div
      onClick={() => {
        if (!started && total > 1) setStarted(true);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: W * scale,
        height: H * scale,
        transition: "width 0.5s ease, height 0.5s ease",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={phoneRef}
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          // ✦ CHANGED — exact titanium frame from the preview
          background: "linear-gradient(145deg, #dfe2de, #8d928e 35%, #eceeea 60%, #7b807c)",
          borderRadius: 46,
          padding: 10,
          boxShadow:
            "0 0 0 1px rgba(0,0,0,.25), inset 0 0 0 1.5px rgba(255,255,255,.65), 0 40px 60px -28px rgba(20,48,31,.45), 0 14px 24px -14px rgba(0,0,0,.3)",
          position: "relative",
          cursor: !started && total > 1 ? "pointer" : "default",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* ✦ CHANGED — side buttons, same positions as preview */}
        {[
          { side: "left", top: "17%", h: 22 },
          { side: "left", top: "25%", h: 44 },
          { side: "left", top: "33%", h: 44 },
          { side: "right", top: "28%", h: 70 },
        ].map((b, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              [b.side]: -3,
              top: b.top,
              width: 3,
              height: b.h,
              background: BTN,
              borderRadius: 2,
            }}
          />
        ))}

        {/* ✦ CHANGED — black bezel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 37,
            background: "#050605",
            padding: 6,
            boxShadow: "inset 0 0 0 1px #1c1f1d",
          }}
        >
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 31,
              overflow: "hidden",
              background: project.color,
              position: "relative",
            }}
          >
            {/* ✦ CHANGED — island: 34% wide, 24px tall */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: "34%",
                height: 24,
                background: "#000",
                borderRadius: 20,
                zIndex: 10,
              }}
            />

            {/* ✦ CHANGED — dark home bar like the preview */}
            <div
              style={{
                position: "absolute",
                bottom: 9,
                left: "50%",
                transform: "translateX(-50%)",
                width: "34%",
                height: 4,
                borderRadius: 4,
                background: "rgba(0,0,0,.65)",
                zIndex: 9,
              }}
            />

            {total === 0 ? (
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
                <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 0.5 }}>{project.name}</div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
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
                <div
                  style={{
                    display: "flex",
                    width: `${total * 100}%`,
                    height: "100%",
                    transform: `translateX(-${displayIndex * (100 / total)}%)`,
                    transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {project.screenshots.map((src, i) => (
                    <div key={i} style={{ width: `${100 / total}%`, height: "100%", flexShrink: 0 }}>
                      <img
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top", // ✦ CHANGED
                          display: "block",
                        }}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>

                {!started && total > 1 && !paused && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 50,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(0,0,0,0.65)",
                      color: "#fff",
                      fontSize: 11,
                      padding: "6px 14px",
                      borderRadius: 999,
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      zIndex: 8,
                      letterSpacing: 0.4,
                    }}
                  >
                    tap to play ▶
                  </div>
                )}

                {total > 1 && started && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20, // ✦ CHANGED — above the home bar
                      left: 0,
                      right: 0,
                      display: "flex",
                      justifyContent: "center",
                      gap: 6,
                      zIndex: 8,
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
                          width: current === i ? 20 : 6,
                          height: 6,
                          borderRadius: 3,
                          background: current === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          transition: "all 0.25s ease",
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Moving glare (subtle) */}
            <div
              ref={glareRef}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                mixBlendMode: "screen",
                zIndex: 6,
              }}
            />

            {/* ✦ CHANGED — static glass glare, identical to preview */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "linear-gradient(115deg, rgba(255,255,255,.2), rgba(255,255,255,0) 38%)",
                zIndex: 7,
              }}
            />
          </div>
        </div>

        {/* ✦ CHANGED — floor shadow under the phone */}
        <div
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            bottom: -26,
            height: 18,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(20,48,31,.28), transparent)",
            filter: "blur(4px)",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}