export default function TermsPage() {
  return (
    <main className="bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Terms & Conditions</h1>
        <p className="text-muted-foreground text-center">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to SalesforceAcademy. By accessing or using our website and
            services, you agree to comply with and be bound by these Terms &
            Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. User Accounts</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>You must provide accurate and complete registration details.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>We reserve the right to suspend or terminate accounts for misuse.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Course Access</h2>
          <p className="text-muted-foreground">
            Access to paid courses is granted only after successful payment.
            Course materials are for personal use only and may not be shared,
            copied, or redistributed without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Payments & Refunds</h2>
          <p className="text-muted-foreground">
            All payments are processed securely through third-party payment
            gateways. Refunds are subject to our Refund Policy available on the
            website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content, including videos, text, images, and course materials,
            are the intellectual property of SalesforceAcademy and may not be
            reused without written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Prohibited Activities</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Sharing login credentials</li>
            <li>Recording or redistributing course videos</li>
            <li>Attempting to hack or disrupt the platform</li>
            <li>Using the platform for illegal activities</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            SalesforceAcademy shall not be liable for any direct, indirect, or
            incidental damages arising from the use of our services or content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to update these Terms & Conditions at any time.
            Continued use of the platform after changes implies acceptance of
            the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms shall be governed and interpreted according to the laws
            of India.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          <p className="text-muted-foreground">
            For any questions regarding these Terms & Conditions, contact us at:
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
        </section>
      </div>
    </main>
  );
}
