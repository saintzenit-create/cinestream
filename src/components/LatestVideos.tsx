"use client";

import { useState } from "react";
import VideoCard from "@/components/VideoCard";

export default function LatestVideos({
  videos,
}: {
  videos: any[];
}) {

  const [visible, setVisible] =
    useState(10);

  return (
    <>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">

        {videos
          .slice(0, visible)
          .map(
            (
              item: any,
              index: number
            ) => (

              <VideoCard
                key={`latest-${item.id}`}
                item={item}
                index={index}
              />

            )
          )}

      </div>

      {visible < videos.length && (

        <div className="flex justify-center mt-10">

          <button
            onClick={() =>
              setVisible(
                visible + 10
              )
            }
            className="px-8 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-semibold"
          >
            Show More
          </button>

        </div>

      )}

    </>
  );
}