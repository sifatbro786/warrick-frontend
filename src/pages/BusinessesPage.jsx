import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { businessesHero, businessesOutro, entities } from "../data/businessesData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   BusinessesPage
   --------------------------------------------------------------------------
   The portfolio index at /businesses. Composition only; every string comes
   from src/data/businessesData.js.

   GROUND — the running order matters:

     Hero        royal-dark     opens against the white sticky header
     Portfolio   surface        (white)
     Structure   surface-soft
     Footer      royal-night    (in SiteLayout)

   Operating companies only. Warrick Corporation is the holding company and
   has no profile of its own here — the structure band at the foot of the page
   says so and points at /about. See the note at the top of businessesData.js.

   The rows alternate the plate left and right rather than sitting in a card
   grid. Companies of unequal size do not read as equal tiles, and the
   alternation gives each one a full measure of its own without implying a
   ranking beyond the ordinal.
   ========================================================================== */
export default function BusinessesPage() {
    const shouldReduceMotion = useReducedMotion();

    const rise = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: shouldReduceMotion ? 0.25 : 0.8, ease: EASE },
        },
    };

    const stagger = {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-100px" },
        variants: { show: { transition: { staggerChildren: 0.1 } } },
    };

    return (
        <>
            {/* ==================================================================
                HERO — royal-dark
                ================================================================== */}
            <section
                aria-labelledby="businesses-heading"
                className="relative isolate overflow-hidden bg-royal-dark"
            >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-linear-to-br from-royal-light/35 via-royal-deep/0 to-royal-dark" />
                </div>

                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-40"
                >
                    <motion.p variants={rise} className="eyebrow text-gold">
                        {businessesHero.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={rise}
                        id="businesses-heading"
                        className="mt-7 max-w-[16ch] text-[clamp(2.125rem,4.4vw,4rem)] leading-[1.08] font-bold text-white"
                    >
                        {businessesHero.title}
                    </motion.h1>

                    <motion.p
                        variants={rise}
                        className="mt-9 max-w-[54ch] text-[15px] leading-[1.9] text-white/55 lg:text-[16px]"
                    >
                        {businessesHero.lead}
                    </motion.p>
                </motion.div>
            </section>

            {/* ==================================================================
                PORTFOLIO — surface
                ================================================================== */}
            <section aria-label="Group companies" className="border-t border-line bg-surface">
                <div className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
                    {entities.map((entity, entityIndex) => {
                        /* Odd rows put the plate on the right. Driven by position
                           rather than by a flag on the record, so the rhythm
                           survives a company being added or reordered. */
                        const plateOnRight = entityIndex % 2 === 1;

                        return (
                            <motion.article
                                key={entity.id}
                                {...stagger}
                                aria-labelledby={`entity-${entity.id}`}
                                className="grid gap-x-8 gap-y-10 border-t border-line py-16 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:items-center lg:gap-x-20 lg:py-24"
                            >
                                {/* ---------------- Plate ---------------- */}
                                <motion.div
                                    variants={rise}
                                    className={`relative overflow-hidden lg:col-span-6 ${
                                        plateOnRight ? "lg:order-2 lg:col-start-7" : ""
                                    }`}
                                >
                                    <img
                                        src={entity.coverImage}
                                        sizes="(min-width: 64rem) 48vw, 100vw"
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-3/2 w-full object-cover saturate-[0.82]"
                                    />
                                    {/* A veil, not a wash. Seats the frame in the
                                        page's colour temperature. */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-royal-deep/10"
                                    />
                                </motion.div>

                                {/* ---------------- Editorial ---------------- */}
                                <div
                                    className={`lg:col-span-5 ${
                                        plateOnRight
                                            ? "lg:order-1 lg:col-start-1"
                                            : "lg:col-start-8"
                                    }`}
                                >
                                    <motion.div
                                        variants={rise}
                                        className="flex items-baseline gap-5"
                                    >
                                        <span className="eyebrow text-ink-muted/60">
                                            {entity.index}
                                        </span>
                                        <span className="eyebrow text-gold-dark">
                                            {entity.sector}
                                        </span>
                                    </motion.div>

                                    <motion.h2
                                        variants={rise}
                                        id={`entity-${entity.id}`}
                                        className="mt-6 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none font-bold tracking-tight text-royal"
                                    >
                                        {entity.name}
                                    </motion.h2>

                                    <motion.p
                                        variants={rise}
                                        className="mt-6 max-w-[32ch] font-display text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-[1.5] font-medium text-balance text-royal"
                                    >
                                        {entity.tagline}
                                    </motion.p>

                                    <motion.p
                                        variants={rise}
                                        className="mt-7 max-w-[52ch] text-[15px] leading-[1.9] text-ink-muted"
                                    >
                                        {entity.summary}
                                    </motion.p>

                                    <motion.dl
                                        variants={rise}
                                        className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3"
                                    >
                                        <div className="border-t border-line pt-4">
                                            <dt className="eyebrow text-ink-muted/70">
                                                Established
                                            </dt>
                                            <dd className="mt-2.5 text-[15px] font-semibold text-royal tabular-nums">
                                                {entity.established}
                                            </dd>
                                        </div>
                                        <div className="border-t border-line pt-4">
                                            <dt className="eyebrow text-ink-muted/70">Base</dt>
                                            <dd className="mt-2.5 text-[15px] font-semibold text-royal">
                                                {entity.headquarters.split(",")[0]}
                                            </dd>
                                        </div>
                                        <div className="border-t border-line pt-4">
                                            <dt className="eyebrow text-ink-muted/70">People</dt>
                                            <dd className="mt-2.5 text-[15px] font-semibold text-royal tabular-nums">
                                                {entity.headcount}
                                            </dd>
                                        </div>
                                    </motion.dl>

                                    <motion.div
                                        variants={rise}
                                        className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
                                    >
                                        <Link
                                            to={`/businesses/${entity.slug}`}
                                            className="group inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                                        >
                                            <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                                Inside {entity.name}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                            >
                                                &rarr;
                                            </span>
                                        </Link>

                                        {/* The external site, surfaced on the index
                                            too — a reader who came here to shop
                                            should not have to open the corporate
                                            profile first. */}
                                        {entity.website?.status === "live" ? (
                                            <a
                                                href={entity.website.url}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-ink-muted uppercase transition-colors duration-500 ease-premium hover:text-royal"
                                            >
                                                {entity.website.display}
                                                <span
                                                    aria-hidden="true"
                                                    className="text-gold-dark transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                >
                                                    &#8599;
                                                </span>
                                            </a>
                                        ) : null}
                                    </motion.div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* ==================================================================
                STRUCTURE — surface-soft
                ================================================================== */}
            <section
                aria-labelledby="structure-heading"
                className="border-t border-line bg-surface-soft"
            >
                <motion.div
                    {...stagger}
                    className="mx-auto grid max-w-360 gap-x-8 gap-y-10 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-x-20 lg:px-10 lg:py-32"
                >
                    <div className="lg:col-span-6">
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            {businessesOutro.eyebrow}
                        </motion.p>

                        <motion.h2
                            variants={rise}
                            id="structure-heading"
                            className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                        >
                            {businessesOutro.title}
                        </motion.h2>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <motion.p
                            variants={rise}
                            className="max-w-[54ch] border-t border-line pt-10 text-[15px] leading-[1.9] text-ink-muted"
                        >
                            {businessesOutro.body}
                        </motion.p>

                        <motion.div
                            variants={rise}
                            className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-12"
                        >
                            {businessesOutro.links.map((link) => (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    className="group inline-flex w-fit items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                                >
                                    <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                        {link.label}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                    >
                                        &rarr;
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
