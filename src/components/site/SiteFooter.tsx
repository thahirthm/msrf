"use client";

import Link from "next/link";
import { club, img } from "@/lib/site-data";
import { BallIcon } from "./Primitives";

const columns = [
  {
    title: "Club",
    links: [
      { to: "/about", label: "About us" },
      { to: "/career", label: "Careers" },
      { to: "/partner", label: "Argentinos Juniors" },
    ],
  },
  {
    title: "Academy",
    links: [
      { to: "/programs", label: "Programmes" },
      { to: "/gallery", label: "Gallery" },
      { to: "/contact", label: "Trials & admissions" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface text-foreground py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand & Contact */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-4">
              <img
                src={img.logo}
                alt={`${club.short} crest`}
                loading="lazy"
                className="h-16 w-16 rounded-full object-cover shadow-sm"
              />
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-widest text-on-dark">
                  Malabar Challengers
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  Football Club · {club.malayalam}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-4 group">
                <span className="text-accent/60 font-black">T.</span>
                <a href={`tel:${club.phoneHref}`} className="group-hover:text-accent transition-colors">
                  {club.phone}
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="text-accent/60 font-black">E.</span>
                <a href={`mailto:${club.email}`} className="group-hover:text-accent transition-colors">
                  {club.email}
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="text-accent/60 font-black">W.</span>
                <span className="group-hover:text-accent transition-colors cursor-default">
                  {club.website}
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8 lg:ml-auto">
            {columns.map((column) => (
              <div key={column.title} className="min-w-[140px]">
                <h4 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-on-dark">
                  {column.title}
                </h4>
                <ul className="mt-6 space-y-4 text-sm font-medium text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link href={link.to} className="transition-colors hover:text-accent">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {club.foundation}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <BallIcon className="h-4 w-4 animate-[roll_6s_linear_infinite] text-accent" />
            <span className="text-white/60">Crafted by Zuarak</span>
          </div>

          <a href="#top" className="hover:text-accent transition-colors text-center md:text-right">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
