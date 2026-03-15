export default function RefundPolicyPage() {
  return (
    <main className="bg-background text-foreground px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Refund Policy</h1>
        <p className="text-muted-foreground text-center">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Overview</h2>
          <p className="text-muted-foreground">
            At SalesforceAcademy, we strive to provide the best learning
            experience. This Refund Policy explains the terms under which
            refunds may be granted for our courses and services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Eligibility for Refund</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>
              Refund requests must be made within <strong>7 days</strong> of
              course enrollment.
            </li>
            <li>
              Refunds are only applicable if less than <strong>20%</strong> of
              the course content has been accessed.
            </li>
            <li>
              Live class attendance beyond the first session makes the course
              non-refundable.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Non-Refundable Situations</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Course completion or certificate issuance</li>
            <li>Failure to attend scheduled live sessions</li>
            <li>Violation of platform terms and policies</li>
            <li>Purchases made under special offers or discounts</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Refund Process</h2>
          <p className="text-muted-foreground">
            To request a refund, please contact our support team with your
            registered email address and payment details at:
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
          <p className="text-muted-foreground">
            Approved refunds will be processed within <strong>7–10
            business days</strong> to the original payment method.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Payment Gateway Charges</h2>
          <p className="text-muted-foreground">
            Transaction and processing fees charged by payment gateways (such
            as Razorpay or Stripe) are non-refundable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            SalesforceAcademy reserves the right to modify this Refund Policy at
            any time. Changes will be effective immediately upon posting on
            this page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions regarding this Refund Policy, please
            contact us at:
          </p>
          <p className="font-medium">support@salesforceacademy.com</p>
        </section>
      </div>
    </main>
  );
}
