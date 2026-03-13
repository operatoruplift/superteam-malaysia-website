"use client";

import { useRef, useEffect, useState } from "react";
import { stats } from "@/data/site";
import AnimatedSection from "./AnimatedSection";

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <span className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight gradient-text-gold">
        {count}
        {suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection zoom>
          <div className="glass-strong glow-gold rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer opacity-40" />

            <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    i < stats.length - 1
                      ? "lg:border-r lg:border-border"
                      : ""
                  }`}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-[13px] text-text-muted mt-1.5 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
