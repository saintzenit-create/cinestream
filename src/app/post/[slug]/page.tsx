import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { contentRows } from '@/data/content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const allItems = contentRows.flatMap((row) => row.items);

  const item = allItems.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: 'Film Tidak Ditemukan - CineStream',
    };
  }

  return {
    title: `${item.title} (${item.year}) - CineStream`,
    description:
      item.description ||
      `Nonton ${item.title} subtitle Indonesia kualitas HD hanya di CineStream.`,

    openGraph: {
      title: item.title,
      description:
        item.description ||
        `Streaming ${item.title} subtitle Indonesia.`,
      images: [item.image],
    },
  };
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;

  const allItems = contentRows.flatMap((row) => row.items);

  const item = allItems.find((i) => i.slug === slug);

  if (!item) return notFound();

  // 🔥 RELATED SMART
  const related = allItems
    .filter((i) => i.slug !== item.slug)
    .map((i) => {
      let score = 0;

      if (i.genre === item.genre) score += 2;

      if (
        Math.abs(Number(i.year || 0) - Number(item.year || 0)) <= 2
      ) {
        score += 1;
      }

      return { ...i, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* 🎥 HERO */}
      <section className="relative w-full h-[85vh] overflow-hidden">

        {/* BACKDROP */}
        <img
          src={item.image}
          alt={item.title}
          onError={(e) => {
  e.currentTarget.src =
    "/assets/images/no_image.png";
}}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm opacity-60"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 md:px-8">

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full">

            {/* POSTER */}
            <div className="w-40 md:w-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
  e.currentTarget.src =
    "/assets/images/no_image.png";
}}
              />
            </div>

            {/* INFO */}
            <div className="max-w-2xl text-center md:text-left">

              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/70 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Trending Now
              </div>

              {/* TITLE */}
              <h1 className="text-3xl md:text-6xl font-black mb-5 leading-tight">
                {item.title}
              </h1>

              {/* META */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-white/70 mb-5">

                <span className="text-[#fcbb00] font-semibold">
                  ⭐ {(item.rating ?? 8.5).toFixed(1)}
                </span>

                <span>•</span>

                <span>{item.year}</span>

                <span>•</span>

                <span>{item.genre || 'Drama'}</span>

                <span>•</span>

                <span>HD</span>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">

                <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition flex items-center gap-2">
                  ▶ Play Now
                </button>

                <button className="border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/10 transition text-sm">
                  + My List
                </button>

              </div>

              {/* DESC */}
              <p className="text-white/80 leading-relaxed text-sm md:text-base">
                {item.description ||
                  'Deskripsi belum tersedia untuk konten ini.'}
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-6 rounded-full bg-[#d50032]" />

          <h2 className="text-xl md:text-2xl font-bold">
            More Like This
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">

          {related.map((rel) => (
            <Link
              key={rel.id}
              href={`/post/${rel.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5">

                <img
                  src={rel.image}
                  alt={rel.title}
                  onError={(e) => {
  e.currentTarget.src =
    "/assets/images/no_image.png";
}}
                  loading="lazy"
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition duration-300"
                />

                {/* HOVER */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">

                  <span className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold">
                    ▶ Watch
                  </span>

                </div>

              </div>

              <h3 className="mt-3 text-sm font-semibold line-clamp-1 group-hover:text-white transition">
                {rel.title}
              </h3>

              <p className="text-white/50 text-xs mt-1">
                {rel.year}
              </p>
            </Link>
          ))}

        </div>
      </section>

      <div className="h-10" />
    </main>
  );
}