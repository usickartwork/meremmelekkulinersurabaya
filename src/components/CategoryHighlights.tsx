import React from 'react';
import Link from 'next/link';
import { ChevronRight, Utensils, Coffee, Compass } from 'lucide-react';
import { Article, Category } from '@/types';
import ArticleCard from './ArticleCard';

interface CategoryHighlightsProps {
  categories: Category[];
  articles: Article[];
}

export default function CategoryHighlights({ categories, articles }: CategoryHighlightsProps) {
  // Take all 5 primary channels
  const targetCategories = categories;

  return (
    <div className="space-y-12 mb-14">
      {targetCategories.map((category) => {
        const categoryArticles = articles
          .filter((a) => a.categoryId === category.id && a.status === 'published')
          .slice(0, 3);

        if (categoryArticles.length === 0) return null;

        const mainArticle = categoryArticles[0];
        const sideArticles = categoryArticles.slice(1);

        return (
          <section key={category.id} className="border-t border-neutral-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-6 bg-orange-600 inline-block" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 font-editorial-serif">
                    {category.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-1">{category.description}</p>
                </div>
              </div>

              <Link
                href={`/category/${category.slug}`}
                className="text-xs font-bold text-neutral-600 hover:text-orange-600 inline-flex items-center gap-1 transition-colors"
              >
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Highlight Card (Large) */}
              <div className="md:col-span-6 lg:col-span-7">
                <ArticleCard article={mainArticle} variant="vertical" />
              </div>

              {/* Side Cards (Compact / Horizontal) */}
              <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between gap-4">
                {sideArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}

                {/* Cultural Quote or Culinary Note */}
                <div className="p-4 bg-orange-50/60 border border-orange-200/60 rounded-xs mt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 block mb-1">
                    Catatan Redaksi Kuliner
                  </span>
                  <p className="text-xs text-neutral-700 italic leading-relaxed">
                    "Setiap sudut jalanan Surabaya menyimpan cerita rempah yang diwariskan turun-temurun, merajut identitas rasa yang tak tergantikan."
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
