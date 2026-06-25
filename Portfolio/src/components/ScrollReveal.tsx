import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-up";
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  className = "",
  animation = "slide-up",
  delay = 0,
  duration = 600,
  style = {},
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to maintain stability
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.05, // trigger when 5% of the element is visible
        rootMargin: "0px 0px -40px 0px", // trigger slightly before it enters the viewport
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
    const base = {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.215, 0.610, 0.355, 1.000)", // smooth ease-out
    };

    if (isVisible) {
      return {
        ...base,
        opacity: 1,
        transform: "translate(0) scale(1)",
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
        return { ...base, opacity: 0, transform: "scale(0.95)" };
      default:
        return { ...base, opacity: 0, transform: "translateY(30px)" };
    }
  };

  return (
    <div ref={ref} style={{ ...getAnimationStyles(), ...style }} className={className}>
      {children}
    </div>
  );
}
