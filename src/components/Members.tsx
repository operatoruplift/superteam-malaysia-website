"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { members } from "@/data/site";
import AnimatedSection from "./AnimatedSection";
import MemberCard from "./MemberCard";
import ParticleField from "./ParticleField";

export default function Members() {
  const featured = members.filter((m) => m.featured).slice(0, 9);

  return (
    <section id="members" className="relative py-28 sm:py-36">
      {/* Constellation particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleField />
      </div>
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <AnimatedSection zoom>
            <div className="gold-line mb-5" />
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
              Member Spotlight
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.05]">
              Meet the Builders
              <br />
              <span className="text-text-secondary">Collect Your Crew</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="flex items-end">
            <p className="text-text-secondary text-lg leading-relaxed max-w-lg lg:ml-auto">
              Top-tier founders, developers, and creators shaping the Solana
              ecosystem in Southeast Asia. Tap a card to reveal their stats.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-14">
          <Link
            href="/members"
            className="group btn-outline-gold inline-flex items-center gap-2.5 px-7 py-3.5 font-medium text-[14px]"
          >
            View Full Directory
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
