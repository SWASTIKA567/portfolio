import { useRef, useEffect, useState } from "react";
import vinyl from "@/assets/pink-vinyl.png";
const portrait = "/screenshots/kechi/kechi-home.png";
import { ABOUT } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tilt3D } from "@/components/Tilt3D";
import { ProjectsScreen } from "@/components/ProjectsScreen";

export function Slide2() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const bgVinylRef = useRef<HTMLImageElement>(null);

  // Listen for open projects event
  useEffect(() => {
    const handleOpen = () => setIsProjectsOpen(true);
    window.addEventListener("open-projects-screen", handleOpen);
    return () => window.removeEventListener("open-projects-screen", handleOpen);
  }, []);

  // Gentle 3D parallax on background vinyl
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgVinylRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      bgVinylRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fcfbf8] text-neutral-900">
      {/* Background Vinyl with 3D Parallax — top right, hidden on mobile */}
      <div className="pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 hidden md:block z-0">
        <img
          ref={bgVinylRef}
          src={vinyl}
          alt=""
          aria-hidden="true"
          className="vinyl-spin h-[200vh] w-[200vh] max-w-none select-none pointer-events-none opacity-85 transition-transform duration-500 ease-out"
        />
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="md:hidden flex flex-col items-center pt-16 px-6 pb-12 relative z-10">
        {/* 3D Polaroid on mobile */}
        <Tilt3D
          maxTilt={18}
          scale={1.04}
          glare={true}
          className="mb-8 mt-4"
        >
          <div className="rotate-[4deg] bg-white p-3.5 pb-12 shadow-2xl shadow-pink-900/25 border border-neutral-100 rounded-sm">
            <img
              src={portrait}
              alt="Swastika"
              className="block w-[52vw] object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-xs"
              style={{ aspectRatio: "3/4" }}
            />
            <div className="font-this-is text-center text-3xl text-neutral-800 mt-3">
              Swastika
            </div>
          </div>
        </Tilt3D>

        {/* Hello script */}
        <div className="font-script text-[4.5rem] leading-none text-neutral-900 mb-6">
          {ABOUT.hello}
        </div>

        {/* Content */}
        <ScrollReveal animation="3d-rise" className="w-full">
          <div className="w-full">
           
            <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900 mb-4">
              about me
            </h2>
            <p className="text-[17px] leading-relaxed text-neutral-700">{ABOUT.intro}</p>

            <ul className="mt-6 space-y-2.5">
              {ABOUT.education.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm font-medium text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>

      {/* ── DESKTOP LAYOUT (≥ md) ── */}
      <div className="hidden md:block">
        {/* 3D Polaroid — top right with interactive tilt */}
        <div className="absolute top-20 right-48 z-20 pointer-events-auto">
          <Tilt3D
            maxTilt={20}
            perspective={1000}
            scale={1.05}
            glare={true}
            glareMaxOpacity={0.4}
            className="cursor-pointer"
          >
            <div
              className="rotate-[8deg] hover:rotate-[3deg] transition-all duration-500 bg-white p-5 pb-18 shadow-2xl shadow-pink-900/30 border border-neutral-150 rounded-xs"
              style={{
                boxShadow:
                  "0 30px 60px -15px rgba(212,86,154,0.35), 0 15px 25px -10px rgba(0,0,0,0.12)",
              }}
            >
              {/* Top tape sticker effect */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/75 backdrop-blur-xs shadow-sm border border-neutral-200/60 rotate-[-3deg] pointer-events-none"
                style={{ clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)" }}
              />

              <img
                src={portrait}
                alt="Portrait of Swastika"
                width={300}
                height={380}
                className="block h-[380px] w-[300px] object-cover grayscale hover:grayscale-0 transition-all duration-700 select-none pointer-events-none rounded-xs"
              />
              <div className="font-this-is absolute bottom-4 left-0 right-0 text-center text-4xl text-neutral-800 tracking-wide select-none">
                Swastika
              </div>
            </div>
          </Tilt3D>
        </div>

        {/* Content column */}
        <main className="relative z-10 flex min-h-screen items-center pl-16 md:pl-28 lg:pl-44 pr-8 lg:pr-16">
          <div className="w-full max-w-2xl py-20">
            <ScrollReveal animation="3d-rise">
              <section id="about">
                
               
                

                <h2 className="script text-6xl md:text-8xl leading-none text-neutral-900 mb-6 drop-shadow-xs">
                  about me
                </h2>

                <p className="text-[19px] leading-relaxed text-neutral-700 font-normal">
                  {ABOUT.intro}
                </p>

                <ul className="mt-8 space-y-3">
                  {ABOUT.education.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-base font-medium text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-pink-500 flex-shrink-0 shadow-xs shadow-pink-500/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          </div>
        </main>
      </div>

      {/* Interactive Projects Modal / Screen (Exclusive to button click) */}
      <ProjectsScreen isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />
    </section>
  );
}
