import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { newsItems } from "../../data/homeData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   NewsSection
   --------------------------------------------------------------------------
   Three releases under hairline rules. Each card is one link, stretched over
   the whole card with an ::after overlay rather than wrapping every element,
   so the card is fully clickable while screen readers still announce a single
   destination with the headline as its name.
   ========================================================================== */
export default function NewsSection() {
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
      aria-labelledby="news-heading"
      className="border-t border-line bg-surface-soft"
    >
      <div className="mx-auto max-w-360 px-5 py-28 sm:px-6 lg:px-10">
        {/* ---------------- Header ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div>
            <motion.p variants={rise} className="eyebrow text-gold-dark">
              Media &amp; Insights
            </motion.p>

            <motion.h2
              variants={rise}
              id="news-heading"
              className="mt-6 max-w-[20ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
            >
              Latest announcements and group news
            </motion.h2>
          </div>

          <motion.div variants={rise} className="shrink-0">
            <Link
              to="/news"
              className="group inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
            >
              <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                View All Press Releases
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

        {/* ---------------- Releases ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3 lg:mt-20 lg:gap-x-12"
        >
          {newsItems.map((item) => (
            <motion.article
              key={item.id}
              variants={rise}
              className="group relative border-t border-line pt-8"
            >
              <div className="eyebrow flex items-center gap-5">
                <time dateTime={item.dateTime} className="text-ink-muted">
                  {item.date}
                </time>
                <span className="text-gold-dark">{item.category}</span>
              </div>

              <h3 className="mt-6 text-[19px] leading-snug font-bold text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light">
                <Link
                  to={item.path}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {item.headline}
                </Link>
              </h3>

              <p className="mt-5 text-[13px] text-ink-muted">{item.readTime}</p>

              <span
                aria-hidden="true"
                className="mt-6 inline-block text-gold-dark opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-1.5 group-hover:opacity-100"
              >
                &rarr;
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
