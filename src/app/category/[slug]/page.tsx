import { notFound } from "next/navigation";

import VideoCard from "@/components/VideoCard";

import {
  getVideosByCategory,
} from "@/lib/data";

type Props = {
  params: {
    slug: string;
  };
};

export default function CategoryPage({
  params,
}: Props) {

  const videos = getVideosByCategory(
    params.slug
  );

  if (videos.length === 0) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-4 py-24">

        <h1 className="text-5xl font-black capitalize mb-3">
          {params.slug}
        </h1>

        <p className="text-zinc-400 mb-10">
          {videos.length} videos found
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {videos.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </section>

    </main>
  );
}