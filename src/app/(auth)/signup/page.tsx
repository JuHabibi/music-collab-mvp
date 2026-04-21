import { SignupScreen } from "@/features/auth/components/SignupScreen";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/onboarding");
  }

  return <SignupScreen />;
}
