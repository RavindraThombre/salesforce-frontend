import { apiClient } from "@/app/lib/axiosConfig";
import { JobPosition, UpdateJobStatusPayload } from "./recruitment.type";

const BASE_URL = "/admin/job-positions";

// Get All
export const getJobPositions = async (): Promise<JobPosition[]> => {
  const { data } = await apiClient.get<JobPosition[]>(BASE_URL);

  return data;
};

// Get One
export const getJobPosition = async (id: string): Promise<JobPosition> => {
  const { data } = await apiClient.get<JobPosition>(`${BASE_URL}/${id}`);

  return data;
};

// Create
export const createJobPosition = async (
  payload: FormData,
): Promise<JobPosition> => {
  const { data } = await apiClient.post(BASE_URL, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.job;
};

// Update
export const updateJobPosition = async (
  id: string,
  payload: FormData,
): Promise<JobPosition> => {
  const { data } = await apiClient.put(`${BASE_URL}/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.job;
};

// Delete
export const deleteJobPosition = async (id: string): Promise<void> => {
  await apiClient.delete(`${BASE_URL}/${id}`);
};

// Update Status
export const updateJobStatus = async (
  id: string,
  payload: UpdateJobStatusPayload,
): Promise<JobPosition> => {
  const { data } = await apiClient.patch(`${BASE_URL}/${id}/status`, payload);

  return data.job;
};
