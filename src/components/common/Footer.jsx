import { useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  footerColumns,
  footerEntities,
  footerLegal,
  headOffice,
  operationalStatus,
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
   DispatchForm
   --------------------------------------------------------------------------
   A rule and a text button, nothing else.

   There is no subscription endpoint in this project yet. Rather than confirm
   a signup that never happened, the default submit hands the request to the
   corporate inbox over mailto, which actually reaches a person today. Pass
   `onSubscribe` once a real endpoint exists and that path takes over.
   ========================================================================== */
function DispatchForm({ onSubscribe }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;

    if (onSubscribe) {
      onSubscribe(address);
      setSent(true);
      setEmail("");
      return;
    }

    const subject = encodeURIComponent("Executive Dispatch briefing request");
    const body = encodeURIComponent(
      `Please add this address to the Executive Dispatch list:\n\n${address}\n`,
    );
    window.location.href = `mailto:${headOffice.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-md">
      <label htmlFor={inputId} className="sr-only">
        Corporate email address for the executive dispatch
      </label>

      <div className="flex items-center gap-6 border-b border-white/20 pb-3 transition-colors duration-500 ease-premium focus-within:border-gold/70">
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          spellCheck="false"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter corporate email address"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-white/35 focus:outline-none"
        />

        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors duration-500 ease-premium hover:text-gold-light focus-visible:text-gold-light"
        >
          Request Briefing
          <span
            aria-hidden="true"
            className="text-gold transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        </button>
      </div>

      {/* Announced politely so a screen reader hears the outcome without the
          focus being yanked out of the form. */}
      <p aria-live="polite" className="mt-4 min-h-5 text-[12px] text-white/45">
        {sent
          ? "Your mail client should open with the request ready to send."
          : null}
      </p>
    </form>
  );
}

/* ==========================================================================
   Footer
   --------------------------------------------------------------------------
   Deep royal ground, hairlines at 10% white, and nothing else structural.
   Mounted in SiteLayout rather than on a page, so every route carries it.
   ========================================================================== */
export default function Footer({ onSubscribe }) {
  /* Computed rather than written in, so the notice never goes stale. */
  const year = new Date().getFullYear();

  return (
    <footer className="bg-royal-deep">
      <div className="mx-auto max-w-360 px-5 sm:px-6 lg:px-10">
        {/* ============ Statement and dispatch ============ */}
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

          <div className="lg:col-span-5 lg:col-start-8">
            <ColumnHeading id="footer-dispatch">
              Executive Dispatch
            </ColumnHeading>

            <p className="mt-6 max-w-[42ch] text-[14px] leading-relaxed text-white/50">
              Results, capital announcements and group briefings, sent to
              institutional subscribers as they are published.
            </p>

            <DispatchForm onSubscribe={onSubscribe} />
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

          {/* Headquarters is prose and contact detail, not a link list. */}
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

            <div className="mt-7 space-y-2 text-[14px]">
              <a
                href={`mailto:${headOffice.email}`}
                className="block text-white/70 transition-colors duration-300 ease-premium hover:text-gold-light"
              >
                {headOffice.email}
              </a>
              <a
                href={`tel:${headOffice.phone.replace(/\s+/g, "")}`}
                className="block text-white/70 transition-colors duration-300 ease-premium hover:text-gold-light"
              >
                {headOffice.phone}
              </a>
            </div>
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
