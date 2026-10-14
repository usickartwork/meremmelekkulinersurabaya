This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# Merem Kuliner Surabaya 🍲🗞️
> **Portal Berita & Jurnal Kuliner Digital Kota Pahlawan**  
> *Target Implementasi: Level 2 — Media Simulation / Academic Project berstandar Digital News Outlet Sungguhan.*

## Getting Started
---

First, run the development server:
## 📸 Konsep & Inspirasi Desain Editorial

Sistem ini dirancang mengikuti **Product Requirements Document (PRD)** resmi dan menyintesis keunggulan dari 4 media referensi terkemuka:
1. **BBC News Reference**: Struktur visual *Hero Main Story* yang dominan, kontras fotografi tinggi, hirarki tipografi tegas, dan sub-stories bertingkat.
2. **Binduz Newspaper**: *Breaking news ticker*, tabbed *Trending News*, layout 3-kolom editorial, dan pemisahan rubrik berbasis foto kuliner tajam.
3. **Phanatik (Lexington Themes)**: Estetika modern, *whitespace* lega dan rapi, garis pemisah halus (*subtle dividers*), serta tag metadata elegan (*reading time*, badge kategori).
4. **USA Today**: Papan peringkat terpopuler (*Top 5 Stories Leaderboard* dengan angka besar `01`–`05`), seksi *Don't Miss*, serta strip multimedia/cerita visual.

---

## 🛠️ Tech Stack & Arsitektur

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS (Light Mode Editorial, Monokrom Base + Spicy Warm Orange Accent `#EA580C`)
- **Icons**: Lucide React + Inline Clean SVGs
- **Word Document Parser**: Mammoth.js (Server-side `.docx` parser)
- **Database Layer**: Centralized JSON Store dengan persistensi disk (`data/db.json`) + Skrip SQL PostgreSQL Supabase (`supabase/schema.sql`)
- **News Intelligence**: Rule-based ranking engine (Latest, Popular, Trending formula dengan decay freshness, Related story matching)

---

## 🚀 Cara Menjalankan Project

### 1. Masuk ke Direktori Project
```bash
cd /Users/filius/.gemini/antigravity/scratch/merem-kuliner-surabaya
```

### 2. Jalankan Server Development
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
# Atau produksi:
npm run build
npm start -- -p 3005
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Akses portal di browser:
- **Portal Publik**: [http://localhost:3005](http://localhost:3005)
- **Detail Berita (Contoh)**: [http://localhost:3005/news/menguak-rahasia-rawon-setan-embong-malang](http://localhost:3005/news/menguak-rahasia-rawon-setan-embong-malang)
- **Arsip Rubrik**: [http://localhost:3005/category/kuliner-legendaris](http://localhost:3005/category/kuliner-legendaris)
- **Pencarian Lanjut**: [http://localhost:3005/search](http://localhost:3005/search)
- **Tentang Redaksi & Visi**: [http://localhost:3005/about](http://localhost:3005/about)
- **Portal CMS Admin**: [http://localhost:3005/admin](http://localhost:3005/admin)
- **Login Admin**: [http://localhost:3005/admin/login](http://localhost:3005/admin/login)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
---

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
## 🔐 Akun Demo Admin CMS

## Learn More
Gunakan kredensial berikut untuk login ke ruang redaksi:
- **Email**: `admin@meremkuliner.id`
- **Kata Sandi**: `admin123`

To learn more about Next.js, take a look at the following resources:
---

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
## 📑 Format Template Impor Massal DOCX (PRD Bagian 7)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
Admin dapat mengunggah file `.docx` berisi banyak artikel sekaligus dengan tag penanda:

## Deploy on Vercel
```text
[TITLE]
5 Kuliner Legendaris Surabaya yang Wajib Dicoba Sekali Seumur Hidup

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
[CATEGORY]
Kuliner Legendaris

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
[AUTHOR]
Filius Patris

[TAGS]
surabaya, rawon, legendaris, rujak cingur

[FEATURED_IMAGE]
https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80

[CONTENT]
Surabaya bukan hanya kota pahlawan, tetapi juga surga cita rasa dengan rempah yang kuat dan berani...

[BREAKING]
NO

[EDITOR_PICK]
YES
```

Sistem akan memecah file Word, memvalidasi kelengkapan (*Title, Category, Content*), menampilkan pratinjau error jika ada kolom yang kurang, dan menyimpan artikel sebagai **Draf**.

---

## 📊 Algoritma Ranking Berita (PRD Bagian 8)

Formula skor trending:
$$\text{Trending Score} = 0.40 \times \text{Recent Views} + 0.30 \times \text{View Velocity} + 0.10 \times \text{Shares} + 0.10 \times \text{Engagement} + 0.10 \times \text{Freshness}$$
- **Latest**: Diurutkan berdasarkan `publishedAt DESC`.
- **Popular**: Diurutkan berdasarkan akumulasi total valid views.
- **Related News**: Menghitung bobot kesamaan kategori (+5), irisan tag (+3 per tag), dan kebaruan tanggal publikasi.

---

## 🗺️ Struktur Folder

```text
merem-kuliner-surabaya/
├── data/
│   └── db.json                   # Database persisten JSON lokal
├── supabase/
│   └── schema.sql                # Skema PostgreSQL lengkap untuk Supabase
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage editorial publik
│   │   ├── news/[slug]/          # Detail artikel baca lengkap
│   │   ├── category/[slug]/      # Arsip rubrik per kategori
│   │   ├── search/               # Fitur pencarian lanjutan
│   │   ├── about/                # Manifesto redaksi & etik liputan
│   │   ├── sitemap.ts            # Dynamic XML sitemap untuk SEO
│   │   ├── robots.ts             # Robots.txt
│   │   ├── admin/
│   │   │   ├── page.tsx          # Dashboard ringkasan & KPI
│   │   │   ├── login/            # Halaman autentikasi admin
│   │   │   ├── articles/         # Manajemen tabel artikel & editor
│   │   │   ├── categories/       # Manajemen kategori/rubrik
│   │   │   ├── media/            # Galeri media & picker URL
│   │   │   ├── analytics/        # Grafik tren pembaca & performa
│   │   │   └── import/           # Impor massal artikel via DOCX
│   │   └── api/                  # REST API endpoints
│   ├── components/               # Header, Footer, Hero, Leaderboard, Cards
│   ├── lib/
│   │   ├── store.ts              # Data access layer & persitence
│   │   ├── ranking.ts            # Algoritma Latest, Popular, Trending, Related
│   │   ├── docx-parser.ts        # Mammoth DOCX parser & template
│   │   └── initial-data.ts       # Liputan autentik Surabaya beresolusi tinggi
│   └── types/                    # Definisi TypeScript lengkap
```
