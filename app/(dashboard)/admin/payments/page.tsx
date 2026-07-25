"use client";

import { useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  IndianRupee,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";
import AdminDataTable from "../components/admin-table/AdminDataTable";

// Update this import path based on your project

type Payment = {
  _id: string;
  student: string;
  email: string;
  course: string;
  amount: number;
  status: "Paid" | "Pending";
  date: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get("/admin/payments", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      setVerifyingId(id);

      await apiClient.put(`/admin/payments/${id}`, {
        status: "completed",
      });

      await fetchPayments();
    } catch (error) {
      console.error("Verify error:", error);
    } finally {
      setVerifyingId(null);
    }
  };

  const totalRevenue = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const paidCount = useMemo(() => {
    return payments.filter((payment) => payment.status === "Paid").length;
  }, [payments]);

  const pendingCount = useMemo(() => {
    return payments.filter((payment) => payment.status === "Pending").length;
  }, [payments]);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns = useMemo<ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: "student",
        header: "Student",
        cell: ({ row }) => {
          const payment = row.original;

          return (
            <div className="min-w-[180px]">
              <p className="font-semibold text-foreground">{payment.student}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                {payment.email}
              </p>
            </div>
          );
        },
      },
      {
        accessorKey: "course",
        header: "Course",
        cell: ({ row }) => (
          <div className="max-w-[300px] min-w-[200px]">
            <p className="font-medium text-foreground">{row.original.course}</p>
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Payment Date",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-muted-foreground">
            {formatDate(row.original.date)}
          </span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="whitespace-nowrap font-semibold text-foreground">
            ₹{formatAmount(row.original.amount)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <PaymentStatus status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => {
          const payment = row.original;
          const isVerifying = verifyingId === payment._id;

          if (payment.status === "Paid") {
            return (
              <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Verified
              </div>
            );
          }

          return (
            <Button
              size="sm"
              onClick={() => handleVerify(payment._id)}
              disabled={isVerifying}
              className="min-w-[130px]"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify Payment
                </>
              )}
            </Button>
          );
        },
      },
    ],
    [verifyingId, handleVerify],
  );

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Payments
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and verify student course payments.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value={`₹${formatAmount(totalRevenue)}`}
          subtitle="Completed payments"
          icon={<IndianRupee className="h-5 w-5" />}
        />

        <SummaryCard
          title="Total Payments"
          value={payments.length.toString()}
          subtitle="All transactions"
          icon={<CreditCard className="h-5 w-5" />}
        />

        <SummaryCard
          title="Paid"
          value={paidCount.toString()}
          subtitle="Successful payments"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />

        <SummaryCard
          title="Pending"
          value={pendingCount.toString()}
          subtitle="Awaiting verification"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* Payments Table */}
      <AdminDataTable
        columns={columns}
        data={payments}
        loading={loading}
        searchable
        searchPlaceholder="Search student, email or course..."
        pageSize={10}
        emptyMessage="No payments found."
        onRefresh={fetchPayments}
      />
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentStatus({ status }: { status: Payment["status"] }) {
  const isPaid = status === "Paid";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPaid ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />

      {status}
    </span>
  );
}
