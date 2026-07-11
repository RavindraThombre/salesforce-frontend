"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { getBlogById } from "../lib/blogApi";

type Blog = {
  _id: string;
  title: string;
  content: string;
  description?: string;
  image?: string;
  createdAt: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-10 max-w-4xl mx-auto px-6">
        <Link href="/blog">
          <Button variant="ghost">← Back to Blog</Button>
        </Link>

        <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>

        <p className="text-muted-foreground mt-2">
          {new Date(blog.createdAt).toDateString()}
        </p>
      </section>

      {/* IMAGE */}
      {blog.image && (
        <section className="max-w-4xl mx-auto px-6">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg w-full object-cover"
          />
        </section>
      )}

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>
    </main>
  );
}
