
import SectionHeading from "@/components/common/SectionHeading";

export default function CategorySection() {
  return (
    <section className="container-page py-12" aria-labelledby="explore-categories" data-aos="fade-up">
      <SectionHeading
        title="Explore our categories"
        subtitle="Pick a category to see only what you feel like eating."
        href="/menu"
        linkText="See full menu"
      />
    
    </section>
  );
}
