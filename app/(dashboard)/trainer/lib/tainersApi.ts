import { apiClient } from "@/app/lib/axiosConfig";

export const getTrainerClasses = async () => {
  const res = await apiClient.get("/trainers/live-classes");
  return res.data;
};

// ✅ Get trainer own courses
export const getTrainerCourses = async () => {
  const res = await apiClient.get("/trainers/trainer-courses");
  return res.data;
};
