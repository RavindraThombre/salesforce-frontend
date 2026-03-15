export default function CookiePolicyPage() {
  return (
    <main className="bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Cookie Policy</h1>
        <p className="text-muted-foreground text-center">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
          <p className="text-muted-foreground">
            Cookies are small text files stored on your device to help improve
            your browsing experience and analyze website usage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>To remember your login and preferences</li>
            <li>To analyze site traffic and performance</li>
            <li>To improve our services and content</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Managing Cookies</h2>
          <p className="text-muted-foreground">
            You can disable cookies through your browser settings. However,
            disabling cookies may affect some features of the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Changes to Cookie Policy</h2>
          <p className="text-muted-foreground">
            We may update this Cookie Policy from time to time. Changes will be
            posted on this page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Contact Us</h2>
          <p className="text-muted-foreground">
            For questions about this Cookie Policy, contact us at:
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
        </section>
      </div>
    </main>
  );
}
