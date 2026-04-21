import { HeaderClient } from "@/components/HeaderClient";
import { supabaseServer } from "@/lib/supabase/server";

export async function ServerHeader() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <HeaderClient initialIsAuthed={Boolean(user)} />;
}

