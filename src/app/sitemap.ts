import { getAllVideos }
from '@/lib/data';

export default async function sitemap() {

  const videos =
    await getAllVideos();

  const urls =
    videos.map((video: any) => ({
      url:
        `https://clitore.com/watch/${video.slug}`,
      lastModified:
        new Date(),
    }));

  return [

    {
      url:
        'https://clitore.com',
      lastModified:
        new Date(),
    },

    ...urls,

  ];

}