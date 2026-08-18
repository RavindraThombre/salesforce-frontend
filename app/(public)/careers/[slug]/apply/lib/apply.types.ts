export interface SubmitJobApplicationPayload {
  jobId: string;
  phone: string;
  coverLetter: string;
  resume: File;
}

export interface JobApplication {
  _id: string;

  applicant: string;

  job: string;

  fullName: string;
  email: string;
  phone: string;

  resume: {
    url: string;
    fileName: string;
  };

  coverLetter: string;

  status:
    | "Applied"
    | "Shortlisted"
    | "Interview Scheduled"
    | "Selected"
    | "Rejected";

  appliedAt: string;

  createdAt: string;
}
