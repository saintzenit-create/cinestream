import Script from "next/script";
import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdsterraSocial
from "@/components/AdsterraSocial";


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {

  metadataBase: new URL(
    'https://clitore.com'
  ),
  verification: {
  google:
    'yL5iqg8APjc3v0f5NHWXGcC2WGM6D4E1KlGQeRbPPNw',
},
    
  title: {
    default:
      'Clitore - Streaming Premium',
    template:
      '%s | Clitore',
  },

  description:
    'Streaming video, series, anime dan video premium kualitas HD subtitle Indonesia.',

  keywords: [
    'scandal',
    'bokep indonesia',
    'update',
    'sma',
    'viral',
    'watch online',
  ],

  icons: {
    icon: '/favicon.png',
  },

  openGraph: {

    title:
      'Clitore Streaming',

    description:
      'Bokep Terbaru, Viral dan Update tiap hari.',

    url:
      'https://clitore.com',

    siteName:
      'Clitore',

    images: [
      {
        url:
          '/assets/images/og.jpg',

        width: 1200,
        height: 630,
      },
    ],

    locale:
      'id_ID',

    type:
      'website',
  },

  twitter: {

    card:
      'summary_large_image',

    title:
      'Clitore Streaming',

    description:
      'Watch premium streaming videos online.',

    images: [
      '/assets/images/og.jpg',
    ],
  },

  alternates: {

    canonical:
      'https://clitore.com',
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

    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />

    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />

    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-6T8MH2QB41"
      strategy="afterInteractive"
    />

    <Script
      id="google-analytics"
      strategy="afterInteractive"
    >

      {`
        window.dataLayer = window.dataLayer || [];

        function gtag(){
          dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'G-6T8MH2QB41');
      `}

    </Script>

  </head>

  <body className="bg-black text-white">

    <Header />

    <main className="min-h-screen pt-16">
      {children}
    </main>

    <Footer />
<AdsterraSocial />
  </body>

</html>
  );
}