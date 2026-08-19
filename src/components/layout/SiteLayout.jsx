import TopBar from "../common/TopBar";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

/**
 * SiteLayout
 * ---------------------------------------------------------------------------
 * The persistent chrome wrapped around every route: skip link, utility strip,
 * primary header, and the <main> landmark the routes render into. The footer
 * mounts here too once it exists.
 */
export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-soft">
      {/* Keyboard users can jump straight past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-70 focus:rounded-xs focus:bg-royal focus:px-5 focus:py-3 focus:text-[12px] focus:font-semibold focus:tracking-[0.16em] focus:text-gold focus:uppercase"
      >
        Skip to content
      </a>

      <TopBar />
      <Navbar />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
