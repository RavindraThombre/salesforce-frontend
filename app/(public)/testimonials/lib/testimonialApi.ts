import { apiClient } from "@/app/lib/axiosConfig";

export const getTestimonials = async () => {
  const res = await apiClient.get("/public/testimonials");
  return res.data;
};