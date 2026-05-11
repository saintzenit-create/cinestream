import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {

  productionBrowserSourceMaps: true,

  distDir:
    process.env.DIST_DIR ||
    '.next',

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
  },

  async headers() {

    return [
      {
        source: '/(.*)',

        headers: [

          {
            key:
              'X-Frame-Options',

            value:
              'SAMEORIGIN',
          },

          {
            key:
              'Content-Security-Policy',

            value:
              "frame-ancestors 'self';",
          },

        ],
      },
    ];

  },

};

export default nextConfig;