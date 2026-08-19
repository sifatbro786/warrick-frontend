import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectFade,
  FreeMode,
  Keyboard,
  Thumbs,
} from "swiper/modules";
import { heroSlides } from "../../data/homeData";
import { buildSrcSet, unsplash } from "../../lib/images";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

/* Art direction note: the Unsplash helpers in src/lib/images.js serve
   placeholders. Swap them for licensed brand photography before launch, and
   keep replacements low-key and high-contrast so they hold up under the
   royal wash. */

const pad = (value) => String(value).padStart(2, "0");

const AUTOPLAY_DELAY = 7000;

/* Slide copy rises into place as its slide becomes active. Driven off Swiper's
   own state class rather than React state, so the reveal never waits on a
   render.

   This MUST stay a keyframe animation. A CSS transition here bubbles a
   transitionend up to the slide element and consumes the one-shot listener
   Swiper uses to detect the end of its fade, which leaves swiper.animating
   stuck true. See the hero-rise comment in index.css. */
const REVEAL = "opacity-0 in-[.swiper-slide-active]:animate-hero-rise";

/* ==========================================================================
   HeroSection
   --------------------------------------------------------------------------
   Occupies exactly one viewport minus the header, so the fold lands on the
   control bar and the page never has to scroll to complete the hero. The
   32rem floor is the escape hatch for very short windows: below that the
   section stops shrinking and the page scrolls instead of clipping the copy.
   ========================================================================== */
export default function HeroSection() {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const total = heroSlides.length;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Warrick Group operating companies"
      className="relative isolate flex h-[calc(100svh-var(--header-height))] min-h-128 flex-col overflow-hidden bg-royal-dark"
    >
      <h1 className="sr-only">
        Warrick Group, a global enterprise across energy, consumer technology
        and mobility
      </h1>

      {/* ------------------------------------------------------------------
          Stage. Takes whatever space the control bar leaves behind, which
          gives every slide a definite box to fill.
          ------------------------------------------------------------------ */}
      <Swiper
        modules={[A11y, Autoplay, EffectFade, Keyboard, Thumbs]}
        onSwiper={setMainSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onAutoplayTimeLeft={(_swiper, _timeLeft, remaining) => {
          /* `remaining` runs from 1 to 0, so elapsed is its complement.
             Written straight to the node to keep autoplay off the render
             path. */
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${1 - remaining})`;
          }
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={reduceMotion ? 0 : 900}
        /* rewind, not loop. Both wrap around, but loop gates slideNext and
           slidePrev behind `animating` (loopPreventsSliding), so one missed
           transitionend kills the arrows for good. rewind has no such guard
           and skips loop's DOM reordering, which nothing here needs because
           a fade never slides. */
        rewind={total > 1}
        keyboard={{ enabled: true }}
        autoplay={
          reduceMotion
            ? false
            : {
                delay: AUTOPLAY_DELAY,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="min-h-0 w-full flex-1"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Plate. bg-royal-dark on the section is the fallback, so a
                failed request degrades to a deep royal field. */}
            <img
              src={unsplash(slide.photoId, 1920)}
              srcSet={buildSrcSet(slide.photoId)}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
              style={{ objectPosition: slide.focal }}
              className="absolute inset-0 -z-10 size-full scale-108 object-cover in-[.swiper-slide-active]:animate-hero-pan"
            />

            {/* Readability wash: a flat tint, a lateral gradient that keeps
                the editorial column legible while the plate stays visible at
                right, and a base vignette that hands off to the control bar. */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-royal-deep/5" />
              <div className="absolute inset-0 bg-linear-to-r from-royal-deep via-royal-deep/75 to-royal-deep/15" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-royal-dark to-transparent" />
            </div>

            {/* Editorial column */}
            <div className="relative mx-auto flex h-full w-full max-w-360 flex-col justify-center px-5 py-[clamp(1.5rem,4vh,3.5rem)] sm:px-6 lg:px-10">
              <div className="max-w-2xl">
                <p
                  style={{ animationDelay: "80ms" }}
                  className={`eyebrow text-white/65 ${REVEAL}`}
                >
                  {slide.sector}
                </p>

                <h2
                  style={{ animationDelay: "180ms" }}
                  className={`mt-5 max-w-[50ch] font-display text-[clamp(1.9rem,3.2vh+1.5vw,4rem)] leading-[1.08] font-bold tracking-[-0.015em] text-white ${REVEAL}`}
                >
                  {slide.headline}
                </h2>

                <p
                  style={{ animationDelay: "280ms" }}
                  className={`mt-6 max-w-[52ch] text-[clamp(0.875rem,1.4vh+0.35vw,1.0625rem)] leading-[1.75] text-white/70 ${REVEAL}`}
                >
                  {slide.body}
                </p>

                <div style={{ animationDelay: "380ms" }} className={REVEAL}>
                  <Link
                    to={slide.path}
                    tabIndex={index === activeIndex ? 0 : -1}
                    className="group mt-8 inline-flex items-center gap-4 border-b border-gold/45 pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
                      {slide.ctaLabel}
                    </span>
                    <ArrowRight
                      className="size-4 text-gold transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ------------------------------------------------------------------
          Control bar. Sits in flow beneath the stage, so it is always the
          last thing above the fold and never overlaps the copy.
          ------------------------------------------------------------------ */}
      <div className="relative z-20 shrink-0 bg-royal-dark/50 backdrop-blur-sm">
        <div className="mx-auto max-w-360 px-5 sm:px-6 lg:px-10">
          {/* Autoplay progress doubles as the bar's top rule. */}
          <div aria-hidden="true" className="relative h-px w-full bg-white/15">
            <span
              ref={progressRef}
              className="absolute inset-0 origin-left scale-x-0 bg-gold"
            />
          </div>

          <div className="flex items-center justify-between gap-6">
            {/* Entity strip. slidesPerView="auto" with free mode means a
                fourth or fifth company scrolls rather than squeezing the
                others out of shape. */}
            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              watchSlidesProgress
              freeMode
              slidesPerView="auto"
              spaceBetween={0}
              className="min-w-0 flex-1"
            >
              {heroSlides.map((slide, index) => (
                <SwiperSlide key={slide.id} className="w-auto!">
                  <button
                    type="button"
                    onClick={() => mainSwiper?.slideTo(index)}
                    aria-label={`Show ${slide.name}`}
                    aria-current={index === activeIndex}
                    className="group flex items-baseline gap-3 border-t-2 border-transparent py-5 pr-8 text-left transition-colors duration-500 ease-premium in-[.swiper-slide-thumb-active]:border-gold"
                  >
                    <span className="font-display text-[10px] font-bold tracking-widest text-white/35 transition-colors duration-500 ease-premium group-hover:text-white/60 in-[.swiper-slide-thumb-active]:text-gold">
                      {pad(index + 1)}
                    </span>
                    <span className="text-[12px] font-semibold tracking-[0.14em] whitespace-nowrap text-white/50 uppercase transition-colors duration-500 ease-premium group-hover:text-white in-[.swiper-slide-thumb-active]:text-white">
                      {slide.name}
                    </span>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Counter and arrows */}
            <div className="flex shrink-0 items-center gap-6">
              {/* Decorative: the A11y module already announces slide changes,
                  so this must not be a second live region. */}
              <p
                aria-hidden="true"
                className="font-display text-[12px] font-semibold tracking-[0.16em] tabular-nums text-white/35"
              >
                <span className="text-gold">{pad(activeIndex + 1)}</span>
                <span aria-hidden="true" className="mx-1.5">
                  /
                </span>
                {pad(total)}
              </p>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => mainSwiper?.slidePrev()}
                  aria-label="Previous company"
                  className="grid size-10 place-items-center rounded-xs border border-white/20 text-white/70 transition-colors duration-500 ease-premium hover:border-gold hover:text-gold"
                >
                  <ArrowLeft
                    className="size-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => mainSwiper?.slideNext()}
                  aria-label="Next company"
                  className="grid size-10 place-items-center rounded-xs border border-white/20 text-white/70 transition-colors duration-500 ease-premium hover:border-gold hover:text-gold"
                >
                  <ArrowRight
                    className="size-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
