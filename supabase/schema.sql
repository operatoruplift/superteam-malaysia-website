-- Superteam Malaysia CMS Schema
-- Run this in the Supabase SQL editor to set up the database

-- ─── Events ───
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past')),
  luma_url TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Members ───
CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  skills TEXT[] NOT NULL DEFAULT '{}',
  lane TEXT NOT NULL DEFAULT 'General Web3',
  twitter TEXT NOT NULL DEFAULT '',
  avatar TEXT,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  connection_count INTEGER NOT NULL DEFAULT 0,
  hackathon_wins INTEGER NOT NULL DEFAULT 0,
  projects_built INTEGER NOT NULL DEFAULT 0,
  grants_received INTEGER NOT NULL DEFAULT 0,
  bounties_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Partners (Ecosystem logos) ───
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_src TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Projects (Malaysian-built) ───
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'DeFi' CHECK (category IN ('DeFi', 'Infrastructure', 'Consumer', 'Community')),
  description TEXT NOT NULL DEFAULT '',
  founder TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Site Content (key-value CMS) ───
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by TEXT
);

-- ─── Auto-update timestamps ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS events_updated_at ON events;
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS members_updated_at ON members;
CREATE TRIGGER members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security ───
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "Public read events" ON events;
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read members" ON members;
CREATE POLICY "Public read members" ON members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read partners" ON partners;
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read projects" ON projects;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read site_content" ON site_content;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);

-- Service role has full access (for admin API routes)
-- The service role key bypasses RLS automatically

-- ─── Indexes ───
CREATE INDEX IF NOT EXISTS idx_events_date ON events (date DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON events (status);
CREATE INDEX IF NOT EXISTS idx_members_featured ON members (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_partners_sort ON partners (sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content (key);
