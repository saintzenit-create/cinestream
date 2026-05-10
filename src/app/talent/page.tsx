import Link from "next/link";
import { getAllVideos } from "@/lib/videos";

export default async function TalentPage() {

  const videos = await getAllVideos();

  const safeVideos = Array.isArray(videos)
    ? videos
    : [];

  const talentMap = new Map();

  safeVideos.forEach((item: any) => {

    const names = String(item.talent || "")
      .split(",")
      .map((v: string) => v.trim());

    const images = String(item.talent_image || "")
      .split(",")
      .map((v: string) => v.trim());

    names.forEach((name: string, index: number) => {

      if (!name) return;

      if (!talentMap.has(name)) {

        talentMap.set(name, {
          name,
          image:
            images[index] ||
            "/assets/images/no_avatar.png",
        });

      }

    });

  });

  const talents = Array.from(
    talentMap.values()
  );

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-black">
            Talent
          </h1>

          <p className="text-zinc-400 mt-2">
            Browse videos by talent
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {talents.map((talent: any) => (

            <Link
              key={talent.name}
              href={`/talent/${encodeURIComponent(
                talent.name
              )}`}
              className="group"
            >

              <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900">

                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

              </div>

              <h3 className="mt-3 text-center font-semibold">
                {talent.name}
              </h3>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}