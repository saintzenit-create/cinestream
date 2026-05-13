"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function checkAuth() {

  const { data } =
    await supabase.auth.getSession();

  if (!data.session) {

    router.push("/login");

    return;

  }

  const userId =
    data.session.user.id;
    console.log(data.session.user.id);

  if (
  userId !==
  "bcf472e9-b230-49c0-bf3c-4c4c72a6bcc1"
) {

    alert(
      "You are not admin"
    );

    router.push("/");

    return;

  }

  setLoading(false);

}

    checkAuth();

  }, []);

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");

  }

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading...

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-wrap gap-3 mb-10">

          {[
            {
              name: "Dashboard",
              href: "/admin",
            },
            {
              name: "Upload",
              href: "/admin/upload",
            },
            {
              name: "Published",
              href: "/admin/published",
            },
            {
              name: "Drafts",
              href: "/admin/drafts",
            },
          ].map((item) => (

            <a
              key={item.name}
              href={item.href}
              className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-pink-600 transition"
            >
              {item.name}
            </a>

          ))}

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>

        </div>

        {children}

      </div>

    </main>

  );

}