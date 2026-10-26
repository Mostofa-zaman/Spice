"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Read / update the URL query string without a full page reload.
export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Always reads the live URL so quick consecutive updates never overwrite each other.
  const setParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" || value === false) params.delete(key);
        else params.set(key, value === true ? "1" : String(value));
      });
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  return { searchParams, setParams, pathname };
}

// A text input that stays in sync with a URL param, updating the URL after a short pause.
export function useDebouncedQueryParam(key, delay = 300) {
  const { searchParams, setParams } = useQueryParams();
  const urlValue = searchParams.get(key) || "";
  const [text, setText] = useState(urlValue);
  const lastPushed = useRef(urlValue);

  // URL changed from elsewhere (navbar search, clear filters) -> update the input
  useEffect(() => {
    if (urlValue !== lastPushed.current) {
      lastPushed.current = urlValue;
      setText(urlValue);
    }
  }, [urlValue]);

  // Typing -> update the URL after `delay`
  useEffect(() => {
    if (text === lastPushed.current) return;
    const t = setTimeout(() => {
      lastPushed.current = text;
      setParams({ [key]: text.trim() });
    }, delay);
    return () => clearTimeout(t);
  }, [text, key, delay, setParams]);

  return [text, setText];
}
