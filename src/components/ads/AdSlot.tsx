'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DUMMY_ADS, DummyAd } from '@/data/dummy-ads';
import { AdIcon } from './AdIcons';
import { Info, Pause, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface AdSlotProps {
  placement: 'header' | 'sidebar' | 'in-article';
  className?: string;
  initialIndex?: number;
}

export default function AdSlot({
  placement,
  className = '',
  initialIndex = 0,
}: AdSlotProps) {
  // Filter ads for this placement
  const availableAds = useMemo(() => {
    return DUMMY_ADS.filter((ad) => ad.supportedPlacements.includes(placement));
  }, [placement]);

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex % (availableAds.length || 1)
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
      const listener = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
        if (e.matches) setIsPlaying(false);
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Timer rotation (10 seconds)
  useEffect(() => {
    if (!isPlaying || isHovered || reducedMotion || availableAds.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      // Pause if tab is in background
      if (typeof document !== 'undefined' && document.hidden) {
        return;
      }
      setCurrentIndex((prev) => (prev + 1) % availableAds.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, reducedMotion, availableAds.length]);

  const currentAd: DummyAd | undefined = availableAds[currentIndex] || availableAds[0];

  if (!currentAd) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % availableAds.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + availableAds.length) % availableAds.length);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center my-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label={`Simulasi Iklan ${placement}`}
    >
      {/* Top Banner Disclaimer Header */}
      <div className="w-full max-w-[970px] flex items-center justify-between text-[10px] text-neutral-600 uppercase tracking-widest font-mono px-1 pb-1">
        <span className="flex items-center gap-1.5 font-semibold text-neutral-600">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
          SIMULASI IKLAN • PROTOTIPE EDITORIAL
        </span>
        <button
          onClick={() => setShowInfoModal(true)}
          className="hover:text-neutral-900 transition-colors flex items-center gap-0.5 cursor-pointer"
          title="Tentang simulasi iklan"
        >
          <Info className="w-3 h-3" />
          <span>Tentang Iklan</span>
        </button>
      </div>

      {/* Main Responsive Ad Frame */}
      {placement === 'sidebar' && (
        /* Sidebar: standard 300x250 banner */
        <div
          className={`w-[300px] h-[250px] relative rounded-xs shadow-xs border border-neutral-300 overflow-hidden flex flex-col justify-between p-4 bg-gradient-to-br ${currentAd.theme.bgGradient} transition-opacity duration-300`}
        >
          {/* Top Brand row */}
          <div className="flex items-center justify-between z-10">
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: currentAd.theme.badgeBg, color: currentAd.theme.accentColor }}
            >
              {currentAd.brandCategory}
            </span>
            <div className="flex items-center gap-1.5">
              <AdIcon name={currentAd.svgIcon} className="w-4 h-4" />
              <span className="text-xs font-black tracking-wide text-white">
                {currentAd.brandName}
              </span>
            </div>
          </div>

          {/* Center Content */}
          <div className="my-auto z-10 text-center px-1">
            <h4
              className="text-base font-black leading-snug tracking-tight mb-2 font-editorial-serif line-clamp-2"
              style={{ color: currentAd.theme.textColor }}
            >
              {currentAd.headline}
            </h4>
            <p className="text-[11px] text-neutral-300 leading-relaxed line-clamp-2">
              {currentAd.subheadline}
            </p>
          </div>

          {/* Bottom Action & Controls */}
          <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10">
            <button
              type="button"
              className="text-[11px] font-bold py-1.5 px-3 rounded-xs shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-default"
              style={{
                backgroundColor: currentAd.theme.buttonBg,
                color: currentAd.theme.buttonText,
              }}
              title="Simulasi Iklan — Tidak ada aksi eksternal"
            >
              {currentAd.ctaText}
            </button>

            {/* Micro Controls */}
            <div className="flex items-center gap-1 text-neutral-400 bg-black/40 px-1.5 py-0.5 rounded text-[10px]">
              <button
                onClick={handlePrev}
                aria-label="Iklan sebelumnya"
                className="hover:text-white transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Jeda rotasi' : 'Lanjutkan rotasi'}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              </button>
              <button
                onClick={handleNext}
                aria-label="Iklan berikutnya"
                className="hover:text-white transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {placement === 'header' && (
        /* Header: 970x90 Desktop / 728x90 Tablet / 320x100 Mobile */
        <div
          className={`w-full max-w-[970px] min-h-[90px] sm:h-[90px] relative rounded-xs shadow-xs border border-neutral-300 overflow-hidden flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 py-2.5 bg-gradient-to-r ${currentAd.theme.bgGradient} transition-opacity duration-300`}
        >
          {/* Brand & Category pill */}
          <div className="flex items-center gap-3 shrink-0 mb-1 sm:mb-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 shadow-xs"
              style={{ backgroundColor: currentAd.theme.badgeBg, color: currentAd.theme.accentColor }}
            >
              <AdIcon name={currentAd.svgIcon} className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span
                className="text-[9px] font-bold uppercase tracking-wider block"
                style={{ color: currentAd.theme.accentColor }}
              >
                {currentAd.brandCategory}
              </span>
              <span className="text-xs sm:text-sm font-black tracking-wide text-white">
                {currentAd.brandName}
              </span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="flex-1 text-center sm:text-left sm:px-6 my-1 sm:my-0">
            <h4
              className="text-xs sm:text-sm md:text-base font-extrabold tracking-tight line-clamp-1"
              style={{ color: currentAd.theme.textColor }}
            >
              {currentAd.headline}
            </h4>
            <p className="hidden md:block text-[11px] text-neutral-300 line-clamp-1">
              {currentAd.subheadline}
            </p>
          </div>

          {/* CTA & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="text-xs font-bold py-1.5 px-4 rounded-xs shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-default whitespace-nowrap"
              style={{
                backgroundColor: currentAd.theme.buttonBg,
                color: currentAd.theme.buttonText,
              }}
              title="Simulasi Iklan — Tidak ada aksi eksternal"
            >
              {currentAd.ctaText}
            </button>

            {/* Rotator Controls */}
            <div className="flex items-center gap-1 text-neutral-400 bg-black/40 px-1.5 py-1 rounded text-[10px]">
              <button
                onClick={handlePrev}
                aria-label="Iklan sebelumnya"
                className="hover:text-white transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Jeda rotasi' : 'Lanjutkan rotasi'}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={handleNext}
                aria-label="Iklan berikutnya"
                className="hover:text-white transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {placement === 'in-article' && (
        /* In-Article: 728x90 desktop / fluid mobile */
        <div
          className={`w-full max-w-[728px] min-h-[90px] relative rounded-xs shadow-xs border border-neutral-300 overflow-hidden flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r ${currentAd.theme.bgGradient} transition-opacity duration-300`}
        >
          <div className="flex items-center gap-3 shrink-0 mb-2 sm:mb-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20"
              style={{ backgroundColor: currentAd.theme.badgeBg, color: currentAd.theme.accentColor }}
            >
              <AdIcon name={currentAd.svgIcon} className="w-4 h-4" />
            </div>
            <div>
              <span
                className="text-[9px] font-bold uppercase tracking-wider block"
                style={{ color: currentAd.theme.accentColor }}
              >
                Sponsor Rekomendasi
              </span>
              <span className="text-xs font-black text-white">
                {currentAd.brandName}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left sm:px-5 my-1 sm:my-0">
            <h4
              className="text-xs sm:text-sm font-bold tracking-tight line-clamp-1"
              style={{ color: currentAd.theme.textColor }}
            >
              {currentAd.headline}
            </h4>
            <p className="text-[11px] text-neutral-300 line-clamp-1">
              {currentAd.subheadline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="text-xs font-bold py-1.5 px-3.5 rounded-xs shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-default whitespace-nowrap"
              style={{
                backgroundColor: currentAd.theme.buttonBg,
                color: currentAd.theme.buttonText,
              }}
              title="Simulasi Iklan — Tidak ada aksi eksternal"
            >
              {currentAd.ctaText}
            </button>

            {/* Rotator Controls */}
            <div className="flex items-center gap-0.5 text-neutral-400 bg-black/40 px-1 py-1 rounded text-[10px]">
              <button
                onClick={handlePrev}
                aria-label="Iklan sebelumnya"
                className="hover:text-white transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Jeda rotasi' : 'Lanjutkan rotasi'}
                className="hover:text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              </button>
              <button
                onClick={handleNext}
                aria-label="Iklan berikutnya"
                className="hover:text-white transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info / Disclosure Modal */}
      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowInfoModal(false)}
        >
          <div
            className="bg-white text-neutral-900 rounded-md p-6 max-w-md w-full shadow-2xl border border-neutral-300 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              <h3 className="font-bold text-base text-neutral-900">
                Pemberitahuan Simulasi Iklan
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed mb-3">
              Seluruh iklan yang ditampilkan pada portal <strong>Merem Kuliner Surabaya</strong>{' '}
              ini merupakan <strong>simulasi frontend murni (dummy prototype)</strong> untuk tujuan demonstrasi
              tata letak monetisasi media digital editorial.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc pl-4 mb-4">
              <li>Tidak terhubung ke jaringan periklanan (AdSense, programmatic ad, dsb).</li>
              <li>Tidak mengumpulkan data analitik atau pelacakan pengguna.</li>
              <li>Merek dan materi promosi bersifat fiktif atau simulasi semata.</li>
              <li>Tidak memproses transaksi finansial atau pendapatan iklan nyata.</li>
            </ul>
            <div className="text-right">
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-xs bg-neutral-900 text-white font-semibold px-4 py-2 rounded hover:bg-neutral-800 transition-colors"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

