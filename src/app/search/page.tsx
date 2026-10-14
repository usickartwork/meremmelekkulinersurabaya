import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticles, getCategories } from '@/lib/store';
import { Search as SearchIcon, Filter, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pencarian Berita Kuliner | Merem Kuliner Surabaya',
  description: 'Temukan ulasan, resep, dan berita kuliner favorit Anda di Kota Pahlawan.',
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    sort?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '', cat = 'all', sort = 'latest' } = await searchParams;

  const allArticles = getArticles();
  const categories = getCategories();

  let filtered = allArticles.filter((a) => a.status === 'published');

  if (q.trim()) {
    const query = q.toLowerCase().trim();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.subtitle.toLowerCase().includes(query) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(query))) ||
        (a.location && a.location.toLowerCase().includes(query)) ||
        a.authorName.toLowerCase().includes(query)
    );
  }

  if (cat !== 'all') {
    filtered = filtered.filter((a) => a.categoryId === cat);
  }

  if (sort === 'popular') {
    filtered.sort((a, b) => b.views - a.views);
  } else {
    filtered.sort(
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
          <span className="text-neutral-900 font-semibold">Pencarian Lanjut</span>
        </div>

        {/* Search Header Form */}
        <div className="bg-neutral-50 border border-neutral-200 p-6 mb-8 rounded-xs">
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-4 font-editorial-serif">
            Eksplorasi Arsip Kuliner
          </h1>

          <form action="/search" method="GET" className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Ketik kata kunci: misal 'rawon', 'cingur', 'bebek', 'kopi'..."
                className="w-full py-3 pl-11 pr-4 bg-white border border-neutral-300 rounded text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <SearchIcon className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-neutral-500" />
                <span className="font-semibold text-neutral-700">Kategori:</span>
                <select
                  name="cat"
                  defaultValue={cat}
                  className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-700">Urutkan:</span>
                <select
                  name="sort"
                  defaultValue={sort}
                  className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Paling Populer</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-1.5 rounded transition-colors text-xs ml-auto"
              >
                Cari Berita
              </button>
            </div>
          </form>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
          <p className="text-sm text-neutral-600">
            Ditemukan <strong className="text-neutral-900">{filtered.length}</strong> artikel{' '}
            {q && (
              <span>
                untuk kata kunci &ldquo;<span className="text-orange-600 font-semibold">{q}</span>&rdquo;
              </span>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} variant="vertical" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-xs">
            <SearchIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-800 mb-1">
              Tidak Ada Artikel yang Cocok
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Coba gunakan kata kunci lain seperti &quot;rawon&quot;, &quot;tahu&quot;, &quot;bebek&quot;, atau pilih &quot;Semua Kategori&quot;.
            </p>
          </div>
        )}
      </main>

      <Footer categories={categories} />
    </div>
  );
}
