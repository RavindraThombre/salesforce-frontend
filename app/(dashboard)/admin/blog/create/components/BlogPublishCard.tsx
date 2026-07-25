"use client";

import Image from "next/image";
import { FileText, ImageIcon, CheckCircle2, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPublishCardProps {
  title: string;
  description: string;
  preview: string | null;
  loading: boolean;
  onPublish(): void;
}

export default function BlogPublishCard({
  title,
  description,
  preview,
  loading,
  onPublish,
}: BlogPublishCardProps) {
  return (
    <Card className="sticky top-6 shadow-sm">
      <CardHeader>
        <CardTitle>Publish</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>

          <Badge variant="secondary">Draft</Badge>
        </div>

        {/* Cover */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ImageIcon className="h-4 w-4" />
            Cover Image
          </div>

          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={400}
              height={220}
              className="h-40 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No image selected
            </div>
          )}
        </div>

        {/* Summary */}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4" />
            Article Summary
          </div>

          <div>
            <p className="text-sm font-semibold line-clamp-2">
              {title || "Untitled Blog"}
            </p>

            <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
              {description || "No description added."}
            </p>
          </div>
        </div>

        {/* Checklist */}

        <div className="space-y-2 rounded-lg bg-muted/40 p-4">
          <p className="text-sm font-medium">Checklist</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2
                className={
                  title
                    ? "h-4 w-4 text-green-600"
                    : "h-4 w-4 text-muted-foreground"
                }
              />
              Title
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                className={
                  description
                    ? "h-4 w-4 text-green-600"
                    : "h-4 w-4 text-muted-foreground"
                }
              />
              Description
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                className={
                  preview
                    ? "h-4 w-4 text-green-600"
                    : "h-4 w-4 text-muted-foreground"
                }
              />
              Cover Image
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={onPublish}
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {loading ? "Publishing..." : "Publish Blog"}
        </Button>
      </CardContent>
    </Card>
  );
}
