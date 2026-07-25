"use client";

import { Calendar, FileText, IndianRupee, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Payment } from "../lib/payment.type";
import PaymentActions from "./PaymentActions";
import PaymentStatusBadge from "./PaymentStatusBadge";

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const [search, setSearch] = useState("");

  const filteredPayments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return payments;
    }

    return payments.filter((payment) =>
      payment.course.toLowerCase().includes(keyword),
    );
  }, [payments, search]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle>Transactions</CardTitle>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course..."
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        {filteredPayments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">No payments found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try searching with another course name.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>

                  <TableHead>Amount</TableHead>

                  <TableHead>Date</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead className="text-right">Invoice</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>
                      <div className="font-medium">{payment.course}</div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />

                        {payment.amount.toLocaleString("en-IN")}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />

                        {new Date(payment.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </TableCell>

                    <TableCell>
                      <PaymentStatusBadge status={payment.status} />
                    </TableCell>

                    <TableCell className="text-right">
                      <PaymentActions invoiceUrl={payment.invoiceUrl} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
