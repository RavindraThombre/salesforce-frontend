"use client";

import { useState } from "react";
import ContactHeader from "./components/ContactHeader";
import ContactStats from "./components/ContactStats";
import ContactsTable from "./components/ContactsTable";
import ReplyContactDialog from "./components/ReplyContactDialog";

import useContacts from "./hooks/useContacts";
import { Contact } from "./lib/contact.type";

export default function AdminContactsPage() {
  const contact = useContacts();

  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleReply = (contactData: Contact) => {
    setSelectedContact(contactData);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <ContactHeader />

      <ContactStats contacts={contact.contacts} />

      <ContactsTable
        contacts={contact.filteredContacts}
        loading={contact.loading}
        search={contact.search}
        onSearchChange={contact.setSearch}
        onReply={handleReply}
        onDelete={contact.deleteContact}
      />

      <ReplyContactDialog
        open={open}
        onOpenChange={setOpen}
        contact={selectedContact}
        onSuccess={contact.fetchContacts}
      />
    </div>
  );
}
