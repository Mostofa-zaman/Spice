// MOCK payment options. No real payment is processed anywhere in this project.
// Later: replace with a real gateway (redirect / hosted fields) and verify on your server.
export const paymentMethods = [
  { id: "cod", label: "Cash on Delivery", description: "Pay in cash when your food arrives.", paid: false },
  { id: "mobile", label: "Mobile Payment", description: "bKash, Nagad or Rocket (demo only).", paid: true, providers: ["bKash", "Nagad", "Rocket"] },
  { id: "card", label: "Card Payment", description: "Visa or Mastercard (demo only, no card details are collected).", paid: true },
];
