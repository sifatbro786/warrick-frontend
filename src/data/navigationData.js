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

/* ==========================================================================
   FOOTER
   --------------------------------------------------------------------------
   Every path below resolves to a real route in src/routes/AppRoutes.jsx.
   Check that before adding a link: a dead footer link is the kind of thing
   nobody notices until a journalist follows it.
   ========================================================================== */

/* Operating companies. These carry a tagline because the footer is often the
   first place a reader meets the group structure. */
export const footerEntities = {
  id: "entities",
  title: "Group Entities",
  links: [
    {
      label: "Warrick Corporation",
      tagline: "Parent holding and infrastructure",
      path: "/businesses",
    },
    {
      label: "Clara",
      tagline: "Consumer technology and e-commerce",
      path: "/businesses/clara",
    },
    {
      label: "Warrick Motors",
      tagline: "Automotive and advanced mobility",
      path: "/businesses/warrick-motors",
    },
  ],
};

/* Plain link columns. */
export const footerColumns = [
  {
    id: "enterprise",
    title: "Enterprise",
    links: [
      { label: "Leadership & Heritage", path: "/leadership" },
      { label: "Board of Directors", path: "/board" },
      { label: "Sustainability & ESG", path: "/sustainability" },
      { label: "Investor Relations", path: "/investor-relations" },
      { label: "Careers", path: "/careers" },
    ],
  },
  {
    id: "insights",
    title: "Insights",
    links: [
      { label: "Press Releases", path: "/news" },
      { label: "Annual Reports", path: "/annual-reports" },
      { label: "Brand Assets", path: "/brand-assets" },
      /* Shares a destination with "Ethics & Compliance" in the legal strip.
         Split them if governance ever gets its own page. */
      { label: "Corporate Governance", path: "/ethics-governance" },
    ],
  },
];

/* Registered office, operating hubs and the corporate desk.
   NOTE: placeholder details. Replace with the registered address and a
   monitored inbox before launch. */
export const headOffice = {
  id: "headquarters",
  title: "Global Headquarters",
  address: ["One Meridian Court", "London EC2N 4AY", "United Kingdom"],
  hubs: ["London", "Dubai", "Dhaka", "Singapore"],
  email: "corporate@warrickgroup.com",
  phone: "+44 20 7946 0112",
};

/* Bottom strip. */
export const footerLegal = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Sitemap", path: "/sitemap" },
];

/* Operational status shown at the end of the legal strip.
   NOTE: currently a static declaration, not a reading. Wire `state` to the
   real status feed before launch, or remove it. A status indicator that
   cannot report a problem is worse than none. */
export const operationalStatus = {
  label: "Global Operations",
  state: "Nominal",
  locale: "English (Global)",
};
