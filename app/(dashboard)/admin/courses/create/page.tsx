"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";

export default function CreateCoursePage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-IN");
  };

  // ✅ UPDATED VALIDATION
 const validationSchema = Yup.object({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Description is required"),

  price: Yup.number().when("isFree", {
    is: false,
    then: (schema) =>
      schema
        .typeError("Price must be a number")
        .min(1, "Price must be greater than 0")
        .required("Price is required"),
    otherwise: () => Yup.number().notRequired(), // ✅ FIX
  }),

  discountPrice: Yup.number().when("isFree", {
    is: false,
    then: (schema) =>
      schema
        .min(0, "Invalid discount price")
        .test(
          "less-than-price",
          "Discount must be less than price",
          function (value) {
            return !value || value < this.parent.price;
          }
        ),
    otherwise: () => Yup.number().notRequired(), // ✅ FIX
  }),

  thumbnail: Yup.mixed<File>().nullable(),
});

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      discountPrice: 0,
      isFree: false, // ✅ NEW
      thumbnail: null as File | null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("isFree", String(values.isFree)); // ✅ NEW

        // ✅ Only send price if paid
        if (!values.isFree) {
          formData.append("price", String(values.price));
          formData.append("discountPrice", String(values.discountPrice));

          if (
            values.discountPrice > 0 &&
            values.discountPrice >= values.price
          ) {
            toast.error("Discount price must be less than original price");
            setSubmitting(false);
            return;
          }
        }

        if (values.thumbnail) {
          formData.append("thumbnail", values.thumbnail);
        }

        await apiClient.post("/courses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Course created successfully ✅");

        resetForm();
        setPreview(null);
        router.push("/admin/courses");
      } catch (error) {
        console.error(error);
        toast.error("Failed to create course ❌");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFile = (file: File) => {
    formik.setFieldValue("thumbnail", file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const removeImage = () => {
    formik.setFieldValue("thumbnail", null);
    setPreview(null);
  };

  return (
    <div className="p-6">
      <Card className="max-w-xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-bold">Create Course</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* TITLE */}
            <Input
              name="title"
              placeholder="Course Title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Course Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full border rounded-md p-2 text-sm"
            />

            {/* 🔥 FREE / PAID TOGGLE */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Course Type:</label>

              <select
                value={formik.values.isFree ? "free" : "paid"}
                onChange={(e) => {
                  const isFree = e.target.value === "free";
                  formik.setFieldValue("isFree", isFree);

                  if (isFree) {
                    formik.setFieldValue("price", 0);
                    formik.setFieldValue("discountPrice", 0);
                  }
                }}
                className="border rounded px-2 py-1"
              >
                <option value="paid">Paid</option>
                <option value="free">Free</option>
              </select>
            </div>
            {formik.errors.price && (
  <p className="text-red-500 text-sm">{formik.errors.price}</p>
)}

            {/* PRICE (ONLY IF PAID) */}
            {!formik.values.isFree && (
              <>
                <Input
                  name="price"
                  type="number"
                  placeholder="Course Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />

                <Input
                  placeholder="Discount Price"
                  value={
                    formik.values.discountPrice
                      ? `₹ ${formatCurrency(formik.values.discountPrice)}`
                      : ""
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    formik.setFieldValue("discountPrice", Number(raw));
                  }}
                />

                {formik.values.price > 0 &&
                  formik.values.discountPrice > 0 && (
                    <p className="text-green-600 text-sm">
                      {Math.round(
                        ((formik.values.price -
                          formik.values.discountPrice) /
                          formik.values.price) *
                          100
                      )}
                      % OFF
                    </p>
                  )}
              </>
            )}

            {/* IMAGE UPLOAD */}
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
            >
              <p className="text-sm text-muted-foreground">
                Drag & drop image here or click to upload
              </p>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </div>

            {/* PREVIEW */}
            {preview && (
              <div className="relative">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-40 object-cover rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full">
              {formik.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}