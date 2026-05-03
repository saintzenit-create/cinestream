import Link from 'next/link';

import {
  trendingNow,
  trendingInCountry,
  networkOriginals,
  collections,
  recentMovies,
  recentSeries,
} from '@/data/content';

export default function LeaderboardPage() {
  const allContent = [
    ...trendingNow,
    ...trendingInCountry,
    ...networkOriginals,
    ...collections,
    ...recentMovies,
    ...recentSeries,
  ];

  const unique = Array.from(
    new Map(allContent.map((item) => [item.slug, item])).values()
  );

  const ranked = unique.sort((a, b) => b.rating - a.rating);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-4 sm:px-6 lg:px-12 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Top Rated Leaderboard
        </h1>

        <div className="space-y-3">
          {ranked.map((item, index) => (
            <Link
              key={item.slug}
              href={`/post/${item.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-4 transition"
            >
              <div className="w-10 text-center text-xl font-bold text-[#d50032]">
                #{index + 1}
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-white/50">
                  {item.year} • {item.type === 'movie' ? 'Film' : 'Series'}
                </p>
              </div>

              <div className="text-yellow-400 font-bold">
                ⭐ {item.rating.toFixed(1)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}