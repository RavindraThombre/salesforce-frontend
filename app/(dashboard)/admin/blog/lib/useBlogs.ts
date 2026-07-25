"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/app/lib/axiosConfig";
import { Blog } from "./types";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await apiClient.get("/blogs", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setBlogs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      await apiClient.delete(`/blogs/${id}`);

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));

      toast.success("Blog deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog.");
    }
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs: filteredBlogs,
    loading,
    search,
    setSearch,
    fetchBlogs,
    deleteBlog,
  };
}
