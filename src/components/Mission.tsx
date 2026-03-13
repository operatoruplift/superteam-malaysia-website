"use client";

import {
  Code2,
  Calendar,
  Wallet,
  Briefcase,
  GraduationCap,
  Globe,
} from "lucide-react";
import { pillars } from "@/data/site";
import AnimatedSection from "./AnimatedSection";

const icons: Record<string, React.ReactNode> = {
  code: <Code2 size={22} strokeWidth={1.5} />,
  calendar: <Calendar size={22} strokeWidth={1.5} />,
  wallet: <Wallet size={22} strokeWidth={1.5} />,
  briefcase: <Briefcase size={22} strokeWidth={1.5} />,
  "graduation-cap": <GraduationCap size={22} strokeWidth={1.5} />,
  globe: <Globe size={22} strokeWidth={1.5} />,
};

export default function Mission() {
  return (
    <section id="mission" className="relative py-28 sm:py-36">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          <AnimatedSection zoom>
            <div className="gold-line mb-5" />
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
              What We Do
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.05]">
              Building the Solana
              <br />
              <span className="text-text-secondary">Ecosystem in Malaysia</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="flex items-end">
            <p className="text-text-secondary text-lg leading-relaxed max-w-lg lg:ml-auto">
              We support builders at every stage — from learning Rust to
              shipping production apps. Our community connects Malaysian talent
              with global Solana opportunities.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => (
            <AnimatedSection key={pillar.title} delay={i * 0.08} zoom>
              <a
                href={pillar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-glow glass glass-hover rounded-2xl p-5 sm:p-7 h-full transition-all duration-400 hover:-translate-y-1 block"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center text-gold-light mb-5 group-hover:bg-gold/[0.12] group-hover:border-gold/20 transition-all duration-400">
                  {icons[pillar.icon]}
                </div>
                <h3 className="text-[17px] font-semibold mb-2.5 tracking-tight group-hover:text-gold-light transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-[14px] text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
