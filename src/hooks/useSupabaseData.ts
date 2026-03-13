"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  events as staticEvents,
  members as staticMembers,
  projects as staticProjects,
  testimonials as staticTestimonials,
  type Member,
  type ProjectCategory,
} from "@/data/site";

// ─── Generic fetcher: try Supabase, fall back to static ───

function useSupabaseTable<T>(
  table: string,
  staticData: T[],
  options?: { orderBy?: string; ascending?: boolean; mapRow?: (row: Record<string, unknown>) => T }
): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>(staticData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        if (!supabase) { setLoading(false); return; }
        let query = supabase.from(table).select("*");
        if (options?.orderBy) {
          query = query.order(options.orderBy, { ascending: options.ascending ?? true });
        }
        const { data: rows, error } = await query;
        if (error || !rows || rows.length === 0) {
          // Keep static data as fallback
          setLoading(false);
          return;
        }
        if (!cancelled) {
          const mapped = options?.mapRow
            ? rows.map((r) => options.mapRow!(r as Record<string, unknown>))
            : (rows as T[]);
          setData(mapped);
        }
      } catch {
        // Supabase unavailable — static data remains
      }
      if (!cancelled) setLoading(false);
    }

    fetch();
    return () => { cancelled = true; };
  }, [table]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading };
}

// ─── Events ───

export interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
  lumaUrl: string;
  image: string;
}

export function useEvents() {
  return useSupabaseTable<EventData>("events", staticEvents, {
    orderBy: "date",
    ascending: false,
    mapRow: (r) => ({
      id: String(r.id),
      title: String(r.title),
      date: String(r.date),
      location: String(r.location),
      description: String(r.description),
      status: (r.status === "upcoming" ? "upcoming" : "past") as "upcoming" | "past",
      lumaUrl: String(r.luma_url || ""),
      image: String(r.image || ""),
    }),
  });
}

// ─── Members ───

export function useMembers() {
  return useSupabaseTable<Member>("members", staticMembers, {
    orderBy: "connection_count",
    ascending: false,
    mapRow: (r) => ({
      id: String(r.id),
      name: String(r.name),
      role: String(r.role || ""),
      company: String(r.company || ""),
      skills: (Array.isArray(r.skills) ? r.skills : []) as Member["skills"],
      lane: String(r.lane || "General Web3") as Member["lane"],
      twitter: String(r.twitter || ""),
      avatar: r.avatar ? String(r.avatar) : null,
      achievements: (Array.isArray(r.achievements) ? r.achievements : []) as string[],
      featured: Boolean(r.featured),
      connection_count: Number(r.connection_count) || 0,
      hackathon_wins: Number(r.hackathon_wins) || 0,
      projects_built: Number(r.projects_built) || 0,
      grants_received: Number(r.grants_received) || 0,
      bounties_earned: Number(r.bounties_earned) || 0,
    }),
  });
}

// ─── Partners ───

export interface PartnerData {
  name: string;
  logoSrc: string;
  url: string;
}

export function usePartners() {
  return useSupabaseTable<PartnerData>("partners", [], {
    orderBy: "sort_order",
    ascending: true,
    mapRow: (r) => ({
      name: String(r.name),
      logoSrc: String(r.logo_src || ""),
      url: String(r.url || ""),
    }),
  });
}

// ─── Projects ───

export interface ProjectData {
  name: string;
  url: string;
  logo: string;
  category: ProjectCategory;
  description: string;
  founder: string;
}

export function useProjects() {
  return useSupabaseTable<ProjectData>("projects", staticProjects, {
    orderBy: "sort_order",
    ascending: true,
    mapRow: (r) => ({
      name: String(r.name),
      url: String(r.url || ""),
      logo: String(r.logo || ""),
      category: String(r.category || "DeFi") as ProjectCategory,
      description: String(r.description || ""),
      founder: String(r.founder || ""),
    }),
  });
}

// ─── Testimonials ───

export interface TestimonialData {
  name: string;
  handle: string;
  text: string;
  avatar: string | null;
  postUrl: string;
}

export function useTestimonials() {
  return useSupabaseTable<TestimonialData>("testimonials", staticTestimonials, {
    orderBy: "sort_order",
    ascending: true,
    mapRow: (r) => ({
      name: String(r.name),
      handle: String(r.handle || ""),
      text: String(r.text || ""),
      avatar: r.avatar ? String(r.avatar) : null,
      postUrl: String(r.post_url || ""),
    }),
  });
}
