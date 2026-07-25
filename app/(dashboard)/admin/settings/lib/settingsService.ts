import { apiClient } from "@/app/lib/axiosConfig";
import { Settings, SettingsResponse } from "./settings.type";

export const getSettings = async (): Promise<SettingsResponse> => {
  const res = await apiClient.get("/settings");
  return res.data;
};

export const updateSettings = async (
  payload: Settings,
): Promise<SettingsResponse> => {
  const res = await apiClient.put("/settings", payload);
  return res.data;
};
