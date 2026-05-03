'use client';

import { getAllVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import {
  useEffect,
  useState
} from "react";
export default function HomePage() {

  const videos = getAllVideos();
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {

  const saved = JSON.parse(
    localStorage.getItem("watchHistory") || "[]"
  );

  setHistory(saved);

}, []);

  const featured = videos[0];

  const categories = [
    ...new Set(
      videos.map((item) => item.category)
    ),
  ];

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section
        className="relative h-[85vh] flex items-end"
        style={{
          backgroundImage: `url(${featured.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl px-6 pb-20">

          <span className="bg-pink-600 text-sm px-4 py-2 rounded-full">
            FEATURED VIDEO
          </span>

          <h1 className="text-6xl font-black mt-5 max-w-3xl">
            {featured.title}
          </h1>

          <p className="text-zinc-300 mt-5 max-w-2xl leading-relaxed">
            {featured.description}
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href={`/watch/${featured.slug}`}
              className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-xl font-bold"
            >
              Watch Now
            </a>

          </div>

        </div>
      </section>

{/* CONTINUE WATCHING */}
{history.length > 0 && (

  <section className="max-w-7xl mx-auto px-4 py-14">

    <h2 className="text-3xl font-bold mb-8">
      Continue Watching
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

      {history.map((item) => (

        <VideoCard
          key={item.id}
          item={item}
        />

      ))}

    </div>

  </section>

)}

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-4 py-14">

        <h2 className="text-3xl font-bold mb-8">
          Trending Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {videos.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          Categories
        </h2>

        <div className="flex flex-wrap gap-4">

          {categories.map((category) => (

            <a
              key={category}
              href={`/category/${category}`}
              className="bg-zinc-900 hover:bg-pink-600 transition px-6 py-3 rounded-full font-medium"
            >
              {category}
            </a>

          ))}

        </div>

      </section>

    </main>
  );
}