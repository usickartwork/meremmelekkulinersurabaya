'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export default function LogoIntroSplash() {
  // Stages:
  // 1: Mata (Eyes appear & blink)
  // 2: Senyum (Smile arc sweeps in)
  // 3: Garpu & Sendok (Utensils appear & bounce)
  // 4: Logo Lengkap (Morph into full Merem logo with shimmer)
  // 5: Fadeout / Done (Reveal website)
  const [stage, setStage] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Stage 1 -> 2: Senyum appears at 700ms
    const t1 = setTimeout(() => setStage(2), 700);

    // Stage 2 -> 3: Garpu & Sendok appears at 1400ms
    const t2 = setTimeout(() => setStage(3), 1400);

    // Stage 3 -> 4: Logo Lengkap appears at 2100ms
    const t3 = setTimeout(() => setStage(4), 2100);

    // Stage 4 -> 5: Fadeout starts at 3100ms
    const t4 = setTimeout(() => setStage(5), 3100);

    // Completely unmount after fadeout finishes at 3700ms
    const t5 = setTimeout(() => setIsFinished(true), 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleSkip = () => {
    setStage(5);
    setTimeout(() => setIsFinished(true), 300);
  };

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0c0e] text-white transition-all duration-700 select-none overflow-hidden ${
        stage === 5 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow circles */}
      <div className="absolute w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-[11px] font-semibold text-neutral-400 hover:text-white px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 backdrop-blur-sm transition-all z-20 flex items-center gap-1.5"
      >
        <span>Lewati</span>
        <span>&rarr;</span>
      </button>

      {/* Main Motion Graphic Container */}
      <div className="relative flex flex-col items-center justify-center p-8 z-10 min-h-[280px]">
        {/* Animated Stages 1 to 3: The Deconstructed Face & Utensils */}
        {stage < 4 ? (
          <div className="relative w-72 h-44 flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 240 160"
              className="w-64 h-auto overflow-visible transition-all duration-500"
            >
              <defs>
                <linearGradient id="meremOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* STEP 1: MATA (Two Eyes closed in delight - matching lowercase 'e' shape in logo) */}
              <g
                className={`transition-all duration-500 transform origin-center ${
                  stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                {/* Left Eye (Closed in culinary pleasure) */}
                <g className="animate-bounce-gentle">
                  <path
                    d="M 46,62 Q 74,32 102,62"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  />
                  {/* Subtle lower eyelid / pupil arc like 'e' */}
                  <line
                    x1="48"
                    y1="64"
                    x2="100"
                    y2="64"
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>

                {/* Right Eye */}
                <g className="animate-bounce-gentle">
                  <path
                    d="M 138,62 Q 166,32 194,62"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  />
                  {/* Subtle lower eyelid / pupil arc like 'e' */}
                  <line
                    x1="140"
                    y1="64"
                    x2="192"
                    y2="64"
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              </g>

              {/* STEP 2: SENYUM (Signature curved orange smile from the logo) */}
              {stage >= 2 && (
                <g className="transition-all duration-600 animate-draw-smile">
                  {/* Crescent orange smile path */}
                  <path
                    d="M 38,94 Q 120,138 202,94 Q 120,124 38,94 Z"
                    fill="url(#meremOrangeGrad)"
                    filter="url(#glow)"
                  />
                </g>
              )}

              {/* STEP 3: GARPU & SENDOK (Utensils from the 'm' cutout) */}
              {stage >= 3 && (
                <g className="animate-pop-utensils">
                  {/* Left: Garpu (Fork) */}
                  <g transform="translate(182, 10) scale(0.95)">
                    {/* Fork Tines */}
                    <path
                      d="M 8,8 L 8,24 M 13,8 L 13,24 M 18,8 L 18,24 M 23,8 L 23,24"
                      stroke="#FB923C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Fork base & handle */}
                    <path
                      d="M 8,24 Q 8,32 15.5,32 Q 23,32 23,24 L 23,24 M 15.5,32 L 15.5,48"
                      stroke="#FB923C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>

                  {/* Right: Sendok (Spoon) */}
                  <g transform="translate(208, 10) scale(0.95)">
                    {/* Spoon Bowl */}
                    <ellipse
                      cx="15"
                      cy="18"
                      rx="7.5"
                      ry="11"
                      fill="#FB923C"
                      stroke="#F97316"
                      strokeWidth="1.5"
                    />
                    {/* Spoon Handle */}
                    <line
                      x1="15"
                      y1="28"
                      x2="15"
                      y2="48"
                      stroke="#FB923C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Top-right accent dot from the logo */}
                  <circle cx="232" cy="12" r="5" fill="#FB923C" filter="url(#glow)" />
                </g>
              )}
            </svg>

            {/* Stage label badge */}
            <div className="mt-4 text-xs font-semibold tracking-wider uppercase text-orange-400/90 flex items-center gap-1.5 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />
              <span>
                {stage === 1 && 'Mata Terpejam Nikmat...'}
                {stage === 2 && 'Senyum Puas Kuliner...'}
                {stage === 3 && 'Garpu & Sendok Siap...'}
              </span>
            </div>
          </div>
        ) : (
          /* STEP 4: LOGO LENGKAP (Full Logo Reveals with Shimmer) */
          <div className="flex flex-col items-center animate-reveal-logo">
            <div className="relative group">
              {/* Glow backdrop for logo */}
              <div className="absolute inset-0 bg-orange-500/25 blur-2xl rounded-full transform scale-110 pointer-events-none" />

              {/* Complete Official Merem Logo */}
              <div className="relative overflow-hidden rounded-xl p-2">
                <img
                  src="/logo-dark.png"
                  alt="Merem Kuliner Surabaya"
                  className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_10px_20px_rgba(249,115,22,0.35)]"
                />

                {/* Shimmer Light Beam Wave */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Sub-tagline */}
            <div className="mt-4 flex flex-col items-center gap-1">
              <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-white uppercase animate-tracking-expand">
                SURABAYA
              </span>
              <p className="text-[11px] font-semibold text-orange-400 tracking-wider uppercase">
                Jurnal & Berita Kuliner
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Loading Indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage >= 1 ? 'bg-orange-500 scale-125' : 'bg-neutral-700'
            }`}
          />
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage >= 2 ? 'bg-orange-500 scale-125' : 'bg-neutral-700'
            }`}
          />
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage >= 3 ? 'bg-orange-500 scale-125' : 'bg-neutral-700'
            }`}
          />
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage >= 4 ? 'bg-orange-500 scale-125 shadow-[0_0_8px_#f97316]' : 'bg-neutral-700'
            }`}
          />
        </div>
        <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
          Memuat Kenikmatan Rasa...
        </span>
      </div>

      {/* Scoped CSS animations */}
      <style jsx>{`
        @keyframes drawSmile {
          from {
            opacity: 0;
            transform: scale(0.6) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes popUtensils {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.7) rotate(-15deg);
          }
          70% {
            transform: translateY(2px) scale(1.05) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        @keyframes revealLogo {
          0% {
            opacity: 0;
            transform: scale(0.85);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes trackingExpand {
          0% {
            letter-spacing: 0.1em;
            opacity: 0.5;
          }
          100% {
            letter-spacing: 0.3em;
            opacity: 1;
          }
        }
        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-draw-smile {
          animation: drawSmile 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-pop-utensils {
          animation: popUtensils 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-reveal-logo {
          animation: revealLogo 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-shimmer-sweep {
          animation: shimmerSweep 1.1s ease-in-out infinite;
        }
        .animate-tracking-expand {
          animation: trackingExpand 0.8s ease-out forwards;
        }
        .animate-bounce-gentle {
          animation: bounceGentle 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
