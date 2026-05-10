import Link from "next/link";
import { getAllVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

export default async function PopularPage() {

  const videos = await getAllVideos();

  const sortedVideos = [...videos].sort(
    (a: any, b: any) =>
      Number(b.views || 0) - Number(a.views || 0)
  );

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 pt-28 pb-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <p className="text-pink-500 text-sm font-semibold mb-3 uppercase tracking-[0.2em]">
              Most Watched
            </p>

            <h1 className="text-4xl md:text-5xl font-black">
              Popular Videos
            </h1>

          </div>

          <div className="text-zinc-500 text-sm">
            {sortedVideos.length} Videos
          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {sortedVideos.map((item: any, index: number) => (

            <div
              key={item.id}
              className="relative"
            >

              {/* RANK */}
              <div className="
                absolute
                top-2
                left-2
                z-20
                w-8
                h-8
                rounded-full
                bg-pink-600
                flex
                items-center
                justify-center
                text-sm
                font-black
                shadow-lg
              ">
                #{index + 1}
              </div>

              <VideoCard item={item} />

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}