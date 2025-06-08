/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // você usa pages router (não app router)
  },
  pageExtensions: ["js", "jsx"],
  reactStrictMode: true,
  output: "standalone", // ✅ Modo Server Side Rendering
};

export default nextConfig;
