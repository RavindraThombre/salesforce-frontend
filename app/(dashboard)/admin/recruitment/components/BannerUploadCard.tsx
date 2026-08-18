"use client";

import Image from "next/image";
import { ImagePlus, UploadCloud } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface BannerUploadCardProps {
  preview: string;
  onBannerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BannerUploadCard({
  preview,
  onBannerChange,
}: BannerUploadCardProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-4">
        <div className="flex items-start justify-between">
          <div>
            <Label className="text-md font-semibold">Banner Image</Label>

            <p className="mt-1 text-sm text-muted-foreground">
              Upload a banner for this job position.
            </p>
          </div>

          <span className="rounded-md bg-muted px-2 py-1 text-xs">
            1200 × 300
          </span>
        </div>

        <label htmlFor="banner-upload" className="block cursor-pointer">
          {preview ? (
            <div className="relative overflow-hidden rounded-xl border">
              <Image
                src={preview}
                alt="Banner"
                width={1200}
                height={300}
                className="h-64 w-full object-cover transition hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100">
                <Button type="button" variant="secondary">
                  Change Banner
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 transition hover:border-primary hover:bg-muted/40">
              <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />

              <p className="font-medium">Drag & drop your banner here</p>

              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse
              </p>

              <div className="mt-5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                JPG • PNG • WEBP • Max 5 MB
              </div>
            </div>
          )}
        </label>

        <input
          id="banner-upload"
          hidden
          type="file"
          accept="image/*"
          onChange={onBannerChange}
        />

        {!preview && (
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => document.getElementById("banner-upload")?.click()}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Choose Banner
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
