"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";

type Blog = {
  _id: string;
  title: string;
  image?: string;
  createdAt: string;
};

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/blogs", {
        headers: { "Cache-Control": "no-cache" },
      });
      setBlogs(res.data);
    } catch (error) {
      toast.error("Failed to load blogs ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    try {
      await apiClient.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted ✅");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Posts</h1>

        <Link href="/admin/blog/create">
          <Button>Create Blog</Button>
        </Link>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium">No blogs found</p>
          <p className="text-sm text-muted-foreground">
            Start by creating your first blog ✍️
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {blogs.map((blog) => (
            <Card key={blog._id} className="overflow-hidden">

              {/* IMAGE */}
              {blog.image ? (
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt={blog.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  No Image
                </div>
              )}

              <CardContent className="p-4 space-y-3">

                {/* TITLE */}
                <h2 className="font-semibold text-lg line-clamp-2">
                  {blog.title}
                </h2>

                {/* DATE */}
                <p className="text-xs text-muted-foreground">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">

                  <Link href={`/admin/blog/${blog._id}/edit`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    Delete
                  </Button>

                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      )}

    </div>
  );
}