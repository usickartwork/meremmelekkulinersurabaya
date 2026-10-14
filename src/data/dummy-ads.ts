/**
 * Dummy Advertisement Inventory for Merem Kuliner Surabaya
 * Frontend simulation only - No external tracking, revenue, or third-party networks.
 */

export interface DummyAd {
  id: string;
  brandName: string;
  brandCategory: 'Kuliner & F&B' | 'Teknologi & SaaS' | 'Edukasi & Karier' | 'Gaya Hidup & Travel' | 'Produktivitas Bisnis';
  headline: string;
  subheadline: string;
  ctaText: string;
  theme: {
    bgGradient: string;
    accentColor: string;
    textColor: string;
    buttonBg: string;
    buttonText: string;
    badgeBg: string;
  };
  supportedPlacements: Array<'header' | 'sidebar' | 'in-article' | 'feed'>;
  svgIcon: 'coffee' | 'laptop' | 'compass' | 'book' | 'utensils' | 'rocket' | 'sparkles' | 'bag';
}

export const DUMMY_ADS: DummyAd[] = [
  {
    id: 'ad-rasa-surabaya',
    brandName: 'Kopi Kenari Heritage',
    brandCategory: 'Kuliner & F&B',
    headline: 'Sensasi Kopi Robusta Asli Gunung Wilis',
    subheadline: 'Biji kopi pilihan dipanggang segar tiap fajar di jantung Surabaya timur.',
    ctaText: 'Cicipi Sekarang',
    theme: {
      bgGradient: 'from-amber-950 via-stone-900 to-amber-900',
      accentColor: '#f59e0b',
      textColor: '#fef3c7',
      buttonBg: '#d97706',
      buttonText: '#ffffff',
      badgeBg: 'rgba(217, 119, 6, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'coffee',
  },
  {
    id: 'ad-cloud-pos',
    brandName: 'KasirCerdas Cloud',
    brandCategory: 'Teknologi & SaaS',
    headline: 'Sistem POS & Inventaris Rumah Makan No. 1',
    subheadline: 'Kelola meja, pesanan QR, dan laporan omzet real-time tanpa ribet.',
    ctaText: 'Coba Gratis 14 Hari',
    theme: {
      bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      accentColor: '#38bdf8',
      textColor: '#f0f9ff',
      buttonBg: '#0284c7',
      buttonText: '#ffffff',
      badgeBg: 'rgba(2, 132, 199, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'laptop',
  },
  {
    id: 'ad-surabaya-staycation',
    brandName: 'The Heritage Majapahit Villas',
    brandCategory: 'Gaya Hidup & Travel',
    headline: 'Staycation Romantis di Tengah Pesona Kolonial',
    subheadline: 'Diskon 35% menginap akhir pekan inklusif sarapan sajian khas Jawa Timuran.',
    ctaText: 'Pesan Kamar',
    theme: {
      bgGradient: 'from-emerald-950 via-stone-900 to-teal-950',
      accentColor: '#34d399',
      textColor: '#ecfdf5',
      buttonBg: '#059669',
      buttonText: '#ffffff',
      badgeBg: 'rgba(5, 150, 105, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'compass',
  },
  {
    id: 'ad-kuliner-academy',
    brandName: 'Nusantara Chef Institute',
    brandCategory: 'Edukasi & Karier',
    headline: 'Pelatihan Profesional Manajemen Kuliner & Resto',
    subheadline: 'Belajar langsung dari master chef peracik resep legendaris Jawa Timur.',
    ctaText: 'Daftar Kelas',
    theme: {
      bgGradient: 'from-rose-950 via-neutral-900 to-red-950',
      accentColor: '#fb7185',
      textColor: '#fff1f2',
      buttonBg: '#e11d48',
      buttonText: '#ffffff',
      badgeBg: 'rgba(225, 29, 72, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'utensils',
  },
  {
    id: 'ad-fresh-market',
    brandName: 'Pangan Segar Kilat',
    brandCategory: 'Produktivitas Bisnis',
    headline: 'Suplai Sayur & Daging Segar untuk Dapur Kuliner',
    subheadline: 'Pengiriman 2 jam langsung dari petani lokal ke seluruh sudut Kota Surabaya.',
    ctaText: 'Mulai Belanja',
    theme: {
      bgGradient: 'from-teal-950 via-zinc-900 to-green-950',
      accentColor: '#4ade80',
      textColor: '#f0fdf4',
      buttonBg: '#16a34a',
      buttonText: '#ffffff',
      badgeBg: 'rgba(22, 163, 74, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'bag',
  },
  {
    id: 'ad-fintech-resto',
    brandName: 'ModalUsaha Mikro Jatim',
    brandCategory: 'Produktivitas Bisnis',
    headline: 'Pendanaan Usaha Kuliner Bunga Ringan & Cepat',
    subheadline: 'Dukungan permodalan hingga Rp 100 Juta untuk UMKM makanan & minuman.',
    ctaText: 'Simulasi Pinjaman',
    theme: {
      bgGradient: 'from-violet-950 via-slate-900 to-purple-950',
      accentColor: '#c084fc',
      textColor: '#faf5ff',
      buttonBg: '#9333ea',
      buttonText: '#ffffff',
      badgeBg: 'rgba(147, 51, 234, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'rocket',
  },
  {
    id: 'ad-eco-packaging',
    brandName: 'BungkusEco Ramah Bumi',
    brandCategory: 'Kuliner & F&B',
    headline: 'Kemasan Takeaway Daun & Serat Singkong',
    subheadline: 'Tingkatkan citra ramah lingkungan resto Anda dengan kemasan biodegradable estetik.',
    ctaText: 'Katalog Sampel',
    theme: {
      bgGradient: 'from-lime-950 via-stone-900 to-emerald-950',
      accentColor: '#a3e635',
      textColor: '#f7fee7',
      buttonBg: '#65a30d',
      buttonText: '#ffffff',
      badgeBg: 'rgba(101, 163, 13, 0.25)',
    },
    supportedPlacements: ['sidebar', 'in-article', 'feed'],
    svgIcon: 'sparkles',
  },
  {
    id: 'ad-digital-skills',
    brandName: 'Digital Foodie Lab',
    brandCategory: 'Edukasi & Karier',
    headline: 'Kuasai Food Photography & Video Reels Viral',
    subheadline: 'Bootcamp 4 minggu membuat konten kuliner yang menyedot jutaan penonton.',
    ctaText: 'Pelajari Kurikulum',
    theme: {
      bgGradient: 'from-orange-950 via-neutral-900 to-amber-950',
      accentColor: '#fb923c',
      textColor: '#fff7ed',
      buttonBg: '#ea580c',
      buttonText: '#ffffff',
      badgeBg: 'rgba(234, 88, 12, 0.25)',
    },
    supportedPlacements: ['header', 'sidebar', 'in-article', 'feed'],
    svgIcon: 'book',
  },
];

