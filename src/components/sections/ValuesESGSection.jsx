import { motion, useReducedMotion } from "framer-motion";
import { esgCommitments } from "../../data/homeData";
import { buildSrcSet, unsplash } from "../../lib/images";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   ValuesESGSection
   --------------------------------------------------------------------------
   Tall plate on the left, commitments stacked on the right. The photograph is
   pulled back with a light desaturation and a faint royal veil: the source
   frame is a bright open-sky shot, and left untreated it fights the muted
   palette everything else on the page is built on.
   ========================================================================== */
export default function ValuesESGSection() {
  const shouldReduceMotion = useReducedMotion();

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
      aria-labelledby="commitment-heading"
      className="border-t border-line bg-surface"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-360 gap-x-8 gap-y-14 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-x-16 lg:px-10 lg:py-32"
      >
        {/* ---------------- Plate ---------------- */}
        <motion.figure
          variants={rise}
          className="relative overflow-hidden lg:col-span-5"
        >
          <img
            src={unsplash(esgCommitments.photoId, 1280)}
            srcSet={buildSrcSet(esgCommitments.photoId)}
            sizes="(min-width: 64rem) 40vw, 100vw"
            alt={esgCommitments.imageAlt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: esgCommitments.focal }}
            className="aspect-4/5 w-full object-cover saturate-[0.72]"
          />
          {/* Veil, not a gradient wash. Just enough to seat the frame in the
              page's colour temperature. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-royal-deep/12"
          />
        </motion.figure>

        {/* ---------------- Commitments ---------------- */}
        <div className="lg:col-span-6 lg:col-start-7">
          <motion.p variants={rise} className="eyebrow text-gold-dark">
            Our Commitment
          </motion.p>

          <motion.h2
            variants={rise}
            id="commitment-heading"
            className="mt-6 max-w-[18ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
          >
            Responsible leadership. Sustainable growth.
          </motion.h2>

          <dl className="mt-12">
            {esgCommitments.values.map((value) => (
              <motion.div
                key={value.id}
                variants={rise}
                className="border-t border-line py-9 last:pb-0"
              >
                <dt className="flex items-baseline gap-5">
                  <span className="eyebrow text-ink-muted/60">
                    {value.index}
                  </span>
                  <span className="text-[18px] font-bold text-royal">
                    {value.title}
                  </span>
                </dt>
                <dd className="mt-4 max-w-[52ch] pl-[calc(2ch+1.25rem)] text-[14px] leading-[1.8] text-ink-muted">
                  {value.detail}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
