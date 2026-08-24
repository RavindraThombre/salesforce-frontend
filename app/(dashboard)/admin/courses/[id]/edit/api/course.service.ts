import { apiClient } from "@/app/lib/axiosConfig";

import { Course, EditCourseFormValues } from "../types/course.type";

export const getCourseById = async (courseId: string): Promise<Course> => {
  try {
    const response = await apiClient.get<Course>(`/courses/${courseId}`);

    return response.data;
  } catch (error) {
    console.error("Get course by ID error:", error);

    throw error;
  }
};

export const updateCourse = async (
  courseId: string,
  values: EditCourseFormValues,
): Promise<Course> => {
  try {
    const formData = new FormData();
    formData.append("title", values.title.trim());
    formData.append("description", values.description.trim());
    formData.append("level", values.level);
    formData.append("totalLiveSessions", String(values.totalLiveSessions));
    formData.append("isFree", String(values.isFree));

    if (!values.isFree) {
      formData.append("price", String(values.price));

      formData.append("discountPrice", String(values.discountPrice));
    } else {
      formData.append("price", "0");

      formData.append("discountPrice", "0");
    }

    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    }

    const response = await apiClient.put<Course>(
      `/courses/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Update course error:", error);

    throw error;
  }
};
