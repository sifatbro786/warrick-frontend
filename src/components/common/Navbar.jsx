import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNavigation, primaryCta } from "../../data/navigationData";

/* ==========================================================================
   Wordmark — Cinzel lockup with a single gold diamond as the accent mark.
   ========================================================================== */
function Wordmark({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Warrick Corporation — home"
      className="group flex shrink-0 items-baseline gap-2.5"
    >
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] leading-none font-bold tracking-[0.02em] text-royal transition-colors duration-500 ease-premium group-hover:text-royal-light sm:text-[22px]">
          WARRICK
        </span>
        <span className="mt-1.25 text-[8px] leading-none font-medium tracking-[0.42em] text-ink-muted uppercase sm:text-[9px]">
          Corporation
        </span>
      </span>
      {/* Gold accent mark — rotates a touch on hover, nothing more. */}
      <span
        aria-hidden="true"
        className="size-1.25 rotate-45 bg-gold transition-all duration-700 ease-premium group-hover:rotate-135 group-hover:bg-gold-dark"
      />
    </Link>
  );
}

/* ==========================================================================
   NavIndicator — hairline gold rule beneath each primary link.
   Active: solid gold, fully drawn. Idle: half-tone, drawn in from centre.
   ========================================================================== */
function NavIndicator({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-1.5 left-0 h-px w-full origin-center transition-transform duration-500 ease-premium ${
        active
          ? "scale-x-100 bg-gold"
          : "scale-x-0 bg-gold/55 group-hover:scale-x-100"
      }`}
    />
  );
}

/* ==========================================================================
   BusinessesDropdown — hover intent on pointer, click and keyboard elsewhere.
   ========================================================================== */
function BusinessesDropdown({ item, isSectionActive }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapperRef = useRef(null);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  // Grace period so a diagonal cursor path to the panel does not close it.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleFocusIn = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        className="group relative flex items-center gap-1.5 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase"
      >
        <span
          className={`transition-colors duration-300 ease-premium ${
            isSectionActive ? "text-royal" : "text-ink/65 group-hover:text-royal"
          }`}
        >
          {item.label}
        </span>
        <ChevronDown
          className={`size-3 transition-all duration-500 ease-premium ${
            open ? "rotate-180 text-gold" : "text-ink-muted/70"
          }`}
          strokeWidth={2}
          aria-hidden="true"
        />
        <NavIndicator active={isSectionActive} />
      </button>

      {/* pt-5 leaves an invisible bridge between trigger and panel */}
      <div
        className={`absolute top-full left-1/2 w-100 -translate-x-1/2 pt-5 transition-all duration-500 ease-premium ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1.5 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[3px] border border-royal/10 bg-white shadow-premium-lg">
          <p className="px-5 pt-5 pb-1 text-[9px] font-semibold tracking-[0.3em] text-ink-muted/70 uppercase">
            Operating Companies
          </p>

          <div className="p-2">
            {item.children.map((division) => (
              <NavLink
                key={division.id}
                to={division.path}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group/item flex items-start gap-4 rounded-xs px-3 py-4 transition-colors duration-300 hover:bg-surface-card"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-5 shrink-0 bg-gold/40 transition-all duration-500 ease-premium group-hover/item:w-9 group-hover/item:bg-gold"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-semibold tracking-[0.01em] text-royal">
                    {division.name}
                  </span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-ink-muted">
                    {division.descriptor}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-1 size-3.5 shrink-0 -translate-x-1 text-gold opacity-0 transition-all duration-500 ease-premium group-hover/item:translate-x-0 group-hover/item:opacity-100"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </NavLink>
            ))}
          </div>

          <NavLink
            to={item.path}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="group/all flex items-center justify-between border-t border-royal/8 bg-surface-card px-5 py-3.5 text-[10px] font-semibold tracking-[0.18em] text-royal/70 uppercase transition-colors duration-300 hover:text-royal"
          >
            View all businesses
            <ArrowRight
              className="size-3.5 text-gold transition-transform duration-500 ease-premium group-hover/all:translate-x-1"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MobileDrawer — full-bleed minimalist overlay.
   ========================================================================== */
function MobileDrawer({ open, onClose, isSectionActive }) {
  const [businessesOpen, setBusinessesOpen] = useState(false);

  // Lock the page behind the overlay and wire up Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      inert={!open}
      className={`fixed inset-0 z-60 flex flex-col bg-surface transition-opacity duration-500 ease-premium lg:hidden ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-18 shrink-0 items-center justify-between border-b border-royal/8 px-5 sm:px-6">
        <Wordmark onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 p-2 text-royal transition-colors duration-300 hover:text-gold-dark"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex-1 overflow-y-auto px-5 pt-8 pb-12 sm:px-6"
      >
        {mainNavigation.map((item, index) => {
          const hasChildren = Boolean(item.children && item.children.length);

          return (
            <div
              key={item.path}
              style={{ transitionDelay: open ? `${120 + index * 55}ms` : "0ms" }}
              className={`border-b border-royal/8 transition-all duration-700 ease-premium ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    onClick={() => setBusinessesOpen((value) => !value)}
                    aria-expanded={businessesOpen}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span
                      className={`font-display text-[22px] font-semibold tracking-[0.01em] ${
                        isSectionActive(item) ? "text-royal" : "text-ink/80"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`size-4 text-gold-dark transition-transform duration-500 ease-premium ${
                        businessesOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>

                  {/* grid-rows trick: animates open without measuring height */}
                  <div
                    className={`grid transition-all duration-500 ease-premium ${
                      businessesOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-l border-gold/30 pb-5 pl-5">
                        {item.children.map((division) => (
                          <NavLink
                            key={division.id}
                            to={division.path}
                            onClick={onClose}
                            className="block py-3"
                          >
                            <span className="block text-[15px] font-semibold text-royal">
                              {division.name}
                            </span>
                            <span className="mt-0.5 block text-[12px] text-ink-muted">
                              {division.descriptor}
                            </span>
                          </NavLink>
                        ))}
                        <NavLink
                          to={item.path}
                          onClick={onClose}
                          className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-royal/70 uppercase"
                        >
                          View all
                          <ArrowRight
                            className="size-3 text-gold"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block py-5 font-display text-[22px] font-semibold tracking-[0.01em] ${
                      isActive ? "text-royal" : "text-ink/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          );
        })}

        <Link
          to={primaryCta.path}
          onClick={onClose}
          style={{
            transitionDelay: open
              ? `${120 + mainNavigation.length * 55}ms`
              : "0ms",
          }}
          className={`mt-10 flex w-full items-center justify-center gap-3 rounded-xs bg-royal px-8 py-4 text-[12px] font-semibold tracking-[0.2em] text-gold uppercase transition-all duration-700 ease-premium ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {primaryCta.label}
          <ArrowRight
            className="size-3.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </nav>
    </div>
  );
}

/* ==========================================================================
   Navbar — sticky primary header.
   ========================================================================== */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(null);
  const { pathname } = useLocation();

  // Never leave the drawer open across a navigation — including one driven by
  // the back button. Adjusting during render beats an effect here: the drawer
  // never paints in its open state on the new route.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  // Condense the header once the page leaves the top.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // A parent stays active for its whole section, not just its index route.
  const isSectionActive = (item) =>
    pathname === item.path || pathname.startsWith(`${item.path}/`);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-premium ${
          scrolled
            ? "border-b border-royal/10 bg-white/85 shadow-[0_10px_30px_-24px_rgb(46_26_71/0.5)] backdrop-blur-xl"
            : "border-b border-royal/6 bg-surface"
        }`}
      >
        <div className="mx-auto max-w-360 px-5 sm:px-6 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-premium ${
              scrolled ? "h-17" : "h-18 lg:h-23"
            }`}
          >
            <Wordmark />

            {/* --------------- Centre · primary navigation --------------- */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-9 lg:flex xl:gap-11"
            >
              {mainNavigation.map((item) =>
                item.children && item.children.length ? (
                  <BusinessesDropdown
                    key={item.path}
                    item={item}
                    isSectionActive={isSectionActive(item)}
                  />
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="group relative py-1"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ease-premium ${
                            isActive
                              ? "text-royal"
                              : "text-ink/65 group-hover:text-royal"
                          }`}
                        >
                          {item.label}
                        </span>
                        <NavIndicator active={isActive} />
                      </>
                    )}
                  </NavLink>
                ),
              )}
            </nav>

            {/* --------------- Right · CTA + mobile trigger -------------- */}
            <div className="flex items-center gap-3">
              <Link
                to={primaryCta.path}
                className="group relative hidden overflow-hidden rounded-xs border border-gold/70 px-7 py-3 transition-colors duration-500 ease-premium hover:border-royal lg:inline-flex"
              >
                {/* Fill sweeps up from the baseline — no glow, no gradient. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-royal transition-transform duration-500 ease-premium group-hover:scale-y-100"
                />
                <span className="relative text-[11px] font-semibold tracking-[0.2em] text-royal uppercase transition-colors duration-500 ease-premium group-hover:text-gold">
                  {primaryCta.label}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="-mr-2 p-2 text-royal transition-colors duration-300 hover:text-gold-dark lg:hidden"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isSectionActive={isSectionActive}
      />
    </>
  );
}
