// Offers shown on /offers.
// combo offers 
// Later: GET /api/offers.
import { coupons } from "@/data/coupons";
import { delivery } from "@/data/restaurant";
import { getProductsByCategory } from "@/services/productService";
import { formatPrice } from "@/utils/format";

const coupon = (code) => coupons.find((c) => c.code === code);

export function getOffers() {
  const kheyede = coupon("KHEYEDE10");
  const welcome = coupon("WELCOME50");
  const freeship = coupon("FREESHIP");

  const discounts = [
    { 
      id: "kheyede10", 
      type: "discount", 
      title: "10% off your order", 
      description: `Save 10% on any order over ${formatPrice(kheyede.minOrder)}. Enter the code at checkout.`, 
      badge: "10% OFF", 
      code: kheyede.code, 
      validUntil: kheyede.validUntil, 
      cta: { label: "Order now", href: "/menu" } 
    },
    { 
      id: "welcome50", 
      type: "discount", 
      title: "Welcome offer", 
      description: `New to Urban Bite? Take ${formatPrice(welcome.value)} off orders over ${formatPrice(welcome.minOrder)}.`, 
      badge: `${formatPrice(welcome.value)} OFF`, 
      code: welcome.code, 
      validUntil: welcome.validUntil, 
      cta: { label: "Start ordering", href: "/menu" } 
    },
  ];

  const combos = getProductsByCategory("combo-meals")
    .filter((p) => p.oldPrice)
    .map((p) => ({
      id: p.id, 
      type: "combo", 
      title: p.name,
      description: `${p.description} Now ${formatPrice(p.price)} instead of ${formatPrice(p.oldPrice)}.`,
      badge: `SAVE ${formatPrice(p.oldPrice - p.price)}`, 
      code: null, 
      validUntil: null,
      cta: { label: "View combo", href: `/menu/${p.slug}` },
    }));

  const deliveryOffers = [
    { 
      id: "free-delivery", 
      type: "delivery", 
      title: `Free delivery over ${formatPrice(delivery.freeDeliveryOver)}`, 
      description: `Orders of ${formatPrice(delivery.freeDeliveryOver)} or more are delivered free. Otherwise it's just ${formatPrice(delivery.standardFee)}. Estimated delivery ${delivery.estimate}.`, 
      badge: "FREE DELIVERY", 
      code: null, 
      validUntil: null, 
      cta: { label: "Browse the menu", href: "/menu" } 
    },
  ];

  const limited = [
    { 
      id: "freeship", 
      type: "limited", 
      title: "Free delivery on any order", 
      description: "For a limited time, use this code to get free delivery on any order, big or small.", 
      badge: "LIMITED TIME", 
      code: freeship.code, 
      validUntil: freeship.validUntil, 
      cta: { label: "Order now", href: "/menu" } 
    },
  ];

  return [...discounts, ...combos, ...deliveryOffers, ...limited];
}

export const offerSections = [
  { type: "discount", title: "Discounts", text: "Use these codes in your cart or at checkout." },
  { type: "combo", title: "Combo offers", text: "Complete meals at a better price." },
  { type: "delivery", title: "Free delivery", text: "Save on delivery fees." },
  { type: "limited", title: "Limited-time offers", text: "Grab them before they end." },
];