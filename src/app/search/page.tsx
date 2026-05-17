import { searchVideos } from "@/lib/search";
import VideoCard from "@/components/VideoCard";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {

  const params = await searchParams;

  const query = params.q || "";

  const results = query
    ? await searchVideos(query)
    : [];

  const talents = [
  ...new Set(
    results
      .map((item: any) =>
        item.talent
      )
      .filter(Boolean)
  ),
].filter((talent: any) =>
  talent
    .toLowerCase()
    .includes(query.toLowerCase())
);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-7xl mx-auto px-4 py-24">

        <h1 className="text-4xl font-black mb-8">
          Search
        </h1>

        <form
          action="/search"
          method="GET"
          className="mb-10"
        >
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search videos..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-pink-500"
          />

          <button
            type="submit"
            className="mt-4 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl font-bold"
          >
            Search
          </button>
        </form>

        {talents.length > 0 && (

  <div className="mb-10">

    <h2 className="text-2xl font-bold mb-5">
      Talent
    </h2>

    <div className="grid gap-4">

      {talents.map((talent: any) => {

        const talentVideo =
          results.find(
            (v: any) =>
              v.talent === talent
          );

        return (

          <Link
            key={talent}
            href={`/talent/${encodeURIComponent(talent)}`}
            className="bg-zinc-900 hover:bg-zinc-800 transition rounded-2xl p-5 flex items-center gap-5"
          >

            <img
              src={
                talentVideo?.talent_image ||
                "/placeholder.jpg"
              }
              alt={talent}
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div>

              <h3 className="text-2xl font-black">
                {talent}
              </h3>

              <p className="text-zinc-400 mt-1">
                View Talent Profile
              </p>

            </div>

          </Link>

        );

      })}

    </div>

  </div>

)}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

            {results.map((item: any) => (
              <VideoCard
                key={item.id}
                item={item}
              />
            ))}

          </div>
        ) : query ? (
          <div className="text-zinc-500">
            No videos found.
          </div>
        ) : null}

      </section>
    </main>
  );
}