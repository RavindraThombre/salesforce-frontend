import { apiClient } from "@/app/lib/axiosConfig";

import { SignupPayload, SignupResponse } from "./signup.type";

export const signupUser = async (
  payload: SignupPayload,
): Promise<SignupResponse> => {
  const { data } = await apiClient.post<SignupResponse>(
    "/auth/signup",
    payload,
  );

  return data;
};
