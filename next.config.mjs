/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steamcdn-a.akamaihd.net",
        port: "",
        pathname: "/steamcommunity/public/images/avatars/**",
      },
    ],
  },
};

export default nextConfig;
