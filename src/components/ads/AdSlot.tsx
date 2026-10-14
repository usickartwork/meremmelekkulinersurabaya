'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { COMMERCIAL_ADS, CommercialAd } from '@/data/dummy-ads';
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react';

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
    return COMMERCIAL_ADS.filter((ad) => ad.supportedPlacements.includes(placement));
  }, [placement]);

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex % (availableAds.length || 1)
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAdChoicesModal, setShowAdChoicesModal] = useState(false);

  // Auto-rotation (10 seconds)
  useEffect(() => {
    if (isHovered || isCollapsed || availableAds.length <= 1) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % availableAds.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isHovered, isCollapsed, availableAds.length]);

  const currentAd: CommercialAd | undefined =
    availableAds[currentIndex] || availableAds[0];

  if (!currentAd) return null;

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label={`Advertisement ${placement}`}
    >
      {/* Detik-style "Hide Ads ⌵" pill (specifically prominent on in-article banner as in detikJatim) */}
      {placement === 'in-article' && (
        <div className="w-full max-w-[728px] flex justify-end mb-1 pr-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 bg-neutral-100 hover:bg-neutral-200 hover:text-neutral-800 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer border border-neutral-200 shadow-2xs"
            title="Sembunyikan / Tampilkan Iklan"
          >
            {isCollapsed ? (
              <>
                <span>Show Ads</span>
                <ChevronDown className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>Hide Ads</span>
                <ChevronUp className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      )}

      {/* When collapsed */}
      {isCollapsed ? (
        <div className="w-full max-w-[728px] py-2 bg-neutral-100 border border-dashed border-neutral-300 text-center text-xs text-neutral-400 rounded-xs">
          Iklan disembunyikan
        </div>
      ) : (
        /* Actual Ad Creative Container */
        <div className="relative group w-full flex justify-center">
          {/* Header Billboard Placement */}
          {placement === 'header' && (
            <div className="w-full max-w-[970px] relative bg-neutral-900 rounded-none overflow-hidden shadow-xs border border-neutral-200">
              <a
                href={currentAd.targetUrl}
                onClick={(e) => e.preventDefault()}
                className="block relative w-full aspect-[970/160] sm:aspect-[970/120] md:aspect-[970/100] max-h-[140px] overflow-hidden"
              >
                <img
                  src={currentAd.imageSrc}
                  alt={currentAd.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </a>

              {/* Google AdChoices badge in top right corner */}
              <div className="absolute top-1 right-1 z-20 flex items-center bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-xs shadow-xs text-[10px] text-neutral-600 gap-1 border border-neutral-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAdChoicesModal(true);
                  }}
                  className="flex items-center gap-0.5 hover:text-blue-600 transition-colors cursor-pointer"
                  title="AdChoices / Tentang Iklan"
                >
                  <span className="text-[9px] font-sans text-neutral-500">Iklan</span>
                  <svg className="w-2.5 h-2.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="hover:text-neutral-900 transition-colors ml-0.5 cursor-pointer"
                  title="Tutup Iklan"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          )}

          {/* Sidebar Placement (300x250 Medium Rectangle) */}
          {placement === 'sidebar' && (
            <div className="w-[300px] sm:w-[320px] max-w-full relative bg-neutral-900 overflow-hidden shadow-xs border border-neutral-200 rounded-none">
              <a
                href={currentAd.targetUrl}
                onClick={(e) => e.preventDefault()}
                className="block relative w-full aspect-[4/3] sm:aspect-square overflow-hidden"
              >
                <img
                  src={currentAd.imageSrc}
                  alt={currentAd.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </a>

              {/* Google AdChoices badge in top right corner */}
              <div className="absolute top-1.5 right-1.5 z-20 flex items-center bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-xs shadow-xs text-[10px] text-neutral-600 gap-1 border border-neutral-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAdChoicesModal(true);
                  }}
                  className="flex items-center gap-0.5 hover:text-blue-600 transition-colors cursor-pointer"
                  title="AdChoices / Tentang Iklan"
                >
                  <span className="text-[9px] font-sans text-neutral-500">Iklan</span>
                  <svg className="w-2.5 h-2.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="hover:text-neutral-900 transition-colors ml-0.5 cursor-pointer"
                  title="Tutup Iklan"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          )}

          {/* In-Article Placement */}
          {placement === 'in-article' && (
            <div className="w-full max-w-[728px] relative bg-neutral-900 overflow-hidden shadow-xs border border-neutral-200 rounded-none">
              <a
                href={currentAd.targetUrl}
                onClick={(e) => e.preventDefault()}
                className="block relative w-full aspect-[16/9] sm:aspect-[728/180] md:aspect-[728/140] overflow-hidden"
              >
                <img
                  src={currentAd.imageSrc}
                  alt={currentAd.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </a>

              {/* Google AdChoices badge in top right corner */}
              <div className="absolute top-1.5 right-1.5 z-20 flex items-center bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-xs shadow-xs text-[10px] text-neutral-600 gap-1 border border-neutral-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAdChoicesModal(true);
                  }}
                  className="flex items-center gap-0.5 hover:text-blue-600 transition-colors cursor-pointer"
                  title="AdChoices / Tentang Iklan"
                >
                  <span className="text-[9px] font-sans text-neutral-500">Iklan</span>
                  <svg className="w-2.5 h-2.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(true);
                  }}
                  className="hover:text-neutral-900 transition-colors ml-0.5 cursor-pointer"
                  title="Tutup Iklan"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AdChoices Information Modal */}
      {showAdChoicesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowAdChoicesModal(false)}
        >
          <div
            className="bg-white text-neutral-900 rounded-md p-6 max-w-md w-full shadow-2xl border border-neutral-300 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAdChoicesModal(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-blue-600 fill-blue-600" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <h3 className="font-bold text-base text-neutral-900">
                Tentang Iklan Ini (AdChoices)
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed mb-3">
              Iklan ini merupakan materi simulasi promosi digital (seperti <em>Sido Muncul Tolak Linu</em>,{' '}
              <em>NetShort</em>, dan <em>Traveloka</em>) yang didesain mengikuti standar tata letak portal berita nasional (detikJatim/Kompas).
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              Tidak ada data pribadi pengguna yang dilacak atau disimpan untuk penayangan iklan ini.
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowAdChoicesModal(false)}
                className="text-xs bg-neutral-900 text-white font-semibold px-4 py-2 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
