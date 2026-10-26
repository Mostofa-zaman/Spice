"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/services/orderService";

export function useOrders() {
  const { user, hydrated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!hydrated) return;
    setOrders(getOrders(user?.id));
    setReady(true);
  }, [hydrated, user?.id]);
  return { orders, ready };
}
