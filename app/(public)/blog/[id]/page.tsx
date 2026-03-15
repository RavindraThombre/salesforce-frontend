import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    id: "1",
    title: "How to Start a Career in Salesforce",
    content: `
Salesforce is the world’s leading CRM platform used by top companies.

To start your Salesforce career:
1. Learn Salesforce Admin fundamentals.
2. Practice on Salesforce Trailhead.
3. Get certified (Admin / Developer).
4. Build real projects.
5. Apply for jobs with confidence.

Salesforce offers high salaries and global job opportunities.
    `,
    image: "/blog/salesforce-career.jpg",
    date: "Jan 20, 2026",
  },
  {
    id: "2",
    title: "Top 10 Salesforce Interview Questions",
    content: `
Here are some common Salesforce interview questions:
1. What is Salesforce?
2. What is a CRM?
3. Difference between Role and Profile?
4. What is Apex?
5. What is LWC?
6. What are workflows?
7. What is SOQL?
8. What is a trigger?
9. What is a sandbox?
10. What is a governor limit?
    `,
    image: "/blog/interview.jpg",
    date: "Jan 18, 2026",
  },
  {
    id: "3",
    title: "Salesforce Admin vs Developer",
    content: `
Salesforce Admin focuses on:
- Configuration
- Users & security
- Automation

Salesforce Developer focuses on:
- Apex coding
- LWC UI
- Integrations

Choose Admin if you like configuration.
Choose Developer if you love coding.
    `,
    image: "/blog/admin-vs-dev.jpg",
    date: "Jan 15, 2026",
  },
];

export default function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = blogs.find((b) => b.id === params.id);

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Link href="/blog">
          <Button className="mt-4">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-10 max-w-4xl mx-auto px-6">
        <Link href="/blog">
          <Button variant="ghost">← Back to Blog</Button>
        </Link>

        <h1 className="text-4xl font-bold mt-6">{blog.title}</h1>
        <p className="text-muted-foreground mt-2">{blog.date}</p>
      </section>

      {/* IMAGE */}
      <section className="max-w-4xl mx-auto px-6">
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-lg w-full object-cover"
        />
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <article className="prose dark:prose-invert max-w-none whitespace-pre-line">
          {blog.content}
        </article>
      </section>
    </main>
  );
}
