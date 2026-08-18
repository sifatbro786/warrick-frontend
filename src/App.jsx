import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import TopBar from "./components/common/TopBar";
import Navbar from "./components/common/Navbar";
import HeroSection from "./components/sections/HeroSection";
import { businessDivisions } from "./data/navigationData";

/* ==========================================================================
   ScrollToTop — the browser restores scroll on client-side navigation, which
   lands users mid-page. Reset on every pathname change.
   ========================================================================== */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

/* ==========================================================================
   PagePlaceholder — temporary scaffolding so every route resolves while the
   real pages are built. Replace with components from src/pages/
   ========================================================================== */
function PagePlaceholder({ eyebrow, title }) {
  return (
    <section className="mx-auto max-w-360 px-5 py-28 sm:px-6 lg:px-10 lg:py-40">
      <p className="text-[10px] font-semibold tracking-[0.32em] text-gold-dark uppercase">
        {eyebrow}
      </p>
      <div aria-hidden="true" className="mt-5 h-px w-16 bg-gold" />
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-royal lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
        This route is wired and rendering. Drop the production page component
        here when it is ready.
      </p>
    </section>
  );
}

/* ==========================================================================
   HomePage — hero first, further sections stack beneath it.
   ========================================================================== */
function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Next sections (divisions, sustainability, newsroom) mount here. */}
    </>
  );
}

/* Resolves /businesses/:slug against the navigation data. */
function BusinessDetail() {
  const { slug } = useParams();
  const division = businessDivisions.find((item) => item.id === slug);

  return (
    <PagePlaceholder
      eyebrow={division ? division.descriptor : "Our Businesses"}
      title={division ? division.name : "Division Not Found"}
    />
  );
}

/* ==========================================================================
   App — router, chrome, and route table.
   ========================================================================== */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Keyboard users can jump straight past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-70 focus:rounded-xs focus:bg-royal focus:px-5 focus:py-3 focus:text-[12px] focus:font-semibold focus:tracking-[0.16em] focus:text-gold focus:uppercase"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col bg-surface-soft">
        <TopBar />
        <Navbar />

        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/about"
              element={<PagePlaceholder eyebrow="The Group" title="About Us" />}
            />

            {/* Our Businesses — index + per-division detail */}
            <Route
              path="/businesses"
              element={
                <PagePlaceholder eyebrow="The Group" title="Our Businesses" />
              }
            />
            <Route path="/businesses/:slug" element={<BusinessDetail />} />

            <Route
              path="/sustainability"
              element={
                <PagePlaceholder eyebrow="Responsibility" title="Sustainability" />
              }
            />
            <Route
              path="/innovation"
              element={<PagePlaceholder eyebrow="Forward" title="Innovation" />}
            />
            <Route
              path="/news"
              element={<PagePlaceholder eyebrow="Newsroom" title="News" />}
            />
            <Route
              path="/contact"
              element={<PagePlaceholder eyebrow="Get in Touch" title="Inquire" />}
            />

            {/* Utility strip destinations */}
            <Route
              path="/careers"
              element={<PagePlaceholder eyebrow="People" title="Careers" />}
            />
            <Route
              path="/investor-relations"
              element={
                <PagePlaceholder eyebrow="Shareholders" title="Investor Relations" />
              }
            />
            <Route
              path="/global-presence"
              element={
                <PagePlaceholder eyebrow="Worldwide" title="Global Presence" />
              }
            />
            <Route
              path="/media-center"
              element={<PagePlaceholder eyebrow="Press" title="Media Center" />}
            />

            <Route
              path="*"
              element={<PagePlaceholder eyebrow="Error 404" title="Page Not Found" />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
