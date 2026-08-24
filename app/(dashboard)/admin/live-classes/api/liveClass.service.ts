import { apiClient } from "@/app/lib/axiosConfig";

export type CreateLiveClassPayload = {
  courseId: string;
  trainerId: string;
  topic: string;
  date: string;
  time: string;
  durationMinutes: number;
  zoomLink?: string;
  isFree: boolean;
};

export const getLiveClasses = async () => {
  try {
    const response = await apiClient.get("/admin/live-classes");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch live classes:", error);

    throw error;
  }
};

export const createLiveClass = async (payload: CreateLiveClassPayload) => {
  try {
    const response = await apiClient.post("/admin/live-classes", payload);

    return response.data;
  } catch (error) {
    console.error("Failed to create live class:", error);

    throw error;
  }
};

export const updateLiveClass = async (
  id: string,
  payload: CreateLiveClassPayload,
) => {
  try {
    const response = await apiClient.put(`/admin/live-classes/${id}`, payload);

    return response.data;
  } catch (error) {
    console.error("Failed to update live class:", error);

    throw error;
  }
};

export const deleteLiveClass = async (id: string) => {
  try {
    const response = await apiClient.delete(`/admin/live-classes/${id}`);

    return response.data;
  } catch (error) {
    console.error("Failed to delete live class:", error);

    throw error;
  }
};
