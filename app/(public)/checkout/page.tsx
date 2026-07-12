"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { createOrder, verifyPayment } from "./lib/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/common/ProtectedRoute";
import { ShieldCheck, ArrowLeft, BookOpen, CreditCard } from "lucide-react";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  duration?: string;
  syllabus?: string[];
};

export default function CheckoutPage() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      router.replace("/auth/login");
      return;
    }
    const stored = sessionStorage.getItem("selectedCourse");
    if (!stored) {
      router.replace("/courses");
      return;
    }
    setCourse(JSON.parse(stored));
  }, [router]);

  const handlePayment = async () => {
    if (!course) return;

    try {
      setLoading(true);

      if (course.price === 0) {
        await verifyPayment({
          courseId: course._id,
          isFree: true,
        });
        toast.success("Course enrolled successfully 🎉");

        setTimeout(() => {
          router.push("/student");
        }, 1000);
        return;
      }

      const order = await createOrder(course._id, course.price);
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;

      if (!razorpayKey) {
        toast.error("Razorpay key is missing");
        return;
      }
      const options = {
        key: razorpayKey,
        order_id: order.orderId,

        name: "BlueCloudMentor",
        description: course.title,

        // config: {
        //   display: {
        //     blocks: {
        //       upi: {
        //         name: "UPI",
        //         instruments: [
        //           {
        //             method: "upi",
        //           },
        //         ],
        //       },
        //     },
        //     sequence: ["block.upi"],
        //     preferences: {
        //       show_default_blocks: true,
        //     },
        //   },
        // },

        handler: async (response: RazorpayResponse) => {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course._id,
          });
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: unknown) {
        console.log("Payment Failed:", response);
      });

      rzp.on("modal.closed", function () {
        console.log("Modal closed");
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p className="p-6">No course selected</p>;
  return (
    <ProtectedRoute roles={["student", "admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        {/* Header */}
        <section className="relative overflow-hidden border-b bg-background/80 backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

          <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div>
                <h2
                  className="text-xl font-semibold tracking-tight"
                  style={{
                    fontFamily:
                      "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                  }}
                >
                  Secure Checkout
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Review your order and complete your payment securely.
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 md:flex">
              <ShieldCheck className="h-4 w-4" />
              100% Secure Payment
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Course */}
            <Card className="lg:col-span-2 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
              <CardContent className="p-8">
                <div className="mb-8 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">Course Details</h3>
                    <p className="text-sm text-muted-foreground">
                      Review your selected course.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Course Name</p>
                    <h2 className="mt-1 text-3xl font-bold">{course.title}</h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border bg-muted/30 p-5">
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="mt-1 font-semibold">{course.level}</p>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-5">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="mt-1 font-semibold">
                        {course.duration || "Self Paced"}
                      </p>
                    </div>
                  </div>

                  {course.description && (
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">
                        Description
                      </p>

                      <p className="leading-7 text-slate-600">
                        {course.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="sticky top-6 rounded-2xl border bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-green-100 p-3">
                    <CreditCard className="h-5 w-5 text-green-700" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Payment Details
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course Price</span>

                    <span className="font-semibold">
                      {course.price === 0 ? "FREE" : `₹${course.price}`}
                    </span>
                  </div>

                  <div className="border-t pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Total</span>

                      <span className="text-2xl font-bold text-primary">
                        {course.price === 0 ? "FREE" : `₹${course.price}`}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    <ShieldCheck className="mb-2 h-5 w-5" />
                    Payments are securely processed through Razorpay with
                    industry-standard encryption.
                  </div>

                  <Button
                    size="lg"
                    className="h-12 w-full rounded-xl"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : course.price === 0
                        ? "Enroll Free"
                        : `Pay ₹${course.price}`}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By continuing, you agree to our Terms & Conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
