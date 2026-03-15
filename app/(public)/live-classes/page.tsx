import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const liveClasses = [
  {
    id: 1,
    course: "Salesforce Admin",
    trainer: "Dipak Matsagar",
    date: "25 Feb 2026",
    time: "7:00 PM - 9:00 PM",
    level: "Beginner",
    zoomLink: "https://zoom.us/j/123456789",
  },
  {
    id: 2,
    course: "Salesforce Developer",
    trainer: "Rahul Sharma",
    date: "26 Feb 2026",
    time: "8:00 PM - 10:00 PM",
    level: "Intermediate",
    zoomLink: "https://zoom.us/j/987654321",
  },
  {
    id: 3,
    course: "Salesforce LWC",
    trainer: "Priya Patel",
    date: "27 Feb 2026",
    time: "6:00 PM - 8:00 PM",
    level: "Advanced",
    zoomLink: "https://zoom.us/j/456789123",
  },
];

export default function LiveClassesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Live Classes Schedule (Zoom)
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Join our live instructor-led Salesforce classes via Zoom.
        </p>
      </section>

      {/* CLASS LIST */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveClasses.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{cls.course}</h3>

                <p className="text-sm text-muted-foreground">
                  Trainer: <span className="font-medium">{cls.trainer}</span>
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge>{cls.level}</Badge>
                  <Badge variant="secondary">{cls.date}</Badge>
                  <Badge variant="outline">{cls.time}</Badge>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <a href={cls.zoomLink} target="_blank">
                    Join on Zoom
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* INFO */}
      <section className="bg-muted py-16 text-center px-6">
        <h2 className="text-3xl font-bold">Don’t Miss a Class</h2>
        <p className="mt-3 text-muted-foreground">
          Enroll in a course to get automatic Zoom links and reminders.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <a href="/courses">View Courses</a>
        </Button>
      </section>
    </main>
  );
}
