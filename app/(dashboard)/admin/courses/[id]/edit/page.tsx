"use client";

import { useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Formik, FormikHelpers } from "formik";
import { toast } from "sonner";

import { getCourseById, updateCourse } from "./api/course.service";

import { EditCourseForm } from "./components/EditCourseForm";

import {
  Course,
  EditCourseFormValues,
  editCourseInitialValues,
} from "./types/course.type";
import { getEditCourseValidationSchema } from "./validation/editCourseValidation";
import SalesforceLoader from "@/app/components/common/SalesforceLoader";
import { Button } from "@/components/ui/button";

export default function EditCoursePage() {
  const params = useParams();

  const router = useRouter();

  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [totalScheduledSessions, setTotalScheduledSessions] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response = await getCourseById(courseId);

        setCourse(response);

        setTotalScheduledSessions(
          response.totalScheduledSessions ?? response.liveClasses?.length ?? 0,
        );
      } catch (error) {
        console.error("Failed to load course:", error);

        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const initialValues = useMemo<EditCourseFormValues>(
    () => ({
      ...editCourseInitialValues,

      ...(course
        ? {
            title: course.title,
            description: course.description,
            level: course.level,
            totalLiveSessions: course.totalLiveSessions,
            isFree: course.isFree,
            price: course.price,
            discountPrice: course.discountPrice,
          }
        : {}),
    }),
    [course],
  );

  const handleSave = async (
    values: EditCourseFormValues,
    formikHelpers: FormikHelpers<EditCourseFormValues>,
  ) => {
    try {
      setSaving(true);
      const updatedCourse = await updateCourse(courseId, values);
      setCourse(updatedCourse);
      setTotalScheduledSessions(
        updatedCourse.totalScheduledSessions ??
          updatedCourse.liveClasses?.length ??
          0,
      );

      formikHelpers.resetForm({
        values: {
          title: updatedCourse.title || "",
          description: updatedCourse.description || "",
          level: updatedCourse.level || "Beginner",
          totalLiveSessions: updatedCourse.totalLiveSessions || 1,
          isFree: updatedCourse.isFree ?? false,
          price: updatedCourse.price || 0,
          discountPrice: updatedCourse.discountPrice || 0,
          thumbnail: null,
        },
      });

      toast.success("Course updated successfully");
      router.push("/admin/courses");
    } catch (error) {
      console.error("Update course error:", error);

      toast.error("Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <SalesforceLoader />;
  }

  if (!course) {
    return <div className="p-6">Course not found</div>;
  }

  return (
    <div className="bg-muted/30">
      <Formik<EditCourseFormValues>
        initialValues={initialValues}
        enableReinitialize
        validationSchema={getEditCourseValidationSchema(totalScheduledSessions)}
        onSubmit={handleSave}
      >
        {(formik) => (
          <>
            <EditCourseForm
              formik={formik}
              totalScheduledSessions={totalScheduledSessions}
              currentThumbnail={course.thumbnail}
            />

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  formik.resetForm();
                  router.back();
                }}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={() => formik.handleSubmit()}
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Course"}
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
