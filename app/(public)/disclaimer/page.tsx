export default function DisclaimerPage() {
  return (
    <main className="bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Disclaimer</h1>
        <p className="text-muted-foreground text-center">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. General Information</h2>
          <p className="text-muted-foreground">
            The information provided on SalesforceAcademy is for educational
            purposes only. While we strive for accuracy, we make no guarantees
            regarding completeness or correctness of content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. No Professional Advice</h2>
          <p className="text-muted-foreground">
            Our courses and materials do not constitute professional or legal
            advice. Always seek appropriate professional guidance for career
            or business decisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. External Links</h2>
          <p className="text-muted-foreground">
            Our website may contain links to third-party websites. We do not
            control or endorse the content of these external sites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            SalesforceAcademy is not responsible for any losses or damages
            arising from the use of our content or services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Disclaimer, contact us at:
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
        </section>
      </div>
    </main>
  );
}
