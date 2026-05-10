'use client';

import {
  useEffect,
  useState,
} from 'react';

import { supabase } from '@/lib/supabase';

export default function AnalyticsPage() {

  const [videos, setVideos] = useState<any[]>([]);

  async function loadData() {

    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('views', {
        ascending: false,
      });

    setVideos(data || []);
  }

  useEffect(() => {

    loadData();

    const channel = supabase
      .channel('realtime-videos')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'videos',
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  const totalViews = videos.reduce(
    (sum, item) =>
      sum + Number(item.views || 0),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 rounded-3xl p-6">

            <div className="text-zinc-400 mb-2">
              Total Videos
            </div>

            <div className="text-4xl font-black">
              {videos.length}
            </div>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">

            <div className="text-zinc-400 mb-2">
              Total Views
            </div>

            <div className="text-4xl font-black">
              {totalViews}
            </div>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">

            <div className="text-zinc-400 mb-2">
              Top Video
            </div>

            <div className="text-xl font-bold line-clamp-1">
              {videos[0]?.title || '-'}
            </div>

          </div>

        </div>

        <div className="space-y-4">

          {videos.map((video) => (

            <div
              key={video.id}
              className="bg-zinc-900 rounded-2xl p-5 flex items-center justify-between"
            >

              <div>

                <h2 className="font-bold text-lg">
                  {video.title}
                </h2>

                <div className="text-zinc-400 text-sm mt-1">
                  {video.category}
                </div>

              </div>

              <div className="text-2xl font-black text-pink-500">
                {video.views || 0}
              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}