import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import RealtimeViews from '@/components/RealtimeViews';
import AdsterraNative
from "@/components/AdsterraNative";
import Comments from '@/components/Comments';
import { Metadata } from 'next';
import {
  getVideoBySlug,
  getRelatedVideos,
} from "@/lib/data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({
  params,
}: Props) {

  const { slug } =
    await params;

  const video =
    await getVideoBySlug(slug);

  if (!video) {

    return {
      title: 'Video Not Found',
    };

  }

  return {

    title: video.title,

    description:
      video.description,

    keywords:
      video.category,

    alternates: {
      canonical:
        `https://clitore.com/watch/${video.slug}`,
    },

    openGraph: {

      title: video.title,

      description:
        video.description,

      url:
        `https://clitore.com/watch/${video.slug}`,

      images: [
        {
          url:
            video.thumbnail,
        },
      ],

      type: 'video.other',
    },

    twitter: {
      card:
        'summary_large_image',

      title:
        video.title,

      description:
        video.description,

      images: [
        video.thumbnail,
      ],
    },

  };

}
export default async function WatchPage({
  params,
}: Props) {

  const { slug } = await params;

  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const related = await getRelatedVideos(
    video.category,
    video.slug
  );

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

        {/* LEFT */}
        <div>

          {/* PLAYER */}
        <section>

  <VideoPlayer
  src={video.video_url.trim()}
  poster={video.poster}
  playerType={video.player_type}
  slug={video.slug}
  downloadUrl={video.video_url}
/>
  <AdsterraNative />
</section>
          {/* INFO */}
          <section className="py-6">

            <h1 className="text-3xl font-bold mb-3">
              {video.title}
            </h1>

            <div className="flex gap-3 text-sm text-gray-400 mb-4">

              <RealtimeViews
  slug={video.slug}
  initialViews={Number(video.views || 0)}
/>
              <span>{video.year}</span>
              <span>{video.duration}</span>
              <span>{video.quality}</span>

            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              {video.description}
            </p>

            
            {/* TAGS */}
<div className="flex flex-wrap gap-2">

  {video.category?.split(",").map((tag: string) => (

    <a
      key={tag}
      href={`/category/${tag.trim()}`}
      className="px-3 py-1 rounded-full bg-zinc-800 hover:bg-pink-600 transition text-sm"
    >
      #{tag.trim()}
    </a>

  ))}

</div>
<Comments slug={video.slug} />

          </section>

        </div>

        {/* RIGHT */}
        <aside>

          <h2 className="text-2xl font-bold mb-5">
            Related Videos
          </h2>

          <div className="flex flex-col gap-4">

            {related.map((item: any) => (

              <a
                key={item.id}
                href={`/watch/${item.slug}`}
                className="group flex gap-3"
              >

                <div className="relative w-[140px] h-[80px] overflow-hidden rounded-xl flex-shrink-0">

                  <img
  src={item.thumbnail || "/assets/images/no_image.png"}
  alt={item.title}
  loading="lazy"
  className="w-full h-full object-cover group-hover:scale-105 transition"
/>

                </div>

                <div>

                  <h3 className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="text-xs text-gray-400 mt-1">
                    {item.views} views
                  </div>

                </div>

              </a>

            ))}

          </div>

        </aside>

      </div>

    </main>
  );
}