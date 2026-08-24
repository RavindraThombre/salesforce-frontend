import { Form, FormikProps } from "formik";

import { EditCourseFormValues } from "../types/course.type";

import CourseInformationSection from "./CourseInformationSection";
import CourseThumbnailSection from "./CourseThumbnailSection";
import { LiveSessionsSection } from "./LiveSessionsSection";
import PricingSection from "./PricingSection";

interface EditCourseFormProps {
  formik: FormikProps<EditCourseFormValues>;
  totalScheduledSessions: number;
  currentThumbnail?: string;
}

export function EditCourseForm({
  formik,
  totalScheduledSessions,
  currentThumbnail,
}: EditCourseFormProps) {
  return (
    <Form className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <CourseInformationSection formik={formik} />

          <LiveSessionsSection
            formik={formik}
            totalScheduledSessions={totalScheduledSessions}
          />

          <PricingSection formik={formik} />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <CourseThumbnailSection
            formik={formik}
            currentThumbnail={currentThumbnail}
          />
        </div>
      </div>
    </Form>
  );
}
