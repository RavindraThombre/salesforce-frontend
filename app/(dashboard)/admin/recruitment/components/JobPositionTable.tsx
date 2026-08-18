"use client";

import { useMemo, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { JobPosition } from "../lib/recruitment.type";
import AdminDataTable from "../../components/admin-table/AdminDataTable";

interface JobPositionTableProps {
  loading: boolean;
  jobs: JobPosition[];

  onEdit: (job: JobPosition) => void;
  onDelete: (job: JobPosition) => void;
  //   onStatusChange: (
  //     job: JobPosition,
  //     status: "Draft" | "Published" | "Closed",
  //   ) => void;
}

export default function JobPositionTable({
  loading,
  jobs,
  onEdit,
  onDelete,
  //   onStatusChange,
}: JobPositionTableProps) {
  const columns = useMemo<ColumnDef<JobPosition>[]>(
    () => [
      {
        accessorKey: "banner",
        header: "Banner",
        cell: ({ row }) => (
          <Box
            component="img"
            src={row.original.banner}
            alt={row.original.title}
            sx={{
              width: 70,
              height: 45,
              borderRadius: 1,
              objectFit: "cover",
            }}
          />
        ),
      },

      {
        accessorKey: "title",
        header: "Position",
      },

      {
        accessorKey: "department",
        header: "Department",
      },

      {
        accessorKey: "employmentType",
        header: "Employment Type",
      },

      {
        id: "experience",
        header: "Experience",
        cell: ({ row }) => {
          const experience =
            typeof row.original.experience === "string"
              ? JSON.parse(row.original.experience)
              : row.original.experience;

          return `${experience.min} - ${experience.max} Years`;
        },
      },

      {
        accessorKey: "location",
        header: "Location",
      },

      {
        accessorKey: "openings",
        header: "Openings",
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <Chip
              label={status}
              color={
                status === "Published"
                  ? "success"
                  : status === "Closed"
                    ? "error"
                    : "default"
              }
              size="small"
            />
          );
        },
      },

      {
        id: "actions",
        header: "",
        enableSorting: false,

        cell: ({ row }) => (
          <ActionMenu job={row.original} onEdit={onEdit} onDelete={onDelete} />
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <AdminDataTable
      columns={columns}
      data={jobs}
      loading={loading}
      searchPlaceholder="Search job positions..."
      emptyMessage="No job positions found."
    />
  );
}

interface ActionMenuProps {
  job: JobPosition;

  onEdit: (job: JobPosition) => void;

  onDelete: (job: JobPosition) => void;
}

function ActionMenu({ job, onEdit, onDelete }: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onEdit(job);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onDelete(job);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>

          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
