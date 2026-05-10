import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { supabase } from '@/lib/supabase';

export async function POST(
  req: NextRequest
) {

  const body = await req.json();

  const slug = body.slug;

  if (!slug) {

    return NextResponse.json({
      success: false,
    });

  }

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
      views: currentViews + 1,
    })
    .eq('slug', slug);

  return NextResponse.json({
    success: true,
  });
}