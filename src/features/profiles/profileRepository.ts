import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

import type { Profile, SaveProfilePayload } from "./types";

type ProfilesClient = SupabaseClient<Database>;

export async function getOwnProfile(
  supabase: ProfilesClient,
  userId: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublishedProfiles(
  supabase: ProfilesClient,
): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("publish_status", "published");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPublishedProfileById(
  supabase: ProfilesClient,
  id: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .eq("publish_status", "published")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveProfile(
  supabase: ProfilesClient,
  payload: SaveProfilePayload,
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
