import { apiClient } from "@/app/lib/axiosConfig";

/* ===============================
   🔐 TRAINER APIs
================================ */

// ✅ Get trainer own live classes
export const getTrainerClasses = async () => {
  const res = await apiClient.get("/trainers/live-classes");
  return res.data;
};

// ✅ Get trainer own courses
export const getTrainerCourses = async () => {
  const res = await apiClient.get("/trainers/trainer-courses");
  return res.data;
};

/* ===============================
   🔐 ADMIN TRAINER MANAGEMENT
================================ */

// ✅ Get all trainers (for dropdown)
export const getAllTrainers = async () => {
  const res = await apiClient.get("/trainers");
  return res.data;
};

// ✅ Create trainer
export const createTrainer = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await apiClient.post("/trainers/create", data);
  return res.data;
};

// ✅ Delete trainer
export const deleteTrainer = async (id: string) => {
  const res = await apiClient.delete(`/trainer/${id}`);
  return res.data;
};

export const updateTrainer = async (
  id: string,
  data: {
    name: string;
    email: string;
  },
) => {
  const res = await apiClient.put(`/trainers/${id}`, data);
  return res.data;
};
