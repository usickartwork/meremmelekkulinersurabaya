'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Share2, Check, MessageCircle, Link2 } from 'lucide-react';

interface ArticleInteractiveBarProps {
  articleId: string;
  initialViews: number;
  initialShares: number;
  title: string;
  slug: string;
}

export default function ArticleInteractiveBar({
  articleId,
  initialViews,
  initialShares,
  title,
  slug,
}: ArticleInteractiveBarProps) {
  const [views, setViews] = useState(initialViews);
  const [shares, setShares] = useState(initialShares);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Increment view on mount
    fetch(`/api/articles/${articleId}/view`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.views) {
          setViews(data.views);
        }
      })
      .catch((err) => console.warn('Could not record view:', err));
  }, [articleId]);

  const recordShare = async (platform: string) => {
    try {
      const res = await fetch(`/api/articles/${articleId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      });
      const data = await res.json();
      if (data.success && data.shares) {
        setShares(data.shares);
      }
    } catch (err) {
      console.warn('Could not record share:', err);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://meremkuliner.id/news/${slug}`;

  const shareToWhatsapp = () => {
    recordShare('whatsapp');
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + currentUrl)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    recordShare('facebook');
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToTwitter = () => {
    recordShare('twitter');
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const copyToClipboard = () => {
    recordShare('copylink');
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-200 text-xs text-neutral-600 my-6">
      {/* View count indicator */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-medium text-neutral-800">
          <Eye className="w-4 h-4 text-orange-600" />
          <strong className="font-semibold">{views.toLocaleString('id-ID')}</strong> Kali Dibaca
        </span>
        <span className="text-neutral-300">•</span>
        <span className="text-neutral-500">{shares} Kali Dibagikan</span>
      </div>

      {/* Share actions */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-400 font-semibold mr-1 flex items-center gap-1">
          <Share2 className="w-3.5 h-3.5" /> Bagikan:
        </span>

        <button
          onClick={shareToWhatsapp}
          className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded transition-colors"
          title="Bagikan ke WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        <button
          onClick={shareToTwitter}
          className="p-1.5 bg-neutral-100 text-neutral-800 hover:bg-neutral-900 hover:text-white rounded transition-colors"
          title="Bagikan ke X (Twitter)"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        <button
          onClick={shareToFacebook}
          className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded transition-colors"
          title="Bagikan ke Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Tersalin!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              <span>Salin Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
