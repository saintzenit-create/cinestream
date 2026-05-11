import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap():
Promise<MetadataRoute.Sitemap> {

  const baseUrl =
    'https://clitore.com';

  const { data: videos } =
    await supabase
      .from('videos')
      .select('slug, updated_at');

  const videoUrls =
    videos?.map((video) => ({
      url:
        `${baseUrl}/watch/${video.slug}`,

      lastModified:
        video.updated_at ||
        new Date(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified:
        new Date(),
    },

    ...videoUrls,
  ];

}