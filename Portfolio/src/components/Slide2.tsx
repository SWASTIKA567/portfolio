import vinyl from "@/assets/pink-vinyl.png";
const portrait = "/screenshots/postly-1.png";
import { ABOUT } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ScrollReveal";

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
          className="font-script text-[4.5rem] leading-none text-neutral-900 mb-6"
        >
          {ABOUT.hello}
        </div>

        {/* Content */}
        <ScrollReveal animation="slide-up" className="w-full">
          <div className="w-full">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Portfolio · 2026
            </p>
            <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900 mb-4">about me</h2>
            <p className="text-[17px] leading-relaxed text-neutral-700">{ABOUT.intro}</p>

            <ul className="mt-5 space-y-3 text-base text-neutral-800">
              {[...ABOUT.experience, ...ABOUT.education].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-pink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
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
              >
                Swastika
              </div>
            </div>
          </div>
        </div>

        {/* Content column */}
        <main className="relative z-10 flex min-h-screen items-center pl-16 md:pl-28 lg:pl-44 pr-8 lg:pr-16">
          <div className="w-full max-w-2xl py-20">
            <ScrollReveal animation="slide-up">
              <section id="about">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
                  Portfolio · 2026
                </p>
                <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900 mb-6">
                  about me
                </h2>
                <p className="text-[17px] leading-relaxed text-neutral-700">{ABOUT.intro}</p>

                <ul className="mt-6 space-y-3 text-base text-neutral-800">
                  {[...ABOUT.experience, ...ABOUT.education].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-pink-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          </div>
        </main>
      </div>
    </section>
  );
}
