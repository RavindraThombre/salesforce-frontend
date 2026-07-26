import { apiClient } from "@/app/lib/axiosConfig";
import { ResetPasswordPayload } from "./resetPassword.type";

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<void> => {
  await apiClient.post("/auth/reset-password", payload);
};
