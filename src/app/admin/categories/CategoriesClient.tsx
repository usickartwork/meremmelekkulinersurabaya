'use client';

import React, { useState } from 'react';
import { Category, Article } from '@/types';
import { FolderTree, Plus, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CategoriesClientProps {
  initialCategories: Category[];
  articles: Article[];
}

export default function CategoriesClient({ initialCategories, articles }: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [saving, setSaving] = useState(false);

  const startCreate = () => {
    setName('');
    setSlug('');
    setDescription('');
    setCoverImage('https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80');
    setEditingCategory(null);
    setIsCreating(true);
  };

  const startEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setCoverImage(cat.coverImage || '');
    setIsCreating(false);
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingCategory(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    const generatedSlug =
      slug.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    try {
      if (editingCategory) {
        // Edit
        const res = await fetch('/api/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingCategory.id,
            name,
            slug: generatedSlug,
            description,
            coverImage,
          }),
        });
        const data = await res.json();
        if (data.success && data.category) {
          setCategories((prev) =>
            prev.map((c) =>
              c.id === editingCategory.id
                ? { ...c, name, slug: generatedSlug, description, coverImage }
                : c
            )
          );
          cancelForm();
        } else {
          alert(data.error || 'Gagal memperbarui kategori');
        }
      } else {
        // Create
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            slug: generatedSlug,
            description,
            coverImage,
          }),
        });
        const data = await res.json();
        if (data.success && data.category) {
          setCategories((prev) => [...prev, data.category]);
          cancelForm();
        } else {
          alert(data.error || 'Gagal membuat kategori');
        }
      }
    } catch (err) {
      alert('Gagal menyimpan kategori');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    const count = articles.filter((a) => a.categoryId === cat.id).length;
    const msg = count > 0
      ? `Kategori "${cat.name}" memiliki ${count} artikel terkait. Yakin ingin menghapusnya?`
      : `Hapus kategori "${cat.name}"?`;

    if (!confirm(msg)) return;

    try {
      const res = await fetch(`/api/categories?id=${cat.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      } else {
        alert(data.error || 'Gagal menghapus kategori');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus kategori');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Kategori & Rubrik Berita
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Atur struktur kanal liputan kuliner yang ditampilkan di portal publik.
          </p>
        </div>

        {!isCreating && !editingCategory && (
          <button
            onClick={startCreate}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xs transition-colors shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Tambah Kategori
          </button>
        )}
      </div>

      {/* Inline Form (Create / Edit) */}
      {(isCreating || editingCategory) && (
        <form
          onSubmit={handleSave}
          className="bg-white border-2 border-orange-500 p-6 rounded-xs shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">
              {editingCategory ? 'Edit Kategori' : 'Buat Kategori Baru'}
            </h3>
            <button
              type="button"
              onClick={cancelForm}
              className="text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nama Kategori <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="misal: Kuliner Legendaris"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingCategory) {
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '')
                    );
                  }
                }}
                className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Slug URL</label>
              <input
                type="text"
                placeholder="kuliner-legendaris"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Deskripsi Kanal</label>
            <input
              type="text"
              placeholder="Deskripsi singkat seputar cakupan liputan rubrik ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full text-xs py-2 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={cancelForm}
              className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-1.5 rounded transition-colors"
            >
              {saving ? 'Menyimpan...' : 'Simpan Kategori'}
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const count = articles.filter((a) => a.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              className="bg-white border border-neutral-200 rounded-xs p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                    <FolderTree className="w-4 h-4" />
                  </span>
                  <span className="bg-neutral-100 text-neutral-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    {count} Artikel
                  </span>
                </div>

                <h3 className="font-bold text-base text-neutral-900">{cat.name}</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">/category/{cat.slug}</p>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                  {cat.description || 'Tidak ada deskripsi.'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <Link
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  className="text-neutral-500 hover:text-orange-600 flex items-center gap-1 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Lihat Rubrik
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                    title="Edit Kategori"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Hapus Kategori"
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
