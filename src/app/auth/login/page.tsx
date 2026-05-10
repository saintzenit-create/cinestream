'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function login(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const { error } =
      await supabase.auth
        .signInWithPassword({

          email,
          password,

        });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = '/';
  }

  return (
    <main className="min-h-screen bg-black text-white grid lg:grid-cols-2">

      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-black to-[#180008]">

        <img
          src="/assets/images/logo.png"
          className="h-10 w-fit mb-10"
        />

        <h1 className="text-6xl font-black leading-tight mb-8">
          Welcome back.
        </h1>

        <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
          Continue watching your favorite videos,
          update and premium content.
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6">

        <form
          onSubmit={login}
          className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8"
        >

          <h2 className="text-4xl font-black mb-2">
            Login
          </h2>

          <p className="text-zinc-500 mb-8">
            Login to your account
          </p>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 outline-none"
            />

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-pink-600 hover:bg-pink-700 font-bold text-lg"
            >
              Login
            </button>

          </div>

          <div className="mt-8 text-center text-zinc-500">

            Don't have account?{' '}

            <Link
              href="/auth/register"
              className="text-pink-500 font-bold"
            >
              Register
            </Link>

          </div>

        </form>

      </div>

    </main>
  );
}