import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { CourseRatingSummary } from "../lib/courseReview.type";
import { getCourseRatingSummary } from "../api/courseReview.service";

interface CourseRatingProps {
  courseId: string;
}

export default function CourseRating({ courseId }: CourseRatingProps) {
  const [rating, setRating] = useState<CourseRatingSummary>({
    averageRating: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getCourseRatingSummary(courseId);

        setRating(response);
      } catch (error) {
        console.error("Failed to load course rating:", error);
      }
    };

    fetchRating();
  }, [courseId]);

  if (rating.totalReviews === 0) {
    return (
      <div className="mt-0 flex items-center gap-2">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

        <span className="text-xs text-muted-foreground">No reviews yet</span>
      </div>
    );
  }

  return (
    <div className="mt-0 flex items-center gap-2">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

      <span className="text-xs font-semibold text-muted-foreground">
        {rating.averageRating.toFixed(1)}
      </span>

      <span className="text-xs text-muted-foreground">
        ({rating.totalReviews}{" "}
        {rating.totalReviews === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}
