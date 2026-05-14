import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {

  const now =
    new Date().toISOString();

  const { data } =
    await supabase
      .from("videos")
      .select("*")
      .eq("status", "scheduled")
      .lte("publish_at", now);

  if (!data?.length) {

    return NextResponse.json({
      success: true,
      updated: 0,
    });

  }

  for (const video of data) {

    await supabase
      .from("videos")
      .update({
        status: "published",
      })
      .eq("id", video.id);

  }

  return NextResponse.json({
    success: true,
    updated: data.length,
  });

}