"use client";

import { useEffect, useMemo, useRef } from "react";

import { FormikProps } from "formik";
import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { EditCourseFormValues } from "../types/course.type";

interface CourseThumbnailSectionProps {
  formik: FormikProps<EditCourseFormValues>;
  currentThumbnail?: string;
}

const CourseThumbnailSection = ({
  formik,
  currentThumbnail,
}: CourseThumbnailSectionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const thumbnail = formik.values.thumbnail;

  const objectUrl = useMemo(() => {
    if (!thumbnail) {
      return null;
    }

    return URL.createObjectURL(thumbnail);
  }, [thumbnail]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const preview = objectUrl || currentThumbnail || "";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    formik.setFieldValue("thumbnail", file);

    formik.setFieldTouched("thumbnail", true);
  };

  const handleRemove = () => {
    formik.setFieldValue("thumbnail", null);

    formik.setFieldTouched("thumbnail", true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 rounded-xl border bg-background p-6">
      <div>
        <h2 className="text-lg font-semibold">Course Thumbnail</h2>

        <p className="text-sm text-muted-foreground">
          Upload an image representing this course.
        </p>
      </div>

      {preview ? (
        <div className="relative overflow-hidden rounded-xl border">
          <img
            src={preview}
            alt="Course thumbnail"
            className="aspect-video w-full object-cover"
          />

          {formik.values.thumbnail && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute right-3 top-3"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <label
          htmlFor="thumbnail"
          className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 transition-colors hover:bg-muted/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ImagePlus className="h-6 w-6" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium">Upload course thumbnail</p>

            <p className="text-xs text-muted-foreground">PNG, JPG or WEBP</p>
          </div>
        </label>
      )}

      <div className="space-y-2">
        <Label htmlFor="thumbnail">
          {preview ? "Change Thumbnail" : "Select Thumbnail"}
        </Label>

        <input
          ref={inputRef}
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="block w-full text-sm"
        />

        {formik.touched.thumbnail && formik.errors.thumbnail && (
          <p className="text-sm text-destructive">
            {String(formik.errors.thumbnail)}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseThumbnailSection;
