import React, { useRef, useState, useEffect, useCallback } from "react";
import vinyl from "@/assets/pink-vinyl.png";

export function Vinyl3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vinylGroupRef = useRef<HTMLDivElement>(null);

  // Rotation angle of the record
  const rotation = useRef(0);
  const rotationSpeed = useRef(0.25); // base constant spin speed (degrees per frame)
  const isDragging = useRef(false);
  const dragStartAngle = useRef(0);
  const dragStartRotation = useRef(0);
  const dragLastAngle = useRef(0);
  const dragVelocity = useRef(0);

  // 3D Tilt angles (mouse parallax)
  const targetTiltX = useRef(0);
  const targetTiltY = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);
  const isHovered = useRef(false);

  // Ambient floating particles (dust / sound sparkles)
  const [particles] = useState(() =>
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 3 + Math.random() * 5,
      z: -40 + Math.random() * 120,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }))
  );

  // RAF loop for smooth 3D physics & spin
  useEffect(() => {
    let animId: number;

    const loop = () => {
      // Smooth tilt lerp
      currentTiltX.current += (targetTiltX.current - currentTiltX.current) * 0.08;
      currentTiltY.current += (targetTiltY.current - currentTiltY.current) * 0.08;

      // Handle spinning physics
      if (!isDragging.current) {
        // Apply inertia decay back to base speed
        dragVelocity.current *= 0.95;
        rotation.current = (rotation.current + rotationSpeed.current + dragVelocity.current) % 360;
      }

      if (vinylGroupRef.current) {
        // Apply 3D perspective tilt to the group
        vinylGroupRef.current.style.transform = `perspective(1200px) rotateX(${currentTiltX.current.toFixed(
          2
        )}deg) rotateY(${currentTiltY.current.toFixed(2)}deg)`;

        // Apply rotation to the inner vinyl disc
        const discEl = vinylGroupRef.current.querySelector<HTMLImageElement>(".vinyl-disc");
        if (discEl) {
          discEl.style.transform = `rotate(${rotation.current.toFixed(2)}deg)`;
        }

        // Apply dynamic specular sheen to the vinyl surface
        const sheenEl = vinylGroupRef.current.querySelector<HTMLDivElement>(".vinyl-sheen");
        if (sheenEl) {
          const sheenAngle = (rotation.current * 0.5 + currentTiltY.current * 2) % 360;
          sheenEl.style.transform = `rotate(${sheenAngle.toFixed(1)}deg)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Calculate angle between center and pointer
  const getAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }, []);

  // Mouse Move Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRel = (x / rect.width) * 2 - 1;
    const yRel = (y / rect.height) * 2 - 1;

    // Up to 18 degrees 3D tilt
    targetTiltX.current = -yRel * 18;
    targetTiltY.current = xRel * 18;

    // If user is dragging/scratching record
    if (isDragging.current) {
      const currentAngle = getAngle(e.clientX, e.clientY);
      const delta = currentAngle - dragLastAngle.current;
      dragVelocity.current = delta * 0.8;
      rotation.current = (rotation.current + delta) % 360;
      dragLastAngle.current = currentAngle;
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    isDragging.current = false;
    targetTiltX.current = 0;
    targetTiltY.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    const angle = getAngle(e.clientX, e.clientY);
    dragStartAngle.current = angle;
    dragLastAngle.current = angle;
    dragStartRotation.current = rotation.current;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      const angle = getAngle(e.touches[0].clientX, e.touches[0].clientY);
      dragLastAngle.current = angle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current && e.touches.length === 1) {
      const currentAngle = getAngle(e.touches[0].clientX, e.touches[0].clientY);
      const delta = currentAngle - dragLastAngle.current;
      dragVelocity.current = delta * 0.8;
      rotation.current = (rotation.current + delta) % 360;
      dragLastAngle.current = currentAngle;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-[min(75vw,880px)] aspect-square cursor-grab active:cursor-grabbing select-none"
      style={{
        perspective: 1200,
        touchAction: "none",
      }}
    >
      {/* 3D Container with hardware acceleration */}
      <div
        ref={vinylGroupRef}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "filter 0.4s ease",
        }}
      >
        {/* Soft 3D cast shadow underneath the vinyl */}
        <div
          className="absolute inset-[6%] rounded-full pointer-events-none"
          style={{
            transform: "translateZ(-60px) scale(0.92)",
            background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(212,86,154,0.12) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Ambient 3D floating sparkles / particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none bg-pink-400/40"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              transform: `translateZ(${p.z}px)`,
              boxShadow: "0 0 10px rgba(244,114,182,0.6)",
              animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}

        {/* Vinyl Record Disc (Layer Z: 0) */}
        <div
          className="relative w-full h-full pointer-events-none"
          style={{
            transform: "translateZ(0px)",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={vinyl}
            alt="Pink vinyl record"
            className="vinyl-disc absolute inset-0 w-full h-full object-contain select-none pointer-events-none drop-shadow-2xl"
            draggable={false}
          />

          {/* Dynamic Light Sheen across Vinyl Grooves */}
          <div
            className="vinyl-sheen absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.22) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.22) 225deg, transparent 270deg, transparent 360deg)",
              mixBlendMode: "overlay",
              opacity: 0.85,
            }}
          />
        </div>

        {/* ================= STEREOSCOPIC 3D FLOATING TYPOGRAPHY ================= */}

        {/* "This is" — Depth: translateZ(55px) */}
        <div
          className="absolute z-20 pointer-events-none select-none transition-transform duration-200"
          style={{
            top: "40%",
            left: "35%",
            transform: "translateX(-50%) rotate(-6deg) translateZ(55px)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <h2
            className="text-neutral-900 leading-none font-this-is drop-shadow-sm"
            style={{
              fontSize: "clamp(25px, 5vw, 50px)",
              whiteSpace: "nowrap",
              textShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            This is
          </h2>
        </div>

        {/* "Swastika" — Depth: translateZ(95px) for dramatic popout */}
        <div
          className="absolute z-30 pointer-events-none select-none transition-transform duration-200"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%) rotate(-6deg) translateZ(95px)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <h2
            className="text-neutral-900 leading-none font-signature"
            style={{
              fontSize: "clamp(120px, 26vw, 270px)",
              whiteSpace: "nowrap",
              filter: "drop-shadow(0 14px 20px rgba(212,86,154,0.18))",
              textShadow: "0 6px 24px rgba(236,72,153,0.15)",
            }}
          >
            Swastika
          </h2>
        </div>

        {/* "App Developer" — Depth: translateZ(70px) */}
        <div
          className="absolute z-20 pointer-events-none select-none transition-transform duration-200"
          style={{
            top: "62%",
            left: "62%",
            transform: "translateZ(70px)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <span
            className="text-neutral-900 font-script inline-block"
            style={{
              fontSize: "clamp(32px, 4.4vw, 70px)",
              whiteSpace: "nowrap",
              filter: "drop-shadow(0 8px 14px rgba(212,86,154,0.15))",
            }}
          >
            App Developer
          </span>
        </div>

        {/* Subtle interactive helper badge that floats at bottom */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-60 hover:opacity-100 transition-opacity"
          style={{ transform: "translateX(-50%) translateZ(35px)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-[10px] uppercase font-bold tracking-wider text-pink-600 border border-pink-100/60 shadow-sm">
            <span>✦</span> Drag or tilt record in 3D <span>✦</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0% { transform: translateZ(-30px) translateY(0px) scale(0.8); opacity: 0.3; }
          100% { transform: translateZ(60px) translateY(-18px) scale(1.2); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
