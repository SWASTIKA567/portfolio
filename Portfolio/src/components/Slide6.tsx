import { useState } from "react";
import { ABOUT, CONTACT } from "@/data/portfolio";

export function Slide6() {
  const [copied, setCopied] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", msg: "" });
  const [sent, setSent] = useState(false);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  const channels = [
    {
      key: "email",
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: "✉",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: CONTACT.linkedin,
      href: `https://${CONTACT.linkedin}`,
      icon: "in",
    },
    {
      key: "github",
      label: "GitHub",
      value: CONTACT.github,
      href: `https://${CONTACT.github}`,
      icon: "◆",
    },
    {
      key: "phone",
      label: "Phone",
      value: ABOUT.contact.phone,
      href: `tel:${ABOUT.contact.phone.replace(/\s/g, "")}`,
      icon: "☎",
    },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.msg.trim()) return;
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(form.msg);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  };

  return (
    <section
      className="slide"
      style={{
        background: "#fff",
        color: "#111",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes blob-a { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,-40px) scale(1.15)} }
        @keyframes blob-b { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,50px) scale(1.1)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.8);opacity:0} }
        .c-blob { position:absolute; border-radius:999px; filter:blur(80px); opacity:.22; pointer-events:none; }
        .c-card {
          background: #fff;
          border: 1px solid #f0d7e6;
          border-radius: 18px;
          padding: 18px 20px;
          display:flex; align-items:center; gap:14px;
          cursor:pointer;
          transition: all .35s cubic-bezier(.2,.7,.2,1);
          box-shadow: 0 2px 12px rgba(212,86,154,0.06);
        }
        .c-card:hover {
          transform: translateY(-4px);
          border-color: #d4569a;
          background: rgba(212,86,154,0.04);
          box-shadow: 0 18px 50px -20px rgba(212,86,154,0.25);
        }
        .c-icon {
          width:44px; height:44px; border-radius:12px;
          background: linear-gradient(135deg,#d4569a,#e88cb8);
          display:flex; align-items:center; justify-content:center;
          font-weight:700; color:#fff; font-size:18px; flex-shrink:0;
          font-family: Georgia, serif;
        }
        .c-input {
          width:100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          color:#fff; padding: 12px 14px; border-radius: 12px;
          font-size: 14px; outline:none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          font-family: inherit;
          box-shadow: 0 1px 4px rgba(212,86,154,0.04);
        }
        .c-input:focus { border-color:#d4569a; background: rgba(212,86,154,0.03); box-shadow: 0 0 0 3px rgba(212,86,154,0.08); }
        .c-input::placeholder { color: #b08a9e; }
        .c-send {
          background: linear-gradient(135deg,#d4569a,#e88cb8);
          color:#fff; border:none; padding: 13px 28px;
          border-radius: 999px; font-weight:600; font-size:14px;
          cursor:pointer; letter-spacing:.5px;
          transition: transform .2s, box-shadow .2s;
        }
        .c-send:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(212,86,154,.45); }
        .c-avail {
          display:inline-flex; align-items:center; gap:10px;
          padding: 8px 16px; border-radius: 999px;
          background: rgba(80,200,120,0.10); border: 1px solid rgba(80,200,120,0.25);
          font-size:12px; color:#2a8a4a; letter-spacing:.5px;
          position: relative;
        }
        .c-dot { width:8px; height:8px; border-radius:999px; background:#4ade80; position:relative; }
        .c-dot::after {
          content:""; position:absolute; inset:-2px; border-radius:999px;
          background:#4ade80; animation: pulse-ring 1.6s ease-out infinite;
        }
        .c-toast {
          position:absolute; top:-34px; left:50%; transform:translateX(-50%);
          background:#111; color:#fff; font-size:11px; font-weight:600;
          padding: 6px 12px; border-radius:6px; white-space:nowrap;
          animation: fade-in .2s ease-out;
        }
      `}</style>

      <div
        className="c-blob"
        style={{
          width: 480,
          height: 480,
          background: "#d4569a",
          top: -120,
          left: -120,
          animation: "blob-a 14s ease-in-out infinite",
        }}
      />
      <div
        className="c-blob"
        style={{
          width: 420,
          height: 420,
          background: "#7c3aed",
          bottom: -100,
          right: -80,
          animation: "blob-b 16s ease-in-out infinite",
        }}
      />

      <div style={{ maxWidth: 1080, width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="c-avail">
            <span className="c-dot" /> Available for opportunities
          </span>
          <p className="script" style={{ fontSize: 32, color: "#d4569a", margin: "18px 0 0" }}>
            Let's create something
          </p>
          <h2
            style={{ fontSize: 56, fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.03em" }}
          >
            together.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* LEFT — channels */}
          <div style={{ display: "grid", gap: 12 }}>
            {channels.map((c) => (
              <div
                key={c.key}
                className="c-card"
                onMouseEnter={() => setHover(c.key)}
                onMouseLeave={() => setHover(null)}
                onClick={() =>
                  window.open(c.href, c.key === "email" || c.key === "phone" ? "_self" : "_blank")
                }
                style={{ position: "relative" }}
              >
                {copied === c.key && <span className="c-toast">Copied!</span>}
                <div className="c-icon">{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#a87a92",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#111",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.value}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copy(c.key, c.value);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #f0d7e6",
                    color: hover === c.key ? "#d4569a" : "#b08a9e",
                    padding: "6px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  copy
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT — form */}
          <form
            onSubmit={submit}
            style={{
              background: "#fff",
              border: "1px solid #f0d7e6",
              borderRadius: 22,
              padding: 26,
              display: "grid",
              gap: 14,
              boxShadow: "0 4px 24px rgba(212,86,154,0.06)",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: "#a87a92",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Your name
              </label>
              <input
                className="c-input"
                type="text"
                maxLength={80}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                style={{ marginTop: 6 }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: "#a87a92",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Message
              </label>
              <textarea
                className="c-input"
                maxLength={600}
                rows={4}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                placeholder="Tell me about your project..."
                style={{ marginTop: 6, resize: "none", fontFamily: "inherit" }}
              />
              <div style={{ textAlign: "right", fontSize: 10, color: "#b08a9e", marginTop: 4 }}>
                {form.msg.length}/600
              </div>
            </div>
            <button type="submit" className="c-send">
              {sent ? "Opening mail ✓" : "Send message →"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: "#a87a92",
            fontSize: 13,
            maxWidth: 560,
            margin: "32px auto 0",
          }}
        >
          "{CONTACT.closing}"
        </p>
        <p style={{ marginTop: 24, textAlign: "center", fontSize: 11, color: "#c9a8b8" }}>
          © 2026 Swastika Singh · Built with care
        </p>
      </div>
    </section>
  );
}
