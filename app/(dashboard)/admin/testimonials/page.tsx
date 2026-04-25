"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";

type Testimonial = {
  _id: string;
  name: string;
  review: string;
  rating: number;
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  
  // ✅ FETCH
  useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const res = await apiClient.get("/testimonials", {
        headers: { "Cache-Control": "no-cache" },
      });
      setTestimonials(res.data);
    } catch {
      toast.error("Failed to load ❌");
    }
  };

    fetchTestimonials();
  }, []);

  // ✅ ADD
  const addTestimonial = async () => {
    if (!name || !review) {
      toast.error("All fields required ❌");
      return;
    }

    try {
      const res = await apiClient.post("/testimonials", {
        name,
        review,
        rating,
      });

      setTestimonials((prev) => [res.data, ...prev]);

      setName("");
      setReview("");
      setRating(5);

      toast.success("Added ✅");
    } catch {
      toast.error("Failed ❌");
    }
  };

  // ✅ DELETE
  const deleteTestimonial = async (id: string) => {
    try {
      await apiClient.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      toast.success("Deleted ✅");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Testimonials</h1>

      {/* ADD */}
      <Card className="max-w-xl">
        <CardContent className="p-6 space-y-4">

          <h2 className="text-lg font-semibold">Add Testimonial</h2>

          <Input
            placeholder="Student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="border rounded p-2 w-full"
            rows={4}
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <Input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />

          <Button onClick={addTestimonial}>
            Add Testimonial
          </Button>

        </CardContent>
      </Card>

      {/* LIST */}
      {testimonials.length === 0 ? (
        <p>No testimonials yet</p>
      ) : (
        testimonials.map((t) => (
          <Card key={t._id}>
            <CardContent className="p-4 flex justify-between">

              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t.review}
                </p>
                <p className="text-yellow-500">
                  {"⭐".repeat(t.rating)}
                </p>
              </div>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteTestimonial(t._id)}
              >
                Delete
              </Button>

            </CardContent>
          </Card>
        ))
      )}

    </div>
  );
}