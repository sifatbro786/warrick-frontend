import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* Everything focusable inside the panel. Used by the tab trap; kept at module
   scope so the query string is not rebuilt on every keystroke. */
const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ==========================================================================
   Dialog
   --------------------------------------------------------------------------
   The group's single modal shell. It owns the overlay, the panel, the close
   control and every behaviour a modal has to get right; callers supply only
   the content that goes inside the scroll area.

   Extracted from the news reader when the innovation page needed the same
   thing. Two hand-rolled copies of a focus trap is how one of them quietly
   stops trapping.

   Portalled to <body> on purpose. Callers open it from inside sections that
   are `relative isolate`, and a fixed overlay rendered inside a stacking
   context cannot escape it — the panel would end up under the sticky header
   at z-50.

   LAYOUT — the overlay itself never scrolls. The panel is height-capped and
   owns the only scroll container on screen, so the close bar stays put and
   the scrollbar belongs to the dialog rather than to the page behind it.

   ACCESSIBILITY CONTRACT
     · role="dialog" + aria-modal + aria-labelledby, pointing at a heading the
       caller renders and identifies through `labelledBy`
     · Escape closes
     · Tab is trapped inside the panel while open
     · Focus moves to the close control on open and returns to the element
       that opened it on close
     · Background scroll is locked, with the scrollbar width compensated so
       the page underneath does not shift

   PRESENCE — this renders motion elements with `exit`, so wrapping the caller
   in <AnimatePresence> with a stable `key` animates the close. Presence
   context reaches through the portal; the direct child does not have to be a
   motion component itself.

   Props
     labelledBy   id of the heading inside `children` that names the dialog
     onClose      called on Escape, backdrop click and the close control
     closeLabel   text of the close control. Defaults to "Close".
     panelClass   width utility for the panel. Defaults to a reading measure.
   ========================================================================== */
export default function Dialog({
    labelledBy,
    onClose,
    closeLabel = "Close",
    panelClass = "max-w-4xl",
    children,
}) {
    const shouldReduceMotion = useReducedMotion();
    const panelRef = useRef(null);
    const closeRef = useRef(null);

    /* The element that had focus before the dialog mounted. Captured in a ref
       rather than state, so restoring it never triggers a render. */
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
            /* Guard the restore: the opener can be unmounted while the dialog
               is up, by a filter change or a refetch behind it. */
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

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6 lg:py-12"
            onKeyDown={handleKeyDown}
        >
            {/* ---------------- Backdrop ---------------- */}
            <motion.button
                type="button"
                aria-label={closeLabel}
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
                aria-labelledby={labelledBy}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: EASE }}
                className={`relative flex max-h-[calc(100dvh-3rem)] w-full flex-col bg-surface shadow-premium-lg lg:max-h-[calc(100dvh-6rem)] ${panelClass}`}
            >
                {/* Close bar. Outside the scroll container and held by the flex
                    column, so it does not travel with the content. */}
                <div className="flex shrink-0 justify-end border-b border-line px-6 py-4 sm:px-10">
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-ink-muted uppercase transition-colors duration-500 ease-premium hover:text-royal"
                    >
                        {closeLabel}
                        <span
                            aria-hidden="true"
                            className="text-[15px] leading-none text-gold-dark transition-transform duration-500 ease-premium group-hover:rotate-90"
                        >
                            &#10005;
                        </span>
                    </button>
                </div>

                {/* The dialog's own scroll container. `overscroll-contain` stops
                    a flick at the end of the content from chaining into the
                    page underneath. */}
                <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
            </motion.div>
        </div>,
        document.body,
    );
}
