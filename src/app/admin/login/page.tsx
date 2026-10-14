'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if password matches utssukses
    if (password.trim() === 'utssukses') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('merem_admin_auth', 'utssukses');
        localStorage.setItem('merem_admin_session', JSON.stringify({ auth: true, timestamp: Date.now() }));
      }
      setTimeout(() => {
        router.push('/admin');
      }, 300);
    } else {
      setLoading(false);
      setError('Kata sandi salah! Masukkan kata sandi yang sesuai.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111113] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#18181B] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden z-10">
        {/* Top Header */}
        <div className="p-6 text-center border-b border-neutral-800 bg-neutral-900/60">
          <Link href="/" className="inline-block mb-3 group">
            <img
              src="/logo-dark.png"
              alt="Merem Kuliner Surabaya"
              className="h-10 w-auto object-contain mx-auto transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            Akses Panel Admin
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Silakan masukkan kata sandi untuk mengelola portal berita.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-base py-3 pl-10 pr-3 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Memverifikasi...' : 'Buka Panel Admin'}</span>
          </button>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Portal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
