import { supabase } from "@/lib/supabase";

export async function getAllVideos() {

  const now =
    new Date().toISOString();

  const response =
    await supabase
      .from("videos")
      .select("*")
      .eq("status", "published")
      .or(
        `publish_at.is.null,publish_at.lte.${now}`
      )
      .order("id", {
        ascending: false,
      });

  if (response.error) {

    console.log(response.error);

    return [];

  }

  return response.data || [];

}