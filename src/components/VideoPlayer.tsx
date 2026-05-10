'use client';

import { useState } from 'react';
import { useEffect } from 'react';

type Props = {
  src: string;
  poster?: string;
  playerType?: string;
  slug?: string;
};

export default function VideoPlayer({
  src,
  poster,
  playerType = 'mp4',
  slug,
}: Props) {

  const [play, setPlay] = useState(false);
  useEffect(() => {

  if (!slug) return;

  fetch('/api/view', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slug,
    }),
  });

}, [slug]);

  return (
    <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 relative">

      {!play && (

        <button
          onClick={() => setPlay(true)}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40"
        >

          <div className="w-20 h-20 rounded-full bg-pink-600 flex items-center justify-center text-white text-4xl shadow-2xl hover:scale-110 transition">

            ▶

          </div>

        </button>

      )}

      {!play && poster && (

        <img
          src={poster}
          alt="poster"
          className="absolute inset-0 w-full h-full object-cover"
        />

      )}

      {play && (

        playerType === 'embed' ? (

          <iframe
            src={src}
            allowFullScreen
            className="w-full h-full"
          />

        ) : (

          <video
            src={src}
            controls
            autoPlay
            poster={poster}
            className="w-full h-full object-contain bg-black"
          />

        )

      )}

    </div>
  );
}