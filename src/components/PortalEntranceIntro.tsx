'use client';

import React, { useState, useEffect } from 'react';

export default function PortalEntranceIntro() {
  // Step 1: Mata
  // Step 2: Senyum
  // Step 3: Garpu & Sendok
  // Step 4: Logo Lengkap (langsung masuk ke halaman tanpa loading)
  const [step, setStep] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Fast, seamless sequence:
    const t1 = setTimeout(() => setStep(2), 350);  // 350ms: Senyum
    const t2 = setTimeout(() => setStep(3), 750);  // 750ms: Garpu
    const t3 = setTimeout(() => setStep(4), 1150); // 1150ms: Logo Lengkap!
    const t4 = setTimeout(() => setIsFinished(true), 1650); // 1650ms: Langsung masuk ke halaman!

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0E] transition-opacity duration-500 select-none ${
        step === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-64 sm:w-80 aspect-[690/291] flex items-center justify-center">
        {/* Subtle glow */}
        <div className="absolute inset-4 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* White backing layer for the transparent cutouts (eyes & utensils) on dark background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute left-[24.5%] top-[23%] w-[17%] h-[40%] bg-white rounded-full transition-all duration-300 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          <div
            className={`absolute left-[53.5%] top-[23%] w-[17%] h-[40%] bg-white rounded-full transition-all duration-300 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
          <div
            className={`absolute left-[77.5%] top-[34%] w-[17.5%] h-[30%] bg-white rounded-md transition-all duration-300 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />
        </div>

        {/* LAYER 1: MATA */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            step === 1 ? 'opacity-100 scale-105' : step > 1 && step < 4 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ clipPath: 'polygon(23% 18%, 72% 18%, 72% 64%, 23% 64%)' }}
        >
          <img src="/logo-dark.png" alt="Mata" className="w-full h-full object-contain" />
        </div>

        {/* LAYER 2: SENYUM */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            step >= 2 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0'
          }`}
          style={{ clipPath: 'polygon(25% 66%, 69% 66%, 69% 94%, 25% 94%)' }}
        >
          <img src="/logo-dark.png" alt="Senyum" className="w-full h-full object-contain" />
        </div>

        {/* LAYER 3: GARPU */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            step >= 3 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0'
          }`}
          style={{ clipPath: 'polygon(75% 28%, 98% 28%, 98% 66%, 75% 66%)' }}
        >
          <img src="/logo-dark.png" alt="Garpu" className="w-full h-full object-contain" />
        </div>

        {/* LAYER 4: LOGO LENGKAP */}
        <div
          className={`absolute inset-0 transition-all duration-400 ${
            step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/logo-dark.png"
            alt="Merem Kuliner Surabaya"
            className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(249,115,22,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}

