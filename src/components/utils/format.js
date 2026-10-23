import { restaurant } from "@/data/restaurant";

export const formatPrice = (amount) =>
  `${restaurant.currency.symbol}${Math.round(Number(amount) || 0).toLocaleString("en-US")}`;

export const getDiscountPercent = (price, oldPrice) =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
