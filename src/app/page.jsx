import CategorySection from "@/components/home/CategorySection";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import PopularDishes from "@/components/home/PopularDishes";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <PopularCategories/>
      <PopularDishes/>
    </>
  );
}
