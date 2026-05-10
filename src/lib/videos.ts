import { supabase } from "@/lib/supabase";

export async function getAllVideos() {
  const response = await supabase
    .from("videos")
    .select("*");

  console.log("SUPABASE RESPONSE:");
  console.log(JSON.stringify(response, null, 2));

  if (response.error) {
    return [];
  }

  return response.data || [];
}