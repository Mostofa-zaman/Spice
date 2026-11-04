
"use client";

import { useEffect } from "react";

export default function HeroSliderAnimate({ rootRef }) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    let cancelled = false;
    let mm = null;

    const reveal = () => {
      root
        .querySelectorAll(".gsap-hide")
        .forEach((el) => el.classList.remove("gsap-hide"));
    };

    const failsafe = setTimeout(reveal, 3500);

    (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (cancelled) return;

        clearTimeout(failsafe);

        gsap.registerPlugin(ScrollTrigger);

        mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const q = (sel) => root.querySelectorAll(sel);
          const chipEls = Array.from(q(".hero-chip"));

          const tl = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          tl.fromTo(
            q(".hero-img"),
            { scale: 1.06 },
            { scale: 1, duration: 1.1 },
            0
          )
            .fromTo(
              q(".hero-halo"),
              { opacity: 0, scale: 0.85 },
              { opacity: 1, scale: 1, duration: 1 },
              0
            )
            .fromTo(
              chipEls,
              { opacity: 0, y: 26, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "back.out(1.5)",
              },
              0.3
            )
            .fromTo(
              q(".hero-card"),
              { opacity: 0, y: 24, x: -14 },
              { opacity: 1, y: 0, x: 0, duration: 0.8 },
              0.5
            );

          // Floating chips
          tl.eventCallback("onComplete", () => {
            chipEls.forEach((el, i) => {
              gsap.to(el, {
                y: i % 2 ? -8 : 8,
                duration: 2.4 + i * 0.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            });
          });

          // Image parallax
          gsap.to(q(".hero-img-wrap"), {
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          // Chip parallax
          chipEls.forEach((el) => {
            gsap.to(el, {
              yPercent: Number(el.dataset.depth),
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          });
        });
      } catch {
        reveal();
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(failsafe);
      mm?.revert();
    };
  }, [rootRef]);

  return null;
}
