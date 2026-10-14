import React from 'react';
import Link from 'next/link';
import { Sparkles, Utensils, Clock, ShieldCheck } from 'lucide-react';

export default function UnderConstructionPage() {
  return (
    <main className="min-h-screen bg-[#111113] text-white flex flex-col items-center justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Branding */}
      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img
            src="/logo-dark.png"
            alt="Merem Kuliner Surabaya"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </div>
        <Link
          href="/admin"
          className="text-xs text-neutral-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-full bg-neutral-900/60 backdrop-blur-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          <span>Admin</span>
        </Link>
      </header>

      {/* Center Main Message */}
      <div className="flex flex-col items-center text-center max-w-xl my-auto py-12 z-10 px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Portal Kuliner Surabaya</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
          sedang proses <span className="text-orange-500">guys</span>
        </h1>

        {/* Subtitle */}
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
          Portal Berita & Jurnal Kuliner Merem Surabaya sedang dalam tahap kurasi dan penyempurnaan sistem liputan. Segera hadir untuk Anda!
        </p>

        {/* Progress Card */}
        <div className="w-full max-w-sm bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-neutral-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" /> Tahap Persiapan
            </span>
            <span className="text-orange-400 font-bold">98%</span>
          </div>
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 h-full rounded-full w-[98%] transition-all duration-1000" />
          </div>
          <p className="text-[11px] text-neutral-400 mt-3 text-left">
            10 liputan berita siap terbit • 5 kanal pilihan • Sistem redaksi terverifikasi
          </p>
        </div>

        {/* Quick Preview Button */}
        <div className="mt-8">
          <Link
            href="/portal"
            className="text-xs text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4"
          >
            Lihat Preview Portal Berita &rarr;
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-400 text-xs z-10 pt-6 border-t border-neutral-900">
        <p>© {new Date().getFullYear()} Merem Kuliner Surabaya. All rights reserved.</p>
        <span className="text-orange-500 font-medium">Surabaya, Jawa Timur</span>
      </footer>
    </main>
  );
}
