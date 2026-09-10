import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | "fade-in"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "scale-up"
    | "3d-rise"
    | "3d-flip";
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  className = "",
  animation = "3d-rise",
  delay = 0,
  duration = 750,
  style = {},
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, []);

  const getAnimationStyles = () => {
    const base: React.CSSProperties = {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // spring-like smooth ease-out
      transformStyle: "preserve-3d",
      willChange: "transform, opacity",
    };

    if (isVisible) {
      return {
        ...base,
        opacity: 1,
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale(1)",
      };
    }

    switch (animation) {
      case "fade-in":
        return { ...base, opacity: 0 };
      case "slide-up":
        return { ...base, opacity: 0, transform: "translateY(30px)" };
      case "slide-left":
        return { ...base, opacity: 0, transform: "translateX(30px)" };
      case "slide-right":
        return { ...base, opacity: 0, transform: "translateX(-30px)" };
      case "scale-up":
        return { ...base, opacity: 0, transform: "scale(0.92)" };
      case "3d-rise":
        return {
          ...base,
          opacity: 0,
          transform: "perspective(1200px) rotateX(16deg) translate3d(0, 45px, -60px) scale(0.95)",
        };
      case "3d-flip":
        return {
          ...base,
          opacity: 0,
          transform: "perspective(1200px) rotateY(-20deg) translate3d(-35px, 0, -40px)",
        };
      default:
        return {
          ...base,
          opacity: 0,
          transform: "perspective(1200px) rotateX(16deg) translate3d(0, 45px, -60px) scale(0.95)",
        };
    }
  };

  return (
    <div ref={ref} style={{ ...getAnimationStyles(), ...style }} className={className}>
      {children}
    </div>
  );
}
