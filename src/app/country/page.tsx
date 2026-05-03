import Link from 'next/link';
import { trendingInCountry } from '@/data/content';

export default function CountryPage() {
  const countries = [
    {
      name: 'South Korea',
      slug: 'south-korea',
      items: trendingInCountry,
    },
    {
      name: 'Japan',
      slug: 'japan',
      items: trendingInCountry.filter((item) =>
        item.title.toLowerCase().includes('love')
      ),
    },
    {
      name: 'USA',
      slug: 'usa',
      items: trendingInCountry.filter((item) =>
        item.type === 'series'
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          Browse by Country
        </h1>

        <div className="space-y-12">
          {countries.map((country) => (
            <section key={country.slug}>
              <h2 className="text-2xl font-semibold mb-5">
                {country.name}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {country.items.map((item) => (
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
                      {item.year}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}