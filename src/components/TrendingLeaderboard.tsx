import React from 'react';
import Link from 'next/link';
import { Flame, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { Article } from '@/types';
import AdSlot from './ads/AdSlot';

interface TrendingLeaderboardProps {
  popularArticles: Article[];
  trendingArticles: Article[];
}

export default function TrendingLeaderboard({
  popularArticles,
  trendingArticles,
}: TrendingLeaderboardProps) {
  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-orange-600 rounded-xs" />
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Trending & Terpopuler
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <span className="flex items-center gap-1 text-orange-600">
            <Flame className="w-4 h-4 fill-orange-500" /> Algoritma Real-Time
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Trending News Grid (Binduz style) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {trendingArticles.slice(0, 4).map((article) => {
              const formattedDate = new Date(article.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
              });
              return (
                <article
                  key={article.id}
                  className="group bg-white border border-neutral-200 hover:border-neutral-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <Link
                      href={`/news/${article.slug}`}
                      className="block relative aspect-16/10 overflow-hidden bg-neutral-100"
                    >
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        Trending
                      </span>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1.5">
                        <span className="text-orange-600 font-bold uppercase tracking-wider">
                          {article.categoryName}
                        </span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-orange-600 line-clamp-2 leading-snug transition-colors">
                        <Link href={`/news/${article.slug}`}>{article.title}</Link>
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs text-neutral-400">
                    <span className="text-neutral-700 font-medium truncate max-w-[120px]">
                      {article.authorName}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                      <Eye className="w-3 h-3 text-orange-500" />
                      {article.views.toLocaleString('id-ID')} views
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Side: USA Today style Numbered Leaderboard (1 to 5) */}
        <div className="lg:col-span-4 bg-neutral-50/80 p-5 border border-neutral-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" /> Top 5 Terbanyak Dibaca
            </h3>
            <span className="text-[11px] font-medium text-neutral-500">Semua Waktu</span>
          </div>

          <div className="space-y-4">
            {popularArticles.slice(0, 5).map((article, index) => {
              const rank = index + 1;
              return (
                <article
                  key={article.id}
                  className="group flex items-start gap-4 pb-4 border-b border-neutral-200/70 last:border-none last:pb-0"
                >
                  {/* Large Number Callout */}
                  <span
                    className={`font-black text-2xl sm:text-3xl leading-none w-8 shrink-0 text-center font-editorial-serif ${
                      rank === 1
                        ? 'text-orange-600'
                        : rank <= 3
                        ? 'text-neutral-800'
                        : 'text-neutral-400'
                    }`}
                  >
                    0{rank}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      {article.categoryName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-orange-600 line-clamp-2 leading-snug transition-colors mt-0.5">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1 font-mono">
                      <span>{article.views.toLocaleString('id-ID')} pembaca</span>
                    </div>
                  </div>

                  <Link
                    href={`/news/${article.slug}`}
                    className="relative w-14 h-14 shrink-0 overflow-hidden bg-neutral-200 rounded-xs"
                  >
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Simulated Desktop Sidebar Advertisement (300x250) */}
          <div className="hidden lg:block pt-5 mt-5 border-t border-neutral-200">
            <AdSlot placement="sidebar" />
          </div>
        </div>
      </div>
    </section>
  );
}
