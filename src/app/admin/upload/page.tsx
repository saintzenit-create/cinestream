'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';


export default function AdminUploadPage() {

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [dragging, setDragging] =
  useState(false);
  const [videos, setVideos] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [editingId, setEditingId] =
  useState<number | null>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    thumbnail: '',
    poster: '',
    description: '',
    video_url: '',
    category: '',
    views: '0',
    quality: 'HD',
    year: '2026',
    duration: '',
    talent: '',
    talent_image: '',
    featured: false,
    trending: false,
    player_type: 'mp4',
    series_title: '',
    episode_number: 0,

status: 'published',

publish_at: '',
  });
  function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
  async function uploadImage(
  file: File
) {

  const formData = new FormData();

  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (data.url) {

    setPreview(data.url);

    setForm({
      ...form,
      thumbnail: data.url,
      poster: data.url,
      talent_image: data.url,
      series_title: '',
      episode_number: 0,

status: 'published',

publish_at: '',
    });

  }
}

async function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {

  const file = e.target.files?.[0];

  if (!file) return;

  uploadImage(file);
}
  async function fetchVideos() {

  const { data } = await supabase
    .from('videos')
    .select('*')
    .order('id', {
      ascending: false,
    });

  setVideos(data || []);
}
useEffect(() => {
  fetchVideos();
}, []);
const filteredVideos = videos.filter((video) =>

  video.title
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    ) ||

  video.category
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    ) ||

  video.talent
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

);

const totalPages = Math.ceil(
  filteredVideos.length /
  ITEMS_PER_PAGE
);

const paginatedVideos =
  filteredVideos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  async function handleSubmit(
  e: React.FormEvent
) {

  e.preventDefault();

  setLoading(true);

  let error = null;

  if (editingId) {

   const submitData = {
  ...form,

  status:
    form.status,

  publish_at:
  form.publish_at
    ? new Date(form.publish_at).toISOString()
    : null,

  episode_number:
    !form.episode_number
      ? null
      : Number(form.episode_number),
};

const result = await supabase
  .from('videos')
  .update(submitData)
  .eq('id', editingId);

    error = result.error;

  } else {

    const submitData = {
  ...form,

  status:
    form.status,

  publish_at:
  form.publish_at
    ? new Date(form.publish_at).toISOString()
    : null,

  episode_number:
    !form.episode_number
      ? null
      : Number(form.episode_number),
};

const result = await supabase
  .from('videos')
  .insert([submitData]);

    error = result.error;
  }

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert(
    editingId
      ? 'Video updated'
      : 'Video berhasil ditambahkan'
  );

  fetchVideos();

  setEditingId(null);

  setPreview('');

  setForm({
  title: '',
  slug: '',
  thumbnail: '',
  poster: '',
  description: '',
  video_url: '',
  category: '',
  views: '0',
  quality: 'HD',
  year: '2026',
  duration: '',
  talent: '',
  talent_image: '',
  featured: false,
  trending: false,
  player_type: 'mp4',
  series_title: '',
      episode_number: 0,

status: 'published',

publish_at: '',
});
}
async function handleDelete(id: number) {

  const confirmDelete =
    confirm('Delete this video?');

  if (!confirmDelete) return;

  await supabase
    .from('videos')
    .delete()
    .eq('id', id);

  fetchVideos();
}
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-black mb-10">
          Admin Upload
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
  setForm({
    ...form,
    title: e.target.value,
    slug: generateSlug(
      e.target.value
    ),
  })
}
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />

          <input
            type="text"
            placeholder="Slug"
            value={form.slug}
            readOnly
            onChange={(e) =>
  setForm({
    ...form,
    slug: e.target.value,
  })
}
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />

<div
  onDragOver={(e) => {
    e.preventDefault();
    setDragging(true);
  }}
  onDragLeave={() =>
    setDragging(false)
  }
  onDrop={async (e) => {

    e.preventDefault();

    setDragging(false);

    const file =
      e.dataTransfer.files?.[0];

    if (!file) return;

    uploadImage(file);

  }}
  className={`border-2 border-dashed rounded-2xl p-10 transition text-center ${
    dragging
      ? 'border-pink-600 bg-pink-600/10'
      : 'border-zinc-700 bg-zinc-900'
  }`}
>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    id="imageUpload"
  />

  <label
    htmlFor="imageUpload"
    className="cursor-pointer"
  >

    <div className="text-5xl mb-4">
      📁
    </div>

    <p className="text-lg font-semibold">
      Drag & Drop Image Here
    </p>

    <p className="text-zinc-400 mt-2 text-sm">
      or click to browse
    </p>

  </label>

  {preview && (

    <div className="relative w-full h-64 mt-8 rounded-2xl overflow-hidden">

      <Image
        src={preview}
        alt="preview"
        fill
        className="object-cover"
      />

    </div>

  )}

</div>

          <input
            type="text"
            placeholder="Poster URL"
            value={form.poster}
            onChange={(e) =>
              setForm({
                ...form,
                poster: e.target.value,
              })
            }
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full h-40 px-5 py-4 rounded-xl bg-zinc-900 outline-none"
          />

          <input
            type="text"
            placeholder="Video URL"
            value={form.video_url}
            onChange={(e) =>
              setForm({
                ...form,
                video_url: e.target.value,
              })
            }
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />
          <select
  value={form.player_type}
  onChange={(e) =>
    setForm({
      ...form,
      player_type: e.target.value,
    })
  }
  className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
>

  <option value="mp4">
    Direct MP4
  </option>

  <option value="embed">
    Embed Player
  </option>

</select>

          <input
            type="text"
            placeholder="Category (pisahkan dengan koma)"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />

          <input
            type="text"
            placeholder="Talent"
            value={form.talent}
            onChange={(e) =>
              setForm({
                ...form,
                talent: e.target.value,
              })
            }
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />
          <input
  type="text"
  placeholder="Series Title"
  value={form.series_title}
  onChange={(e) =>
    setForm({
      ...form,
      series_title: e.target.value,
    })
  }
  className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
/>

<input
  type="number"
  placeholder="Episode Number"
  value={form.episode_number || ''}
  onChange={(e) =>
    setForm({
      ...form,
      episode_number:
        Number(e.target.value),
    })
  }
  className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
/>
          <input
            type="text"
            placeholder="Talent Image"
            value={form.talent_image}
            onChange={(e) =>
              setForm({
                ...form,
                talent_image: e.target.value,
              })
            }
            className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
          />
          <label className="flex items-center gap-3">

  <input
    type="checkbox"
    checked={form.featured}
    onChange={(e) =>
      setForm({
        ...form,
        featured: e.target.checked,
      })
    }
    className="w-5 h-5"
  />

  <span className="text-sm font-medium">
    Featured Hero
  </span>

</label>
<label className="flex items-center gap-3">

  <input
    type="checkbox"
    checked={form.trending}
    onChange={(e) =>
      setForm({
        ...form,
        trending: e.target.checked,
      })
    }
    className="w-5 h-5"
  />

  <span className="text-sm font-medium">
    Trending Now
  </span>
<select
  value={form.status}
  onChange={(e) =>
    setForm({
      ...form,
      status: e.target.value,
    })
  }
  className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
>

  <option value="published">
    Publish Now
  </option>

  <option value="draft">
    Save as Draft
  </option>

  <option value="scheduled">
    Schedule Post
  </option>

</select>

{form.status === "scheduled" && (

  <input
    type="datetime-local"
    value={form.publish_at}
    onChange={(e) =>
      setForm({
        ...form,
        publish_at: e.target.value,
      })
    }
    className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none"
  />

)}
</label>
          <button
  type="submit"
  disabled={loading}
  className="w-full h-14 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-bold"
>
  {loading
    ? 'Uploading...'
    : editingId
    ? 'Update Video'
    : 'Upload Video'}
</button>

        </form>
        <div className="mt-20">

  <h2 className="text-3xl font-bold mb-8">
    All Videos
  </h2>
<input
  type="text"
  placeholder="Search videos..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="w-full h-14 px-5 rounded-xl bg-zinc-900 outline-none mb-6"
/>
  <div className="space-y-4">

    {paginatedVideos
  .filter((video) =>

    video.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      ) ||

    video.category
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      ) ||

    video.talent
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

  )
  .map((video) => (

      <div
        key={video.id}
        className="flex items-center gap-4 bg-zinc-900 p-4 rounded-2xl"
      >

        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-24 h-16 object-cover rounded-xl"
        />

        <div className="flex-1">

          <h3 className="font-bold">
            {video.title}
          </h3>

          <p className="text-sm text-zinc-400">
            {video.category}
          </p>

        </div>
        
        <button
  type="button"
  onClick={() => {

    setEditingId(video.id);

    setForm({
  title: video.title || '',
  slug: video.slug || '',
  description: video.description || '',
  thumbnail: video.thumbnail || '',
  poster: video.poster || '',
  video_url: video.video_url || '',
  category: video.category || '',
  quality: video.quality || '',
  year: video.year || '',
  views: video.views || '',
  duration: video.duration || '',
  talent: video.talent || '',
  talent_image:
    video.talent_image || '',

  featured:
    video.featured || false,

  trending:
    video.trending || false,

  player_type:
    video.player_type || 'mp4',

  series_title:
    video.series_title || '',

  episode_number:
    video.episode_number || 0,

  status:
    video.status || 'published',

  publish_at:
    video.publish_at || '',
});

    setPreview(
      video.thumbnail || ''
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }}
  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
>
  Edit
</button>
        <button
          onClick={() =>
            handleDelete(video.id)
          }
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
        >
          Delete
        </button>

      </div>

    ))}

    </div>

  <div className="flex justify-center gap-3 mt-10">

    <button
      disabled={page === 1}
      onClick={() =>
        setPage(page - 1)
      }
      className="px-5 py-2 rounded-xl bg-zinc-800 disabled:opacity-40"
    >
      Prev
    </button>

    <div className="px-5 py-2 rounded-xl bg-pink-600 font-bold">

      {page} / {totalPages || 1}

    </div>

    <button
      disabled={page === totalPages}
      onClick={() =>
        setPage(page + 1)
      }
      className="px-5 py-2 rounded-xl bg-zinc-800 disabled:opacity-40"
    >
      Next
    </button>

  </div>

</div>

      </div>

    </main>
  );
}