import vinyl from "@/assets/pink-vinyl.png";
const portrait = "/screenshots/postly-1.png";
import { ABOUT } from "@/data/portfolio";

const navItems = ["Home", "About", "Work", "Projects", "Contact"];

export function Slide2() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fcfbf8] text-neutral-900">
      {/* Vinyl — top right quarter, hidden on mobile */}
      <div className="pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 hidden md:block">
        <img
          src={vinyl}
          alt=""
          aria-hidden="true"
          className="vinyl-spin h-[200vh] w-[200vh] max-w-none select-none pointer-events-none"
        />
      </div>

      {/* Vertical navigation */}
      <nav className="fixed left-0 top-0 z-30 hidden md:flex h-screen w-16 flex-col items-center justify-between border-r border-neutral-200/60 bg-white/60 py-8 backdrop-blur-sm">
        <div className="text-sm font-bold tracking-widest">S.</div>
        <ul className="flex flex-col items-center gap-10">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block whitespace-nowrap text-xs font-medium uppercase tracking-[0.25em] text-neutral-700 transition-colors hover:text-pink-500"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500">
          <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Est. 2026</span>
        </div>
      </nav>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="md:hidden flex flex-col items-center pt-16 px-6 pb-12">
        {/* Polaroid — centered on mobile */}
        <div className="rotate-[4deg] bg-white p-3 pb-10 shadow-2xl shadow-pink-900/20 mb-6 mt-4">
          <img
            src={portrait}
            alt="Swastika"
            className="block w-[44vw] object-cover grayscale"
            style={{ aspectRatio: "3/4" }}
          />
        </div>

        {/* Hello script */}
        <div
          className="text-[3.5rem] leading-none text-neutral-900 mb-6"
          style={{ fontFamily: "'Allura', cursive" }}
        >
          {ABOUT.hello}
        </div>

        {/* Content */}
        <div className="w-full">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">
            Portfolio · 2026
          </p>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">about me</h2>
          <p className="text-[15px] leading-relaxed text-neutral-700">{ABOUT.intro}</p>

          <ul className="mt-5 space-y-3 text-sm text-neutral-800">
            {[...ABOUT.experience, ...ABOUT.education].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-pink-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-600">
                Language
              </h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                {ABOUT.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-600">
                Contact
              </h3>
              <p className="text-sm text-neutral-700">
                <a href={`mailto:${ABOUT.contact.email}`} className="hover:text-pink-500 break-all">
                  {ABOUT.contact.email}
                </a>
              </p>
              <p className="text-sm text-neutral-700">Tel {ABOUT.contact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (≥ md) ── */}
      <div className="hidden md:block">
        {/* Polaroid — top right */}
        <div className="pointer-events-none absolute top-20 right-50 z-20">
          <div className="relative" style={{ width: "200vh", height: "200vh" }}>
            <div
              className="pointer-events-auto absolute rotate-[8deg] bg-white p-4 pb-16 shadow-2xl shadow-pink-900/20"
              style={{ top: "12vh", right: "20vh" }}
            >
              <img
                src={portrait}
                alt="Portrait of Swastika"
                width={280}
                height={360}
                className="block h-[360px] w-[280px] object-cover grayscale"
              />
              <div
                className="font-script absolute bottom-3 left-0 right-0 text-center text-4xl text-neutral-800"
                style={{ fontFamily: "'Allura', cursive" }}
              >
                Swastika
              </div>
            </div>
          </div>
        </div>

        {/* Content column */}
        <main className="relative z-10 ml-16 flex min-h-screen items-center px-8 lg:px-16">
          <div className="w-full max-w-xl py-20">
            <section id="about">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">
                Portfolio · 2026
              </p>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
                about me
              </h2>
              <p className="text-[15px] leading-relaxed text-neutral-700">{ABOUT.intro}</p>

              <ul className="mt-6 space-y-3 text-sm text-neutral-800">
                {[...ABOUT.experience, ...ABOUT.education].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-pink-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-600">
                    Language
                  </h3>
                  <ul className="space-y-1 text-sm text-neutral-700">
                    {ABOUT.languages.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-600">
                    Contact
                  </h3>
                  <p className="text-sm text-neutral-700">
                    <a href={`mailto:${ABOUT.contact.email}`} className="hover:text-pink-500">
                      {ABOUT.contact.email}
                    </a>
                  </p>
                  <p className="text-sm text-neutral-700">Telephone {ABOUT.contact.phone}</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}
