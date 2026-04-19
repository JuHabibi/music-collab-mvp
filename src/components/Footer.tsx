import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <a
            href="/"
            className="inline-block font-[var(--font-display)] text-lg tracking-tight text-white transition hover:text-white/90"
          >
            Vaultune
          </a>
          <div className="mt-1 text-sm text-white/55">
            A calmer place to find collaborators and build music.
          </div>
        </div>
        <div className="text-sm text-white/45">
          © {new Date().getFullYear()} Vaultune. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
