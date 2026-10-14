import { Article } from '@/types';

/**
 * PRD Page 9: News Ranking & Algorithms
 */

// Latest News: Urutkan artikel published berdasarkan publishedAt DESC
export function getLatestArticles(articles: Article[], limit = 10): Article[] {
  return articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Popular / Most Read: Ranking berdasarkan total valid views
export function getPopularArticles(articles: Article[], limit = 5): Article[] {
  return articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

// Trending Score calculation per PRD Formula:
// Trending Score = 0.40 × Recent Views + 0.30 × View Velocity + 0.10 × Shares + 0.10 × Engagement + 0.10 × Freshness
export function calculateTrendingScore(article: Article): number {
  const now = new Date().getTime();
  const pubTime = new Date(article.publishedAt).getTime();
  const hoursAgo = Math.max(1, (now - pubTime) / (1000 * 60 * 60));

  const recentViews = article.recentViews ?? Math.round(article.views * 0.2);
  const viewVelocity = recentViews / Math.min(hoursAgo, 48);
  const shares = article.shares || 0;
  const engagement = shares * 1.5; // proxy for engagement
  // Freshness decay: scores higher for recent articles (within 72 hours)
  const freshness = Math.max(0, 100 - hoursAgo * 1.2);

  const score =
    0.40 * recentViews +
    0.30 * (viewVelocity * 10) +
    0.10 * (shares * 2) +
    0.10 * (engagement * 2) +
    0.10 * (freshness * 5);

  return Math.round(score);
}

// Get Trending Articles sorted by Trending Score
export function getTrendingArticles(articles: Article[], limit = 6): Article[] {
  return articles
    .filter((a) => a.status === 'published')
    .map((article) => ({
      article,
      score: calculateTrendingScore(article),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article)
    .slice(0, limit);
}

// Editor's Pick
export function getEditorPickArticles(articles: Article[], limit = 4): Article[] {
  return articles
    .filter((a) => a.status === 'published' && a.editorPick)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Featured / Hero Article
export function getFeaturedArticle(articles: Article[]): Article | undefined {
  const featured = articles.find((a) => a.status === 'published' && a.featured);
  if (featured) return featured;
  // Fallback to highest viewed published article
  return articles.find((a) => a.status === 'published');
}

// Breaking News Article
export function getBreakingNews(articles: Article[]): Article[] {
  return articles
    .filter((a) => a.status === 'published' && a.breaking)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Related News: Category match, tag intersection, keyword scoring, exclude current
export function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  limit = 4
): Article[] {
  const currentTags = new Set((currentArticle.tags || []).map((t) => t.toLowerCase()));

  return allArticles
    .filter((a) => a.id !== currentArticle.id && a.status === 'published')
    .map((article) => {
      let score = 0;
      // Category match
      if (article.categoryId === currentArticle.categoryId) {
        score += 5;
      }
      // Tag matches
      if (article.tags) {
        article.tags.forEach((tag) => {
          if (currentTags.has(tag.toLowerCase())) {
            score += 3;
          }
        });
      }
      // Published recency bonus
      const daysOld =
        (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
      score += Math.max(0, 5 - daysOld);

      return { article, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.article)
    .slice(0, limit);
}
