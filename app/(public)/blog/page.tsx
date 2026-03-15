import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    id: 1,
    title: "How to Start a Career in Salesforce",
    description:
      "Learn the best roadmap to become a Salesforce Admin or Developer with certifications.",
    image: "/blog/salesforce-career.jpg",
    date: "Jan 20, 2026",
  },
  {
    id: 2,
    title: "Top 10 Salesforce Interview Questions",
    description:
      "Prepare for your Salesforce interview with these commonly asked questions.",
    image: "/blog/interview.jpg",
    date: "Jan 18, 2026",
  },
  {
    id: 3,
    title: "Salesforce Admin vs Developer",
    description:
      "Confused between Admin and Developer roles? Here’s a complete comparison.",
    image: "/blog/admin-vs-dev.jpg",
    date: "Jan 15, 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold">Salesforce Blog</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Tips, tutorials, and career guidance for Salesforce learners.
        </p>
      </section>

      {/* BLOG LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={500}
                height={300}
                className="h-48 w-full object-cover"
              />

              <CardContent className="p-5 space-y-3">
                <p className="text-sm text-muted-foreground">{blog.date}</p>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {blog.description}
                </p>

                <Link href={`/blog/${blog.id}`}>
                  <Button variant="link" className="p-0">
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
