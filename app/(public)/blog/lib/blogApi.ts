import { apiClient } from "@/app/lib/axiosConfig";

// 🔥 GET ALL BLOGS
export const getBlogs = async () => {
  const res = await apiClient.get("/public/blogs");
  return res.data;
};

// 🔥 GET BLOG BY ID
export const getBlogById = async (id: string) => {
  const res = await apiClient.get(`/public/blogs/${id}`);
  return res.data;
};