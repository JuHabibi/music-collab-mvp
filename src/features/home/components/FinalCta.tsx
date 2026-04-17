import { IconArrowRight } from "./Icons";
import { Button, Container } from "@/components/ui";

export function FinalCta() {
  return (
    <section id="join" className="py-16 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-glow backdrop-blur md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_10%,rgba(123,97,255,0.22),transparent_60%),radial-gradient(900px_480px_at_80%_60%,rgba(64,214,255,0.14),transparent_60%)]"
          />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <div className="text-xs font-medium tracking-wide text-white/55">
                Find your next creative match
              </div>
              <h2 className="mt-2 font-[var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl">
                Chemistry first. Tracks after.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
                Create a profile in minutes. Share what you’re building, your
                influences, and your workflow — then meet collaborators who fit
                your vibe and your ambition.
              </p>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <Button href="#join" className="w-full md:w-auto">
                Create your profile
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

