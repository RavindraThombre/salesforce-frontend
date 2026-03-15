export default function AccessibilityPage() {
  return (
    <main className="bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Accessibility Policy</h1>
        <p className="text-muted-foreground text-center">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Our Commitment</h2>
          <p className="text-muted-foreground">
            SalesforceAcademy is committed to ensuring digital accessibility for
            all users, including people with disabilities.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Accessibility Features</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Keyboard navigation support</li>
            <li>Readable fonts and contrast</li>
            <li>Screen reader compatibility</li>
            <li>Responsive and scalable layouts</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Continuous Improvement</h2>
          <p className="text-muted-foreground">
            We continuously work to improve the accessibility of our website
            and ensure compliance with accessibility standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Feedback</h2>
          <p className="text-muted-foreground">
            If you experience any difficulty accessing our website, please let
            us know so we can improve.
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
        </section>
      </div>
    </main>
  );
}
