"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BlogPageHeaderProps {
  mode: "create" | "edit";
  loading: boolean;
  onPublish(): void;
}

export default function BlogPageHeader({
  mode,
  loading,
  onPublish,
}: BlogPageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <Link
          href="/admin/blog"
          className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        <h1 className="text-2xl font-bold">
          {mode === "create" ? "Create New Blog" : "Edit Blog"}
        </h1>

        <p className="mt-2 text-muted-foreground">
          Write Salesforce tutorials, interview questions, academy news and
          learning resources.
        </p>
      </div>

      <Button size="lg" onClick={onPublish} disabled={loading}>
        <Save className="mr-2 h-4 w-4" />

        {loading ? "Publishing..." : "Publish Blog"}
      </Button>
    </div>
  );
}
