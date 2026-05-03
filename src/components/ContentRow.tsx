'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { MediaItem } from '@/data/content';

interface MediaCardProps {
  item: MediaItem;
}

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="#fcbb00" className="inline-block">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

function MediaCard({ item }: MediaCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/post/${item.slug}`} className="block">
      <div className="media-card relative flex-shrink-0 w-[140px] sm:w-[170px] md:w-[190px] cursor-pointer">
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#111]">
          {!imgError ? (
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 140px, (max-width: 768px) 170px, 190px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white/20 text-xs text-center px-2">{item.title}</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="card-overlay absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <PlayIcon />
            </div>
          </div>

          {/* Type badge */}
          <div className="absolute top-2 left-2">
            <span className="type-badge">{item.type === 'movie' ? 'Film' : 'Series'}</span>
          </div>

          {/* Network badge */}
          {item.badge && (
            <div className="absolute top-2 right-2">
              <span className="text-[0.6rem] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white/80 border border-white/20">
                {item.badge}
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-2 left-2">
            <span className="rating-badge">
              <StarIcon />
              {item.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <p className="mt-2 text-xs sm:text-[0.8125rem] text-[#a0a0a0] truncate leading-tight hover:text-[#f0f0f0] transition-colors">
          {item.title}
        </p>
        <p className="text-[0.65rem] text-[#707070] mt-0.5">{item.year}</p>
      </div>
    </Link>
  );
}

interface ContentRowProps {
  title: string;
  items: MediaItem[];
  viewAllHref?: string;
}

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContentRow({ title, items, viewAllHref }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(updateScrollState, 400);
  };

  return (
    <section className="mb-6 sm:mb-8 relative group/row">
      {/* Section Header */}
      <div className="mb-3 sm:mb-4 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-bold text-[#f0f0f0] tracking-tight">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-xs text-[#d50032] hover:text-[#ff3d2e] font-medium transition-colors flex items-center gap-1"
          >
            Lihat Semua
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-black transition opacity-0 group-hover/row:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-black transition opacity-0 group-hover/row:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="scroll-row flex gap-2 sm:gap-3 px-4 sm:px-6 lg:px-12"
        >
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
