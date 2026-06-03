"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "design-library-author";

export function useAuthorIdentity() {
  const [author, setAuthorState] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setAuthorState(stored ?? "");
  }, []);

  function setAuthor(name: string) {
    const trimmed = name.trim();
    localStorage.setItem(STORAGE_KEY, trimmed);
    setAuthorState(trimmed);
  }

  return { author, setAuthor };
}
