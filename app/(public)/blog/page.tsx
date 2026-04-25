"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogs } from "./lib/blogApi";

type Blog = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  createdAt: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Blog fetch error:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold">Salesforce Blog</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Tips, tutorials, and career guidance for Salesforce learners.
        </p>
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

                <h3 className="text-xl font-semibold">
                  {blog.title}
                </h3>

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
            <p className="text-muted-foreground">
              No blogs available
            </p>
          </div>
        )}
      </section>
    </main>
  );
}