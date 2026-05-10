import Link from "next/link";
import { getAllVideos } from "@/lib/videos";

export default async function TagPage() {

  const videos = await getAllVideos();

  const safeVideos = Array.isArray(videos)
    ? videos
    : [];

  const tags = [
    ...new Set(
      safeVideos
        .flatMap((item: any) =>
          String(item.tags || item.category || "")
            .split(",")
            .map((tag) => tag.trim())
        )
        .filter(Boolean)
    ),
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-black">
            Tags
          </h1>

          <p className="text-zinc-400 mt-2">
            Browse videos by tags
          </p>

        </div>

        <div className="flex flex-wrap gap-4">

          {tags.map((tag: any) => (

            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-pink-600 transition font-semibold"
            >
              #{tag}
            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}