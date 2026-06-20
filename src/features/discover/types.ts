export type ArtistAccent = "violet" | "cyan" | "amber" | "rose";

export type Artist = {
  name: string;
  slug: string;
  city: string;
  role: string;
  genres: string[];
  intent: string;
  remote?: boolean;
  accent: ArtistAccent;
};
