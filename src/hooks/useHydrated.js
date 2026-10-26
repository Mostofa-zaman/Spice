"use client";
import { useEffect, useState } from "react";

// False on the server and during the first render, true once React is running in the browser.

export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
