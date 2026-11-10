import { useState, useRef, useEffect } from "react";
import { ABOUT, CONTACT } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tilt3D } from "@/components/Tilt3D";
import { Mail, Linkedin, Github, Phone, Copy, Check, Send, Sparkles } from "lucide-react";

export function Slide6() {
  const [copied, setCopied] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", msg: "" });
  const [sent, setSent] = useState(false);

  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // 3D Parallax on background blobs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-x}px, ${-y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1800);
    } catch {}
  };

  const channels = [
    {
      key: "email",
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: <Mail className="w-5 h-5 text-white" />,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: CONTACT.linkedin,
      href: `https://${CONTACT.linkedin}`,
      icon: <Linkedin className="w-5 h-5 text-white" />,
    },
    {
      key: "github",
      label: "GitHub",
      value: CONTACT.github,
      href: `https://${CONTACT.github}`,
      icon: <Github className="w-5 h-5 text-white" />,
    },
    {
      key: "phone",
      label: "Phone",
      value: ABOUT.contact.phone,
      href: `tel:${ABOUT.contact.phone.replace(/\s/g, "")}`,
      icon: <Phone className="w-5 h-5 text-white" />,
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
      className="slide relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#111",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.8);opacity:0} }
        .c-blob { position:absolute; border-radius:999px; filter:blur(80px); opacity:.22; pointer-events:none; transition: transform 0.4s ease-out; }
      `}</style>

      {/* 3D Floating Blobs */}
      <div
        ref={blob1Ref}
        className="c-blob"
        style={{
          width: 520,
          height: 520,
          background: "#ec4899",
          top: -140,
          left: -140,
        }}
      />
      <div
        ref={blob2Ref}
        className="c-blob"
        style={{
          width: 480,
          height: 480,
          background: "#a855f7",
          bottom: -120,
          right: -100,
        }}
      />

      <div style={{ maxWidth: 1100, width: "100%", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <ScrollReveal animation="3d-rise">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
           
              

            <p className="script" style={{ fontSize: 36, color: "#d4569a", margin: "18px 0 0" }}>
              Let's create something
            </p>
            <h2
              style={{
                fontSize: "clamp(38px, 6vw, 64px)",
                fontWeight: 800,
                margin: "4px 0 0",
                letterSpacing: "-0.03em",
              }}
            >
              together.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* LEFT — 3D Contact Channel Cards (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <ScrollReveal animation="3d-rise" delay={150}>
              <div className="space-y-3.5">
                {channels.map((c) => (
                  <Tilt3D
                    key={c.key}
                    maxTilt={12}
                    perspective={900}
                    scale={1.03}
                    glare={true}
                    glareMaxOpacity={0.2}
                    className="w-full"
                  >
                    <div
                      onMouseEnter={() => setHover(c.key)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() =>
                        window.open(
                          c.href,
                          c.key === "email" || c.key === "phone" ? "_self" : "_blank"
                        )
                      }
                      className="relative bg-white/90 hover:bg-white backdrop-blur-md border border-pink-100 hover:border-pink-300 rounded-2xl p-4 md:p-5 flex items-center gap-4 cursor-pointer shadow-md hover:shadow-xl hover:shadow-pink-900/10 transition-all duration-300"
                    >
                      {/* Copied Toast */}
                      {copied === c.key && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-lg flex items-center gap-1 z-30 animate-bounce">
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </span>
                      )}

                      {/* 3D Icon */}
                      <div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/30 transition-transform duration-300 group-hover:scale-110"
                        style={{ transform: "translateZ(18px)" }}
                      >
                        {c.icon}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0" style={{ transform: "translateZ(12px)" }}>
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-pink-600">
                          {c.label}
                        </div>
                        <div className="text-sm font-semibold text-neutral-900 truncate">
                          {c.value}
                        </div>
                      </div>

                      {/* Copy button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copy(c.key, c.value);
                        }}
                        className="p-2 rounded-lg border border-pink-100 hover:border-pink-300 text-neutral-400 hover:text-pink-600 bg-pink-50/50 hover:bg-pink-50 transition-all duration-200 cursor-pointer shadow-xs active:scale-90"
                        title="Copy to clipboard"
                        style={{ transform: "translateZ(15px)" }}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </Tilt3D>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT — 3D Contact Form (6 cols) */}
          <div className="md:col-span-6">
            <ScrollReveal animation="3d-rise" delay={250}>
              <Tilt3D
                maxTilt={8}
                perspective={1000}
                scale={1.01}
                glare={false}
                className="w-full"
              >
                <form
                  onSubmit={submit}
                  className="bg-white/90 backdrop-blur-md border border-pink-100/90 rounded-3xl p-7 md:p-8 shadow-xl shadow-pink-900/5 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-1">
                    <h3 className="font-bold text-lg text-neutral-900">Send a Direct Note</h3>
                    <Sparkles className="w-4 h-4 text-pink-500" />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      maxLength={80}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Swastika Singh"
                      className="w-full bg-neutral-50/80 border border-neutral-200/80 focus:border-pink-400 rounded-xl px-4 py-3 text-sm text-neutral-900 outline-none transition-all duration-200 focus:bg-white focus:ring-3 focus:ring-pink-400/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block mb-1.5">
                      Message
                    </label>
                    <textarea
                      maxLength={600}
                      rows={4}
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      placeholder="Tell me about your project or idea..."
                      className="w-full bg-neutral-50/80 border border-neutral-200/80 focus:border-pink-400 rounded-xl px-4 py-3 text-sm text-neutral-900 outline-none transition-all duration-200 focus:bg-white focus:ring-3 focus:ring-pink-400/20 resize-none font-sans"
                      required
                    />
                    <div className="text-right text-[10px] text-neutral-400 mt-1">
                      {form.msg.length}/600
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sent ? "Opening Mail Client ✓" : "Send Message"}</span>
                  </button>
                </form>
              </Tilt3D>
            </ScrollReveal>
          </div>
        </div>

        {/* Footer Quote */}
        <ScrollReveal animation="3d-rise" delay={400}>
          <p className="text-center italic text-neutral-500 text-xs md:text-sm max-w-xl mx-auto mt-12">
            "{CONTACT.closing}"
          </p>
          <p className="mt-5 text-center text-xs text-neutral-400 font-medium">
            © 2026 Swastika Singh · Built with 3D Care
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
