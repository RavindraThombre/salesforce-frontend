"use client";

import { MessageSquarePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TestimonialHeaderProps {
  total: number;
  onAdd: () => void;
}

export default function TestimonialHeader({
  total,
  onAdd,
}: TestimonialHeaderProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Testimonials</h1>

        <p className="mt-2 text-muted-foreground">
          Manage student testimonials and success stories showcased on the
          website.
        </p>

        <div className="mt-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {total} {total === 1 ? "Testimonial" : "Testimonials"}
        </div>
      </div>

      <Button size="lg" onClick={onAdd}>
        <MessageSquarePlus className="mr-2 h-4 w-4" />
        Add Testimonial
      </Button>
    </div>
  );
}
