import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: 1,
    name: "Free",
    price: "₹0",
    description: "Get started with basic Salesforce learning",
    features: [
      "Access to free tutorials",
      "Community support",
      "Limited blog content",
      "No live classes",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Standard",
    price: "₹9,999",
    description: "Best for Salesforce beginners",
    features: [
      "Recorded video access",
      "Live Zoom classes",
      "Notes & assignments",
      "Certificate of completion",
      "Email support",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Premium",
    price: "₹14,999",
    description: "For serious Salesforce professionals",
    features: [
      "Everything in Standard",
      "1-on-1 mentor support",
      "Interview preparation",
      "Resume & job guidance",
      "Placement assistance",
    ],
    popular: false,
  },
];

export default function PricingPage() {
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
                Pricing Plans
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Choose the plan that best fits your Salesforce learning journey
                and career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative hover:shadow-lg transition ${
                plan.popular ? "border-primary" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4">Most Popular</Badge>
              )}

              <CardContent className="p-6 space-y-4 text-center">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>

                <div className="text-4xl font-bold text-primary">
                  {plan.price}
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground text-left mt-4">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-16 text-center px-6">
        <h2 className="text-3xl font-bold">Not Sure Which Plan to Choose?</h2>
        <p className="mt-3 text-muted-foreground">
          Contact us and we’ll help you select the best plan for your goals.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <a href="/contact">Talk to Us</a>
        </Button>
      </section>
    </main>
  );
}
