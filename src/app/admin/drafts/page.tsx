import { supabase } from "@/lib/supabase";

export default async function DraftsPage() {

  const { data } =
    await supabase
      .from("videos")
      .select("*")
      .eq("status", "draft")
      .order("id", {
        ascending: false,
      });

  const drafts = data || [];

  return (

    <main>

      <h1 className="text-3xl font-bold mb-8">
        Draft Videos
      </h1>

      <div className="space-y-4">

        {drafts.map((video: any) => (

          <div
            key={video.id}
            className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl"
          >

            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-24 h-16 object-cover rounded-xl"
            />

            <div>

              <h2 className="font-bold">
                {video.title}
              </h2>

              <p className="text-zinc-400 text-sm">
                Draft
              </p>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}