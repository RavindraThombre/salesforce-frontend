"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ArrowLeft,
  BookOpen,
  ImageIcon,
  IndianRupee,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";
import axios from "axios";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLocalPreview, setIsLocalPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Course title is required"),
    description: Yup.string().trim().required("Course description is required"),
    price: Yup.number().when("isFree", {
      is: false,
      then: (schema) =>
        schema
          .typeError("Price must be a number")
          .min(1, "Price must be greater than 0")
          .required("Price is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    discountPrice: Yup.number().when("isFree", {
      is: false,
      then: (schema) =>
        schema
          .typeError("Discount price must be a number")
          .min(0, "Discount price cannot be negative")
          .test(
            "not-more-than-price",
            "Discount price cannot be greater than original price",
            function (value) {
              if (value === undefined || value === null) {
                return true;
              }
              const price = Number(this.parent.price);
              return Number(value) <= price;
            },
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

    thumbnail: Yup.mixed<File>().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      discountPrice: 0,
      isFree: false,
      thumbnail: null as File | null,
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (
          !values.isFree &&
          values.discountPrice > 0 &&
          values.discountPrice > values.price
        ) {
          toast.error("Discount price cannot be greater than original price");
          return;
        }

        const formData = new FormData();

        formData.append("title", values.title.trim());
        formData.append("description", values.description.trim());

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

        await apiClient.put(`/courses/${params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Course updated successfully");

        router.push("/admin/courses");
      } catch (error: unknown) {
        console.error("Update course error:", error);

        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Failed to update course",
          );
        } else {
          toast.error("Failed to update course");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // FETCH COURSE
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const res = await apiClient.get(`/courses/${params.id}`);

        const course = res.data;

        formik.setValues({
          title: course.title || "",
          description: course.description || "",
          price: Number(course.price) || 0,
          discountPrice: Number(course.discountPrice) || 0,

          // Prefer actual isFree field.
          // Fallback to price for older courses.
          isFree:
            typeof course.isFree === "boolean"
              ? course.isFree
              : Number(course.price) === 0,

          thumbnail: null,
        });

        if (course.thumbnail) {
          setPreview(course.thumbnail);
          setIsLocalPreview(false);
        }
      } catch (error) {
        console.error("Fetch course error:", error);

        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  const handleFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG and WEBP images are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Revoke previous local object URL
    if (preview && isLocalPreview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);

    formik.setFieldValue("thumbnail", file);

    setPreview(url);
    setIsLocalPreview(true);
  };

  const removeImage = () => {
    if (preview && isLocalPreview) {
      URL.revokeObjectURL(preview);
    }

    formik.setFieldValue("thumbnail", null);

    setPreview(null);
    setIsLocalPreview(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const discountPercentage =
    !formik.values.isFree &&
    formik.values.price > 0 &&
    formik.values.discountPrice > 0 &&
    formik.values.discountPrice <= formik.values.price
      ? Math.round(
          ((formik.values.price - formik.values.discountPrice) /
            formik.values.price) *
            100,
        )
      : 0;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl p-1 sm:p-6 lg:p-1">
        {/* HEADER */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Edit Course
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Update course details, pricing and thumbnail information.
            </p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              {/* COURSE INFORMATION */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h2 className="font-semibold">Course Information</h2>

                      <p className="text-sm text-muted-foreground">
                        Update the basic information about your course.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* TITLE */}
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Course Title
                        <span className="ml-1 text-destructive">*</span>
                      </label>

                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Complete Core Java Course"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.title && formik.errors.title
                            ? "border-destructive"
                            : ""
                        }
                      />

                      {formik.touched.title && formik.errors.title && (
                        <p className="text-sm text-destructive">
                          {formik.errors.title}
                        </p>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        Description
                        <span className="ml-1 text-destructive">*</span>
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        rows={6}
                        placeholder="Describe what students will learn from this course..."
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`flex w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring ${
                          formik.touched.description &&
                          formik.errors.description
                            ? "border-destructive"
                            : "border-input"
                        }`}
                      />

                      <div className="flex justify-between">
                        <div>
                          {formik.touched.description &&
                            formik.errors.description && (
                              <p className="text-sm text-destructive">
                                {formik.errors.description}
                              </p>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {formik.values.description.length} characters
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PRICING */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <IndianRupee className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h2 className="font-semibold">Pricing</h2>

                      <p className="text-sm text-muted-foreground">
                        Update whether this course is paid or free.
                      </p>
                    </div>
                  </div>

                  {/* PAID / FREE */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("isFree", false);
                      }}
                      className={`rounded-lg border p-4 text-left transition-all ${
                        !formik.values.isFree
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="font-medium">Paid Course</div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        Students need to purchase this course
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("isFree", true);

                        formik.setFieldValue("price", 0);

                        formik.setFieldValue("discountPrice", 0);
                      }}
                      className={`rounded-lg border p-4 text-left transition-all ${
                        formik.values.isFree
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="font-medium">Free Course</div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        Students can access without payment
                      </div>
                    </button>
                  </div>

                  {/* PAID PRICING */}
                  {!formik.values.isFree && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* PRICE */}
                      <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium">
                          Original Price
                          <span className="ml-1 text-destructive">*</span>
                        </label>

                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id="price"
                            name="price"
                            type="number"
                            min={0}
                            placeholder="499"
                            value={
                              formik.values.price === 0
                                ? ""
                                : formik.values.price
                            }
                            onChange={(e) =>
                              formik.setFieldValue(
                                "price",
                                Number(e.target.value),
                              )
                            }
                            onBlur={formik.handleBlur}
                            className="pl-9"
                          />
                        </div>

                        {formik.touched.price && formik.errors.price && (
                          <p className="text-sm text-destructive">
                            {formik.errors.price}
                          </p>
                        )}
                      </div>

                      {/* DISCOUNT PRICE */}
                      <div className="space-y-2">
                        <label
                          htmlFor="discountPrice"
                          className="text-sm font-medium"
                        >
                          Discount Price
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            Optional
                          </span>
                        </label>

                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id="discountPrice"
                            name="discountPrice"
                            type="number"
                            min={0}
                            placeholder="399"
                            value={
                              formik.values.discountPrice === 0
                                ? ""
                                : formik.values.discountPrice
                            }
                            onChange={(e) =>
                              formik.setFieldValue(
                                "discountPrice",
                                Number(e.target.value),
                              )
                            }
                            onBlur={formik.handleBlur}
                            className="pl-9"
                          />
                        </div>

                        {formik.touched.discountPrice &&
                          formik.errors.discountPrice && (
                            <p className="text-sm text-destructive">
                              {formik.errors.discountPrice}
                            </p>
                          )}
                      </div>

                      {/* DISCOUNT SUMMARY */}
                      {discountPercentage > 0 && (
                        <div className="sm:col-span-2">
                          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                            <div>
                              <p className="text-sm font-medium">
                                Student pays ₹
                                {formik.values.discountPrice.toLocaleString(
                                  "en-IN",
                                )}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                Original price ₹
                                {formik.values.price.toLocaleString("en-IN")}
                              </p>
                            </div>

                            <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                              {discountPercentage}% OFF
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* FREE INFO */}
                  {formik.values.isFree && (
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm font-medium">
                        This course will be available for free.
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Students will not be required to make a payment to
                        access this course.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <Card className="lg:sticky lg:top-6">
                <CardContent className="p-6">
                  <div className="mb-5">
                    <h2 className="font-semibold">Course Thumbnail</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Update the image that represents your course.
                    </p>
                  </div>

                  {preview ? (
                    <div className="space-y-4">
                      <div className="group relative overflow-hidden rounded-lg border">
                        <img
                          src={preview}
                          alt="Course thumbnail preview"
                          className="aspect-video w-full object-cover"
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Change Image
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        PNG, JPG or WEBP · Max 5MB
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();

                        const file = e.dataTransfer.files?.[0];

                        if (file) {
                          handleFile(file);
                        }
                      }}
                      className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 p-6 text-center transition-colors hover:border-primary/50 hover:bg-muted/40"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <p className="text-sm font-medium">Click to upload</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        or drag and drop an image
                      </p>

                      <p className="mt-3 text-xs text-muted-foreground">
                        PNG, JPG or WEBP · Max 5MB
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];

                      if (file) {
                        handleFile(file);
                      }
                    }}
                  />

                  {/* ACTIONS */}
                  <div className="mt-6 space-y-3 border-t pt-6">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating Course...
                        </>
                      ) : (
                        "Update Course"
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      disabled={formik.isSubmitting}
                      onClick={() => router.push("/admin/courses")}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
