"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative py-4 md:py-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h2
                className="text-base sm:text-xl font-semibold tracking-tight capitalize"
                style={{
                  fontFamily:
                    "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                }}
              >
                About Us
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                We are dedicated to helping students build successful careers in
                Salesforce through expert-led training and real-world projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-10 md:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-4">
          <h2 className="text-1xl font-semibold">Who We Are</h2>
          <p className="text-muted-foreground text-sm">
            SalesforceAcademy is an online learning platform focused on
            Salesforce technologies including Admin, Developer, LWC, Apex, and
            Integrations.
          </p>
          <p className="text-muted-foreground text-sm">
            Our mission is to provide high-quality, affordable, and practical
            Salesforce training for students and working professionals.
          </p>
        </div>

        {/* RIGHT */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="text-sm font-semibold">Why Choose Us?</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 text-sm">
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
            <h3 className="text-2xl font-bold">1000+</h3>
            <p className="text-muted-foreground text-sm">Students Trained</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">20+</h3>
            <p className="text-muted-foreground text-sm">Expert Trainers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-muted-foreground text-sm">Placement Success</p>
          </div>
        </div>
      </section>
    </main>
  );
}
