
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatPrice } from "@/utils/format";
import HeroSliderAnimate from "../animations/HeroSliderAnimate";

const sliderImages = [
  {
    src: "/images/burgers/burger.png",
    alt: "A freshly made cheeseburger from Urban Bite",
    title: "Classic Cheeseburger",
    price: 420,
  },
  {
    src: "/images/pizza/pizza.png",
    alt: "A delicious pizza from Urban Bite",
    title: "Signature Pizza",
    price: 550,
  },
  {
    src: "/images/pasta/pasta.png",
    alt: "Delicious pasta from Urban Bite",
    title: "Spicy Arrabbiata Penne",
    price: 480,
  },
  {
    src: "/images/pasta/creamyChicken.png",
    alt: "Urban Bite creamy chicken pasta",
    title: "Creamy Chicken Alfredo",
    price: 480,
  },
  {
    src: "/images/milkshakes/lemonade.png",
    alt: "Urban Bite fresh mint lemonade",
    title: "Fresh Mint Lemonade",
    price: 280,
  },
];

const chips = [
  {
    emoji: "🍟",
    pos: "right-3 top-5 sm:right-5 sm:top-7",
    depth: -16,
  },
  {
    emoji: "🥤",
    pos: "left-3 top-[34%] sm:left-5",
    depth: -28,
  },
  {
    emoji: "🍕",
    pos: "right-4 bottom-[22%] sm:right-6",
    depth: -40,
  },
];

export default function HeroSlider() {
  const rootRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  // Auto slider
  useEffect(() => {
    const interval = setInterval(nextSlide, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-xl">
      {/* GSAP Animation */}
      <HeroSliderAnimate rootRef={rootRef} />

      {/* Warm Halo */}
      <div
        className="hero-halo gsap-hide absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-ember/15 to-amber-300/20 blur-2xl"
        aria-hidden="true"
      />

      {/* Image */}
      <div className="hero-img-wrap">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream-deep shadow-lift lg:rounded-[2.5rem]">
          {/* Slider Images */}
          {sliderImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-105 opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width:1024px) 40vw, 90vw"
                className="hero-img object-cover"
              />
            </div>
          ))}

          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-charcoal shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-charcoal shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-7 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Food Chips */}
      {chips.map((c) => (
        <span
          key={c.emoji}
          data-depth={c.depth}
          aria-hidden="true"
          className={`hero-chip gsap-hide absolute ${c.pos} grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-lift sm:h-14 sm:w-14 sm:text-3xl`}
        >
          {c.emoji}
        </span>
      ))}

      {/* Customer Favourite */}
      <div className="hero-card gsap-hide absolute -bottom-4 left-4 rounded-2xl bg-white px-4 py-3 shadow-lift sm:-left-6">
        <p className="text-xs text-charcoal/70">
          Customer favourite
        </p>

        <p className="font-display text-lg font-bold">
          {sliderImages[currentSlide].title}
        </p>

        <p className="text-sm font-semibold text-ember">
          {formatPrice(sliderImages[currentSlide].price)}
        </p>
      </div>
    </div>
  );
}
