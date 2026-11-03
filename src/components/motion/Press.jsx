"use client";
import Link from "next/link";
import { m } from "framer-motion";

// Buttons / links with a tiny press + hover response (scale only, GPU friendly).
const MotionLink = m.create(Link);

export function PressButton(props) {
  return <m.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} {...props} />;
}

export function PressLink(props) {
  return <MotionLink whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} {...props} />;
}
