import React from 'react';
import Link from 'next/link';
import { Clock, Eye, ChevronRight, Sparkles } from 'lucide-react';
import { Article } from '@/types';

interface HeroSectionProps {
  mainArticle: Article;
  subArticles: Article[];
}

export default function HeroSection({ mainArticle, subArticles }: HeroSectionProps) {
  if (!mainArticle) return null;

  const formattedDate = new Date(mainArticle.publishedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Hero Article (BBC / USA Today style) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="group relative flex-1 overflow-hidden border border-neutral-200 bg-white flex flex-col justify-end min-h-[420px] sm:min-h-[500px]">
            {/* Background Image with subtle gradient */}
            <div className="absolute inset-0 z-0">
              <img
                src={mainArticle.coverImage}
                alt={mainArticle.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
            </div>

            {/* Hero Content Overlay */}
            <div className="relative z-10 p-6 sm:p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded-xs inline-flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" /> Berita Utama
                </span>
                <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-xs border border-white/20">
                  {mainArticle.categoryName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3 font-editorial-serif">
                <Link
                  href={`/news/${mainArticle.slug}`}
                  className="hover:underline decoration-orange-500 underline-offset-4"
                >
                  {mainArticle.title}
                </Link>
              </h2>

              <p className="text-neutral-200 text-sm sm:text-base line-clamp-2 max-w-2xl mb-4 leading-relaxed font-light">
                {mainArticle.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20 text-xs text-neutral-300">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{mainArticle.authorName}</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {mainArticle.readingTimeMinutes} mnt baca
                  </span>
                </div>

                <Link
                  href={`/news/${mainArticle.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white text-neutral-900 hover:bg-orange-600 hover:text-white px-3.5 py-1.5 font-bold text-xs rounded-xs transition-colors shadow-sm"
                >
                  Baca Selengkapnya
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-featured Side Cards (Binduz / Phanatik style) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="border-b-2 border-neutral-900 pb-2 mb-1 flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-wider uppercase text-neutral-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full" />
              Sorotan Terkini
            </h3>
            <span className="text-xs text-neutral-500 font-medium">Liputan Khusus</span>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-4">
            {subArticles.slice(0, 3).map((article) => {
              const subDate = new Date(article.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
              });
              return (
                <article
                  key={article.id}
                  className="group flex-1 flex gap-4 p-3.5 bg-white border border-neutral-200 hover:border-neutral-300 transition-all rounded-xs"
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="relative w-28 h-24 sm:w-32 sm:h-auto shrink-0 overflow-hidden bg-neutral-100"
                  >
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                        {article.categoryName}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-orange-600 line-clamp-2 mt-1 leading-snug transition-colors">
                        <Link href={`/news/${article.slug}`}>{article.title}</Link>
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-2">
                      <span>{subDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-2.5 h-2.5" />
                        {article.views.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
