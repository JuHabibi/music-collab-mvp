import { OnboardingScreen } from "@/features/onboarding/components/OnboardingScreen";
import { getOwnProfile } from "@/features/profiles/profileRepository";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
    const supabase = await supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      redirect("/login");
    }
    const profile = await getOwnProfile(supabase, user.id);
    if (!profile) {
        redirect("/onboarding");
    }
    return <OnboardingScreen initialProfile={profile} initialIsAuthed={true} mode="edit" />;
}