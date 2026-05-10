import { NextResponse } from "next/server";
import { getAllVideos } from "@/lib/videos";

export async function GET() {
  const videos = await getAllVideos();

  return NextResponse.json(videos);
}