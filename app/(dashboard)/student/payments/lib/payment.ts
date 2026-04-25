import { apiClient } from "@/app/lib/axiosConfig";

export interface Payment {
  _id: string;
  course: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending";
  invoiceUrl: string;
}

export const getPayments = async (): Promise<Payment[]> => {
  const res = await apiClient.get("/student/payments");
  return res.data;
};