import Link from 'next/link';
import Image from 'next/image';
import { contentRows } from '@/data/content';

export default function MoviePage() {
  const allItems = contentRows.flatMap((row) => row.items);

  const movies = allItems.filter(
    (item, index, self) =>
      item.type === 'movie' &&
      index === self.findIndex((x) => x.slug === item.slug)
  );

  return (
    <main className="min-h-screen bg-[#080808] text-white px-4 sm:px-6 lg:px-12 py-24">
      
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black mb-2">
          Movies
        </h1>

        <p className="text-white/40 mb-8">
          Koleksi semua film terbaik untuk kamu tonton.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((item) => (
            <Link
              key={item.slug}
              href={`/post/${item.slug}`}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#111]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <h3 className="mt-2 text-sm font-semibold line-clamp-1">
                {item.title}
              </h3>

              <p className="text-xs text-white/40">
                {item.year} • ⭐ {item.rating}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}