"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import AdminDataTable from "../../components/admin-table/AdminDataTable";
import { Contact, ContactStatus } from "../lib/contact.type";
import ContactActions from "./ContactActions";

interface ContactsTableProps {
  contacts: Contact[];
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onReply: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactsTable({
  contacts,
  loading,
  search,
  onSearchChange,
  onReply,
  onDelete,
}: ContactsTableProps) {
  const columns = useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.original.email}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => (
          <div className="max-w-md truncate">{row.original.message}</div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === ContactStatus.REPLIED
                ? "default"
                : "secondary"
            }
          >
            {row.original.status === ContactStatus.REPLIED
              ? "Replied"
              : "Pending"}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Received",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <ContactActions
            contact={row.original}
            onReply={onReply}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onReply, onDelete],
  );

  return (
    <AdminDataTable
      data={contacts}
      columns={columns}
      loading={loading}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search contacts..."
      emptyMessage="No contact messages found."
    />
  );
}
