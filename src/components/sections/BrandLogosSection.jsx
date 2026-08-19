import { motion, useReducedMotion } from "framer-motion";
import { brandEntities } from "../../data/homeData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   BrandLogosSection
   --------------------------------------------------------------------------
   Typographic wordmarks, not image assets. There is no licensed logo library
   yet, and setting real names in the display face is honest placeholder work:
   it holds the exact layout an SVG set will drop into, without inventing
   marks that would then have to be unpicked.

   No boxes and no dividers between marks. A logo strip earns its calm from
   the space around it, and ruling it into cells turns it into a table.
   ========================================================================== */
export default function BrandLogosSection() {
  const shouldReduceMotion = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.25 : 0.75, ease: EASE },
    },
  };

  return (
    <section
      aria-labelledby="entities-heading"
      className="border-t border-line bg-surface-soft"
    >
      <div className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.p variants={rise} className="eyebrow text-gold-dark">
            Global Footprint &amp; Entities
          </motion.p>

          <motion.h2
            variants={rise}
            id="entities-heading"
            className="mt-6 max-w-[18ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-royal"
          >
            Integrity built across key markets
          </motion.h2>

          {/* The strip. Grayscale and held back at half opacity so the marks
              read as a group rather than six competing signatures. */}
          <motion.ul
            variants={rise}
            className="mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-12 border-t border-line pt-16 sm:grid-cols-3 lg:mt-20 lg:grid-cols-6 lg:gap-x-10"
          >
            {brandEntities.map((brand) => (
              <li key={brand.id} className="text-center">
                <span className="inline-block text-[13px] leading-tight font-bold tracking-[0.16em] whitespace-nowrap text-ink uppercase opacity-50 transition-opacity duration-500 ease-premium hover:opacity-100">
                  {brand.name}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
