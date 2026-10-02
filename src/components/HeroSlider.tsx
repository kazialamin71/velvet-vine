"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

export type HeroSlide = { src: string; caption?: string };

const FADE_MS = 1200;
const DEFAULT_INTERVAL_SECONDS = 6;

/**
 * Hero background: cross-fades through `slides` behind the hero copy, with a slow
 * push-in on the active photo and progress-bar indicators that track the timing.
 * One slide renders as a still background; none renders just the copy.
 */
export function HeroSlider({
  slides,
  intervalSeconds,
  children,
}: {
  slides: HeroSlide[];
  intervalSeconds?: number;
  children: ReactNode;
}) {
  const interval = Math.min(
    30,
    Math.max(2, intervalSeconds || DEFAULT_INTERVAL_SECONDS)
  );
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused || reduced) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      interval * 1000
    );
    return () => window.clearTimeout(id);
  }, [active, slides.length, paused, reduced, interval]);

  const caption = slides[active]?.caption;

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <Image
            key={`${i}-${slide.src}`}
            src={slide.src}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            {...(i === 0
              ? { fetchPriority: "high" as const }
              : { loading: "lazy" as const })}
            className="object-cover"
            style={{
              opacity: i === active ? 1 : 0,
              transform: reduced ? undefined : `scale(${i === active ? 1.08 : 1})`,
              transition: reduced
                ? "none"
                : `opacity ${FADE_MS}ms ease-in-out, transform ${
                    interval * 1000 + FADE_MS
                  }ms linear`,
            }}
          />
        ))}
      </div>

      {slides.length > 0 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent" />
        </>
      )}

      <div
        className={`relative flex flex-col justify-end ${
          slides.length > 0 ? "min-h-[30rem] md:min-h-[38rem]" : ""
        }`}
      >
        <div className="w-full">{children}</div>

        {slides.length > 1 && (
          <div
            className="absolute bottom-7 right-6 z-10 flex flex-col items-end gap-2.5 md:bottom-9 md:right-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {caption && (
              <p
                key={caption}
                className="label max-w-[70vw] truncate text-cream/60 motion-reduce:animate-none"
                style={{ animation: "hero-caption-in 600ms ease-out both" }}
              >
                {caption}
              </p>
            )}

            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={`${i}-${slide.src}`}
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  aria-label={
                    slide.caption
                      ? `Show hero photo ${i + 1} of ${slides.length}: ${slide.caption}`
                      : `Show hero photo ${i + 1} of ${slides.length}`
                  }
                  aria-current={i === active}
                  className="group py-2 focus-visible:outline-none"
                >
                  <span className="relative block h-[3px] w-9 overflow-hidden rounded-full bg-cream/25 transition-colors group-hover:bg-cream/40 group-focus-visible:bg-cream/40 md:w-12">
                    <span
                      className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-cream"
                      style={
                        i === active
                          ? reduced
                            ? { transform: "scaleX(1)" }
                            : {
                                animation: `hero-progress ${interval}s linear forwards`,
                                animationPlayState: paused ? "paused" : "running",
                              }
                          : { transform: "scaleX(0)" }
                      }
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
