import { supabase }
from "@/lib/supabase";

export async function
getAllVideos() {

  const response =
    await supabase
      .from("videos")
      .select("*")
      .eq("status", "published")
.not("publish_at", "is", null)
.order("publish_at", {
  ascending: false,
});

  if (response.error) {

    console.log(
      response.error
    );

    return [];

  }

  return response.data || [];

}