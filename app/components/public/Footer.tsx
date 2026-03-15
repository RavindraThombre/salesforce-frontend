import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-primary">
            SalesforceAcademy
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Learn Salesforce with live classes, recorded sessions and
            job-ready training.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* COURSES */}
        <div>
          <h3 className="font-semibold mb-3">Courses</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Salesforce Admin</li>
            <li>Salesforce Developer</li>
            <li>LWC & Apex</li>
            <li>Integration</li>
            <li>Interview Prep</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy" className="hover:underline">Refund Policy</Link></li>
            <li><Link href="/refund-policy" className="hover:underline">Refund Policy</Link></li>
            <li><Link href="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>

          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SalesforceAcademy. All rights reserved.
      </div>
    </footer>
  );
}
