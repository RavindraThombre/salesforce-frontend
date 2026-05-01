"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase, Video, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Gradient Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-background" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-screen py-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-white shadow-lg mb-6"
          >
            🚀 Trusted by 5,000+ Salesforce Learners
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="
    text-4xl
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    font-extrabold
    tracking-tight
    leading-[1.1]
    text-white
  "
            style={{
              fontFamily:
                "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
            }}
          >
            Master{" "}
            <motion.span
              whileHover={{
                scale: 1.06,
                color: "var(--wes-g-color-palette-blue-20, #032D60)",
                textShadow: "0 0 35px rgba(3,45,96,0.45)",
                opacity: 1,
              }}
              initial={{ opacity: 0.88 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
              }}
              className="inline-block font-extrabold cursor-pointer"
              style={{
                color: "var(--wes-g-color-palette-blue-20, #032D60)",
                textShadow: "0 0 18px rgba(3,45,96,0.18)",
              }}
            >
              Salesforce
            </motion.span>
            <br />
            Build Your Dream Career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Live mentorship, real-world projects, certification guidance,
            interview preparation, and complete career support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Link href="/courses">
              <Button
                size="lg"
                className="px-8 rounded-2xl text-base shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="px-8 rounded-2xl border-white text-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-primary transition-all duration-300"
              >
                Join Free Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-5xl"
          >
            {" "}
            {[
              { end: 5000, suffix: "+", label: "Students Trained" },
              { end: 150, suffix: "+", label: "Live Batches" },
              { end: 95, suffix: "%", label: "Placement Support" },
              { end: 4.9, suffix: "★", label: "Student Rating", decimals: 1 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                {" "}
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {" "}
                  <CountUp
                    end={stat.end}
                    duration={2.5}
                    decimals={stat.decimals || 0}
                  />{" "}
                  {stat.suffix}{" "}
                </p>{" "}
                <p className="text-sm text-gray-300 mt-1">{stat.label}</p>{" "}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6 bg-gradient-to-b from-muted/40 via-background to-background relative overflow-hidden">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{
                fontFamily:
                  "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                color: "var(--wes-g-color-palette-blue-20, #032D60)",
              }}
            >
              Why Choose Our Platform?
            </h2>

            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Premium Salesforce learning designed for serious career growth,
              certifications, and real-world success.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Live Expert Classes",
                desc: "Interactive sessions with certified Salesforce professionals.",
                icon: Video,
              },
              {
                title: "Recorded Sessions",
                desc: "Lifetime premium access to all recordings anytime.",
                icon: BookOpen,
              },
              {
                title: "Certification Guidance",
                desc: "Step-by-step support for Salesforce certifications.",
                icon: Award,
              },
              {
                title: "Placement Assistance",
                desc: "Resume building, mock interviews, and job preparation.",
                icon: Briefcase,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.7,
                  type: "spring",
                }}
                viewport={{ once: true }}
              >
                <Card className="group relative h-full rounded-3xl border border-border/40 bg-background/80 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardContent className="relative p-8 flex flex-col items-center text-center space-y-5">
                    {/* Icon Circle */}
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/15 transition-all duration-500 shadow-md">
                      <feature.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold"
                      style={{
                        color: "var(--wes-g-color-palette-blue-20, #032D60)",
                        fontFamily:
                          "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
