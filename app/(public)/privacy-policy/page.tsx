export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Privacy Policy</h1>
        <p className="text-muted-foreground text-center">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to SalesforceAcademy. We respect your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when
            you use our website and services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Name, email address, and contact details</li>
            <li>Account login information</li>
            <li>Payment and transaction details</li>
            <li>Usage data such as pages visited and actions taken</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>To provide and manage our courses and services</li>
            <li>To process payments and enrollments</li>
            <li>To send notifications and important updates</li>
            <li>To improve our website and user experience</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p className="text-muted-foreground">
            We use industry-standard security measures to protect your personal
            data from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
          <p className="text-muted-foreground">
            We may use trusted third-party services such as payment gateways and
            analytics providers. These services have their own privacy policies
            governing how they handle your data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies to enhance your browsing experience and analyze site
            traffic. You can choose to disable cookies in your browser
            settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Your Rights</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
        </section>
      </div>
    </main>
  );
}
