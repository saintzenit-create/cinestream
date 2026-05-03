'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { MediaItem } from '@/data/content';

interface HeroSectionProps {
  item: MediaItem;
}

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fcbb00">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function HeroSection({ item }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative w-full min-h-[92svh] bg-black overflow-hidden">
      {/* BG */}
      {!imgError ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#180008] via-black to-black" />
      )}

      {/* overlays */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(213,0,50,.20),transparent_35%)]" />

      {/* content */}
      <div className="relative z-10 flex items-end min-h-[92svh] px-4 sm:px-6 lg:px-12 pb-14 sm:pb-16">
        <div className="max-w-xl lg:max-w-2xl animate-[fadeIn_.8s_ease]">

          {/* badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#d50032]" />
              {item.type === 'movie' ? 'Featured Movie' : 'Featured Series'}
            </span>
          </div>

          {/* title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white drop-shadow-2xl">
            {item.title}
          </h1>

          {/* meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <StarIcon />
              <span className="font-semibold text-[#fcbb00]">
                {item.rating ? item.rating.toFixed(1) : 'N/A'}
              </span>
            </div>

            <span className="text-white/45">•</span>
            <span className="text-white/80">{item.year}</span>

            {item.episodes && (
              <>
                <span className="text-white/45">•</span>
                <span className="text-white/80">{item.episodes} Episodes</span>
              </>
            )}

            {item.duration && (
              <>
                <span className="text-white/45">•</span>
                <span className="text-white/80">{item.duration}</span>
              </>
            )}
          </div>

          {/* genre */}
          <div className="mt-4 flex flex-wrap gap-2">
            {item.genre.slice(0, 4).map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-white/80"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* desc */}
          {item.description && (
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed max-w-2xl line-clamp-3">
              {item.description}
            </p>
          )}

          {/* buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${item.type}/${item.slug}`}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-[#d50032] hover:bg-[#ef0038] transition font-semibold text-sm sm:text-base shadow-[0_10px_35px_rgba(213,0,50,.35)]"
            >
              <PlayIcon />
              Tonton Sekarang
            </Link>

            <Link
              href={`/${item.type}/${item.slug}`}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition font-medium text-sm sm:text-base"
            >
              <InfoIcon />
              Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}