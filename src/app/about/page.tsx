import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/store';
import { ShieldCheck, Heart, Award, ArrowLeft, BookOpen, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Redaksi & Visi Media | Merem Kuliner Surabaya',
  description: 'Mengenal media digital independen yang merekam denyut rasa kuliner Surabaya.',
};

export default function AboutPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header categories={categories} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Beranda
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">Tentang Redaksi</span>
        </div>

        <div className="border-b-2 border-neutral-900 pb-4 mb-8">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest block mb-1">
            Manifesto Editorial
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 font-editorial-serif">
            Merem Kuliner Surabaya
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base mt-2 font-light">
            Menghidupkan Narasi Rasa Kota Pahlawan Melalui Jurnalisme Kuliner Berintegritas.
          </p>
        </div>

        <div className="prose prose-neutral max-w-none text-neutral-800 text-base leading-relaxed space-y-6">
          <p className="text-lg font-medium text-neutral-900 leading-relaxed">
            <strong>Merem Kuliner Surabaya</strong> lahir dari sebuah keyakinan bahwa makanan bukan
            sekadar pemuas lapar di atas piring, melainkan arsip hidup kebudayaan, sejarah migrasi,
            dan denyut perekonomian warga Surabaya.
          </p>

          <p>
            Nama &ldquo;Merem Kuliner&rdquo; diambil dari ekspresi spontan siapa pun saat mengecap
            makanan yang terlampau lezat: mata otomatis terpejam (*merem*), membiarkan indra pengecap
            menikmati setiap lapisan rempah, kluwek, dan petis yang meledak di lidah.
          </p>

          <h2 id="visi" className="text-2xl font-bold text-neutral-900 pt-6 border-t border-neutral-200 font-editorial-serif">
            Tiga Pilar Liputan Kami
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 not-prose my-6">
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xs">
              <BookOpen className="w-6 h-6 text-orange-600 mb-3" />
              <h3 className="font-bold text-base text-neutral-900 mb-1">Arsip Legendaris</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Mendokumentasikan resep kuno dan kisah perjuangan generasi perintis kuliner Surabaya
                sejak dekade 1940-an hingga 1980-an.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xs">
              <Coffee className="w-6 h-6 text-orange-600 mb-3" />
              <h3 className="font-bold text-base text-neutral-900 mb-1">Skena & Inovasi</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Mengupas dinamika kafe kekinian, bakery artisan, dan tempat kumpul kreatif di penjuru
                Surabaya barat, timur, hingga koridor kota tua.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xs">
              <Heart className="w-6 h-6 text-orange-600 mb-3" />
              <h3 className="font-bold text-base text-neutral-900 mb-1">Dukungan UMKM</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Memberikan panggung yang setara bagi penjual gerobak, warung tenda kaki lima, dan
                pedagang pasar tradisional.
              </p>
            </div>
          </div>

          <h2 id="kode-etik" className="text-2xl font-bold text-neutral-900 pt-6 border-t border-neutral-200 font-editorial-serif">
            Kode Etik & Standar Ulasan
          </h2>

          <ul className="space-y-3 text-sm">
            <li>
              <strong>Independensi Total:</strong> Redaksi tidak menerima bayaran untuk mengubah skor
              atau ulasan rasa. Bila sebuah artikel merupakan liputan advertorial, tanda jelas akan
              disematkan di bagian atas judul.
            </li>
            <li>
              <strong>Santap Langsung di Tempat (*Incognito*):</strong> Tim liputan kami mendatangi
              lokasi kuliner tanpa pemberitahuan khusus demi merasakan perlakuan yang sama dengan
              pengunjung umum.
            </li>
            <li>
              <strong>Akurasi Lokasi & Harga:</strong> Setiap koordinat warung, jam buka, dan estimasi
              harga diverifikasi langsung di lapangan secara berkala.
            </li>
          </ul>

          <div className="mt-12 p-6 bg-orange-50 border border-orange-200 rounded-xs not-prose">
            <h3 className="text-base font-bold text-orange-950 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-600" /> Kontak Redaksi & Kerja Sama
            </h3>
            <p className="text-xs text-orange-900 leading-relaxed">
              Punya informasi kuliner tersembunyi (*hidden gem*) atau undangan liputan festival kuliner di Surabaya?
              Hubungi meja redaksi kami di <strong>redaksi@meremkuliner.id</strong> atau melalui kanal Instagram
              kami <strong>@meremkulinersby</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  );
}
