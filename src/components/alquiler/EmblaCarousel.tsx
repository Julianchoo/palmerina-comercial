"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

export function EmblaCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[1.75rem] bg-brand-dark shadow-2xl shadow-brand-dark/20" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide.src} className="min-w-0 flex-[0_0_100%]">
              <div className="relative h-[360px] w-full overflow-hidden md:h-[520px] lg:h-[580px]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 1200px, (min-width: 768px) 92vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-5 pb-5 pt-20 md:px-8 md:pb-7">
                  <p className="text-sm font-semibold text-white md:text-base">{slide.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-3 top-[180px] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/20 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-5 md:top-[260px] lg:top-[290px]"
        aria-label="Anterior"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-3 top-[180px] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/20 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-5 md:top-[260px] lg:top-[290px]"
        aria-label="Siguiente"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-5 md:justify-center md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.src}
            onClick={() => scrollTo(index)}
            className={`relative h-14 w-20 flex-none overflow-hidden rounded-xl border transition-all duration-200 md:h-16 md:w-24 ${
              index === selectedIndex
                ? "border-brand-accent ring-2 ring-brand-accent/35"
                : "border-transparent opacity-65 hover:opacity-100"
            }`}
            aria-label={`Ver ${slide.caption}`}
            aria-current={index === selectedIndex ? "true" : undefined}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
