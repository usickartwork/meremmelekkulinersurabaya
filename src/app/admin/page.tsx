import React from 'react';
import Link from 'next/link';
import { getArticles, getCategories, getAnalyticsSummary } from '@/lib/store';
import {
  FileText,
  Eye,
  CheckCircle,
  FileEdit,
  FolderTree,
  FileUp,
  Flame,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const summary = getAnalyticsSummary();
  const articles = getArticles();
  const categories = getCategories();

  const recentArticles = articles.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Dashboard Redaksi
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Ringkasan metrik publikasi, artikel populer, dan performa redaksi Merem Kuliner Surabaya.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/articles/new"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3.5 py-2 rounded-xs transition-colors shadow-xs"
          >
            + Tulis Berita Baru
          </Link>
          <Link
            href="/admin/import"
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs px-3.5 py-2 rounded-xs transition-colors inline-flex items-center gap-1.5"
          >
            <FileUp className="w-3.5 h-3.5 text-orange-400" />
            Import Word (.docx)
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Artikel</span>
            <FileText className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
            {summary.totalArticles}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            {summary.publishedCount} Terbit • {summary.draftCount} Draf
          </div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pembaca</span>
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
            {summary.totalViews.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Akumulasi tayang seluruh artikel
          </div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Kanal Kategori</span>
            <FolderTree className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
            {categories.length}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Kanal rubrik kuliner aktif
          </div>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Dibagikan</span>
            <Flame className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono">
            {summary.totalShares.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Interaksi WA, X & Facebook
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Articles & Top Read */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Articles Table */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full" />
              Artikel Terbaru di Ruang Redaksi
            </h3>
            <Link
              href="/admin/articles"
              className="text-xs text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-1"
            >
              Lihat Semua ({articles.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 uppercase text-[10px] tracking-wider border-b border-neutral-200">
                <tr>
                  <th className="py-2.5 px-3">Judul Artikel</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Views</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3 px-3 max-w-xs sm:max-w-md">
                      <p className="font-bold text-neutral-900 line-clamp-1">{art.title}</p>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {art.authorName} • {new Date(art.publishedAt || art.updatedAt).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[10px] font-medium">
                        {art.categoryName}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {art.status === 'published' ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Terbit
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Draf
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-neutral-600">
                      {art.views.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/articles/${art.id}`}
                        className="text-orange-600 hover:text-orange-800 font-bold text-xs hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Top 5 Most Read Leaderboard */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" /> Top Performa Artikel
              </h3>
              <span className="text-[10px] text-neutral-400 uppercase font-mono">Leaderboard</span>
            </div>

            <div className="space-y-3.5">
              {summary.topArticles.map((art, idx) => (
                <div key={art.id} className="flex items-start gap-3 text-xs">
                  <span className="font-black text-lg text-orange-600 leading-none w-5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/admin/articles/${art.id}`}
                      className="font-bold text-neutral-800 hover:text-orange-600 line-clamp-1 block transition-colors"
                    >
                      {art.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5 font-mono">
                      <span>{art.categoryName}</span>
                      <span>•</span>
                      <span className="text-neutral-600 font-semibold">
                        {art.views.toLocaleString('id-ID')} views
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Import Word CTA Box */}
          <div className="mt-6 p-4 bg-orange-50/70 border border-orange-200 rounded-xs">
            <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <FileUp className="w-4 h-4 text-orange-600" /> Impor Massal Cepat
            </h4>
            <p className="text-[11px] text-neutral-600 mb-3 leading-relaxed">
              Punya banyak artikel dalam satu file Microsoft Word (.docx)? Gunakan fitur import untuk
              memecahnya otomatis menjadi beberapa draft.
            </p>
            <Link
              href="/admin/import"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3 py-1.5 rounded transition-colors"
            >
              Buka Form Impor DOCX →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
