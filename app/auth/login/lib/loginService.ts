import { apiClient } from "@/app/lib/axiosConfig";

import { LoginPayload, LoginResponse } from "./login.type";

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);

  return data;
};
