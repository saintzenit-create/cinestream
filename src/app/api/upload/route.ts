import { NextResponse } from 'next/server';

import { createClient }
from '@supabase/supabase-js';

const supabase = createClient(
  process.env
    .NEXT_PUBLIC_SUPABASE_URL!,
  process.env
    .SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  req: Request
) {

  try {

    const data =
      await req.formData();

    const file =
      data.get('file') as File;

    if (!file) {

      return NextResponse.json(
        {
          error: 'No file',
        },
        { status: 400 }
      );

    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } =
      await supabase.storage
        .from('images')
        .upload(fileName, buffer, {
          contentType: file.type,
        });

    if (error) {

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );

    }

    const { data: publicUrl } =
      supabase.storage
        .from('images')
        .getPublicUrl(fileName);

    return NextResponse.json({
      url:
        publicUrl.publicUrl,
    });

  } catch (err: any) {

    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );

  }

}