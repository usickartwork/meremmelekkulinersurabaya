'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@meremkuliner.id');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Verification simulation
    if (email === 'admin@meremkuliner.id' && password === 'admin123') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('merem_admin_session', JSON.stringify({ email, timestamp: Date.now() }));
      }
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setLoading(false);
      setError('Email atau password tidak sesuai. Gunakan akun demo di bawah.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xs border border-neutral-800 shadow-xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#18181B] p-6 text-center border-b border-neutral-800">
          <Link href="/" className="inline-block mb-2 group">
            <img
              src="/logo-dark.png"
              alt="Merem Kuliner"
              className="h-10 w-auto object-contain mx-auto transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest">
            Portal Redaksi & Content Management System
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-600 text-red-700 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Email Redaksi
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs py-2.5 pl-9 pr-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs py-2.5 pl-9 pr-3 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Quick Demo Info Box */}
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-xs text-[11px] text-orange-950 space-y-1">
            <p className="font-bold flex items-center gap-1 text-orange-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Akun Demo Pengujian PRD Level 2:
            </p>
            <p>Email: <code className="bg-orange-100 px-1 py-0.5 rounded font-mono">admin@meremkuliner.id</code></p>
            <p>Password: <code className="bg-orange-100 px-1 py-0.5 rounded font-mono">admin123</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Ruang Redaksi'}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Kembali ke Portal Publik
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
