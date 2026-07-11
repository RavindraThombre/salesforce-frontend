import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FaqPage() {
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
                Frequently Asked Questions
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Find answers to common questions about our Salesforce courses
                and learning platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is Salesforce and who should learn it?
            </AccordionTrigger>
            <AccordionContent>
              Salesforce is the world’s leading CRM platform. It is ideal for
              students, freshers, and working professionals who want to build a
              career in cloud technology.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do you provide live classes or recorded videos?
            </AccordionTrigger>
            <AccordionContent>
              We provide both live Zoom classes and recorded sessions so you can
              revise anytime.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Will I get a certificate after completing the course?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you will receive a course completion certificate and guidance
              for Salesforce official certification exams.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Do you provide placement or interview support?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we provide interview preparation, resume building, and job
              referral assistance for eligible students.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              What payment methods are supported?
            </AccordionTrigger>
            <AccordionContent>
              We support UPI, credit/debit cards, and net banking via secure
              payment gateways like Razorpay or Stripe.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
