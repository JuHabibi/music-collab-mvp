"use client";

import { useState } from "react";

import { Button, Label, Textarea } from "@/components/ui";
import { createCollaborationRequest } from "@/features/collaboration-requests/collaborationRequestRepository";
import { supabaseClient } from "@/lib/supabase/client";

type InviteToCollaborateProps = {
  receiverId: string;
};

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "23505"
  );
}

export function InviteToCollaborate({ receiverId }: InviteToCollaborateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCancel = () => {
    setIsOpen(false);
    setMessage("");
    setValidationError(null);
    setFeedback(null);
  };

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();

    setValidationError(null);
    setFeedback(null);

    if (!trimmedMessage) {
      setValidationError("Message is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        setFeedback("Please sign in to send a request.");
        return;
      }

      await createCollaborationRequest(supabaseClient, {
        sender_id: user.id,
        receiver_id: receiverId,
        message: trimmedMessage,
      });

      setIsSent(true);
      setIsOpen(false);
      setMessage("");
    } catch (error) {
      if (isUniqueViolation(error)) {
        setFeedback("You already sent a collaboration request.");
      } else {
        setFeedback("We couldn’t send your request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return <p className="text-sm text-green-400">Request sent.</p>;
  }

  if (!isOpen) {
    return (
      <div className="space-y-2">
        <Button type="button" onClick={() => setIsOpen(true)}>
          Invite to collaborate
        </Button>
        {feedback ? <p className="text-sm text-red-400">{feedback}</p> : null}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="collaboration-message">Your message</Label>
        <Textarea
          id="collaboration-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell them what you have in mind..."
          disabled={isSubmitting}
          rows={4}
        />
        {validationError ? (
          <p className="text-sm text-red-400">{validationError}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send request"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>

      {feedback ? <p className="text-sm text-red-400">{feedback}</p> : null}
    </div>
  );
}
