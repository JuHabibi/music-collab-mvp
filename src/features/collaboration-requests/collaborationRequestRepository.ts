import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

import type {
  CollaborationRequest,
  CollaborationRequestStatus,
  CreateCollaborationRequestPayload,
  ReceivedCollaborationRequest,
  SentCollaborationRequest,
} from "./types";

const PROFILE_SUMMARY_FIELDS =
  "id, display_name, primary_role, city" as const;

type CollaborationRequestsClient = SupabaseClient<Database>;

export async function createCollaborationRequest(
  supabase: CollaborationRequestsClient,
  payload: CreateCollaborationRequestPayload,
): Promise<CollaborationRequest> {
  const { data, error } = await supabase
    .from("collaboration_requests")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getReceivedCollaborationRequests(
  supabase: CollaborationRequestsClient,
  userId: string,
): Promise<ReceivedCollaborationRequest[]> {
  const { data, error } = await supabase
    .from("collaboration_requests")
    .select(
      `*, sender:profiles!collaboration_requests_sender_id_fkey(${PROFILE_SUMMARY_FIELDS})`,
    )
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getSentCollaborationRequests(
  supabase: CollaborationRequestsClient,
  userId: string,
): Promise<SentCollaborationRequest[]> {
  const { data, error } = await supabase
    .from("collaboration_requests")
    .select(
      `*, receiver:profiles!collaboration_requests_receiver_id_fkey(${PROFILE_SUMMARY_FIELDS})`,
    )
    .eq("sender_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPendingReceivedCollaborationRequestCount(
  supabase: CollaborationRequestsClient,
  userId: string,
): Promise<number> {
  const { count, error } = await supabase
    .from("collaboration_requests")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", userId)
    .eq("status", "pending");

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function updateCollaborationRequestStatus(
  supabase: CollaborationRequestsClient,
  requestId: string,
  status: CollaborationRequestStatus,
): Promise<CollaborationRequest> {
  const { data, error } = await supabase
    .from("collaboration_requests")
    .update({ status })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
