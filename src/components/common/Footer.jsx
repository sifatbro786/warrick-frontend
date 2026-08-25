import { Link } from "react-router-dom";
import {
    footerColumns,
    footerEntities,
    footerLegal,
    headOffice,
    operationalStatus,
    primaryCta,
} from "../../data/navigationData";

/* ==========================================================================
   ColumnHeading
   --------------------------------------------------------------------------
   Every column is a landmark with a real heading, so the footer is navigable
   by heading and each <nav> gets an accessible name instead of four
   identically anonymous ones.
   ========================================================================== */
function ColumnHeading({ id, children }) {
    return (
        <h2 id={id} className="eyebrow text-white/40">
            {children}
        </h2>
    );
}

/* ==========================================================================
   Footer
   --------------------------------------------------------------------------
   Mounted in SiteLayout rather than on a page, so every route carries it.

   GROUND — the footer sits on `royal-night` (#0b0810), the darkest surface on
   the site, and is deliberately flat: no wash, no gradient. It used to sit on
   `royal-dark`, which was only about six points of L* below the lit `royal`
   band InquiryCTA puts directly above it on the home page — close enough that
   the two read as one continuous dark mass. Near-black separates cleanly from
   both that band and the white sections other routes end on. See the GROUND
   note in InquiryCTA.jsx before changing either one; they are one decision.

   HEIGHT — this is two bands and a legal strip, and it should stay that way.
   The previous version ran three full bands at py-24 and cleared 700px on a
   desktop viewport, which is a page in its own right rather than a footer.
   Anything new here displaces something, it does not get appended.

   NO CAPTURE — there is no email field here on purpose. A newsletter input in
   the footer only pays off with a real list, a double opt-in and a consent
   record behind it; without those it is a form that quietly drops addresses
   on the floor. If a dispatch list is commissioned later, it belongs on
   /investor-relations with the compliance copy beside it, not here.
   ========================================================================== */
export default function Footer() {
    /* Computed rather than written in, so the notice never goes stale. */
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-royal-night">
            {/* Seam. A gold hairline that fades out at both ends, so the boundary
          with whatever section precedes the footer is stated once, quietly,
          instead of being left to a value step the eye can miss on a dim
          display. Decorative and non-interactive. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/45 to-transparent"
            />

            <div className="mx-auto max-w-360 px-5 sm:px-6 lg:px-10">
                {/* ============ Brand, desk and directory ============
            One band, not two. The statement and the link columns used to be
            separated by a rule and 200px of vertical padding between them;
            they carry the same weight side by side and cost half the height. */}
                <div className="grid gap-x-8 gap-y-14 border-b border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:py-20">
                    {/* ---------------- Brand and desk ---------------- */}
                    <div className="sm:col-span-2 lg:col-span-3">
                        <Link to="/" className="group inline-block">
                            <p className="font-display text-[clamp(1.125rem,1.6vw,1.5rem)] leading-none font-bold tracking-widest text-white uppercase transition-colors duration-500 ease-premium group-hover:text-gold-light">
                                Warrick Corporation
                            </p>
                        </Link>

                        <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.8] text-white/50">
                            Businesses funded on a decade view and held to one standard of
                            engineering and governance.
                        </p>

                        <div className="mt-8 space-y-3">
                            <a
                                href={`mailto:${headOffice.email}`}
                                className="block text-[14px] text-white/75 transition-colors duration-500 ease-premium hover:text-gold-light"
                            >
                                {headOffice.email}
                            </a>
                            <a
                                href={`tel:${headOffice.phone.replace(/\s+/g, "")}`}
                                className="block text-[14px] text-white/75 transition-colors duration-500 ease-premium hover:text-gold-light"
                            >
                                {headOffice.phone}
                            </a>
                        </div>

                        <Link
                            to={primaryCta.path}
                            className="group mt-8 inline-flex items-center gap-4 border-b border-gold/40 pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                        >
                            <span className="text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
                                Submit an Inquiry
                            </span>
                            <span
                                aria-hidden="true"
                                className="text-gold transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                            >
                                &rarr;
                            </span>
                        </Link>
                    </div>

                    {/* ---------------- Entities ----------------
              Labels only. The taglines that used to sit under each one are on
              the businesses page, and repeating them here was the single
              largest block of text in the footer. */}
                    <nav aria-labelledby="footer-entities" className="lg:col-span-2">
                        <ColumnHeading id="footer-entities">{footerEntities.title}</ColumnHeading>

                        <ul className="mt-7 space-y-4">
                            {footerEntities.links.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-[14px] text-white/70 transition-colors duration-300 ease-premium hover:text-gold-light"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* ---------------- Link columns ---------------- */}
                    {footerColumns.map((column) => (
                        <nav
                            key={column.id}
                            aria-labelledby={`footer-${column.id}`}
                            className="lg:col-span-2"
                        >
                            <ColumnHeading id={`footer-${column.id}`}>{column.title}</ColumnHeading>

                            <ul className="mt-7 space-y-4">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="text-[14px] text-white/70 transition-colors duration-300 ease-premium hover:text-gold-light"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    {/* ---------------- Registered office ---------------- */}
                    <div className="lg:col-span-3">
                        <ColumnHeading id="footer-headquarters">{headOffice.title}</ColumnHeading>

                        <address className="mt-7 text-[14px] leading-[1.8] text-white/55 not-italic">
                            {headOffice.address.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </address>

                        {/* Hubs read as one line of text, so the separators are decorative
                and hidden rather than announced as bullets. */}
                        <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-white/45">
                            {headOffice.hubs.map((hub, index) => (
                                <span key={hub} className="inline-flex items-center gap-2.5">
                                    {index > 0 ? (
                                        <span aria-hidden="true" className="text-white/25">
                                            &bull;
                                        </span>
                                    ) : null}
                                    {hub}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

                {/* ============ Legal ============
            The operational status indicator that used to close this strip is
            gone. It was declared in data rather than read from anything, and a
            status light that cannot report a fault is worse than none. Wire it
            to a real feed and it can come back. */}
                <div className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                    <p className="text-[12px] text-white/40">
                        &copy; {year} Warrick Corporation. All rights reserved.
                    </p>

                    <nav aria-label="Legal" className="lg:order-2">
                        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            {footerLegal.map((link, index) => (
                                <li key={link.path} className="flex items-center gap-3">
                                    {index > 0 ? (
                                        <span
                                            aria-hidden="true"
                                            className="text-[10px] text-white/20"
                                        >
                                            &bull;
                                        </span>
                                    ) : null}
                                    <Link
                                        to={link.path}
                                        className="text-[12px] text-white/40 transition-colors duration-300 ease-premium hover:text-gold-light"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <p className="text-[12px] text-white/40 lg:order-3">
                        {operationalStatus.locale}
                    </p>
                </div>
            </div>
        </footer>
    );
}
