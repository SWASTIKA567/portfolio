import { useState } from "react";
import { PROJECTS } from "@/data/portfolio.ts";
import { PhoneFrame } from "@/components/PhoneFrame";

export function Slide3() {
  const [active, setActive] = useState<number | null>(null);
  const activeProject = active !== null ? PROJECTS[active] : null;

  return (
    <section className="slide" style={{ background: "#fafafa" }}>
      <div style={{ width: "100%", maxWidth: 1180 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p className="script" style={{ fontSize: 28, color: "#d4569a", margin: 0 }}>
            Projects
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 600, margin: "4px 0 0" }}>featured work</h2>
          {active !== null && (
            <p style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
              tap the phone again to close
            </p>
          )}
        </div>

        {/* Stage */}
        <div
          style={{
            position: "relative",
            minHeight: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Row of phones */}
          <div
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
              transition: "opacity 0.4s ease, transform 0.5s ease",
              opacity: active !== null ? 0 : 1,
              transform: active !== null ? "translateY(20px)" : "translateY(0)",
              pointerEvents: active !== null ? "none" : "auto",
            }}
          >
            {PROJECTS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <PhoneFrame project={p} paused />
              </button>
            ))}
          </div>

          {/* Active detail view */}
          {activeProject && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 60,
                flexWrap: "wrap",
                padding: "0 20px",
                animation: "fade-in 0.5s ease both",
              }}
            >
              {/* phone left */}
              <div
                onClick={() => setActive(null)}
                style={{ cursor: "pointer", animation: "slide-in-left 0.5s ease both" }}
              >
                <PhoneFrame project={activeProject} autoplay />
              </div>

              {/* details right */}
              <div
                style={{
                  maxWidth: 380,
                  animation: "slide-in-right 0.5s ease 0.05s both",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#d4569a",
                    margin: 0,
                  }}
                >
                  Project {String(active! + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontSize: 42, fontWeight: 600, margin: "6px 0 12px" }}>
                  {activeProject.name}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#333",
                    margin: "0 0 18px",
                  }}
                >
                  {activeProject.desc}
                </p>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "#ffeaf4",
                    color: "#b83573",
                    fontWeight: 500,
                    marginBottom: 14,
                  }}
                >
                  {activeProject.highlight}
                </div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>
                  <strong style={{ color: "#222" }}>Tech:</strong> {activeProject.tech}
                </div>

                <button
                  onClick={() => setActive(null)}
                  style={{
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: 999,
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  ← Back to all projects
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
