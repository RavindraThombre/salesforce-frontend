"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { apiClient } from "@/app/lib/axiosConfig";

import BlogPageHeader from "../../create/components/BlogPageHeader";
import BlogBasicInfo from "../../create/components/BlogBasicInfo";
import BlogImageUpload from "../../create/components/BlogImageUpload";
import BlogContentEditor from "../../create/components/BlogContentEditor";
import BlogPublishCard from "../../create/components/BlogPublishCard";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await apiClient.get(`/blogs/${params.id}`);

        setTitle(data.title);
        setDescription(data.description ?? "");
        setContent(data.content);
        setPreview(data.image ?? null);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blog");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router]);

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
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
  };

  const handleUpdate = async () => {
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
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);

      if (image instanceof File) {
        formData.append("image", image, image.name);
      }

      await apiClient.put(`/blogs/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog updated successfully");

      router.push("/admin/blog");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <BlogPageHeader loading={saving} onPublish={handleUpdate} mode="edit" />

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
          loading={saving}
          onPublish={handleUpdate}
        />
      </div>
    </div>
  );
}
