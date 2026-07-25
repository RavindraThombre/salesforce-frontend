"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import RatingStars from "./RatingStars";
import type { Testimonial } from "./TestimonialsTable";

interface AddEditTestimonialDialogProps {
  open: boolean;
  loading?: boolean;
  testimonial?: Testimonial | null;

  onOpenChange: (open: boolean) => void;

  onSave: (data: { name: string; review: string; rating: number }) => void;
}

export default function AddEditTestimonialDialog({
  open,
  loading = false,
  testimonial,
  onOpenChange,
  onSave,
}: AddEditTestimonialDialogProps) {
  const [name, setName] = useState(testimonial?.name ?? "");
  const [review, setReview] = useState(testimonial?.review ?? "");
  const [rating, setRating] = useState(testimonial?.rating ?? 5);

  const handleSave = () => {
    if (!name.trim()) return;
    if (!review.trim()) return;

    onSave({
      name,
      review,
      rating,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>

          <DialogDescription>
            {testimonial
              ? "Update the student's testimonial."
              : "Add a new testimonial to display on the website."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Student Name</Label>

            <Input
              value={name}
              placeholder="Enter student name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Review</Label>

            <Textarea
              rows={5}
              value={review}
              placeholder="Write testimonial..."
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                >
                  <RatingStars
                    rating={star <= rating ? 1 : 0}
                    maxRating={1}
                    showValue={false}
                  />
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Selected Rating: {rating}/5
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button disabled={loading} onClick={handleSave}>
            {loading ? "Saving..." : testimonial ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
