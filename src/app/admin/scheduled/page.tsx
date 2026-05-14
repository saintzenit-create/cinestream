import { supabase } from "@/lib/supabase";

export default async function ScheduledPage() {

  const { data } =
    await supabase
      .from("videos")
      .select("*")
      .eq("status", "scheduled")
      .order("publish_at", {
        ascending: true,
      });

  return (

    <main className="space-y-5">

      <h1 className="text-4xl font-black">
        Scheduled Videos
      </h1>

      {data?.map((video) => (

        <div
          key={video.id}
          className="bg-zinc-900 p-5 rounded-2xl"
        >

          <h2 className="font-bold">
            {video.title}
          </h2>

          <p className="text-zinc-400 text-sm mt-2">

            Publish:
            {" "}
            {new Date(
  video.publish_at
).toLocaleString("id-ID", {
  timeZone: "Asia/Jakarta",
})}

          </p>

        </div>

      ))}

    </main>

  );

}