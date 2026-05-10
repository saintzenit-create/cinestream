'use client';

import { useState } from 'react';

export default function LoginPage() {

  const [password, setPassword] =
    useState('');

  function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (
      password === 'clitoreadmin'
    ) {

      document.cookie =
        'admin-auth=clitoreadmin; path=/';

      window.location.href =
        '/admin/upload';

    } else {

      alert('Wrong password');

    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-900 rounded-3xl p-10"
      >

        <h1 className="text-4xl font-black mb-8 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full h-14 px-5 rounded-xl bg-black outline-none mb-6"
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