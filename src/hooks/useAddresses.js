"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as userService from "@/services/userService";

// Saved addresses for the logged-in user. Used by the account page and checkout.
export function useAddresses() {
  const { user, hydrated } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => setAddresses(userService.getAddresses(user?.id)), [user?.id]);

  useEffect(() => {
    if (!hydrated) return;
    refresh();
    setReady(true);
  }, [hydrated, refresh]);

  const save = useCallback((data) => { const r = userService.saveAddress(user.id, data); refresh(); return r; }, [user?.id, refresh]);
  const remove = useCallback((id) => { userService.deleteAddress(user.id, id); refresh(); }, [user?.id, refresh]);
  const makeDefault = useCallback((id) => { userService.setDefaultAddress(user.id, id); refresh(); }, [user?.id, refresh]);

  return { addresses, ready, save, remove, makeDefault, defaultAddress: addresses.find((a) => a.isDefault) || addresses[0] || null };
}
