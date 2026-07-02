import { useEffect, useState } from "react";

const navItems = [
  { label: "Home",       id: "home" },
  { label: "About",      id: "about" },
  { label: "Projects",   id: "projects" },
  { label: "Journey",    id: "journey" },
  { label: "Process",    id: "process" },
  { label: "Contact",    id: "contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Highlight nav item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const offsets = navItems
        .map(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current = offsets.reduce((closest, item) => {
        const absClosest = Math.abs(closest.top - 80);
        const absItem = Math.abs(item.top - 80);
        return absItem < absClosest ? item : closest;
      }, offsets[0]);

      if (current) setActive(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── DESKTOP: Vertical left sidebar ── */}
      <nav
        className="fixed left-0 top-0 z-50 hidden md:flex h-screen w-16 flex-col items-center justify-between border-r border-neutral-200/60 bg-white/70 py-8 backdrop-blur-md"
        style={{ boxShadow: "2px 0 16px rgba(236,72,153,0.04)" }}
      >
        {/* Logo / initials */}
        <button
          onClick={() => scrollTo("home")}
          className="text-sm font-bold tracking-widest text-neutral-900 hover:text-pink-500 transition-colors cursor-pointer"
        >
          S.
        </button>

        {/* Nav links (vertical) */}
        <ul className="flex flex-col items-center gap-8">
          {navItems.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer ${
                    isActive ? "text-pink-500" : "text-neutral-500 hover:text-pink-400"
                  }`}
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  title={label}
                >
                  {label}
                </button>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="block w-1 h-1 rounded-full bg-pink-500 mx-auto mt-1" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Spacer of identical size to logo to ensure vertical centering of links */}
        <div className="text-sm font-bold tracking-widest opacity-0 select-none pointer-events-none" aria-hidden="true">
          S.
        </div>
      </nav>

      {/* ── MOBILE: Top bar with hamburger ── */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-md border-b border-neutral-100/60 px-5 py-3 flex items-center justify-between"
        style={{ boxShadow: "0 2px 16px rgba(236,72,153,0.06)" }}
      >
        <button
          onClick={() => scrollTo("home")}
          className="text-base font-bold tracking-widest text-neutral-900 cursor-pointer"
        >
          S<span className="text-pink-500">.</span>
        </button>

        {/* Hamburger button */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="flex flex-col gap-[5px] p-1 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-neutral-800 transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-neutral-800 transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-neutral-800 transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <div
        className={`fixed top-[52px] left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-b border-pink-100/60 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ boxShadow: "0 8px 32px rgba(236,72,153,0.08)" }}
      >
        <ul className="flex flex-col py-3">
          {navItems.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                    isActive
                      ? "text-pink-600 bg-pink-50/80"
                      : "text-neutral-700 hover:text-pink-500 hover:bg-pink-50/40"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />}
                  {!isActive && <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 flex-shrink-0" />}
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
