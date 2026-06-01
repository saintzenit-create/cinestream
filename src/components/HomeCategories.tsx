"use client";

import { useState } from "react";

export default function HomeCategories({
  categories,
}: {
  categories: string[];
}) {

  const [expanded, setExpanded] =
    useState(false);

  const visible =
    expanded
      ? categories
      : categories.slice(0, 12);

  return (
    <>
      <div className="flex flex-wrap gap-4">

        {visible.map((category) => (

          <a
            key={category}
            href={`/category/${category}`}
            className="bg-zinc-900 hover:bg-pink-600 transition px-6 py-3 rounded-full font-medium"
          >
            {category}
          </a>

        ))}

      </div>

      {categories.length > 12 && (

        <div className="mt-8">

          <button
            onClick={() =>
              setExpanded(!expanded)
            }
            className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-semibold"
          >

            {expanded
              ? "Show Less"
              : "Show More"}

          </button>

        </div>

      )}

    </>
  );

}