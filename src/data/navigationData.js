/**
 * WARRICK CORPORATION — Navigation Data Layer
 * ---------------------------------------------------------------------------
 * Single source of truth for the TopBar + Navbar. Keeping this separate from
 * the view layer means marketing/IR can update labels, routes and division
 * copy without touching component logic.
 *
 * NOTE: `descriptor` / `summary` strings below are placeholders — replace them
 * with approved corporate copy before launch.
 */

/* --------------------------------------------------------------------------
   Market data shown in the utility strip.
   Wire `price` / `change` to a live feed (or a cached API route) later; the
   shape below is what <TopBar /> expects.
   -------------------------------------------------------------------------- */
export const stockTicker = {
  symbol: "WARRICK",
  exchange: "NSE",
  currency: "USD",
  price: 142.5,
  change: 1.13,
  changePercent: 0.8,
  direction: "up", // "up" | "down" | "flat"
  asOf: "16:00 GMT",
};

/* --------------------------------------------------------------------------
   Region / language selector.
   -------------------------------------------------------------------------- */
// export const regions = [
//   { id: "global", label: "Global", language: "EN" },
//   { id: "mena", label: "Middle East", language: "AR" },
//   { id: "apac", label: "Asia Pacific", language: "EN" },
//   { id: "emea", label: "Europe", language: "EN" },
// ];

/* --------------------------------------------------------------------------
   Secondary links — right side of the utility strip.
   -------------------------------------------------------------------------- */
export const utilityLinks = [
  { label: "Careers", path: "/careers" },
  { label: "Investor Relations", path: "/investor-relations" },
  { label: "Global Presence", path: "/global-presence" },
  { label: "Media Center", path: "/media-center" },
];

/* --------------------------------------------------------------------------
   Operating companies — powers the "Our Businesses" dropdown panel.
   -------------------------------------------------------------------------- */
export const businessDivisions = [
  {
    id: "clara",
    name: "Clara",
    path: "/businesses/clara",
    descriptor: "Consumer Technology & Lifestyle",
    established: "2016",
  },
  {
    id: "warrick-motors",
    name: "Warrick Motors",
    path: "/businesses/warrick-motors",
    descriptor: "Mobility & Advanced Engineering",
    established: "2009",
  },
];

/* --------------------------------------------------------------------------
   Primary navigation. An item with `children` renders as a dropdown; `path`
   stays meaningful so the parent remains a real, linkable destination.
   -------------------------------------------------------------------------- */
export const mainNavigation = [
  { label: "About Us", path: "/about" },
  { label: "Our Businesses", path: "/businesses", children: businessDivisions },
  { label: "Sustainability", path: "/sustainability" },
  { label: "Innovation", path: "/innovation" },
  { label: "News", path: "/news" },
];

/* --------------------------------------------------------------------------
   Header call-to-action.
   -------------------------------------------------------------------------- */
export const primaryCta = { label: "Inquire", path: "/contact" };
