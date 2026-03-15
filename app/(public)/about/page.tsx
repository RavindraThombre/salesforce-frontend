import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          We are dedicated to helping students build successful careers in
          Salesforce through expert-led training and real-world projects.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-10 md:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="text-muted-foreground">
            SalesforceAcademy is an online learning platform focused on
            Salesforce technologies including Admin, Developer, LWC, Apex, and
            Integrations.
          </p>
          <p className="text-muted-foreground">
            Our mission is to provide high-quality, affordable, and practical
            Salesforce training for students and working professionals.
          </p>
        </div>

        {/* RIGHT */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-xl font-semibold">Why Choose Us?</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Live instructor-led Zoom classes</li>
              <li>Recorded videos for revision</li>
              <li>Hands-on real projects</li>
              <li>Certification guidance</li>
              <li>Interview preparation</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* STATS */}
      <section className="bg-muted/40 py-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="text-muted-foreground">Students Trained</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">20+</h3>
            <p className="text-muted-foreground">Expert Trainers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">95%</h3>
            <p className="text-muted-foreground">Placement Success</p>
          </div>
        </div>
      </section>
    </main>
  );
}
