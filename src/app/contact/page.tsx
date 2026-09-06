"use client";


import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHead } from "@/components/site/Primitives";
import { PageHero } from "@/components/site/PageHero";
import { club, img, programs } from "@/lib/site-data";

export default Contact;

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Book a <span className="text-accent">trial</span>
          </>
        }
        body="Tell us about your child's age and experience, and our academy team will get back with the next available batch."
        image={img.training[0]}
        alt="Academy coach with young players"
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHead eyebrow="Enquiry form" title="Tell us about the player" />
            {sent ? (
              <div className="glass mt-10 rounded-3xl p-8">
                <p className="text-lg font-semibold text-accent">Thank you — enquiry noted.</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Our academy team will contact you shortly. For anything urgent, call {club.phone}.
                </p>
              </div>
            ) : (
              <form
                className="mt-10 grid gap-5 sm:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <label className="text-sm">
                  <span className="text-muted-foreground">Parent / guardian name</span>
                  <input
                    required
                    maxLength={120}
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Player name</span>
                  <input
                    required
                    maxLength={120}
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Phone</span>
                  <input
                    required
                    type="tel"
                    maxLength={20}
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <input
                    required
                    type="email"
                    maxLength={255}
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="text-muted-foreground">Programme of interest</span>
                  <select
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    defaultValue={programs[0]?.name}
                  >
                    {programs.map((program) => (
                      <option key={program.slug} value={program.name}>
                        {program.name} · {program.age}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="text-muted-foreground">Message</span>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-500 hover:brightness-110 sm:w-auto"
                  >
                    Submit enquiry
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={140}>
            <div className="glass rounded-3xl p-8">
              <p className="eyebrow">Academy office</p>
              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <a href={`tel:${club.phoneHref}`} className="mt-1 block text-base hover:text-accent">
                    {club.phone}
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <a href={`mailto:${club.email}`} className="mt-1 block text-base hover:text-accent">
                    {club.email}
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground">Base</p>
                  <p className="mt-1 text-base">{club.base}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Office hours</p>
                  <p className="mt-1 text-base">{club.hours}</p>
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                <img
                  src={img.squad[2]}
                  alt="Academy gathering in Kozhikode"
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
