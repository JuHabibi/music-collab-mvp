import Link from "next/link";

import { Container, cn } from "@/components/ui";
import { AmbientBackground } from "@/features/home/components/Background";

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[linear-gradient(to_right,rgba(123,97,255,0.07),rgba(7,10,15,0.72),rgba(64,214,255,0.06))] backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className={cn(
              "font-[var(--font-display)] text-lg tracking-tight",
              "text-white transition hover:text-white/90"
            )}
          >
            Vaultune
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-black shadow-[0_18px_60px_rgba(255,255,255,0.08)] transition hover:bg-white/90"
            >
              Join
            </Link>
          </nav>
        </Container>
      </header>
      {children}
    </div>
  );
}
