import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import ArticleInteractiveBar from '@/components/ArticleInteractiveBar';
import { getArticleBySlug, getArticles, getCategories } from '@/lib/store';
import { getRelatedArticles } from '@/lib/ranking';
import { Clock, Calendar, MapPin, DollarSign, ArrowLeft, Tag, Bookmark } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import AdSlot from '@/components/ads/AdSlot';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan | Merem Kuliner Surabaya',
    };
  }

  return {
    title: `${article.title} | Merem Kuliner Surabaya`,
    description: article.subtitle || article.content.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.subtitle,
      images: [{ url: article.coverImage }],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.authorName],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.status !== 'published') {
    notFound();
  }

  const allArticles = getArticles();
  const categories = getCategories();
  const relatedArticles = getRelatedArticles(article, allArticles, 3);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header categories={categories} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {/* Header Billboard Advertisement */}
        <AdSlot placement="header" className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editorial Article Column */}
          <div className="lg:col-span-8">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-orange-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
              </Link>

              <div className="flex items-center gap-1.5">
                <Link href="/" className="hover:underline">Beranda</Link>
                <span>/</span>
                <Link href={`/category/${article.categoryId}`} className="text-orange-600 font-semibold hover:underline">
                  {article.categoryName}
                </Link>
              </div>
            </div>

            {/* Category Pill */}
            <div className="mb-3">
              <Link
                href={`/category/${article.categoryId}`}
                className="inline-block bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-xs hover:bg-orange-700 transition-colors"
              >
                {article.categoryName}
              </Link>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight mb-4 font-editorial-serif">
              {article.title}
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6 border-l-2 border-orange-500 pl-4">
              {article.subtitle}
            </p>

            {/* Author & Meta Row */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-neutral-200">
              <div>
                <p className="text-sm text-neutral-900">
                  <span className="text-neutral-500 font-medium text-xs">Penulis: </span>
                  <span className="font-bold text-neutral-900 hover:text-orange-600 transition-colors">{article.authorName}</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTimeMinutes} menit baca
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive View Tracking & Share Bar */}
            <ArticleInteractiveBar
              articleId={article.id}
              initialViews={article.views}
              initialShares={article.shares}
              title={article.title}
              slug={article.slug}
            />

            {/* Featured Cover Image & Caption */}
            <figure className="mb-8">
              <div className="w-full aspect-16/10 sm:aspect-21/10 overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {article.coverImageCaption && (
                <figcaption className="text-xs text-neutral-500 italic mt-2 px-1 text-center sm:text-left">
                  Foto: {article.coverImageCaption} (Dokumentasi Merem Kuliner)
                </figcaption>
              )}
            </figure>

            {/* Culinary Factsheet Card (if location/price info is present) */}
            {(article.location || article.priceRange || article.openingHours) && (
              <aside className="mb-8 p-5 bg-neutral-50 border-l-4 border-orange-600 border-y border-r border-neutral-200 text-xs sm:text-sm">
                <h4 className="font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full" />
                  Info Rujukan Kuliner
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-700">
                  {article.location && (
                    <div>
                      <span className="font-semibold block text-neutral-500 text-[11px]">LOKASI:</span>
                      <span>{article.location}</span>
                    </div>
                  )}
                  {article.priceRange && (
                    <div>
                      <span className="font-semibold block text-neutral-500 text-[11px]">KISARAN HARGA:</span>
                      <span>{article.priceRange}</span>
                    </div>
                  )}
                  {article.openingHours && (
                    <div>
                      <span className="font-semibold block text-neutral-500 text-[11px]">JAM OPERASIONAL:</span>
                      <span>{article.openingHours}</span>
                    </div>
                  )}
                </div>
              </aside>
            )}

            {/* Rich Article Body with Full Markdown Support & In-Article Ad Slot */}
            <article className="prose prose-neutral max-w-none text-neutral-800 text-base sm:text-lg leading-relaxed">
              <MarkdownRenderer content={article.content} showInArticleAd={true} />
            </article>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1 mr-2">
                    <Tag className="w-3.5 h-3.5" /> Topik Terkait:
                  </span>
                  {article.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="text-xs bg-neutral-100 hover:bg-orange-50 hover:text-orange-600 text-neutral-700 px-3 py-1 rounded-full transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Editorial Disclaimer */}
            <div className="mt-8 p-4 bg-neutral-50 border border-neutral-200 text-xs text-neutral-500 rounded-xs">
              <strong>Catatan Jurnalistik:</strong> Seluruh liputan kuliner di Merem Kuliner Surabaya
              dilakukan secara independen tanpa sponsor tersembunyi. Cita rasa, harga, dan jam operasional
              dapat berubah sewaktu-waktu sesuai kebijakan pengelola kuliner.
            </div>
          </div>

          {/* Desktop Dedicated Right Sidebar (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
            {/* Desktop 300x250 Sidebar Advertisement */}
            <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-xs flex flex-col items-center">
              <AdSlot placement="sidebar" />
            </div>

            {/* Sidebar Recommended Reads */}
            {relatedArticles.length > 0 && (
              <div className="bg-white p-5 border border-neutral-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 mb-4 pb-2 border-b-2 border-neutral-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 rounded-full" />
                  Rekomendasi Terkait
                </h4>
                <div className="space-y-4">
                  {relatedArticles.slice(0, 3).map((rel) => (
                    <ArticleCard key={rel.id} article={rel} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related News Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t-2 border-neutral-900">
            <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-900 mb-6 font-editorial-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-orange-600 inline-block" />
              Berita & Cerita Rasa Terkait
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="vertical" />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}
