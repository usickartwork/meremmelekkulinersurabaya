'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Article, Category, MediaItem } from '@/types';
import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Radio,
  Award,
  Image as ImageIcon,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  X,
} from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface ArticleEditorFormProps {
  initialArticle?: Article;
  categories: Category[];
  media: MediaItem[];
}

export default function ArticleEditorForm({
  initialArticle,
  categories,
  media,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialArticle);

  const [title, setTitle] = useState(initialArticle?.title || '');
  const [slug, setSlug] = useState(initialArticle?.slug || '');
  const [subtitle, setSubtitle] = useState(initialArticle?.subtitle || '');
  const [content, setContent] = useState(initialArticle?.content || '');
  const [categoryId, setCategoryId] = useState(
    initialArticle?.categoryId || (categories[0]?.id || '')
  );
  const [authorName, setAuthorName] = useState(initialArticle?.authorName || 'Filius Patris');
  const [coverImage, setCoverImage] = useState(
    initialArticle?.coverImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80'
  );
  const [coverImageCaption, setCoverImageCaption] = useState(
    initialArticle?.coverImageCaption || ''
  );
  const [tagsInput, setTagsInput] = useState(
    initialArticle?.tags ? initialArticle.tags.join(', ') : 'kuliner, surabaya'
  );
  const [location, setLocation] = useState(initialArticle?.location || '');
  const [priceRange, setPriceRange] = useState(initialArticle?.priceRange || '');
  const [openingHours, setOpeningHours] = useState(initialArticle?.openingHours || '');

  // Editorial Toggles
  const [featured, setFeatured] = useState(initialArticle?.featured || false);
  const [breaking, setBreaking] = useState(initialArticle?.breaking || false);
  const [editorPick, setEditorPick] = useState(initialArticle?.editorPick || false);

  const [status, setStatus] = useState<'published' | 'draft'>(
    initialArticle?.status || 'draft'
  );

  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Auto-slug generator on title blur
  const handleTitleBlur = () => {
    if (!slug) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  };

  const handleSave = async (targetStatus?: 'published' | 'draft') => {
    if (!title.trim() || !content.trim() || !categoryId) {
      alert('Judul, Kategori, dan Isi Konten wajib diisi.');
      return;
    }

    setSaving(true);
    const saveStatus = targetStatus || status;

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle,
      content,
      categoryId,
      authorName,
      coverImage,
      coverImageCaption,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      location,
      priceRange,
      openingHours,
      featured,
      breaking,
      editorPick,
      status: saveStatus,
    };

    try {
      const url = isEdit ? `/api/articles/${initialArticle!.id}` : '/api/articles';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/articles');
        router.refresh();
      } else {
        alert(data.error || 'Gagal menyimpan artikel');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menyimpan artikel.');
    } finally {
      setSaving(false);
    }
  };

  const selectedCategoryName = categories.find((c) => c.id === categoryId)?.name || 'Kategori';

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded bg-white border border-neutral-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
              {isEdit ? 'Sunting Artikel' : 'Tulis Liputan Kuliner Baru'}
            </h1>
            <p className="text-xs text-neutral-500">
              Formulir editorial lengkap dengan metadata kuliner dan pratinjau live.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3 py-2 rounded-xs transition-colors inline-flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Pratinjau
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold px-3 py-2 rounded-xs transition-colors"
          >
            Simpan Draf
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xs transition-colors shadow-xs inline-flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Menyimpan...' : 'Terbitkan Sekarang'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Main Editor */}
        <div className="lg:col-span-8 space-y-5 bg-white p-6 border border-neutral-200 rounded-xs shadow-2xs">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Judul Liputan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Menguak Rahasia Rawon Setan Embong Malang..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              className="w-full text-base sm:text-lg font-bold py-2.5 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 font-editorial-serif"
            />
          </div>

          {/* Subtitle / Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Subjudul / Ringkasan Editorial
            </label>
            <textarea
              rows={2}
              placeholder="Ringkasan singkat yang memikat pembaca di homepage..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 leading-relaxed"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
              Slug URL
            </label>
            <div className="flex items-center text-xs text-neutral-400 border border-neutral-300 rounded overflow-hidden">
              <span className="bg-neutral-100 px-3 py-2 border-r border-neutral-300 font-mono">
                /news/
              </span>
              <input
                type="text"
                placeholder="judul-artikel-kuliner"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full py-2 px-3 text-neutral-800 font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Rich Content Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                Isi Artikel <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-neutral-400">
                Mendukung Markdown (### Subjudul, &gt; Kutipan, **tebal**)
              </span>
            </div>
            <textarea
              rows={14}
              required
              placeholder="Tulis ulasan liputan kuliner secara mendalam..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs sm:text-sm font-sans py-3 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 leading-relaxed"
            />
          </div>

          {/* Culinary Meta Box */}
          <div className="p-4 bg-orange-50/50 border border-orange-200 rounded-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-600" /> Informasi Teknis Kuliner
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Lokasi / Alamat</label>
                <input
                  type="text"
                  placeholder="Jl. Embong Malang No. 78"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-white border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Kisaran Harga</label>
                <input
                  type="text"
                  placeholder="Rp 25.000 - Rp 45.000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-white border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Jam Operasional</label>
                <input
                  type="text"
                  placeholder="08.00 - 23.00 WIB"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  className="w-full py-1.5 px-2.5 bg-white border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Editorial Flags */}
        <div className="lg:col-span-4 space-y-5">
          {/* Publication & Category Card */}
          <div className="bg-white p-5 border border-neutral-200 rounded-xs shadow-2xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-2">
              Kategori & Publikasi
            </h3>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Kategori Rubrik <span className="text-red-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full py-2 px-3 border border-neutral-300 rounded bg-white text-xs focus:outline-none focus:border-orange-500 font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nama Penulis / Jurnalis
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full py-2 px-3 border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Tag Artikel (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                placeholder="rawon, embong malang, street food"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full py-2 px-3 border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white p-5 border border-neutral-200 rounded-xs shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                Foto Utama (Cover)
              </h3>
              <button
                type="button"
                onClick={() => setShowMediaPicker(!showMediaPicker)}
                className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
              >
                {showMediaPicker ? 'Tutup Pilihan' : 'Pilih dari Media'}
              </button>
            </div>

            {/* Preview Image */}
            {coverImage && (
              <div className="relative aspect-16/10 rounded overflow-hidden bg-neutral-100 border border-neutral-200">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Media quick picker grid */}
            {showMediaPicker && (
              <div className="p-2 bg-neutral-50 border border-neutral-200 rounded max-h-48 overflow-y-auto grid grid-cols-3 gap-2">
                {media.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setCoverImage(m.url);
                      setCoverImageCaption(m.caption || m.alt);
                      setShowMediaPicker(false);
                    }}
                    className="relative aspect-square overflow-hidden border border-neutral-300 hover:border-orange-500 rounded focus:outline-none"
                  >
                    <img src={m.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">URL Foto</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full py-1.5 px-2.5 border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Keterangan Foto (Caption)</label>
              <input
                type="text"
                placeholder="Dokumentasi seporsi rawon..."
                value={coverImageCaption}
                onChange={(e) => setCoverImageCaption(e.target.value)}
                className="w-full py-1.5 px-2.5 border border-neutral-300 rounded text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Editorial Flags / Toggles Card */}
          <div className="bg-white p-5 border border-neutral-200 rounded-xs shadow-2xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-2">
              Sorotan Editorial (PRD Flags)
            </h3>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Berita Utama (Hero Homepage)
                </span>
                <p className="text-[11px] text-neutral-500">
                  Tampil sebagai artikel terbesar di bagian atas homepage.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={breaking}
                onChange={(e) => setBreaking(e.target.checked)}
                className="mt-0.5 rounded text-red-600 focus:ring-red-500 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-red-600" /> Breaking News Ticker
                </span>
                <p className="text-[11px] text-neutral-500">
                  Muncul di pita berjalan kabar hangat paling atas.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editorPick}
                onChange={(e) => setEditorPick(e.target.checked)}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Pilihan Redaksi (Editor's Pick)
                </span>
                <p className="text-[11px] text-neutral-500">
                  Tampil pada kotak khusus kurasi redaksi.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xs p-6 sm:p-8 relative">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-neutral-900 bg-neutral-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pb-2 border-b border-neutral-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                Pratinjau Editorial Sebelum Terbit
              </span>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                {selectedCategoryName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 font-editorial-serif leading-tight">
                {title || 'Judul Belum Diisi'}
              </h1>
              <p className="text-sm text-neutral-600 italic border-l-2 border-orange-500 pl-3">
                {subtitle || 'Ringkasan editorial belum diisi.'}
              </p>

              {coverImage && (
                <div className="aspect-16/10 overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img src={coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-800 pt-4 border-t border-neutral-100">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-neutral-400">Konten artikel masih kosong.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
