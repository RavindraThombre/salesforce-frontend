export type ApplicationStatus =
  | "Applied"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Selected"
  | "Rejected";

export interface MyApplicationJob {
  _id: string;
  title: string;
  slug: string;
  banner: string;
  department: string;
  employmentType: string;
  location: string;
  status: string;
}

export interface MyApplication {
  _id: string;
  job: MyApplicationJob | null;
  fullName: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}
