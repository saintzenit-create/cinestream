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
      <div className="relative overflow-hidden rounded-2xl">

  <img
  src={
    item.thumbnail ||
    '/assets/images/no_image.png'
  }
  alt={item.title}
  loading="lazy"
  className="w-full h-[260px] object-cover group-hover:scale-110 transition duration-500"
/>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition duration-300" />

  {/* PLAY BUTTON */}
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">

    <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center text-2xl shadow-2xl">
      ▶
    </div>

  </div>

  {/* BOTTOM GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

  {/* DURATION */}
  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">

    {item.duration}

  </span>

  {/* QUALITY */}
  <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">

    {item.category?.split(',')[0]}

  </span>

</div>

      <div className="mt-3">
        <h3 className="font-semibold line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-zinc-400 mt-1">
          {item.views} views
        </p>
      </div>
    </Link>
  );
}