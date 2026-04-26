import { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/salesforce-academy",
    turbopack: {
        root: __dirname,
    },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bluecloudmentor-service.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },

  async redirects() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/",
          destination: "/salesforce-academy",
          permanent: false,
          basePath: false,
        },
      ];
    }
    return [];
  },

  async rewrites() {
    // 🔹 DEV (your existing)
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api-proxy/:path*",
          destination: "http://localhost:5000/:path*",
          basePath: false,
        },
        {
          source: "/auth-api/:path*",
          destination: "http://salesforce-academy.test/:path*",
          basePath: false,
        },
      ];
    }

    // 🔥 PROD (IMPORTANT ADD)
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://bluecloudmentor-service.onrender.com/:path*",
      },
      {
        source: "/auth-api/:path*",
        destination: "https://bluecloudmentor-service.onrender.com/:path*",
      },
      {
        source: "/salesforce-api/:path*",
        destination: "https://bluecloudmentor-service.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;