"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import { Contact } from "../lib/contact.type";
import {
  deleteContact,
  getContacts,
  replyContact,
} from "../lib/contactService";

export default function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleReply = useCallback(
    async (id: string, reply: string) => {
      try {
        await replyContact(id, reply);

        toast.success("Reply sent successfully.");

        await fetchContacts();
      } catch (error) {
        console.error(error);
        toast.error("Failed to send reply.");
      }
    },
    [fetchContacts],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure you want to delete this contact?")) {
        return;
      }

      try {
        await deleteContact(id);

        toast.success("Contact deleted successfully.");

        await fetchContacts();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete contact.");
      }
    },
    [fetchContacts],
  );

  const filteredContacts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return contacts;
    }

    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.message, contact.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [contacts, search]);

  return {
    contacts,
    filteredContacts,
    loading,

    search,
    setSearch,

    fetchContacts,
    replyContact: handleReply,
    deleteContact: handleDelete,
  };
}
