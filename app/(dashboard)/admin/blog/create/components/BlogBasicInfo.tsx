"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BlogBasicInfoProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function BlogBasicInfo({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: BlogBasicInfoProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>

        <p className="text-sm text-muted-foreground">
          Add a title and a short summary for your blog.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Blog Title</Label>

          <Input
            id="title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Short Description</Label>

            <span className="text-xs text-muted-foreground">
              {description.length}/250
            </span>
          </div>

          <Textarea
            id="description"
            rows={4}
            maxLength={250}
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />

          <p className="text-xs text-muted-foreground">
            This description may be shown in blog listings and search results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
