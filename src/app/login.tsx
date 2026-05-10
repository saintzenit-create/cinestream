'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function login() {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    location.href = '/';
  }

  async function register() {

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      'Check your email'
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl">

        <h1 className="text-4xl font-black mb-8">
          Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full h-14 px-5 rounded-xl bg-black outline-none"
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
            className="w-full h-14 px-5 rounded-xl bg-black outline-none"
          />

          <button
            onClick={login}
            className="w-full h-14 rounded-xl bg-pink-600 font-bold"
          >
            Login
          </button>

          <button
            onClick={register}
            className="w-full h-14 rounded-xl bg-zinc-800 font-bold"
          >
            Register
          </button>

        </div>

      </div>

    </main>
  );
}