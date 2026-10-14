import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticles, getCategories, getCategoryBySlug } from '@/lib/store';
import { ArrowLeft, SlidersHorizontal, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Kategori Tidak Ditemukan | Merem Kuliner' };
  }

  return {
    title: `${category.name} | Merem Kuliner Surabaya`,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { sort = 'latest' } = await searchParams;

  const category = getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const allArticles = getArticles();
  const categories = getCategories();

  let categoryArticles = allArticles.filter(
    (a) => a.categoryId === category.id && a.status === 'published'
  );

  if (sort === 'popular') {
    categoryArticles.sort((a, b) => b.views - a.views);
  } else {
    categoryArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header categories={categories} />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">{category.name}</span>
        </div>

        {/* Category Header Banner */}
        <div className="bg-neutral-900 text-white p-6 sm:p-10 mb-10 rounded-xs relative overflow-hidden border border-neutral-800">
          <div className="relative z-10 max-w-2xl">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-widest block mb-2">
              Kanal Berita & Liputan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3 font-editorial-serif">
              {category.name}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              {category.description}
            </p>
          </div>

          <div className="absolute right-4 bottom-4 text-neutral-800 opacity-20 pointer-events-none hidden md:block">
            <BookOpen className="w-48 h-48" />
          </div>
        </div>

        {/* Controls: Sort and Counter */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-8">
          <span className="text-xs sm:text-sm text-neutral-500 font-medium">
            Menampilkan <strong className="text-neutral-900">{categoryArticles.length}</strong> artikel dalam kategori ini
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 font-semibold flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Urutkan:
            </span>
            <Link
              href={`/category/${category.slug}?sort=latest`}
              className={`px-2.5 py-1 rounded transition-colors ${
                sort === 'latest'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Terbaru
            </Link>
            <Link
              href={`/category/${category.slug}?sort=popular`}
              className={`px-2.5 py-1 rounded transition-colors ${
                sort === 'popular'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Terpopuler
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="vertical" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 border border-neutral-200 rounded-xs">
            <p className="text-neutral-500 text-sm">
              Belum ada artikel yang dipublikasikan pada kategori ini.
            </p>
          </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}
