"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { apiClient } from "@/app/lib/axiosConfig";

import BlogPageHeader from "./components/BlogPageHeader";
import BlogBasicInfo from "./components/BlogBasicInfo";
import BlogImageUpload from "./components/BlogImageUpload";
import BlogContentEditor from "./components/BlogContentEditor";
import BlogPublishCard from "./components/BlogPublishCard";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG and WEBP images are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    handleFile(file);
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    const plainText = content.replace(/<[^>]*>/g, "").trim();

    if (!plainText) {
      toast.error("Content is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);

      if (image instanceof File) {
        formData.append("image", image);
      }

      await apiClient.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog created successfully");

      router.push("/admin/blog");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <BlogPageHeader
        loading={loading}
        onPublish={handleCreate}
        mode="create"
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <BlogBasicInfo
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />

          <BlogImageUpload
            preview={preview}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
          />

          <BlogContentEditor value={content} onChange={setContent} />
        </div>

        <BlogPublishCard
          title={title}
          description={description}
          preview={preview}
          loading={loading}
          onPublish={handleCreate}
        />
      </div>
    </div>
  );
}
