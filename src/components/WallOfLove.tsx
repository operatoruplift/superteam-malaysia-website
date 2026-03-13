"use client";

import { useTestimonials, type TestimonialData } from "@/hooks/useSupabaseData";
import AnimatedSection from "./AnimatedSection";

function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialData;
}) {
  const handle = testimonial.handle.replace("@", "");
  const profileUrl = testimonial.avatar || `https://unavatar.io/twitter/${handle}`;
  const postUrl = testimonial.postUrl || `https://x.com/${handle}`;

  return (
    <a
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl p-4 sm:p-5 w-[260px] sm:w-[340px] shrink-0 hover:bg-white/[0.05] transition-all duration-300 group select-none block"
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
      <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed">
        {testimonial.text}
      </p>
    </a>
  );
}

function AutoScrollTestimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  // Double for seamless CSS loop (same technique as partner logos marquee)
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      {/* CSS translateX animation — works on both mobile and desktop */}
      <div className="flex gap-3 sm:gap-4 w-max animate-scroll-testimonials hover:[animation-play-state:paused] active:[animation-play-state:paused]">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.handle}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

function XFollowCard() {
  return (
    <a
      href="https://x.com/SuperteamMY"
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover rounded-2xl p-5 sm:p-8 flex items-center gap-4 sm:gap-6 group transition-all duration-300"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center border border-white/10 shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="sm:w-6 sm:h-6">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-1">
          Follow us on X
        </p>
        <p className="text-base sm:text-xl font-bold group-hover:text-gold-light transition-colors">
          @SuperteamMY
        </p>
        <p className="text-[12px] sm:text-[13px] text-text-muted mt-1">
          Stay updated with the latest from Superteam Malaysia
        </p>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted group-hover:text-gold-light group-hover:translate-x-1 transition-all shrink-0">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </a>
  );
}

export default function WallOfLove() {
  const { data: testimonials } = useTestimonials();

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="section-divider mb-20 sm:mb-28 lg:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-12 sm:mb-16">
        <AnimatedSection className="text-center" zoom>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            Wall of Love
          </p>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold tracking-tight">
            Loved by the Community
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            Driven by creators, celebrated by builders.
          </p>
        </AnimatedSection>
      </div>

      {/* Auto-scrolling testimonials */}
      <div className="mb-12 sm:mb-16">
        <AutoScrollTestimonials testimonials={testimonials} />
      </div>

      {/* X Follow card — replaces unreliable Twitter embed */}
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <AnimatedSection>
          <XFollowCard />
        </AnimatedSection>
      </div>
    </section>
  );
}
