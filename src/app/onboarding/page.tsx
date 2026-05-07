import type { Metadata } from "next";

import { OnboardingScreen } from "@/features/onboarding/components/OnboardingScreen";
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
  const { error, data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
   throw error;
  }

  if (profile?.publish_status === "published") {
    const slug = profile.display_name.trim().toLowerCase().replace(/\s+/g, "-");
    redirect(`/artist/${slug}`);
  }
  return <OnboardingScreen initialProfile={profile} initialIsAuthed={true} mode="onboarding" />;
}
