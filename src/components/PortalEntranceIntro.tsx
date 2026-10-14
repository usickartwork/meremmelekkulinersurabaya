'use client';

import React, { useState, useEffect } from 'react';

export default function PortalEntranceIntro() {
  // Step 1: Mata (Eyes appear)
  // Step 2: Senyum (Smile sweeps in)
  // Step 3: Garpu & Sendok (Utensils appear)
  // Step 4: Logo Lengkap (Full logo completes & glows)
  // Step 5: Smooth fade out overlay revealing the portal
  const [step, setStep] = useState<number>(1);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Elegant, deliberate pacing: not rushed ("jangan terlalu buru2")
    const t1 = setTimeout(() => setStep(2), 700);   // 700ms: Senyum
    const t2 = setTimeout(() => setStep(3), 1400);  // 1400ms: Garpu & Sendok
    const t3 = setTimeout(() => setStep(4), 2100);  // 2100ms: Logo Lengkap!
    const t4 = setTimeout(() => setFadeOut(true), 3200); // 3200ms: Logo sudah lengkap & terlihat jelas selama 1.1s, baru mulai fade out!
    const t5 = setTimeout(() => setIsFinished(true), 3900); // 3900ms: selesai & unmount dari layar

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C0C0E] transition-opacity duration-700 ease-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-72 sm:w-96 aspect-[690/291] flex items-center justify-center">
        {/* Subtle orange back-glow */}
        <div
          className={`absolute inset-4 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            step >= 4 ? 'bg-orange-500/30 scale-110' : 'bg-orange-500/15 scale-90'
          }`}
        />

        {/* White backing layer for the transparent cutouts (eyes & utensils) on dark background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute left-[24.5%] top-[23%] w-[17%] h-[40%] bg-white rounded-full transition-all duration-500 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          <div
            className={`absolute left-[53.5%] top-[23%] w-[17%] h-[40%] bg-white rounded-full transition-all duration-500 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          <div
            className={`absolute left-[77.5%] top-[34%] w-[17.5%] h-[30%] bg-white rounded-md transition-all duration-500 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
        </div>

        {/* LAYER 1: MATA */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            step === 1 ? 'opacity-100 scale-105' : step > 1 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0'
          }`}
          style={{ clipPath: 'polygon(23% 18%, 72% 18%, 72% 64%, 23% 64%)' }}
        >
          <img src="/logo-dark.png" alt="Mata" className="w-full h-full object-contain" />
        </div>

        {/* LAYER 2: SENYUM */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            step >= 2 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ clipPath: 'polygon(25% 66%, 69% 66%, 69% 94%, 25% 94%)' }}
        >
          <img src="/logo-dark.png" alt="Senyum" className="w-full h-full object-contain" />
        </div>

        {/* LAYER 3: GARPU & SENDOK */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            step >= 3 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ clipPath: 'polygon(75% 28%, 98% 28%, 98% 66%, 75% 66%)' }}
        >
          <img src="/logo-dark.png" alt="Garpu" className="w-full h-full object-contain" />
        </div>

        {/* LAYER 4: LOGO LENGKAP */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/logo-dark.png"
            alt="Merem Kuliner Surabaya"
            className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(249,115,22,0.45)]"
          />
        </div>
      </div>
    </div>
  );
}
