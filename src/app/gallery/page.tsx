"use client";


import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Primitives";
import { PageHero } from "@/components/site/PageHero";
import { galleryCategories, galleryItems, img } from "@/lib/site-data";

export default Gallery;

function Gallery() {
  const [active, setActive] = useState<string>("All");
  const items = galleryItems.filter((item) => active === "All" || item.category === active);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Inside the <span className="text-accent">academy</span>
          </>
        }
        body="Training sessions, match days, academy events and moments from our Argentine partnership."
        image={img.squad[0]}
        alt="Academy players on the pitch"
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
                active === category
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={`${item.caption}-${index}`} delay={(index % 3) * 80}>
              <figure className="lift group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 right-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-accent">{item.category}</p>
                  <p className="mt-2 text-sm font-medium text-on-dark">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
