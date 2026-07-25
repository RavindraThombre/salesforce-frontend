"use client";

import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogImageUploadProps {
  preview: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export default function BlogImageUpload({
  preview,
  onImageChange,
  onRemoveImage,
}: BlogImageUploadProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Cover Image</CardTitle>

        <p className="text-sm text-muted-foreground">
          Upload an eye-catching cover image for your blog.
        </p>
      </CardHeader>

      <CardContent>
        {!preview ? (
          <label
            htmlFor="blog-image"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 px-6 py-14 text-center transition hover:border-primary hover:bg-primary/5"
          >
            <ImagePlus className="mb-4 h-10 w-10 text-primary" />

            <h3 className="font-semibold">Upload Cover Image</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Click to browse or drag & drop
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG or WEBP (Max 2 MB)
            </p>

            <input
              id="blog-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border">
              <Image
                src={preview}
                alt="Blog Preview"
                width={1200}
                height={675}
                className="h-72 w-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              <label htmlFor="replace-image">
                <Button type="button" variant="outline" asChild>
                  <span>Replace Image</span>
                </Button>

                <input
                  id="replace-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </label>

              <Button
                type="button"
                variant="destructive"
                onClick={onRemoveImage}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
