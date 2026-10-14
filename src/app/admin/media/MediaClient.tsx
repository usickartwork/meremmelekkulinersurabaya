'use client';

import React, { useState } from 'react';
import { MediaItem } from '@/types';
import { Image as ImageIcon, Plus, Copy, Check, Search, Calendar, Link2, X, Trash2 } from 'lucide-react';

interface MediaClientProps {
  initialMedia: MediaItem[];
}

export default function MediaClient({ initialMedia }: MediaClientProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [filename, setFilename] = useState('');
  const [saving, setSaving] = useState(false);

  const filtered = mediaList.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.alt.toLowerCase().includes(search.toLowerCase()) ||
      (m.caption && m.caption.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = async (item: MediaItem) => {
    if (!confirm(`Hapus gambar "${item.filename}" dari galeri?`)) return;

    try {
      const res = await fetch(`/api/media?id=${item.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMediaList((prev) => prev.filter((m) => m.id !== item.id));
      } else {
        alert(data.error || 'Gagal menghapus gambar');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus gambar');
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          alt: alt || 'Dokumentasi Kuliner Surabaya',
          caption,
          filename: filename || `kuliner-${Date.now()}.jpg`,
        }),
      });

      const data = await res.json();
      if (data.success && data.media) {
        setMediaList((prev) => [data.media, ...prev]);
        setUrl('');
        setAlt('');
        setCaption('');
        setFilename('');
        setIsAdding(false);
      } else {
        alert(data.error || 'Gagal menambahkan gambar');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menambahkan media');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Galeri Media Redaksi
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Kumpulan aset visual kuliner Surabaya berkualitas tinggi untuk dipakai berulang di berbagai artikel.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xs transition-colors shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Tambah Gambar ke Galeri
          </button>
        )}
      </div>

      {/* Add Media Form */}
      {isAdding && (
        <form
          onSubmit={handleAddMedia}
          className="bg-white border-2 border-orange-500 p-6 rounded-xs shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">
              Tambah Foto Baru ke Media Library
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                URL Gambar <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Nama File</label>
              <input
                type="text"
                placeholder="rawon-nguling-surabaya.jpg"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Alt Text (Aksesibilitas)</label>
              <input
                type="text"
                placeholder="Deskripsi objek foto untuk pembaca layar..."
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Keterangan / Caption</label>
              <input
                type="text"
                placeholder="Seporsi rawon daging empuk dengan sambal tauge..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-1.5 rounded transition-colors"
            >
              {saving ? 'Menyimpan...' : 'Simpan Foto'}
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="p-4 bg-white border border-neutral-200 rounded-xs flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Cari foto berdasarkan nama atau deskripsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs py-2 pl-8 pr-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
        </div>

        <span className="text-xs text-neutral-500 font-mono">
          Total: {filtered.length} aset foto
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="group bg-white border border-neutral-200 rounded-xs overflow-hidden shadow-2xs hover:border-orange-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 bg-neutral-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                <div className="p-3">
                  <p className="font-bold text-xs text-neutral-900 truncate font-mono">
                    {item.filename}
                  </p>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1 leading-snug">
                    {item.caption || item.alt}
                  </p>
                </div>
              </div>

              <div className="p-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-neutral-400 font-mono">
                  {new Date(item.uploadedAt).toLocaleDateString('id-ID')}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item)}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-orange-50 hover:text-orange-700 text-neutral-700 rounded text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin URL</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMedia(item)}
                    className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Hapus Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
