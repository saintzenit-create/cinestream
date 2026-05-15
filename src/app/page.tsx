import { getAllVideos } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";
import HeroSection from "@/components/HeroSection";
import LatestVideos from "@/components/LatestVideos";
import AdsterraNative
from "@/components/AdsterraNative";

export const dynamic =
  "force-dynamic";

export default async function HomePage() {

  const videos = await getAllVideos();

  const featuredVideos = videos.filter(
  (item: any) => item.featured
);

  const categories = [
  ...new Set(
    videos
      .flatMap((item: any) =>
        String(item.category || "")
          .split(",")
          .map((cat) => cat.trim())
      )
      .filter(Boolean)
  ),
];

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO SLIDER */}
      <HeroSection items={featuredVideos} />

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-3 md:px-4 py-8 md:py-14">

        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-8">
          Trending Now
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">

          {videos
  .filter((item: any) => item.trending)
  .map((item: any, index: number) => (
  <VideoCard
    key={item.id}
    item={item}
    index={index}
  />
))}

        </div>

      </section>

      {/* LATEST VIDEOS */}
      <section className="max-w-7xl mx-auto px-4 py-14">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Latest Uploads
          </h2>

          <span className="text-zinc-400 text-sm">
            Recently added videos
          </span>

        </div>

        <LatestVideos videos={videos} />

      </section>

      {/* TALENT */}
<section className="max-w-7xl mx-auto px-4 py-14">

  <h2 className="text-3xl font-bold mb-8">
    Popular Talent
  </h2>

  <div className="flex gap-6 overflow-x-auto scrollbar-hide">

    {[
      ...new Map(
        videos
          .filter(
            (v: any) =>
              v.talent &&
              v.talent_image
          )
          .map((v: any) => [
            v.talent,
            v,
          ])
      ).values(),
    ].map((item: any) => (

      <a
        key={item.id}
        href={`/talent/${item.talent}`}
        className="flex flex-col items-center min-w-[90px]"
      >

        <img
          src={item.talent_image}
          alt={item.talent}
          className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 hover:border-pink-500 transition"
        />

        <span className="mt-3 text-sm text-center font-medium">
          {item.talent}
        </span>

      </a>

    ))}

  </div>
<div className="flex justify-center mt-8">

  <a
    href="/talent"
    className="px-8 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-semibold"
  >
    Show All Talent
  </a>

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
              key={String(category)}
              href={`/category/${category}`}
              className="bg-zinc-900 hover:bg-pink-600 transition px-6 py-3 rounded-full font-medium"
            >
              {String(category)}
            </a>

          ))}

        </div>

      </section>

    </main>
  );
}