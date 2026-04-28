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
    return [
      {
        source: "/",
        destination: "/salesforce-academy",
        permanent: true,
        basePath: false,
      },
    ];
  },

  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api-proxy/:path*",
          destination: "http://localhost:5000/:path*",
        },
        {
          source: "/auth-api/:path*",
          destination: "http://salesforce-academy.test/:path*",
        },
      ];
    }

    // ✅ PROD
   return [
  {
    source: "/api-proxy/:path*",
    destination: "https://bluecloudmentor-service.onrender.com/:path*",
    // basePath: false,
  },
  {
    source: "/auth-api/:path*",
    destination: "https://bluecloudmentor-service.onrender.com/:path*",
    // basePath: false,
  },
  {
    source: "/salesforce-api/:path*",
    destination: "https://bluecloudmentor-service.onrender.com/:path*",
    // basePath: false,
  },
];
  },
};

export default nextConfig;