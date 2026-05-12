import { supabase } from "@/lib/supabase";

export async function getAllVideos() {

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("id", { ascending: false })
    .range(0, 999);

  if (error) {
    console.log(error);
    return [];
  }

  return data || [];
}