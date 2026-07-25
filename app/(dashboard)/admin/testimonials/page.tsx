"use client";

import { useMemo, useState } from "react";

import AddEditTestimonialDialog from "./components/AddEditTestimonialDialog";
import TestimonialHeader from "./components/TestimonialHeader";
import TestimonialStats from "./components/TestimonialStats";
import TestimonialsTable from "./components/TestimonialsTable";

import { SaveTestimonialDto, Testimonial } from "./lib/testimonial.type";
import useTestimonials from "./hook/useTestimonials";

export default function AdminTestimonialsPage() {
  const {
    testimonials,
    loading,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useTestimonials();

  const [open, setOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const total = testimonials.length;

  const averageRating = useMemo(() => {
    if (!total) return 0;

    return testimonials.reduce((sum, item) => sum + item.rating, 0) / total;
  }, [testimonials, total]);

  const fiveStarCount = useMemo(
    () => testimonials.filter((item) => item.rating === 5).length,
    [testimonials],
  );

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setOpen(true);
  };

  const handleDelete = async (testimonial: Testimonial) => {
    await deleteTestimonial(testimonial._id);
  };

  const handleSave = async (payload: SaveTestimonialDto) => {
    if (selectedTestimonial) {
      await updateTestimonial(selectedTestimonial._id, payload);
    } else {
      await createTestimonial(payload);
    }

    setOpen(false);
    setSelectedTestimonial(null);
  };

  return (
    <div className="space-y-6 p-6">
      <TestimonialHeader total={total} onAdd={handleAdd} />

      <TestimonialStats
        total={total}
        averageRating={averageRating}
        fiveStarCount={fiveStarCount}
      />

      <TestimonialsTable
        testimonials={testimonials}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddEditTestimonialDialog
        key={selectedTestimonial?._id ?? "new"}
        open={open}
        testimonial={selectedTestimonial}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            setSelectedTestimonial(null);
          }
        }}
        onSave={handleSave}
      />
    </div>
  );
}
