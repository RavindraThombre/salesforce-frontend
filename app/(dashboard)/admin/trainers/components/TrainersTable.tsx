import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Trainer } from "../hooks/useTrainers";
import AdminDataTable from "../../components/admin-table/AdminDataTable";
import { ColumnDef } from "@tanstack/react-table";
import TrainerActions from "./TrainerActions";

interface TrainersTableProps {
  trainers: Trainer[];
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onDelete: (id: string) => void;
  onEdit: (trainer: Trainer) => void;
}

export default function TrainersTable({
  trainers,
  loading,
  search,
  onSearchChange,
  onDelete,
  onEdit,
}: TrainersTableProps) {
  const columns = useMemo<ColumnDef<Trainer>[]>(
    () => [
      {
        accessorKey: "trainer",
        header: "Trainer",
        cell: ({ row }) => {
          const trainer = row.original;

          return (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {trainer.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{trainer.name}</div>

                <div className="text-xs text-muted-foreground">
                  #{trainer._id.slice(-6)}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.role}</Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <TrainerActions
            trainer={row.original}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <AdminDataTable
      data={trainers}
      columns={columns}
      loading={loading}
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search trainers..."
      emptyMessage="No trainers found."
    />
  );
}
