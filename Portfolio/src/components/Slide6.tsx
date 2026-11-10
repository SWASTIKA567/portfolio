import { useState, useRef, useEffect } from "react";
import { CONTACT } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tilt3D } from "@/components/Tilt3D";
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";

export function Slide6() {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Parallax on decorative ambient blobs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 45;
      const y = (e.clientY / window.innerHeight - 0.5) * 45;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${-x}px, ${-y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const copy = async (e: React.MouseEvent, label: string, value: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const channels = [
    {
      key: "email",
      label: "Email",
      
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: <Mail className="w-5 h-5 text-white" />,
      gradient: "from-pink-500 to-rose-400",
      isExternal: false,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      
      value: CONTACT.linkedin,
      href: `https://${CONTACT.linkedin}`,
      icon: <Linkedin className="w-5 h-5 text-white" />,
      gradient: "from-blue-600 to-indigo-500",
      isExternal: true,
    },
    {
      key: "github",
      label: "GitHub",
      
      value: CONTACT.github,
      href: `https://${CONTACT.github}`,
      icon: <Github className="w-5 h-5 text-white" />,
      gradient: "from-neutral-800 to-neutral-900",
      isExternal: true,
    },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.msg.trim()) return;
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    const body = encodeURIComponent(
      `Hi Swastika,\n\n${form.msg}\n\nFrom: ${form.name}${form.email ? ` <${form.email}>` : ""}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="slide pink-bg relative overflow-hidden py-16 md:py-24">
      {/* 3D Decorative Floating Blobs */}
      <div
        ref={blob1Ref}
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-400/20 blur-[100px] transition-transform duration-500 ease-out"
      />
      <div
        ref={blob2Ref}
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-400/20 blur-[100px] transition-transform duration-500 ease-out"
      />

      <div className="w-full max-w-[1120px] relative z-10 px-4 md:px-0">
        {/* Section Header */}
        <ScrollReveal animation="3d-rise">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-pink-200/70 shadow-xs mb-3">
             
             
            </div>

            <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900 drop-shadow-xs">
              get in touch
            </h2>

            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-pink-600 font-bold mt-2 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Let's create something together
            </p>

            <p className="text-sm md:text-base text-neutral-600 max-w-lg mx-auto mt-3">
              Have an opportunity, an idea to build, or want to collaborate? Feel free to reach out anytime.
            </p>
          </div>
        </ScrollReveal>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT — Channels & Location Presence (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <ScrollReveal animation="3d-rise" delay={150}>
              <div className="space-y-3.5">
                {channels.map((c) => (
                  <Tilt3D
                    key={c.key}
                    maxTilt={10}
                    perspective={900}
                    scale={1.02}
                    glare={false}
                    className="w-full"
                  >
                    <div
                      onClick={() =>
                        window.open(c.href, c.isExternal ? "_blank" : "_self")
                      }
                      className="group relative bg-white/85 hover:bg-white backdrop-blur-md border border-pink-100 hover:border-pink-300 rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-pink-900/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300`}
                        >
                          {c.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-pink-600">
                              {c.label}
                            </span>
                           
                          </div>
                          <p className="text-sm md:text-[15px] font-semibold text-neutral-900 truncate group-hover:text-pink-600 transition-colors">
                            {c.value}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => copy(e, c.key, c.value)}
                          className="relative p-2.5 rounded-xl border border-pink-100/80 hover:border-pink-300 text-neutral-500 hover:text-pink-600 bg-pink-50/60 hover:bg-pink-100/60 transition-all duration-200 cursor-pointer active:scale-90"
                          title="Copy to clipboard"
                        >
                          {copied === c.key ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <div className="w-9 h-9 rounded-xl bg-pink-50/60 group-hover:bg-neutral-900 text-neutral-500 group-hover:text-white flex items-center justify-center transition-all duration-300 border border-pink-100/80 group-hover:border-neutral-900">
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Tilt3D>
                ))}
              </div>

              {/* Location & Timezone presence badges */}
             
            </ScrollReveal>
          </div>

          {/* RIGHT — Direct Message Note Card (6 cols) */}
          <div className="lg:col-span-6">
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
                  className="bg-white/85 backdrop-blur-md border border-pink-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-pink-900/5 flex flex-col gap-4 relative overflow-hidden"
                >
                  {/* Form Header */}
                  <div className="flex items-center justify-between border-b border-pink-100/80 pb-4">
                    <div>
                      <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                        <MessageSquare className="w-4.5 h-4.5 text-pink-500" />
                        Send a Direct Message
                      </h3>
                     
                    </div>
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        maxLength={80}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Swastika Singh"
                        className="w-full bg-neutral-50/70 border border-neutral-200/80 focus:border-pink-400 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:ring-3 focus:ring-pink-400/15"
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
                        placeholder="Tell me about your project, team, or opportunity..."
                        className="w-full bg-neutral-50/70 border border-neutral-200/80 focus:border-pink-400 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:ring-3 focus:ring-pink-400/15 resize-none font-sans"
                        required
                      />
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-1 px-1">
                      
                        <span>{form.msg.length}/600</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-neutral-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-[0_10px_25px_-5px_rgba(236,72,153,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(236,72,153,0.5)] border border-pink-500/40 hover:border-pink-400 hover:scale-[1.01] active:scale-[0.98] transition-all duration-250 cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <Send className="w-4 h-4 text-pink-400" />
                    <span>{sent ? "Opening Mail Client ✓" : "Send Note"}</span>
                  </button>
                </form>
              </Tilt3D>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Quote & Footer Signature */}
        <ScrollReveal animation="3d-rise" delay={300}>
          <div className="mt-16 pt-8 border-t border-pink-200/50 flex flex-col items-center text-center">
            <div className="font-this-is text-3xl md:text-4xl text-neutral-800 mb-2">
              Swastika Singh
            </div>
            <p className="italic text-neutral-600 text-xs md:text-sm max-w-xl mx-auto font-sans leading-relaxed">
              "{CONTACT.closing}"
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-neutral-400 font-medium">
              <span>© 2026 Swastika Singh</span>
              <span className="hidden sm:inline">•</span>
              <span>Flutter & Mobile App Developer</span>
              <span className="hidden sm:inline">•</span>
              <span>Crafted with 3D Care</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
