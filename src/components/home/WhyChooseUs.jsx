import SectionHeading from "@/components/common/SectionHeading";

export default function WhyChooseUs({ withHeading = true }) {
  return (
    <section className="container-page py-12">
      {withHeading ? (
        <SectionHeading id="why-us" title="Why choose us" subtitle="What makes an Kheye de order different." />
      ) : (
        <h2 id="why-us" className="sr-only">Why choose us</h2>
      )}
    </section>
  );
}