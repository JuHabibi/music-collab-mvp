import { Badge, Button, Card} from "@/components/ui";;
import type { Profile } from "@/features/profiles/types";


export function ArtistCard({ profile }: { profile: Profile }) {
  const initials = profile.display_name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isRemoteFriendly =
    profile.collaboration_mode === "remote" ||
    profile.collaboration_mode === "both";

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="relative aspect-[4/3]">
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-sm font-semibold text-white/90 backdrop-blur">
              {initials}
            </div>

            {isRemoteFriendly ? (
              <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/75 backdrop-blur">
                Remote friendly
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-6">
          <div className="text-base font-semibold text-white">
            {profile.display_name}
          </div>

          <div className="mt-1 text-sm text-white/65">
            {profile.primary_role}
            {profile.city ? (
              <>
                <span className="mx-2 text-white/35">·</span>
                {profile.city}
              </>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.genres.slice(0, 4).map((genre) => (
              <Badge key={genre} className="bg-white/[0.02] text-white/75">
                {genre}
              </Badge>
            ))}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {profile.looking_for.slice(0, 2).join(", ")}
          </p>

          <div className="mt-6">
            <Button
              href={`/artist/${profile.id}`}
              variant="secondary"
              className="w-full"
            >
              View profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
