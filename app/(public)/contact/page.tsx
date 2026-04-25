"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { apiClient } from "@/app/lib/axiosConfig";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [e.target.id]: e.target.value });
    };


    const handleSubmit = async () => {
      try {
        await apiClient.post("/contacts", form);

        toast.success("Message sent successfully ✅");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } catch {
        toast.error("Failed to send message ❌");
      }
    };
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
              <Input 
              id="name" value={form.name}
  onChange={handleChange} placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email}
               onChange={handleChange} placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={form.message}
             onChange={handleChange} placeholder="Write your message..." />
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
