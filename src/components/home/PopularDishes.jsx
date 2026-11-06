import ProductCard from "@/components/common/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import { getPopularProducts } from "@/services/productService";

export default function PopularDishes() {
  const dishes = getPopularProducts(8);
  return (
    <section className="container-page py-12" aria-labelledby="popular-dishes" data-aos="fade-up">
      <SectionHeading id="popular-dishes" title="Our popular dishes" subtitle="The plates our customers order again and again." href="/menu?sort=popular" linkText="See all dishes" />
      
    </section>
  );
}
