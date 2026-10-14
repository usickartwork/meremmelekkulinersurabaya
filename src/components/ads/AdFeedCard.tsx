'use client';

import React, { useState } from 'react';
import { COMMERCIAL_ADS, CommercialAd } from '@/data/dummy-ads';
import { Sparkles, X } from 'lucide-react';

interface AdFeedCardProps {
  adIndex?: number;
  className?: string;
}

export default function AdFeedCard({
  adIndex = 1,
  className = '',
}: AdFeedCardProps) {
  const [showModal, setShowModal] = useState(false);
  const feedAds = COMMERCIAL_ADS.filter((ad) => ad.supportedPlacements.includes('feed'));
  const ad: CommercialAd = feedAds[adIndex % feedAds.length] || feedAds[0];

  return (
    <>
      <div
        className={`group bg-white border border-neutral-300 hover:border-neutral-400 transition-all flex flex-col justify-between overflow-hidden relative rounded-xs shadow-xs ${className}`}
      >
        {/* Sponsored Watermark Header with AdChoices */}
        <div className="bg-neutral-50 px-3 py-1 flex items-center justify-between border-b border-neutral-200 text-[10px] text-neutral-500 font-sans">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
            IKLAN SPONSOR
          </span>
          <button
            onClick={() => setShowModal(true)}
            className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer text-[10px]"
            title="Informasi Iklan"
          >
            <span>AdChoices</span>
            <svg className="w-2.5 h-2.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>

        {/* Visual Creative Area */}
        <div className="relative aspect-16/10 overflow-hidden bg-neutral-900">
          <img
            src={ad.imageSrc}
            alt={ad.altText}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 mb-1">
              {ad.brandName}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-2 leading-snug font-editorial-serif mb-1 group-hover:text-orange-600 transition-colors">
              {ad.campaignTitle}
            </h4>
          </div>

          <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-medium">
              Rekomendasi Mitra
            </span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold py-1 px-3 bg-neutral-900 hover:bg-orange-600 text-white rounded-xs shadow-2xs transition-colors cursor-pointer"
            >
              Lihat Promo
            </a>
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
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-blue-600 fill-blue-600" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <h3 className="font-bold text-base text-neutral-900">
                Pemberitahuan Iklan Feed (AdChoices)
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Kartu ini merupakan simulasi native ad placement untuk memvalidasi tata letak monetisasi portal berita modern sesuai standar industri media digital.
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs bg-neutral-900 text-white font-semibold px-4 py-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
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
