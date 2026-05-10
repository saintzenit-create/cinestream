'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
type Props = {
  src: string;
  poster?: string;
  playerType?: string;
  slug?: string;
  downloadUrl?: string;
};

export default function VideoPlayer({
  src,
  poster,
  playerType = 'mp4',
  slug,
  downloadUrl,
}: Props) {

  const [play, setPlay] =
  useState(false);

const [user, setUser] =
  useState<any>(null);

useEffect(() => {

  supabase.auth
    .getUser()
    .then(({ data }) => {

      setUser(data.user);

    });

}, []);

useEffect(() => {

  if (!slug) return;

  fetch('/api/view', {
    method: 'POST',
    headers: {
      'Content-Type':
        'application/json',
    },
    body: JSON.stringify({
      slug,
    }),
  });

}, [slug]);

  return (
  <>
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

          <div className="relative w-full h-full">

  <video
    src={src}
    controls
    controlsList="nodownload"
    disablePictureInPicture
    onContextMenu={(e) =>
      e.preventDefault()
    }
    autoPlay
    poster={poster}
    className="w-full h-full object-contain bg-black"
  />

  

</div>


                )

      )}

    </div>

    <div className="mt-4 flex justify-end">

      {user ? (

        <a
          href={downloadUrl || src}
          download
          className="px-6 h-12 rounded-2xl bg-pink-600 hover:bg-pink-700 flex items-center justify-center font-bold text-sm"
        >
          Download Video
        </a>

      ) : (

        <a
          href="/auth/login"
          className="px-6 h-12 rounded-2xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center font-bold text-sm"
        >
          Login to Download
        </a>

      )}

    </div>

  </>
    
  );
}