export interface JobPosition {
  _id: string;
  title: string;
  slug: string;
  banner: string;
  department: string;
  employmentType: string;
  location: string;

  experience:
    | {
        min: number;
        max: number;
      }
    | string;

  salary:
    | {
        min: number;
        max: number;
      }
    | string;

  openings: number;

  skills: string[] | string;

  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;

  status: "Draft" | "Published" | "Closed";

  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateJobStatusPayload {
  status: "Draft" | "Published" | "Closed";
}

export interface JobPositionFormValues {
  title: string;
  department: string;
  employmentType: string;
  location: string;

  experience: {
    min: number;
    max: number;
  };

  salary: {
    min: number;
    max: number;
  };

  openings: number;

  skills: string[];

  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;

  status: "Draft" | "Published" | "Closed";
}

export const DEFAULT_JOB_POSITION_FORM: JobPositionFormValues = {
  title: "",
  department: "",
  employmentType: "",
  location: "",
  experience: {
    min: 0,
    max: 0,
  },
  salary: {
    min: 0,
    max: 0,
  },
  openings: 1,
  skills: [],
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  status: "Draft",
};
