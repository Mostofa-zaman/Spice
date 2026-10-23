  // One place for all order maths — used by the cart, checkout and order confirmation.
  import { delivery } from "@/data/restaurant";
  import { coupons } from "@/data/coupons";
  import { formatPrice } from "@/utils/format";

  export function validateCoupon(code, subtotal) {
    const coupon = coupons.find((c) => c.code === String(code || "").trim().toUpperCase());
    if (!coupon) return { valid: false, message: "That code isn't valid. Check the spelling and try again." };
    if (coupon.validUntil && new Date(`${coupon.validUntil}T23:59:59`) < new Date())
      return { valid: false, coupon, message: `${coupon.code} has expired.` };
    if (subtotal < coupon.minOrder)
      return { valid: false, coupon, message: `Add ${formatPrice(coupon.minOrder - subtotal)} more to use ${coupon.code}.` };
    return { valid: true, coupon, message: `${coupon.code} applied.` };
  }

  export function calculateOrderSummary(items, couponCode) {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    let discount = 0;
    let freeDeliveryCoupon = false;
    let couponIssue = null;
    if (couponCode && subtotal > 0) {
      const check = validateCoupon(couponCode, subtotal);
      if (check.valid) {
        if (check.coupon.type === "percent") discount = Math.round((subtotal * check.coupon.value) / 100);
        if (check.coupon.type === "flat") discount = Math.min(check.coupon.value, subtotal);
        if (check.coupon.type === "free-delivery") freeDeliveryCoupon = true;
      } else {
        couponIssue = check.message; // e.g. cart dropped below the minimum
      }
    }

    const qualifiesFreeDelivery = subtotal >= delivery.freeDeliveryOver;
    const deliveryFee = subtotal === 0 || qualifiesFreeDelivery || freeDeliveryCoupon ? 0 : delivery.standardFee;
    const tax = Math.round((subtotal - discount) * delivery.taxRate);
    const total = subtotal - discount + deliveryFee + tax;
    const freeDeliveryRemaining = Math.max(0, delivery.freeDeliveryOver - subtotal);

    return { itemCount, subtotal, discount, deliveryFee, tax, total, freeDeliveryRemaining, freeDeliveryCoupon, couponIssue };
  }
