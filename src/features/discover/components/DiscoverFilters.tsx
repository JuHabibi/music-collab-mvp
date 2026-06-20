"use client";

import { Container } from "@/components/ui";

type DiscoverFiltersProps = {
  summary: string;
  search: string;
  selectedRole: string;
  selectedGenre: string;
  roleOptions: string[];
  genreOptions: string[];
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
};

export function DiscoverFilters({
  search,
  onResetFilters,
  hasActiveFilters,
  selectedRole,
  selectedGenre,
  roleOptions,
  genreOptions,
  onSearchChange,
  onRoleChange,
  onGenreChange,
}: DiscoverFiltersProps) {
  return (
    <section className="relative">
      <Container className="py-10 md:py-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-12">
            <label className="text-xs font-medium tracking-wide text-white/55">
              Search
            </label>
            
            <div className="mt-2">
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search vocalists, producers, guitarists..."
                className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/20"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
            >
              <option value="">Any role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
            >
              <option value="">Any genre</option>
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-sm text-white/60 underline hover:text-white"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
