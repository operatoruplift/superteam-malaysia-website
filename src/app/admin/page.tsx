"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// Untyped client for admin CRUD — avoids strict generic constraints
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "past";
  luma_url: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type Member = {
  id: string;
  name: string;
  role: string;
  company: string;
  skills: string[];
  lane: string;
  twitter: string;
  avatar: string | null;
  featured: boolean;
  connection_count: number;
};

type Tab = "events" | "members" | "partners" | "projects" | "content";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("events");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple password auth — in production, use Supabase Auth with role-based access
  const handleLogin = () => {
    if (process.env.NEXT_PUBLIC_ADMIN_PASSWORD && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
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
          <button onClick={handleLogin} className="btn-gold w-full py-3 text-sm">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-20 pb-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">CMS Dashboard</h1>
            <p className="text-text-muted text-sm mt-1">Manage your Superteam Malaysia website content</p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto">
          {(["events", "members", "partners", "projects", "content"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap ${
                tab === t
                  ? "bg-gold/15 text-gold-light"
                  : "text-text-muted hover:text-text-secondary hover:bg-white/[0.03]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "events" && <EventsPanel />}
        {tab === "members" && <MembersPanel />}
        {tab === "partners" && <GenericPanel table="partners" columns={["name", "logo_src", "url", "sort_order"]} />}
        {tab === "projects" && <GenericPanel table="projects" columns={["name", "url", "logo", "category", "description", "founder", "sort_order"]} />}
        {tab === "content" && <ContentPanel />}
      </div>
    </div>
  );
}

function EventsPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Event | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    setEvents(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const handleSave = async (event: Partial<Event> & { id?: string }) => {
    if (event.id) {
      await supabase.from("events").update(event).eq("id", event.id);
    } else {
      await supabase.from("events").insert(event as Event);
    }
    setEditing(null);
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this event?")) {
      await supabase.from("events").delete().eq("id", id);
      fetchEvents();
    }
  };

  if (loading) return <p className="text-text-muted">Loading events...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Events ({events.length})</h2>
        <button
          onClick={() => setEditing({ id: "", title: "", date: "", location: "", description: "", status: "upcoming", luma_url: "", image: "", created_at: "", updated_at: "" })}
          className="btn-gold px-4 py-2 text-sm"
        >
          + Add Event
        </button>
      </div>

      {editing && (
        <EventForm event={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      )}

      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{event.title}</p>
              <p className="text-xs text-text-muted font-mono">{event.date} &middot; {event.status}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(event)} className="text-xs text-gold-light hover:underline">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventForm({ event, onSave, onCancel }: { event: Event; onSave: (e: Partial<Event>) => void; onCancel: () => void }) {
  const [form, setForm] = useState(event);
  const isNew = !event.id;

  return (
    <div className="glass-strong rounded-xl p-6 mb-6">
      <h3 className="font-semibold mb-4">{isNew ? "New Event" : "Edit Event"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="admin-input" />
        <input placeholder="Date (YYYY-MM-DD)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="admin-input" />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="admin-input" />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "upcoming" | "past" })} className="admin-input">
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <input placeholder="Luma URL" value={form.luma_url} onChange={(e) => setForm({ ...form, luma_url: e.target.value })} className="admin-input" />
        <input placeholder="Image path" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="admin-input" />
      </div>
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input w-full mt-3 min-h-[80px]" />
      <div className="flex gap-2 mt-4">
        <button onClick={() => onSave(form)} className="btn-gold px-4 py-2 text-sm">Save</button>
        <button onClick={onCancel} className="btn-st-outline px-4 py-2 text-sm">Cancel</button>
      </div>
    </div>
  );
}

function MembersPanel() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("members").select("*").order("connection_count", { ascending: false })
      .then(({ data }) => { setMembers(data || []); setLoading(false); });
  }, []);

  const toggleFeatured = async (id: string, featured: boolean) => {
    await supabase.from("members").update({ featured: !featured }).eq("id", id);
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, featured: !featured } : m));
  };

  if (loading) return <p className="text-text-muted">Loading members...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Members ({members.length})</h2>
      <div className="space-y-2">
        {members.map((m) => (
          <div key={m.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium">{m.name}</p>
              <p className="text-xs text-text-muted font-mono">{m.role} &middot; {m.company} &middot; {m.skills.join(", ")}</p>
            </div>
            <button
              onClick={() => toggleFeatured(m.id, m.featured)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                m.featured ? "border-gold/40 text-gold-light bg-gold/10" : "border-border text-text-muted"
              }`}
            >
              {m.featured ? "Featured" : "Not Featured"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPanel({ table, columns }: { table: string; columns: string[] }) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from(table).select("*").order("sort_order", { ascending: true })
      .then(({ data }) => { setRows((data as Record<string, unknown>[]) || []); setLoading(false); });
  }, [table]);

  if (loading) return <p className="text-text-muted">Loading {table}...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 capitalize">{table} ({rows.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col} className="text-left text-text-muted font-mono text-xs p-3 uppercase">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-white/[0.02]">
                {columns.map((col) => (
                  <td key={col} className="p-3 text-text-secondary truncate max-w-[200px]">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentPanel() {
  const [content, setContent] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_content").select("*").order("key")
      .then(({ data }) => { setContent((data as { key: string; value: string }[]) || []); setLoading(false); });
  }, []);

  const handleUpdate = async (key: string, value: string) => {
    await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });
    setContent((prev) => prev.map((c) => c.key === key ? { ...c, value } : c));
  };

  if (loading) return <p className="text-text-muted">Loading content...</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Site Content</h2>
      <p className="text-text-muted text-sm mb-6">Edit key-value pairs used across the site (hero text, descriptions, etc.)</p>
      <div className="space-y-3">
        {content.map((item) => (
          <div key={item.key} className="glass rounded-xl p-4">
            <label className="text-xs font-mono text-gold-light uppercase tracking-wider block mb-2">{item.key}</label>
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
