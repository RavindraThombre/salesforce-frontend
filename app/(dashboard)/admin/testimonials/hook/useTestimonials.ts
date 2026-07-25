"use client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "sonner";

import { apiClient } from "@/app/lib/axiosConfig";

export interface Testimonial {
  _id: string;
  name: string;
  review: string;
  rating: number;
}

interface SaveTestimonialDto {
  name: string;
  review: string;
  rating: number;
}

export default function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);

    try {
      const res = await apiClient.get("/testimonials", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setTestimonials(res.data);
    } catch {
      toast.error("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const createTestimonial = async (payload: SaveTestimonialDto) => {
    try {
      const res = await apiClient.post("/testimonials", payload);

      setTestimonials((prev) => [res.data, ...prev]);

      toast.success("Testimonial created.");
    } catch {
      toast.error("Failed to create testimonial.");
    }
  };

  const updateTestimonial = async (id: string, payload: SaveTestimonialDto) => {
    try {
      const res = await apiClient.put(`/testimonials/${id}`, payload);

      setTestimonials((prev) =>
        prev.map((item) => (item._id === id ? res.data : item)),
      );

      toast.success("Testimonial updated.");
    } catch {
      toast.error("Failed to update testimonial.");
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await apiClient.delete(`/testimonials/${id}`);

      setTestimonials((prev) => prev.filter((item) => item._id !== id));

      toast.success("Testimonial deleted.");
    } catch {
      toast.error("Failed to delete testimonial.");
    }
  };

  return {
    testimonials,
    loading,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refreshTestimonials: fetchTestimonials,
  };
}
