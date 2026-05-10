'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function register(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const { error } =
      await supabase.auth.signUp({

        email,
        password,

        options: {

          data: {
            username,
          },

        },

      });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      'Account created. Please confirm your email.'
    );

    window.location.href =
      '/auth/login';
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
          Join now.
        </h1>

        <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
          Create your account and unlock
          unlimited streaming experience.
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6">

        <form
          onSubmit={register}
          className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8"
        >

          <h2 className="text-4xl font-black mb-2">
            Register
          </h2>

          <p className="text-zinc-500 mb-8">
            Create new account
          </p>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full h-14 px-5 rounded-2xl bg-black border border-white/10 outline-none"
            />

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
              Register
            </button>

          </div>

          <div className="mt-8 text-center text-zinc-500">

            Already have account?{' '}

            <Link
              href="/auth/login"
              className="text-pink-500 font-bold"
            >
              Login
            </Link>

          </div>

        </form>

      </div>

    </main>
  );
}