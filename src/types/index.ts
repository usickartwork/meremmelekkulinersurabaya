export type ArticleStatus = 'published' | 'draft';

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  status: ArticleStatus;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  categoryId: string;
  categoryName: string;
  publishedAt: string; // ISO date
  updatedAt: string;
  featured: boolean; // Hero/Featured story
  editorPick: boolean; // Editor's choice
  breaking: boolean; // Breaking banner
  coverImage: string;
  coverImageCaption?: string;
  additionalImages?: string[];
  tags: string[];
  views: number;
  recentViews?: number; // views in last 24h
  shares: number;
  readingTimeMinutes: number;
  // Culinary specific editorial metadata
  location?: string;
  priceRange?: string; // e.g. Rp 25.000 - Rp 50.000
  openingHours?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  order: number;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string;
  caption?: string;
  uploadedAt: string;
  sizeBytes?: number;
}

export interface ViewEvent {
  id: string;
  articleId: string;
  visitorId: string;
  createdAt: string;
}

export interface ShareEvent {
  id: string;
  articleId: string;
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'copylink';
  createdAt: string;
}

export interface ImportPreviewArticle {
  title: string;
  category: string;
  author: string;
  tags: string[];
  featuredImage?: string;
  content: string;
  breaking: boolean;
  editorPick: boolean;
  isValid: boolean;
  missingFields: string[];
}

export interface AnalyticsSummary {
  totalArticles: number;
  publishedCount: number;
  draftCount: number;
  totalViews: number;
  totalShares: number;
  categoryDistribution: { categoryName: string; count: number; views: number }[];
  topArticles: Article[];
  trendingArticles: Article[];
  viewsByDate: { date: string; views: number }[];
}
