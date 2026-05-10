import { searchVideos } from "@/lib/search";
import VideoCard from "@/components/VideoCard";

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