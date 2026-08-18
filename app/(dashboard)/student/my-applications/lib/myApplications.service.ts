import { apiClient } from "@/app/lib/axiosConfig";

import { MyApplication } from "./myApplications.type";

export const getMyApplications = async (): Promise<MyApplication[]> => {
  const response = await apiClient.get<MyApplication[]>("/job-applications/me");

  return response.data;
};
