import { apiClient } from "@/app/lib/axiosConfig";

export const getCourses = async () => {
  const res = await apiClient.get("/public/courses");
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await apiClient.get(`/public/courses/${id}`);
  return res.data;
};


export const checkEnrollment = async (courseId: string) => {
  const res = await apiClient.get(
    `/student/check-enrollment/${courseId}`
  );
  return res.data;
};