"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlogHeaderProps {
  totalBlogs: number;
}

export default function BlogHeader({ totalBlogs }: BlogHeaderProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>

          <p className="mt-2 text-muted-foreground">
            Manage Salesforce Academy articles, tutorials, and news.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{totalBlogs}</span>{" "}
            Blog{totalBlogs !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Right */}
        <Link href="/admin/blog/create">
          <Button size="lg" className="flex items-center gap-2 cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Create Blog
          </Button>
        </Link>
      </div>
    </div>
  );
}
