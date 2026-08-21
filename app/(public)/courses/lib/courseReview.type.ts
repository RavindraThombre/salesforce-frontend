export interface CourseReviewStudent {
  _id: string;
  name: string;
  avatar?: string;
}

export interface CourseReview {
  _id: string;
  course: string;
  student: CourseReviewStudent | string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitCourseReviewPayload {
  courseId: string;
  rating: number;
  review: string;
}

export interface CourseRatingSummary {
  averageRating: number;
  totalReviews: number;
}

export interface SubmitCourseReviewResponse {
  message: string;
  review: CourseReview;
  rating: CourseRatingSummary;
}
