import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { aboutOverview } from "../../data/homeData";
import { buildSrcSet, unsplash } from "../../lib/images";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* The portrait column never exceeds about 700px, so it gets its own widths
   rather than the full-bleed ladder the hero and portfolio plates use. */
const PORTRAIT_WIDTHS = [600, 800, 1200, 1600];

/* ==========================================================================
   AboutOverviewSection
   --------------------------------------------------------------------------
   The founder column carries the portrait, the statement and the signature;
   the group column carries the argument. Splitting them this way lets the
   quote sit at display size without competing with the narrative, which is
   what happens when a pull quote is dropped inside running text.

   The quote sits beneath the plate rather than over it. Type set on a face
   has to be defended with a scrim, and a scrim heavy enough to hold display
   type is heavy enough to bury the face underneath it.
   ========================================================================== */
export default function AboutOverviewSection() {
  const shouldReduceMotion = useReducedMotion();
  const { paragraphs, pillars, principal } = aboutOverview;

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.25 : 0.85, ease: EASE },
    },
  };

  return (
    <section
      aria-labelledby="founder-heading"
      className="border-t border-line bg-surface-soft"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        className="mx-auto max-w-360 px-5 py-28 sm:px-6 lg:px-10 lg:py-36"
      >
        {/* ---------------- Header ---------------- */}
        <motion.p variants={rise} className="eyebrow text-gold-dark">
          The Founder &amp; Group Vision
        </motion.p>

        <motion.h2
          variants={rise}
          id="founder-heading"
          className="mt-7 max-w-[16ch] text-[clamp(1.875rem,2.8vw,3rem)] leading-[1.12] font-bold text-royal"
        >
          Strategic foresight. Institutional legacy.
        </motion.h2>

        <div className="mt-20 grid gap-x-8 gap-y-20 lg:mt-28 lg:grid-cols-12 lg:items-start lg:gap-x-20">
          {/* ================= Founder ================= */}
          <div className="lg:col-span-6">
            <motion.div variants={rise} className="relative overflow-hidden">
              <img
                src={unsplash(principal.photoId, 800, principal.photoQuality)}
                srcSet={buildSrcSet(principal.photoId, {
                  widths: PORTRAIT_WIDTHS,
                  quality: principal.photoQuality,
                })}
                sizes="(min-width: 64rem) 46vw, 100vw"
                alt={`${principal.name}, ${principal.title} of Warrick Corporation`}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: principal.focal }}
                className="aspect-4/5 w-full object-cover saturate-[0.85]"
              />
              {/* A veil, not a wash. Enough to seat the frame in the page's
                  colour temperature without greying the face. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-royal-deep/8"
              />
            </motion.div>

            {/* Statement and attribution. One figure so the quote and the
                person it belongs to are a single unit to assistive tech. */}
            <motion.figure
              variants={rise}
              className="mt-12 border-t border-line pt-12"
            >
              <blockquote>
                <p className="max-w-[32ch] font-display text-[clamp(1.375rem,1.9vw,1.875rem)] leading-[1.38] font-medium text-balance text-royal">
                  &ldquo;{principal.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-12">
                <p className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-none font-bold tracking-tight text-royal">
                  {principal.name}
                </p>

                <p className="eyebrow mt-5 text-ink-muted">
                  {principal.title}, Warrick Corporation
                </p>
              </figcaption>
            </motion.figure>
          </div>

          {/* ================= Group ================= */}
          <div className="lg:col-span-6">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                variants={rise}
                className={`max-w-[56ch] text-[15px] leading-[1.9] text-ink-muted ${
                  index === 0 ? "" : "mt-7"
                }`}
              >
                {paragraph}
              </motion.p>
            ))}

            <dl className="mt-16">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.id}
                  variants={rise}
                  className="border-t border-line py-6"
                >
                  <dt className="text-[17px] font-bold text-royal">
                    {pillar.title}
                  </dt>
                  <dd className="mt-2.5 max-w-[54ch] text-[14px] leading-relaxed text-ink-muted">
                    {pillar.detail}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <motion.div variants={rise}>
              <Link
                to="/about"
                className="group mt-12 inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                  Read Chairman&rsquo;s Statement &amp; Heritage
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
        </div>
      </motion.div>
    </section>
  );
}
