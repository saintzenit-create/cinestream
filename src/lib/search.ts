import { supabase } from "@/lib/supabase";

export async function searchVideos(query: string) {
  if (!query) return [];

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .ilike("title", `%${query}%`);

  console.log("SUPABASE DATA:", data);
  console.log("SUPABASE ERROR:", error);

  if (error) {
    console.error("SEARCH ERROR:", error);
    return [];
  }

  return data || [];
}