import Link from 'next/link';

import {
  trendingNow,
  trendingInCountry,
  networkOriginals,
  collections,
  recentMovies,
  recentSeries,
} from '@/data/content';

export default function GenrePage() {
  const allContent = [
    ...trendingNow,
    ...trendingInCountry,
    ...networkOriginals,
    ...collections,
    ...recentMovies,
    ...recentSeries,
  ];

  const genres = Array.from(
    new Set(
      allContent.flatMap((item) => item.genre)
    )
  ).sort();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 sm:px-6 lg:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Browse Genres
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition"
            >
              {genre}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}