import { apiClient } from "@/app/lib/axiosConfig";

import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "./forgotPassword.type";

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const { data } = await apiClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload,
  );

  return data;
};
