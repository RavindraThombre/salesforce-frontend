"use client";

import useJobPosition from "./hooks/useJobPosition";

import RecruitmentHeader from "./components/RecruitmentHeader";
import JobPositionTable from "./components/JobPositionTable";
import JobPositionDialog from "./components/JobPositionDialog";
import DeleteJobDialog from "./components/DeleteJobDialog";

export default function RecruitmentPage() {
  const recruitment = useJobPosition();

  return (
    <>
      <RecruitmentHeader onCreate={recruitment.handleCreate} />

      <JobPositionTable
        loading={recruitment.loading}
        jobs={recruitment.jobs}
        onEdit={recruitment.handleEdit}
        onDelete={recruitment.handleDeleteClick}
        // onStatusChange={recruitment.handleStatusChange}
      />

      <JobPositionDialog
        open={recruitment.openDialog}
        job={recruitment.selectedJob}
        onClose={recruitment.closeDialog}
        onSuccess={recruitment.fetchJobs}
      />

      <DeleteJobDialog
        open={recruitment.deleteDialogOpen}
        job={recruitment.selectedJob}
        onClose={recruitment.closeDeleteDialog}
        onDelete={recruitment.handleDelete}
      />
    </>
  );
}
