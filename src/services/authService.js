// ============================================================================
// DEMO / MOCK AUTHENTICATION SERVICE — NOT SECURE.
// ----------------------------------------------------------------------------
import { STORAGE_KEYS, readArray, readStorage, writeStorage } from "@/utils/storage";

export const DEMO_CREDENTIALS = { email: "demo@urbanbite.com", password: "demo1234" };

function mockHash(email, password) {
  const input = `${email.toLowerCase()}::${password}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

const demoUser = {
  id: "user-demo",
  name: "Demo Customer",
  email: DEMO_CREDENTIALS.email,
  phone: "+8801700000000",
  passwordHash: mockHash(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password),
  createdAt: "2026-01-01T00:00:00.000Z",
};

const wait = (ms = 450) => new Promise((r) => setTimeout(r, ms)); 
const normalizeEmail = (e) => String(e || "").trim().toLowerCase();

function getUsers() {
  const stored = readArray(STORAGE_KEYS.users).filter((u) => u && typeof u.email === "string");
  return stored.some((u) => u.email === demoUser.email) ? stored : [demoUser, ...stored];
}

// Never expose the password hash to the UI
const toPublicUser = ({ passwordHash, ...user }) => user;

function fail(message, field) {
  const err = new Error(message);
  if (field) err.field = field;
  return err;
}

export async function login({ email, password }) {
  await wait();
  const user = getUsers().find((u) => u.email === normalizeEmail(email));
  if (!user || user.passwordHash !== mockHash(normalizeEmail(email), password)) {
    throw fail("Email or password is incorrect. Check your details and try again.");
  }
  return toPublicUser(user);
}

export async function register({ name, email, phone, password }) {
  await wait();
  const cleanEmail = normalizeEmail(email);
  const users = getUsers();
  if (users.some((u) => u.email === cleanEmail)) {
    throw fail("An account with this email already exists. Try logging in instead.", "email");
  }
  const user = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    phone: phone.trim(),
    passwordHash: mockHash(cleanEmail, password),
    createdAt: new Date().toISOString(),
  };
  writeStorage(STORAGE_KEYS.users, [...readArray(STORAGE_KEYS.users), user]);
  return toPublicUser(user);
}

// Demo: no email is actually sent.
// account exists
export async function requestPasswordReset(email) {
  await wait();
  return { ok: true, email: normalizeEmail(email) };
}

// ---- Account management ------------------------
const DEFAULT_PREFERENCES = { orderUpdates: true, promotions: false };

export async function updateUser(userId, patch) {
  await wait(300);
  const users = getUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) throw fail("We couldn't find your account. Please log in again.");
  const allowed = {};
  if (patch.name !== undefined) allowed.name = patch.name.trim();
  if (patch.phone !== undefined) allowed.phone = patch.phone.trim();
  if (patch.preferences) allowed.preferences = { ...DEFAULT_PREFERENCES, ...users[index].preferences, ...patch.preferences };
  users[index] = { ...users[index], ...allowed };
  writeStorage(STORAGE_KEYS.users, users);
  return toPublicUser(users[index]);
}

export async function changePassword(userId, currentPassword, newPassword) {
  await wait(400);
  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) throw fail("We couldn't find your account. Please log in again.");
  if (user.passwordHash !== mockHash(user.email, currentPassword)) {
    throw fail("Your current password is incorrect.", "current");
  }
  user.passwordHash = mockHash(user.email, newPassword);
  writeStorage(STORAGE_KEYS.users, users);
  return true;
}

export async function deleteUser(userId) {
  await wait(300);
  if (userId === demoUser.id) throw fail("The demo account can't be deleted. Create your own account to try this.");
  writeStorage(STORAGE_KEYS.users, readArray(STORAGE_KEYS.users).filter((u) => u.id !== userId));
  return true;
}

export { DEFAULT_PREFERENCES };
