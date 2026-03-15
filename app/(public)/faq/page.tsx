import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <section className="py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Find answers to common questions about our Salesforce courses and platform.
        </p>
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
