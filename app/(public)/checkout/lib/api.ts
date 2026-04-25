import { apiClient } from "@/app/lib/axiosConfig";

// ✅ CREATE ORDER
export const createOrder = async (courseId: string, amount: number) => {
  const res = await apiClient.post("/payments/create-order", {
    courseId,
    amount,
  });
  return res.data;
};

// ✅ VERIFY PAYMENT
export const verifyPayment = async (data: unknown) => {
  const res = await apiClient.post("/payments/verify", data);
  return res.data;
};