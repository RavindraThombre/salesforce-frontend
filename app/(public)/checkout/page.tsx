"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { createOrder, verifyPayment } from "./lib/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/common/ProtectedRoute";

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
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: course.price * 100,
        currency: "INR",
        name: "Your LMS",
        description: course.title,
        order_id: order.orderId,

        handler: async function (response: RazorpayResponse) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
            });

            toast.success("Payment successful 🎉");

            setTimeout(() => {
              window.location.href = "/student";
            }, 1000);
          } catch (err) {
            console.error(err);
            toast.error("Verification failed");
          }
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
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
      <div className="p-10 flex justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Checkout</h2>

            <p>
              <strong>Course:</strong> {course.title}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              {course.price === 0 ? (
                <span className="text-green-600 font-bold">FREE</span>
              ) : (
                `₹${course.price}`
              )}
            </p>

            <Button
              className="w-full"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : course.price === 0
                  ? "Enroll Free"
                  : "Pay Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
