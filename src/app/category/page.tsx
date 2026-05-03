import Link from "next/link";
import { getAllVideos } from "@/lib/data";

export default function CategoryPage() {

  const videos = getAllVideos();

  const categories = [
    ...new Set(
      videos.map((item) => item.category)
    ),
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-4 py-24">

        <h1 className="text-5xl font-black mb-10">
          Categories
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

          {categories.map((category) => (

            <Link
              key={category}
              href={`/category/${category}`}
              className="bg-zinc-900 hover:bg-pink-600 transition rounded-2xl p-8 flex items-center justify-center text-center font-bold text-lg"
            >
              {category}
            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}