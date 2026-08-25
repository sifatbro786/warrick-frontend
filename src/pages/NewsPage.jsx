import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    articles,
    categories,
    categoryLabel,
    filterByCategory,
    formatArticleDate,
    newsHeader,
} from "../data/newsData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* Everything focusable inside the reader. Used by the tab trap; kept at
   module scope so the query string is not rebuilt on every keystroke. */
const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ==========================================================================
   ArticleModal
   --------------------------------------------------------------------------
   Co-located with the page because it is the only consumer. Lift it into
   src/components/news/ when a second surface needs to open an article.

   Portalled to <body> on purpose. The grid card that opens it sits inside a
   `relative isolate` section, and a fixed overlay rendered inside a stacking
   context cannot escape it — the dialog would end up trapped under the
   sticky header at z-50.

   Accessibility contract:
     · role="dialog" + aria-modal + aria-labelledby pointing at the headline
     · Escape closes
     · Tab is trapped inside the panel while open
     · Focus moves to the close control on open and returns to the card that
       opened it on close
     · Background scroll is locked, with the scrollbar width compensated so
       the page underneath does not shift
   ========================================================================== */
function ArticleModal({ article, onClose }) {
    const shouldReduceMotion = useReducedMotion();
    const panelRef = useRef(null);
    const closeRef = useRef(null);

    /* The element that had focus before the dialog mounted. Captured once, in a
     ref rather than state, so restoring it never triggers a render. */
    const restoreFocusRef = useRef(null);

    useEffect(() => {
        restoreFocusRef.current = document.activeElement;
        closeRef.current?.focus();

        const { body, documentElement } = document;
        const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
        const previousOverflow = body.style.overflow;
        const previousPadding = body.style.paddingRight;

        body.style.overflow = "hidden";
        if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            body.style.overflow = previousOverflow;
            body.style.paddingRight = previousPadding;
            /* Guard the restore: the opener can be unmounted by a filter change
         while the reader is open. */
            if (document.contains(restoreFocusRef.current)) {
                restoreFocusRef.current?.focus?.();
            }
        };
    }, []);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !panelRef.current) return;

            const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
                (node) => node.offsetParent !== null,
            );

            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        },
        [onClose],
    );

    const titleId = `article-${article.id}-title`;

    return createPortal(
        /* The overlay itself never scrolls. The panel is height-capped and owns
       the only scroll container on screen, so the close bar is genuinely
       fixed at the top of the reader and the scrollbar belongs to the modal
       rather than to the page behind it. */
        <div
            className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6 lg:py-12"
            onKeyDown={handleKeyDown}
        >
            {/* ---------------- Backdrop ---------------- */}
            <motion.button
                type="button"
                aria-label="Close article"
                tabIndex={-1}
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.15 : 0.45, ease: EASE }}
                className="fixed inset-0 -z-10 cursor-default bg-royal-deep/85"
            />

            {/* ---------------- Panel ---------------- */}
            <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: EASE }}
                className="relative flex max-h-[calc(100dvh-3rem)] w-full max-w-4xl flex-col bg-surface shadow-premium-lg lg:max-h-[calc(100dvh-6rem)]"
            >
                {/* Close bar. Outside the scroll container and fixed by the flex
            column, so it does not travel with the article body. */}
                <div className="flex shrink-0 justify-end border-b border-line px-6 py-4 sm:px-10">
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-ink-muted uppercase transition-colors duration-500 ease-premium hover:text-royal"
                    >
                        Close
                        <span
                            aria-hidden="true"
                            className="text-[15px] leading-none text-gold-dark transition-transform duration-500 ease-premium group-hover:rotate-90"
                        >
                            &#10005;
                        </span>
                    </button>
                </div>

                {/* The reader's own scroll container. `overscroll-contain` stops a
            flick at the end of the article from chaining into the page. */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <article className="px-6 pt-12 pb-16 sm:px-10 lg:px-16 lg:pt-16 lg:pb-20">
                        <div className="eyebrow flex flex-wrap items-center gap-x-5 gap-y-2">
                            <span className="text-gold-dark">
                                {categoryLabel(article.category)}
                            </span>
                            <time dateTime={article.date} className="text-ink-muted">
                                {formatArticleDate(article.date)}
                            </time>
                            <span className="text-ink-muted">{article.readTime} min read</span>
                        </div>

                        <h2
                            id={titleId}
                            className="mt-8 max-w-[24ch] text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.16] font-bold text-royal"
                        >
                            {article.title}
                        </h2>

                        <p className="mt-8 max-w-[60ch] border-t border-line pt-8 text-[16px] leading-[1.85] font-medium text-royal/80">
                            {article.summary}
                        </p>

                        <figure className="mt-12 overflow-hidden">
                            <img
                                src={article.coverImage}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="aspect-video w-full object-cover saturate-[0.85]"
                            />
                        </figure>

                        <div className="mt-12">
                            {article.content.map((paragraph, index) => (
                                <p
                                    key={paragraph.slice(0, 24)}
                                    className={`max-w-[68ch] text-[15px] leading-[1.95] text-ink-muted ${
                                        index === 0 ? "" : "mt-7"
                                    }`}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <p className="mt-14 border-t border-line pt-8 text-[13px] leading-relaxed text-ink-muted">
                            Press enquiries relating to this release should be directed to the
                            corporate media desk.
                        </p>
                    </article>
                </div>
            </motion.div>
        </div>,
        document.body,
    );
}

/* ==========================================================================
   NewsPage
   --------------------------------------------------------------------------
   GROUND:
     Header      surface-soft
     Grid        surface        (white)
     Footer      royal-night    (in SiteLayout)
   ========================================================================== */
export default function NewsPage() {
    const shouldReduceMotion = useReducedMotion();
    const [activeCategory, setActiveCategory] = useState("all");
    const [openArticleId, setOpenArticleId] = useState(null);

    const visibleArticles = useMemo(
        () => filterByCategory(articles, activeCategory),
        [activeCategory],
    );

    /* Resolved from the id rather than held as an object, so the open reader
     always reflects the current record once `articles` comes from an API. */
    const openArticle = useMemo(
        () => articles.find((article) => article.id === openArticleId) ?? null,
        [openArticleId],
    );

    const closeArticle = useCallback(() => setOpenArticleId(null), []);

    const rise = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: shouldReduceMotion ? 0.25 : 0.8, ease: EASE },
        },
    };

    return (
        <>
            {/* ==================================================================
          HEADER AND FILTER — surface-soft
          ================================================================== */}
            <section aria-labelledby="newsroom-heading" className="bg-surface-soft">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    className="mx-auto max-w-360 px-5 pt-20 pb-0 sm:px-6 lg:px-10 lg:pt-32"
                >
                    <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12 lg:gap-x-20">
                        <div className="lg:col-span-7">
                            <motion.p variants={rise} className="eyebrow text-gold-dark">
                                {newsHeader.eyebrow}
                            </motion.p>

                            <motion.h1
                                variants={rise}
                                id="newsroom-heading"
                                className="mt-7 max-w-[16ch] text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.1] font-bold text-royal"
                            >
                                {newsHeader.title}
                            </motion.h1>
                        </div>

                        <motion.p
                            variants={rise}
                            className="max-w-[52ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-4 lg:col-start-9"
                        >
                            {newsHeader.lead}
                        </motion.p>
                    </div>

                    {/* ---------------- Category filter ----------------
              Text only. The active state is a single hairline sitting on the
              strip's own bottom rule, so nothing gains a background. */}
                    <motion.div
                        variants={rise}
                        role="group"
                        aria-label="Filter releases by category"
                        className="mt-16 flex flex-wrap items-end gap-x-10 gap-y-4 border-b border-line lg:mt-24"
                    >
                        {categories.map((category) => {
                            const isActive = category.id === activeCategory;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`-mb-px border-b pb-5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ease-premium ${
                                        isActive
                                            ? "border-gold text-royal"
                                            : "border-transparent text-ink-muted hover:text-royal"
                                    }`}
                                >
                                    {category.label}
                                </button>
                            );
                        })}

                        <span
                            aria-live="polite"
                            className="ml-auto pb-5 text-[11px] font-semibold tracking-[0.2em] text-ink-muted uppercase tabular-nums"
                        >
                            {visibleArticles.length}{" "}
                            {visibleArticles.length === 1 ? "Release" : "Releases"}
                        </span>
                    </motion.div>
                </motion.div>
            </section>

            {/* ==================================================================
          GRID — surface
          ================================================================== */}
            <section aria-label="Press releases" className="bg-surface">
                <div className="mx-auto max-w-360 px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
                    {visibleArticles.length === 0 ? (
                        <p className="border-t border-line pt-10 text-[15px] text-ink-muted">
                            No releases published under this category yet.
                        </p>
                    ) : (
                        <motion.div
                            /* Keyed on the filter so a category change replays the stagger
                 instead of mutating a list mid-animation. */
                            key={activeCategory}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                            className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12"
                        >
                            {visibleArticles.map((article) => (
                                <motion.article
                                    key={article.id}
                                    variants={rise}
                                    className="group relative flex flex-col border-t border-line pt-8"
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={article.coverImage}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="aspect-3/2 w-full object-cover saturate-[0.82] transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                                        />
                                    </div>

                                    <div className="eyebrow mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                                        <time dateTime={article.date} className="text-ink-muted">
                                            {formatArticleDate(article.date)}
                                        </time>
                                        <span className="text-gold-dark">
                                            {categoryLabel(article.category)}
                                        </span>
                                    </div>

                                    <h2 className="mt-6 text-[19px] leading-snug font-bold text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light">
                                        {/* The card's single interactive element. The overlay
                        stretches its hit area across the whole card while
                        screen readers still announce one control named by
                        the headline. */}
                                        <button
                                            type="button"
                                            onClick={() => setOpenArticleId(article.id)}
                                            aria-haspopup="dialog"
                                            className="text-left after:absolute after:inset-0 after:content-['']"
                                        >
                                            {article.title}
                                        </button>
                                    </h2>

                                    <p className="mt-5 max-w-[44ch] text-[14px] leading-[1.8] text-ink-muted">
                                        {article.summary}
                                    </p>

                                    <div className="mt-6 flex items-center gap-4 pt-2">
                                        <span className="text-[13px] text-ink-muted">
                                            {article.readTime} min read
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="text-gold-dark opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-1.5 group-hover:opacity-100"
                                        >
                                            &rarr;
                                        </span>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {openArticle && (
                    <ArticleModal
                        key={openArticle.id}
                        article={openArticle}
                        onClose={closeArticle}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
