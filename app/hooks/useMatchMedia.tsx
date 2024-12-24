"use client";

import { useEffect, useState, useCallback } from "react";

export default function useMatchMedia(query: string, defaultState?: boolean) {
  const [state, setState] = useState(() => {
    if (defaultState !== undefined) {
      return defaultState;
    }

    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  });

  // Create a stable callback for the media query handler
  const handleChange = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      setState(e.matches);
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // Set initial state
    handleChange(media);

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [query, handleChange]);

  return state;
}
