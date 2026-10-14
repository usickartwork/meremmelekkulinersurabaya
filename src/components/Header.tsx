'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Flame, ShieldAlert, Sparkles, MapPin, Calendar, Clock, Menu, X } from 'lucide-react';
import { Category } from '@/types';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="w-full bg-white border-b border-neutral-200">
      {/* Top Utility Bar (USA Today / Binduz inspired) */}
      <div className="bg-[#18181B] text-neutral-300 text-xs py-1.5 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              {currentDate}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              Surabaya 31°C • Cerah
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-orange-400 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3" /> Trending:
              </span>
              <Link href="/search?q=prj" className="hover:text-white transition-colors">#PRJSurabaya</Link>
              <span className="text-neutral-600">•</span>
              <Link href="/search?q=dimsum" className="hover:text-white transition-colors">#DimsumMentai</Link>
              <span className="text-neutral-600">•</span>
              <Link href="/search?q=matcha" className="hover:text-white transition-colors">#MatchaUbe</Link>
              <span className="text-neutral-600">•</span>
              <Link href="/search?q=chikuro" className="hover:text-white transition-colors">#ChikuroViral</Link>
            </div>

            <div className="flex items-center gap-3 border-l border-neutral-700 pl-3">
              <Link href="/about" className="hover:text-white transition-colors">
                Tentang Redaksi
              </Link>
              <Link
                href="/admin"
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-2 py-0.5 rounded text-[11px] transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Masthead / Editorial Logo Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 rounded transition-colors shrink-0"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Tagline - Perfectly centered on mobile */}
        <div className="flex-1 flex items-center justify-center md:justify-start">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <img
              src="/logo.png"
              alt="Merem Kuliner Surabaya"
              className="h-10 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden sm:block text-left border-l border-neutral-300 pl-3">
              <span className="block text-xs font-black tracking-wider text-neutral-900 uppercase">
                SURABAYA
              </span>
              <p className="text-[10px] text-neutral-500 font-semibold tracking-wide uppercase">
                Jurnal & Berita Kuliner
              </p>
            </div>
          </Link>
        </div>

        {/* Mobile right search button to balance menu and keep logo dead-center */}
        <div className="md:hidden w-10 h-10 flex items-center justify-center shrink-0">
          <Link
            href="/search"
            className="w-10 h-10 flex items-center justify-center text-neutral-700 hover:text-orange-600 rounded transition-colors"
            aria-label="Pencarian Berita"
          >
            <Search className="w-5 h-5" />
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-72 lg:w-80">
          <input
            type="text"
            placeholder="Cari PRJ, dimsum, matcha, chikuro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 pl-3 pr-9 border border-neutral-300 rounded focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-neutral-50/50"
          />
          <button
            type="submit"
            className="absolute right-2 text-neutral-400 hover:text-orange-600 transition-colors"
            aria-label="Cari"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Main Sticky Navigation Bar */}
      <nav className="border-t border-b border-neutral-200 bg-white sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto scrollbar-none">
          <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap py-1">
            <li>
              <Link
                href="/"
                className={`px-3 py-2 inline-block rounded transition-colors ${
                  pathname === '/'
                    ? 'text-orange-600 border-b-2 border-orange-600 font-bold'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Beranda
              </Link>
            </li>
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`px-3 py-2 inline-block rounded transition-colors ${
                      isActive
                        ? 'text-orange-600 border-b-2 border-orange-600 font-bold'
                        : 'text-neutral-700 hover:text-orange-600'
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/search"
            className="hidden md:flex items-center gap-1 text-xs text-neutral-500 hover:text-orange-600 font-medium px-2 py-1"
          >
            <Search className="w-3.5 h-3.5" />
            Pencarian Lanjut
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <input
              type="text"
              placeholder="Cari berita kuliner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs py-2 pl-3 pr-9 border border-neutral-300 rounded focus:outline-none focus:border-orange-500"
            />
            <button type="submit" className="absolute right-2 text-neutral-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-1 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-50 rounded text-neutral-800"
            >
              Beranda
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-neutral-50 rounded text-neutral-800"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 hover:bg-neutral-50 rounded text-neutral-600"
            >
              Tentang Redaksi
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 bg-orange-50 text-orange-700 font-semibold rounded"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
