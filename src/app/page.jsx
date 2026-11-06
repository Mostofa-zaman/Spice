import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import PopularDishes from "@/components/home/PopularDishes";
import PromoBanner from "@/components/home/PromoBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { getProductBySlug } from "@/services/productService";

export default function Home() {
  
  const promo = getProductBySlug("family-feast-combo");
  return (
    <>
      <Hero />
      <CategorySection />
      <PopularCategories/>
      <PopularDishes/>
      {promo && (
  <PromoBanner
    name={promo.name}
    slug={promo.slug}
    description={promo.description}
    price={promo.price}
    oldPrice={promo.oldPrice}
  />
)}
<WhyChooseUs/>
    </>
  );
}
