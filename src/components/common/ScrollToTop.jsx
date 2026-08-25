import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * ---------------------------------------------------------------------------
 * The browser restores scroll position on client-side navigation, which lands
 * users mid-page on a route they have never seen. Reset on every pathname
 * change. Search and hash changes are deliberately ignored so in-page anchors
 * and filter updates keep their position.
 *
 * WHY useLayoutEffect AND NOT useEffect
 * This used to run in a useEffect, which fires *after* paint. That meant a
 * client-side navigation painted one frame of the new page at the previous
 * page's scroll offset — click a link near the bottom of a long page and the
 * new route rendered while the window was still two or three thousand pixels
 * down.
 *
 * That frame is exactly when framer-motion sets up the IntersectionObservers
 * behind every `whileInView` section. Sections occupying the top of the new
 * page were measured as sitting *above* the viewport, so they stayed at their
 * hidden variant, and with `once: true` several of them never got a second
 * intersection event once the scroll snapped back. The symptom was a route
 * that rendered half its content on navigation and all of it on reload, which
 * is the giveaway: a reload starts at the top, so the observers measure
 * correctly the first time.
 *
 * useLayoutEffect runs before paint, so the new route is only ever painted at
 * the top and the observers measure against the position the reader is
 * actually looking at.
 *
 * `scrollRestoration = "manual"` stops the browser doing its own restore on
 * history navigation and fighting this on the way back.
 *
 * Renders nothing. Mount once, inside the router.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}
