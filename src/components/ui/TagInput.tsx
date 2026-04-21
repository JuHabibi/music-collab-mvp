"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { Badge } from "./Badge";
import { Input } from "./Input";

type TagInputProps = {
  id?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
};

export function TagInput({
  id,
  value,
  onChange,
  placeholder = "Type and press Enter…",
  className,
}: TagInputProps) {
  const [draft, setDraft] = React.useState("");

  function addFromDraft() {
    const nextTag = draft.trim();
    if (!nextTag) return;

    if (!value.includes(nextTag)) {
      onChange([...value, nextTag]);
    }

    setDraft("");
  }

  function remove(tag: string) {
    onChange(value.filter((x) => x !== tag));
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

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => remove(tag)}
              className="group"
            >
              <Badge className="cursor-pointer bg-white/[0.04] pr-2 text-white/80 transition hover:bg-white/[0.07]">
                {tag}
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
