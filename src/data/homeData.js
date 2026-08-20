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
    id: "warrick-corporation",
    name: "Warrick Corporation",
    sector: "Energy and Infrastructure",
    headline: "The balance sheet the rest of the group is built on.",
    body: "Warrick Corporation holds our energy assets, industrial sites and capital programmes. It carries the long payback projects so the operating companies can stay focused on their own markets.",
    ctaLabel: "Inside Warrick Corporation",
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

/* --------------------------------------------------------------------------
   Portfolio — the alternating editorial rows in <PortfolioSection />.

   These describe the same three companies as `heroSlides` but carry their own
   copy on purpose: the hero needs a short declarative line, the portfolio
   needs a fuller editorial summary. Identity fields (name, path) are the only
   overlap.
   -------------------------------------------------------------------------- */
export const portfolioEntities = [
  {
    id: "warrick-corporation",
    index: "01",
    name: "Warrick Corporation",
    sector: "Parent Holding and Infrastructure",
    summary:
      "The holding company for the group's energy assets, industrial sites and capital programmes. It underwrites the long payback projects and sets the operating standards the rest of the group is measured against.",
    path: "/businesses",
    photoId: "1486406146926-c627a92ad1ab",
    focal: "center 35%",
  },
  {
    id: "clara",
    index: "02",
    name: "Clara",
    sector: "Consumer Technology and E-Commerce",
    summary:
      "Consumer hardware and the commerce platform that carries it, from industrial design through to the fulfilment network now serving fourteen markets.",
    path: "/businesses/clara",
    photoId: "1498049794561-7780e7231661",
    focal: "center 55%",
  },
  {
    id: "warrick-motors",
    index: "03",
    name: "Warrick Motors",
    sector: "Automotive and Advanced Mobility",
    summary:
      "Powertrain development, commercial fleet electrification and the group's vehicle testing programme, run from the engineering campus outside Coventry.",
    path: "/businesses/warrick-motors",
    photoId: "1492144534655-ae79c964c9d7",
    focal: "center 60%",
  },
];

/* --------------------------------------------------------------------------
   Newsroom — the three most recent releases surfaced on the home page.
   `dateTime` is the machine-readable value for <time>; `date` is what reads.
   -------------------------------------------------------------------------- */
export const newsItems = [
  {
    id: "motors-fleet-programme",
    date: "AUG 2026",
    dateTime: "2026-08-12",
    category: "Automotive",
    headline:
      "Warrick Motors opens its fleet electrification programme to third-party operators",
    readTime: "4 min read",
    path: "/news",
  },
  {
    id: "clara-fulfilment-hub",
    date: "JUL 2026",
    dateTime: "2026-07-29",
    category: "E-Commerce",
    headline:
      "Clara brings a third regional fulfilment centre online ahead of schedule",
    readTime: "3 min read",
    path: "/news",
  },
  {
    id: "half-year-results",
    date: "JUL 2026",
    dateTime: "2026-07-15",
    category: "Corporate",
    headline:
      "Group reports half-year results and confirms its capital plan through 2028",
    readTime: "6 min read",
    path: "/news",
  },
];

/* --------------------------------------------------------------------------
   Group overview — <AboutOverviewSection />

   NOTE on the portrait: `photoId` is a stock frame standing in for the
   founder. It is a photograph of a real, unrelated person, so it must be
   replaced with an approved photograph of Warrick before launch and must not
   ship presented as him. The owner's own photograph is in the repo at
   public/warrick.jpeg, but at 374 x 373 it cannot fill a 4:5 editorial plate.
   -------------------------------------------------------------------------- */
export const aboutOverview = {
  paragraphs: [
    "Capital is committed centrally and on a decade view. That lets Clara and Warrick Motors plan past the cycle they happen to be trading in, and it stops the group selling a sound business to cover a poor quarter.",
    "What we do not centralise is judgement. Each company hires its own people, sets its own product direction and answers for its own numbers. What they share is one balance sheet, one code of conduct, and one standard of engineering applied the same way in every market we operate in.",
  ],

  pillars: [
    {
      id: "capital",
      title: "Disciplined Capital Allocation",
      detail:
        "Reinvestment goes into sustainable infrastructure and mobility, measured against a ten year return rather than a quarterly one.",
    },
    {
      id: "autonomy",
      title: "Operational Autonomy",
      detail:
        "Each entity leads its own market with its own team. The group sets the standard and then stays out of the way.",
    },
    {
      id: "governance",
      title: "Zero-Compromise Governance",
      detail:
        "One compliance regime across every jurisdiction, with environmental reporting and risk review carried out independently of the business under review.",
    },
  ],

  principal: {
    name: "Warrick",
    title: "Founder & Executive Chairman",
    quote:
      "Our standard is defined not by market cycles, but by the generational value we create across mobility, infrastructure, and technology.",

    /* Casual studio headshot: white t-shirt, open smile. Reads as a personal
       brand portrait rather than an executive one. */
    photoId: "1507003211169-0a1dd7228f2d",

    /* Verified alternative in business attire with a composed expression and
       a corporate setting, if the brief above wants executive register:
       photoId: "1560250097-0b93528c311a", */

    photoQuality: 85,
    focal: "center 25%",
  },
};

/* --------------------------------------------------------------------------
   Entity and partner wordmarks — <BrandLogosSection />

   Rendered as typographic wordmarks rather than image assets: there is no
   licensed logo library yet, and a real wordmark set will arrive as SVG.
   NOTE: the three `partner` names below are placeholders. Replace with the
   actual partner list, and confirm usage rights, before launch.
   -------------------------------------------------------------------------- */
export const brandEntities = [
  { id: "warrick-corporation", name: "Warrick Corporation", type: "entity" },
  { id: "clara", name: "Clara", type: "entity" },
  { id: "warrick-motors", name: "Warrick Motors", type: "entity" },
  { id: "meridian", name: "Meridian Capital", type: "partner" },
  { id: "halden", name: "Halden Energy", type: "partner" },
  { id: "ashcroft", name: "Ashcroft Logistics", type: "partner" },
];

/* --------------------------------------------------------------------------
   Values and sustainability — <ValuesESGSection />
   -------------------------------------------------------------------------- */
export const esgCommitments = {
  photoId: "1509391366360-2e959784a276",
  focal: "center 45%",
  imageAlt:
    "A solar array on open ground at one of the group's generation sites",
  values: [
    {
      id: "excellence",
      index: "01",
      title: "Operational Excellence",
      detail:
        "Every site reports against the same safety and efficiency standards, and those numbers are reviewed by the board rather than by the business that produced them.",
    },
    {
      id: "environment",
      index: "02",
      title: "Environmental Responsibility",
      detail:
        "We measure emissions across all three scopes and hold new capital projects to a stated reduction path before they are approved.",
    },
    {
      id: "governance",
      index: "03",
      title: "Uncompromising Governance",
      detail:
        "One code of conduct across the group, an independent audit committee, and a reporting line that never passes through the business being reviewed.",
    },
  ],
};

/* --------------------------------------------------------------------------
   Corporate inquiries — <InquiryCTA />
   Routes only. The contact form lives on its own page.
   -------------------------------------------------------------------------- */
export const inquiryChannels = {
  statement:
    "Our corporate teams handle partnership proposals, shareholder questions and press enquiries directly. Send it to the right desk and you will hear back within two working days.",
  channels: [
    {
      id: "investor-relations",
      label: "Investor Relations Inquiries",
      detail: "Results, shareholder information and analyst briefings.",
      path: "/investor-relations",
    },
    {
      id: "media-press",
      label: "Media and Corporate Press",
      detail: "Press office, executive biographies and the brand asset library.",
      path: "/media-center",
    },
  ],
};
