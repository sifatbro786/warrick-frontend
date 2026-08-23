import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { inquiryChannels } from "../../data/homeData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* ==========================================================================
   InquiryCTA
   --------------------------------------------------------------------------
   Routing, not collecting. No inputs here by design: the contact form gets a
   dedicated page, and a two-field teaser on a landing page only ever collects
   half an enquiry. Each channel is a full-width row so the hit area matches
   how deliberate the click is.

   GROUND — read this before changing the background.
   This block and the footer directly beneath it are the only two dark
   surfaces at the end of the page, so they have to separate on their own;
   there is no light section between them to do it for them. The separation
   is deliberately carried by two things at once, because either alone is too
   weak on a dark screen:

     · Value — this section sits on `royal` (#2e1a47), the footer drops to
       `royal-dark` (#180d28). Roughly eight points of L*, which is the
       smallest step that still reads as two planes rather than one.
     · Finish — this section is lit (a directional wash from royal-light),
       the footer is matte and flat. A lit panel over a matte one is what
       actually sells the seam; the value step alone is not enough.

   Keep both. If this ever moves back onto `royal-dark`, the footer will
   fuse with it again.
   ========================================================================== */
export default function InquiryCTA() {
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
      aria-labelledby="inquiries-heading"
      className="relative isolate overflow-hidden bg-royal"
    >
      {/* Directional wash. Light enters top-left, where the statement is, and
          falls away toward the footer — so the block reads as a lit panel and
          its bottom edge is already darker than its top by the time the
          footer's matte ground begins. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-royal-light/45 via-royal/0 to-royal-deep/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-royal-deep/60 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-360 gap-x-8 gap-y-12 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:gap-x-16 lg:px-10 lg:py-32"
      >
        {/* ---------------- Statement ---------------- */}
        <div className="lg:col-span-5">
          <motion.p variants={rise} className="eyebrow text-gold">
            Corporate Inquiries
          </motion.p>

          <motion.h2
            variants={rise}
            id="inquiries-heading"
            className="mt-6 max-w-[17ch] text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[1.15] font-bold text-white"
          >
            Engage with our strategic investment and media teams.
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-8 max-w-[48ch] text-[15px] leading-[1.85] text-white/55"
          >
            {inquiryChannels.statement}
          </motion.p>
        </div>

        {/* ---------------- Channels ---------------- */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
          {inquiryChannels.channels.map((channel) => (
            <motion.div key={channel.id} variants={rise}>
              <Link
                to={channel.path}
                className="group flex items-start justify-between gap-8 border-t border-white/12 py-8 transition-colors duration-500 ease-premium hover:border-gold/60 lg:py-10"
              >
                <span className="min-w-0">
                  <span className="block text-[clamp(1.125rem,1.5vw,1.375rem)] font-bold text-white transition-colors duration-500 ease-premium group-hover:text-gold-light">
                    {channel.label}
                  </span>
                  <span className="mt-3 block max-w-[42ch] text-[14px] leading-relaxed text-white/50">
                    {channel.detail}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-[18px] text-gold transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                >
                  &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
