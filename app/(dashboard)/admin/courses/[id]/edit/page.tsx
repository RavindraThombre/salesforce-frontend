"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-IN");
  };

  // ✅ UPDATED VALIDATION (FREE SAFE)
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
      otherwise: () => Yup.number().notRequired(),
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
            },
          ),
      otherwise: () => Yup.number().notRequired(),
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
    enableReinitialize: true,
    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("isFree", String(values.isFree)); // ✅ NEW

        // ✅ only send price if paid
        if (!values.isFree) {
          formData.append("price", String(values.price));
          formData.append("discountPrice", String(values.discountPrice));

          if (
            values.discountPrice > 0 &&
            values.discountPrice >= values.price
          ) {
            toast.error("Discount must be less than price");
            setSubmitting(false);
            return;
          }
        }

        if (values.thumbnail) {
          formData.append("thumbnail", values.thumbnail);
        }

        await apiClient.put(`/courses/${params.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Course updated successfully ✅");
        router.push("/admin/courses");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update course ❌");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ✅ FETCH COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await apiClient.get(`/courses/${params.id}`);

        formik.setValues({
          title: res.data.title || "",
          description: res.data.description || "",
          price: res.data.price ?? 0,
          discountPrice: res.data.discountPrice ?? 0,
          isFree: res.data.price === 0, // ✅ detect FREE
          thumbnail: null,
        });

        if (res.data.thumbnail) {
          setPreview(res.data.thumbnail);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load course");
      }
    };

    if (params.id) fetchCourse();
  }, [params.id]);

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
          <h1 className="text-xl font-bold">
            Edit Course ({formik.values.title || "Loading..."})
          </h1>

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

            {/* 🔥 FREE / PAID */}
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

            {/* PRICE (ONLY IF PAID) */}
            {!formik.values.isFree && (
              <>
                <Input
                  name="price"
                  placeholder="Course Price"
                  value={
                    formik.values.price
                      ? `₹ ${formatCurrency(formik.values.price)}`
                      : ""
                  }
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    formik.setFieldValue("price", Number(raw));
                  }}
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

                {formik.values.price > 0 && formik.values.discountPrice > 0 && (
                  <p className="text-green-600 text-sm">
                    {Math.round(
                      ((formik.values.price - formik.values.discountPrice) /
                        formik.values.price) *
                        100,
                    )}
                    % OFF
                  </p>
                )}
              </>
            )}

            {/* IMAGE */}
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Upload course image
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

            {preview && (
              <div className="relative">
                <img
                  src={preview}
                  className="w-full h-40 object-cover rounded"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
            )}

            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full"
            >
              {formik.isSubmitting ? "Updating..." : "Update Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
