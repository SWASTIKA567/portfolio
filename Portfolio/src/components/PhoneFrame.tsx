import React, { useState, useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";

type Props = {
  project: Project;
  scale?: number;
  paused?: boolean;
  autoplay?: boolean;
  enableTilt?: boolean;
};

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

  // 3D Tilt states
  const targetTiltX = useRef(0);
  const targetTiltY = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (total < 2 || paused || !started || hovering) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % total), 2400);
    return () => clearInterval(t);
  }, [total, paused, started, hovering]);

  // Smooth lerp for phone 3D tilt
  useEffect(() => {
    if (!enableTilt) return;

    const loop = () => {
      currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.1;
      currentTiltY.current += (targetTiltY.current - currentTiltY.current) * 0.1;

      if (phoneRef.current) {
        phoneRef.current.style.transform = `scale(${scale}) perspective(1000px) rotateX(${currentTiltX.current.toFixed(
          2
        )}deg) rotateY(${currentTiltY.current.toFixed(2)}deg)`;
      }

      if (glareRef.current) {
        const gx = 50 + currentTiltY.current * 3;
        const gy = 50 - currentTiltX.current * 3;
        glareRef.current.style.background = `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 70%)`;
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRel = (x / rect.width) * 2 - 1;
    const yRel = (y / rect.height) * 2 - 1;

    // Subtle 3D tilt up to 10 degrees
    targetTiltX.current = -yRel * 10;
    targetTiltY.current = xRel * 10;
  };

  const handleMouseLeave = () => {
    setHovering(false);
    targetTiltX.current = 0;
    targetTiltY.current = 0;
  };

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || total < 2) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 30) setCurrent((p) => (p + 1) % total);
    if (diff < -30) setCurrent((p) => (p - 1 + total) % total);
    setTouchStart(null);
  };

  const W = 270;
  const H = 555;
  const showSlider = total > 0 && started;
  const displayIndex = total > 0 ? (showSlider ? current : 0) : 0;

  return (
    <div
      onClick={() => {
        if (!started && total > 1) setStarted(true);
      }}
      onMouseEnter={() => setHovering(true)}
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
          transition: "box-shadow 0.4s ease",
          background:
            "linear-gradient(145deg, #323236 0%, #151518 40%, #0d0d0f 70%, #202025 100%)",
          borderRadius: 48,
          padding: 8,
          boxShadow: hovering
            ? "0 50px 100px -20px rgba(0,0,0,0.65), 0 25px 50px -15px rgba(236,72,153,0.2), inset 0 0 0 1.5px rgba(255,255,255,0.22), inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 2px rgba(0,0,0,0.6)"
            : "0 40px 80px -20px rgba(0,0,0,0.55), 0 12px 28px -10px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.12), inset 0 1.5px 0 rgba(255,255,255,0.2), inset 0 -1.5px 0 rgba(255,255,255,0.04)",
          position: "relative",
          cursor: !started && total > 1 ? "pointer" : "default",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Extruded metallic side buttons with 3D highlights */}
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 110,
            width: 3.5,
            height: 32,
            background: "linear-gradient(180deg, #555 0%, #222 50%, #444 100%)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 160,
            width: 3.5,
            height: 52,
            background: "linear-gradient(180deg, #555 0%, #222 50%, #444 100%)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 220,
            width: 3.5,
            height: 52,
            background: "linear-gradient(180deg, #555 0%, #222 50%, #444 100%)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -3,
            top: 170,
            width: 3.5,
            height: 82,
            background: "linear-gradient(180deg, #555 0%, #222 50%, #444 100%)",
            borderRadius: "0 2px 2px 0",
            boxShadow: "1px 0 2px rgba(0,0,0,0.5)",
          }}
        />

        {/* Outer Bevel Rim */}
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: 44,
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />

        {/* Screen */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 40,
            overflow: "hidden",
            background: project.color,
            position: "relative",
            boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.9), inset 0 0 12px rgba(0,0,0,0.4)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Dynamic Island / Notch with camera lens and micro sensor */}
          <div
            style={{
              position: "absolute",
              top: 11,
              left: "50%",
              transform: "translateX(-50%)",
              width: 96,
              height: 26,
              background: "#000",
              borderRadius: 16,
              zIndex: 10,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12), 0 2px 6px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
            {/* Camera sensor */}
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "radial-gradient(circle, #1a2a40 20%, #080d15 80%)",
                boxShadow: "inset 0 0 2px rgba(0,180,255,0.4)",
              }}
            />
            {/* Speaker bar */}
            <div
              style={{
                width: 38,
                height: 3.5,
                borderRadius: 2,
                background: "#151515",
              }}
            />
          </div>

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
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 0.5 }}>
                {project.name}
              </div>
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
              {/* Sliding strip of screenshots */}
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

              {/* Tap to play prompt if not started */}
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
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  tap to play ▶
                </div>
              )}

              {/* Dots navigation */}
              {total > 1 && started && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
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
                        background:
                          current === i
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.4)",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Dynamic 3D Curved Glass Specular Sheen */}
              <div
                ref={glareRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 40,
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                  zIndex: 6,
                  transition: "background 0.2s ease",
                }}
              />

              {/* Subtle glass edge reflection */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 40,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.03) 30%, transparent 60%, rgba(255,255,255,0.1) 100%)",
                  zIndex: 7,
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}