import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Have questions about our Salesforce courses? Get in touch with us.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Reach Us</h2>
          <p className="text-muted-foreground">
            Our team is available to help you with course details, enrollment,
            and support.
          </p>

          <div className="space-y-3 text-muted-foreground">
            <p>📍 Pune, Maharashtra, India</p>
            <p>📧 support@salesforceacademy.com</p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Send us a message</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write your message..." />
            </div>

            <Button className="w-full">Submit</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
