import { apiClient } from "@/app/lib/axiosConfig";

export interface Certificate {
  _id: string;
  course: string;
  student: string;
  date: string;
  certificateUrl: string;
}

export const getCertificates = async (): Promise<Certificate[]> => {
  const res = await apiClient.get("/student/certificates");
  return res.data;
};