"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

type Tab = "events" | "members" | "partners" | "projects" | "announcements" | "content";

// ─── Reusable Form Input ───
function Field({ label, value, onChange, type = "text", placeholder, options, textarea }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; options?: { label: string; value: string }[]; textarea?: boolean;
}) {
  if (options) {
    return (
      <label className="block">
        <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-1 block">{label}</span>
        <select value={value} onChange={(e) => onChange(e.target.value)} className="admin-input w-full">
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
    );
  }
  if (textarea) {
    return (
      <label className="block">
        <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-1 block">{label}</span>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="admin-input w-full min-h-[80px]" />
      </label>
    );
  }
  return (
    <label className="block">
      <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-1 block">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="admin-input w-full" />
    </label>
  );
}

// ─── Main Dashboard ───
export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("events");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "superteam-my-admin-2024") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="glass-strong rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-text-muted text-sm mb-6">Superteam Malaysia CMS</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-sm focus:outline-none focus:border-gold/40 mb-3"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button onClick={handleLogin} className="btn-gold w-full py-3 text-sm">Sign In</button>
        </div>
      </div>
    );
  }

  const tabs: Tab[] = ["events", "members", "partners", "projects", "announcements", "content"];

  return (
    <div className="min-h-screen bg-bg pt-28 pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">CMS Dashboard</h1>
            <p className="text-text-muted text-sm mt-1">Manage your Superteam Malaysia website content</p>
          </div>
          <button onClick={() => setAuthenticated(false)} className="text-sm text-text-muted hover:text-text-primary transition-colors">
            Sign Out
          </button>
        </div>

        <div className="flex gap-1 mb-8 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap ${
                tab === t ? "bg-gold/15 text-gold-light" : "text-text-muted hover:text-text-secondary hover:bg-white/[0.03]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "events" && <EventsPanel />}
        {tab === "members" && <MembersPanel />}
        {tab === "partners" && <PartnersPanel />}
        {tab === "projects" && <ProjectsPanel />}
        {tab === "announcements" && <AnnouncementsPanel />}
        {tab === "content" && <ContentPanel />}
      </div>
    </div>
  );
}

// ─── Events Panel (full CRUD) ───
function EventsPanel() {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string> | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    setRows((data as Record<string, string>[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const save = async (form: Record<string, string>) => {
    const payload = { title: form.title, date: form.date, location: form.location, description: form.description, status: form.status, luma_url: form.luma_url, image: form.image };
    if (form.id) {
      await supabase.from("events").update(payload).eq("id", form.id);
    } else {
      await supabase.from("events").insert(payload);
    }
    setEditing(null);
    fetch_();
  };

  const del = async (id: string) => {
    if (confirm("Delete this event?")) { await supabase.from("events").delete().eq("id", id); fetch_(); }
  };

  const empty = { id: "", title: "", date: "", location: "", description: "", status: "upcoming", luma_url: "", image: "" };

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Events ({rows.length})</h2>
        <button onClick={() => setEditing(empty)} className="btn-gold px-4 py-2 text-sm">+ Add Event</button>
      </div>
      {editing && (
        <div className="glass-strong rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{editing.id ? "Edit Event" : "New Event"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Field label="Date" value={editing.date} onChange={(v) => setEditing({ ...editing, date: v })} type="date" />
            <Field label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
            <Field label="Status" value={editing.status} onChange={(v) => setEditing({ ...editing, status: v })}
              options={[{ label: "Upcoming", value: "upcoming" }, { label: "Past", value: "past" }]} />
            <Field label="Luma URL" value={editing.luma_url} onChange={(v) => setEditing({ ...editing, luma_url: v })} placeholder="https://lu.ma/..." />
            <Field label="Image Path" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} placeholder="/images/event.jpg" />
          </div>
          <div className="mt-3">
            <Field label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => save(editing)} className="btn-gold px-4 py-2 text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-st-outline px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{r.title}</p>
              <p className="text-xs text-text-muted font-mono">{r.date} &middot; {r.location} &middot; {r.status}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(r)} className="text-xs text-gold-light hover:underline">Edit</button>
              <button onClick={() => del(r.id)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Members Panel (full CRUD) ───
function MembersPanel() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string> | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("members").select("*").order("connection_count", { ascending: false });
    setRows((data as Record<string, unknown>[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const save = async (form: Record<string, string>) => {
    const payload = {
      id: form.id || form.name.toLowerCase().replace(/\s+/g, "-"),
      name: form.name, role: form.role, company: form.company,
      skills: form.skills ? form.skills.split(",").map((s: string) => s.trim()) : [],
      lane: form.lane, twitter: form.twitter, avatar: form.avatar || null,
      featured: form.featured === "true",
    };
    const { error } = await supabase.from("members").upsert(payload, { onConflict: "id" });
    if (error) { alert(error.message); return; }
    setEditing(null);
    fetch_();
  };

  const del = async (id: string) => {
    if (confirm("Delete this member?")) { await supabase.from("members").delete().eq("id", id); fetch_(); }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await supabase.from("members").update({ featured: !featured }).eq("id", id);
    setRows((prev) => prev.map((m) => (m.id === id ? { ...m, featured: !featured } : m)));
  };

  const empty = { id: "", name: "", role: "", company: "", skills: "", lane: "General Web3", twitter: "", avatar: "", featured: "false" };

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Members ({rows.length})</h2>
        <button onClick={() => setEditing(empty)} className="btn-gold px-4 py-2 text-sm">+ Add Member</button>
      </div>
      {editing && (
        <div className="glass-strong rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{editing.id ? "Edit Member" : "New Member"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Field label="Role" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} placeholder="Developer, Designer..." />
            <Field label="Company" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
            <Field label="Lane" value={editing.lane} onChange={(v) => setEditing({ ...editing, lane: v })}
              options={[
                { label: "General Web3", value: "General Web3" }, { label: "DeFi", value: "DeFi" },
                { label: "NFT/Gaming", value: "NFT/Gaming" }, { label: "Infrastructure", value: "Infrastructure" },
                { label: "Community", value: "Community" },
              ]} />
            <Field label="Skills (comma-separated)" value={editing.skills} onChange={(v) => setEditing({ ...editing, skills: v })} placeholder="Rust, React, Solidity..." />
            <Field label="Twitter Handle" value={editing.twitter} onChange={(v) => setEditing({ ...editing, twitter: v })} placeholder="@handle" />
            <Field label="Avatar URL" value={editing.avatar} onChange={(v) => setEditing({ ...editing, avatar: v })} placeholder="https://..." />
            <Field label="Featured" value={editing.featured} onChange={(v) => setEditing({ ...editing, featured: v })}
              options={[{ label: "No", value: "false" }, { label: "Yes", value: "true" }]} />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => save(editing)} className="btn-gold px-4 py-2 text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-st-outline px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {rows.map((m) => (
          <div key={String(m.id)} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium">{String(m.name)}</p>
              <p className="text-xs text-text-muted font-mono">{String(m.role)} &middot; {String(m.company)} &middot; {Array.isArray(m.skills) ? m.skills.join(", ") : ""}</p>
            </div>
            <div className="flex gap-2 shrink-0 items-center">
              <button
                onClick={() => toggleFeatured(String(m.id), Boolean(m.featured))}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${m.featured ? "border-gold/40 text-gold-light bg-gold/10" : "border-border text-text-muted"}`}
              >
                {m.featured ? "Featured" : "Not Featured"}
              </button>
              <button onClick={() => setEditing({
                id: String(m.id), name: String(m.name), role: String(m.role), company: String(m.company),
                skills: Array.isArray(m.skills) ? m.skills.join(", ") : "", lane: String(m.lane),
                twitter: String(m.twitter), avatar: String(m.avatar || ""), featured: String(m.featured),
              })} className="text-xs text-gold-light hover:underline">Edit</button>
              <button onClick={() => del(String(m.id))} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Partners Panel (full CRUD) ───
function PartnersPanel() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string> | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("partners").select("*").order("sort_order", { ascending: true });
    setRows((data as Record<string, unknown>[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const save = async (form: Record<string, string>) => {
    const payload = { name: form.name, logo_src: form.logo_src, url: form.url, sort_order: parseInt(form.sort_order) || 0 };
    if (form.id) {
      await supabase.from("partners").update(payload).eq("id", form.id);
    } else {
      await supabase.from("partners").insert(payload);
    }
    setEditing(null);
    fetch_();
  };

  const del = async (id: string) => {
    if (confirm("Delete this partner?")) { await supabase.from("partners").delete().eq("id", id); fetch_(); }
  };

  const empty = { id: "", name: "", logo_src: "", url: "", sort_order: "0" };

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Partners ({rows.length})</h2>
        <button onClick={() => setEditing(empty)} className="btn-gold px-4 py-2 text-sm">+ Add Partner</button>
      </div>
      {editing && (
        <div className="glass-strong rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{editing.id ? "Edit Partner" : "New Partner"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Field label="Logo Path" value={editing.logo_src} onChange={(v) => setEditing({ ...editing, logo_src: v })} placeholder="/logos/partners/name.png" />
            <Field label="URL" value={editing.url} onChange={(v) => setEditing({ ...editing, url: v })} placeholder="https://..." />
            <Field label="Sort Order" value={editing.sort_order} onChange={(v) => setEditing({ ...editing, sort_order: v })} type="number" />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => save(editing)} className="btn-gold px-4 py-2 text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-st-outline px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={String(r.id)} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0 flex items-center gap-3">
              {String(r.logo_src || "") && <img src={String(r.logo_src)} alt="" className="w-8 h-8 rounded-lg object-contain bg-white/5" />}
              <div>
                <p className="font-medium">{String(r.name)}</p>
                <p className="text-xs text-text-muted font-mono truncate">{String(r.url)} &middot; order: {String(r.sort_order)}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing({
                id: String(r.id), name: String(r.name), logo_src: String(r.logo_src),
                url: String(r.url), sort_order: String(r.sort_order),
              })} className="text-xs text-gold-light hover:underline">Edit</button>
              <button onClick={() => del(String(r.id))} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects Panel (full CRUD) ───
function ProjectsPanel() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string> | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
    setRows((data as Record<string, unknown>[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const save = async (form: Record<string, string>) => {
    const payload = { name: form.name, url: form.url, logo: form.logo, category: form.category, description: form.description, founder: form.founder, sort_order: parseInt(form.sort_order) || 0 };
    if (form.id) {
      await supabase.from("projects").update(payload).eq("id", form.id);
    } else {
      await supabase.from("projects").insert(payload);
    }
    setEditing(null);
    fetch_();
  };

  const del = async (id: string) => {
    if (confirm("Delete this project?")) { await supabase.from("projects").delete().eq("id", id); fetch_(); }
  };

  const empty = { id: "", name: "", url: "", logo: "", category: "DeFi", description: "", founder: "", sort_order: "0" };

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Projects ({rows.length})</h2>
        <button onClick={() => setEditing(empty)} className="btn-gold px-4 py-2 text-sm">+ Add Project</button>
      </div>
      {editing && (
        <div className="glass-strong rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{editing.id ? "Edit Project" : "New Project"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Field label="URL" value={editing.url} onChange={(v) => setEditing({ ...editing, url: v })} placeholder="https://..." />
            <Field label="Logo Path" value={editing.logo} onChange={(v) => setEditing({ ...editing, logo: v })} placeholder="/logos/projects/name.png" />
            <Field label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })}
              options={[
                { label: "DeFi", value: "DeFi" }, { label: "Infrastructure", value: "Infrastructure" },
                { label: "Consumer", value: "Consumer" }, { label: "Community", value: "Community" },
              ]} />
            <Field label="Founder" value={editing.founder} onChange={(v) => setEditing({ ...editing, founder: v })} />
            <Field label="Sort Order" value={editing.sort_order} onChange={(v) => setEditing({ ...editing, sort_order: v })} type="number" />
          </div>
          <div className="mt-3">
            <Field label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => save(editing)} className="btn-gold px-4 py-2 text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-st-outline px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={String(r.id)} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0 flex items-center gap-3">
              {String(r.logo || "") && <img src={String(r.logo)} alt="" className="w-8 h-8 rounded-lg object-contain bg-white/5" />}
              <div>
                <p className="font-medium">{String(r.name)}</p>
                <p className="text-xs text-text-muted font-mono">{String(r.category)} &middot; {String(r.founder)} &middot; order: {String(r.sort_order)}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing({
                id: String(r.id), name: String(r.name), url: String(r.url), logo: String(r.logo),
                category: String(r.category), description: String(r.description),
                founder: String(r.founder), sort_order: String(r.sort_order),
              })} className="text-xs text-gold-light hover:underline">Edit</button>
              <button onClick={() => del(String(r.id))} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Announcements Panel (full CRUD) ───
function AnnouncementsPanel() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string> | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    setRows((data as Record<string, unknown>[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const save = async (form: Record<string, string>) => {
    const payload = { title: form.title, body: form.body, type: form.type, published: form.published === "true", pinned: form.pinned === "true" };
    if (form.id) {
      await supabase.from("announcements").update(payload).eq("id", form.id);
    } else {
      await supabase.from("announcements").insert(payload);
    }
    setEditing(null);
    fetch_();
  };

  const del = async (id: string) => {
    if (confirm("Delete this announcement?")) { await supabase.from("announcements").delete().eq("id", id); fetch_(); }
  };

  const empty = { id: "", title: "", body: "", type: "highlight", published: "false", pinned: "false" };

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Announcements ({rows.length})</h2>
        <button onClick={() => setEditing(empty)} className="btn-gold px-4 py-2 text-sm">+ Add Announcement</button>
      </div>
      {editing && (
        <div className="glass-strong rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">{editing.id ? "Edit Announcement" : "New Announcement"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Field label="Type" value={editing.type} onChange={(v) => setEditing({ ...editing, type: v })}
              options={[
                { label: "Highlight", value: "highlight" }, { label: "Announcement", value: "announcement" },
                { label: "Update", value: "update" },
              ]} />
            <Field label="Published" value={editing.published} onChange={(v) => setEditing({ ...editing, published: v })}
              options={[{ label: "Draft", value: "false" }, { label: "Published", value: "true" }]} />
            <Field label="Pinned" value={editing.pinned} onChange={(v) => setEditing({ ...editing, pinned: v })}
              options={[{ label: "No", value: "false" }, { label: "Yes", value: "true" }]} />
          </div>
          <div className="mt-3">
            <Field label="Body" value={editing.body} onChange={(v) => setEditing({ ...editing, body: v })} textarea />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => save(editing)} className="btn-gold px-4 py-2 text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-st-outline px-4 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={String(r.id)} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium">{String(r.title)}</p>
                {Boolean(r.pinned) && <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold/15 text-gold-light">Pinned</span>}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${Boolean(r.published) ? "bg-green-500/15 text-green-400" : "bg-white/5 text-text-muted"}`}>
                  {Boolean(r.published) ? "Live" : "Draft"}
                </span>
              </div>
              <p className="text-xs text-text-muted font-mono">{String(r.type)} &middot; {new Date(String(r.created_at)).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing({
                id: String(r.id), title: String(r.title), body: String(r.body),
                type: String(r.type), published: String(r.published), pinned: String(r.pinned),
              })} className="text-xs text-gold-light hover:underline">Edit</button>
              <button onClick={() => del(String(r.id))} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Site Content Panel (key-value CMS with add/delete) ───
function ContentPanel() {
  const [content, setContent] = useState<{ key: string; value: string; id?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKey, setNewKey] = useState("");

  useEffect(() => {
    supabase.from("site_content").select("*").order("key")
      .then(({ data }) => { setContent((data as { key: string; value: string; id: string }[]) || []); setLoading(false); });
  }, []);

  const handleUpdate = async (key: string, value: string) => {
    await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });
    setContent((prev) => prev.map((c) => c.key === key ? { ...c, value } : c));
  };

  const addKey = async () => {
    if (!newKey.trim()) return;
    const key = newKey.trim().toLowerCase().replace(/\s+/g, "_");
    await supabase.from("site_content").upsert({ key, value: "" }, { onConflict: "key" });
    setContent((prev) => [...prev, { key, value: "" }]);
    setNewKey("");
  };

  const deleteKey = async (key: string) => {
    if (confirm(`Delete content key "${key}"?`)) {
      await supabase.from("site_content").delete().eq("key", key);
      setContent((prev) => prev.filter((c) => c.key !== key));
    }
  };

  if (loading) return <p className="text-text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Site Content</h2>
          <p className="text-text-muted text-sm mt-1">Key-value pairs for hero text, descriptions, links, etc.</p>
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        <input
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addKey()}
          placeholder="New content key (e.g. hero_subtitle)"
          className="admin-input flex-1"
        />
        <button onClick={addKey} className="btn-gold px-4 py-2 text-sm">+ Add</button>
      </div>
      <div className="space-y-3">
        {content.map((item) => (
          <div key={item.key} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-gold-light uppercase tracking-wider">{item.key}</label>
              <button onClick={() => deleteKey(item.key)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
            <textarea
              value={item.value}
              onChange={(e) => setContent((prev) => prev.map((c) => c.key === item.key ? { ...c, value: e.target.value } : c))}
              onBlur={(e) => handleUpdate(item.key, e.target.value)}
              className="admin-input w-full min-h-[60px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
