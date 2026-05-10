import { getAllVideos } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";
import { notFound } from "next/navigation";

interface Props {
  params: {
    name: string;
  };
}

export default async function TalentDetailPage({
  params,
}: Props) {

  const videos = await getAllVideos();

  const safeVideos = Array.isArray(videos)
    ? videos
    : [];

  const talentName = decodeURIComponent(
    params.name
  );

  const filteredVideos = safeVideos.filter(
    (item: any) => {

      const talents = String(
        item.talent || ""
      )
        .split(",")
        .map((v: string) =>
          v.trim().toLowerCase()
        );

      return talents.includes(
        talentName.toLowerCase()
      );

    }
  );

  if (filteredVideos.length === 0) {
    return notFound();
  }

  let talentImage =
    "/assets/images/no_avatar.png";

  for (const item of filteredVideos) {

    const names = String(
      item.talent || ""
    )
      .split(",");

    const images = String(
      item.talent_image || ""
    )
      .split(",");

    names.forEach(
      (name: string, index: number) => {

        if (
          name.trim().toLowerCase() ===
            talentName.toLowerCase() &&
          images[index]?.trim()
        ) {

          talentImage =
            images[index].trim();

        }

      }
    );

  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-14">

          <div className="w-44 h-44 rounded-3xl overflow-hidden bg-zinc-900 flex-shrink-0">

            <img
              src={talentImage}
              alt={talentName}
              className="w-full h-full object-cover"
            />

          </div>

          <div>

            <h1 className="text-5xl font-black">
              {talentName}
            </h1>

            <p className="text-zinc-400 mt-4">
              {filteredVideos.length} Videos
            </p>

          </div>

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