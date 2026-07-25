"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import AdminDataTable from "../../components/admin-table/AdminDataTable";
import RatingStars from "./RatingStars";
import TestimonialActions from "./TestimonialActions";

export interface Testimonial {
  _id: string;
  name: string;
  review: string;
  rating: number;
}

interface TestimonialsTableProps {
  testimonials: Testimonial[];
  loading?: boolean;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
}

export default function TestimonialsTable({
  testimonials,
  loading,
  onEdit,
  onDelete,
}: TestimonialsTableProps) {
  const columns = useMemo<ColumnDef<Testimonial>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Student",
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <RatingStars rating={row.original.rating} />,
      },
      {
        accessorKey: "review",
        header: "Review",
        cell: ({ row }) => (
          <p className="max-w-md truncate text-muted-foreground">
            {row.original.review}
          </p>
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <TestimonialActions
            testimonial={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <AdminDataTable
      columns={columns}
      data={testimonials}
      loading={loading}
      searchPlaceholder="Search testimonials..."
      emptyMessage="No testimonials found."
    />
  );
}
