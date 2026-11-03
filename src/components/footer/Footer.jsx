
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "@/components/common/Logo";
import { restaurant, delivery } from "@/data/restaurant";

export default function Footer() {


  return (
    <footer className="mt-20 bg-charcoal text-cream/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />

          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {restaurant.tagline}. Fresh ingredients, a clean kitchen and delivery in {delivery.estimate}.
          </p>

        </div>
      </div>
    </footer>
  );
}
