import { cn } from "@/components/ui";

import {
  IconArrowRight,
  IconPin,
} from "@/features/home/components/Icons";

import { Card, Button } from "@/components/ui";


export type ArtistProfile = {
  name: string;
  role: string;
  location: string;
  matchPct: number;
  influences: [string, string];
  vibe: string;
  goal: string;
  availability: string;
  accent: "violet" | "cyan" | "amber";
};


const accents = {
  violet: "from-violet-300/20 via-violet-200/10 to-transparent",
  cyan: "from-cyan-300/18 via-cyan-200/10 to-transparent",
  amber: "from-amber-300/18 via-amber-200/10 to-transparent"
} as const;

const coverAccents = {
  violet:
    "bg-[radial-gradient(90px_90px_at_20%_30%,rgba(255,255,255,0.22),transparent_55%),radial-gradient(120px_120px_at_80%_70%,rgba(123,97,255,0.30),transparent_60%),linear-gradient(135deg,rgba(123,97,255,0.16),rgba(255,255,255,0.06))]",
  cyan: "bg-[radial-gradient(90px_90px_at_25%_35%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(120px_120px_at_75%_65%,rgba(64,214,255,0.28),transparent_60%),linear-gradient(135deg,rgba(64,214,255,0.14),rgba(255,255,255,0.06))]",
  amber:
    "bg-[radial-gradient(90px_90px_at_25%_35%,rgba(255,255,255,0.16),transparent_55%),radial-gradient(120px_120px_at_75%_65%,rgba(251,191,36,0.26),transparent_60%),linear-gradient(135deg,rgba(251,191,36,0.12),rgba(255,255,255,0.06))]"
} as const;


function MatchRing({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, pct));
  const dash = `${(clamped / 100) * 100.5} 100.5`;

  return (
    <div className="relative h-14 w-14">
      <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90" aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2.5"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="rgba(255,255,255,0.78)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={dash}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">
        {clamped}%
      </div>
    </div>
  );
}

     export function HeroArtistCard({ profile }: { profile: ArtistProfile }) {
    return (
      <Card className={cn("relative overflow-hidden backdrop-blur-0", "p-7")}>
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br",
            accents[profile.accent]
          )}
        />
  
        <div className="relative flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
              <div className={cn("absolute inset-0", coverAccents[profile.accent])} />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white/90">
                {profile.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            </div>
  
            <div>
              <div className="text-base font-semibold text-white">{profile.name}</div>
              <div className="mt-1 text-sm text-paper-muted">{profile.role}</div>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/[0.12] bg-black/30 px-2.5 py-1 text-[11px] text-paper-muted">
                <IconPin className="h-3.5 w-3.5" />
                {profile.location}
              </div>
            </div>
          </div>
  
          <div className="flex flex-col items-end gap-2">
            <div className="text-[11px] text-paper-subtle">Creative match</div>
            <MatchRing pct={profile.matchPct} />
          </div>
        </div>
  
        <div className="relative mt-7 grid gap-4">
          <div className="rounded-2xl border border-white/[0.12] bg-black/22 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="text-[11px] text-paper-subtle">Shared influences</div>
            <div className="mt-2 text-sm">
              <span className="text-paper">{profile.influences[0]}</span>
              <span className="text-paper-subtle"> · </span>
              <span className="text-paper">{profile.influences[1]}</span>
            </div>
          </div>
  
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.13] bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="text-[11px] text-paper-subtle">Vibe</div>
              <div className="text-paper-muted mt-2 text-sm">{profile.vibe}</div>
            </div>
            <div className="rounded-2xl border border-white/[0.13] bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="text-[11px] text-paper-subtle">Goals</div>
              <div className="text-paper-muted mt-2 text-sm">{profile.goal}</div>
            </div>
          </div>
        </div>
  
        <div className="relative mt-6 flex items-center justify-between gap-4">
          <div className="text-sm text-paper-muted">{profile.availability}</div>
          <Button variant="secondary" href="#join" className="h-10 px-4 text-sm">
            View profile
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }
  