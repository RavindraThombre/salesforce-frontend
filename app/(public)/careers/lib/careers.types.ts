export interface CareerJob {
  _id: string;

  title: string;
  slug: string;
  banner: string;

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

  status: "Published";

  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareersFilter {
  search: string;
  department: string;
  employmentType: string;
}
