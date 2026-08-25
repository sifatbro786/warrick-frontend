import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Dialog from "../components/common/Dialog";
import {
    capitalNote,
    focusAreas,
    focusSection,
    innovationHero,
    stageLabel,
    ventures,
    venturesSection,
} from "../data/innovationData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   VentureDialog
   --------------------------------------------------------------------------
   Content only. Every modal behaviour — portal, focus trap, escape, scroll
   lock, close control — belongs to the shared Dialog in components/common,
   which the news reader uses too.
   ========================================================================== */
function VentureDialog({ venture, onClose }) {
    const titleId = `venture-${venture.id}-title`;
    const { overview, milestones, partners } = venture.detail;

    return (
        <Dialog labelledBy={titleId} onClose={onClose}>
            <article className="px-6 pt-12 pb-16 sm:px-10 lg:px-16 lg:pt-16 lg:pb-20">
                <div className="eyebrow flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="text-gold-dark">{stageLabel(venture.stage)}</span>
                    <span className="text-ink-muted">{venture.sector}</span>
                    <span className="text-ink-muted">Established {venture.established}</span>
                </div>

                <h2
                    id={titleId}
                    className="mt-8 max-w-[22ch] text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.16] font-bold text-royal"
                >
                    {venture.name}
                </h2>

                <p className="mt-8 max-w-[60ch] border-t border-line pt-8 text-[16px] leading-[1.85] font-medium text-royal/80">
                    {venture.summary}
                </p>

                <figure className="mt-12 overflow-hidden">
                    <img
                        src={venture.coverImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="aspect-16/9 w-full object-cover saturate-[0.85]"
                    />
                </figure>

                {/* Programme facts. Sits directly under the plate because it is
                    the part a reader scanning the dialog actually wants. */}
                <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
                    <div className="border-t border-line pt-5">
                        <dt className="eyebrow text-ink-muted">Lead Entity</dt>
                        <dd className="mt-3 text-[15px] font-semibold text-royal">
                            {venture.leadEntity}
                        </dd>
                    </div>

                    <div className="border-t border-line pt-5">
                        <dt className="eyebrow text-ink-muted">Location</dt>
                        <dd className="mt-3 text-[15px] font-semibold text-royal">
                            {venture.location}
                        </dd>
                    </div>

                    {milestones.slice(0, 2).map((milestone) => (
                        <div key={milestone.id} className="border-t border-line pt-5">
                            <dt className="eyebrow text-ink-muted">{milestone.label}</dt>
                            <dd className="mt-3 font-display text-[18px] leading-none font-bold text-royal tabular-nums">
                                {milestone.value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-14">
                    {overview.map((paragraph, index) => (
                        <p
                            key={paragraph.slice(0, 24)}
                            className={`max-w-[68ch] text-[15px] leading-[1.95] text-ink-muted ${
                                index === 0 ? "" : "mt-7"
                            }`}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Full milestone set, including the two surfaced above. Repeating
                    them keeps this list complete as a record rather than making
                    the reader assemble it from two places. */}
                <dl className="mt-14 border-t border-line pt-2">
                    {milestones.map((milestone) => (
                        <div
                            key={milestone.id}
                            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-line py-5"
                        >
                            <dt className="text-[14px] text-ink-muted">{milestone.label}</dt>
                            <dd className="font-display text-[17px] leading-none font-bold text-royal tabular-nums">
                                {milestone.value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-12">
                    <p className="eyebrow text-ink-muted">Delivered With</p>
                    <p className="mt-5 max-w-[60ch] text-[14px] leading-[1.85] text-ink-muted">
                        {partners.join(". ")}.
                    </p>
                </div>
            </article>
        </Dialog>
    );
}

/* ==========================================================================
   InnovationPage
   --------------------------------------------------------------------------
   GROUND — the running order matters:

     Hero        royal-dark     opens against the white sticky header
     Focus       surface        (white)
     Ventures    surface-soft
     Funding     surface        (white)
     Footer      royal-night    (in SiteLayout)
   ========================================================================== */
export default function InnovationPage() {
    const shouldReduceMotion = useReducedMotion();
    const [openVentureId, setOpenVentureId] = useState(null);

    /* Resolved from the id rather than held as an object, so the open dialog
       always reflects the current record once `ventures` comes from an API. */
    const openVenture = useMemo(
        () => ventures.find((venture) => venture.id === openVentureId) ?? null,
        [openVentureId],
    );

    const closeVenture = useCallback(() => setOpenVentureId(null), []);

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
                aria-labelledby="innovation-heading"
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
                        {innovationHero.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={rise}
                        id="innovation-heading"
                        className="mt-7 max-w-[16ch] text-[clamp(2.125rem,4.4vw,4rem)] leading-[1.08] font-bold text-white"
                    >
                        {innovationHero.title}
                    </motion.h1>

                    <motion.p
                        variants={rise}
                        className="mt-9 max-w-[54ch] text-[15px] leading-[1.9] text-white/55 lg:text-[16px]"
                    >
                        {innovationHero.lead}
                    </motion.p>
                </motion.div>
            </section>

            {/* ==================================================================
                FOCUS AREAS — surface
                ================================================================== */}
            <section aria-labelledby="focus-heading" className="border-t border-line bg-surface">
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-x-20">
                        <div className="lg:col-span-6">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                {focusSection.eyebrow}
                            </motion.p>

                            <motion.h2
                                variants={rise}
                                id="focus-heading"
                                className="mt-6 max-w-[24ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                            >
                                {focusSection.title}
                            </motion.h2>
                        </div>

                        <motion.p
                            variants={rise}
                            className="max-w-[54ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-5 lg:col-start-8"
                        >
                            {focusSection.intro}
                        </motion.p>
                    </div>

                    {/* Hairline rows. The disciplines read as a sentence fragment
                        rather than a row of tags — the design language has no
                        pills in it, and three short nouns do not need chrome. */}
                    <div className="mt-20 lg:mt-24">
                        {focusAreas.map((area) => (
                            <motion.article
                                key={area.id}
                                variants={rise}
                                className="grid gap-x-8 gap-y-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-x-20 lg:py-12"
                            >
                                <div className="lg:col-span-4">
                                    <p className="eyebrow text-ink-muted/60">{area.index}</p>

                                    <h3 className="mt-5 max-w-[18ch] text-[19px] leading-snug font-bold text-royal">
                                        {area.title}
                                    </h3>

                                    <p className="eyebrow mt-5 text-gold-dark">{area.leadEntity}</p>
                                </div>

                                <div className="lg:col-span-4">
                                    <p className="max-w-[36ch] font-display text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-[1.5] font-medium text-balance text-royal">
                                        {area.statement}
                                    </p>
                                </div>

                                <div className="lg:col-span-3 lg:col-start-10">
                                    <p className="max-w-[46ch] text-[14px] leading-[1.85] text-ink-muted">
                                        {area.detail}
                                    </p>

                                    <p className="mt-6 text-[13px] leading-relaxed text-ink-muted/75">
                                        {area.disciplines.join(" · ")}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
                VENTURES — surface-soft
                ================================================================== */}
            <section
                aria-labelledby="ventures-heading"
                className="border-t border-line bg-surface-soft"
            >
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <motion.p variants={rise} className="eyebrow text-gold-dark">
                        {venturesSection.eyebrow}
                    </motion.p>

                    <motion.h2
                        variants={rise}
                        id="ventures-heading"
                        className="mt-6 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                    >
                        {venturesSection.title}
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                        className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12"
                    >
                        {ventures.map((venture) => (
                            <motion.article
                                key={venture.id}
                                variants={rise}
                                className="group relative flex flex-col border-t border-line pt-8"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={venture.coverImage}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-3/2 w-full object-cover saturate-[0.82] transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                                    />
                                </div>

                                <div className="eyebrow mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                                    <span className="text-gold-dark">
                                        {stageLabel(venture.stage)}
                                    </span>
                                    <span className="text-ink-muted">{venture.sector}</span>
                                </div>

                                <h3 className="mt-6 text-[19px] leading-snug font-bold text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light">
                                    {/* The card's single interactive element. The
                                        overlay stretches its hit area across the
                                        whole card while assistive tech still reads
                                        one control named by the programme. */}
                                    <button
                                        type="button"
                                        onClick={() => setOpenVentureId(venture.id)}
                                        aria-haspopup="dialog"
                                        className="text-left after:absolute after:inset-0 after:content-['']"
                                    >
                                        {venture.name}
                                    </button>
                                </h3>

                                <p className="mt-5 max-w-[44ch] text-[14px] leading-[1.8] text-ink-muted">
                                    {venture.summary}
                                </p>

                                <div className="mt-6 flex items-center gap-4 pt-2">
                                    <span className="text-[13px] text-ink-muted">
                                        {venture.leadEntity}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="text-gold-dark opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-1.5 group-hover:opacity-100"
                                    >
                                        &rarr;
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* ==================================================================
                FUNDING — surface
                ================================================================== */}
            <section aria-labelledby="funding-heading" className="border-t border-line bg-surface">
                <motion.div
                    {...stagger}
                    className="mx-auto grid max-w-360 gap-x-8 gap-y-10 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-x-20 lg:px-10 lg:py-32"
                >
                    <div className="lg:col-span-6">
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            {capitalNote.eyebrow}
                        </motion.p>

                        <motion.h2
                            variants={rise}
                            id="funding-heading"
                            className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                        >
                            {capitalNote.title}
                        </motion.h2>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <motion.p
                            variants={rise}
                            className="max-w-[54ch] border-t border-line pt-10 text-[15px] leading-[1.9] text-ink-muted"
                        >
                            {capitalNote.body}
                        </motion.p>

                        <motion.div variants={rise}>
                            <Link
                                to={capitalNote.ctaPath}
                                className="group mt-12 inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                            >
                                <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                    {capitalNote.ctaLabel}
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                >
                                    &rarr;
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <AnimatePresence>
                {openVenture && (
                    <VentureDialog
                        key={openVenture.id}
                        venture={openVenture}
                        onClose={closeVenture}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
