"use client";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <TooltipProvider delayDuration={350} skipDelayDuration={100}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <Toaster
                  position="bottom-right"
                  closeButton
                  toastOptions={{ classNames: { toast: "!rounded-2xl !border !border-charcoal/10 !bg-white !text-charcoal !shadow-lift", description: "!text-charcoal/70" } }}
                />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
