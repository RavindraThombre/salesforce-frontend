import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Enrolled Courses</p>
            <h3 className="text-3xl font-bold">3</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Live Classes</p>
            <h3 className="text-3xl font-bold">2</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Certificates</p>
            <h3 className="text-3xl font-bold">1</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-xl font-semibold">Upcoming Live Class</h3>
          <p>Salesforce Admin - Zoom Session</p>
          <Button>Join Live Class</Button>
        </CardContent>
      </Card>
    </div>
  );
}
