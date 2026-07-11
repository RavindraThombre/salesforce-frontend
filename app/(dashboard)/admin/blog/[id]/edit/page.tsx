"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";
import RichTextEditor from "@/app/components/common/RichTextEditor";

type Blog = {
  _id: string;
  title: string;
  content: string;
  description?: string;
  image?: string;
};

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // ✅ FETCH BLOG
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await apiClient.get(`/blogs/${params.id}`);
        const data = res.data;

        setBlog(data);
        setTitle(data.title);
        setContent(data.content);
        setDescription(data.description || "");

        if (data.image) {
          setPreview(data.image);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog ❌");
      }
    };

    if (params.id) fetchBlog();
  }, [params.id]);

  // ✅ IMAGE CHANGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ UPDATE BLOG
  const handleUpdate = async () => {
    if (!title || !content) {
      toast.error("All fields required ❌");
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

      await apiClient.put(`/blogs/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog updated successfully ✅");
      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <Card className="max-w-2xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold">Edit Blog</h1>

          {/* TITLE */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
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

          {/* CONTENT */}
          <div className="space-y-2">
            <Label>Content</Label>

            <RichTextEditor
              value={content}
              onChange={(val) => setContent(val)}
            />
          </div>

          {/* BUTTON */}
          <Button onClick={handleUpdate} disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Blog"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
