import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { DiscoverScreen } from "@/features/discover/components/DiscoverScreen";
import { getPublishedProfiles } from "@/features/profiles/profileRepository";
import { supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Discover — Vaultune",
  description:
    "Browse musicians by vibe, role, genre, location and creative goals — UI preview only."
};

export default async function DiscoverPage() {
  const supabase = await supabaseServer();
  const profiles = await getPublishedProfiles(supabase);

  if (!profiles || profiles.length === 0) {
    return (
      <Container className="py-16">
        <div className="text-center text-white/60">
          No artists published yet.
        </div>
      </Container>
    );
  }
  
  return <DiscoverScreen profiles={profiles} />;
}
