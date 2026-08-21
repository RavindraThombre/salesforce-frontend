import { apiClient } from "@/app/lib/axiosConfig";

import {
  CourseRatingSummary,
  CourseReview,
  SubmitCourseReviewPayload,
  SubmitCourseReviewResponse,
} from "../lib/courseReview.type";

export const getCourseReviews = async (
  courseId: string,
): Promise<CourseReview[]> => {
  const response = await apiClient.get(`/course-reviews/course/${courseId}`);

  return response.data;
};

export const getCourseRatingSummary = async (
  courseId: string,
): Promise<CourseRatingSummary> => {
  const response = await apiClient.get(
    `/course-reviews/course/${courseId}/summary`,
  );

  return response.data;
};

export const getMyCourseReview = async (
  courseId: string,
): Promise<CourseReview | null> => {
  const response = await apiClient.get(`/course-reviews/my/${courseId}`);

  return response.data;
};

export const submitCourseReview = async (
  payload: SubmitCourseReviewPayload,
): Promise<SubmitCourseReviewResponse> => {
  const response = await apiClient.post("/course-reviews", payload);

  return response.data;
};
