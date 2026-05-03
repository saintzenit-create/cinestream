'use client';

import {
  useState,
  useEffect
} from "react";
import {
  notFound,
  useParams
} from "next/navigation";

import {
  getVideoBySlug,
  getRelatedVideos,
} from "@/lib/data";



export default function WatchPage() {

  const params = useParams();

const slug = params.slug as string;

const video = getVideoBySlug(slug);

  if (!video) {
    return notFound();
  }

  const related = getRelatedVideos(
    video.category,
    video.slug
  );

  const [currentServer, setCurrentServer] =
    useState(video.servers?.[0]?.url || "");
useEffect(() => {

  const history = JSON.parse(
    localStorage.getItem("watchHistory") || "[]"
  );

  const filtered = history.filter(
    (item: any) => item.slug !== video.slug
  );

  const updated = [
    video,
    ...filtered,
  ].slice(0, 12);

  localStorage.setItem(
    "watchHistory",
    JSON.stringify(updated)
  );

}, [video]);
  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

        {/* LEFT SIDE */}
        <div>

          {/* PLAYER */}
          <section>

            <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900">

              {currentServer.endsWith(".mp4") ? (
  <video
  src={currentServer}
  controls
  poster={video.poster}
  className="w-full h-full object-contain bg-black"
/>
) : (
  <iframe
    src={currentServer}
    allowFullScreen
    className="w-full h-full"
  />
)}

            </div>

            {/* SERVER BUTTONS */}
            <div className="flex gap-3 mt-4">

              {video.servers.map((server: any) => (

                <button
                  key={server.name}
                  onClick={() =>
                    setCurrentServer(server.url)
                  }
                  className="bg-zinc-800 hover:bg-pink-600 transition px-4 py-2 rounded-lg text-sm"
                >
                  {server.name}
                </button>

              ))}

            </div>

          </section>

          {/* INFO */}
          <section className="py-6">

            <h1 className="text-3xl font-bold mb-3">
              {video.title}
            </h1>

            <div className="flex gap-3 text-sm text-gray-400 mb-4">

              <span>{video.views} views</span>
              <span>{video.year}</span>
              <span>{video.duration}</span>
              <span>{video.quality}</span>

            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              {video.description}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2">

              {video.tags.map((tag: string) => (

                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-zinc-800 text-sm"
                >
                  #{tag}
                </span>

              ))}

            </div>

          </section>

        </div>

        {/* RIGHT SIDEBAR */}
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
  src={item.thumbnail}
  alt={item.title}
  loading="lazy"
  onError={(e) => {
    e.currentTarget.src =
      "/assets/images/no_image.png";
  }}
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