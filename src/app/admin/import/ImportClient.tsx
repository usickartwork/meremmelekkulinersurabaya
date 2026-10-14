'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImportPreviewArticle } from '@/types';
import { SAMPLE_DOCX_TEMPLATE_TEXT } from '@/lib/docx-parser';
import {
  FileUp,
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default function ImportClient() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState('');
  const [mode, setMode] = useState<'file' | 'text'>('file');

  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parsedArticles, setParsedArticles] = useState<ImportPreviewArticle[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Copy template text
  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(SAMPLE_DOCX_TEMPLATE_TEXT);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  // Download template as text/word template
  const handleDownloadTemplate = () => {
    const element = document.createElement('a');
    const file = new Blob([SAMPLE_DOCX_TEMPLATE_TEXT], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'TEMPLATE_IMPORT_MEREM_KULINER.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Handle parsing preview
  const handleParse = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'file' && !file) {
      setErrorMsg('Pilih file Microsoft Word (.docx) terlebih dahulu.');
      return;
    }
    if (mode === 'text' && !rawText.trim()) {
      setErrorMsg('Tempelkan teks berformat template terlebih dahulu.');
      return;
    }

    setParsing(true);
    const formData = new FormData();
    if (mode === 'file' && file) {
      formData.append('file', file);
    } else {
      formData.append('rawText', rawText);
    }

    try {
      const res = await fetch('/api/import-docx', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.parsedArticles) {
        setParsedArticles(data.parsedArticles);
        if (data.parsedArticles.length === 0) {
          setErrorMsg(
            'Tidak ada artikel yang terdeteksi. Pastikan file menggunakan penanda [TITLE], [CATEGORY], [CONTENT].'
          );
        }
      } else {
        setErrorMsg(data.error || 'Gagal memproses file.');
      }
    } catch (err: any) {
      setErrorMsg('Terjadi kesalahan koneksi saat memproses dokumen.');
    } finally {
      setParsing(false);
    }
  };

  // Commit parsed articles to Drafts
  const handleCommitDrafts = async () => {
    const validCount = parsedArticles.filter((a) => a.isValid).length;
    if (validCount === 0) {
      alert('Tidak ada artikel yang valid untuk diimpor.');
      return;
    }

    setImporting(true);
    setErrorMsg('');

    const formData = new FormData();
    if (mode === 'file' && file) {
      formData.append('file', file);
    } else {
      formData.append('rawText', rawText);
    }

    try {
      const res = await fetch('/api/import-docx?commit=true', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(
          `Berhasil mengimpor ${data.count} artikel ke ruang redaksi sebagai Draf!`
        );
        setTimeout(() => {
          router.push('/admin/articles?status=draft');
        }, 1500);
      } else {
        setErrorMsg(data.error || 'Gagal menyimpan draf artikel.');
      }
    } catch (err: any) {
      setErrorMsg('Terjadi kesalahan saat menyimpan draf.');
    } finally {
      setImporting(false);
    }
  };

  const validCount = parsedArticles.filter((a) => a.isValid).length;
  const invalidCount = parsedArticles.filter((a) => !a.isValid).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
          Import Artikel Massal (DOCX)
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Unggah satu file Word berisi banyak artikel sekaligus. Sistem akan memecah dan memvalidasi
          secara otomatis untuk disimpan sebagai draf redaksi.
        </p>
      </div>

      {/* Template Instruction Card (PRD Page 7) */}
      <div className="bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-orange-100 text-orange-700 rounded-xs">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900">
              Format Penanda Template Dokumen
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTemplate}
              className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors"
            >
              {copiedTemplate ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Contoh Format</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadTemplate}
              className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Template (.txt)</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          Gunakan tag penanda berikut di dalam file Word Anda untuk setiap artikel:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 bg-neutral-50 border border-neutral-200 rounded">
            <strong className="text-orange-600">[TITLE]</strong> <br />
            <span className="text-neutral-500 text-[10px]">Wajib: Judul artikel</span>
          </div>
          <div className="p-2 bg-neutral-50 border border-neutral-200 rounded">
            <strong className="text-orange-600">[CATEGORY]</strong> <br />
            <span className="text-neutral-500 text-[10px]">Wajib: Nama kategori</span>
          </div>
          <div className="p-2 bg-neutral-50 border border-neutral-200 rounded">
            <strong className="text-orange-600">[CONTENT]</strong> <br />
            <span className="text-neutral-500 text-[10px]">Wajib: Isi artikel</span>
          </div>
          <div className="p-2 bg-neutral-50 border border-neutral-200 rounded">
            <strong className="text-neutral-800">[TAGS] / [AUTHOR]</strong> <br />
            <span className="text-neutral-500 text-[10px]">Opsional</span>
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs space-y-5">
        <div className="flex items-center gap-4 border-b border-neutral-200 pb-3">
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors border-b-2 ${
              mode === 'file'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Unggah File DOCX (.docx)
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`text-xs font-bold uppercase tracking-wider pb-1 transition-colors border-b-2 ${
              mode === 'text'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Tempel Teks Template Langsung
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border-l-4 border-red-600 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleParse} className="space-y-4">
          {mode === 'file' ? (
            <div className="border-2 border-dashed border-neutral-300 hover:border-orange-500 rounded p-8 text-center transition-colors">
              <FileUp className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-800 mb-1">
                Pilih atau seret file .docx ke area ini
              </p>
              <p className="text-xs text-neutral-400 mb-4">
                Maksimal ukuran 10MB • Format Microsoft Word (.docx)
              </p>
              <input
                type="file"
                accept=".docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-xs text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Teks Berformat Template:
              </label>
              <textarea
                rows={10}
                placeholder={SAMPLE_DOCX_TEMPLATE_TEXT}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full text-xs font-mono py-2.5 px-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 leading-relaxed"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-neutral-500">
              {file ? `File terpilih: ${file.name} (${Math.round(file.size / 1024)} KB)` : ''}
            </span>
            <button
              type="submit"
              disabled={parsing}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-xs transition-colors disabled:opacity-50"
            >
              {parsing ? 'Menganalisis Dokumen...' : 'Ekstrak & Pratinjau Artikel'}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      {parsedArticles.length > 0 && (
        <div className="bg-white border border-neutral-200 p-6 rounded-xs shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <h3 className="font-extrabold text-base uppercase tracking-tight text-neutral-900">
                Hasil Pratinjau Ekstraksi Dokumen
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Ditemukan {parsedArticles.length} artikel ({validCount} valid, {invalidCount} tidak lengkap).
              </p>
            </div>

            <button
              onClick={handleCommitDrafts}
              disabled={importing || validCount === 0}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 py-2.5 rounded-xs transition-colors shadow-xs inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              {importing ? 'Mengimpor...' : `Impor ${validCount} Artikel ke Draf`}
            </button>
          </div>

          <div className="space-y-4">
            {parsedArticles.map((article, idx) => (
              <div
                key={idx}
                className={`p-4 border rounded-xs transition-colors ${
                  article.isValid
                    ? 'border-neutral-200 bg-neutral-50/60'
                    : 'border-red-300 bg-red-50/40'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      #{idx + 1}
                    </span>
                    <span className="bg-neutral-200 text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {article.category || 'Tanpa Kategori'}
                    </span>
                    {article.editorPick && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Editor Pick
                      </span>
                    )}
                    {article.breaking && (
                      <span className="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Breaking
                      </span>
                    )}
                  </div>

                  {article.isValid ? (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Siap Impor
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Field Kurang: {article.missingFields.join(', ')}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-neutral-900 mb-1">
                  {article.title || '(Judul Tidak Terdeteksi)'}
                </h4>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                  {article.content || '(Konten kosong)'}
                </p>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-200/60 pt-2 font-mono">
                  <span>Penulis: {article.author}</span>
                  <span>Tags: {article.tags.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
