import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    aboutHero,
    boardMembers,
    executiveTeam,
    governanceStatement,
    groupStory,
    principals,
} from "../data/aboutData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   AboutPage
   --------------------------------------------------------------------------
   Composition only. Every string on this page comes from src/data/aboutData.js
   so the file below stays a layout document.

   GROUND — the page alternates deliberately and the running order matters:

     Hero          royal-dark     opens against the white sticky header
     Story         surface        (white)
     Principals    surface-soft
     Leadership    surface        (white)
     Governance    surface-soft   light, so the royal-deep footer separates
     Footer        royal-night    (in SiteLayout)

   Governance stays light on purpose. Put a dark ground there and it fuses
   with the footer directly beneath it, the same failure documented in
   InquiryCTA.jsx.
   ========================================================================== */
export default function AboutPage() {
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
                aria-labelledby="about-heading"
                className="relative isolate overflow-hidden bg-royal-dark"
            >
                {/* Directional wash. Light enters top-left where the title sits and
            falls away toward the metrics, so the band reads as a lit plane
            rather than a flat fill. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-linear-to-br from-royal-light/35 via-royal-deep/0 to-royal-dark" />
                </div>

                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-40"
                >
                    <motion.p variants={rise} className="eyebrow text-gold">
                        {aboutHero.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={rise}
                        id="about-heading"
                        className="mt-7 max-w-[18ch] text-[clamp(2.125rem,4.4vw,4rem)] leading-[1.08] font-bold text-white"
                    >
                        {aboutHero.title}
                    </motion.h1>

                    <motion.p
                        variants={rise}
                        className="mt-9 max-w-[52ch] text-[15px] leading-[1.9] text-white/55 lg:text-[16px]"
                    >
                        {aboutHero.lead}
                    </motion.p>

                    {/* Group facts. A definition list rather than four cards: the values
              are related readings of one company, not four separate claims. */}
                    <motion.dl
                        variants={rise}
                        className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-28 lg:grid-cols-4 lg:gap-x-12"
                    >
                        {aboutHero.meta.map((item) => (
                            <div key={item.id} className="border-t border-white/12 pt-6">
                                <dt className="eyebrow text-white/45">{item.label}</dt>
                                <dd className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none font-bold tracking-tight text-white">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>
            </section>

            {/* ==================================================================
          HISTORY AND MISSION — surface
          ================================================================== */}
            <section aria-labelledby="story-heading" className="border-t border-line bg-surface">
                <motion.div
                    {...stagger}
                    className="mx-auto grid max-w-360 gap-x-8 gap-y-16 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-x-20 lg:px-10 lg:py-32"
                >
                    {/* ---------------- History ---------------- */}
                    <div className="lg:col-span-6">
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            {groupStory.eyebrow}
                        </motion.p>

                        <motion.h2
                            variants={rise}
                            id="story-heading"
                            className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                        >
                            {groupStory.title}
                        </motion.h2>

                        {groupStory.history.map((paragraph, index) => (
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

                    {/* ---------------- Mission and values ---------------- */}
                    <div className="lg:col-span-5 lg:col-start-8">
                        <motion.p
                            variants={rise}
                            className="max-w-[30ch] border-t border-line pt-10 font-display text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.45] font-medium text-balance text-royal"
                        >
                            {groupStory.missionStatement}
                        </motion.p>

                        <dl className="mt-14">
                            {groupStory.values.map((value) => (
                                <motion.div
                                    key={value.id}
                                    variants={rise}
                                    className="border-t border-line py-8 last:pb-0"
                                >
                                    <dt className="flex items-baseline gap-5">
                                        <span className="eyebrow text-ink-muted/60">
                                            {value.index}
                                        </span>
                                        <span className="text-[17px] font-bold text-royal">
                                            {value.title}
                                        </span>
                                    </dt>
                                    <dd className="mt-3.5 max-w-[48ch] pl-[calc(2ch+1.25rem)] text-[14px] leading-[1.8] text-ink-muted">
                                        {value.detail}
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </motion.div>
            </section>

            {/* ==================================================================
          PRINCIPALS — surface-soft

          Two founding officers, given equal ground. A single large portrait
          with a second person appended underneath would have read as a
          hierarchy the register does not describe, so the block is a two-up
          grid: same plate ratio, same type sizes, same rules on both sides.

          Each quote sits beside its plate rather than over it. Display type
          on a face needs a scrim, and a scrim heavy enough to hold it is
          heavy enough to bury the face underneath.
          ================================================================== */}
            <section
                aria-labelledby="principals-heading"
                className="border-t border-line bg-surface-soft"
            >
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <motion.p variants={rise} className="eyebrow text-gold-dark">
                        Office of the Chairman
                    </motion.p>

                    <motion.h2
                        variants={rise}
                        id="principals-heading"
                        className="mt-6 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                    >
                        Founded and still led by the same two people.
                    </motion.h2>

                    {/* Each plate is capped at 34rem and pushed to the outer edge of its
              cell, so a 4:5 portrait lands around 680px tall — the same height
              the single founder plate had at col-span-5. Left the columns to
              fill the full 1360px measure and the portraits would have come
              out over 800px, which is a poster, not a plate. The odd/even
              alignment holds for any number of principals, not just two. */}
                    <div className="mt-16 grid gap-x-8 gap-y-24 lg:mt-24 lg:grid-cols-2 lg:gap-x-24">
                        {principals.map((person) => (
                            <motion.article
                                key={person.id}
                                variants={rise}
                                className="w-full lg:max-w-136 lg:odd:justify-self-start lg:even:justify-self-end"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={person.photo}
                                        sizes="(min-width: 64rem) 44vw, 100vw"
                                        alt={`${person.name}, ${person.title} of Warrick Corporation`}
                                        loading="lazy"
                                        decoding="async"
                                        style={{ objectPosition: person.focal }}
                                        className="aspect-4/5 w-full object-cover saturate-[0.85]"
                                    />
                                    {/* A veil, not a wash. Enough to seat the frame in the
                      page's colour temperature without greying the face. */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-royal-deep/8"
                                    />
                                </div>

                                <h3 className="mt-10 font-display text-[clamp(1.625rem,2.2vw,2.25rem)] leading-none font-bold tracking-tight text-royal">
                                    {person.name}
                                </h3>

                                <p className="eyebrow mt-5 text-gold-dark">{person.title}</p>

                                {person.quote ? (
                                    <figure className="mt-10">
                                        <blockquote>
                                            <p className="max-w-[32ch] font-display text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.42] font-medium text-balance text-royal">
                                                &ldquo;{person.quote}&rdquo;
                                            </p>
                                        </blockquote>
                                    </figure>
                                ) : null}

                                <p className="mt-10 max-w-[52ch] border-t border-line pt-10 text-[15px] leading-[1.9] text-ink-muted">
                                    {person.bio}
                                </p>
                            </motion.article>
                        ))}
                    </div>

                    <motion.div variants={rise}>
                        <Link
                            to="/businesses"
                            className="group mt-20 inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                        >
                            <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                Explore the Operating Companies
                            </span>
                            <span
                                aria-hidden="true"
                                className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                            >
                                &rarr;
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ==================================================================
          LEADERSHIP TEAM — surface
          ================================================================== */}
            <section
                aria-labelledby="leadership-heading"
                className="border-t border-line bg-surface"
            >
                <div className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
                    <motion.div {...stagger}>
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            Executive Leadership
                        </motion.p>

                        <motion.h2
                            variants={rise}
                            id="leadership-heading"
                            className="mt-6 max-w-[22ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                        >
                            The people accountable for the numbers.
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        {...stagger}
                        viewport={{ once: true, margin: "-80px" }}
                        className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-3 lg:mt-20 lg:gap-x-12"
                    >
                        {executiveTeam.map((person) => (
                            <motion.article
                                key={person.id}
                                variants={rise}
                                className="border-t border-line pt-8"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={person.photo}
                                        sizes="(min-width: 48rem) 30vw, 100vw"
                                        alt={`${person.name}, ${person.title}`}
                                        loading="lazy"
                                        decoding="async"
                                        style={{ objectPosition: person.focal }}
                                        className="aspect-4/5 w-full object-cover saturate-[0.82]"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 bg-royal-deep/8"
                                    />
                                </div>

                                <h3 className="mt-8 text-[19px] leading-snug font-bold text-royal">
                                    {person.name}
                                </h3>

                                <p className="eyebrow mt-3.5 text-gold-dark">{person.title}</p>

                                <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.8] text-ink-muted">
                                    {person.bio}
                                </p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================================================================
          GOVERNANCE — surface-soft
          ================================================================== */}
            <section
                aria-labelledby="governance-heading"
                className="border-t border-line bg-surface-soft"
            >
                <motion.div
                    {...stagger}
                    className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32"
                >
                    <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-x-20">
                        <div className="lg:col-span-6">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                {governanceStatement.eyebrow}
                            </motion.p>

                            <motion.h2
                                variants={rise}
                                id="governance-heading"
                                className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
                            >
                                {governanceStatement.title}
                            </motion.h2>
                        </div>

                        <motion.p
                            variants={rise}
                            className="max-w-[54ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-5 lg:col-start-8"
                        >
                            {governanceStatement.intro}
                        </motion.p>
                    </div>

                    {/* Hairline clause rows. Title left, detail right, one rule between
              each — the register of a governance statement, not a card grid. */}
                    <dl className="mt-20 lg:mt-24">
                        {governanceStatement.clauses.map((clause) => (
                            <motion.div
                                key={clause.id}
                                variants={rise}
                                className="grid gap-x-8 gap-y-4 border-t border-line py-9 lg:grid-cols-12 lg:gap-x-20 lg:py-11"
                            >
                                <dt className="text-[17px] font-bold text-royal lg:col-span-4">
                                    {clause.title}
                                </dt>
                                <dd className="max-w-[64ch] text-[14px] leading-[1.85] text-ink-muted lg:col-span-7 lg:col-start-6">
                                    {clause.detail}
                                </dd>
                            </motion.div>
                        ))}
                    </dl>

                    {/* Non-executive roster. Text only: headshots would give the board
              the same visual weight as the operating leadership above. */}
                    <motion.div
                        variants={rise}
                        className="mt-20 border-t border-line pt-12 lg:mt-24"
                    >
                        <p className="eyebrow text-ink-muted">Non-Executive Oversight</p>

                        <div className="mt-10 grid gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-x-20">
                            {boardMembers.map((member) => (
                                <div key={member.id}>
                                    <p className="text-[17px] font-bold text-royal">
                                        {member.name}
                                    </p>
                                    <p className="eyebrow mt-3 text-gold-dark">{member.title}</p>
                                    <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.8] text-ink-muted">
                                        {member.bio}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.p
                        variants={rise}
                        className="mt-16 max-w-[64ch] border-t border-line pt-8 text-[13px] leading-relaxed text-ink-muted"
                    >
                        {governanceStatement.footnote}
                    </motion.p>
                </motion.div>
            </section>
        </>
    );
}
