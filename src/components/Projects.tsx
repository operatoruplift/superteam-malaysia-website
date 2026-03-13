"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, ProjectCategory } from "@/data/site";
import AnimatedSection from "./AnimatedSection";

const categories: { label: string; value: ProjectCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "DeFi", value: "DeFi" },
  { label: "Infrastructure", value: "Infrastructure" },
  { label: "Consumer", value: "Consumer" },
  { label: "Community", value: "Community" },
];

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection className="text-center mb-12" zoom>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            Built in Malaysia
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mb-4">
            Top Projects
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
            From block explorers to DeFi protocols — Malaysian builders are shipping world-class products on Solana.
          </p>
        </AnimatedSection>

        {/* Category filter pills */}
        <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-12" delay={0.1}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                active === cat.value
                  ? "bg-gold/15 text-gold-light border border-gold/30"
                  : "text-text-muted hover:text-text-secondary border border-border hover:border-border-hover"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* Project grid */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass glass-hover rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-full"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-gold-light transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[11px] text-text-muted mt-0.5 leading-tight">
                    {project.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold/60 px-2 py-0.5 rounded-full bg-gold/[0.06]">
                  {project.category}
                </span>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
