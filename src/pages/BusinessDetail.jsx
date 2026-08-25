import { motion, useReducedMotion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { findEntityBySlug, otherEntities } from "../data/businessesData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   ExternalSiteLink
   --------------------------------------------------------------------------
   The one place the group site hands a reader off to a company's own site.

   `status` decides what gets rendered, and that is the whole reason the field
   exists: 'live' produces a real anchor, 'pending' prints the domain as plain
   text with a launch note. A corporate site linking to a domain that is not
   up yet is worse than one that says so, and the usual alternative —
   commenting the link out until launch — is what everyone forgets to undo.

   Opens in a new tab with `rel="noreferrer noopener"`. Leaving a corporate
   profile is a context switch, and the reader should be able to come back to
   it without the browser back button.
   ========================================================================== */
function ExternalSiteLink({ website, entityName, tone = "light" }) {
    if (!website) return null;

    const isDark = tone === "dark";

    if (website.status !== "live") {
        return (
            <div>
                <p
                    className={`text-[15px] font-semibold ${isDark ? "text-white/70" : "text-royal"}`}
                >
                    {website.display}
                </p>
                <p className={`eyebrow mt-3 ${isDark ? "text-white/40" : "text-ink-muted"}`}>
                    Site launching soon
                </p>
            </div>
        );
    }

    return (
        <a
            href={website.url}
            target="_blank"
            rel="noreferrer noopener"
            className={`group inline-flex items-center gap-4 border-b pb-2 transition-colors duration-500 ease-premium ${
                isDark ? "border-gold/40 hover:border-gold" : "border-line hover:border-gold"
            }`}
        >
            <span
                className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${
                    isDark ? "text-white" : "text-royal"
                }`}
            >
                Visit {entityName}
            </span>
            <span
                aria-hidden="true"
                className={`transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    isDark ? "text-gold" : "text-gold-dark"
                }`}
            >
                &#8599;
            </span>
        </a>
    );
}

/* ==========================================================================
   BusinessDetail
   --------------------------------------------------------------------------
   One template, every company. The record decides what renders: the parent
   has no external site and no operational pipeline, so `website` and
   `detail.operations` are null on that record and the sections they drive are
   skipped rather than printed empty.

   GROUND — computed rather than written in, because the operations band is
   optional and hard-coding the sequence would put two identical grounds side
   by side on the parent's page, where the seam between them disappears:

     Hero          royal-dark
     Narrative     surface        (white)
     Capabilities  surface-soft
     Operations    surface        (white)      — optional
     Elsewhere     alternates off the above
     Footer        royal-night    (in SiteLayout)

   Scroll position is handled by <ScrollToTop /> in App.jsx, which resets on
   every pathname change — so moving between two detail pages lands at the top
   rather than mid-page.

   REMOUNTING — see the wrapper at the bottom of this file. React Router keeps
   one instance of this component alive across a :slug change, which left the
   `whileInView` sections holding whatever animation state the previous
   company's page had reached.
   ========================================================================== */
function BusinessDetail({ slug }) {
    const shouldReduceMotion = useReducedMotion();
    const entity = findEntityBySlug(slug);

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

    /* An unrecognised slug resolves to a not-found state rather than throwing
       or silently redirecting. A stale link in a press release should say what
       went wrong, not quietly land the reader somewhere else. */
    if (!entity) {
        return (
            <NotFoundPage
                eyebrow="Error 404"
                title="Company Not Found"
                description="We could not match that address to a company in the group. Check the link, or browse the full portfolio from the Our Businesses menu."
            />
        );
    }

    const { lead, narrative, metrics, capabilities, operations } = entity.detail;
    const siblings = otherEntities(entity.slug);

    /* Keep the alternation intact whether or not the operations band renders. */
    const elsewhereGround = operations ? "bg-surface-soft" : "bg-surface";

    return (
        <>
            {/* ==================================================================
                HERO — royal-dark
                ================================================================== */}
            <section
                aria-labelledby="entity-heading"
                className="relative isolate overflow-hidden bg-royal-dark"
            >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-linear-to-br from-royal-light/35 via-royal-deep/0 to-royal-dark" />
                </div>

                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    className="mx-auto max-w-360 px-5 py-20 sm:px-6 lg:px-10 lg:py-32"
                >
                    {/* Return path. A detail page reached from a press release or
                        a search result has no history to go back through. */}
                    <motion.div variants={rise}>
                        <Link
                            to="/businesses"
                            className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase transition-colors duration-500 ease-premium hover:text-white"
                        >
                            <span
                                aria-hidden="true"
                                className="text-gold transition-transform duration-500 ease-premium group-hover:-translate-x-1.5"
                            >
                                &larr;
                            </span>
                            All Group Companies
                        </Link>
                    </motion.div>

                    <motion.p variants={rise} className="eyebrow mt-14 text-gold">
                        {entity.sector}
                    </motion.p>

                    <motion.h1
                        variants={rise}
                        id="entity-heading"
                        className="mt-7 max-w-[16ch] text-[clamp(2.125rem,4.4vw,4rem)] leading-[1.08] font-bold text-white"
                    >
                        {entity.name}
                    </motion.h1>

                    <motion.p
                        variants={rise}
                        className="mt-9 max-w-[56ch] text-[15px] leading-[1.9] text-white/55 lg:text-[16px]"
                    >
                        {lead}
                    </motion.p>

                    {entity.website ? (
                        <motion.div variants={rise} className="mt-12">
                            <ExternalSiteLink
                                website={entity.website}
                                entityName={entity.name}
                                tone="dark"
                            />
                        </motion.div>
                    ) : null}

                    <motion.dl
                        variants={rise}
                        className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-24 lg:grid-cols-4 lg:gap-x-12"
                    >
                        <div className="border-t border-white/12 pt-6">
                            <dt className="eyebrow text-white/45">Established</dt>
                            <dd className="mt-4 font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-none font-bold tracking-tight text-white tabular-nums">
                                {entity.established}
                            </dd>
                        </div>
                        <div className="border-t border-white/12 pt-6">
                            <dt className="eyebrow text-white/45">Headquarters</dt>
                            <dd className="mt-4 text-[15px] leading-snug font-semibold text-white">
                                {entity.headquarters}
                            </dd>
                        </div>
                        <div className="border-t border-white/12 pt-6">
                            <dt className="eyebrow text-white/45">People</dt>
                            <dd className="mt-4 font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-none font-bold tracking-tight text-white tabular-nums">
                                {entity.headcount}
                            </dd>
                        </div>
                        {/* Ownership rather than a group-role label: with the
                            parent no longer carrying a profile of its own, a
                            "Group Role" cell read "Operating Company" on every
                            page and told nobody anything. */}
                        <div className="border-t border-white/12 pt-6">
                            <dt className="eyebrow text-white/45">Ownership</dt>
                            <dd className="mt-4 text-[15px] leading-snug font-semibold text-white">
                                {entity.ownership}
                            </dd>
                        </div>
                    </motion.dl>
                </motion.div>
            </section>

            {/* ==================================================================
                NARRATIVE AND READINGS — surface
                ================================================================== */}
            <section aria-labelledby="profile-heading" className="border-t border-line bg-surface">
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    {/* Plate first, full measure. The hero carries the facts; this
                        is where the company gets a picture of itself. */}
                    <motion.figure variants={rise} className="relative overflow-hidden">
                        <img
                            src={entity.coverImage}
                            sizes="100vw"
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="aspect-16/9 w-full object-cover saturate-[0.82] lg:aspect-21/9"
                        />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-royal-deep/10"
                        />
                    </motion.figure>

                    <div className="mt-20 grid gap-x-8 gap-y-16 lg:mt-24 lg:grid-cols-12 lg:items-start lg:gap-x-20">
                        <div className="lg:col-span-6">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                The Company
                            </motion.p>

                            <motion.h2
                                variants={rise}
                                id="profile-heading"
                                className="mt-6 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                            >
                                {entity.tagline}
                            </motion.h2>

                            {narrative.map((paragraph, index) => (
                                <motion.p
                                    key={paragraph.slice(0, 24)}
                                    variants={rise}
                                    className={`max-w-[58ch] text-[15px] leading-[1.9] text-ink-muted ${
                                        index === 0 ? "mt-12" : "mt-7"
                                    }`}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>

                        {/* Readings. Stacked under hairlines rather than set as a
                            row of tiles — four related measurements of one
                            business, not four separate claims. */}
                        <dl className="lg:col-span-5 lg:col-start-8">
                            {metrics.map((metric) => (
                                <motion.div
                                    key={metric.id}
                                    variants={rise}
                                    className="border-t border-line py-8 last:pb-0"
                                >
                                    <dt className="eyebrow text-ink-muted">{metric.label}</dt>
                                    <dd>
                                        <span className="mt-4 block font-display text-[clamp(1.75rem,2.4vw,2.375rem)] leading-none font-bold tracking-tight text-royal tabular-nums">
                                            {metric.value}
                                            {metric.unit ? (
                                                <span className="text-gold-dark">
                                                    {metric.unit}
                                                </span>
                                            ) : null}
                                        </span>
                                        <span className="mt-4 block max-w-[40ch] text-[14px] leading-relaxed text-ink-muted">
                                            {metric.detail}
                                        </span>
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
                CAPABILITIES — surface-soft
                ================================================================== */}
            <section
                aria-labelledby="capabilities-heading"
                className="border-t border-line bg-surface-soft"
            >
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <motion.p variants={rise} className="eyebrow text-gold-dark">
                        What It Does
                    </motion.p>

                    <motion.h2
                        variants={rise}
                        id="capabilities-heading"
                        className="mt-6 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                    >
                        The work, in its own words.
                    </motion.h2>

                    <dl className="mt-20 lg:mt-24">
                        {capabilities.map((capability) => (
                            <motion.div
                                key={capability.id}
                                variants={rise}
                                className="grid gap-x-8 gap-y-4 border-t border-line py-9 lg:grid-cols-12 lg:gap-x-20 lg:py-11"
                            >
                                <dt className="flex items-baseline gap-5 lg:col-span-4">
                                    <span className="eyebrow text-ink-muted/60">
                                        {capability.index}
                                    </span>
                                    <span className="text-[18px] leading-snug font-bold text-royal">
                                        {capability.title}
                                    </span>
                                </dt>
                                <dd className="max-w-[64ch] text-[14px] leading-[1.85] text-ink-muted lg:col-span-7 lg:col-start-6">
                                    {capability.detail}
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </motion.div>
            </section>

            {/* ==================================================================
                OPERATIONS — surface. Skipped entirely when the record has no
                pipeline, rather than rendering an empty band.
                ================================================================== */}
            {operations ? (
                <section
                    aria-labelledby="operations-heading"
                    className="border-t border-line bg-surface"
                >
                    <motion.div
                        {...stagger}
                        className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                    >
                        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-x-20">
                            <div className="lg:col-span-6">
                                <motion.p variants={rise} className="eyebrow text-gold-dark">
                                    {operations.eyebrow}
                                </motion.p>

                                <motion.h2
                                    variants={rise}
                                    id="operations-heading"
                                    className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                                >
                                    {operations.title}
                                </motion.h2>
                            </div>

                            <motion.p
                                variants={rise}
                                className="max-w-[54ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-5 lg:col-start-8"
                            >
                                {operations.intro}
                            </motion.p>
                        </div>

                        {/* An ordered list, because the sequence is the content.
                            The ordinal carries it at display size; nothing else
                            on the row competes. */}
                        <ol className="mt-20 lg:mt-24">
                            {operations.steps.map((step) => (
                                <motion.li
                                    key={step.id}
                                    variants={rise}
                                    className="grid gap-x-8 gap-y-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-x-20 lg:py-12"
                                >
                                    <p className="font-display text-[clamp(1.75rem,2.4vw,2.375rem)] leading-none font-bold tracking-tight text-ink-muted/35 tabular-nums lg:col-span-2">
                                        {step.index}
                                    </p>

                                    <h3 className="max-w-[22ch] self-baseline text-[18px] leading-snug font-bold text-royal lg:col-span-4">
                                        {step.title}
                                    </h3>

                                    <p className="max-w-[58ch] text-[14px] leading-[1.85] text-ink-muted lg:col-span-5 lg:col-start-8">
                                        {step.detail}
                                    </p>
                                </motion.li>
                            ))}
                        </ol>
                    </motion.div>
                </section>
            ) : null}

            {/* ==================================================================
                ELSEWHERE IN THE GROUP — ground alternates off the band above
                ================================================================== */}
            <section
                aria-labelledby="elsewhere-heading"
                className={`border-t border-line ${elsewhereGround}`}
            >
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-20">
                        <div className="lg:col-span-7">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                Elsewhere in the Group
                            </motion.p>

                            <motion.h2
                                variants={rise}
                                id="elsewhere-heading"
                                className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                            >
                                The other companies on the same balance sheet.
                            </motion.h2>
                        </div>

                        {entity.website?.status === "live" ? (
                            <motion.div variants={rise} className="lg:col-span-4 lg:col-start-9">
                                <p className="max-w-[36ch] text-[14px] leading-relaxed text-ink-muted">
                                    Buying from {entity.name} rather than reading about it? The
                                    trading site is at {entity.website.display}.
                                </p>

                                <div className="mt-6">
                                    <ExternalSiteLink
                                        website={entity.website}
                                        entityName={entity.name}
                                    />
                                </div>
                            </motion.div>
                        ) : null}
                    </div>

                    <div className="mt-16 grid gap-x-8 gap-y-12 lg:mt-20 lg:grid-cols-2 lg:gap-x-20">
                        {siblings.map((sibling) => (
                            <motion.article
                                key={sibling.id}
                                variants={rise}
                                className="group relative border-t border-line pt-8"
                            >
                                <p className="eyebrow text-gold-dark">{sibling.sector}</p>

                                <h3 className="mt-5 font-display text-[clamp(1.375rem,1.8vw,1.75rem)] leading-none font-bold tracking-tight text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light">
                                    <Link
                                        to={`/businesses/${sibling.slug}`}
                                        className="after:absolute after:inset-0 after:content-['']"
                                    >
                                        {sibling.name}
                                    </Link>
                                </h3>

                                <p className="mt-5 max-w-[48ch] text-[14px] leading-[1.8] text-ink-muted">
                                    {sibling.tagline}
                                </p>

                                <span
                                    aria-hidden="true"
                                    className="mt-6 inline-block text-gold-dark opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-1.5 group-hover:opacity-100"
                                >
                                    &rarr;
                                </span>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </section>
        </>
    );
}

/* ==========================================================================
   BusinessDetailRoute
   --------------------------------------------------------------------------
   What the router actually mounts.

   React Router reuses a component instance when only a route param changes,
   so navigating Clara → Warrick Motors updated `useParams()` and swapped the
   copy while keeping every framer-motion element alive. Those elements had
   already been marked as animated by `viewport={{ once: true }}` on the
   previous page, or were still sitting at their hidden variant because they
   had never scrolled into view there — and either way the new page inherited
   that state instead of starting clean. The visible symptom was a company
   profile that rendered part of its content on navigation and all of it after
   a reload.

   Keying on the slug turns a param change back into a mount. The alternative
   — resetting the animation state by hand on every section — is the same fix
   with more places to forget one.
   ========================================================================== */
export default function BusinessDetailRoute() {
    const { slug } = useParams();

    return <BusinessDetail key={slug} slug={slug} />;
}
