import { Button, Container, cn } from "@/components/ui";

const links = [
  { label: "Discover", href: "/discover" },
  { label: "How it works", href: "/#how" },
  { label: "Collaborate", href: "/#collaborate" },
  { label: "Sign in", href: "/login" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[linear-gradient(to_right,rgba(123,97,255,0.07),rgba(7,10,15,0.72),rgba(64,214,255,0.06))] backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a
            href="/"
            className={cn(
              "font-[var(--font-display)] text-lg tracking-tight",
              "text-white"
            )}
          >
            Vaultune
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
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
        </div>
      </Container>
    </header>
  );
}
