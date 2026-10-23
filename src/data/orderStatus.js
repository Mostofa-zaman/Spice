// Order progress steps, in order. Used by the order list, the tracker and the demo progression.
export const orderSteps = [
  { key: "placed", label: "Order Placed", description: "We've received your order." },
  { key: "confirmed", label: "Confirmed", description: "The kitchen has accepted it." },
  { key: "preparing", label: "Preparing", description: "Your food is being cooked fresh." },
  { key: "out-for-delivery", label: "Out for Delivery", description: "Your rider is on the way." },
  { key: "delivered", label: "Delivered", description: "Enjoy your meal!" },
];

// MOCK progression: minutes after the order was placed when each step is reached.
// Later the backend sends the real status and this table is no longer needed.
export const stepOffsetMinutes = { placed: 0, confirmed: 0, preparing: 3, "out-for-delivery": 15, delivered: 35 };

export const getStatusLabel = (key) => orderSteps.find((s) => s.key === key)?.label || key;
export const getStepIndex = (key) => Math.max(0, orderSteps.findIndex((s) => s.key === key));

// The status to DISPLAY: whichever is further along — the saved status or the time-based one.
export function getEffectiveStatus(order, now = Date.now()) {
  const minutes = (now - new Date(order.date).getTime()) / 60000;
  let timeIndex = 0;
  orderSteps.forEach((s, i) => { if (minutes >= stepOffsetMinutes[s.key]) timeIndex = i; });
  return orderSteps[Math.max(timeIndex, getStepIndex(order.status))].key;
}

// When did each step happen? Real timestamp if we recorded one, otherwise estimated from the offsets.
export function getStepTime(order, key) {
  const recorded = order.statusHistory?.find((h) => h.status === key);
  if (recorded) return recorded.at;
  return new Date(new Date(order.date).getTime() + stepOffsetMinutes[key] * 60000).toISOString();
}

export const ESTIMATED_TOTAL_MINUTES = 40; // used for "Arriving around ..."
