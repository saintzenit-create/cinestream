import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'clitore — Nonton Film & Series Subtitle Indonesia',
  description:
    'Streaming film, serial TV, drama Korea, anime, dan ribuan konten lainnya dalam format HD dengan subtitle Indonesia.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-black text-white">
        <Header />

        <main className="min-h-screen pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}