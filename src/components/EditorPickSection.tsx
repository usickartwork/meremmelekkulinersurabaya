import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import { Article } from '@/types';
import ArticleCard from './ArticleCard';

interface EditorPickSectionProps {
  articles: Article[];
}

export default function EditorPickSection({ articles }: EditorPickSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mb-12 bg-neutral-900 text-white p-6 sm:p-8 rounded-xs">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-orange-600 text-white rounded-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-editorial-serif">
              Pilihan Redaksi
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Liputan terkurasi dengan riset rasa mendalam oleh jurnalis kuliner Surabaya.
            </p>
          </div>
        </div>

        <Link
          href="/search?filter=editor"
          className="hidden sm:flex items-center gap-1.5 text-xs text-orange-400 hover:text-white font-semibold transition-colors"
        >
          Lihat Kurasi Lainnya <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => {
          const date = new Date(article.publishedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
          });
          return (
            <article
              key={article.id}
              className="group flex flex-col bg-neutral-800/80 border border-neutral-700/80 hover:border-orange-500 transition-colors"
            >
              <Link
                href={`/news/${article.slug}`}
                className="relative aspect-16/10 overflow-hidden bg-neutral-900 block"
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  {article.categoryName}
                </span>
              </Link>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-neutral-400 mb-1.5 flex items-center gap-2">
                    <span>{date}</span>
                    <span>•</span>
                    <span>{article.readingTimeMinutes} mnt baca</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-2 mt-2 leading-relaxed font-light">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-700 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-neutral-300 font-medium">{article.authorName}</span>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-orange-400 group-hover:text-white font-semibold text-[11px] inline-flex items-center gap-1"
                  >
                    Baca Ulasan <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
