"use client";
import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-background via-muted/5 to-background text-foreground overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h2
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight"
              style={{
                color: "var(--wes-g-color-palette-blue-20, #032D60)",
                fontFamily:
                  "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
              }}
            >
              BlueCloudMentor
            </h2>

            <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-xs">
              Learn Salesforce with live expert classes, recorded sessions,
              certification guidance, and complete job-ready career support.
            </p>

            <div className="space-y-3 text-sm sm:text-[15px] text-muted-foreground w-full max-w-xs">
              <div className="flex items-start sm:items-center justify-center sm:justify-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-1 sm:mt-0 shrink-0" />
                <span className="break-all">support@bluecloudmentor.com</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-start sm:items-center justify-center sm:justify-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 sm:mt-0 shrink-0" />
                <span>India | Global Online Training</span>
              </div>
            </div>
          </motion.div>

          {/* FOOTER COLUMNS */}
          {[
            {
              title: "Quick Links",
              links: [
                ["Home", "/"],
                ["Courses", "/courses"],
                ["Blog", "/blog"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
              ],
            },
            {
              title: "Courses",
              links: [
                ["Salesforce Admin", "#"],
                ["Salesforce Developer", "#"],
                ["LWC & Apex", "#"],
                ["Integration", "#"],
                ["Interview Preparation", "#"],
              ],
            },
            {
              title: "Support",
              links: [
                ["FAQs", "/faq"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms"],
                ["Refund Policy", "/refund-policy"],
                ["Cookie Policy", "/cookie-policy"],
                ["Disclaimer", "/disclaimer"],
                ["Accessibility", "/accessibility"],
              ],
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left pt-1"
            >
              <h3
                className="font-bold text-base sm:text-lg mb-4"
                style={{
                  color: "var(--wes-g-color-palette-blue-20, #032D60)",
                }}
              >
                {section.title}
              </h3>

              <ul className="space-y-2 text-sm sm:text-[15px] text-muted-foreground">
                {section.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* SOCIAL + NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-14 pt-8 border-t border-border/40 flex flex-col lg:flex-row justify-between items-center gap-8"
        >
          {/* SOCIAL ICONS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {[Facebook, Linkedin, Youtube, Instagram].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* NEWSLETTER */}
          <div className="text-center lg:text-right max-w-xl">
            <h4 className="font-bold text-xl sm:text-2xl leading-tight">
              Stay Updated with Salesforce Trends
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              Get updates on courses, certifications, career tips, and latest
              Salesforce opportunities.
            </p>
          </div>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-border/30 py-4 text-center text-sm text-muted-foreground bg-muted/5 px-4">
        © {new Date().getFullYear()} BlueCloudMentor. All rights reserved.
      </div>
    </footer>
  );
}
