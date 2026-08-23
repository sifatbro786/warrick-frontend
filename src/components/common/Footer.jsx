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
   Matte royal ground, hairlines at 10% white, and nothing else structural.
   Mounted in SiteLayout rather than on a page, so every route carries it.

   GROUND — the footer is the darkest surface on the site (`royal-dark`) and
   is deliberately flat: no wash, no gradient. InquiryCTA directly above it
   sits a step lighter on `royal` and is lit. See the GROUND note in
   InquiryCTA.jsx before changing either one — they are one decision.

   NO CAPTURE — there is no email field here on purpose. A newsletter input
   in the footer only pays off with a real list, a double opt-in and a
   consent record behind it; without those it is a form that quietly drops
   addresses on the floor. Every route to a person is a link to a page that
   owns the transaction. If a dispatch list is commissioned later, it belongs
   on /investor-relations with the compliance copy beside it, not here.
   ========================================================================== */
export default function Footer() {
  /* Computed rather than written in, so the notice never goes stale. */
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-royal-dark">
      {/* Seam. A gold hairline that fades out at both ends, so the boundary
          with whatever dark section precedes the footer is stated once,
          quietly, instead of being left to a value step the eye can miss on a
          dim display. Decorative and non-interactive. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/45 to-transparent"
      />

      <div className="mx-auto max-w-360 px-5 sm:px-6 lg:px-10">
        {/* ============ Statement and corporate desk ============ */}
        <div className="grid gap-12 border-b border-white/10 py-20 lg:grid-cols-12 lg:gap-x-20 lg:py-24">
          <div className="lg:col-span-6">
            <Link to="/" className="group inline-block">
              <p className="font-display text-[clamp(1.375rem,2.2vw,2rem)] leading-none font-bold tracking-widest text-white uppercase transition-colors duration-500 ease-premium group-hover:text-gold-light">
                Warrick Corporation
              </p>
            </Link>

            <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.9] text-white/55">
              We build businesses meant to outlast the people who start them.
              That means funding on a decade view and holding every company in
              the group to one standard of engineering and governance.
            </p>
          </div>

          {/* The desk replaces the old signup block. Same slot, same weight,
              but every element here resolves to a monitored destination: two
              live channels and one route to the contact page. The address and
              hubs stay down in the directory column, so nothing is printed
              twice. */}
          <div className="lg:col-span-5 lg:col-start-8">
            <ColumnHeading id="footer-desk">Corporate Desk</ColumnHeading>

            <p className="mt-6 max-w-[42ch] text-[14px] leading-relaxed text-white/50">
              Group enquiries are answered from the London office within one
              business day. Media and investor requests are routed on arrival.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/12 pt-8">
              <a
                href={`mailto:${headOffice.email}`}
                className="group flex items-baseline justify-between gap-6 text-[15px]"
              >
                <span className="text-white/80 transition-colors duration-500 ease-premium group-hover:text-gold-light">
                  {headOffice.email}
                </span>
                <span className="shrink-0 text-[11px] tracking-[0.18em] text-white/35 uppercase">
                  Email
                </span>
              </a>

              <a
                href={`tel:${headOffice.phone.replace(/\s+/g, "")}`}
                className="group flex items-baseline justify-between gap-6 text-[15px]"
              >
                <span className="text-white/80 transition-colors duration-500 ease-premium group-hover:text-gold-light">
                  {headOffice.phone}
                </span>
                <span className="shrink-0 text-[11px] tracking-[0.18em] text-white/35 uppercase">
                  Direct
                </span>
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
        </div>

        {/* ============ Directory ============ */}
        <div className="grid gap-x-8 gap-y-14 border-b border-white/10 py-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:py-24">
          {/* Entities carry taglines, so they get their own treatment. */}
          <nav aria-labelledby="footer-entities" className="lg:col-span-3">
            <ColumnHeading id="footer-entities">
              {footerEntities.title}
            </ColumnHeading>

            <ul className="mt-8 space-y-7">
              {footerEntities.links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="group block">
                    <span className="block text-[15px] font-semibold text-white/85 transition-colors duration-300 ease-premium group-hover:text-gold-light">
                      {link.label}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-white/40">
                      {link.tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {footerColumns.map((column) => (
            <nav
              key={column.id}
              aria-labelledby={`footer-${column.id}`}
              className="lg:col-span-3"
            >
              <ColumnHeading id={`footer-${column.id}`}>
                {column.title}
              </ColumnHeading>

              <ul className="mt-8 space-y-4">
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

          {/* Headquarters is prose, not a link list — and not contact detail
              either any more: the email and phone moved up to the Corporate
              Desk when the signup block came out, so this column is the
              registered office and the operating hubs only. */}
          <div className="lg:col-span-3">
            <ColumnHeading id="footer-headquarters">
              {headOffice.title}
            </ColumnHeading>

            <address className="mt-8 text-[14px] leading-[1.9] text-white/55 not-italic">
              {headOffice.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            {/* Hubs read as one line of text, so the separators are decorative
                and hidden rather than announced as bullets. */}
            <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-white/45">
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

        {/* ============ Legal and status ============ */}
        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <p className="text-[12px] text-white/40">
            &copy; {year} Warrick Corporation. All rights reserved.
          </p>

          <nav aria-label="Legal" className="lg:order-2">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {footerLegal.map((link, index) => (
                <li key={link.path} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-[10px] text-white/20">
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

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/40 lg:order-3">
            <span className="inline-flex items-center gap-2.5">
              {/* Solid dot with a slow ring behind it. Decorative: the state
                  is spelled out in the text beside it, so the dot is not
                  carrying the meaning on its own. */}
              <span
                aria-hidden="true"
                className="relative inline-flex size-1.5 shrink-0"
              >
                <span className="absolute inset-0 animate-status-pulse rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              {operationalStatus.label}: {operationalStatus.state}
            </span>

            <span aria-hidden="true" className="text-white/20">
              &bull;
            </span>

            <span>{operationalStatus.locale}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
