-- ============================================================
-- Merem Kuliner Surabaya - Supabase PostgreSQL Database Schema
-- Reference: PRD Section 10 (Data Model) & Section 11 (Technical Architecture)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  encrypted_password TEXT,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'editor',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Articles
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  author_id TEXT,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  editor_pick BOOLEAN DEFAULT FALSE,
  breaking BOOLEAN DEFAULT FALSE,
  cover_image TEXT,
  cover_image_caption TEXT,
  additional_images JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  views BIGINT DEFAULT 0,
  recent_views BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  reading_time_minutes INT DEFAULT 3,
  location TEXT,
  price_range TEXT,
  opening_hours TEXT,
  seo_title TEXT,
  seo_description TEXT
);

-- 4. Tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- 5. Media Library
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  caption TEXT,
  size_bytes BIGINT DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. View Events (for ranking and analytics)
CREATE TABLE IF NOT EXISTS view_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
  visitor_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Share Events
CREATE TABLE IF NOT EXISTS share_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_view_events_article_id ON view_events(article_id);
CREATE INDEX IF NOT EXISTS idx_view_events_created_at ON view_events(created_at DESC);
