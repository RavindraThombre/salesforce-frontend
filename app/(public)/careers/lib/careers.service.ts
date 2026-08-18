import { apiClient } from "@/app/lib/axiosConfig";
import { CareerJob } from "./careers.types";

export const getPublishedJobs = async (): Promise<CareerJob[]> => {
  const response = await apiClient.get<CareerJob[]>("/careers");

  return response.data;
};

export const getPublishedJobBySlug = async (
  slug: string,
): Promise<CareerJob> => {
  const response = await apiClient.get<CareerJob>(`/careers/${slug}`);

  return response.data;
};
