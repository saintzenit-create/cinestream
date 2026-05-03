import Link from 'next/link';
import { contentRows } from '@/data/content';

export default function YearPage() {
const allContent = contentRows.flatMap((row) => row.items);

const years = Array.from(
new Set(allContent.map((item) => item.year))
).sort((a, b) => b - a);

return ( <main className="min-h-screen bg-black text-white px-4 md:px-8 py-10"> <div className="max-w-7xl mx-auto"> <h1 className="text-3xl md:text-5xl font-bold mb-10">
Browse by Year </h1>

```
    <div className="space-y-12">
      {years.map((year) => {
        const items = allContent.filter(
          (item) => item.year === year
        );

        return (
          <section key={year}>
            <h2 className="text-2xl font-semibold mb-5">
              {year}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href="#"
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
                    {item.type === 'movie' ? 'Movie' : 'Series'}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  </div>
</main>


);
}
