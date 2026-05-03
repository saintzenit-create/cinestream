import Link from 'next/link';
import { contentRows } from '@/data/content';

export default function FilterPage() {
  const allContent = contentRows.flatMap((row) => row.items);

  const genres = Array.from(
    new Set(allContent.flatMap((item) => item.genre))
  ).sort();

  const years = Array.from(
    new Set(allContent.map((item) => item.year))
  ).sort((a, b) => b - a);

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          Advanced Filter
        </h1>

        {/* Genre */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Genre</h2>

          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <Link
                key={genre}
                href={`/genre/${genre.toLowerCase()}`}
                className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-red-600 transition text-sm"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        {/* Year */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Year</h2>

          <div className="flex flex-wrap gap-3">
            {years.map((year) => (
              <Link
                key={year}
                href={`/year/${year}`}
                className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-red-600 transition text-sm"
              >
                {year}
              </Link>
            ))}
          </div>
        </section>

        {/* Type */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Type</h2>

          <div className="flex gap-3">
            <Link
              href="/movie"
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-red-600 transition text-sm"
            >
              Movies
            </Link>

            <Link
              href="/series"
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-red-600 transition text-sm"
            >
              Series
            </Link>
          </div>
        </section>

        {/* Rating */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Top Rating</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {allContent
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 10)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/post/${item.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-2xl bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-white/50 text-xs mt-1">
                    ⭐ {item.rating}
                  </p>
                </Link>
              ))}
          </div>
        </section>

      </div>
    </main>
  );
}