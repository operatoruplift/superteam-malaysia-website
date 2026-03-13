"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import {
  type MemberSkill,
  type MemberLane,
  type RarityTier,
  getRarity,
} from "@/data/site";
import { useMembers } from "@/hooks/useSupabaseData";
import AnimatedSection from "@/components/AnimatedSection";
import MemberCard from "@/components/MemberCard";

const allSkills: MemberSkill[] = [
  "Core Team",
  "Rust",
  "Frontend",
  "Design",
  "Content",
  "Growth",
  "Product",
  "Community",
  "BizDev",
];

const allLanes: MemberLane[] = ["DeFi", "RWA", "DePIN", "AI", "General Web3"];
const allRarities: RarityTier[] = ["MYTHIC", "RARE", "UNCOMMON", "COMMON"];

type SortOption = "name" | "connections" | "rarity";

const rarityOrder: Record<RarityTier, number> = {
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  MYTHIC: 4,
};

export default function MembersPage() {
  const { data: members } = useMembers();
  const [search, setSearch] = useState("");
  const [activeSkill, setActiveSkill] = useState<MemberSkill | "All">("All");
  const [activeLane, setActiveLane] = useState<MemberLane | "All">("All");
  const [activeRarity, setActiveRarity] = useState<RarityTier | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("rarity");

  const filtered = useMemo(() => {
    const result = members.filter((m) => {
      const matchesSearch =
        search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.company.toLowerCase().includes(search.toLowerCase());

      const matchesSkill =
        activeSkill === "All" || m.skills.includes(activeSkill);

      const matchesLane = activeLane === "All" || m.lane === activeLane;

      const matchesRarity =
        activeRarity === "All" || getRarity(m.connection_count) === activeRarity;

      return matchesSearch && matchesSkill && matchesLane && matchesRarity;
    });

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "connections") return b.connection_count - a.connection_count;
      // rarity
      return (
        rarityOrder[getRarity(b.connection_count)] -
        rarityOrder[getRarity(a.connection_count)]
      );
    });

    return result;
  }, [members, search, activeSkill, activeLane, activeRarity, sortBy]);

  const activeFilterCount = [activeSkill, activeLane, activeRarity].filter(
    (f) => f !== "All"
  ).length;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            Directory
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight">
            Members Directory
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Browse {members.length}+ builders, find collaborators, and discover
            the talent powering Solana in Malaysia.
          </p>
        </AnimatedSection>

        {/* Search & Filters */}
        <AnimatedSection className="mb-10" delay={0.1}>
          <div className="glass-strong rounded-2xl p-5">
            <div className="flex flex-col gap-4">
              {/* Search + Sort row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Search by name, role, or company..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg border border-border text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={13} className="text-text-muted" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted">
                    Sort:
                  </span>
                  {(["rarity", "connections", "name"] as SortOption[]).map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => setSortBy(opt)}
                        className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-all duration-300 ${
                          sortBy === opt
                            ? "border-gold text-gold-light bg-gold/[0.08]"
                            : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Skill filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted self-center mr-1">
                  Skill:
                </span>
                <button
                  onClick={() => setActiveSkill("All")}
                  className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                    activeSkill === "All"
                      ? "border-gold text-gold-light bg-gold/[0.08]"
                      : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                  }`}
                >
                  All
                </button>
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() =>
                      setActiveSkill(activeSkill === skill ? "All" : skill)
                    }
                    className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                      activeSkill === skill
                        ? "border-gold text-gold-light bg-gold/[0.08]"
                        : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {/* Lane filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted self-center mr-1">
                  Lane:
                </span>
                <button
                  onClick={() => setActiveLane("All")}
                  className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                    activeLane === "All"
                      ? "border-gold text-gold-light bg-gold/[0.08]"
                      : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                  }`}
                >
                  All
                </button>
                {allLanes.map((lane) => (
                  <button
                    key={lane}
                    onClick={() =>
                      setActiveLane(activeLane === lane ? "All" : lane)
                    }
                    className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                      activeLane === lane
                        ? "border-gold text-gold-light bg-gold/[0.08]"
                        : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                    }`}
                  >
                    {lane}
                  </button>
                ))}
              </div>

              {/* Rarity filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-muted self-center mr-1">
                  Rarity:
                </span>
                <button
                  onClick={() => setActiveRarity("All")}
                  className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                    activeRarity === "All"
                      ? "border-gold text-gold-light bg-gold/[0.08]"
                      : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                  }`}
                >
                  All
                </button>
                {allRarities.map((tier) => (
                  <button
                    key={tier}
                    onClick={() =>
                      setActiveRarity(activeRarity === tier ? "All" : tier)
                    }
                    className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                      activeRarity === tier
                        ? "border-gold text-gold-light bg-gold/[0.08]"
                        : "border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-6">
          <p className="text-[13px] text-text-muted font-mono">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setActiveSkill("All");
                setActiveLane("All");
                setActiveRarity("All");
                setSearch("");
              }}
              className="text-[11px] text-gold-light hover:underline font-mono"
            >
              Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
            </button>
          )}
        </div>

        {/* Members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-text-muted text-lg">
              No members found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveSkill("All");
                setActiveLane("All");
                setActiveRarity("All");
              }}
              className="mt-4 text-[14px] text-gold-light hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
