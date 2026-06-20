import type { Artist, ArtistAccent } from "./types";

export const artists: Artist[] = [
  {
    name: "Mina R.",
    slug: "mina-r",
    city: "Paris",
    role: "Vocalist",
    genres: ["Neo‑soul", "Alt‑R&B"],
    intent: "Looking for warm toplines + stacked harmonies for an EP.",
    remote: true,
    accent: "violet"
  },
  {
    name: "Solène G.",
    slug: "solene-g",
    city: "Lyon",
    role: "Guitarist",
    genres: ["Funk", "Live sessions"],
    intent: "Tight pocket + tasteful fills for a live recording day.",
    accent: "amber"
  },
  {
    name: "Kaito V.",
    slug: "kaito-v",
    city: "Berlin",
    role: "Producer",
    genres: ["Electronic", "Textures"],
    intent: "Seeking vocal hooks with direction — stems + notes, no chaos.",
    remote: true,
    accent: "cyan"
  },
  {
    name: "Noah D.",
    slug: "noah-d",
    city: "London",
    role: "Bassist",
    genres: ["House", "Disco‑leaning"],
    intent: "Available for groove-first sessions and release-ready takes.",
    accent: "rose"
  },
  {
    name: "Aya K.",
    slug: "aya-k",
    city: "Marseille",
    role: "Singer‑songwriter",
    genres: ["Indie", "Dream pop"],
    intent: "Co-writing melodies with a clear emotional arc and references.",
    remote: true,
    accent: "violet"
  },
  {
    name: "Leo M.",
    slug: "leo-m",
    city: "Brussels",
    role: "Beatmaker",
    genres: ["Hip‑hop", "UK rap"],
    intent: "Wants crisp toplines — send a demo, get a structured reply.",
    accent: "cyan"
  }
];

export const accentCover: Record<ArtistAccent, string> = {
  violet:
    "bg-[radial-gradient(120px_120px_at_20%_25%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(160px_160px_at_85%_70%,rgba(123,97,255,0.28),transparent_62%),linear-gradient(135deg,rgba(123,97,255,0.16),rgba(255,255,255,0.05))]",
  cyan: "bg-[radial-gradient(120px_120px_at_22%_28%,rgba(255,255,255,0.16),transparent_60%),radial-gradient(160px_160px_at_82%_72%,rgba(64,214,255,0.22),transparent_62%),linear-gradient(135deg,rgba(64,214,255,0.12),rgba(255,255,255,0.05))]",
  amber:
    "bg-[radial-gradient(120px_120px_at_22%_28%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(160px_160px_at_82%_72%,rgba(251,191,36,0.20),transparent_62%),linear-gradient(135deg,rgba(251,191,36,0.10),rgba(255,255,255,0.05))]",
  rose: "bg-[radial-gradient(120px_120px_at_22%_28%,rgba(255,255,255,0.14),transparent_60%),radial-gradient(160px_160px_at_82%_72%,rgba(244,114,182,0.18),transparent_62%),linear-gradient(135deg,rgba(244,114,182,0.10),rgba(255,255,255,0.05))]"
};
