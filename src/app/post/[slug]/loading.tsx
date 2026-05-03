export default function Loading() {
  return (
    <div className="bg-black text-white min-h-screen animate-pulse">

      {/* HERO */}
      <div className="relative w-full h-[85vh] bg-zinc-800">

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 md:px-8">

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full">

            {/* POSTER */}
            <div className="w-40 md:w-64 aspect-[2/3] bg-zinc-700 rounded-2xl" />

            {/* TEXT */}
            <div className="max-w-2xl w-full space-y-4">

              <div className="h-8 md:h-12 bg-zinc-700 rounded w-3/4" />
              <div className="h-4 bg-zinc-700 rounded w-1/2" />
              <div className="h-4 bg-zinc-700 rounded w-2/3" />

              <div className="flex gap-3 pt-4">
                <div className="h-10 w-32 bg-zinc-700 rounded-full" />
                <div className="h-10 w-28 bg-zinc-700 rounded-full" />
              </div>

              <div className="space-y-2 pt-4">
                <div className="h-3 bg-zinc-700 rounded" />
                <div className="h-3 bg-zinc-700 rounded w-5/6" />
                <div className="h-3 bg-zinc-700 rounded w-2/3" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="h-6 w-40 bg-zinc-700 rounded mb-6" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[2/3] bg-zinc-700 rounded-2xl mb-2" />
              <div className="h-3 bg-zinc-700 rounded w-3/4 mb-1" />
              <div className="h-3 bg-zinc-700 rounded w-1/2" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}