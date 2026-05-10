'use client';

import {
  useEffect,
  useState,
} from 'react';

import { supabase }
from '@/lib/supabase';

export default function Comments({
  slug,
}: {
  slug: string;
}) {

  const [comments, setComments] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState('');

  const [user, setUser] =
    useState<any>(null);

  async function fetchComments() {

    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('video_slug', slug)
      .order('id', {
        ascending: false,
      });

    setComments(data || []);
  }

  useEffect(() => {

    fetchComments();

    supabase.auth
      .getUser()
      .then(({ data }) => {

        setUser(data.user);
      });

  }, []);

  async function sendComment() {

    if (!user) {

      alert(
        'Please login first'
      );

      location.href = '/auth';

      return;
    }

    if (!message) return;

    await supabase
      .from('comments')
      .insert([
        {
          video_slug: slug,

          username:
            user.user_metadata.username,

          message,
        },
      ]);

    setMessage('');

    fetchComments();
  }

  return (
    <section className="mt-14">

      <h2 className="text-2xl font-bold mb-6">
        Comments
      </h2>

      {/* COMMENT FORM */}

      <div className="space-y-4 mb-10">

        {!user && (

          <div className="bg-zinc-900 p-4 rounded-2xl text-sm text-zinc-300">

            Login required to comment.

          </div>

        )}

        <textarea
          placeholder="Write comment..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="w-full h-32 px-4 py-3 rounded-2xl bg-zinc-900 outline-none"
        />

        <button
          onClick={sendComment}
          className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-bold"
        >
          Send Comment
        </button>

      </div>

      {/* COMMENTS */}

      <div className="space-y-5">

        {comments.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-900 p-5 rounded-2xl"
          >

            <div className="font-bold mb-2 text-pink-500">

              {item.username}

            </div>

            <div className="text-zinc-300 leading-relaxed">

              {item.message}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}