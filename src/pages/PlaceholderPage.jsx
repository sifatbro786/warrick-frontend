/**
 * PlaceholderPage
 * ---------------------------------------------------------------------------
 * Generic fallback so every route in the table resolves to something real
 * while the production pages are built. Swap a route's element for the
 * finished page component and this stops being used for that path.
 */
export default function PlaceholderPage({ eyebrow, title, description }) {
  return (
    <section className="mx-auto max-w-360 px-5 py-28 sm:px-6 lg:px-10 lg:py-40">
      <p className="eyebrow text-gold-dark">{eyebrow}</p>

      <div aria-hidden="true" className="mt-5 h-px w-16 bg-gold" />

      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-royal lg:text-6xl">
        {title}
      </h1>

      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        {description ??
          "This route is wired and rendering. Drop the production page component here when it is ready."}
      </p>
    </section>
  );
}
