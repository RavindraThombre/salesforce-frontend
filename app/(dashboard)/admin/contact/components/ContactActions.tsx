"use client";

import { MoreHorizontal, MessageSquare, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Contact, ContactStatus } from "../lib/contact.type";

interface ContactActionsProps {
  contact: Contact;
  onReply: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactActions({
  contact,
  onReply,
  onDelete,
}: ContactActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onReply(contact)}>
          {contact.status === ContactStatus.REPLIED ? (
            <>
              <Eye className="mr-2 h-4 w-4" />
              View Reply
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Reply
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDelete(contact._id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
