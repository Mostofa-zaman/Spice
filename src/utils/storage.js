// Central, SSR-safe localStorage / sessionStorage helpers.
// Every read/write in the app goes through here, so replacing it later is easy.

export const STORAGE_KEYS = {
  cart: "urbanbite_cart",
  coupon: "urbanbite_coupon",
  wishlist: "urbanbite_wishlist",
  user: "urbanbite_user",
  users: "urbanbite_users", // mock "database" of registered demo users
  orders: "urbanbite_orders",
  addresses: "urbanbite_addresses",
  rememberMe: "urbanbite_remember_me",
  messages: "urbanbite_messages", // contact form messages (demo)
};

const canUseStorage = () => typeof window !== "undefined";

function pick(type) {
  try {
    return type === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null; // e.g. storage blocked by the browser
  }
}

export function readStorage(key, fallback = null, type = "local") {
  if (!canUseStorage()) return fallback;
  try {
    const store = pick(type);
    const raw = store ? store.getItem(key) : null;
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value, type = "local") {
  if (!canUseStorage()) return;
  try {
    const store = pick(type);
    if (store) store.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — ignore so the UI never crashes */
  }
}

export function removeStorage(key, type = "local") {
  if (!canUseStorage()) return;
  try {
    const store = pick(type);
    if (store) store.removeItem(key);
  } catch {
    /* ignore */
  }
}

// Always returns an array, even if the saved data is missing or corrupted.
export function readArray(key, type = "local") {
  const value = readStorage(key, [], type);
  return Array.isArray(value) ? value : [];
}

// Removes every Urban Bite item from the browser (used by the "reset saved data" button on error screens).
export function clearAllAppData() {
  if (!canUseStorage()) return;
  ["local", "session"].forEach((type) => {
    try {
      const store = pick(type);
      if (!store) return;
      Object.keys(store).filter((k) => k.startsWith("urbanbite_")).forEach((k) => store.removeItem(k));
    } catch { /* ignore */ }
  });
}
