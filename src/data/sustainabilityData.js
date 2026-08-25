/**
 * WARRICK CORPORATION — Sustainability Page Content
 * ---------------------------------------------------------------------------
 * BACKEND CONTRACT
 *
 *   RoadmapMilestone {
 *     id       string
 *     year     number   integer, sorts the roadmap. Not a string — the view
 *                       needs to compare it against the current year to work
 *                       out what is behind and what is ahead.
 *     phase    string   short label for the band of work
 *     title    string
 *     target   string   the commitment in one line, quotable verbatim
 *     detail   string   what it takes to get there
 *     status   'complete' | 'active' | 'planned'
 *   }
 *
 *   EsgPillar {
 *     id           string
 *     code         'E' | 'S' | 'G'
 *     index        string   display ordinal, zero-padded
 *     title        string
 *     statement    string
 *     commitments  string[]
 *     metrics      [{ id, label, value, unit, asOf }]   asOf is ISO 8601
 *   }
 *
 *   Report {
 *     id           string
 *     title        string
 *     category     string
 *     period       string   reporting period as published, e.g. "FY2025"
 *     format       string   'PDF'
 *     fileSize     string   as published, e.g. "4.2 MB"
 *     pages        number
 *     url          string   absolute or app-relative path to the file
 *     publishedAt  string   ISO 8601 date
 *   }
 *
 * `status` is stored rather than derived from `year` on purpose. A milestone
 * can slip past its year without being abandoned, and a page that silently
 * recategorises a missed target is a page nobody can rely on. When this comes
 * from an API the field is set by whoever owns the commitment, not by a date
 * comparison in the browser.
 *
 * NOTE: all copy and figures below are placeholders.
 *
 * NOTE ON `url`: the report files do not exist in /public yet, so every
 * download link currently 404s. Drop the PDFs at the paths below, or point
 * `url` at the document store, before this page goes anywhere near
 * production.
 */

export const sustainabilityHero = {
    eyebrow: "Responsibility",
    title: "Net Zero by 2035",
    lead: "One reduction path across all three operating companies, measured against a 2019 baseline and verified by a party with no reporting line into the sites being assessed.",
};

/* Group position. Four readings of the same programme, not four claims. */
export const position = [
    {
        id: "reduction",
        label: "Reduction to Date",
        value: "38",
        unit: "%",
        detail: "Scope one and two against the 2019 baseline.",
    },
    {
        id: "scopes",
        label: "Scopes Reported",
        value: "03",
        unit: "",
        detail: "All three, verified independently since 2024.",
    },
    {
        id: "capital",
        label: "Committed to 2035",
        value: "$180M",
        unit: "",
        detail: "Ring-fenced against the reduction path.",
    },
    {
        id: "sites",
        label: "Sites Under Review",
        value: "41",
        unit: "",
        detail: "Every operating site in the group, annually.",
    },
];

/* --------------------------------------------------------------------------
   Net-zero roadmap. Ordered oldest first; the view renders in array order.
   -------------------------------------------------------------------------- */
export const roadmap = {
    eyebrow: "The Path",
    title: "A dated commitment, not a direction of travel.",
    intro: "Each milestone below carries a year and a named owner. Where one slips it stays on the page with the slip recorded against it, because a roadmap that only ever shows what went to plan is a marketing document.",
    baselineYear: 2019,
    targetYear: 2035,

    milestones: [
        {
            id: "baseline",
            year: 2019,
            phase: "Baseline",
            title: "Emissions baseline set across the group",
            target: "One measured starting point for every operating company.",
            detail: "Scope one and two measured at all forty-one sites under a single methodology, replacing three incompatible entity-level standards.",
            status: "complete",
        },
        {
            id: "verification",
            year: 2022,
            phase: "Assurance",
            title: "Scope one and two moved to external verification",
            target: "No figure published without an independent check.",
            detail: "Verification commissioned centrally rather than by the site under review, which is the change that made the numbers comparable across entities.",
            status: "complete",
        },
        {
            id: "scope-three",
            year: 2024,
            phase: "Assurance",
            title: "Scope three brought into the reported footprint",
            target: "Full supply chain visibility across all three companies.",
            detail: "Reported figures rose in the first year at four sites. Those movements were published rather than absorbed into a restated baseline.",
            status: "complete",
        },
        {
            id: "interim",
            year: 2026,
            phase: "Reduction",
            title: "Forty-five per cent reduction against baseline",
            target: "45% cut in scope one and two by year end.",
            detail: "Currently at thirty-eight per cent. The remaining seven points depend on the Halden site conversion completing on schedule in the fourth quarter.",
            status: "active",
        },
        {
            id: "unabated-gas",
            year: 2029,
            phase: "Generation",
            title: "Generation off unabated gas",
            target: "No unabated gas in the group generation mix.",
            detail: "Two sites carry long-term offtake agreements that run to 2028. Neither will be renewed, and no new thermal capacity has been approved since 2021.",
            status: "planned",
        },
        {
            id: "fleet",
            year: 2032,
            phase: "Mobility",
            title: "Group fleet fully electrified",
            target: "Every owned vehicle across the group converted.",
            detail: "Constrained by depot charging infrastructure rather than by vehicle supply, which is why the survey work is running ahead of the conversion schedule.",
            status: "planned",
        },
        {
            id: "net-zero",
            year: 2035,
            phase: "Target",
            title: "Net zero across all three scopes",
            target: "Residual emissions under five per cent of the 2019 baseline.",
            detail: "Offsets are capped at that residual and may only be used against emissions with no available abatement route. The cap is a board condition, not a guideline.",
            status: "planned",
        },
    ],
};

/* Presentational only. Kept beside the data so the vocabulary of the status
   field lives in one place. */
export const statusLabel = (status) =>
    ({ complete: "Delivered", active: "In Progress", planned: "Committed" })[status] ?? status;

/* --------------------------------------------------------------------------
   ESG pillars.
   -------------------------------------------------------------------------- */
export const esgSection = {
    eyebrow: "The Framework",
    title: "Three pillars. One reporting line.",
};

export const esgPillars = [
    {
        id: "environment",
        code: "E",
        index: "01",
        title: "Environment",
        statement:
            "Capital projects are held to a stated emissions trajectory as a condition of approval. A project that cannot show one does not proceed, and the return profile is not a mitigating factor.",
        commitments: [
            "Reduction path presented at the approval gate, not at commissioning",
            "Scope one, two and three verified independently of the reporting site",
            "Water and waste reported at site level under one group standard",
            "Offsets capped at the residual and restricted to unabatable emissions",
        ],
        metrics: [
            {
                id: "emissions",
                label: "Scope 1 & 2 vs 2019",
                value: "-38",
                unit: "%",
                asOf: "2026-06-30",
            },
            {
                id: "renewable",
                label: "Renewable Generation",
                value: "62",
                unit: "%",
                asOf: "2026-06-30",
            },
            { id: "waste", label: "Waste Diverted", value: "84", unit: "%", asOf: "2026-06-30" },
        ],
    },
    {
        id: "social",
        code: "S",
        index: "02",
        title: "Social",
        statement:
            "Safety performance is reviewed by the board rather than by the business that produced the figures. The same standard applies at every site, in every jurisdiction, with no local variance permitted.",
        commitments: [
            "One safety standard across all forty-one sites",
            "Supplier audits carried out on site rather than by questionnaire",
            "Apprenticeship intake held flat through capital cycles",
            "Pay ratios published annually across all three companies",
        ],
        metrics: [
            {
                id: "ltifr",
                label: "Lost Time Injury Rate",
                value: "0.21",
                unit: "",
                asOf: "2026-06-30",
            },
            {
                id: "apprentices",
                label: "Apprentices in Post",
                value: "148",
                unit: "",
                asOf: "2026-06-30",
            },
            {
                id: "audits",
                label: "Supplier Site Audits",
                value: "96",
                unit: "",
                asOf: "2026-06-30",
            },
        ],
    },
    {
        id: "governance",
        code: "G",
        index: "03",
        title: "Governance",
        statement:
            "Audit, risk and environmental review sit outside the operating companies and report to non-executive directors. No operating company may waive a finding raised against it.",
        commitments: [
            "One code of conduct across every jurisdiction",
            "Audit committee chaired by a senior independent director",
            "Concentration limits set at group level and reviewed twice yearly",
            "Whistleblowing line routed outside the management chain",
        ],
        metrics: [
            {
                id: "independent",
                label: "Independent Directors",
                value: "60",
                unit: "%",
                asOf: "2026-06-30",
            },
            {
                id: "findings",
                label: "Findings Closed",
                value: "100",
                unit: "%",
                asOf: "2026-06-30",
            },
            {
                id: "training",
                label: "Conduct Training",
                value: "99",
                unit: "%",
                asOf: "2026-06-30",
            },
        ],
    },
];

/* --------------------------------------------------------------------------
   Disclosure library.
   -------------------------------------------------------------------------- */
export const reportsSection = {
    eyebrow: "Disclosure",
    title: "Everything we publish, in one place.",
    note: "Reports are published annually and are not restated once issued. Where a figure changes, the movement is disclosed in the following year rather than applied backwards.",
};

export const reports = [
    {
        id: "sustainability-2025",
        title: "Annual Sustainability Report",
        category: "Group",
        period: "FY2025",
        format: "PDF",
        fileSize: "6.4 MB",
        pages: 118,
        url: "/reports/warrick-sustainability-report-fy2025.pdf",
        publishedAt: "2026-03-18",
    },
    {
        id: "tcfd-2025",
        title: "Climate-Related Financial Disclosure",
        category: "Climate",
        period: "FY2025",
        format: "PDF",
        fileSize: "2.8 MB",
        pages: 46,
        url: "/reports/warrick-tcfd-disclosure-fy2025.pdf",
        publishedAt: "2026-03-18",
    },
    {
        id: "scope-three-method",
        title: "Scope Three Reporting Methodology",
        category: "Climate",
        period: "2026 Edition",
        format: "PDF",
        fileSize: "1.4 MB",
        pages: 32,
        url: "/reports/warrick-scope-three-methodology-2026.pdf",
        publishedAt: "2026-06-24",
    },
    {
        id: "governance-framework",
        title: "Corporate Governance Framework",
        category: "Governance",
        period: "2026 Edition",
        format: "PDF",
        fileSize: "1.1 MB",
        pages: 28,
        url: "/reports/warrick-governance-framework-2026.pdf",
        publishedAt: "2026-01-30",
    },
    {
        id: "modern-slavery",
        title: "Modern Slavery and Supply Chain Statement",
        category: "Social",
        period: "FY2025",
        format: "PDF",
        fileSize: "0.9 MB",
        pages: 18,
        url: "/reports/warrick-modern-slavery-statement-fy2025.pdf",
        publishedAt: "2026-02-11",
    },
];

/* One shared formatter. Locale is pinned so server and client agree; swap to
   the user's locale when internationalisation lands. */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
});

export const formatPublished = (isoDate) => dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));

export const assuranceNote =
    "Independent assurance is commissioned by the environmental review committee, which is chaired by a non-executive director. Its findings reach the board whether or not management accepts them.";
