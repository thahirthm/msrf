"use client";

import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { JobApplicationDialog } from "@/components/site/JobApplicationDialog";

// Dummy data for job listings
const jobs = [
  {
    id: "1",
    title: "Academy Head Coach",
    location: "Kozhikode, Kerala",
    description: "Lead the technical development of our youth teams, implement the Argentinos Juniors methodology, and mentor junior coaching staff.",
    status: "Open",
    postedOn: "2023-10-01",
  },
  {
    id: "2",
    title: "Sports Physiotherapist",
    location: "Kozhikode, Kerala",
    description: "Manage player health, injury prevention protocols, and rehabilitation programs for the entire academy.",
    status: "Open",
    postedOn: "2023-10-15",
  },
  {
    id: "3",
    title: "Academy Manager",
    location: "Kozhikode, Kerala",
    description: "Oversee daily operations, logistics, and parent communications for the academy.",
    status: "Closed",
    postedOn: "2023-08-20",
  },
  {
    id: "4",
    title: "Youth Scout",
    location: "Kerala (Statewide)",
    description: "Identify and recruit top emerging football talent across various districts in Kerala.",
    status: "Open",
    postedOn: "2023-10-25",
  }
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Join our <span className="text-accent">mission</span>
          </>
        }
        body="We are always looking for passionate, driven professionals to help us build a world-class football academy and shape the future of Indian football."
        image="/career_banner_bg.png"
        alt="Coach shaking hands with player"
      />

      <Section className="bg-surface">
        <Reveal>
          <SectionHead
            eyebrow="Open Positions"
            title="Come work with us"
            body="Explore our current job openings below. If you don't see a perfect fit but believe you can contribute to our vision, feel free to reach out."
          />
        </Reveal>

        <div className="mt-16 grid gap-6">
          {jobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 90}>
              <div className="group relative flex flex-col justify-between gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-white/10 sm:flex-row sm:items-center sm:p-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                        job.status === "Open"
                          ? "bg-accent/10 text-accent ring-1 ring-accent/30"
                          : "bg-muted text-muted-foreground ring-1 ring-border"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {job.location}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>Posted: {new Date(job.postedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">
                    {job.description}
                  </p>
                </div>

                <div className="shrink-0">
                  {job.status === "Open" ? (
                    <JobApplicationDialog
                      jobTitle={job.title}
                      trigger={
                        <button
                          type="button"
                          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_-5px_var(--accent)]"
                        >
                          Apply Now
                        </button>
                      }
                    />
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                    >
                      Closed
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
