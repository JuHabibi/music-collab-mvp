export type ProfileStatus = "draft" | "published" | "hidden";
export type CollaborationMode = "remote" | "local" | "both";

export type Profile = {
  id: string;
  display_name: string;
  primary_role: string;
  genres: string[];
  looking_for: string[];
  availability: string;
  collaboration_mode: CollaborationMode;
  city: string | null;
  bio: string | null;
  influences: string[];
  portfolio_links: string[];
  publish_status: ProfileStatus;
  created_at?: string;
  updated_at?: string;
};