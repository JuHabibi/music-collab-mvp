import type { Tables, TablesInsert } from "@/types/supabase";

export type Profile = Tables<"profiles">;

export type ProfileStatus = "draft" | "published" | "hidden";
export type CollaborationMode = "remote" | "local" | "both";
export type CollaborationModeValue = CollaborationMode | "";

export function parseCollaborationMode(
  value: string | undefined,
): CollaborationModeValue {
  if (value === "remote" || value === "local" || value === "both") {
    return value;
  }

  return "";
}

export type SaveProfilePayload = Omit<
  TablesInsert<"profiles">,
  "created_at" | "updated_at" | "publish_status" | "collaboration_mode"
> & {
  publish_status: "draft" | "published";
  collaboration_mode: CollaborationModeValue;
};
