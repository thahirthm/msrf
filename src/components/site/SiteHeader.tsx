"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { club, img } from "@/lib/site-data";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programmes" },
  { to: "/partner", label: "Technical Partner" },
  { to: "/gallery", label: "Gallery" },
  { to: "/career", label: "Career" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 md:px-6">
        <div
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-700 ${
            scrolled || open ? "glass" : "border border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={img.logo}
              alt={`${club.short} crest`}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="hidden leading-tight sm:block">
              <span className="block font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-tight">
                Malabar Challengers
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                Football Club
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const isActive = item.to === "/" ? pathname === "/" : pathname?.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={`accent-underline text-[0.82rem] font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="glass flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div className="glass mt-2 rounded-3xl p-4 lg:hidden">
            <div className="flex flex-col">
              {nav.map((item) => {
                const isActive = item.to === "/" ? pathname === "/" : pathname?.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className={`border-b border-border/60 py-3 text-sm font-medium last:border-0 ${
                      isActive ? "text-accent" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
