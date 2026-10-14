'use client';

import React, { useState, useEffect } from 'react';

export default function PortalEntranceIntro() {
  // Animation Stages:
  // 1: Mata (The two authentic black 'e' eyes from logo.png)
  // 2: Senyum (The orange smile curve underneath curves in)
  // 3: Garpu & Sendok (The authentic fork & spoon inside the 'm')
  // 4: Logo Lengkap (The 100% full authentic logo.png completes & shines)
  // 5: Smooth fade out of splash screen revealing the portal
  const [step, setStep] = useState<number>(1);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Deliberate, smooth, unhurried pacing ("jangan terlalu buru-buru")
    const t1 = setTimeout(() => setStep(2), 700);   // 700ms: Senyum
    const t2 = setTimeout(() => setStep(3), 1400);  // 1400ms: Garpu & Sendok
    const t3 = setTimeout(() => setStep(4), 2100);  // 2100ms: Logo Lengkap!
    const t4 = setTimeout(() => setFadeOut(true), 3300); // 3300ms: Logo lengkap tampil jelas selama 1.2 detik, lalu fade out
    const t5 = setTimeout(() => setIsFinished(true), 4000); // 4000ms: Selesai & unmount

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      <div className="relative w-72 sm:w-96 aspect-[690/291] flex items-center justify-center">
        {/* Subtle warm orange ambient aura behind logo */}
        <div
          className={`absolute inset-4 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            step >= 4 ? 'bg-orange-400/20 scale-110' : 'bg-orange-300/10 scale-90'
          }`}
        />

        {/* ======================================================== */}
        {/* STAGE 1: MATA (The two authentic black 'e' eyes)         */}
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
            clipPath: 'polygon(24% 20%, 42% 20%, 42% 64%, 24% 64%)',
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
            clipPath: 'polygon(53% 20%, 71% 20%, 71% 64%, 53% 64%)',
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
            clipPath: 'polygon(25% 68%, 69% 68%, 69% 94%, 25% 94%)',
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
            clipPath: 'polygon(74% 20%, 98% 20%, 98% 64%, 74% 64%)',
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
        {/* ======================================================== */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/logo.png"
            alt="Merem Kuliner Surabaya"
            className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(242,101,34,0.25)]"
          />
        </div>
      </div>
    </div>
  );
}
