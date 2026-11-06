import { Leaf, ShieldCheck, Sparkles, Timer, Lock } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { delivery } from "@/data/restaurant";

const features = [
  { Icon: Leaf, title: "Fresh ingredients", text: "Sourced daily and prepared in our own kitchen, never frozen or reheated." },
  { Icon: Timer, title: "Fast delivery", text: `Hot food at your door in ${delivery.estimate}, with live order tracking.` },
  { Icon: Sparkles, title: "Hygienic kitchen", text: "Deep-cleaned every day with strict food-safety checks." },
  { Icon: Lock, title: "Secure ordering", text: "Your details are handled with care and every order is confirmed instantly." },
  { Icon: ShieldCheck, title: "Quality guarantee", text: "Not happy with something? Tell us and we'll make it right." },
];

export default function WhyChooseUs({ withHeading = true }) {
  return (
    <section className="container-page py-12" aria-labelledby="why-us">
      {withHeading
        ? <SectionHeading id="why-us" title="Why choose us" subtitle="What makes an Kheye de order different." />
        : <h2 id="why-us" className="sr-only">Why choose us</h2>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {features.map(({ Icon, title, text }) => (
          <li key={title} className="rounded-2xl bg-white p-5 shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ember-light text-ember"><Icon className="h-5 w-5" aria-hidden="true" /></span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-charcoal/65">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}