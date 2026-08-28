import { HeaderClient } from "@/components/HeaderClient";
import { getPendingReceivedCollaborationRequestCount } from "@/features/collaboration-requests/collaborationRequestRepository";
import { supabaseServer } from "@/lib/supabase/server";

export async function ServerHeader() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pendingRequestsCount = user
    ? await getPendingReceivedCollaborationRequestCount(supabase, user.id)
    : 0;

  return (
    <HeaderClient
      initialIsAuthed={Boolean(user)}
      pendingRequestsCount={pendingRequestsCount}
    />
  );
}

