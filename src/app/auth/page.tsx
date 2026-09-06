"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export default AuthPage;
  };

  return (
    <section className="flex min-h-[100svh] items-center justify-center px-6 py-32">
      <div className="glass w-full max-w-md rounded-3xl p-8 md:p-10">
        <p className="eyebrow">Academy team</p>
        <h1 className="display-lg mt-4 text-3xl">{mode === "signin" ? "Staff sign in" : "Create staff account"}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Admin access to fee collection and payment verification.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={google}
          className="mt-4 w-full rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-accent"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}
