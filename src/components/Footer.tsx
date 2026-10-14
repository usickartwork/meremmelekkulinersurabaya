import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { Utensils, Mail, MapPin, Heart, Share2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-[#121212] text-neutral-300 border-t border-neutral-800 mt-auto">
      {/* Upper Footer: Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/logo-dark.png"
                alt="Merem Kuliner Surabaya"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <p className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase mt-2">
                Surabaya Culinary Journal & News Outlet
              </p>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Media digital independen yang berdedikasi mengulas, mendokumentasikan, dan merayakan
              kekayaan cita rasa Surabaya—mulai dari warisan kuliner legendaris, kafe skena masa kini,
              hingga geliat street food kaki lima Kota Pahlawan.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>Kawasan Sejarah Tunjungan & Embong Malang, Surabaya</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>redaksi@meremkuliner.id</span>
              </div>
            </div>
          </div>

          {/* Categories Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-neutral-800 pb-2">
              Kanal Berita
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Semua Berita
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-neutral-800 pb-2">
              Redaksi & Media
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/about#visi" className="hover:text-orange-400 transition-colors">
                  Visi & Misi Liputan
                </Link>
              </li>
              <li>
                <Link href="/about#kode-etik" className="hover:text-orange-400 transition-colors">
                  Standar Etik Ulasan
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-orange-400 transition-colors">
                  Arsip & Pencarian
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-orange-400 font-semibold hover:text-orange-300 transition-colors inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-neutral-800 pb-2">
              Jejaring Kuliner
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Ikuti kabar teranyar liputan kuliner kami melalui platform favorit Anda:
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram: <span className="text-neutral-400">@meremkulinersby</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok: <span className="text-neutral-400">@meremkuliner</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                YouTube: <span className="text-neutral-400">Merem Kuliner TV</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-neutral-800/80 bg-black/60 py-5 px-4 sm:px-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Merem Kuliner Surabaya. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-orange-500 font-medium">Surabaya, Jawa Timur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
