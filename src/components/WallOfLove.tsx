"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/site";
import AnimatedSection from "./AnimatedSection";

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  const handle = testimonial.handle.replace("@", "");
  const profileUrl = testimonial.avatar || `https://unavatar.io/twitter/${handle}`;
  const postUrl = testimonial.postUrl || `https://x.com/${testimonial.handle.replace("@", "")}`;

  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl p-4 sm:p-5 w-[280px] sm:w-[340px] shrink-0 hover:bg-white/[0.05] transition-all duration-300 group select-none block"
    >
      <div className="flex items-center gap-3 mb-3.5">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gold/20 to-gold-light/10 border border-gold/10 shrink-0">
          <img
            src={profileUrl}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold truncate">{testimonial.name}</p>
          <p className="text-[11px] text-text-muted font-mono">{testimonial.handle}</p>
        </div>
        <svg
          className="text-text-muted/40 group-hover:text-text-muted transition-colors shrink-0"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <p className="text-[14px] text-text-secondary leading-relaxed">
        {testimonial.text}
      </p>
    </a>
  );
}

function AutoScrollTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function tick() {
      if (el) {
        el.scrollLeft += 0.5;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Double for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-hidden px-4 sm:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.handle}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

function XFeedEmbed() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current || loaded) return;
    const wrapper = wrapperRef.current;

    // Create a standalone div for Twitter to render into — outside React's control
    const twitterContainer = document.createElement("div");
    wrapper.appendChild(twitterContainer);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    function renderTimeline() {
      if (!win.twttr?.widgets) return;
      win.twttr.widgets.createTimeline(
        { sourceType: "profile", screenName: "SuperteamMY" },
        twitterContainer,
        { theme: "dark", chrome: "transparent noheader nofooter noborders", tweetLimit: 5, dnt: true }
      ).then(() => setLoaded(true));
    }

    if (win.twttr?.widgets) {
      renderTimeline();
    } else {
      const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.head.appendChild(script);
      }
      const interval = setInterval(() => {
        if (win.twttr?.widgets) {
          clearInterval(interval);
          renderTimeline();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loaded]);

  return (
    <div
      className="tweet-embed-wrapper rounded-2xl overflow-hidden"
      style={{ background: "#000", border: "1px solid rgba(255,255,255,0.06)", colorScheme: "dark" }}
    >
      <h3
        className="text-[11px] font-mono uppercase tracking-[0.25em] px-4 pt-4 mb-3"
        style={{ color: "#ffc940" }}
      >
        Latest from X
      </h3>
      {!loaded && (
        <p style={{ color: "#71767b", fontSize: "13px", fontFamily: "monospace", padding: "0 1rem 1rem" }}>
          Loading tweets...
        </p>
      )}
      <div
        ref={wrapperRef}
        className="tweet-embed-wrapper max-h-[400px] sm:max-h-[500px] overflow-y-auto"
        style={{ background: "#000", color: "#e7e9ea", colorScheme: "dark" }}
      />
    </div>
  );
}

export default function WallOfLove() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-16">
        <AnimatedSection className="text-center" zoom>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            Wall of Love
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            Loved by the Community
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
            Driven by creators, celebrated by builders.
          </p>
        </AnimatedSection>
      </div>

      {/* Auto-scrolling testimonials (no drag) */}
      <div className="mb-16">
        <AutoScrollTestimonials />
      </div>

      {/* X Feed embed — always dark, independent of site theme */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <AnimatedSection>
          <XFeedEmbed />
        </AnimatedSection>
      </div>
    </section>
  );
}
