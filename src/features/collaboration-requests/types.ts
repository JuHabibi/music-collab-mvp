import type { Tables, TablesInsert } from "@/types/supabase";

export type CollaborationRequest = Tables<"collaboration_requests">;

export type CollaborationRequestProfileSummary = Pick<
  Tables<"profiles">,
  "id" | "display_name" | "primary_role" | "city"
>;

export type ReceivedCollaborationRequest = CollaborationRequest & {
  sender: CollaborationRequestProfileSummary | null;
};

export type SentCollaborationRequest = CollaborationRequest & {
  receiver: CollaborationRequestProfileSummary | null;
};
export type CollaborationRequestStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "cancelled";

export type CreateCollaborationRequestPayload = Pick<
  TablesInsert<"collaboration_requests">,
  "sender_id" | "receiver_id" | "message"
>;

export type UpdateCollaborationRequestStatusPayload = {
  status: CollaborationRequestStatus;
};
