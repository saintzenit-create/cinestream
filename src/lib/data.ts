import movies from "@/data/movies.json";

export function getAllVideos() {
  return movies;
}

export function getVideoBySlug(slug: string) {
  return movies.find(
    (item) => item.slug === slug
  );
}

export function getRelatedVideos(
  category: string,
  currentSlug: string
) {
  return movies.filter(
    (item) =>
      item.category === category &&
      item.slug !== currentSlug
  );
}

export function searchVideos(query: string) {

  return movies.filter((item) => {

    const q = query.toLowerCase();

    return (
      item.title.toLowerCase().includes(q) ||

      item.category
        .toLowerCase()
        .includes(q) ||

      item.tags.some((tag) =>
        tag.toLowerCase().includes(q)
      )
    );
  });
}