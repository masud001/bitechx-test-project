import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'laravelpoint.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.ryans.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'ryans.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'fileinfo.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.fileinfo.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'ik.imagekit.io', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.ik.imagekit.io', port: '', pathname: '/**' },
      // Common image CDNs used in product feeds
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.pixabay.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
