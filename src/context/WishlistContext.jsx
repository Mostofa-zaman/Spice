"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { STORAGE_KEYS, readArray, writeStorage } from "@/utils/storage";

const WishlistContext = createContext(null);

// Stores product IDs only; product details are looked up from the product service.
export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readArray(STORAGE_KEYS.wishlist).filter((id) => typeof id === "string"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.wishlist, ids);
  }, [ids, hydrated]);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const add = useCallback((product) => {
    setIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
    toast.success("Added to wishlist", { description: product.name });
  }, []);

  const remove = useCallback((product, { silent = false } = {}) => {
    setIds((prev) => prev.filter((id) => id !== product.id));
    if (!silent) toast("Removed from wishlist", { description: product.name });
  }, []);

  const toggle = useCallback(
    (product) => (ids.includes(product.id) ? remove(product) : add(product)),
    [ids, add, remove]
  );

  const value = useMemo(
    () => ({ ids, count: ids.length, hydrated, has, add, remove, toggle }),
    [ids, hydrated, has, add, remove, toggle]
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
