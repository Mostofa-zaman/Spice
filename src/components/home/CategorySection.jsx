
import SectionHeading from "@/components/common/SectionHeading";
import { getCategoryProductCount, getRealCategories } from "@/services/productService";
import CategoryCard from "../allCardsProvider/CategoryCard";

export default function CategorySection() {
  return (
    <section className="container-page py-12" aria-labelledby="explore-categories" data-aos="fade-up">
      <SectionHeading
        title="Explore our categories"
        subtitle="Pick a category to see only what you feel like eating."
        href="/menu"
        linkText="See full menu"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {getRealCategories().map((c) => (
          <CategoryCard key={c.id} category={c} count={getCategoryProductCount(c.slug)} />
        ))}
      </div>
    </section>
  );
}
