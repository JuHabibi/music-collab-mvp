"use client";

import { HeaderClient } from "@/components/HeaderClient";

type HeaderProps = {
  initialIsAuthed?: boolean;
};

export function Header({ initialIsAuthed = false }: HeaderProps) {
  return <HeaderClient initialIsAuthed={initialIsAuthed} />;
}
