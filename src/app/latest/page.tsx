import { getAllVideos } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";

export default async function LatestPage() {

  const videos = await getAllVideos();

  const latestVideos =
  Array.isArray(videos)
    ? videos
    : [];

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-black">
              Latest Uploads
            </h1>

            <p className="text-zinc-400 mt-2">
              Recently added videos
            </p>

          </div>

          <div className="text-sm text-zinc-500">
            {latestVideos.length} Videos
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {latestVideos.map((item: any) => (

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