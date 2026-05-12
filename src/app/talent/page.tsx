"use client";

import Link from "next/link";
import { getAllVideos } from "@/lib/videos";
import { useEffect, useState } from "react";

export default function TalentPage() {

  const [search, setSearch] =
    useState("");

  const [videos, setVideos] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadVideos() {

      const data =
        await getAllVideos();

      setVideos(data || []);

    }

    loadVideos();

  }, []);

  const talentMap = new Map();

  videos.forEach((item: any) => {

    const names = String(
      item.talent || ""
    )
      .split(",")
      .map((v: string) =>
        v.trim()
      );

    const images = String(
      item.talent_image || ""
    )
      .split(",")
      .map((v: string) =>
        v.trim()
      );

    names.forEach(
      (
        name: string,
        index: number
      ) => {

        if (!name) return;

        if (
          !talentMap.has(name)
        ) {

          talentMap.set(name, {
            name,
            image:
              images[index] ||
              "/assets/images/no_avatar.png",
            total: 1,
          });

        } else {

          talentMap.get(
            name
          ).total += 1;

        }

      }
    );

  });

  const talents = Array.from(
    talentMap.values()
  ).sort((a: any, b: any) =>
    a.name.localeCompare(
      b.name
    )
  );

  const filteredTalents =
    talents.filter(
      (talent: any) =>
        talent.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-black">
            Talent
          </h1>

          <p className="text-zinc-400 mt-2">
            Browse videos by talent
          </p>

        </div>

        <input
          type="text"
          placeholder="Search talent..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full h-14 px-5 rounded-2xl bg-zinc-900 outline-none mb-10"
        />

        <div className="flex flex-wrap gap-2 mb-10">

          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("")
            .map((letter) => (

              <button
                key={letter}
                className="px-3 py-1 text-sm rounded-lg bg-zinc-900 hover:bg-pink-600 transition"
              >
                {letter}
              </button>

            ))}

        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">

          {filteredTalents.map(
            (talent: any) => (

              <Link
                key={talent.name}
                href={`/talent/${encodeURIComponent(
                  talent.name
                )}`}
                className="group"
              >

                <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-pink-600 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] transition duration-300">

                  <img
                    loading="lazy"
                    src={talent.image}
                    alt={talent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                </div>

                <h3 className="mt-3 text-center font-semibold">

                  {talent.name}

                </h3>

                <p className="text-zinc-400 text-sm text-center mt-1">

                  {talent.total} videos

                </p>

              </Link>

          ))}

        </div>

      </div>

    </main>
  );
}