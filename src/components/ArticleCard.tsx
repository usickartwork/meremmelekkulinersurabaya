import React from 'react';
import Link from 'next/link';
import { Clock, Eye, MapPin } from 'lucide-react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'vertical' | 'horizontal' | 'compact' | 'featured';
}

export default function ArticleCard({ article, variant = 'vertical' }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const categorySlug =
    article.categoryName
      ? article.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : article.categoryId;

  if (variant === 'compact') {
    return (
      <article className="group flex gap-3 items-start py-3 border-b border-neutral-100 last:border-none">
        <Link
          href={`/news/${article.slug}`}
          className="relative w-20 h-20 shrink-0 overflow-hidden rounded bg-neutral-100"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            href={`/category/${categorySlug}`}
            className="text-[10px] font-bold uppercase tracking-wider text-orange-600 hover:underline"
          >
            {article.categoryName}
          </Link>
          <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-orange-600 line-clamp-2 mt-0.5 leading-snug transition-colors">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Eye className="w-2.5 h-2.5" />
              {article.views.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group flex flex-col sm:flex-row gap-4 p-4 border border-neutral-200 bg-white hover:border-neutral-300 transition-all rounded-xs">
        <Link
          href={`/news/${article.slug}`}
          className="relative w-full sm:w-56 h-40 shrink-0 overflow-hidden bg-neutral-100"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {article.editorPick && (
            <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wide">
              Pilihan Editor
            </span>
          )}
        </Link>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                {article.categoryName}
              </span>
              <span className="text-neutral-300 text-xs">•</span>
              <span className="text-[11px] text-neutral-500">{formattedDate}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-orange-600 line-clamp-2 leading-tight transition-colors">
              <Link href={`/news/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
              {article.subtitle}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mt-3 pt-2 border-t border-neutral-100">
            <span className="font-medium text-neutral-700">{article.authorName}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTimeMinutes} mnt baca
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.views.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Vertical Card
  return (
    <article className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all duration-200">
      <Link
        href={`/news/${article.slug}`}
        className="relative w-full aspect-16/10 overflow-hidden bg-neutral-100 block"
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-white/95 backdrop-blur-xs text-neutral-900 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-neutral-200 shadow-xs">
            {article.categoryName}
          </span>
          {article.editorPick && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-xs">
              Editor Pick
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1.5">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTimeMinutes} mnt
            </span>
          </div>

          <h3 className="text-base font-bold text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
            <Link href={`/news/${article.slug}`}>{article.title}</Link>
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
          <span className="truncate max-w-[140px] text-neutral-700 font-medium">
            {article.authorName}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Eye className="w-3 h-3 text-neutral-400" />
            {article.views.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </article>
  );
}
