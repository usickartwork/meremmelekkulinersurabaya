import fs from 'fs';
import path from 'path';
import { Article, Category, MediaItem, AnalyticsSummary } from '@/types';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_MEDIA } from './initial-data';
import { calculateTrendingScore, getTrendingArticles, getPopularArticles } from './ranking';

interface DatabaseSchema {
  articles: Article[];
  categories: Category[];
  media: MediaItem[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// In-memory cache
let inMemoryDb: DatabaseSchema | null = null;

function loadDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      inMemoryDb = JSON.parse(data);
      return inMemoryDb!;
    }
  } catch (err) {
    console.warn('Could not read db.json, using fallback:', err);
  }

  if (inMemoryDb) {
    return inMemoryDb;
  }

  inMemoryDb = {
    articles: INITIAL_ARTICLES,
    categories: INITIAL_CATEGORIES,
    media: INITIAL_MEDIA,
  };

  saveDb(inMemoryDb);
  return inMemoryDb;
}

function saveDb(db: DatabaseSchema): void {
  inMemoryDb = db;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist db.json to disk (falling back to memory):', err);
  }
}

// ---------------- Articles ---------------- //

export function getArticles(): Article[] {
  return loadDb().articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadDb().articles.find((a) => a.slug === slug);
}

export function getArticleById(id: string): Article | undefined {
  return loadDb().articles.find((a) => a.id === id);
}

export function createArticle(data: Omit<Article, 'id' | 'views' | 'shares' | 'updatedAt'>): Article {
  const db = loadDb();
  const id = `art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // If set to featured, unset any existing featured
  if (data.featured) {
    db.articles.forEach((a) => {
      a.featured = false;
    });
  }

  const newArticle: Article = {
    ...data,
    id,
    views: 0,
    recentViews: 0,
    shares: 0,
    updatedAt: now,
    publishedAt: data.publishedAt || now,
  };

  db.articles.unshift(newArticle);
  saveDb(db);
  return newArticle;
}

export function updateArticle(id: string, updates: Partial<Article>): Article | null {
  const db = loadDb();
  const index = db.articles.findIndex((a) => a.id === id);
  if (index === -1) return null;

  // If set to featured, unset others
  if (updates.featured) {
    db.articles.forEach((a) => {
      if (a.id !== id) a.featured = false;
    });
  }

  const updated: Article = {
    ...db.articles[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.articles[index] = updated;
  saveDb(db);
  return updated;
}

export function deleteArticle(id: string): boolean {
  const db = loadDb();
  const prevLen = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length !== prevLen) {
    saveDb(db);
    return true;
  }
  return false;
}

export function incrementArticleViews(id: string): number {
  const db = loadDb();
  const article = db.articles.find((a) => a.id === id);
  if (article) {
    article.views = (article.views || 0) + 1;
    article.recentViews = (article.recentViews || 0) + 1;
    saveDb(db);
    return article.views;
  }
  return 0;
}

export function incrementArticleShares(id: string): number {
  const db = loadDb();
  const article = db.articles.find((a) => a.id === id);
  if (article) {
    article.shares = (article.shares || 0) + 1;
    saveDb(db);
    return article.shares;
  }
  return 0;
}

// ---------------- Categories ---------------- //

export function getCategories(): Category[] {
  return loadDb().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return loadDb().categories.find((c) => c.slug === slug || c.id === slug);
}

export function createCategory(data: Omit<Category, 'id'>): Category {
  const db = loadDb();
  const id = `cat-${Date.now()}`;
  const newCat: Category = { ...data, id };
  db.categories.push(newCat);
  saveDb(db);
  return newCat;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const db = loadDb();
  const index = db.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.categories[index] = { ...db.categories[index], ...updates };
  saveDb(db);
  return db.categories[index];
}

export function deleteCategory(id: string): boolean {
  const db = loadDb();
  const prevLen = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);
  if (db.categories.length !== prevLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Media ---------------- //

export function getMedia(): MediaItem[] {
  return loadDb().media;
}

export function createMediaItem(data: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
  const db = loadDb();
  const id = `med-${Date.now()}`;
  const newItem: MediaItem = {
    ...data,
    id,
    uploadedAt: new Date().toISOString(),
  };
  db.media.unshift(newItem);
  saveDb(db);
  return newItem;
}

export function deleteMediaItem(id: string): boolean {
  const db = loadDb();
  const prevLen = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  if (db.media.length !== prevLen) {
    saveDb(db);
    return true;
  }
  return false;
}

// ---------------- Analytics ---------------- //

export function getAnalyticsSummary(): AnalyticsSummary {
  const db = loadDb();
  const articles = db.articles;

  const totalArticles = articles.length;
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalShares = articles.reduce((sum, a) => sum + (a.shares || 0), 0);

  const categoryDistribution = db.categories.map((c) => {
    const matching = articles.filter((a) => a.categoryId === c.id);
    return {
      categoryName: c.name,
      count: matching.length,
      views: matching.reduce((acc, curr) => acc + (curr.views || 0), 0),
    };
  });

  const topArticles = getPopularArticles(articles, 5);
  const trendingArticles = getTrendingArticles(articles, 5);

  // Generate last 7 days view trend
  const viewsByDate = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const factor = (i + 1) * 0.15;
    return {
      date: dateStr,
      views: Math.round(totalViews * (0.08 + factor * 0.05)),
    };
  });

  return {
    totalArticles,
    publishedCount,
    draftCount,
    totalViews,
    totalShares,
    categoryDistribution,
    topArticles,
    trendingArticles,
    viewsByDate,
  };
}
