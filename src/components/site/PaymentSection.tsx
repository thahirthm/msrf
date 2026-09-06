"use client";

import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Primitives";
import Link from "next/link";

const steps = [
  { title: "Pay the academy fee", body: "Use UPI, bank transfer or card as shared by the academy office." },
  { title: "Submit your proof", body: "Upload the payment screenshot with the student and payment details." },
  { title: "Get verified", body: "Our team verifies the payment and updates the student's fee status." },
];

export function PaymentSection() {
  return (
    <Section id="payment-confirmation">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -top-1/2 right-0 h-[50vh] w-[40vw] animate-[sweep_14s_ease-in-out_infinite] opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)" }}
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Eyebrow>Fees</Eyebrow>
              <h2 className="display-lg mt-5">Payment Confirmation</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Already completed your fee payment? Submit your payment details and proof so our academy team can
                verify and update your payment status.
              </p>
              <div className="mt-10">
                <Link
                  href="/submit-payment-proof"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold tracking-wide text-accent-foreground transition-all duration-500 hover:brightness-110 hover:shadow-[0_18px_45px_-18px_var(--accent)]"
                >
                  Submit Payment Proof
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card/60 p-5">
                  <p className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    Step 0{index + 1}
                  </p>
                  <h3 className="mt-3 text-base">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
