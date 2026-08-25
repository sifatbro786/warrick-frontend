/**
 * WARRICK CORPORATION — Group Companies
 * ---------------------------------------------------------------------------
 * The single source of truth for /businesses and /businesses/:slug. Both the
 * index and the detail template read from this array, so a fourth company is
 * an entry here and nothing else.
 *
 * BACKEND CONTRACT
 *
 *   Entity {
 *     id           string   stable primary key
 *     slug         string   unique, url-safe, resolves /businesses/:slug
 *     index        string   display ordinal, zero-padded
 *     name         string
 *     sector       string
 *     tagline      string   one line, used on the index row
 *     summary      string   one or two sentences, index row
 *     established  string   ISO 8601 year
 *     headquarters string
 *     headcount    string   as published, banded rather than exact
 *     type         'parent' | 'operating'
 *     ownership    string   the holding company of record
 *     coverImage   string   absolute CDN url
 *     website      Website | null
 *     detail       Detail
 *   }
 *
 *   Website {
 *     url      string   absolute, external
 *     display  string   bare host, what the reader sees
 *     status   'live' | 'pending'
 *   }
 *
 *   Detail {
 *     lead        string
 *     narrative   string[]                        ordered paragraphs
 *     metrics     [{ id, label, value, unit, detail }]
 *     capabilities[{ id, index, title, detail }]
 *     operations  Operations | null
 *   }
 *
 *   Operations {
 *     eyebrow  string
 *     title    string
 *     intro    string
 *     steps    [{ id, index, title, detail }]     ordered, start to finish
 *   }
 *
 * WHY `website.status` EXISTS
 * The two operating companies get their own public sites. Until a site is up,
 * flipping `status` to 'pending' makes the detail page print the domain as
 * plain text with a launch note instead of rendering a live anchor. A
 * corporate site that links to a dead domain is worse than one that says the
 * site is not up yet, and the alternative — commenting the link out and
 * remembering to restore it — is the thing everyone forgets. Both are 'live'
 * today; change the one string when a launch slips.
 *
 * WHY THE PARENT IS NOT IN HERE
 * Warrick Corporation is the holding company, not a trading business, and
 * this whole site already is its profile — a /businesses/warrick-corporation
 * page would have restated /about under a second address, which is a
 * duplicate for search engines and a second thing to keep in step by hand.
 * The parent's story, leadership and governance live on /about; the group
 * structure statement at the foot of the index links there.
 *
 * WHY `type` AND THE NULLABLE FIELDS SURVIVE
 * `type` stays because it is a real column, and `website` and
 * `detail.operations` stay nullable because the detail template already
 * skips the sections they drive rather than printing an empty band. A future
 * entry — a minority holding, a joint venture, a company whose site is not
 * up yet — drops in without touching a component.
 *
 * NOTE: all copy, figures and photography below are placeholders.
 */

import { unsplash } from "../lib/images";

/* Index rows run about 700px and detail plates about 1400px, so one 1600px
   source covers both. */
const COVER_WIDTH = 1600;

export const businessesHero = {
    eyebrow: "The Group",
    title: "Three Companies. One Balance Sheet.",
    lead: "Capital is committed centrally and on a decade view. Everything else — hiring, product direction, market strategy — belongs to the company that has to answer for it.",
};

export const businessesOutro = {
    eyebrow: "Group Structure",
    title: "The parent underwrites. The companies operate.",
    body: "Warrick Corporation is the holding company rather than a trading business, so it carries no profile of its own here. It commits the capital, sets the standard and then stays out of the way. What the operating companies share is one balance sheet, one code of conduct and one standard of engineering applied the same way in every market they trade in.",
    links: [
        { id: "about", label: "Read the Group Profile", path: "/about" },
        { id: "contact", label: "Speak to the Corporate Desk", path: "/contact" },
    ],
};

export const entities = [
    /* ======================================================================
       CLARA — FASHION E-COMMERCE
       ====================================================================== */
    {
        id: "clara",
        slug: "clara",
        index: "01",
        name: "Clara",
        sector: "Fashion and E-Commerce",
        tagline: "Clothes people keep wearing after the season ends.",
        summary:
            "An online fashion retailer running its own label alongside a curated multi-brand edit, with fulfilment and returns handled in-house across fourteen markets.",
        established: "2016",
        headquarters: "Rotterdam, Netherlands",
        headcount: "500+",
        type: "operating",
        ownership: "Warrick Corporation",
        coverImage: unsplash("1483985988355-763728e1935b", COVER_WIDTH),

        website: {
            url: "https://clara.warrickgroup.com",
            display: "clara.warrickgroup.com",
            status: "live",
        },

        detail: {
            lead: "Clara sells fashion online across fourteen markets, combining an own-label range with a curated multi-brand edit and running the whole fulfilment and returns operation itself rather than handing it to a third party.",

            narrative: [
                "Clara started in 2016 as a small own-label range sold direct, at a point when consumer demand was moving online faster than the incumbent retailers could restructure for it. The label is still the core of the business and still where most of the margin comes from.",
                "The multi-brand edit came later and is deliberately narrow. Buyers work to a fixed number of styles per season rather than a target catalogue size, because an edit that grows every season stops being an edit and becomes a marketplace, which is a different business with different economics.",
                "Fulfilment and returns are run in-house from three regional centres. That is unusual at this size and it is the decision the company would defend hardest: the returns process is where a fashion retailer either recovers its margin or quietly loses it, and it is not something you can specify in a contract with a logistics provider.",
                "Sizing is treated as an engineering problem rather than a copywriting one. Every own-label style carries measured garment data rather than a nominal size label, which is the single change that moved the return rate most.",
            ],

            metrics: [
                {
                    id: "markets",
                    label: "Markets Served",
                    value: "14",
                    unit: "",
                    detail: "Across Europe and the United Kingdom.",
                },
                {
                    id: "styles",
                    label: "Styles in Season",
                    value: "1,800",
                    unit: "",
                    detail: "Own label and curated edit combined, capped by buying policy.",
                },
                {
                    id: "delivery",
                    label: "Median Delivery",
                    value: "2.1",
                    unit: "d",
                    detail: "From three regional fulfilment centres.",
                },
                {
                    id: "returns",
                    label: "Return Rate",
                    value: "18",
                    unit: "%",
                    detail: "Against a sector norm closer to thirty for online fashion.",
                },
            ],

            capabilities: [
                {
                    id: "own-label",
                    index: "01",
                    title: "Own Label",
                    detail: "Design, pattern cutting and sourcing run in-house, with a supplier list short enough that every factory has been visited. Two main seasons and two mid-season drops, which is fewer than the market runs and is a deliberate constraint.",
                },
                {
                    id: "edit",
                    index: "02",
                    title: "Curated Multi-Brand",
                    detail: "A fixed number of styles per season from external labels, bought to complement the own-label range rather than to widen the catalogue. Brands are dropped when the range no longer needs them.",
                },
                {
                    id: "fit",
                    index: "03",
                    title: "Fit and Sizing Data",
                    detail: "Measured garment data published on every own-label style, plus fit feedback captured at return. It is the least glamorous part of the product and the one that moves the return rate.",
                },
                {
                    id: "fulfilment",
                    index: "04",
                    title: "Fulfilment and Returns",
                    detail: "Three regional centres handling pick, pack and returns triage in-house. Returned stock is graded and routed back to sale, to the outlet channel or to recovery, rather than written off on arrival.",
                },
            ],

            operations: {
                eyebrow: "How It Works",
                title: "From the sketch to the second life.",
                intro: "The whole cycle sits inside the company, which is what lets a decision made at the design stage be judged by what it does to the return rate eighteen months later.",
                steps: [
                    {
                        id: "design",
                        index: "01",
                        title: "Design and Sourcing",
                        detail: "In-house design working against a short supplier list. Fabric and factory are chosen before the range is signed off, not after, so a style is never approved at a cost that turns out not to exist.",
                    },
                    {
                        id: "sampling",
                        index: "02",
                        title: "Sampling and Fit",
                        detail: "Every style is fitted on a graded size run rather than a single sample size. Grading errors are the most common cause of a return and they are only visible across the full run.",
                    },
                    {
                        id: "merchandising",
                        index: "03",
                        title: "Photography and Merchandising",
                        detail: "Shot in-house on multiple body types with the measured garment data published alongside. A product page that flatters the garment and misleads the customer costs more than it earns.",
                    },
                    {
                        id: "fulfilment",
                        index: "04",
                        title: "Fulfilment",
                        detail: "Picked and packed from the nearest of three regional centres. Carrier headroom, not warehouse space, is the constraint the network is currently planned around.",
                    },
                    {
                        id: "returns",
                        index: "05",
                        title: "Returns and Recovery",
                        detail: "Triaged and graded on arrival, then routed back to sale, to outlet or to textile recovery. The reason for return is captured against the style and goes back to the design team each season.",
                    },
                ],
            },
        },
    },

    /* ======================================================================
       WARRICK MOTORS — JAPANESE VEHICLE IMPORT
       ====================================================================== */
    {
        id: "warrick-motors",
        slug: "warrick-motors",
        index: "02",
        name: "Warrick Motors",
        sector: "Vehicle Import and Retail",
        tagline: "Cars bought at auction in Japan and sold with their history intact.",
        summary:
            "A vehicle importer sourcing directly from Japanese auction houses, handling inspection, shipping, compliance and registration, then selling the car with the original auction sheet attached.",
        established: "2009",
        headquarters: "Coventry, United Kingdom",
        headcount: "400+",
        type: "operating",
        ownership: "Warrick Corporation",
        coverImage: unsplash("1492144534655-ae79c964c9d7", COVER_WIDTH),

        website: {
            url: "https://motors.warrickgroup.com",
            display: "motors.warrickgroup.com",
            status: "live",
        },

        detail: {
            lead: "Warrick Motors buys vehicles directly at Japanese auction, manages inspection, export, shipping and local compliance end to end, and sells each car with its original auction sheet and inspection record attached.",

            narrative: [
                "The company was founded in 2009 to do one thing properly: buy well-kept vehicles at Japanese auction and land them in the United Kingdom without the buyer having to trust a chain of intermediaries they cannot see.",
                "Bidding is done by our own agents on the floor at the major auction houses rather than through a broker. That is the expensive way to do it and it is the whole point — the person bidding has physically walked the car, and they are the same person who signs the pre-export inspection.",
                "Every vehicle is sold with its original Japanese auction sheet, the translated grade and our own inspection report. Where the auction sheet records a repair, that stays on the file and is priced into the car. A vehicle history that only ever contains good news is a vehicle history nobody should rely on.",
                "Compliance is handled in-house through to registration. Lighting, speedometer, emissions and individual approval are all done before the car reaches a customer, so what is advertised is a road-legal vehicle rather than a project that becomes one later.",
            ],

            metrics: [
                {
                    id: "units",
                    label: "Vehicles Landed",
                    value: "3,200",
                    unit: "/yr",
                    detail: "Across passenger, performance and light commercial.",
                },
                {
                    id: "auctions",
                    label: "Auction Houses",
                    value: "07",
                    unit: "",
                    detail: "Direct bidding access with our own agents on the floor.",
                },
                {
                    id: "leadtime",
                    label: "Auction to Handover",
                    value: "9",
                    unit: "wk",
                    detail: "Median, including shipping, customs and compliance.",
                },
                {
                    id: "grade",
                    label: "Minimum Auction Grade",
                    value: "3.5",
                    unit: "",
                    detail: "Below that we do not bid, whatever the price.",
                },
            ],

            capabilities: [
                {
                    id: "sourcing",
                    index: "01",
                    title: "Auction Sourcing",
                    detail: "Direct bidding at seven Japanese auction houses through our own agents. No broker sits between the person who inspected the car and the person who bought it.",
                },
                {
                    id: "inspection",
                    index: "02",
                    title: "Inspection and Grading",
                    detail: "The original auction sheet is translated in full and paired with our own pre-export inspection. Both travel with the car and both are shown to the buyer, including the parts that reduce the price.",
                },
                {
                    id: "logistics",
                    index: "03",
                    title: "Shipping and Customs",
                    detail: "Roll-on roll-off and container shipping from Yokohama and Kobe, with customs clearance, duty and VAT handled in-house. The landed cost quoted at purchase is the landed cost invoiced.",
                },
                {
                    id: "compliance",
                    index: "04",
                    title: "Compliance and Registration",
                    detail: "Lighting, speedometer, emissions testing and individual vehicle approval completed before sale, through to registration. Cars are advertised road-legal or not advertised.",
                },
                {
                    id: "aftersales",
                    index: "05",
                    title: "Workshop and Aftersales",
                    detail: "Servicing and parts sourcing for imported vehicles from the Coventry workshop, including the models franchised dealers will not take on because they were never sold here.",
                },
            ],

            operations: {
                eyebrow: "The Import Route",
                title: "Auction floor in Japan to registered on the road.",
                intro: "Five stages, all handled by the company. Where an importer outsources a stage is usually where the buyer stops being able to find out what happened to the car.",
                steps: [
                    {
                        id: "bid",
                        index: "01",
                        title: "Auction and Bid",
                        detail: "Our agent inspects the vehicle on the floor, reads the auction sheet against what is actually in front of them, and bids to a ceiling set before the lot opens. Nothing below grade 3.5 is bid on.",
                    },
                    {
                        id: "inspection",
                        index: "02",
                        title: "Pre-Export Inspection",
                        detail: "Mechanical and structural inspection in Japan before the car is booked for shipping, plus a full translation of the auction sheet. A vehicle that fails here is resold locally rather than shipped and quietly discounted.",
                    },
                    {
                        id: "shipping",
                        index: "03",
                        title: "Shipping and Customs",
                        detail: "Export deregistration, marine cover and sailing from Yokohama or Kobe, then customs entry, duty and VAT on arrival. Typically five to six weeks on the water depending on the port.",
                    },
                    {
                        id: "compliance",
                        index: "04",
                        title: "Compliance and Approval",
                        detail: "Lighting and speedometer conversion, emissions testing and individual vehicle approval, then registration. Completed before the vehicle is listed, not after a deposit is taken.",
                    },
                    {
                        id: "handover",
                        index: "05",
                        title: "Preparation and Handover",
                        detail: "Full service, detail and a workshop check at Coventry. The car is handed over with the original auction sheet, the translation, both inspection reports and the compliance paperwork.",
                    },
                ],
            },
        },
    },
];

/* --------------------------------------------------------------------------
   Selectors. Pure derivations — these become filters over the API response.
   -------------------------------------------------------------------------- */
export const findEntityBySlug = (slug) => entities.find((entity) => entity.slug === slug) ?? null;

/* Everything except the one being viewed, for the "elsewhere in the group"
   strip at the foot of a detail page. */
export const otherEntities = (slug) => entities.filter((entity) => entity.slug !== slug);
