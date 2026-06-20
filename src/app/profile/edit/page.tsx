import { OnboardingScreen } from "@/features/onboarding/components/OnboardingScreen";
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
    const { error, data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
    if (error) {
        throw error;
    }
    if (!profile) {
        redirect("/onboarding");
    }
    return <OnboardingScreen initialProfile={profile} initialIsAuthed={true} mode="edit" />;
}