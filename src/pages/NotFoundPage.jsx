import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { mainNavigation, primaryCta } from "../data/navigationData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* Derived from the header rather than written out again. A 404 page whose
   suggestions drift out of sync with the navigation is a second dead end
   sitting behind the first one, and nobody thinks to check it. */
const DESTINATIONS = [
    { label: "Home", path: "/" },
    ...mainNavigation.map(({ label, path }) => ({ label, path })),
    { label: primaryCta.label, path: primaryCta.path },
];

/* ==========================================================================
   NotFoundPage
   --------------------------------------------------------------------------
   The site's dead end. Distinct from PlaceholderPage, which stands in for a
   route that exists and is still being built — this one is for an address
   that does not resolve at all, and the two should never read the same.

   GROUND — light on purpose. A dark 404 would sit directly against the
   near-black footer with nothing between them, and the seam would vanish.
   The page is short, so it is the only band on the route.

   REUSED FOR BAD SLUGS — BusinessDetail renders this with its own copy when
   /businesses/:slug does not match a company. Same failure, so the same page,
   with wording that tells the reader which lookup failed.

   ON THE HTTP STATUS — this returns 200. vercel.json rewrites every path to
   index.html, which is what makes client-side routing work and also what
   makes a real 404 status impossible from inside the bundle. If search
   engines start indexing dead URLs, the fix is a prerender or an edge
   function that answers 404 for unmatched paths, not a change in here.
   ========================================================================== */
export default function NotFoundPage({
    eyebrow = "Error 404",
    title = "Page Not Found",
    description = "The address you followed does not resolve to anything on this site. It may have moved, the link may be out of date, or there may be a typo in the URL.",
}) {
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
        <section aria-labelledby="not-found-heading" className="bg-surface-soft">
            <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                className="mx-auto max-w-360 px-5 py-24 sm:px-6 lg:px-10 lg:py-40"
            >
                <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-x-20">
                    {/* ---------------- Statement ---------------- */}
                    <div className="lg:col-span-6">
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            {eyebrow}
                        </motion.p>

                        {/* The numeral is set at display scale and held back to a
                            near-hairline value. It is the loudest thing on the
                            page and it is also the least useful, so it carries no
                            contrast — the heading underneath does the work. */}
                        <motion.p
                            variants={rise}
                            aria-hidden="true"
                            className="mt-10 font-display text-[clamp(5rem,14vw,11rem)] leading-[0.82] font-bold tracking-tighter text-ink-muted/15 select-none"
                        >
                            404
                        </motion.p>

                        <motion.h1
                            variants={rise}
                            id="not-found-heading"
                            className="mt-10 max-w-[16ch] text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.1] font-bold text-royal"
                        >
                            {title}
                        </motion.h1>

                        <motion.p
                            variants={rise}
                            className="mt-8 max-w-[50ch] text-[15px] leading-[1.9] text-ink-muted"
                        >
                            {description}
                        </motion.p>

                        <motion.div variants={rise}>
                            <Link
                                to="/"
                                className="group mt-12 inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                            >
                                <span
                                    aria-hidden="true"
                                    className="text-gold-dark transition-transform duration-500 ease-premium group-hover:-translate-x-1.5"
                                >
                                    &larr;
                                </span>
                                <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                    Back to the Homepage
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ---------------- Destinations ---------------- */}
                    <div className="lg:col-span-5 lg:col-start-8">
                        <motion.p
                            variants={rise}
                            className="eyebrow border-t border-line pt-10 text-ink-muted"
                        >
                            Where to Go Instead
                        </motion.p>

                        <nav aria-label="Suggested destinations" className="mt-8">
                            <ul>
                                {DESTINATIONS.map((destination) => (
                                    <motion.li key={destination.path} variants={rise}>
                                        <Link
                                            to={destination.path}
                                            className="group flex items-center justify-between gap-8 border-t border-line py-5 transition-colors duration-500 ease-premium hover:border-gold"
                                        >
                                            <span className="text-[16px] font-semibold text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light">
                                                {destination.label}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="shrink-0 text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                            >
                                                &rarr;
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        <motion.p
                            variants={rise}
                            className="mt-12 max-w-[44ch] border-t border-line pt-8 text-[13px] leading-relaxed text-ink-muted"
                        >
                            If you followed this link from another site or a press release, the
                            corporate desk would like to know about it.{" "}
                            <Link
                                to="/contact"
                                className="border-b border-line text-royal transition-colors duration-500 ease-premium hover:border-gold"
                            >
                                Report a broken link
                            </Link>
                            .
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
