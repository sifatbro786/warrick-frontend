import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";

/**
 * HomePage
 * ---------------------------------------------------------------------------
 * Composition only. Each section owns its own data, spacing and background,
 * so the running order is the whole of this file.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      {/* Next sections (divisions, sustainability, newsroom) mount here. */}
    </>
  );
}
