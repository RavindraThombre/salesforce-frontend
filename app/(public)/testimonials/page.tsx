"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getTestimonials } from "./lib/testimonialApi";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  _id: string;
  name: string;
  review: string;
  rating: number;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="relative py-4 md:py-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div>
              <h2
                className="text-base sm:text-xl font-semibold tracking-tight capitalize"
                style={{
                  fontFamily:
                    "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                }}
              >
                Student Testimonials
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Hear what our students say about their learning journey with us.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* TESTIMONIAL GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t._id}
              className="group h-full border border-border/50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Rating */}
                <div className="flex justify-center text-yellow-500 text-lg mb-4">
                  {"⭐".repeat(t.rating)}
                </div>

                {/* Review */}
                <p className="flex-1 text-sm text-muted-foreground italic leading-7 text-center">
                  “{t.review}”
                </p>

                {/* Student */}
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {t.name.charAt(0).toUpperCase()}
                  </div>

                  <h3 className="mt-3 text-base font-semibold">{t.name}</h3>

                  <span className="text-xs text-muted-foreground">
                    Salesforce Student
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* CTA */}
      <section className="bg-muted/40 py-14">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Start Your Salesforce Journey?
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Join hundreds of learners who have built successful Salesforce
            careers through our expert-led courses and practical projects.
          </p>

          <Link href="/courses">
            <Button className="mt-6 rounded-xl px-8">Explore Courses</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
