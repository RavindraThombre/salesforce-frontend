"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTestimonials } from "./lib/testimonialApi";
import Link from "next/link";

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
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Student Testimonials
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Hear what our students say about their learning journey with us.
        </p>
      </section>

      {/* TESTIMONIAL GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Card key={t._id} className="hover:shadow-lg transition">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">

                {/* DEFAULT AVATAR */}
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {t.name.charAt(0)}
                </div>

                {/* MESSAGE */}
                <p className="text-sm text-muted-foreground italic">
                  “{t.review}”
                </p>

                {/* NAME + RATING */}
                <div>
                  <h3 className="font-semibold">{t.name}</h3>

                  <p className="text-yellow-500 text-sm mt-1">
                    {"⭐".repeat(t.rating)}
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-16 text-center px-6">
        <h2 className="text-3xl font-bold">
          Join Our Successful Students Today
        </h2>
        <p className="mt-3 text-muted-foreground">
          Start your Salesforce career with expert trainers and real projects.
        </p>

       <Link
  href="/courses"
  className="inline-block mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90"
>
  View Courses
</Link>
      </section>

    </main>
  );
}