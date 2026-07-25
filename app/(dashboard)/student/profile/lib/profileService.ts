import { apiClient } from "@/app/lib/axiosConfig";

import {
  ChangePasswordPayload,
  Profile,
  UpdateProfilePayload,
} from "./profile.type";

export const getProfile = async (): Promise<Profile> => {
  const { data } = await apiClient.get<Profile>("/user/profile");
  return data;
};

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<Profile> => {
  const { data } = await apiClient.put<Profile>("/user/profile", payload);

  return data;
};

export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<void> => {
  await apiClient.put("/user/change-password", payload);
};
