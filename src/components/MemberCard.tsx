"use client";

import { useState } from "react";
import { Star, Trophy, Rocket, Coins, Target, Users } from "lucide-react";
import { type Member, type MemberSkill, getRarity, RARITY_CONFIG } from "@/data/site";
import AnimatedSection from "./AnimatedSection";

const skillClass: Record<MemberSkill, string> = {
  "Core Team": "skill-core",
  Rust: "skill-rust",
  Frontend: "skill-frontend",
  Design: "skill-design",
  Content: "skill-content",
  Growth: "skill-growth",
  Product: "skill-product",
  Community: "skill-community",
  BizDev: "skill-bizdev",
};

const avatarGradients = [
  "from-[#e8a800] to-[#ffc940]",
  "from-[#6065f0] to-[#9945ff]",
  "from-[#2dd4bf] to-[#6065f0]",
  "from-[#f472b6] to-[#9945ff]",
  "from-[#ff6b35] to-[#ffc940]",
  "from-[#6366f1] to-[#2dd4bf]",
  "from-[#e44c65] to-[#ffc940]",
  "from-[#4ec9b0] to-[#6065f0]",
];

interface Props {
  member: Member;
  index: number;
}

export default function MemberCard({ member, index }: Props) {
  const rarity = getRarity(member.connection_count);
  const config = RARITY_CONFIG[rarity];
  const gradient = avatarGradients[index % avatarGradients.length];
  const [flipped, setFlipped] = useState(false);

  const rarityBorder =
    rarity === "MYTHIC" ? "rarity-mythic rarity-mythic-glow" :
    rarity === "RARE" ? "rarity-rare" :
    rarity === "UNCOMMON" ? "rarity-uncommon" :
    "rarity-common";

  return (
    <AnimatedSection delay={index * 0.06} zoom>
      <div
        className={`relative min-h-[280px] sm:min-h-[320px] rounded-2xl border glass cursor-pointer transition-all duration-300 ${rarityBorder}`}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* Rarity accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
        />

        {/* === FRONT FACE === */}
        <div
          className={`p-4 sm:p-6 flex flex-col transition-opacity duration-300 ${
            flipped ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"
          }`}
        >
          {/* Lane badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/[0.04] text-text-muted">
              {member.lane}
            </span>
            <span className="text-lg" title="Superteam Malaysia">🏵️</span>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br ${gradient} shadow-lg border-2`}
              style={{ borderColor: config.color }}
            >
              <img
                src={member.avatar || `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=transparent`}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name + role */}
          <div className="text-center mb-3">
            <h4 className="font-semibold text-[16px] tracking-tight truncate">
              {member.name}
            </h4>
            <p className="text-[11px] text-text-muted font-mono uppercase tracking-[0.12em] mt-0.5">
              {member.role} &middot; {member.company}
            </p>
          </div>

          {/* Primary skill */}
          <div className="flex justify-center mb-3">
            <span className={`text-[10px] font-mono uppercase tracking-[0.1em] px-2.5 py-[3px] rounded-full ${skillClass[member.skills[0]]}`}>
              {member.skills[0]}
            </span>
          </div>

          {/* Rarity stars */}
          <div className="flex items-center justify-center gap-1 mt-auto">
            {Array.from({ length: config.stars }).map((_, i) => (
              <Star key={i} size={14} fill={config.color} stroke="none" />
            ))}
          </div>
          <p
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-center mt-1.5 font-bold"
            style={{ color: config.color }}
          >
            {config.label}
          </p>

          {/* Twitter */}
          {member.twitter && (
            <div className="flex justify-center mt-3">
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label={`${member.name} on X`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          )}

          <p className="text-[9px] text-text-muted text-center mt-2 font-mono opacity-40">
            tap to flip
          </p>
        </div>

        {/* === BACK FACE === */}
        <div
          className={`p-4 sm:p-6 flex flex-col transition-opacity duration-300 ${
            flipped ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <h4 className="font-semibold text-[15px] tracking-tight text-center mb-1 mt-1">
            {member.name}
          </h4>
          <p
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-center mb-4 font-bold"
            style={{ color: config.color }}
          >
            {config.label}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <StatItem icon={<Users size={13} />} label="Connections" value={member.connection_count} />
            <StatItem icon={<Trophy size={13} />} label="Hackathons" value={member.hackathon_wins} />
            <StatItem icon={<Rocket size={13} />} label="Projects" value={member.projects_built} />
            <StatItem icon={<Coins size={13} />} label="Grants" value={member.grants_received} />
            <StatItem icon={<Target size={13} />} label="Bounties" value={member.bounties_earned} />
            <div className="flex items-center gap-2 p-2 rounded-lg stat-bg">
              <span className="text-[10px] text-text-muted font-mono">Lane</span>
              <span className="text-[11px] font-semibold ml-auto">{member.lane}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className={`text-[9px] font-mono uppercase tracking-[0.1em] px-2 py-[2px] rounded-full ${skillClass[skill]}`}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Achievements */}
          {member.achievements.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-border">
              {member.achievements.map((a) => (
                <span
                  key={a}
                  className="text-[9px] text-text-muted bg-white/[0.04] px-2 py-[2px] rounded-full font-medium"
                >
                  {a}
                </span>
              ))}
            </div>
          )}

          <p className="text-[9px] text-text-muted text-center mt-3 font-mono opacity-40">
            tap to flip back
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg stat-bg">
      <span className="text-text-muted">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] text-text-muted font-mono leading-none">{label}</p>
        <p className="text-[14px] font-bold leading-tight">{value}</p>
      </div>
    </div>
  );
}
