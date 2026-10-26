// Contact form (demo). 
// Later: POST /api/contact 
import { STORAGE_KEYS, readArray, writeStorage } from "@/utils/storage";

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export async function sendMessage(data) {
  await wait();
  const message = { id: `msg-${Date.now()}`, createdAt: new Date().toISOString(), ...data };
  writeStorage(STORAGE_KEYS.messages, [message, ...readArray(STORAGE_KEYS.messages)]);
  return message;
}
