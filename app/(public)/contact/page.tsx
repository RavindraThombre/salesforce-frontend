"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setLoading(true);

      await apiClient.post("/contacts", form);

      toast.success("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="relative py-4 md:py-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div>
              <h2
                className="text-base sm:text-xl font-semibold tracking-tight capitalize"
                style={{
                  fontFamily:
                    "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                }}
              >
                Contact Us
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Have questions about our Salesforce courses? Get in touch with
                us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div className="space-y-1">
          <h2 className="text-md font-semibold">Reach Us</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Our team is available to help you with course details, enrollment,
            and support.
          </p>

          <div className="space-y-3 text-muted-foreground *:text-sm">
            <p>📍Ravet Nigdi Pradhikaran, Pune, Maharashtra, India</p>
            <p>📧 support@salesforceacademy.com</p>
            <p>📞 +91 96232 35335</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-md font-semibold ">Send us a message</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                required
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                required
                rows={5}
                onChange={handleChange}
                placeholder="Write your message..."
              />
            </div>

            <Button className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
