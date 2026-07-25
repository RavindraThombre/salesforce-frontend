import { apiClient } from "@/app/lib/axiosConfig";

// ✅ Get all contact messages
export const getContacts = async () => {
  const res = await apiClient.get("/contacts");
  return res.data;
};

// ✅ Reply to contact
export const replyContact = async (id: string, reply: string) => {
  const res = await apiClient.put(`/contacts/${id}/reply`, {
    reply,
  });

  return res.data;
};

// ✅ Delete contact
export const deleteContact = async (id: string) => {
  const res = await apiClient.delete(`/contacts/${id}`);

  return res.data;
};
