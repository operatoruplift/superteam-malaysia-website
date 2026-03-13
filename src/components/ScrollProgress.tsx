"use client";

import { useEffect, useState, useRef } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "mission", label: "Mission" },
  { id: "events", label: "Events" },
  { id: "members", label: "Members" },
];

export default function ScrollProgress() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      // Overall page progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / (docHeight || 1);
      setProgress(Math.min(scrolled, 1));

      // Active section
      let current = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = i;
          break;
        }
      }
      setActive(current);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3">
      {/* Progress line */}
      <div className="relative w-[2px] h-32 bg-black/[0.08] dark:bg-white/[0.06] rounded-full overflow-hidden mb-2">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold to-gold-light rounded-full transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Section dots */}
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => {
            const el = document.getElementById(section.id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative flex items-center"
          aria-label={`Scroll to ${section.label}`}
        >
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "bg-gold scale-125 shadow-[0_0_8px_rgba(232,168,0,0.5)]"
                : "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"
            }`}
          />
          <span
            className={`absolute right-5 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
              i === active
                ? "opacity-100 translate-x-0 text-gold-light"
                : "opacity-0 translate-x-2 text-text-muted group-hover:opacity-70 group-hover:translate-x-0"
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}
