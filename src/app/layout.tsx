import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Merem Kuliner Surabaya | Jurnal & Berita Kuliner Kota Pahlawan",
  description:
    "Portal digital independen seputar berita kuliner, cerita rasa, street food, kafe, dan kuliner legendaris Surabaya.",
  keywords: [
    "kuliner surabaya",
    "berita kuliner",
    "rawon setan",
    "rujak cingur",
    "street food surabaya",
    "rekomendasi kuliner surabaya",
  ],
  authors: [{ name: "Redaksi Merem Kuliner" }],
  openGraph: {
    title: "Merem Kuliner Surabaya | Portal Berita Kuliner",
    description:
      "Jurnal & Berita Kuliner Kota Pahlawan. Ulasan terpercaya, kurasi kuliner legendaris, cafe & street food.",
    type: "website",
    locale: "id_ID",
  },
};

import PortalEntranceIntro from "@/components/PortalEntranceIntro";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="font-sans h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFDFD] text-[#121212] font-sans antialiased selection:bg-orange-500 selection:text-white">
        <PortalEntranceIntro />
        {children}
      </body>
    </html>
  );
}
