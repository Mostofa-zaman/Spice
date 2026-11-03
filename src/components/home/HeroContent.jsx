"use client";
import { m } from "framer-motion";
import { Clock, Truck } from "lucide-react";
import { PressLink } from "@/components/motion/Press";
import { delivery } from "@/data/restaurant";
import { formatPrice } from "@/utils/format";

// Hero text entrance (Framer Motion): a short staggered fade-up. ~0.5s total, transform + opacity only.
// "js-reveal" lets the no-JavaScript fallback show the text even before animation runs.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

export default function HeroContent() {
  return (
    <m.div variants={container} initial="hidden" animate="show">
      <m.h1 variants={item} className="js-reveal text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        Delicious food, delivered to your door
      </m.h1>
      <m.p variants={item} className="js-reveal mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75">
        Burgers, pizza, biryani and more — cooked fresh when you order and on your table in {delivery.estimate}.
      </m.p>
      <m.div variants={item} className="js-reveal mt-8 flex flex-wrap gap-3">
        <PressLink href="/menu" className="btn btn-primary !px-7 !py-3.5 text-base">Order now</PressLink>
        <PressLink href="/menu" className="btn btn-outline !px-7 !py-3.5 text-base">View menu</PressLink>
      </m.div>
      <m.ul variants={item} className="js-reveal mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
        <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-ember" aria-hidden="true" /><span className="font-semibold">{delivery.estimate} delivery</span></li>
        <li className="flex items-center gap-3"><Truck className="h-5 w-5 text-ember" aria-hidden="true" /><span className="font-semibold">Free delivery over {formatPrice(delivery.freeDeliveryOver)}</span></li>
      </m.ul>
    </m.div>
  );
}
