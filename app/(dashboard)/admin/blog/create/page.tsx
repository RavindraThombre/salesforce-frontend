"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";
import RichTextEditor from "@/app/components/common/RichTextEditor";
export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ HANDLE IMAGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ CREATE BLOG
  const handleCreate = async () => {
    // 🔥 VALIDATION
    if (!title || !content) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await apiClient.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog created successfully ✅");

      router.push("/admin/blog");
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Failed to create blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <Card className="max-w-2xl">
        <CardContent className="p-6 space-y-4">

          <h1 className="text-xl font-bold">Create Blog</h1>

          {/* TITLE */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
  <Label>Description</Label>
  <Input
    placeholder="Enter short description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>

          {/* IMAGE */}
          <div className="space-y-2">
            <Label>Blog Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-40 object-cover rounded"
              />
            )}
          </div>

          {/* CONTENT (RICH TEXT) */}
          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor
    value={content}
    onChange={(val) => setContent(val)}
  />
          </div>

          {/* BUTTON */}
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}