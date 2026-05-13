"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      alert(error.message);

      return;

    }

    router.push("/admin");

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl space-y-5"
      >

        <h1 className="text-3xl font-black">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full h-14 px-5 rounded-xl bg-zinc-800 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full h-14 px-5 rounded-xl bg-zinc-800 outline-none"
        />

        <button
          type="submit"
          className="w-full h-14 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-bold"
        >
          Login
        </button>

      </form>

    </main>

  );

}