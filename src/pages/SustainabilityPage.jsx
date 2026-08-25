import { motion, useReducedMotion } from "framer-motion";
import {
    assuranceNote,
    esgPillars,
    esgSection,
    formatPublished,
    position,
    reports,
    reportsSection,
    roadmap,
    statusLabel,
    sustainabilityHero,
} from "../data/sustainabilityData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   SustainabilityPage
   --------------------------------------------------------------------------
   Composition only. Every string comes from src/data/sustainabilityData.js.

   GROUND — the running order matters:

     Hero        royal-dark     opens against the white sticky header
     Roadmap     surface        (white)
     ESG         surface-soft
     Reports     surface        (white)
     Footer      royal-night    (in SiteLayout)

   Reports stays light so the near-black footer terminates the page cleanly.
   Put a dark ground on the last section and the two fuse, the same failure
   documented in InquiryCTA.jsx.

   NO METERS — progress is stated as a figure, never drawn as a bar. A
   progress bar in a corporate disclosure implies a precision the underlying
   verification does not have, and the design language has no filled shapes
   in it anyway.
   ========================================================================== */
export default function SustainabilityPage() {
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
                aria-labelledby="sustainability-heading"
                className="relative isolate overflow-hidden bg-royal-dark"
            >
                {/* Directional wash. Light enters top-left where the title sits
                    and falls away toward the metrics, so the band reads as a lit
                    plane rather than a flat fill. */}
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
                        {sustainabilityHero.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={rise}
                        id="sustainability-heading"
                        className="mt-7 max-w-[14ch] text-[clamp(2.125rem,4.4vw,4rem)] leading-[1.08] font-bold text-white"
                    >
                        {sustainabilityHero.title}
                    </motion.h1>

                    <motion.p
                        variants={rise}
                        className="mt-9 max-w-[54ch] text-[15px] leading-[1.9] text-white/55 lg:text-[16px]"
                    >
                        {sustainabilityHero.lead}
                    </motion.p>

                    {/* Group position. A definition list rather than four cards:
                        these are related readings of one programme. */}
                    <motion.dl
                        variants={rise}
                        className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 lg:mt-28 lg:grid-cols-4 lg:gap-x-12"
                    >
                        {position.map((item) => (
                            <div key={item.id} className="border-t border-white/12 pt-6">
                                <dt className="eyebrow text-white/45">{item.label}</dt>
                                <dd>
                                    <span className="mt-4 block font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none font-bold tracking-tight text-white">
                                        {item.value}
                                        {item.unit ? (
                                            <span className="text-gold">{item.unit}</span>
                                        ) : null}
                                    </span>
                                    <span className="mt-4 block max-w-[26ch] text-[13px] leading-relaxed text-white/45">
                                        {item.detail}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>
            </section>

            {/* ==================================================================
                ROADMAP — surface
                ================================================================== */}
            <section aria-labelledby="roadmap-heading" className="border-t border-line bg-surface">
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-x-20">
                        <div className="lg:col-span-6">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                {roadmap.eyebrow}
                            </motion.p>

                            <motion.h2
                                variants={rise}
                                id="roadmap-heading"
                                className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                            >
                                {roadmap.title}
                            </motion.h2>
                        </div>

                        <motion.p
                            variants={rise}
                            className="max-w-[54ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-5 lg:col-start-8"
                        >
                            {roadmap.intro}
                        </motion.p>
                    </div>

                    {/* Milestone rows. The year carries the hierarchy, so it sits
                        at display size in its own column and nothing else on the
                        row competes with it. The active row takes a gold rule
                        instead of a grey one — the only marker on the timeline,
                        and it costs nothing structural. */}
                    <ol className="mt-20 lg:mt-24">
                        {roadmap.milestones.map((milestone) => {
                            const isActive = milestone.status === "active";

                            return (
                                <motion.li
                                    key={milestone.id}
                                    variants={rise}
                                    className={`grid gap-x-8 gap-y-5 border-t py-10 lg:grid-cols-12 lg:gap-x-20 lg:py-12 ${
                                        isActive ? "border-gold" : "border-line"
                                    }`}
                                >
                                    <div className="lg:col-span-2">
                                        <p
                                            className={`font-display text-[clamp(1.75rem,2.4vw,2.375rem)] leading-none font-bold tracking-tight tabular-nums ${
                                                isActive ? "text-royal" : "text-ink-muted/45"
                                            }`}
                                        >
                                            {milestone.year}
                                        </p>

                                        <p
                                            className={`eyebrow mt-4 ${
                                                isActive ? "text-gold-dark" : "text-ink-muted/70"
                                            }`}
                                        >
                                            {statusLabel(milestone.status)}
                                        </p>
                                    </div>

                                    <div className="lg:col-span-5">
                                        <p className="eyebrow text-ink-muted/60">
                                            {milestone.phase}
                                        </p>

                                        <h3 className="mt-4 max-w-[30ch] text-[18px] leading-snug font-bold text-royal">
                                            {milestone.title}
                                        </h3>

                                        <p className="mt-4 max-w-[40ch] text-[14px] leading-[1.8] font-medium text-royal/70">
                                            {milestone.target}
                                        </p>
                                    </div>

                                    <p className="max-w-[52ch] text-[14px] leading-[1.85] text-ink-muted lg:col-span-4 lg:col-start-9">
                                        {milestone.detail}
                                    </p>
                                </motion.li>
                            );
                        })}
                    </ol>

                    <motion.p
                        variants={rise}
                        className="mt-14 max-w-[66ch] border-t border-line pt-8 text-[13px] leading-relaxed text-ink-muted"
                    >
                        Baseline year {roadmap.baselineYear}. Target year {roadmap.targetYear}.{" "}
                        {assuranceNote}
                    </motion.p>
                </motion.div>
            </section>

            {/* ==================================================================
                ESG PILLARS — surface-soft
                ================================================================== */}
            <section aria-labelledby="esg-heading" className="border-t border-line bg-surface-soft">
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <motion.p variants={rise} className="eyebrow text-gold-dark">
                        {esgSection.eyebrow}
                    </motion.p>

                    <motion.h2
                        variants={rise}
                        id="esg-heading"
                        className="mt-6 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                    >
                        {esgSection.title}
                    </motion.h2>

                    {/* Hairline rows rather than three columns. Each pillar carries
                        a statement, four commitments and three readings, and that
                        does not fit a third of the measure without the type
                        collapsing to a size nobody reads. */}
                    <div className="mt-20 lg:mt-24">
                        {esgPillars.map((pillar) => (
                            <motion.section
                                key={pillar.id}
                                variants={rise}
                                aria-labelledby={`pillar-${pillar.id}`}
                                className="grid gap-x-8 gap-y-10 border-t border-line py-12 lg:grid-cols-12 lg:gap-x-20 lg:py-16"
                            >
                                {/* ---- Identity ---- */}
                                <div className="lg:col-span-3">
                                    <p className="eyebrow text-ink-muted/60">{pillar.index}</p>

                                    <h3
                                        id={`pillar-${pillar.id}`}
                                        className="mt-5 font-display text-[clamp(1.5rem,2vw,2rem)] leading-none font-bold tracking-tight text-royal"
                                    >
                                        {pillar.title}
                                    </h3>

                                    <p className="eyebrow mt-5 text-gold-dark">
                                        Scope {pillar.code}
                                    </p>
                                </div>

                                {/* ---- Statement and commitments ---- */}
                                <div className="lg:col-span-5">
                                    <p className="max-w-[52ch] text-[15px] leading-[1.9] text-ink-muted">
                                        {pillar.statement}
                                    </p>

                                    <ul className="mt-9">
                                        {pillar.commitments.map((commitment) => (
                                            <li
                                                key={commitment}
                                                className="flex gap-4 border-t border-line py-4 text-[14px] leading-relaxed text-royal/75 first:border-t-0 first:pt-0"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="shrink-0 text-gold-dark"
                                                >
                                                    &rarr;
                                                </span>
                                                <span className="max-w-[48ch]">{commitment}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ---- Readings ---- */}
                                <dl className="lg:col-span-3 lg:col-start-10">
                                    {pillar.metrics.map((metric) => (
                                        <div
                                            key={metric.id}
                                            className="border-t border-line py-6 first:border-t-0 first:pt-0"
                                        >
                                            <dt className="eyebrow text-ink-muted">
                                                {metric.label}
                                            </dt>
                                            <dd className="mt-3 font-display text-[clamp(1.375rem,1.8vw,1.75rem)] leading-none font-bold tracking-tight text-royal tabular-nums">
                                                {metric.value}
                                                {metric.unit ? (
                                                    <span className="text-gold-dark">
                                                        {metric.unit}
                                                    </span>
                                                ) : null}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </motion.section>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
                REPORTS — surface
                ================================================================== */}
            <section aria-labelledby="reports-heading" className="border-t border-line bg-surface">
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-x-20">
                        <div className="lg:col-span-6">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                {reportsSection.eyebrow}
                            </motion.p>

                            <motion.h2
                                variants={rise}
                                id="reports-heading"
                                className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                            >
                                {reportsSection.title}
                            </motion.h2>
                        </div>

                        <motion.p
                            variants={rise}
                            className="max-w-[54ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-5 lg:col-start-8"
                        >
                            {reportsSection.note}
                        </motion.p>
                    </div>

                    {/* Download rows. The whole row is one link, stretched with an
                        ::after overlay rather than wrapping every element, so the
                        hit area matches the row while assistive tech still reads
                        a single control named by the report title. */}
                    <ul className="mt-20 lg:mt-24">
                        {reports.map((report) => (
                            <motion.li
                                key={report.id}
                                variants={rise}
                                className="group relative border-t border-line last:border-b"
                            >
                                <a
                                    href={report.url}
                                    download
                                    className="grid gap-x-8 gap-y-4 py-8 transition-colors duration-500 ease-premium lg:grid-cols-12 lg:items-baseline lg:gap-x-12 lg:py-9"
                                >
                                    <span className="eyebrow text-gold-dark lg:col-span-2">
                                        {report.category}
                                    </span>

                                    <span className="text-[17px] leading-snug font-bold text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light lg:col-span-5">
                                        {report.title}
                                    </span>

                                    <span className="text-[13px] text-ink-muted lg:col-span-2">
                                        {report.period}
                                    </span>

                                    <span className="text-[13px] text-ink-muted tabular-nums lg:col-span-2">
                                        {report.format} · {report.pages} pp · {report.fileSize}
                                    </span>

                                    <span className="flex items-baseline gap-4 lg:col-span-1 lg:justify-end">
                                        <span className="text-[13px] text-ink-muted lg:hidden">
                                            {formatPublished(report.publishedAt)}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-y-1"
                                        >
                                            &darr;
                                        </span>
                                    </span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.p
                        variants={rise}
                        className="mt-12 max-w-[66ch] text-[13px] leading-relaxed text-ink-muted"
                    >
                        Every document is issued as a signed PDF. Earlier editions and the full
                        archive are available to shareholders through investor relations.
                    </motion.p>
                </motion.div>
            </section>
        </>
    );
}
