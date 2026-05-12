'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  items: any[];
}

export default function HeroSection({
  items,
}: HeroSectionProps) {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    if (!items?.length) return;

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === items.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, [items]);

  if (!items?.length) return null;

  const item = items[current];

  return (
    <section className="relative h-[90vh] overflow-hidden bg-black">

      {/* BG IMAGE */}
      <div className="absolute inset-0">

        <Image
          src={
            item.poster ||
            item.thumbnail ||
            "/assets/images/no_image.png"
          }
          alt={item.title}
          fill
          priority
          className="object-cover object-center scale-105"
        />

      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-end">

        <div className="max-w-7xl px-6 pb-24">

          <span className="bg-pink-600 text-sm px-4 py-2 rounded-full font-semibold">
            FEATURED VIDEO
          </span>

          <h1 className="text-4xl md:text-4xl font-black mt-5 max-w-3xl leading-tight">
            {item.title}
          </h1>

          <div className="flex gap-3 text-zinc-300 mt-4 text-sm">

            <span>{item.year}</span>

            <span>•</span>

            <span>{item.quality}</span>

            <span>•</span>

            <span>{item.views} views</span>

          </div>

          <p className="text-zinc-300 mt-5 max-w-2xl leading-relaxed line-clamp-3">
            {item.description}
          </p>

          {/* BUTTON */}
          <div className="flex gap-4 mt-8">

            <Link
              href={`/watch/${item.slug}`}
              className="bg-pink-600 hover:bg-pink-700 transition px-8 py-4 rounded-xl font-bold text-lg"
            >
              ▶ Watch Now
            </Link>

          </div>

          {/* DOTS */}
          <div className="flex gap-2 mt-10">

            {items.map((_: any, index: number) => (

              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? 'bg-pink-600 w-10'
                    : 'bg-white/40 w-2'
                }`}
              />

            ))}

          </div>

        </div>

      </div>

      {/* PREV */}
      <button
        onClick={() =>
          setCurrent(
            current === 0
              ? items.length - 1
              : current - 1
          )
        }
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-pink-600 transition w-12 h-12 rounded-full"
      >
        ←
      </button>

      {/* NEXT */}
      <button
        onClick={() =>
          setCurrent(
            current === items.length - 1
              ? 0
              : current + 1
          )
        }
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-pink-600 transition w-12 h-12 rounded-full"
      >
        →
      </button>

    </section>
  );
}