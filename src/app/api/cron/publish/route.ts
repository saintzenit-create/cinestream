import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const now = new Date().toISOString();

  // ambil data yang belum diproses
  const { data } = await supabase
    .from("videos")
    .select("*")
    .eq("status", "scheduled")
    .eq("processing", false)
    .lte("publish_at", now);

  if (!data?.length) {
    return NextResponse.json({
      success: true,
      updated: 0,
    });
  }

  const ids = data.map(v => v.id);

  // LOCK dulu biar tidak double run
  await supabase
    .from("videos")
    .update({ processing: true })
    .in("id", ids);

  // publish
  await supabase
    .from("videos")
    .update({
      status: "published",
      processing: false,
    })
    .in("id", ids);

  return NextResponse.json({
    success: true,
    updated: ids.length,
  });
}