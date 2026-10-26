"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { STORAGE_KEYS, readArray, readStorage, removeStorage, writeStorage } from "@/utils/storage";
import { calculateOrderSummary, validateCoupon } from "@/utils/orderSummary";

const CartContext = createContext(null);

// A cart line: { lineId, productId, slug, name, categoryName, image, unitPrice, quantity, options }
// `options` holds customisation (size, spice level, extras). Same product + same options = same line.
const makeLineId = (productId, options) => `${productId}::${JSON.stringify(options || {})}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Ignore anything in storage that doesn't look like a valid cart line
    setItems(
      readArray(STORAGE_KEYS.cart).filter(
        (i) => i && typeof i.lineId === "string" && Number.isFinite(i.unitPrice) && Number.isInteger(i.quantity) && i.quantity > 0
      )
    );
    const savedCoupon = readStorage(STORAGE_KEYS.coupon, "");
    setCouponCode(typeof savedCoupon === "string" ? savedCoupon : "");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.cart, items);
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (couponCode) writeStorage(STORAGE_KEYS.coupon, couponCode);
    else removeStorage(STORAGE_KEYS.coupon);
  }, [couponCode, hydrated]);

  const addItem = useCallback((product, { quantity = 1, options = {}, unitPrice, silent = false } = {}) => {
    const lineId = makeLineId(product.id, options);
    const price = unitPrice ?? product.price;
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId);
      if (existing) {
        return prev.map((i) => (i.lineId === lineId ? { ...i, quantity: Math.min(20, i.quantity + quantity) } : i));
      }
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          categoryName: product.categoryName,
          image: product.image,
          unitPrice: price,
          quantity,
          options,
        },
      ];
    });
    if (!silent) toast.success("Added to cart", { description: product.name });
  }, []);

  const removeItem = useCallback((lineId) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
    toast("Removed from cart");
  }, []);

  const updateQuantity = useCallback((lineId, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, quantity: Math.min(quantity, 20) } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode("");
  }, []);

  const summary = useMemo(() => calculateOrderSummary(items, couponCode), [items, couponCode]);

  // Returns { ok, message } so the UI can show the reason inline.
  const applyCoupon = useCallback(
    (code) => {
      const result = validateCoupon(code, summary.subtotal);
      if (result.valid) {
        setCouponCode(result.coupon.code);
        toast.success("Coupon applied", { description: result.coupon.description });
      }
      return { ok: result.valid, message: result.message };
    },
    [summary.subtotal]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode("");
    toast("Coupon removed");
  }, []);

  const value = useMemo(
    () => ({
      items, count: summary.itemCount, subtotal: summary.subtotal, summary, couponCode, hydrated,
      addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon,
    }),
    [items, summary, couponCode, hydrated, addItem, removeItem, updateQuantity, clearCart, applyCoupon, removeCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
