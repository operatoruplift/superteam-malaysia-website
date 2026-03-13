"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const partners = [
  { name: "Solana Foundation", logoSrc: "/logos/partners/solana.png", url: "https://solana.org" },
  { name: "Jupiter", logoSrc: "/logos/partners/jupiter.png", url: "https://jup.ag" },
  { name: "Helius", logoSrc: "/logos/partners/helius.png", url: "https://helius.dev" },
  { name: "Magic Eden", logoSrc: "/logos/partners/magiceden.png", url: "https://magiceden.io" },
  { name: "Marinade", logoSrc: "/logos/partners/marinade.png", url: "https://marinade.finance" },
  { name: "Drift Protocol", logoSrc: "/logos/partners/drift.png", url: "https://drift.trade" },
  { name: "Phantom", logoSrc: "/logos/partners/phantom.png", url: "https://phantom.app" },
  { name: "Superteam", logoSrc: "/logos/partners/superteam.png", url: "https://superteam.fun" },
  { name: "Orca", logoSrc: "/logos/partners/orca.png", url: "https://orca.so" },
  { name: "MNT Digital", logoSrc: "/logos/partners/mntdigital.png", url: "https://mntdigital.com" },
];

// Double the array for seamless infinite scroll
const doubled = [...partners, ...partners];

export default function PartnerLogos() {
  return (
    <section id="ecosystem" className="relative py-28 sm:py-36">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection className="text-center mb-16" zoom>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            Ecosystem
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            Trusted by Solana&apos;s Top Projects
          </h2>
        </AnimatedSection>
      </div>

      {/* Scrolling logo marquee */}
      <AnimatedSection>
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-left hover:[animation-play-state:paused] w-max">
            {doubled.map((partner, i) => (
              <a
                key={`${partner.name}-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2.5 px-5 sm:px-8 py-4 sm:py-6 shrink-0"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/[0.06] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <Image
                    src={partner.logoSrc}
                    alt={partner.name}
                    width={48}
                    height={48}
                    className="w-9 h-9 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
                    unoptimized
                  />
                </div>
                <span className="text-[11px] font-medium text-text-muted group-hover:text-text-primary transition-colors duration-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
