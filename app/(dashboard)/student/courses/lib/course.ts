import { apiClient } from "@/app/lib/axiosConfig";

// TYPES
export interface Course {
  _id: string;
  title: string;
  price: number;
  enrolledAt: string;
}

export interface LiveClass {
  _id: string;
  topic: string;
  date: string;
  time: string;
  zoomLink: string;
}

export interface CourseDetail {
  _id: string;
  title: string;
  liveClasses: LiveClass[];
  recordings: {
    _id: string;
    topic: string;
    videoUrl: string;
  }[];
}

// API CALLS
export const getMyCourses = async (): Promise<Course[]> => {
  const res = await apiClient.get("/student/my-courses");
  return res.data;
};

export const getCourseDetail = async (
  courseId: string
): Promise<CourseDetail> => {
  const res = await apiClient.get(`/student/course/${courseId}`);
  return res.data;
};