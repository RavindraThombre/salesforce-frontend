import { apiClient } from "@/app/lib/axiosConfig";

export interface LiveClass {
  _id: string;
  title: string;
  instructor: string;
  topic: string;
  date: string;
  time: string;
  zoomLink: string;
  status: "Upcoming" | "Live" | "Completed";
}

export const getLiveClasses = async (): Promise<LiveClass[]> => {
  const res = await apiClient.get("/student/live-classes");
  return res.data;
};