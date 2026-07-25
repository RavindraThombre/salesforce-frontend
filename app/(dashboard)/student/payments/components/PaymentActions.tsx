"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaymentActionsProps {
  invoiceUrl?: string;
}

export default function PaymentActions({ invoiceUrl }: PaymentActionsProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={!invoiceUrl}
      onClick={() =>
        invoiceUrl && window.open(invoiceUrl, "_blank", "noopener,noreferrer")
      }
    >
      <Download className="mr-2 h-4 w-4" />
      Invoice
    </Button>
  );
}
