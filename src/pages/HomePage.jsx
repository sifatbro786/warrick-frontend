import HeroSection from "../components/sections/HeroSection";
import AboutOverviewSection from "../components/sections/AboutOverviewSection";
import StatsSection from "../components/sections/StatsSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import BrandLogosSection from "../components/sections/BrandLogosSection";
import ValuesESGSection from "../components/sections/ValuesESGSection";
import NewsSection from "../components/sections/NewsSection";
import InquiryCTA from "../components/sections/InquiryCTA";

/**
 * HomePage
 * ---------------------------------------------------------------------------
 * Composition only. Each section owns its own data, spacing and background,
 * so the running order is the whole of this file.
 *
 * Backgrounds alternate deliberately down the page, since the only thing
 * separating one section from the next is a change of ground and a hairline:
 *
 *   Hero          royal-dark
 *   Stats         surface        (white)
 *   AboutOverview surface-soft
 *   Portfolio     surface        (white)
 *   BrandLogos    surface-soft
 *   ValuesESG     surface        (white)
 *   News          surface-soft
 *   InquiryCTA    royal-dark
 *   Footer        royal-deep     (in SiteLayout)
 *
 * Change the running order and the grounds have to be re-dealt, or two
 * same-coloured sections end up adjacent and the seam between them vanishes.
 *
 * The footer is not here on purpose: it is persistent chrome and mounts in
 * SiteLayout, which puts it below this page and on every other route too.
 */
export default function HomePage() {
    return (
        <>
            <HeroSection />
            <StatsSection />
            <AboutOverviewSection />
            <PortfolioSection />
            <BrandLogosSection />
            <ValuesESGSection />
            <NewsSection />
            <InquiryCTA />
        </>
    );
}
