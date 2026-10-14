'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Article, Category } from '@/types';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Flame,
  Radio,
  Award,
  Sparkles,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface ArticlesClientProps {
  initialArticles: Article[];
  categories: Category[];
}

export default function ArticlesClient({ initialArticles, categories }: ArticlesClientProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.authorName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.categoryId === categoryFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggle = async (
    id: string,
    field: 'featured' | 'breaking' | 'editorPick' | 'status'
  ) => {
    setLoadingId(id);
    const target = articles.find((a) => a.id === id);
    if (!target) return;

    let updates: Partial<Article> = {};
    if (field === 'status') {
      updates.status = target.status === 'published' ? 'draft' : 'published';
      if (updates.status === 'published' && !target.publishedAt) {
        updates.publishedAt = new Date().toISOString();
      }
    } else {
      updates[field] = !target[field];
    }

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success && data.article) {
        setArticles((prev) =>
          prev.map((a) => {
            if (field === 'featured' && updates.featured) {
              // Only one featured
              return a.id === id ? data.article : { ...a, featured: false };
            }
            return a.id === id ? data.article : a;
          })
        );
      }
    } catch (err) {
      alert('Gagal memperbarui status artikel');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus artikel "${title}"?`)) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(data.error || 'Gagal menghapus');
      }
    } catch (err) {
      alert('Gagal menghapus artikel');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Manajemen Artikel
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Kelola draf, publikasikan artikel, dan atur sorotan utama redaksi (Hero, Breaking, Pilihan Editor).
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xs transition-colors shadow-xs inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Tulis Artikel Baru
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-neutral-200 rounded-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Cari judul artikel atau author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs py-2 pl-8 pr-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 font-medium">Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-neutral-300 rounded px-2.5 py-1.5 bg-white text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-neutral-300 rounded px-2.5 py-1.5 bg-white text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="all">Semua Status</option>
              <option value="published">Terbit (Published)</option>
              <option value="draft">Draf (Draft)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white border border-neutral-200 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 uppercase text-[10px] tracking-wider border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4">Artikel & Penulis</th>
                <th className="py-3 px-3">Kategori</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Editorial Toggles</th>
                <th className="py-3 px-3 text-right">Views</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.length > 0 ? (
                filtered.map((article) => {
                  const isCurrentLoading = loadingId === article.id;
                  return (
                    <tr
                      key={article.id}
                      className={`hover:bg-neutral-50/70 transition-colors ${
                        isCurrentLoading ? 'opacity-50 pointer-events-none' : ''
                      }`}
                    >
                      {/* Title & Info */}
                      <td className="py-3.5 px-4 max-w-sm sm:max-w-md">
                        <div className="flex items-start gap-3">
                          <img
                            src={article.coverImage}
                            alt=""
                            className="w-12 h-12 object-cover rounded-xs border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-neutral-900 line-clamp-1 text-sm">
                              {article.title}
                            </p>
                            <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                              {article.authorName} • {new Date(article.publishedAt || article.updatedAt).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded text-[11px] font-medium">
                          {article.categoryName}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <button
                          onClick={() => handleToggle(article.id, 'status')}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors ${
                            article.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          {article.status === 'published' ? (
                            <>
                              <CheckCircle className="w-3 h-3" /> Terbit
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> Draf
                            </>
                          )}
                        </button>
                      </td>

                      {/* Editorial Flags / Toggles (Hero, Breaking, Editor's Pick) */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {/* Featured / Hero */}
                          <button
                            onClick={() => handleToggle(article.id, 'featured')}
                            title="Toggle Hero / Utama"
                            className={`p-1.5 rounded transition-colors text-[10px] font-semibold flex items-center gap-1 ${
                              article.featured
                                ? 'bg-orange-600 text-white'
                                : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Hero</span>
                          </button>

                          {/* Breaking News */}
                          <button
                            onClick={() => handleToggle(article.id, 'breaking')}
                            title="Toggle Breaking News Ticker"
                            className={`p-1.5 rounded transition-colors text-[10px] font-semibold flex items-center gap-1 ${
                              article.breaking
                                ? 'bg-red-600 text-white'
                                : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                            }`}
                          >
                            <Radio className="w-3.5 h-3.5" />
                            <span>Breaking</span>
                          </button>

                          {/* Editor's Pick */}
                          <button
                            onClick={() => handleToggle(article.id, 'editorPick')}
                            title="Toggle Pilihan Redaksi"
                            className={`p-1.5 rounded transition-colors text-[10px] font-semibold flex items-center gap-1 ${
                              article.editorPick
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                            }`}
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>Pick</span>
                          </button>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="py-3.5 px-3 text-right font-mono text-neutral-700 whitespace-nowrap">
                        <span className="flex items-center justify-end gap-1">
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          {article.views.toLocaleString('id-ID')}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {article.status === 'published' && (
                            <Link
                              href={`/news/${article.slug}`}
                              target="_blank"
                              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded"
                              title="Lihat di Web"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/articles/${article.id}`}
                            className="p-1.5 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded font-semibold inline-flex items-center gap-1"
                            title="Edit Artikel"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id, article.title)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 text-xs">
                    Tidak ada artikel yang cocok dengan filter pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
