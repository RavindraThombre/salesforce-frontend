import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: "admin",
    title: "Salesforce Admin",
    description:
      "Learn Salesforce basics, CRM concepts, and become a certified Admin.",
    image: "/courses/admin.jpg",
    price: "₹9,999",
    level: "Beginner",
  },
  {
    id: "developer",
    title: "Salesforce Developer",
    description:
      "Master Apex, LWC, and integrations with real-world projects.",
    image: "/courses/developer.jpg",
    price: "₹14,999",
    level: "Intermediate",
  },
  {
    id: "lwc",
    title: "Salesforce LWC",
    description:
      "Build modern UI using Lightning Web Components framework.",
    image: "/courses/lwc.jpg",
    price: "₹7,999",
    level: "Advanced",
  },
  {
    id: "integration",
    title: "Salesforce Integration",
    description:
      "Learn REST APIs, external integrations, and automation.",
    image: "/courses/integration.jpg",
    price: "₹11,999",
    level: "Advanced",
  },
];


export default function CoursesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Our Courses</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Explore our Salesforce courses designed for beginners and
          professionals.
        </p>
      </section>

      {/* COURSE GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition">
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={250}
                className="h-40 w-full object-cover rounded-t-md"
              />

              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.description}
                </p>

                <div className="flex justify-between text-sm mt-2">
                  <span className="font-medium">{course.level}</span>
                  <span className="font-bold text-primary">
                    {course.price}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4">
                <Link href={`/courses/${course.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
