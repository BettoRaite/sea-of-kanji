/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
    }
    // Important: return the modified config
    return config;
  },
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
