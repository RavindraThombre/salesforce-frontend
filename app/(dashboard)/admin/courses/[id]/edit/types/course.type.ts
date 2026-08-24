export interface Course {
  _id: string;
  title: string;
  description: string;
  isFree: boolean;
  price: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  discountPrice: number;
  totalLiveSessions: number;
  totalScheduledSessions?: number;
  liveClasses?: string[];
  thumbnail?: string;
  thumbnailPublicId?: string;
}

export interface EditCourseFormValues {
  title: string;
  description: string;
  totalLiveSessions: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  discountPrice: number;
  isFree: boolean;
  thumbnail: File | null;
}

export const editCourseInitialValues: EditCourseFormValues = {
  title: "",
  description: "",
  totalLiveSessions: 0,
  level: "Beginner",
  price: 0,
  discountPrice: 0,
  isFree: false,
  thumbnail: null,
};
