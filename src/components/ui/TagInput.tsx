"use client";

import * as React from "react";

import { Badge } from "./Badge";
import { cn } from "../../lib/cn";
import { Input } from "./Input";

export function TagInput({
  id,
  placeholder = "Type and press Enter…",
  className
}: {
  id?: string;
  placeholder?: string;
  className?: string;
}) {
  const [tags, setTags] = React.useState<string[]>([]);
  const [draft, setDraft] = React.useState("");

  function addFromDraft() {
    const t = draft.trim();
    if (!t) return;
    setTags((prev) => (prev.includes(t) ? prev : [...prev, t]));
    setDraft("");
  }

  function remove(tag: string) {
    setTags((prev) => prev.filter((x) => x !== tag));
  }

  return (
    <div className={cn("space-y-3", className)}>
      <Input
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addFromDraft();
          }
        }}
        placeholder={placeholder}
        autoComplete="off"
      />
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => remove(t)}
              className="group"
            >
              <Badge className="cursor-pointer bg-white/[0.04] pr-2 text-white/80 transition hover:bg-white/[0.07]">
                {t}
                <span
                  className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white/45 group-hover:text-white/70"
                  aria-hidden
                >
                  ×
                </span>
              </Badge>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-white/40">
          Add artists, albums, or scenes that shape your sound.
        </p>
      )}
    </div>
  );
}
