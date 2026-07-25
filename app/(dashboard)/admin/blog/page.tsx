"use client";
import { useBlogs } from "./lib/useBlogs";
import BlogHeader from "./components/BlogHeader";
import BlogStats from "./components/BlogStats";
import BlogTable from "./components/BlogTable";

export default function AdminBlogPage() {
  const { blogs, loading, deleteBlog } = useBlogs();

  const blogsThisMonth = blogs.filter((blog) => {
    const created = new Date(blog.createdAt);
    const now = new Date();

    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  const latestBlogDate =
    blogs.length > 0
      ? new Date(
          blogs
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )[0].createdAt,
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : undefined;

  return (
    <div className="space-y-6">
      <BlogHeader totalBlogs={blogs.length} />

      <BlogStats
        totalBlogs={blogs.length}
        blogsThisMonth={blogsThisMonth}
        latestBlogDate={latestBlogDate}
      />
      <BlogTable blogs={blogs} loading={loading} onDelete={deleteBlog} />
    </div>
  );
}
