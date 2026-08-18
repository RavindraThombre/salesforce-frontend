"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  deleteJobPosition,
  getJobPositions,
  updateJobStatus,
} from "../lib/recruitmentService";

import { JobPosition } from "../lib/recruitment.type";

export default function useJobPosition() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getJobPositions();
      setJobs(response);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load job positions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCreate = () => {
    setSelectedJob(null);
    setOpenDialog(true);
  };

  const handleEdit = (job: JobPosition) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleDeleteClick = (job: JobPosition) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      await deleteJobPosition(selectedJob._id);

      toast.success("Job deleted successfully.");

      fetchJobs();

      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete job.");
    }
  };

  const handleStatusChange = async (
    job: JobPosition,
    status: "Draft" | "Published" | "Closed",
  ) => {
    try {
      await updateJobStatus(job._id, {
        status,
      });

      toast.success("Status updated.");

      fetchJobs();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update status.");
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedJob(null);
  };

  return {
    loading,
    jobs,
    selectedJob,
    openDialog,
    deleteDialogOpen,
    fetchJobs,
    handleCreate,
    handleEdit,
    handleDeleteClick,
    handleDelete,
    handleStatusChange,
    closeDialog,
    closeDeleteDialog,
  };
}
