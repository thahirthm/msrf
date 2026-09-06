"use client";


import { Reveal } from "@/components/site/Reveal";
import { ActionLink, Section, SectionHead } from "@/components/site/Primitives";
import { PageHero } from "@/components/site/PageHero";
import { img, partnership } from "@/lib/site-data";

export default Partner;

function Partner() {
  return (
    <>
      <PageHero
        eyebrow="Technical partner"
        title={
          <>
            Argentinos Juniors — <span className="text-accent">Semillero del Mundo</span>
          </>
        }
        body={partnership.body}
        image={img.ajVisit}
        alt="Argentinos Juniors delegation visiting the academy"
      />

      <Section>
        <div className="grid items-stretch gap-16 lg:grid-cols-[0.8fr_1.1fr]">
          <Reveal className="h-full">
            <div
              className="glass flex h-full w-full flex-col items-center justify-center rounded-[2.5rem] p-12 shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              style={{ borderColor: "color-mix(in oklab, var(--argentina) 40%, transparent)" }}
            >
              <div className="animate-[float_8s_ease-in-out_infinite] flex flex-col items-center justify-center">
                <img
                  src={img.argentinosCrest}
                  alt="Argentinos Juniors club crest"
                  loading="lazy"
                  width={220}
                  height={264}
                  className="h-52 w-auto object-contain drop-shadow-2xl"
                />
                <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  Buenos Aires · {partnership.country}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <SectionHead
              eyebrow="The World's Football Nursery"
              title="A club that has produced global icons"
              body="Argentinos Juniors is renowned for cultivating exceptional football talent and shaping future stars on the global stage. Their academy philosophy — technical mastery first, competitive intelligence second — now underpins the way we coach in Kerala."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {partnership.benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base text-accent">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface">
        <Reveal>
          <SectionHead
            eyebrow="What it means for our players"
            title="An Argentine pathway, delivered in Kerala"
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Accredited coaches",
              body: "Our staff train under AJ-designed, internationally accredited programmes and are re-assessed each season.",
              image: img.training[0],
            },
            {
              title: "Shared methodology",
              body: "Session plans, drills and player evaluation forms follow the AJ model, adapted to Indian conditions.",
              image: img.training[1],
            },
            {
              title: "Exposure trips",
              body: "Exchange visits, camps and friendly fixtures give selected players time in a professional environment.",
              image: img.squad[0],
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <article className="lift group h-full overflow-hidden rounded-3xl border border-border bg-card">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-border px-8 py-16 text-center md:px-16"
            style={{
              background:
                "linear-gradient(120deg, color-mix(in oklab, var(--argentina) 16%, transparent), transparent 65%)",
            }}
          >
            <h2 className="display-lg mx-auto max-w-2xl">Train inside a global methodology</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Places in each age group are limited so coaching ratios stay small. Speak to us about the next intake.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ActionLink href="/contact">Book a trial</ActionLink>
              <ActionLink href="/programs" variant="ghost">
                View programmes
              </ActionLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
