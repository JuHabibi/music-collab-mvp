"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui";
import { updateCollaborationRequestStatus } from "@/features/collaboration-requests/collaborationRequestRepository";
import type { CollaborationRequestStatus } from "@/features/collaboration-requests/types";
import { supabaseClient } from "@/lib/supabase/client";

type CollaborationRequestActionsProps = {
  requestId: string;
  variant: "received" | "sent";
};

export function CollaborationRequestActions({
  requestId,
  variant,
}: CollaborationRequestActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdate(status: CollaborationRequestStatus) {
    setIsLoading(true);
    setError(null);

    try {
      await updateCollaborationRequestStatus(supabaseClient, requestId, status);
      router.refresh();
    } catch {
      setError("We couldn't update this request.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-wrap gap-2">
        {variant === "received" ? (
          <>
            <Button
              type="button"
              size="sm"
              disabled={isLoading}
              onClick={() => handleUpdate("accepted")}
            >
              Accept
            </Button>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={isLoading}
              onClick={() => handleUpdate("declined")}
            >
              Decline
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isLoading}
            onClick={() => handleUpdate("cancelled")}
          >
            Cancel
          </Button>
        )}
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
