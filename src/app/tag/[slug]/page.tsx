import { getAllVideos } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";

export default async function TagDetailPage({
  params,
}: any) {

  const videos =
    await getAllVideos();

  const tag =
    decodeURIComponent(
      params.slug
    );

  const filteredVideos =
    videos.filter((item: any) => {

      const tags =
        String(
          item.tags ||
          item.category ||
          ""
        )
          .split(",")
          .map((v: string) =>
            v.trim().toLowerCase()
          );

      return tags.includes(
        tag.toLowerCase()
      );

    });

  return (

    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-black">
            #{tag}
          </h1>

          <p className="text-zinc-400 mt-2">

            {filteredVideos.length}
            {" "}
            videos found

          </p>

        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">

          {filteredVideos.map(
            (item: any, index: number) => (

            <VideoCard
              key={item.id}
              item={item}
              index={index}
            />

          ))}

        </div>

      </div>

    </main>

  );

}