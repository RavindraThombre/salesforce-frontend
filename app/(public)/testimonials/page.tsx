import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Salesforce Admin",
    message:
      "This course completely changed my career. The trainer explained everything clearly and helped me crack my first Salesforce job.",
    image: "/students/rahul.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Salesforce Developer",
    message:
      "The LWC and Apex training was excellent. Live classes and recorded videos helped me revise anytime.",
    image: "/students/priya.jpg",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Salesforce Consultant",
    message:
      "Best Salesforce institute with real-time projects and interview preparation. Highly recommended!",
    image: "/students/amit.jpg",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    role: "Salesforce Admin",
    message:
      "I joined as a fresher and now I’m working in an MNC as Salesforce Admin. Thank you SalesforceAcademy!",
    image: "/students/sneha.jpg",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Student Testimonials</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Hear what our students say about their learning journey with us.
        </p>
      </section>

      {/* TESTIMONIAL GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="hover:shadow-lg transition">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />

                <p className="text-sm text-muted-foreground italic">
                  “{t.message}”
                </p>

                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {t.role}
                  </Badge>
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
        <a
          href="/courses"
          className="inline-block mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90"
        >
          View Courses
        </a>
      </section>
    </main>
  );
}
