"use client";

import { Button, Container, cn } from "@/components/ui";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavLink = {
  label: string;
  href: string;
  badge?: number;
};

type HeaderClientProps = {
  initialIsAuthed: boolean;
  pendingRequestsCount?: number;
};

export function HeaderClient({
  initialIsAuthed,
  pendingRequestsCount = 0,
}: HeaderClientProps) {
  const router = useRouter();

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [isAuthed, setIsAuthed] = useState(initialIsAuthed);

  useEffect(() => {
    const { data: sub } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session?.user));
      setLoadingAuth(false);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const navLinks = useMemo(() => {
    const base: NavLink[] = [
      { label: "Discover", href: "/discover" },
      { label: "How it works", href: "/#how" },
      { label: "Collaborate", href: "/#collaborate" },
    ];
    if (isAuthed) {
      return [
        ...base,
        {
          label: "Requests",
          href: "/requests",
          badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
        },
        { label: "Onboarding", href: "/onboarding" },
      ];
    }
    return [...base, { label: "Sign in", href: "/login" }];
  }, [isAuthed, pendingRequestsCount]);

  async function onSignOut() {
    setLoadingAuth(true);
    await supabaseClient.auth.signOut();
    router.refresh();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[linear-gradient(to_right,rgba(123,97,255,0.07),rgba(7,10,15,0.72),rgba(64,214,255,0.06))] backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a
            href="/"
            className={cn(
              "font-[var(--font-display)] text-lg tracking-tight",
              "text-white",
            )}
          >
            Vaultune
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
              >
                {l.label}
                {l.badge ? (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-medium leading-none text-white/80">
                    {l.badge}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {loadingAuth ? (
            <div className="h-9 w-44 rounded-full border border-white/10 bg-white/[0.03]" />
          ) : isAuthed ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                href="/discover"
                className="hidden sm:inline-flex"
              >
                Discover
              </Button>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                href="/login"
                className="hidden sm:inline-flex"
              >
                Sign in
              </Button>
              <Button href="/signup" size="sm">
                Join now
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}

