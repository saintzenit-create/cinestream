import { getAllVideos } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";
import { notFound } from "next/navigation";

interface Props {
  params: {
    name: string;
  };
}

export default async function CategoryPage({
  params,
}: Props) {

  const videos = await getAllVideos();

  const safeVideos = Array.isArray(videos)
    ? videos
    : [];

  const categoryName = decodeURIComponent(
    params.name
  );

  const filteredVideos = safeVideos.filter(
    (item: any) => {

      const categories = String(
        item.category || ""
      )
        .split(",")
        .map((v: string) =>
          v.trim().toLowerCase()
        );

      return categories.includes(
        categoryName.toLowerCase()
      );

    }
  );

  if (filteredVideos.length === 0) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-black">
            {categoryName}
          </h1>

          <p className="text-zinc-400 mt-4">
            {filteredVideos.length} Videos
          </p>

        </div>

        {/* VIDEOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {filteredVideos.map((item: any) => (

            <VideoCard
              key={item.id}
              item={item}
            />

          ))}

        </div>

      </div>

    </main>
  );
}