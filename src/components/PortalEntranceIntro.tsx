'use client';

import React, { useState, useEffect } from 'react';

// Extend window interface to hold in-memory session flag
declare global {
  interface Window {
    __merem_intro_completed?: boolean;
  }
}

export default function PortalEntranceIntro() {
  // If intro has already completed in this browser session (client-side navigation), skip immediately!
  // On browser refresh (F5/Cmd+R) or first page entry, window is fresh (undefined), so it plays!
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.__merem_intro_completed) {
      return false;
    }
    return true;
  });

  // Animation Stages:
  // 0: Layar Putih Bersih Dulu (Clean white canvas pause - 450ms)
  // 1: Mata (The two authentic black 'e' eyes with zero orange bleed)
  // 2: Senyum (The orange smile curve underneath curves in)
  // 3: Garpu & Sendok (The authentic fork & spoon inside the 'm')
  // 4: Logo Lengkap + Tulisan "Merem Kuliner Surabaya" (Full logo completes without glow)
  // 5: Smooth fade out of splash screen revealing the news portal
  const [step, setStep] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldShow) return;

    // Sequence pacing: putih dulu, lalu animasi mengalir tenang dan elegan
    const t0 = setTimeout(() => setStep(1), 450);   // 450ms: Putih dulu, lalu Mata muncul
    const t1 = setTimeout(() => setStep(2), 1200);  // 1200ms: Senyum melengkung
    const t2 = setTimeout(() => setStep(3), 1950);  // 1950ms: Garpu & Sendok terpasang
    const t3 = setTimeout(() => setStep(4), 2700);  // 2700ms: Logo Lengkap + Tulisan "Merem Kuliner Surabaya"
    const t4 = setTimeout(() => setFadeOut(true), 4000); // 4000ms: Tampil utuh selama 1.3 detik, lalu mulai fade out
    const t5 = setTimeout(() => {
      setIsFinished(true);
      // Mark as completed for this browser window session so internal navigation does not replay
      if (typeof window !== 'undefined') {
        window.__merem_intro_completed = true;
      }
    }, 4750); // 4750ms: Selesai & unmount

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [shouldShow]);

  if (!shouldShow || isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-out select-none px-4 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      <div className="flex flex-col items-center justify-center max-w-md w-full">
        {/* Logo Container (Clean white, NO GLOW, NO BLUR) */}
        <div className="relative w-72 sm:w-96 aspect-[690/291] flex items-center justify-center">

          {/* ======================================================== */}
          {/* STAGE 1: MATA (The two authentic black 'e' eyes)         */}
          {/* Tepat pada piksel hitam huruf 'e', ZERO orange line bleed*/}
          {/* ======================================================== */}
          {/* Left 'e' Eye */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              step >= 1 && step < 4
                ? 'opacity-100 scale-100'
                : step >= 4
                ? 'opacity-0'
                : 'opacity-0 scale-75'
            }`}
            style={{
              clipPath: 'polygon(25.4% 22%, 40.2% 22%, 40.2% 63%, 25.4% 63%)',
            }}
          >
            <img
              src="/logo.png"
              alt="Mata Kiri"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right 'e' Eye */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              step >= 1 && step < 4
                ? 'opacity-100 scale-100'
                : step >= 4
                ? 'opacity-0'
                : 'opacity-0 scale-75'
            }`}
            style={{
              clipPath: 'polygon(54.3% 22%, 69.2% 22%, 69.2% 63%, 54.3% 63%)',
            }}
          >
            <img
              src="/logo.png"
              alt="Mata Kanan"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ======================================================== */}
          {/* STAGE 2: SENYUM (The authentic orange smile curve)       */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              step >= 2 && step < 4
                ? 'opacity-100 scale-100'
                : step >= 4
                ? 'opacity-0'
                : 'opacity-0 translate-y-2'
            }`}
            style={{
              clipPath: 'polygon(27.5% 71%, 66.5% 71%, 66.5% 89%, 27.5% 89%)',
            }}
          >
            <img
              src="/logo.png"
              alt="Senyum"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ======================================================== */}
          {/* STAGE 3: GARPU & SENDOK (Inside the letter 'm')          */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              step >= 3 && step < 4
                ? 'opacity-100 scale-100'
                : step >= 4
                ? 'opacity-0'
                : 'opacity-0 scale-90'
            }`}
            style={{
              clipPath: 'polygon(75% 22%, 98% 22%, 98% 63%, 75% 63%)',
            }}
          >
            <img
              src="/logo.png"
              alt="Garpu dan Sendok"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ======================================================== */}
          {/* STAGE 4: LOGO LENGKAP (100% AUTHENTIC UNTOUCHED logo.png)*/}
          {/* Clean, sharp, NO artificial glow/drop-shadow             */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img
              src="/logo.png"
              alt="Merem Kuliner Surabaya"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Tulisan: "Merem Kuliner Surabaya" muncul saat logo lengkap */}
        <div
          className={`mt-6 text-center transition-all duration-700 ease-out ${
            step >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Merem Kuliner Surabaya
          </h1>
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-orange-600 mt-1">
            Jurnal & Ragam Cerita Rasa
          </p>
        </div>
      </div>
    </div>
  );
}
