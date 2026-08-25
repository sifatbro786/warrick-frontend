/**
 * WARRICK CORPORATION — Innovation Page Content
 * ---------------------------------------------------------------------------
 * BACKEND CONTRACT
 *
 *   FocusArea {
 *     id           string
 *     index        string   display ordinal, zero-padded
 *     title        string
 *     statement    string   one line, the mandate
 *     detail       string   what the work actually involves
 *     disciplines  string[] rendered as plain text, never as tags
 *     leadEntity   string   which operating company owns it
 *   }
 *
 *   Venture {
 *     id          string
 *     name        string
 *     slug        string   unique, url-safe, drives /innovation/:slug later
 *     stage       'research' | 'pilot' | 'scaling'
 *     sector      string
 *     established string   ISO 8601 year
 *     location    string
 *     leadEntity  string
 *     summary     string   one or two sentences for the grid card
 *     coverImage  string   absolute CDN url
 *     detail      {
 *       overview    string[]                    ordered paragraphs
 *       milestones  [{ id, label, value }]      quantified, not narrative
 *       partners    string[]
 *     }
 *   }
 *
 * `detail` is nested rather than flattened because it is the half the grid
 * never needs. The list endpoint should return every field except `detail`
 * (`GET /api/ventures`), with the dialog hydrating from
 * `GET /api/ventures/:slug`. InnovationPage resolves the open venture from an
 * id, so that split is a fetch change and not a component change.
 *
 * NOTE: all copy below is placeholder. Cover photography reuses frames already
 * in the repo so nothing 404s during build-out — swap for the licensed
 * library, which will remove the duplication with the newsroom covers.
 */

import { unsplash } from "../lib/images";

/* Cards top out around 460px and the dialog plate around 1100px, so one
   1600px source covers both. */
const COVER_WIDTH = 1600;

export const innovationHero = {
    eyebrow: "Forward",
    title: "Engineering Judged on the Road",
    lead: "The group funds research the operating companies could not carry alone, on the condition that it eventually has to work somewhere real. Nothing on this page is a concept study.",
};

/* --------------------------------------------------------------------------
   Research and development mandate.
   -------------------------------------------------------------------------- */
export const focusSection = {
    eyebrow: "Where We Spend",
    title: "Four mandates. Each with a company that has to live with the result.",
    intro: "Central research sits with the parent, but every programme is sponsored by an operating company that will run whatever comes out of it. A programme with no sponsor is not funded, regardless of how interesting it is.",
};

export const focusAreas = [
    {
        id: "grid",
        index: "01",
        title: "Grid and Storage",
        statement: "Making intermittent generation dispatchable at site scale.",
        detail: "Balancing work across the group's own generation base, where a poor result costs us availability rather than a customer. Long-duration storage is the constraint, and it is where most of the budget sits.",
        disciplines: ["Power systems", "Electrochemistry", "Control software"],
        leadEntity: "Warrick Corporation",
    },
    {
        id: "powertrain",
        index: "02",
        title: "Commercial Powertrain",
        statement: "Duty cycles first, specification second.",
        detail: "Regional logistics rather than long-haul, a scope held since the programme was approved despite repeated commercial pressure to widen it. Durability testing runs to failure by design.",
        disciplines: ["Thermal management", "Drivetrain", "Vehicle testing"],
        leadEntity: "Warrick Motors",
    },
    {
        id: "platform",
        index: "03",
        title: "Commerce Infrastructure",
        statement: "The parts of a platform customers never see.",
        detail: "Fulfilment routing, returns triage and the grading logic that decides whether a returned unit is refurbished or parted out. Unglamorous, and the largest single margin lever Clara has.",
        disciplines: ["Distributed systems", "Operations research", "Robotics"],
        leadEntity: "Clara",
    },
    {
        id: "materials",
        index: "04",
        title: "Materials and Recovery",
        statement: "Designing for the second life before the first one ships.",
        detail: "Recovery routes for cells, motors and enclosures across both the vehicle and hardware programmes. Shared deliberately, because neither company has the volume to justify a recovery line alone.",
        disciplines: ["Materials science", "Process engineering", "Circularity"],
        leadEntity: "Group Shared",
    },
];

/* --------------------------------------------------------------------------
   Ventures. Ordered by stage maturity, most advanced first.
   -------------------------------------------------------------------------- */
export const stages = [
    { id: "research", label: "Research" },
    { id: "pilot", label: "Pilot" },
    { id: "scaling", label: "Scaling" },
];

export const stageLabel = (id) => stages.find((stage) => stage.id === id)?.label ?? id;

export const venturesSection = {
    eyebrow: "Active Programmes",
    title: "Six programmes currently funded.",
};

export const ventures = [
    {
        id: "vt-powertrain",
        name: "Second-Generation Powertrain",
        slug: "second-generation-powertrain",
        stage: "scaling",
        sector: "Commercial Mobility",
        established: "2021",
        location: "Coventry, United Kingdom",
        leadEntity: "Warrick Motors",
        summary:
            "A commercial drive unit built for regional logistics duty cycles, through durability testing and into production intent for 2027.",
        coverImage: unsplash("1503376780353-7e6692767b70", COVER_WIDTH),
        detail: {
            overview: [
                "The programme replaces a first-generation unit whose testing ended early in 2021 on cold-start and sustained-gradient cases. Both failure modes were published at the time, and both were treated as scope conditions for the successor rather than as edge cases to be designed around later.",
                "Scope has stayed on regional logistics throughout. Long-haul was considered twice and declined twice: the duty cycle is different enough that serving both would have compromised the thermal design for the segment the group actually operates in.",
                "Durability testing completed in April 2026 and surfaced one thermal management issue at sustained load, addressed in the current build. The engineering summary carries the failure case, on the view that a durability programme reporting no failures was not testing hard enough.",
                "Production intent is unchanged for 2027. The unit will be offered to third-party fleet operators through the electrification programme rather than sold as a standalone component.",
            ],
            milestones: [
                { id: "cycles", label: "Duty Cycles Completed", value: "2,400" },
                { id: "conversions", label: "Units in Field Trial", value: "38" },
                { id: "intent", label: "Production Intent", value: "2027" },
            ],
            partners: [
                "Coventry engineering campus",
                "Two regional logistics operators under NDA",
                "An independent vehicle testing authority",
            ],
        },
    },
    {
        id: "vt-returns",
        name: "Returns Triage and Grading",
        slug: "returns-triage-grading",
        stage: "scaling",
        sector: "Commerce Infrastructure",
        established: "2019",
        location: "Rotterdam, Netherlands",
        leadEntity: "Clara",
        summary:
            "Automated grading that decides whether a returned unit is refurbished, parted out or written off, now being extended to third-party hardware.",
        coverImage: unsplash("1441986300917-64674bd600d8", COVER_WIDTH),
        detail: {
            overview: [
                "Returns handling was built for Clara's own hardware, where a returned unit is triaged, graded and routed rather than written off on arrival. The grading step is the part that carries the value, and it is almost entirely a software problem sitting on top of a fairly ordinary conveyor.",
                "The programme is now being extended to third-party hardware as part of the platform cohort. Very little of the process changes: the grading model is trained per product family, and a new family reaches useful accuracy inside about six weeks of returns volume.",
                "Write-off rate is the metric the programme is judged on. It has fallen by roughly two-thirds since 2019 and is now flat, which the team reads as the process having reached the limit of what triage alone can recover.",
            ],
            milestones: [
                { id: "writeoff", label: "Write-Off Rate vs 2019", value: "-64%" },
                { id: "throughput", label: "Units Graded Daily", value: "11,000" },
                { id: "families", label: "Product Families Live", value: "27" },
            ],
            partners: ["Clara fulfilment network", "Two cohort hardware brands"],
        },
    },
    {
        id: "vt-depot",
        name: "Depot Charging Assessment",
        slug: "depot-charging-assessment",
        stage: "pilot",
        sector: "Mobility Infrastructure",
        established: "2023",
        location: "Coventry, United Kingdom",
        leadEntity: "Warrick Motors",
        summary:
            "A survey method that sizes depot charging from observed duty cycles rather than from stated range requirements, which operators consistently overestimate.",
        coverImage: unsplash("1492144534655-ae79c964c9d7", COVER_WIDTH),
        detail: {
            overview: [
                "Every conversion engagement begins with a duty cycle survey rather than a vehicle order. The programme exists because operators overestimate their range requirement by a wide margin, and the resulting oversizing is the single largest avoidable cost in a fleet conversion.",
                "The survey runs telematics against depot dwell time for a full operating month. In roughly four cases out of five it returns a smaller charging installation than the operator had budgeted for, and in the fifth it finds a depot that cannot support the fleet at all, which is worth knowing before the vehicles arrive.",
                "The methodology will be published alongside the commercial launch of the third-party programme. A conversion built on an unpublished method is difficult for an operator to audit, and an operator who cannot audit the assumptions cannot defend the capital request internally.",
            ],
            milestones: [
                { id: "surveys", label: "Depots Surveyed", value: "62" },
                { id: "oversizing", label: "Median Oversizing Found", value: "41%" },
                { id: "publication", label: "Methodology Published", value: "Q4 2026" },
            ],
            partners: ["Regional logistics operators in the UK and Ireland"],
        },
    },
    {
        id: "vt-recovery",
        name: "Materials Recovery Line",
        slug: "materials-recovery-line",
        stage: "pilot",
        sector: "Circularity",
        established: "2024",
        location: "Halden, Norway",
        leadEntity: "Group Shared",
        summary:
            "A shared recovery route for cells, motors and enclosures across the vehicle and hardware programmes, which neither company could justify alone.",
        coverImage: unsplash("1473341304170-971dccb5ac1e", COVER_WIDTH),
        detail: {
            overview: [
                "Recovery is shared between Warrick Motors and Clara because neither has the volume to justify a line on its own. That is the whole argument for running it at group level, and it is the clearest example of what the parent balance sheet is actually for.",
                "The line currently handles cells and motors. Enclosures were deferred: the mixed-polymer housings on the older hardware generations recover poorly enough that the energy cost outweighs the material recovered, and the design change that fixes it only reaches the field in 2027.",
                "Output feeds back into both programmes as qualified secondary material rather than being sold on. Qualification is the slow part and is handled by the materials team rather than by the line operator.",
            ],
            milestones: [
                { id: "recovery", label: "Cell Material Recovered", value: "78%" },
                { id: "throughput", label: "Annual Line Capacity", value: "2,600 t" },
                { id: "feedback", label: "Requalified Into Production", value: "31%" },
            ],
            partners: ["Halden site operations", "An external materials qualification lab"],
        },
    },
    {
        id: "vt-storage",
        name: "Long-Duration Storage Trial",
        slug: "long-duration-storage-trial",
        stage: "research",
        sector: "Energy Systems",
        established: "2025",
        location: "Halden, Norway",
        leadEntity: "Warrick Corporation",
        summary:
            "Multi-day storage tested against the group's own generation base, where a poor result costs availability rather than a customer.",
        coverImage: unsplash("1509391366360-2e959784a276", COVER_WIDTH),
        detail: {
            overview: [
                "Long-duration storage is the constraint on the group's 2029 generation commitment, and it is the one part of the roadmap with no proven route. The trial exists to find out how far the available chemistries actually get, not to validate a decision already taken.",
                "It runs against the group's own generation, deliberately. A failed cycle costs the group availability on its own asset rather than costing a customer their supply, which is the only setting where testing this honestly is possible.",
                "No procurement decision follows automatically from the trial. The investment committee has said in advance that a negative result is a usable result, and that the fallback is a longer thermal tail rather than an unproven installation.",
            ],
            milestones: [
                { id: "duration", label: "Discharge Duration Achieved", value: "62 h" },
                { id: "roundtrip", label: "Round-Trip Efficiency", value: "71%" },
                { id: "decision", label: "Committee Review", value: "2027" },
            ],
            partners: ["Halden generation site", "A European grid research institute"],
        },
    },
    {
        id: "vt-balancing",
        name: "Site Balancing Control",
        slug: "site-balancing-control",
        stage: "research",
        sector: "Energy Systems",
        established: "2025",
        location: "London, United Kingdom",
        leadEntity: "Warrick Corporation",
        summary:
            "Control software that dispatches generation, storage and site load as one system instead of three independently optimised ones.",
        coverImage: unsplash("1466611653911-95081537e5b7", COVER_WIDTH),
        detail: {
            overview: [
                "Generation, storage and site load are currently optimised separately at every site in the group. Each does its own job well and the combination leaves a measurable amount of availability on the floor, which is the gap this programme is aimed at.",
                "The work is software rather than hardware, which makes it unusually cheap to trial and unusually easy to oversell. The team reports against measured site availability only, and explicitly not against modelled savings.",
                "Two sites are instrumented. A third will be added once the control layer has run a full winter without human intervention, which it has not yet done.",
            ],
            milestones: [
                { id: "availability", label: "Availability Gain, Site One", value: "+2.4%" },
                { id: "sites", label: "Sites Instrumented", value: "02" },
                { id: "autonomy", label: "Longest Unattended Run", value: "94 d" },
            ],
            partners: ["Halden Energy", "An academic control systems group"],
        },
    },
];

/* --------------------------------------------------------------------------
   Closing statement.
   -------------------------------------------------------------------------- */
export const capitalNote = {
    eyebrow: "Funding",
    title: "Research is funded centrally and killed centrally.",
    body: "Programmes are reviewed twice a year against the sponsor company's willingness to adopt the result. A programme the sponsor will not deploy is closed rather than moved to another budget line, and closing one is not treated as a failure of the team that ran it.",
    ctaLabel: "Discuss a Research Partnership",
    ctaPath: "/contact",
};
