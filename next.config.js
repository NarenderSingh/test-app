const nextConfig = {
  reactStrictMode: false,
  // distDir: "build",
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/((?!.swa).*)<YOUR MATCHING RULE>",
        destination: "<YOUR REDIRECT RULE>",
        permanent: false,
      },
    ];
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
