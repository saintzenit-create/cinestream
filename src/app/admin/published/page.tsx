import Link from "next/link";
import { getAllVideos } from "@/lib/videos";

export default async function PublishedPage() {

  const videos =
    await getAllVideos();

  return (

    <main>

      <h1 className="text-3xl font-bold mb-8">
        Published Videos
      </h1>

      <div className="space-y-4">

        {videos.map((video: any) => (

          <div
            key={video.id}
            className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl"
          >

            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-24 h-16 object-cover rounded-xl"
            />

            <div className="flex-1">

              <h2 className="font-bold">
                {video.title}
              </h2>

              <p className="text-zinc-400 text-sm">
                {video.category}
              </p>

            </div>

            <Link
              href={`/watch/${video.slug}`}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 transition"
            >
              View
            </Link>

          </div>

        ))}

      </div>

    </main>

  );

}