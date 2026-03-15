import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Students</p>
            <h3 className="text-3xl font-bold">320</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Courses</p>
            <h3 className="text-3xl font-bold">12</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Revenue</p>
            <h3 className="text-3xl font-bold">₹2,40,000</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Live Classes</p>
            <h3 className="text-3xl font-bold">5</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
