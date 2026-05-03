import { searchVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default function SearchPage({
  searchParams,
}: Props) {

  const query = searchParams.q || "";

  const results = query
    ? searchVideos(query)
    : [];

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-4 py-24">

        <h1 className="text-4xl font-black mb-8">
          Search
        </h1>

        {/* SEARCH FORM */}
        <form
          action="/search"
          className="mb-10"
        >

          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search videos..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 outline-none focus:border-pink-500"
          />

        </form>

        {/* RESULTS */}
        {query && (
          <p className="text-zinc-400 mb-8">
            Results for: <span className="text-white">{query}</span>
          </p>
        )}

        {results.length > 0 ? (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

            {results.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
              />
            ))}

          </div>

        ) : (

          <div className="text-zinc-500">
            No videos found.
          </div>

        )}

      </section>

    </main>
  );
}