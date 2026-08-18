import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Globe,
  Layers,
  Play,
  ShieldCheck,
} from "lucide-react";

/* ==========================================================================
   Art direction
   --------------------------------------------------------------------------
   Unsplash placeholders, served responsively. Swap `photoId` for licensed
   brand photography before launch — every frame here is chosen to sit under a
   deep royal wash without turning to mud, so replacements should be similarly
   low-key and high-contrast.
   ========================================================================== */
const unsplash = (photoId, width) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=70&w=${width}`;

const buildSrcSet = (photoId) =>
  [1280, 1920, 2560]
    .map((width) => `${unsplash(photoId, width)} ${width}w`)
    .join(", ");

const HERO_ENTITIES = [
  {
    id: "warrick-corp",
    index: "01",
    name: "Warrick Corp",
    sector: "Corporate & Energy",
    statement:
      "Infrastructure, energy and capital allocation — the balance sheet the group is built on.",
    path: "/businesses",
    photoId: "1486406146926-c627a92ad1ab",
    focal: "center 35%",
  },
  {
    id: "clara",
    index: "02",
    name: "Clara",
    sector: "Consumer Tech & E-Commerce",
    statement:
      "Consumer products and commerce platforms engineered around everyday utility.",
    path: "/businesses/clara",
    photoId: "1498049794561-7780e7231661",
    focal: "center 55%",
  },
  {
    id: "warrick-motors",
    index: "03",
    name: "Warrick Motors",
    sector: "Automotive & Mobility",
    statement:
      "Advanced mobility programmes, from powertrain engineering to fleet electrification.",
    path: "/businesses/warrick-motors",
    photoId: "1492144534655-ae79c964c9d7",
    focal: "center 60%",
  },
];

const METRICS = [
  { icon: Layers, value: "03+", label: "Core Business Sectors" },
  { icon: Globe, value: "Global", label: "Reach & Operations" },
  { icon: ShieldCheck, value: "Long-Term", label: "Innovation & Sustainability" },
];

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   HeroSection
   --------------------------------------------------------------------------
   `onWatchFilm` is optional. Without it the play control is a real link to the
   Media Center; pass a handler to intercept it with a video modal instead.
   ========================================================================== */
export default function HeroSection({ onWatchFilm }) {
  const [activeId, setActiveId] = useState(HERO_ENTITIES[0].id);
  const shouldReduceMotion = useReducedMotion();

  const active =
    HERO_ENTITIES.find((entity) => entity.id === activeId) ?? HERO_ENTITIES[0];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.25 : 0.9, ease: EASE },
    },
  };

  return (
    <section
      aria-label="Warrick Corporation introduction"
      className="relative isolate flex min-h-[calc(100svh-6.75rem)] flex-col overflow-hidden bg-royal-dark lg:min-h-[calc(100svh-8rem)]"
    >
      {/* ------------------------------------------------------------------
          Layer 1 · Cinematic plate. bg-royal-dark on the parent is the
          fallback, so a failed request degrades to a deep royal field
          rather than a white hole.
          ------------------------------------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={active.id}
            src={unsplash(active.photoId, 1920)}
            srcSet={buildSrcSet(active.photoId)}
            sizes="100vw"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
            style={{ objectPosition: active.focal }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.1, ease: "easeInOut" },
              // Ken Burns: a long settle, not a loop — it resolves and rests.
              scale: { duration: shouldReduceMotion ? 0 : 16, ease: "linear" },
            }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------
          Layer 2 · Readability. A flat wash, a horizontal gradient that keeps
          the editorial column legible while the plate stays visible at right,
          and a base vignette that hands off into the metric strip.
          ------------------------------------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#1F1130]/55" />
        <div className="absolute inset-0 bg-linear-to-r from-[#1F1130] via-[#1F1130]/80 to-[#1F1130]/20" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#180D28] via-[#180D28]/70 to-transparent" />

        {/* Architectural hairline grid — structure, not decoration. */}
        <div className="absolute inset-0 hidden grid-cols-12 lg:grid">
          {Array.from({ length: 12 }).map((_, column) => (
            <div key={column} className="border-l border-white/5 last:border-r" />
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          Content
          ------------------------------------------------------------------ */}
      <div className="relative mx-auto flex w-full max-w-360 flex-1 flex-col px-5 sm:px-6 lg:px-10">
        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* ---------------- Editorial column ---------------- */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 xl:col-span-6"
          >
            {/* Pre-heading badge */}
            <motion.div
              variants={rise}
              className="flex w-fit items-center gap-3 border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <span
                aria-hidden="true"
                className="size-1.25 rotate-45 bg-gold"
              />
              <span className="text-[10px] font-semibold tracking-[0.26em] text-white/75 uppercase">
                Warrick Corporation
                <span aria-hidden="true" className="mx-2 text-gold">
                  &bull;
                </span>
                Global Enterprise
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={rise}
              className="mt-8 max-w-[20ch] font-display text-[clamp(2.1rem,5.4vw,4.6rem)] leading-[1.06] font-bold tracking-[-0.015em] text-white"
            >
              Architecting{" "}
              <span className="text-gold-gradient">Sustainable Growth</span>{" "}
              Across Global Industries.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={rise}
              className="mt-7 max-w-xl text-[15px] leading-[1.8] text-white/65 lg:text-base"
            >
              We build enduring businesses where engineering discipline meets
              design intent — from energy infrastructure to advanced mobility.
              <span className="mt-2 block">
                Automotive excellence at Warrick Motors, consumer technology at
                Clara, and a group-wide commitment to what outlasts the cycle.
              </span>
            </motion.p>

            {/* Context line — swaps with the active entity */}
            <motion.div
              variants={rise}
              className="mt-8 flex min-h-14 items-start border-l border-gold/40 pl-5"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="max-w-md text-[13px] leading-relaxed text-white/55"
                >
                  <span className="font-semibold text-gold">{active.name}</span>
                  <span aria-hidden="true" className="mx-2 text-white/25">
                    /
                  </span>
                  {active.statement}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA group */}
            <motion.div
              variants={rise}
              className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
            >
              {/* Primary — solid gold, fill sweeps in from the left edge */}
              <Link
                to="/businesses"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xs bg-gold px-8 py-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-gold-light transition-transform duration-500 ease-premium group-hover:scale-x-100"
                />
                <span className="relative text-[11px] font-bold tracking-[0.2em] text-royal-dark uppercase">
                  Explore Our Portfolio
                </span>
                <ArrowUpRight
                  className="relative size-4 text-royal-dark transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary — corporate film */}
              <Link
                to="/media-center"
                onClick={(event) => {
                  if (onWatchFilm) {
                    event.preventDefault();
                    onWatchFilm();
                  }
                }}
                className="group inline-flex items-center gap-4"
              >
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-white/25 transition-colors duration-500 ease-premium group-hover:border-gold">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-ring-pulse rounded-full border border-gold/50"
                  />
                  <Play
                    className="size-3.5 translate-x-px fill-white text-white transition-colors duration-500 ease-premium group-hover:fill-gold group-hover:text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase transition-colors duration-500 ease-premium group-hover:text-gold">
                  Watch Corporate Film
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ---------------- Subsidiary switcher ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-4"
          >
            <p className="mb-4 text-[10px] font-semibold tracking-[0.3em] text-white/40 uppercase">
              The Group
            </p>

            <div
              role="group"
              aria-label="Highlight a group company"
              className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:pb-0"
            >
              {HERO_ENTITIES.map((entity) => {
                const isActive = entity.id === active.id;

                return (
                  <button
                    key={entity.id}
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveId(entity.id)}
                    onFocus={() => setActiveId(entity.id)}
                    onClick={() => setActiveId(entity.id)}
                    className={`group relative w-62 shrink-0 snap-start border border-white/10 text-left backdrop-blur-sm transition-colors duration-500 ease-premium lg:w-full lg:border-x-0 lg:border-t-0 lg:border-b lg:backdrop-blur-none ${
                      isActive
                        ? "bg-white/8 lg:bg-white/6"
                        : "bg-white/2 hover:bg-white/6 lg:bg-transparent"
                    }`}
                  >
                    {/* Shared-layout gold rule slides between the entities */}
                    {isActive ? (
                      <motion.span
                        layoutId="hero-entity-rule"
                        aria-hidden="true"
                        transition={{ duration: 0.5, ease: EASE }}
                        className="absolute inset-x-0 bottom-0 h-px bg-gold lg:inset-y-0 lg:right-auto lg:left-0 lg:h-auto lg:w-0.5"
                      />
                    ) : null}

                    <span className="flex items-start gap-4 px-5 py-5">
                      <span
                        className={`mt-0.5 font-display text-[11px] font-bold tracking-widest transition-colors duration-500 ease-premium ${
                          isActive ? "text-gold" : "text-white/30"
                        }`}
                      >
                        {entity.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[17px] font-semibold text-white">
                          {entity.name}
                        </span>
                        <span className="mt-1.5 block text-[10px] tracking-[0.16em] text-white/45 uppercase">
                          {entity.sector}
                        </span>
                      </span>

                      <ChevronRight
                        className={`mt-1 size-4 shrink-0 transition-all duration-500 ease-premium ${
                          isActive
                            ? "translate-x-0 text-gold opacity-100"
                            : "-translate-x-1 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* One link, always pointed at whatever is currently highlighted —
                keeps the cards as pure selectors and the HTML valid. */}
            <Link
              to={active.path}
              className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-white/55 uppercase transition-colors duration-500 ease-premium hover:text-gold"
            >
              Explore {active.name}
              <ArrowUpRight
                className="size-3.5 text-gold transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>

        {/* ---------------- Metric strip ---------------- */}
        <motion.dl
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10"
        >
          {METRICS.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={rise}
              className="flex items-start gap-4 py-7 sm:px-8 sm:first:pl-0 lg:py-8"
            >
              <Icon
                className="mt-1 size-5 shrink-0 text-gold"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <dt className="font-display text-[20px] leading-none font-bold text-white lg:text-[22px]">
                  {value}
                </dt>
                <dd className="mt-2 text-[10px] tracking-[0.16em] text-white/45 uppercase lg:text-[11px]">
                  {label}
                </dd>
              </div>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
