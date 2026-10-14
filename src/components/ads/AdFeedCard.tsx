'use client';

import React, { useState } from 'react';
import { DUMMY_ADS, DummyAd } from '@/data/dummy-ads';
import { AdIcon } from './AdIcons';
import { Info, Sparkles, X } from 'lucide-react';

interface AdFeedCardProps {
  adIndex?: number;
  variant?: 'vertical' | 'horizontal';
  className?: string;
}

export default function AdFeedCard({
  adIndex = 1,
  variant = 'vertical',
  className = '',
}: AdFeedCardProps) {
  const [showModal, setShowModal] = useState(false);
  const feedAds = DUMMY_ADS.filter((ad) => ad.supportedPlacements.includes('feed'));
  const ad: DummyAd = feedAds[adIndex % feedAds.length] || feedAds[0];

  return (
    <>
      <div
        className={`group bg-white border border-neutral-300 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden relative rounded-xs shadow-xs ${className}`}
      >
        {/* Sponsored Watermark Header */}
        <div className="bg-neutral-100/90 px-3 py-1.5 flex items-center justify-between border-b border-neutral-200 text-[10px] text-neutral-600 font-mono">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-700">
            <Sparkles className="w-3 h-3 text-amber-600" />
            IKLAN SPONSOR • DUMMY
          </span>
          <button
            onClick={() => setShowModal(true)}
            className="hover:text-neutral-900 transition-colors flex items-center gap-0.5 cursor-pointer"
            title="Informasi Iklan Simulasi"
          >
            <Info className="w-3 h-3" />
          </button>
        </div>

        {/* Visual Creative Area */}
        <div
          className={`relative aspect-16/10 overflow-hidden bg-gradient-to-br ${ad.theme.bgGradient} flex flex-col justify-between p-4`}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: ad.theme.badgeBg, color: ad.theme.accentColor }}
            >
              {ad.brandCategory}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
              <AdIcon name={ad.svgIcon} className="w-4 h-4" />
            </div>
          </div>

          <div className="text-left mt-2">
            <span className="text-xs font-black uppercase tracking-wider text-white block">
              {ad.brandName}
            </span>
            <p className="text-[11px] text-white/80 line-clamp-1">{ad.subheadline}</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-2 leading-snug font-editorial-serif mb-2">
              {ad.headline}
            </h4>
            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
              {ad.subheadline}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[10px] text-neutral-600 font-medium italic">
              Rekomendasi Mitra
            </span>
            <button
              type="button"
              className="text-xs font-bold py-1.5 px-3 rounded-xs shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-default"
              style={{
                backgroundColor: ad.theme.buttonBg,
                color: ad.theme.buttonText,
              }}
              title="Simulasi Iklan — Tidak ada aksi eksternal"
            >
              {ad.ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-neutral-900 rounded-md p-6 max-w-md w-full shadow-2xl border border-neutral-300 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              <h3 className="font-bold text-base text-neutral-900">
                Pemberitahuan Simulasi Iklan Feed
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed mb-3">
              Kartu ini merupakan <strong>simulasi native advertising</strong> pada feed portal berita Merem Kuliner Surabaya. Kartu ini didesain agar selaras dengan grid berita tanpa mengaburkan batasan jurnalistik.
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs bg-neutral-900 text-white font-semibold px-4 py-2 rounded hover:bg-neutral-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

