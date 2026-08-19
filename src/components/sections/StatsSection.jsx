import { motion, useReducedMotion } from "framer-motion";
import { groupMetrics } from "../../data/homeData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* Gutters around the hairline dividers.
   --------------------------------------------------------------------------
   A cell only gets padding on the side where a divider actually sits, so the
   first cell of a row stays flush left (its figure lines up with the heading
   above) and the last stays flush right.

   This is nth-child rather than first:/last: because the column count changes
   (1 / 2 / 4), so "first in row" is a different child at each breakpoint: at
   two columns cell 3 opens row two. The sm and lg rules are written as
   non-overlapping media ranges, and each one is the only declaration touching
   its property, so nothing here depends on cascade order. */
const CELL = [
  "group bg-surface-soft py-10 sm:py-12",
  /* two columns: even cells sit right of a divider, odd cells left of one */
  "sm:max-lg:[&:nth-child(even)]:pl-8",
  "sm:max-lg:[&:nth-child(odd)]:pr-8",
  /* four columns: everything but column 1 has a divider on its left, and
     everything but column 4 has one on its right */
  "lg:[&:not(:nth-child(4n+1))]:pl-8",
  "lg:[&:not(:nth-child(4n))]:pr-8",
].join(" ");

/* ==========================================================================
   StatsSection
   --------------------------------------------------------------------------
   The off-white counterweight to the hero. Coming straight off a full-bleed
   royal plate, the switch to paper is what tells the reader the fold has been
   crossed, so the contrast is doing structural work rather than decoration.

   Structure comes from hairlines and white space only. The dividers are the
   1px gaps in a `gap-px` grid sitting on a line-coloured ground, which is the
   one technique that stays correct at one, two and four columns without
   leaving a stray rule at the end of a wrapped row.
   ========================================================================== */
export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion();

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.25 : 0.8, ease: EASE },
    },
  };

  return (
    <section
      aria-labelledby="impact-heading"
      className="border-t border-line bg-surface-soft"
    >
      <div className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
        {/* ---------------- Header ---------------- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-x-8 gap-y-6 lg:grid-cols-12"
        >
          <motion.p
            variants={rise}
            className="eyebrow text-gold-dark lg:col-span-12"
          >
            Enterprise Scale &amp; Impact
          </motion.p>

          <motion.h2
            variants={rise}
            id="impact-heading"
            className="max-w-[20ch] font-display text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-royal lg:col-span-7"
          >
            Engineered for longevity. Measured by real performance.
          </motion.h2>

          <motion.p
            variants={rise}
            className="max-w-[46ch] text-[15px] leading-[1.75] text-ink-muted lg:col-span-4 lg:col-start-9 lg:pt-2"
          >
            The figures below are the ones we manage the group against. They are
            reviewed each quarter and reported on the same basis to our board
            and our partners.
          </motion.p>
        </motion.div>

        {/* ---------------- Metric grid ---------------- */}
        <motion.dl
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {groupMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={rise}
              className={CELL}
            >
              {/* Figure. The symbol carries the gold so the numeral stays
                  charcoal and keeps its full contrast. */}
              <dt className="flex items-start font-display text-[clamp(2.5rem,4.4vw,3.75rem)] leading-none font-bold tracking-tight text-ink">
                {metric.value}
                {metric.symbol ? (
                  <span className="ml-0.5 text-gold-dark">{metric.symbol}</span>
                ) : null}
              </dt>

              {/* Underline fills in from the left on hover. */}
              <span
                aria-hidden="true"
                className="rule-gold mt-6 w-10 origin-left scale-x-100 transition-transform duration-700 ease-premium group-hover:scale-x-[3.2]"
              />

              <dd>
                <p className="mt-6 text-[13px] font-semibold tracking-[0.14em] text-royal uppercase">
                  {metric.label}
                </p>
                <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-ink-muted">
                  {metric.detail}
                </p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
