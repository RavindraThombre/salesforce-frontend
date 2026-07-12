"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogs } from "./lib/blogApi";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";

type Blog = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  createdAt: string;
};

export default function BlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Blog fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchBlogs();
  }, []);

  if (loading) {
    return <SalesforceLoader />;
  }

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="relative py-4 md:py-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h2
                className="text-base sm:text-xl font-semibold tracking-tight capitalize"
                style={{
                  fontFamily:
                    "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                }}
              >
                Salesforce Blog
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Tips, tutorials, and career guidance for Salesforce learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              className="overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={blog.image || "/blog/default.jpg"} // ✅ safe fallback
                alt={blog.title}
                width={500}
                height={300}
                className="h-48 w-full object-cover"
              />

              <CardContent className="p-5 space-y-3">
                <p className="text-sm text-muted-foreground">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <h3 className="text-xl font-semibold">{blog.title}</h3>

                <p className="text-muted-foreground text-sm line-clamp-3">
                  {blog.description || "No description available"}
                </p>

                <Link href={`/blog/${blog._id}`}>
                  <Button variant="link" className="p-0">
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* EMPTY STATE */}
        {blogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No blogs available</p>
          </div>
        )}
      </section>
    </main>
  );
}
