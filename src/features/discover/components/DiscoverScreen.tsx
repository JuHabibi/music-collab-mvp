"use client";

import { Footer } from "@/components/Footer";

import { Container } from "@/components/ui";
import { AmbientBackground } from "@/features/home/components/Background";

import { ArtistCard } from "./ArtistCard";
import { DiscoverFilters } from "./DiscoverFilters";
import { DiscoverHero } from "./DiscoverHero";
import type { Profile } from "@/features/profiles/types";
import { useState } from "react";
import { Header } from "@/components/Header";

export function DiscoverScreen({ profiles }: { profiles: Profile[] }) {
  const roleOptions = Array.from(
    new Set(profiles.map((profile) => profile.primary_role).filter(Boolean)),
  ).sort();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
 
  const genreOptions = Array.from(
    new Set(profiles.flatMap((profile) => profile.genres).filter(Boolean)),
  ).sort();

  const normalize = (value: string) => value.trim().toLowerCase();

  const filteredProfiles = profiles.filter((profile) => {
    const query = normalize(search);
  
    const searchableText = [
      profile.display_name,
      profile.primary_role,
      profile.city ?? "",
      ...profile.genres,
      ...profile.influences,
      ...profile.looking_for,
    ]
      .map(normalize)
      .join(" ");

    const matchesSearch = !query || searchableText.includes(query);
  
    const matchesRole =
      !selectedRole ||
      normalize(profile.primary_role) === normalize(selectedRole);
  
    const matchesGenre =
      !selectedGenre ||
      profile.genres.some(
        (genre) => normalize(genre) === normalize(selectedGenre)
      );
    return matchesSearch && matchesRole && matchesGenre;
  });
  const hasActiveFilters =
  search !== "" ||
  selectedRole !== "" ||
  selectedGenre !== "";


  const summary = `${filteredProfiles.length} profiles found`;

  return (
    <main className="relative">
      <AmbientBackground />
      <Header initialIsAuthed={true} />
      <DiscoverHero />
      <DiscoverFilters
        summary={summary}
        search={search}
        onResetFilters={() => {
          setSearch("");
          setSelectedRole("");
          setSelectedGenre("");
        }}
        hasActiveFilters={hasActiveFilters}
        selectedRole={selectedRole}
        selectedGenre={selectedGenre}
        roleOptions={roleOptions}
        genreOptions={genreOptions}
        onSearchChange={setSearch}
        onRoleChange={setSelectedRole}
        onGenreChange={setSelectedGenre}
      />
      <section className="relative pb-16 md:pb-20">
        <Container>
          {filteredProfiles.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProfiles.map((profile) => (
                <ArtistCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/60">
              No artists match these filters.
            </div>
          )}
        </Container>
      </section>
      <Footer />
    </main>
  );
}
