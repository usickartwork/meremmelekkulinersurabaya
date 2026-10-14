import React from 'react';
import Link from 'next/link';
import { Radio } from 'lucide-react';
import { Article } from '@/types';

interface BreakingNewsTickerProps {
  articles: Article[];
}

export default function BreakingNewsTicker({ articles }: BreakingNewsTickerProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center gap-3 text-xs sm:text-sm">
        {/* Pulsing Badge */}
        <div className="flex items-center gap-1.5 bg-orange-600 text-white font-bold px-2.5 py-1 rounded text-[11px] uppercase tracking-wider shrink-0 shadow-xs">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Kabar Hangat</span>
        </div>

        {/* Headlines carousel / marquee */}
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-flex items-center gap-8 animate-marquee">
            {articles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="hover:text-orange-600 transition-colors inline-flex items-center gap-2 group"
              >
                <span className="font-semibold text-neutral-900 group-hover:text-orange-600">
                  {article.title}
                </span>
                <span className="text-neutral-400 text-xs">
                  • {article.categoryName}
                </span>
                {idx < articles.length - 1 && (
                  <span className="text-neutral-300 ml-4">|</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
