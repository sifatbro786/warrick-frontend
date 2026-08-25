/**
 * WARRICK CORPORATION — About Page Content
 * ---------------------------------------------------------------------------
 * Every string the About page renders lives here. The page component holds no
 * copy of its own, so an editor can rewrite the group narrative without ever
 * opening a .jsx file.
 *
 * BACKEND CONTRACT
 * ---------------------------------------------------------------------------
 * `leadership` is the one collection here that maps to a real table. It is
 * modelled as a flat list rather than three separate exports so a single
 * `GET /api/leadership` response can replace it verbatim:
 *
 *   Leadership {
 *     id       string   slug, stable across photo/title changes
 *     name     string
 *     title    string
 *     bio      string   two sentences, plain text, no markup
 *     photo    string|null   absolute CDN url, null for text-only board seats
 *     type     'executive' | 'board'
 *   }
 *
 * The three selectors below the array are pure derivations. When the fetch
 * lands, they become `useMemo` filters over the response and nothing in
 * AboutPage.jsx changes.
 *
 * `quote`, `focal` and `isPrincipal` are additive fields: a nullable `quote`
 * column, a nullable `focal` string (CSS object-position) and a boolean
 * `is_principal` flag on the same table. They are optional by design — a
 * record without them renders as a normal executive card.
 *
 * `isPrincipal` is what separates the two founding officers from the rest of
 * the executive team. It is a flag rather than a third `type` value because
 * both principals are still executives for every other purpose, and a
 * `type: 'principal'` would have to be special-cased everywhere `executive`
 * is queried.
 *
 * NOTE: copy and photography are placeholders. `photo` values are built from
 * the Unsplash helper so the shape stays a plain URL string; when the licensed
 * portrait library lands, delete the import and paste real URLs.
 */

import { unsplash } from "../lib/images";

/* Portrait plates never exceed ~700px, so they are requested at a width that
   covers a 2x display without shipping a 2560px frame into a card. */
const PORTRAIT_WIDTH = 900;

/* --------------------------------------------------------------------------
   Hero — the opening statement.
   -------------------------------------------------------------------------- */
export const aboutHero = {
    eyebrow: "The Group",
    title: "Enterprise Built on Generational Vision",
    lead: "Warrick Corporation is a privately held group operating across energy infrastructure, consumer technology and advanced mobility. We hold assets for decades, not quarters.",
    meta: [
        { id: "founded", label: "Founded", value: "1998" },
        { id: "headquarters", label: "Headquarters", value: "London" },
        { id: "entities", label: "Operating Companies", value: "03" },
        { id: "markets", label: "Markets Served", value: "14" },
    ],
};

/* --------------------------------------------------------------------------
   History and mission — the two-column narrative block.

   `history` is the left column and reads as continuous prose. `mission` is
   the right column: a short statement followed by the values, set as a
   definition list under hairlines.
   -------------------------------------------------------------------------- */
export const groupStory = {
    eyebrow: "Origin and Mandate",
    title: "Three decades of building things that outlast their cycle.",

    history: [
        "Warrick Corporation began in 1998 as a single industrial contract in the North Sea. The work was unglamorous and the margins were thin, but it taught the group the discipline it still runs on: understand the asset before you finance it, and never let a financing structure decide an engineering question.",
        "The first two decades were spent in energy and heavy infrastructure. Warrick Motors followed in 2009, built around powertrain work the group had already been doing for other people. Clara arrived in 2016 when consumer demand moved online faster than the incumbents could restructure for it.",
        "Today the three companies share one balance sheet and one code of conduct. They do not share a strategy. Each answers for its own market, its own hiring and its own numbers, and each is held to the same standard of engineering wherever it operates.",
    ],

    missionStatement:
        "We commit capital on a ten year view so the operating companies can build past the cycle they happen to be trading in.",

    values: [
        {
            id: "long-horizon",
            index: "01",
            title: "Long Horizon Capital",
            detail: "Reinvestment is measured against a decade of return. A sound business is never sold to cover a poor quarter.",
        },
        {
            id: "autonomy",
            index: "02",
            title: "Operational Autonomy",
            detail: "Each entity leads its own market with its own team. The group sets the standard and then stays out of the way.",
        },
        {
            id: "engineering",
            index: "03",
            title: "Engineering First",
            detail: "Technical judgement outranks commercial pressure at every stage of a capital project, including the ones already underway.",
        },
        {
            id: "governance",
            index: "04",
            title: "One Compliance Regime",
            detail: "The same environmental, safety and conduct standards apply in every jurisdiction we hold an asset in.",
        },
    ],
};

/* --------------------------------------------------------------------------
   Leadership — see the BACKEND CONTRACT note at the top of this file.
   -------------------------------------------------------------------------- */
export const leadership = [
    {
        id: "warrick",
        name: "Warrick",
        title: "Founder & Executive Chairman",
        bio: "Warrick founded the group in 1998 and has chaired it through every capital cycle since. He remains directly involved in asset acquisition and sits on the investment committee of each operating company.",
        /* Owner's own photograph. The source file is 374 x 373, so it is cropped
       to 4:5 from the top rather than scaled up — replace with a commissioned
       editorial portrait at 1600px or above before launch. */
        photo: "/warrick.jpeg",
        type: "executive",

        /* Additive, principals only. Nullable columns on the same table. */
        isPrincipal: true,
        quote: "Our standard is defined not by market cycles, but by the generational value we create across mobility, infrastructure and technology.",
        focal: "center 20%",
    },
    {
        id: "asma-akbar",
        name: "Asma Akbar",
        /* TITLE — change this one string if the post is named differently on the
       register. Everything else on the page reads from the record. */
        title: "Co-Founder & Vice Chairwoman",
        bio: "Asma co-founded the group and chairs the capital and governance committee. She holds the mandate over group structure, compliance and the standards each operating company is held to.",
        photo: "/asma.jpeg",
        type: "executive",

        isPrincipal: true,
        quote: "A standard only counts if it survives the quarter it becomes inconvenient. That is the part we do not delegate.",
        focal: "center 25%",
    },
    {
        id: "helena-marsh",
        name: "Helena Marsh",
        title: "Chief Executive Officer",
        bio: "Helena runs group operations across the three entities and chairs the quarterly capital review. She joined in 2011 from a twelve year career in offshore energy delivery.",
        photo: unsplash("1573497019940-1c28c88b4f3e", PORTRAIT_WIDTH, 80),
        type: "executive",
        focal: "center 25%",
    },
    {
        id: "adrian-kohl",
        name: "Adrian Kohl",
        title: "Chief Investment Officer",
        bio: "Adrian leads capital allocation and the group's long hold positions in regulated infrastructure. He is responsible for the ten year model every acquisition is tested against.",
        photo: unsplash("1560250097-0b93528c311a", PORTRAIT_WIDTH, 80),
        type: "executive",
        focal: "center 22%",
    },
    {
        id: "priya-raman",
        name: "Priya Raman",
        title: "Head of Global Infrastructure",
        bio: "Priya oversees the group's generation, grid and logistics assets from London and Singapore. She built the reporting standard now used across all three operating companies.",
        photo: unsplash("1580489944761-15a19d654956", PORTRAIT_WIDTH, 80),
        type: "executive",
        focal: "center 25%",
    },

    /* Board seats. Text-only by design: the board statement below is the
     public-facing record, and headshots would give non-executive directors
     the same visual weight as the operating leadership. */
    {
        id: "j-okafor",
        name: "Justin Okafor",
        title: "Senior Independent Director",
        bio: "Justin chairs the audit committee and has no executive role in any group company. He was previously group finance director of a listed industrial holding.",
        photo: null,
        type: "board",
    },
    {
        id: "m-lindqvist",
        name: "Margit Lindqvist",
        title: "Non-Executive Director, Risk",
        bio: "Margit chairs the risk and environmental review committee. She spent nineteen years in prudential regulation before moving to board work.",
        photo: null,
        type: "board",
    },
];

/* Pure derivations. These become filters over the API response later.

   `principals` keeps source order, so the array order in `leadership` is what
   decides which portrait sits left on the page. */
export const principals = leadership.filter((person) => person.isPrincipal);

export const executiveTeam = leadership.filter(
    (person) => person.type === "executive" && !person.isPrincipal,
);

export const boardMembers = leadership.filter((person) => person.type === "board");

/* --------------------------------------------------------------------------
   Governance — the closing statement block.

   Rendered as hairline-separated clauses rather than cards. The board
   statement is a legal-register text, and boxing it makes it read as
   marketing.
   -------------------------------------------------------------------------- */
export const governanceStatement = {
    eyebrow: "Governance and Board Oversight",
    title: "Oversight that does not report to the business it reviews.",

    intro: "The board holds a single compliance regime across every jurisdiction the group operates in. Audit, risk and environmental review sit outside the operating companies and report directly to non-executive directors.",

    clauses: [
        {
            id: "ethics",
            title: "Ethical Compliance",
            detail: "One code of conduct applies group-wide. Anti-bribery, sanctions and conflict-of-interest screening are run centrally, and no operating company may waive a finding raised against it.",
        },
        {
            id: "risk",
            title: "Investment Risk Strategy",
            detail: "Every acquisition is modelled against a ten year downside case before capital is committed. Concentration limits are set at group level and reviewed twice a year by the board rather than by the investment team.",
        },
        {
            id: "environment",
            title: "Environmental Review",
            detail: "Capital projects are held to a stated emissions reduction path as a condition of approval. Scope one, two and three reporting is verified independently of the site that produced the figures.",
        },
        {
            id: "audit",
            title: "Independent Audit",
            detail: "The audit committee is chaired by a senior independent director with no executive role in any group company. Its reporting line never passes through management.",
        },
    ],

    footnote:
        "The group's full governance framework and annual compliance report are available to shareholders on request.",
};
