// Profile + saved addresses (mock, localStorage).
// Later: replace with /api/users/me and /api/users/me/addresses calls.
import { STORAGE_KEYS, readArray, writeStorage } from "@/utils/storage";
import * as authService from "./authService";

const readAll = () => readArray(STORAGE_KEYS.addresses).filter((a) => a && typeof a.id === "string");

export function getAddresses(userId) {
  if (!userId) return [];
  return readAll().filter((a) => a.userId === userId);
}

// Create (no data.id) or update (data.id). The first address is always the default.
export function saveAddress(userId, data) {
  const all = readAll();
  const mine = all.filter((a) => a.userId === userId);
  const isFirst = mine.length === 0;
  const makeDefault = isFirst || !!data.isDefault;
  const id = data.id || `addr-${Date.now()}`;
  const record = { ...data, id, userId, isDefault: makeDefault || (mine.find((a) => a.id === id)?.isDefault ?? false) };

  let next = data.id ? all.map((a) => (a.id === id ? record : a)) : [...all, record];
  if (record.isDefault) next = next.map((a) => (a.userId === userId && a.id !== id ? { ...a, isDefault: false } : a));
  writeStorage(STORAGE_KEYS.addresses, next);
  return record;
}

export function deleteAddress(userId, id) {
  let next = readAll().filter((a) => !(a.userId === userId && a.id === id));
  const mine = next.filter((a) => a.userId === userId);
  if (mine.length > 0 && !mine.some((a) => a.isDefault)) {
    next = next.map((a) => (a.id === mine[0].id ? { ...a, isDefault: true } : a)); // promote another
  }
  writeStorage(STORAGE_KEYS.addresses, next);
}

export function setDefaultAddress(userId, id) {
  writeStorage(
    STORAGE_KEYS.addresses,
    readAll().map((a) => (a.userId === userId ? { ...a, isDefault: a.id === id } : a))
  );
}

export const updateProfile = (userId, patch) => authService.updateUser(userId, patch);
export const changePassword = (userId, current, next) => authService.changePassword(userId, current, next);

// Removes the account plus this user's addresses and orders
export async function deleteAccount(userId) {
  await authService.deleteUser(userId);
  writeStorage(STORAGE_KEYS.addresses, readAll().filter((a) => a.userId !== userId));
  writeStorage(STORAGE_KEYS.orders, readArray(STORAGE_KEYS.orders).filter((o) => o.userId !== userId));
}
