import { useState, useEffect } from "react";
import type { Project } from "@/data/portfolio";

type Props = {
  project: Project;
  scale?: number;
  paused?: boolean;
  autoplay?: boolean;
};

export function PhoneFrame({ project, scale = 1, paused = false, autoplay = false }: Props) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [started, setStarted] = useState(autoplay);
  const [hovering, setHovering] = useState(false);
  const total = project.screenshots.length;

  useEffect(() => {
   if (total < 2 || paused || !started || hovering) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % total), 2200);
    return () => clearInterval(t);
  }, [total, paused, started, hovering]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
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
        onMouseLeave={() => setHovering(false)}
      style={{
        width: W * scale,
        height: H * scale,
        transition: "width 0.5s ease, height 0.5s ease",
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          transition: "transform 0.5s ease",
          background:
            "linear-gradient(145deg, #2a2a2e 0%, #0b0b0d 45%, #1a1a1d 100%)",
          borderRadius: 48,
          padding: 8,
          boxShadow:
           "0 40px 80px -20px rgba(0,0,0,0.55), 0 12px 28px -10px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 1.5px 0 rgba(255,255,255,0.15), inset 0 -1.5px 0 rgba(255,255,255,0.04)",
          position: "relative",
           cursor: !started && total > 1 ? "pointer" : "default",
        }}
      >
         {/* side buttons */}
        <div style={{ position: "absolute", left: -2, top: 110, width: 3, height: 30, background: "linear-gradient(90deg,#000,#444)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -2, top: 160, width: 3, height: 50, background: "linear-gradient(90deg,#000,#444)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -2, top: 220, width: 3, height: 50, background: "linear-gradient(90deg,#000,#444)", borderRadius: 2 }} />
        <div style={{ position: "absolute", right: -2, top: 170, width: 3, height: 80, background: "linear-gradient(-90deg,#000,#444)", borderRadius: 2 }} />
        {/* screen */}
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
            boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.85)",
          }}
        >
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 95,
              height: 26,
              background: "#000",
              
              borderRadius: 16,
              zIndex: 4,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />

          {total === 0 ? (
            // placeholder
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
              {/* sliding strip */}
              <div
                style={{
                  display: "flex",
                  width: `${total * 100}%`,
                  height: "100%",
                   transform: `translateX(-${displayIndex * (100 / total)}%)`,
                  transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
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

              {/* dots */}
             {!started && total > 1 && !paused && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 50,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    fontSize: 11,
                    padding: "6px 12px",
                    borderRadius: 999,
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    zIndex: 5,
                    letterSpacing: 0.4,
                  }}
                >
                  tap to play ▶
                </div>
              )}
              {/* dots */}
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
                    zIndex: 3,
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
                        width: current === i ? 18 : 6,
                        height: 6,
                        borderRadius: 3,
                        background:
                          current === i
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.4)",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        transition: "width 0.25s ease",
                      }}
                    />
                  ))}
                   {/* glass reflection overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 40,
              pointerEvents: "none",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 22%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.08) 100%)",
              mixBlendMode: "overlay",
              zIndex: 2,
            }}
          />
          {/* subtle inner border highlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 40,
              pointerEvents: "none",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              zIndex: 2,
            }}
          />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}