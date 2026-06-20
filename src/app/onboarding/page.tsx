import type { Metadata } from "next";

import { OnboardingScreen } from "@/features/onboarding/components/OnboardingScreen";
import { getOwnProfile } from "@/features/profiles/profileRepository";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Build your profile — Vaultune",
  description:
    "Complete your Vaultune profile to get better collaboration matches.",
};

export default async function OnboardingPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }
  const profile = await getOwnProfile(supabase, user.id);

  if (profile?.publish_status === "published") {
    const slug = profile.display_name.trim().toLowerCase().replace(/\s+/g, "-");
    redirect(`/artist/${slug}`);
  }
  return <OnboardingScreen initialProfile={profile} initialIsAuthed={true} mode="onboarding" />;
}
