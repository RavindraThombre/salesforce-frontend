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
              What is Salesforce and why should I learn it?
            </AccordionTrigger>
            <AccordionContent>
              Salesforce is a leading cloud-based CRM platform used by companies
              worldwide to manage sales, customer service, marketing, and
              business operations. Learning Salesforce opens career
              opportunities in administration, development, consulting, and
              automation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Who can join Salesforce training?
            </AccordionTrigger>
            <AccordionContent>
              Anyone can join Salesforce training, including fresh graduates,
              working professionals, developers, testers, administrators, and
              people looking to switch careers into the Salesforce ecosystem.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Do I need coding knowledge to learn Salesforce?
            </AccordionTrigger>
            <AccordionContent>
              No. Beginners can start with Salesforce Administration without
              coding experience. For Salesforce Developer roles, basic
              programming knowledge is helpful.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              What Salesforce courses do you offer?
            </AccordionTrigger>
            <AccordionContent>
              We offer: Salesforce Administrator Training Salesforce Developer
              Training Salesforce Business Analyst Training Salesforce
              Consultant Training Salesforce Internship Programs Salesforce AI &
              Automation Training
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              How long does it take to complete Salesforce training?
            </AccordionTrigger>
            <AccordionContent>
              Course duration depends on the learning path: Salesforce Admin:
              6–8 weeks Salesforce Developer: 10–12 weeks Internship Program:
              4–12 weeks
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              How long does it take to complete Salesforce training?
            </AccordionTrigger>
            <AccordionContent>
              Course duration depends on the learning path: Salesforce Admin:
              6–8 weeks Salesforce Developer: 10–12 weeks Internship Program:
              4–12 weeks
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              Will I get hands-on project experience during the training?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Students work on real-time Salesforce projects, including CRM
              implementation, automation using Flow, reports & dashboards, Apex
              development, and Lightning Web Components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>
              Do you provide Salesforce certification preparation?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Our training includes certification guidance, exam
              preparation, practice questions, and mentor support to help you
              prepare for Salesforce certifications.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger>
              Is Salesforce training suitable for freshers?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Salesforce is a great career option for freshers. We provide
              beginner-friendly training, practical projects, and career
              guidance to help students become job-ready.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger>
              Do you provide placement and career support?
            </AccordionTrigger>
            <AccordionContent>
              Yes. We provide career support including: Resume building LinkedIn
              profile optimization Mock interviews Job preparation guidance
              Interview assistance
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-12">
            <AccordionTrigger>
              Will I receive a certificate after completing the
              training/internship?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Students who successfully complete the program receive a
              Salesforce training/internship completion certificate highlighting
              their skills, projects, and learning achievements.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
