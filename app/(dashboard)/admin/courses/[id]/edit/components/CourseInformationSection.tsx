import { FormikProps } from "formik";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { EditCourseFormValues } from "../types/course.type";

interface CourseInformationSectionProps {
  formik: FormikProps<EditCourseFormValues>;
}

const CourseInformationSection = ({
  formik,
}: CourseInformationSectionProps) => {
  return (
    <div className="space-y-6 rounded-xl border bg-background p-6">
      <div>
        <h2 className="text-lg font-semibold">Course Information</h2>

        <p className="text-sm text-muted-foreground">
          Update the basic information for this course.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          Course Title
          <span className="ml-1 text-destructive">*</span>
        </Label>

        <Input
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter course title"
          className={
            formik.touched.title && formik.errors.title
              ? "border-destructive"
              : ""
          }
        />

        {formik.touched.title && formik.errors.title && (
          <p className="text-sm text-destructive">{formik.errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description
          <span className="ml-1 text-destructive">*</span>
        </Label>

        <Textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter course description"
          rows={5}
          className={
            formik.touched.description && formik.errors.description
              ? "border-destructive"
              : ""
          }
        />

        {formik.touched.description && formik.errors.description && (
          <p className="text-sm text-destructive">
            {formik.errors.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseInformationSection;
