"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  maxRating = 5,
  showValue = true,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-muted-foreground">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  );
}
