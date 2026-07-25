"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import axios from "axios";

import { Contact, ContactStatus } from "../lib/contact.type";
import { replyContact } from "../lib/contactService";

interface ReplyContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onSuccess: () => void;
}

export default function ReplyContactDialog({
  open,
  onOpenChange,
  contact,
  onSuccess,
}: ReplyContactDialogProps) {
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(() => {
    if (!open) return;

    setReply(contact?.reply ?? "");
  }, [open, contact]);

  const handleSend = async () => {
    if (!contact) return;

    if (!reply.trim()) {
      toast.error("Reply is required");
      return;
    }

    try {
      setLoading(true);

      await replyContact(contact._id, reply);

      toast.success("Reply sent successfully");

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to send reply");
      } else {
        toast.error("Failed to send reply");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!contact) return null;

  const isReplied = contact.status === ContactStatus.REPLIED;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isReplied ? "View Contact Reply" : "Reply to Contact"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-muted-foreground text-xs uppercase">
                Name
              </Label>

              <p className="mt-1 font-medium">{contact.name}</p>
            </div>

            <div>
              <Label className="text-muted-foreground text-xs uppercase">
                Email
              </Label>

              <p className="mt-1 font-medium break-all">{contact.email}</p>
            </div>

            <div>
              <Label className="text-muted-foreground text-xs uppercase">
                Status
              </Label>

              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    isReplied
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isReplied ? "Replied" : "Pending"}
                </span>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-xs uppercase">
                Received
              </Label>

              <p className="mt-1 font-medium">
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label className="mb-2 block">Message</Label>

            <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-7 whitespace-pre-wrap">
              {contact.message}
            </div>
          </div>

          {/* Reply */}
          <div>
            <Label className="mb-2 block">
              {isReplied ? "Reply Sent" : "Reply"}
            </Label>

            <Textarea
              rows={7}
              value={reply}
              disabled={isReplied}
              placeholder="Write your reply here..."
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          {!isReplied && (
            <Button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send Reply"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
