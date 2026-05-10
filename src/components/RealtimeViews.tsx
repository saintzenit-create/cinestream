'use client';

import {
  useEffect,
  useState,
} from 'react';

import { supabase } from '@/lib/supabase';

type Props = {
  slug: string;
  initialViews: number;
};

export default function RealtimeViews({
  slug,
  initialViews,
}: Props) {

  const [views, setViews] =
    useState(initialViews);

  async function loadViews() {

    const { data } = await supabase
      .from('videos')
      .select('views')
      .eq('slug', slug)
      .single();

    setViews(
      Number(data?.views || 0)
    );
  }

  useEffect(() => {

    const channel = supabase
      .channel(`views-${slug}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'videos',
        },
        () => {
          loadViews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  return (
    <span>
      {views} views
    </span>
  );
}