import { supabase } from "./supabase";

export async function getAllVideos() {
  const { data, error } = await supabase
    .from("videos")
    .select("*");

  console.log("SUPABASE DATA:", data);
  console.log("SUPABASE ERROR:", error);

  return data || [];
}

export async function getVideoBySlug(slug: string) {
  const { data } = await supabase
    .from("videos")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}

export async function getRelatedVideos(
  category: string,
  currentSlug: string
) {

  const firstCategory =
    category.split(",")[0].trim();

  const { data } = await supabase
    .from("videos")
    .select("*")
    .ilike("category", `%${firstCategory}%`)
    .neq("slug", currentSlug)
    .limit(12);

  return data || [];
}