/**
 * WARRICK CORPORATION — Home Page Content
 * ---------------------------------------------------------------------------
 * Content for the hero carousel and the group metrics strip. Both sections
 * render whatever they find here, so adding a fourth or fifth operating
 * company is an edit to this file and nothing else.
 *
 * NOTE: copy and photography below are placeholders. Replace with approved
 * corporate text and licensed brand imagery before launch.
 */

/* --------------------------------------------------------------------------
   Hero carousel.

   `photoId` is an Unsplash identifier consumed by the helpers in
   HeroSection.jsx. `focal` keeps the subject clear of the editorial column
   once the frame is cropped to the fold.
   -------------------------------------------------------------------------- */
export const heroSlides = [
  {
    id: "warrick-corp",
    name: "Warrick Corp",
    sector: "Energy and Infrastructure",
    headline: "The balance sheet the rest of the group is built on.",
    body: "Warrick Corp holds our energy assets, industrial sites and capital programmes. It carries the long payback projects so the operating companies can stay focused on their own markets.",
    ctaLabel: "Inside Warrick Corp",
    path: "/businesses",
    photoId: "1486406146926-c627a92ad1ab",
    focal: "center 35%",
  },
  {
    id: "clara",
    name: "Clara",
    sector: "Consumer Technology",
    headline: "Products people still use once the novelty has worn off.",
    body: "Clara builds consumer hardware and the commerce platform behind it, serving customers across fourteen markets from three regional fulfilment centres.",
    ctaLabel: "Inside Clara",
    path: "/businesses/clara",
    photoId: "1498049794561-7780e7231661",
    focal: "center 55%",
  },
  {
    id: "warrick-motors",
    name: "Warrick Motors",
    sector: "Mobility and Engineering",
    headline: "Engineering judged on the road, not in the brochure.",
    body: "Warrick Motors develops powertrains, electrifies commercial fleets and runs the group vehicle testing programme from its facility outside Coventry.",
    ctaLabel: "Inside Warrick Motors",
    path: "/businesses/warrick-motors",
    photoId: "1492144534655-ae79c964c9d7",
    focal: "center 60%",
  },
];

/* --------------------------------------------------------------------------
   Group metrics — the strip directly beneath the hero.
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Group metrics — the strip directly beneath the hero.

   `value` and `symbol` are separate so the section can tint the trailing
   glyph gold while the numeral keeps full charcoal contrast.
   -------------------------------------------------------------------------- */
export const groupMetrics = [
  {
    id: "sectors",
    value: "03",
    symbol: "+",
    label: "Core Business Sectors",
    detail:
      "Energy and corporate holdings, e-commerce, and automotive engineering, held under a single balance sheet.",
  },
  {
    id: "valuation",
    value: "$250M",
    symbol: "+",
    label: "Portfolio Valuation",
    detail:
      "Combined book value across the operating companies and our long-hold positions in key markets.",
  },
  {
    id: "people",
    value: "1,500",
    symbol: "+",
    label: "Skilled Professionals",
    detail:
      "Engineers, analysts and operators across our production sites and regional offices.",
  },
  {
    id: "governance",
    value: "100",
    symbol: "%",
    label: "Ethics-Driven Expansion",
    detail:
      "Every new venture is screened against our environmental and governance standards before capital is committed.",
  },
];
