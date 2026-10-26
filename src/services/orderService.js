// Orders (mock, stored in localStorage)
// Later: GET /api/orders, 
import { STORAGE_KEYS, readArray, writeStorage } from "@/utils/storage";
import { delivery } from "@/data/restaurant";
import { getEffectiveStatus, getStepIndex, orderSteps } from "@/data/orderStatus";

// Ignore saved orders 
const isValidOrder = (o) =>
  o && typeof o.id === "string" && typeof o.date === "string" && Array.isArray(o.items) && o.customer && typeof o.customer === "object";

export function getOrders(userId) {
  if (!userId) return [];
  return readArray(STORAGE_KEYS.orders)
    .filter((o) => isValidOrder(o) && o.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getOrderById(id, userId) {
  return getOrders(userId).find((o) => o.id === id) || null;
}

const wait = (ms = 700) => new Promise((r) => setTimeout(r, ms)); // feels like a network call

// Creates and saves an order

export async function createOrder({ user, items, summary, couponCode, customer, payment }) {
  await wait();
  const all = readArray(STORAGE_KEYS.orders);
  const highest = all.reduce((max, o) => Math.max(max, parseInt(String(o.id).replace(/\D/g, ""), 10) || 0), 10244);
  const now = new Date().toISOString();

  const order = {
    id: `UB${highest + 1}`,
    userId: user.id,
    date: now,
    status: "confirmed", 
    statusHistory: [{ status: "placed", at: now }, { status: "confirmed", at: now }],
    items: items.map((i) => ({ ...i })), 
    subtotal: summary.subtotal,
    deliveryFee: summary.deliveryFee,
    discount: summary.discount,
    tax: summary.tax,
    total: summary.total,
    couponCode: couponCode || null,
    customer: { ...customer, email: user.email },
    paymentMethod: payment.label,
    paymentStatus: payment.paid ? "Paid (demo)" : "Pay on delivery",
    estimatedDelivery: delivery.estimate,
  };
  writeStorage(STORAGE_KEYS.orders, [order, ...all]);
  return order;
}


export async function advanceOrderStatus(id, userId) {
  await wait(250);
  const all = readArray(STORAGE_KEYS.orders);
  const order = all.find((o) => o.id === id && o.userId === userId);
  if (!order) throw new Error("Order not found.");
  const nextIndex = Math.min(orderSteps.length - 1, getStepIndex(getEffectiveStatus(order)) + 1);
  const next = orderSteps[nextIndex].key;
  order.status = next;
  order.statusHistory = [...(order.statusHistory || []).filter((h) => h.status !== next), { status: next, at: new Date().toISOString() }];
  writeStorage(STORAGE_KEYS.orders, all);
  return order;
}
