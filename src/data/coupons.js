// Demo coupon codes (frontend only). Later, validate these on the server.
// type: "percent" | "flat" | "free-delivery"
export const coupons = [
  { code: "KHeYeDe10", type: "percent", value: 10, minOrder: 500, validUntil: "2026-12-31", description: "10% off orders over ৳500" },
  { code: "WELCOME50", type: "flat", value: 50, minOrder: 300, validUntil: "2026-12-31", description: "৳50 off orders over ৳300" },
  { code: "FREESHIP", type: "free-delivery", value: 0, minOrder: 0, validUntil: "2026-10-31", description: "Free delivery on any order" },
];
