import Link from "next/link";
import { getAllVideos } from "@/lib/videos";

export default async function CategoryPage() {

  const videos = await getAllVideos();

  const safeVideos = Array.isArray(videos)
    ? videos
    : [];

  const categories = [
  ...new Set(
    safeVideos
      .flatMap((item: any) =>
        String(item.category || "")
          .split(",")
          .map((cat) => cat.trim())
      )
      .filter(Boolean)
  ),
];
  return (
    <main className="min-h-screen bg-black text-white px-4 py-24">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-black mb-10">
          Categories
        </h1>

        <div className="flex flex-wrap gap-4">

          {categories.map((category: any) => (

            <Link
              key={category}
              href={`/category/${category}`}
              className="px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-pink-600 transition font-semibold"
            >
              {category}
            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}