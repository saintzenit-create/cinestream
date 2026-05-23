import { supabase }
from "@/lib/supabase";

export async function
getAllVideos() {

  const response =
  await supabase
    .from("videos")
    .select("*")
    .eq("status", "published")
    .order("publish_at", {
      ascending: false,
      nullsFirst: false,
    });

  if (response.error) {

    console.log(
      response.error
    );

    return [];

  }

  return response.data || [];

}