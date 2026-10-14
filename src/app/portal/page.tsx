import Image from "next/image";
import React from 'react';
import Header from '@/components/Header';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import HeroSection from '@/components/HeroSection';
import TrendingLeaderboard from '@/components/TrendingLeaderboard';
import EditorPickSection from '@/components/EditorPickSection';
import CategoryHighlights from '@/components/CategoryHighlights';
import Footer from '@/components/Footer';
import { getArticles, getCategories } from '@/lib/store';
import {
  getBreakingNews,
  getFeaturedArticle,
  getLatestArticles,
  getPopularArticles,
  getTrendingArticles,
  getEditorPickArticles,
} from '@/lib/ranking';

export const revalidate = 0; // Dynamic server rendering for fresh data

export default async function PortalPage() {
  const allArticles = getArticles();
  const categories = getCategories();

  const breakingNews = getBreakingNews(allArticles);
  const mainHero = getFeaturedArticle(allArticles) || allArticles[0];
  const subHero = getLatestArticles(allArticles, 6).filter((a) => a.id !== mainHero?.id).slice(0, 3);
  const popularArticles = getPopularArticles(allArticles, 5);
  const trendingArticles = getTrendingArticles(allArticles, 6);
  const editorPicks = getEditorPickArticles(allArticles, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Editorial Header */}
      <Header categories={categories} />

      {/* Breaking News Ticker */}
      <BreakingNewsTicker articles={breakingNews} />

      {/* Main Editorial Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full">
        {/* Hero Section */}
        {mainHero && <HeroSection mainArticle={mainHero} subArticles={subHero} />}

        {/* Trending & Top 5 Leaderboard */}
        <TrendingLeaderboard
          popularArticles={popularArticles}
          trendingArticles={trendingArticles}
        />

        {/* Editor's Pick Dark Editorial Block */}
        <EditorPickSection articles={editorPicks} />

        {/* Category Highlights */}
        <CategoryHighlights categories={categories} articles={allArticles} />
      </main>

      {/* Editorial Footer */}
      <Footer categories={categories} />
    </div>
  );
}

