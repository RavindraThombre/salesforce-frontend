import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Learn Salesforce from Experts 🚀
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Live classes, recorded sessions, certifications guidance, and real
            project training to make you job-ready.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-xl">Live Zoom Classes</h3>
                <p className="text-muted-foreground">
                  Attend real-time sessions with certified Salesforce trainers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-xl">Recorded Videos</h3>
                <p className="text-muted-foreground">
                  Access recordings anytime from your dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-xl">Job-Ready Skills</h3>
                <p className="text-muted-foreground">
                  Hands-on projects + interview preparation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {["Salesforce Admin", "Salesforce Developer", "LWC & Apex"].map(
              (course) => (
                <Card key={course}>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold">{course}</h3>
                    <p className="text-muted-foreground">
                      Complete training with certification guidance.
                    </p>
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Your Salesforce Career Today
          </h2>
          <p className="opacity-90">
            Join thousands of students learning Salesforce and getting placed.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Enroll Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
