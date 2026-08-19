import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioEntities } from "../../data/homeData";
import { buildSrcSet, unsplash } from "../../lib/images";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   PortfolioSection
   --------------------------------------------------------------------------
   Alternating editorial rows rather than a card grid. The newsroom below is
   already a three-across grid, and stacking two identical grids flattens the
   page into a catalogue. Full-width rows give the imagery room to carry the
   section and set up a change of rhythm before the news.
   ========================================================================== */
export default function PortfolioSection() {
  const shouldReduceMotion = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.25 : 0.85, ease: EASE },
    },
  };

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-360 px-5 py-28 sm:px-6 lg:px-10">
        {/* ---------------- Header ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-x-8 gap-y-6 lg:grid-cols-12"
        >
          <motion.p
            variants={rise}
            className="eyebrow text-gold-dark lg:col-span-12"
          >
            Our Portfolio
          </motion.p>

          <motion.h2
            variants={rise}
            id="portfolio-heading"
            className="max-w-[18ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal lg:col-span-7"
          >
            Diversified strengths. Shared vision for excellence.
          </motion.h2>

          <motion.p
            variants={rise}
            className="max-w-[46ch] text-[15px] leading-[1.75] text-ink-muted lg:col-span-4 lg:col-start-9 lg:pt-2"
          >
            Three operating companies, one balance sheet and one set of
            standards. Each runs its own market on its own terms, and each is
            held to the same view on capital and quality.
          </motion.p>
        </motion.div>

        {/* ---------------- Entity rows ---------------- */}
        <div className="mt-20 lg:mt-28">
          {portfolioEntities.map((entity, index) => {
            /* Sides alternate so the eye zig-zags down the page instead of
               tracking a single column edge. */
            const imageFirst = index % 2 === 0;

            return (
              <motion.article
                key={entity.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                className="grid items-center gap-10 border-t border-line pt-12 pb-20 last:pb-0 lg:grid-cols-12 lg:gap-16 lg:pt-16 lg:pb-28"
              >
                {/* Plate */}
                <motion.div
                  variants={rise}
                  className={`lg:col-span-7 ${imageFirst ? "" : "lg:order-2"}`}
                >
                  <Link
                    to={entity.path}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="group block overflow-hidden"
                  >
                    <img
                      src={unsplash(entity.photoId, 1920)}
                      srcSet={buildSrcSet(entity.photoId)}
                      sizes="(min-width: 64rem) 58vw, 100vw"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: entity.focal }}
                      className="aspect-16/10 w-full object-cover transition-transform duration-1000 ease-premium group-hover:scale-[1.03]"
                    />
                  </Link>
                </motion.div>

                {/* Editorial column */}
                <motion.div
                  variants={rise}
                  className={`lg:col-span-5 ${imageFirst ? "" : "lg:order-1"}`}
                >
                  <p className="eyebrow text-ink-muted/70">{entity.index}</p>

                  <h3 className="mt-6 text-[clamp(1.5rem,2vw,2rem)] leading-tight font-bold text-royal">
                    {entity.name}
                  </h3>

                  <p className="eyebrow mt-4 text-gold-dark">{entity.sector}</p>

                  <p className="mt-6 max-w-[48ch] text-[15px] leading-[1.8] text-ink-muted">
                    {entity.summary}
                  </p>

                  <Link
                    to={entity.path}
                    className="group mt-8 inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                      Explore Division
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </Link>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
