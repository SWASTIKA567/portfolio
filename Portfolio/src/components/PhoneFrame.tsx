import { useState, useEffect } from "react";
import type { Project } from "@/data/portfolio";

export function PhoneFrame({
  project,
  scale = 1,
  paused = false,
}: {
  project: Project;
  scale?: number;
  paused?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = project.screenshots.length;

  useEffect(() => {
    if (total < 2 || paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % total), 2500);
    return () => clearInterval(t);
  }, [total, paused]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || total < 2) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 30) setCurrent((p) => (p + 1) % total);
    if (diff < -30) setCurrent((p) => (p - 1 + total) % total);
    setTouchStart(null);
  };

  // outer dimensions (base)
  const W = 200;
  const H = 410;

  return (
    <div
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
          background: "#0b0b0b",
          borderRadius: 36,
          padding: 7,
          boxShadow:
            "0 25px 50px -12px rgba(0,0,0,0.35), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
          position: "relative",
        }}
      >
        {/* screen */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 30,
            overflow: "hidden",
            background: project.color,
            position: "relative",
          }}
        >
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 70,
              height: 18,
              background: "#000",
              borderRadius: 12,
              zIndex: 3,
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
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0.5 }}>
                {project.name}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 10.5,
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
                  transform: `translateX(-${current * (100 / total)}%)`,
                  transition: "transform 0.5s ease",
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
              {total > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: 4,
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
                        width: current === i ? 14 : 5,
                        height: 5,
                        borderRadius: 3,
                        background:
                          current === i
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.35)",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        transition: "width 0.25s ease",
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
