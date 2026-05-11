import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  req: NextRequest
) {

  const body = await req.json();

  const slug = body.slug;

  const forwarded =
    req.headers.get('x-forwarded-for');

  const ip =
    forwarded?.split(',')[0] ||
    'unknown';

  if (!slug) {

    return NextResponse.json({
      success: false,
    });

  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const { data: existing } =
    await supabase
      .from('video_views')
      .select('*')
      .eq('video_slug', slug)
      .eq('ip', ip)
      .gte(
        'created_at',
        today.toISOString()
      )
      .maybeSingle();

  if (!existing) {

    await supabase
      .from('video_views')
      .insert({
        video_slug: slug,
        ip,
      });

    const { data: video } =
      await supabase
        .from('videos')
        .select('views')
        .eq('slug', slug)
        .single();

    const currentViews =
      Number(video?.views || 0);

    await supabase
      .from('videos')
      .update({
        views:
          currentViews + 1,
      })
      .eq('slug', slug);

  }

  return NextResponse.json({
    success: true,
  });

}