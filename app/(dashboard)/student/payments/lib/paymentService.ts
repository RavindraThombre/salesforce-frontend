import { apiClient } from "@/app/lib/axiosConfig";
import { Payment } from "./payment.type";

export const getPayments = async (): Promise<Payment[]> => {
  const res = await apiClient.get("/student/payments");
  return res.data;
};
