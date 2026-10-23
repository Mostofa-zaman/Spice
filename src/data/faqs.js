import { delivery } from "@/data/restaurant";
import { formatPrice } from "@/utils/format";

// Frequently asked questions (shown on the Contact page). Numbers come from restaurant.js so they stay in sync.
export const faqs = [
  { q: "How long does delivery take?", a: `Most orders arrive in ${delivery.estimate}. You can follow your order live from My Orders after you place it.` },
  { q: "How much does delivery cost?", a: `Standard delivery is ${formatPrice(delivery.standardFee)}. Orders of ${formatPrice(delivery.freeDeliveryOver)} or more are delivered free, and the FREESHIP code removes the fee on any order while it is active.` },
  { q: "Which payment methods can I use?", a: "You can choose Cash on Delivery, Mobile Payment (bKash, Nagad, Rocket) or Card Payment at checkout. In this demo website no real payment is taken." },
  { q: "How do I use a coupon code?", a: "Enter the code in the coupon box in your cart or at checkout. Codes have a minimum order amount and an end date, which are shown on the Offers page." },
  { q: "Can I change or cancel my order?", a: "Call us as soon as possible. If the kitchen has not started preparing your food we can usually change or cancel it." },
  { q: "I have an allergy. Can you help?", a: "Yes. Tell us about any allergies in the delivery instructions or call us before ordering, and we will advise you on the safest dishes." },
];
