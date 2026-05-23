export const dynamic =
  "force-dynamic";

import { supabase } from "@/lib/supabase";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "id-ID",
    {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

export default async function ScheduledPage() {

  const { data } =
    await supabase
      .from("videos")
      .select("*")
      .eq("status", "scheduled")
      .order("publish_at", {
        ascending: true,
      });

  const grouped: Record<string, any[]> = {};

  data?.forEach((video) => {

    const dateKey =
      new Date(video.publish_at)
        .toLocaleDateString("id-ID", {
          timeZone: "Asia/Jakarta",
        });

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(video);

  });

  const today =
    new Date()
      .toLocaleDateString("id-ID", {
        timeZone: "Asia/Jakarta",
      });

  return (

    <main className="space-y-8">

      <h1 className="text-4xl font-black">
        Scheduled Videos
      </h1>

      {Object.entries(grouped).map(
        ([date, videos]) => (

          <section
            key={date}
            className="space-y-4"
          >

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold">

                {formatDate(
                  videos[0].publish_at
                )}

              </h2>

              {date === today && (

                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  TODAY
                </span>

              )}

            </div>

            <div className="space-y-4">

              {videos.map((video) => (

                <div
                  key={video.id}
                  className="bg-zinc-900 p-5 rounded-2xl"
                >

                  <h3 className="font-bold">
                    {video.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mt-2">

                    Publish:
                    {" "}

                    {new Date(
                      video.publish_at
                    ).toLocaleString(
                      "id-ID",
                      {
                        timeZone:
                          "Asia/Jakarta",
                      }
                    )}

                  </p>

                </div>

              ))}

            </div>

          </section>

        )
      )}

    </main>

  );

}