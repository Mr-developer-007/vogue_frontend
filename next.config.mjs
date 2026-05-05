const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
   async rewrites() {
    return [
      {
        source: "/product-feed.xml",
        destination: "https://api.thevoguewardrobe.com/product-feed.xml",
      },
    ];
  },
};


export default nextConfig;
