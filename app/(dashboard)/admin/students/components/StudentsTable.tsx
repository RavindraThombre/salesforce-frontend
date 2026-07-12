"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AdminDataTable, TableActionMenu } from "../../components/admin-table";
import { useRouter } from "next/navigation";

export type Student = {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  city: string;
  status: "Active" | "Inactive";
};

type Props = {
  students: Student[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => void;
};

export default function StudentsTable({
  students,
  loading,
  onRefresh,
  onDelete,
}: Props) {
  const router = useRouter();
  const columns: ColumnDef<Student>[] = [
    {
      id: "student",
      header: "Student",
      cell: ({ row }) => {
        const student = row.original;
        const initials = student.userId.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .substring(0, 2)
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              {initials}
            </div>

            {/* Name */}
            <div>
              <p className="font-medium">{student.userId.name}</p>
              <p className="text-sm text-muted-foreground">
                {student.userId.email}
              </p>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{row.original.city || "-"}</span>
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const active = row.original.status === "Active";
        return (
          <Badge
            className={
              active
                ? "border-green-200 bg-green-100 text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                : "border-red-200 bg-red-100 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
            }
          >
            <span
              className={`mr-2 h-2 w-2 rounded-full ${
                active ? "bg-green-500" : "bg-red-500"
              }`}
            />

            {row.original.status}
          </Badge>
        );
      },
    },

    // ================= ACTIONS =================
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <TableActionMenu
          items={[
            {
              label: "View Profile",
              icon: <Eye className="h-4 w-4" />,
              onClick: () => {
                router.push(`/admin/students/${row.original._id}`);
              },
            },

            {
              label: "Delete Student",
              icon: <Trash2 className="h-4 w-4" />,
              destructive: true,
              onClick: () => onDelete(row.original._id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AdminDataTable<Student>
      columns={columns}
      data={students}
      loading={loading}
      searchPlaceholder="Search students by name or email..."
      emptyMessage="No students found."
      onRefresh={onRefresh}
    />
  );
}
