import Link from "next/link";

type Props = {
  item: any;
};

export default function VideoCard({ item }: Props) {
  return (
    <Link
      href={`/watch/${item.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-900">

        <img
          src={
            item.thumbnail ||
            "/assets/images/no_image.png"
          }
          alt={item.title}
          loading="lazy"
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition duration-300"
        />

        

        {/* CATEGORY */}
        <span className="absolute top-2 right-2 bg-pink-600 text-white text-[10px] px-2 py-1 rounded-md font-medium">

          {item.category?.split(",")[0]}

        </span>

        {/* BOTTOM INFO */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent">

          <div className="flex items-center justify-between text-[11px] text-zinc-300">

          

            <span>
              👁 {item.views || 0}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-2">

        <h3 className="text-sm md:text-base font-semibold leading-tight line-clamp-2">

          {item.title}

        </h3>

        <p className="text-xs text-zinc-400 mt-1">

          {item.year || "2025"}

        </p>

      </div>

    </Link>
  );
}