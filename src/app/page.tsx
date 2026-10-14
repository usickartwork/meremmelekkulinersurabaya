'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UnderConstructionPage() {
  const router = useRouter();

  // Animation Stages:
  // 1: Mata (Only the two eyes from the real logo appear)
  // 2: Senyum (The smile curve from the real logo appears)
  // 3: Garpu & Sendok (The fork & spoon from the real logo appears)
  // 4: Logo Lengkap (The full authentic Merem logo reveals completely)
  const [step, setStep] = useState<number>(1);
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    // Snappy timing sequence for the motion graphics of the real logo
    const t1 = setTimeout(() => setStep(2), 350);  // Eyes -> Smile
    const t2 = setTimeout(() => setStep(3), 750);  // Smile -> Garpu & Spoon
    const t3 = setTimeout(() => setStep(4), 1150); // Garpu -> Full Logo

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleLogoClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    // Easter egg secret entrance: 10 clicks unlocks the portal
    if (nextCount >= 10) {
      router.push('/portal');
      return;
    }

    // Replay animation on click
    setStep(1);
    setTimeout(() => setStep(2), 350);
    setTimeout(() => setStep(3), 750);
    setTimeout(() => setStep(4), 1150);
  };

  return (
    <main className="min-h-screen bg-[#0C0C0E] text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-orange-600/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Center Container */}
      <div className="flex flex-col items-center justify-center z-10 max-w-xl text-center">
        {/* Animated Real Logo Area (Click 10 times to enter portal) */}
        <div
          onClick={handleLogoClick}
          className="relative cursor-pointer w-72 sm:w-96 aspect-[690/291] flex items-center justify-center transition-transform active:scale-98 hover:scale-102"
        >
          {/* Subtle logo back-glow */}
          <div className="absolute inset-4 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* White backing layer for the transparent cutouts (eyes & utensils) on dark background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* White backing for Left Eye */}
            <div
              className={`absolute left-[24.5%] top-[23%] w-[17%] h-[40%] bg-white rounded-full transition-all duration-500 ${
                step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            />
            {/* White backing for Right Eye */}
            <div
              className={`absolute left-[53.5%] top-[23%] w-[17%] h-[40%] bg-white rounded-full transition-all duration-500 ${
                step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            />
            {/* White backing for Utensils (Fork & Spoon) */}
            <div
              className={`absolute left-[77.5%] top-[34%] w-[17.5%] h-[30%] bg-white rounded-md transition-all duration-500 ${
                step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            />
          </div>

          {/* ======================================================== */}
          {/* LAYER 1: MATA (The two eyes from the authentic logo)    */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              step === 1 ? 'opacity-100 scale-105' : step > 1 && step < 4 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              clipPath:
                'polygon(23% 18%, 72% 18%, 72% 64%, 23% 64%)',
            }}
          >
            <img
              src="/logo-dark.png"
              alt="Merem Eyes"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ======================================================== */}
          {/* LAYER 2: SENYUM (Smile arc from the authentic logo)      */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-600 ${
              step >= 2 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0'
            }`}
            style={{
              clipPath:
                'polygon(25% 66%, 69% 66%, 69% 94%, 25% 94%)',
            }}
          >
            <img
              src="/logo-dark.png"
              alt="Merem Smile"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ======================================================== */}
          {/* LAYER 3: GARPU & SENDOK (Utensils from the authentic logo)*/}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              step >= 3 && step < 4 ? 'opacity-100 scale-100' : 'opacity-0'
            }`}
            style={{
              clipPath:
                'polygon(75% 28%, 98% 28%, 98% 66%, 75% 66%)',
            }}
          >
            <img
              src="/logo-dark.png"
              alt="Merem Utensils"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ======================================================== */}
          {/* LAYER 4: LOGO LENGKAP (Full Authentic Logo Reveal)       */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img
              src="/logo-dark.png"
              alt="Merem Kuliner Surabaya"
              className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(249,115,22,0.35)]"
            />

            {/* Shimmer light sweep wave across complete logo */}
            {step >= 4 && (
              <div className="absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        {/* Text requested by user: ONLY "sedang proses guys", nothing else */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-10 transition-all duration-700">
          sedang proses <span className="text-orange-500">guys</span>
        </h1>
      </div>

      {/* Shimmer animation keyframe */}
      <style jsx>{`
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer-sweep {
          animation: shimmerSweep 1.6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
