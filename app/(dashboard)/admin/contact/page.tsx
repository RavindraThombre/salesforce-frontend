"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/app/lib/axiosConfig";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
    status: "pending" | "replied";
    reply?: string;
    tempReply?: string; // for storing reply before sending
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await apiClient.get("/contacts");
      setContacts(res.data);
    };

    fetchContacts();
  }, []);

  const handleReply = async (id: string, reply: string) => {
  try {
    await apiClient.put(`/contact/${id}/reply`, { reply });
    toast.success("Reply sent ✅");
    // await fetchContacts();
  } catch {
    toast.error("Failed to send reply ❌");
  }
};

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Contact Messages</h1>

      {contacts.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div className="space-y-4">
         {contacts.map((c) => (
  <Card key={c._id}>
    <CardContent className="p-4 space-y-3">

      <div className="flex justify-between">
        <h3 className="font-semibold">{c.name}</h3>

        <span className="text-xs">
          {c.status}
        </span>
      </div>

      <p className="text-sm text-muted-foreground">
        {c.email}
      </p>

      <p>{c.message}</p>

      {/* SHOW REPLY */}
      {c.reply && (
        <div className="bg-muted p-2 rounded text-sm">
          <strong>Reply:</strong> {c.reply}
        </div>
      )}

      {/* REPLY BOX */}
      {!c.reply && (
        <div className="space-y-2">
          <Textarea
            placeholder="Write reply..."
            onChange={(e) =>
              (c.tempReply = e.target.value)
            }
          />

          <Button
            size="sm"
            onClick={() =>
              handleReply(c._id, c.tempReply || "")
            }
          >
            Send Reply
          </Button>
        </div>
      )}

    </CardContent>
  </Card>
))}
        </div>
      )}
    </div>
  );
}