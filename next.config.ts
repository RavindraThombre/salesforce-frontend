import { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: "/salesforce-academy",
    turbopack: {
        root: __dirname,
    },
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.116", // ✅ your local IP (important)
        port: "5000",
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
                    basePath: false
                }
            ];
        }
        return [];
    },
    async rewrites() {
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
        return [];
    }
};

export default nextConfig;