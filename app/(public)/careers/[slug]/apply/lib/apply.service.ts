import { apiClient } from "@/app/lib/axiosConfig";

import { SubmitJobApplicationPayload } from "./apply.types";

export const submitJobApplication = async (
  payload: SubmitJobApplicationPayload,
) => {
  const formData = new FormData();
  formData.append("jobId", payload.jobId);
  formData.append("phone", payload.phone);
  formData.append("coverLetter", payload.coverLetter);
  formData.append("resume", payload.resume);

  const response = await apiClient.post("/job-applications", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
