"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { JobPosition } from "../lib/recruitment.type";

interface DeleteJobDialogProps {
  open: boolean;
  job: JobPosition | null;
  loading?: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteJobDialog({
  open,
  job,
  loading = false,
  onClose,
  onDelete,
}: DeleteJobDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Job Position</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Are you sure you want to delete
        </Typography>

        <Typography mt={1} fontWeight={700}>
          {job?.title}
        </Typography>

        <Typography mt={2} variant="body2" color="error">
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
