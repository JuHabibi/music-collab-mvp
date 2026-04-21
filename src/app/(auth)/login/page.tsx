import { LoginScreen } from "@/features/auth/components/LoginScreen";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/onboarding");
  }

  return <LoginScreen />;
}
