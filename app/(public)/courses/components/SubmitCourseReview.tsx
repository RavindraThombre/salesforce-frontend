"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getMyCourseReview,
  submitCourseReview,
} from "../api/courseReview.service";

interface SubmitCourseReviewProps {
  courseId: string;
  initialRating?: number;
  initialReview?: string;
  onSuccess?: () => void;
}

export default function SubmitCourseReview({
  courseId,
  initialRating = 0,
  initialReview = "",
  onSuccess,
}: SubmitCourseReviewProps) {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [submitting, setSubmitting] = useState(false);
  const [loadingReview, setLoadingReview] = useState(true);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await submitCourseReview({
        courseId,
        rating,
        review,
      });

      toast.success(response.message);
      setHasExistingReview(true);

      onSuccess?.();
    } catch (error: unknown) {
      console.error(error);

      let message = "Failed to submit review.";

      if (error && typeof error === "object" && "response" in error) {
        const response = (
          error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response;

        if (response?.data?.message) {
          message = response.data.message;
        }
      }

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchMyReview = async () => {
      try {
        setLoadingReview(true);

        const response = await getMyCourseReview(courseId);

        if (response) {
          setRating(response.rating);
          setReview(response.review || "");
          setHasExistingReview(true);
        }
      } catch (error) {
        console.error("Failed to load your review:", error);
      } finally {
        setLoadingReview(false);
      }
    };

    fetchMyReview();
  }, [courseId]);
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h3 className="text-lg font-semibold">Rate this course</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Share your experience with other students.
      </p>

      {/* STAR RATING */}
      <div className="mt-5 flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`h-7 w-7 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>

      {rating > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Your rating: {rating} / 5
        </p>
      )}

      {/* REVIEW */}
      <div className="mt-5">
        <Textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="Write your review..."
          rows={5}
        />
      </div>

      <Button
        className="mt-5"
        onClick={handleSubmit}
        disabled={submitting || loadingReview}
      >
        {loadingReview
          ? "Loading..."
          : submitting
            ? "Submitting..."
            : hasExistingReview
              ? "Update Review"
              : "Submit Review"}
      </Button>
    </div>
  );
}
