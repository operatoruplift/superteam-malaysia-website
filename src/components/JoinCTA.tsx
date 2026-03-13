"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import DotGrid from "./DotGrid";

export default function JoinCTA() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center">
            {/* KL skyline background */}
            <Image
              src="/petronas.jpg"
              alt="Kuala Lumpur skyline"
              fill
              className="object-cover object-center"
              quality={75}
            />

            {/* Dark overlays */}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-st-purple/[0.04]" />

            {/* DotGrid canvas animation — same as hero */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
              <DotGrid color={[232, 168, 0]} secondaryColor={[140, 120, 200]} />
            </div>

            {/* Gold ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gold/[0.1] blur-[120px] rounded-full" />

            <div className="relative z-10 text-center w-full px-5 sm:px-6 py-12 sm:py-24">
              <div className="gold-line mx-auto mb-6" />
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-6">
                Join Us
              </p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-5 text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
                Join Superteam Malaysia
              </h2>
              <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
                Accelerate your journey in the Solana ecosystem. Connect, learn,
                and grow with Malaysia&apos;s best builders.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://t.me/SuperteamMY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn-gold inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 text-[14px] sm:text-[15px]"
                >
                  Join on Telegram
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https://discord.gg/superteam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 font-medium text-[14px] sm:text-[15px] backdrop-blur-sm"
                >
                  Join Discord
                </a>
                <a
                  href="https://x.com/SuperteamMY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 font-medium text-[14px] sm:text-[15px] rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow on X
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
