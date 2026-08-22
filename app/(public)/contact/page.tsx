"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/app/lib/axiosConfig";

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
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    isEmailValid(form.email.trim()) &&
    form.message.trim().length > 0;

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!isEmailValid(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setLoading(true);

      await apiClient.post("/contacts", {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });

      toast.success("Message sent successfully");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex items-start gap-3 sm:items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="mt-0.5 shrink-0 rounded-full hover:bg-primary/10 sm:mt-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div className="min-w-0">
              <h1 className="text-lg font-semibold tracking-tight sm:text-2xl">
                Contact Us
              </h1>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Have questions about our Salesforce courses? Get in touch with
                us and our team will be happy to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* CONTACT INFORMATION */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>

              <h2 className="text-xl font-semibold sm:text-2xl">Reach Us</h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our team is available to help you with course details,
                enrollment, payments, and general support.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {/* LOCATION */}
              <div className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">Location</p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Ravet Nigdi Pradhikaran, Pune, Maharashtra, India
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">Email</p>

                  <a
                    href="mailto:support@salesforceacademy.com"
                    className="mt-1 block break-all text-xs text-muted-foreground hover:text-primary sm:text-sm"
                  >
                    support@salesforceacademy.com
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-medium">Phone</p>

                  <a
                    href="tel:+919623235335"
                    className="mt-1 block text-xs text-muted-foreground hover:text-primary sm:text-sm"
                  >
                    +91 96232 35335
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <Card className="overflow-hidden border shadow-sm">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold sm:text-xl">
                  Send us a message
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              <div className="space-y-5">
                {/* NAME */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>

                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-11"
                    disabled={loading}
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-11"
                    disabled={loading}
                  />
                </div>

                {/* MESSAGE */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>

                  <Textarea
                    id="message"
                    value={form.message}
                    rows={6}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="min-h-[140px] resize-none"
                    disabled={loading}
                  />
                </div>

                {/* SUBMIT */}
                <Button
                  className="h-11 w-full cursor-pointer gap-2"
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
