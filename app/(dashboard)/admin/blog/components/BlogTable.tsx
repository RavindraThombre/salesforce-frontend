"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Blog } from "../lib/types";
import { AdminDataTable } from "../../components/admin-table";
import BlogActions from "./BlogActions";

interface BlogTableProps {
  blogs: Blog[];
  loading: boolean;
  onDelete(id: string): void;
}

export default function BlogTable({
  blogs,
  loading,
  onDelete,
}: BlogTableProps) {
  const columns = useMemo<ColumnDef<Blog>[]>(
    () => [
      {
        accessorKey: "image",
        header: "Cover",
        enableSorting: false,

        cell: ({ row }) => {
          const blog = row.original;

          if (!blog.image) {
            return (
              <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-muted text-xs">
                No Image
              </div>
            );
          }

          return (
            <Image
              src={blog.image}
              alt={blog.title}
              width={80}
              height={56}
              className="h-14 w-20 rounded-lg object-cover"
            />
          );
        },
      },

      {
        accessorKey: "title",
        header: "Title",

        cell: ({ row }) => (
          <div className="max-w-md">
            <p className="font-medium line-clamp-2">{row.original.title}</p>
          </div>
        ),
      },

      {
        accessorKey: "createdAt",
        header: "Published",

        cell: ({ row }) => (
          <Badge variant="secondary">
            {new Date(row.original.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Badge>
        ),
      },

      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <BlogActions blog={row.original} onDelete={onDelete} />
          </div>
        ),
      },
    ],
    [onDelete],
  );

  return (
    <AdminDataTable
      columns={columns}
      data={blogs}
      loading={loading}
      pageSize={10}
      searchPlaceholder="Search blogs..."
      emptyMessage="No blogs found."
    />
  );
}
