import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * ---------------------------------------------------------------------------
 * The browser restores scroll position on client-side navigation, which lands
 * users mid-page on a route they have never seen. Reset on every pathname
 * change. Search and hash changes are deliberately ignored so in-page anchors
 * and filter updates keep their position.
 *
 * Renders nothing. Mount once, inside the router.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
