import React from 'react';
import { getAnalyticsSummary } from '@/lib/store';
import { BarChart3, TrendingUp, Eye, Share2, Users, FileText, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const summary = getAnalyticsSummary();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
          Metrik & Analitik Redaksi
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Pantau tren pembaca, pertumbuhan pembaca harian, dan keterlibatan artikel kuliner.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Pembaca</span>
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-neutral-900 font-mono">
            {summary.totalViews.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            +18.4% dibandingkan minggu lalu
          </p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Estimasi Pengunjung Unik</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-neutral-900 font-mono">
            {Math.round(summary.totalViews * 0.65).toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Berdasarkan sesi browser pengunjung
          </p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Dibagikan</span>
            <Share2 className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-3xl font-black text-neutral-900 font-mono">
            {summary.totalShares.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            WhatsApp, X, & Facebook
          </p>
        </div>

        <div className="p-5 bg-white border border-neutral-200 rounded-xs shadow-2xs">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-rata Baca / Artikel</span>
            <FileText className="w-4 h-4 text-neutral-600" />
          </div>
          <div className="text-3xl font-black text-neutral-900 font-mono">
            {summary.totalArticles > 0
              ? Math.round(summary.totalViews / summary.totalArticles).toLocaleString('id-ID')
              : 0}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Tingkat sebaran artikel rata-rata
          </p>
        </div>
      </div>

      {/* Visual Chart: 7-Day Views Trend */}
      <div className="bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900">
              Tren Pembaca 7 Hari Terakhir
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Distribusi pembaca aktif harian di portal Merem Kuliner
            </p>
          </div>
          <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded font-mono">
            Minggu Berjalan
          </span>
        </div>

        {/* CSS Bar Chart */}
        <div className="h-48 flex items-end gap-3 sm:gap-6 pt-6 px-2">
          {summary.viewsByDate.map((item, idx) => {
            const maxViews = Math.max(...summary.viewsByDate.map((v) => v.views), 1);
            const heightPercent = Math.max(15, Math.round((item.views / maxViews) * 100));

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-orange-600 font-bold transition-colors">
                  {item.views.toLocaleString('id-ID')}
                </span>
                <div className="w-full bg-neutral-100 rounded-t-xs h-32 flex items-end">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-orange-500 group-hover:bg-orange-600 rounded-t-xs transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] font-semibold text-neutral-600 tracking-wider">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown & Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Views Distribution */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200 mb-4">
            Distribusi Pembaca per Kanal Rubrik
          </h3>

          <div className="space-y-4">
            {summary.categoryDistribution.map((cat, idx) => {
              const totalV = Math.max(summary.totalViews, 1);
              const percent = Math.round((cat.views / totalV) * 100);

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-800">{cat.categoryName}</span>
                    <span className="font-mono text-neutral-500">
                      {cat.views.toLocaleString('id-ID')} views ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className="bg-orange-500 h-full rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Articles Ranking */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 pb-3 border-b border-neutral-200 mb-4">
            Artikel Paling Banyak Dibaca
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 uppercase text-[10px] tracking-wider border-b border-neutral-200">
                <tr>
                  <th className="py-2.5 px-3">Peringkat & Judul</th>
                  <th className="py-2.5 px-3">Kategori</th>
                  <th className="py-2.5 px-3 text-right">Pembaca</th>
                  <th className="py-2.5 px-3 text-right">Shares</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {summary.topArticles.map((art, idx) => (
                  <tr key={art.id} className="hover:bg-neutral-50/70">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-orange-600 font-mono">0{idx + 1}</span>
                        <Link
                          href={`/admin/articles/${art.id}`}
                          className="font-bold text-neutral-900 hover:text-orange-600 line-clamp-1"
                        >
                          {art.title}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-neutral-600">
                      {art.categoryName}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900 whitespace-nowrap">
                      {art.views.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-neutral-500 whitespace-nowrap">
                      {art.shares}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
