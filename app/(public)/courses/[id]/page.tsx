import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: "admin",
    title: "Salesforce Admin",
    description:
      "Become a certified Salesforce Administrator with hands-on training and real projects.",
    price: "₹14,999",
    duration: "6 Weeks",
    level: "Beginner",
    syllabus: [
      "Introduction to Salesforce",
      "User Management",
      "Security & Access",
      "Data Management",
      "Reports & Dashboards",
      "Automation (Flows)",
      "Real-time Project",
    ],
  },
  {
    id: "developer",
    title: "Salesforce Developer",
    description:
      "Learn Apex, LWC, and integrations to become a Salesforce Developer.",
    price: "₹19,999",
    duration: "8 Weeks",
    level: "Intermediate",
    syllabus: [
      "Apex Programming",
      "SOQL & SOSL",
      "Triggers",
      "Lightning Web Components",
      "API Integrations",
      "Testing & Deployment",
      "Capstone Project",
    ],
  },
  {
    id: "lwc",
    title: "Lightning Web Components",
    description:
      "Master frontend development in Salesforce using Lightning Web Components.",
    price: "₹9,999",
    duration: "4 Weeks",
    level: "Intermediate",
    syllabus: [
      "LWC Basics",
      "Components & Templates",
      "Events & Communication",
      "Apex + LWC",
      "UI Design",
      "Performance Optimization",
    ],
  },
];

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) return notFound();

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-14 text-center border-b">
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {course.description}
        </p>

        <div className="flex justify-center gap-3 mt-4">
          <Badge>{course.level}</Badge>
          <Badge variant="secondary">{course.duration}</Badge>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {/* SYLLABUS */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Syllabus</h2>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              {course.syllabus.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ENROLL CARD */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Course Fee</h3>
            <p className="text-3xl font-bold text-primary">{course.price}</p>

            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✔ Live Classes (Zoom)</li>
              <li>✔ Recorded Videos</li>
              <li>✔ Notes & Assignments</li>
              <li>✔ Certificate</li>
              <li>✔ Placement Guidance</li>
            </ul>

            <Button className="w-full mt-4">Enroll Now</Button>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="bg-muted py-14 text-center">
        <h2 className="text-3xl font-bold">Start Your Salesforce Journey</h2>
        <p className="mt-3 text-muted-foreground">
          Join thousands of students learning Salesforce with expert trainers.
        </p>
        <Button size="lg" className="mt-6">
          Join Now
        </Button>
      </section>
    </main>
  );
}
