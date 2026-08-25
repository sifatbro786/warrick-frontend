/**
 * WARRICK CORPORATION — Newsroom Content
 * ---------------------------------------------------------------------------
 * BACKEND CONTRACT
 *
 *   Article {
 *     id          string      stable primary key
 *     title       string
 *     slug        string      unique, url-safe, drives /news/:slug later
 *     category    string      must match a `categories` id below
 *     date        string      ISO 8601 date. Formatted at render time, never
 *                             stored pre-formatted — the display format is a
 *                             view concern and changes with locale.
 *     readTime    number      minutes, integer. Suffixed in the view.
 *     summary     string      one or two sentences for the grid card
 *     content     string[]    ordered paragraphs. Swap for a markdown string
 *                             or sanitised HTML when the CMS lands; the modal
 *                             maps over this array and nothing else.
 *     coverImage  string      absolute CDN url
 *   }
 *
 * The list endpoint should omit `content` and return the rest
 * (`GET /api/news?category=corporate`), with the modal hydrating the body from
 * `GET /api/news/:slug`. NewsPage already reads the two separately, so that
 * split is a fetch change and not a component change.
 *
 * NOTE: all copy and photography below are placeholders.
 */

import { unsplash } from "../lib/images";

/* Editorial plates run full width inside the modal (max ~1100px) and at card
   width in the grid, so one 1600px source covers both. */
const COVER_WIDTH = 1600;

/* --------------------------------------------------------------------------
   Filter strip.

   `id` doubles as the query parameter value. "all" is a view-level sentinel
   and is never sent to the API.
   -------------------------------------------------------------------------- */
export const categories = [
  { id: "all", label: "All" },
  { id: "corporate", label: "Corporate" },
  { id: "automotive", label: "Automotive" },
  { id: "technology", label: "Technology" },
  { id: "sustainability", label: "Sustainability" },
];

export const newsHeader = {
  eyebrow: "Media and Insights",
  title: "Newsroom & Group Insights",
  lead: "Official announcements, results and commentary from Warrick Corporation and its operating companies. Press enquiries are handled by the corporate media desk.",
};

/* --------------------------------------------------------------------------
   Articles. Ordered newest first — the API should apply the same sort so the
   grid never has to.
   -------------------------------------------------------------------------- */
export const articles = [
  {
    id: "art-2026-08-12",
    title:
      "Warrick Motors opens its fleet electrification programme to third-party operators",
    slug: "motors-fleet-electrification-third-party",
    category: "automotive",
    date: "2026-08-12",
    readTime: 4,
    summary:
      "The Coventry engineering campus will take on external commercial fleets from the fourth quarter, starting with regional logistics operators in the United Kingdom and Ireland.",
    content: [
      "Warrick Motors will open its fleet electrification programme to operators outside the group from the fourth quarter of 2026. The programme has run internally since 2022, converting the group's own logistics and site vehicles, and has completed just over eleven hundred conversions to date.",
      "The first external cohort is limited to regional logistics operators in the United Kingdom and Ireland with fleets between forty and four hundred vehicles. That band was chosen deliberately. It is large enough to justify a depot charging assessment and small enough that the operator is not already running an in-house electrification team.",
      "Each engagement begins with a duty cycle survey rather than a vehicle order. Warrick Motors has consistently found that operators overestimate their range requirement by a wide margin, and that the resulting oversizing is the single largest avoidable cost in a conversion programme.",
      "The engineering team will publish its depot assessment methodology alongside the commercial launch. The group's position is that a conversion programme built on an unpublished methodology is difficult for an operator to audit, and an operator who cannot audit the assumptions cannot defend the capital request internally.",
      "Pricing and capacity for the first cohort will be confirmed in September. The programme remains capacity-constrained by charging infrastructure survey work rather than by vehicle supply.",
    ],
    coverImage: unsplash("1492144534655-ae79c964c9d7", COVER_WIDTH),
  },
  {
    id: "art-2026-07-29",
    title: "Clara brings a third regional fulfilment centre online ahead of schedule",
    slug: "clara-third-fulfilment-centre",
    category: "technology",
    date: "2026-07-29",
    readTime: 3,
    summary:
      "The new site adds capacity across six markets and shortens the median delivery window in continental Europe by a little under a day.",
    content: [
      "Clara's third regional fulfilment centre began processing orders this month, seven weeks ahead of the schedule set at approval. The site serves six markets in continental Europe and takes the platform's total covered footprint to fourteen.",
      "The median delivery window across those six markets has fallen by just under a day since the site opened. Clara expects that figure to settle rather than improve further once seasonal volume returns in the autumn.",
      "The early completion is largely a sequencing outcome. Racking and the conveyor fit-out were run in parallel with the final building works rather than after them, which is only possible when the shell is handed over on a fixed date and the operator is willing to accept the risk of working around it.",
      "Clara will not open a fourth site this financial year. The platform's constraint has moved from storage capacity to last-mile carrier availability in two of its newer markets, and the group's position is that adding warehouse space against a carrier constraint is capital spent on the wrong problem.",
    ],
    coverImage: unsplash("1498049794561-7780e7231661", COVER_WIDTH),
  },
  {
    id: "art-2026-07-15",
    title: "Group reports half-year results and confirms its capital plan through 2028",
    slug: "half-year-results-capital-plan-2028",
    category: "corporate",
    date: "2026-07-15",
    readTime: 6,
    summary:
      "Revenue across the three operating companies rose against a flat market. The board reaffirmed the infrastructure commitment set out at the start of the cycle.",
    content: [
      "Warrick Corporation has reported half-year results for the period ending 30 June 2026. Group revenue rose against a broadly flat market, with the increase carried by infrastructure availability payments and by Clara's continued expansion in continental Europe.",
      "The board has reaffirmed the capital plan through 2028 without amendment. Roughly two-thirds of committed capital remains directed at generation and grid assets, with the balance split between mobility engineering and platform infrastructure.",
      "No change was made to the group's concentration limits. The investment committee reviewed two acquisition opportunities during the period and declined both on the ten year downside case rather than on price, which the chairman noted is the outcome the model is designed to produce more often than not.",
      "Operating costs rose in line with expectation. The largest single increase was in independent verification of scope three emissions reporting, a cost the group has chosen to carry centrally rather than push into the operating companies where it would compete with production budgets.",
      "The group remains privately held and has no plans to seek a listing. Shareholder briefings for the period will be held in September, and the full interim statement is available to shareholders through investor relations.",
    ],
    coverImage: unsplash("1486406146926-c627a92ad1ab", COVER_WIDTH),
  },
  {
    id: "art-2026-06-24",
    title: "Group emissions reporting moves to independent verification across all sites",
    slug: "independent-emissions-verification",
    category: "sustainability",
    date: "2026-06-24",
    readTime: 5,
    summary:
      "Scope one, two and three figures will be verified by a party with no reporting line into the site under review, a change the board describes as overdue.",
    content: [
      "From this reporting year, emissions figures from every site in the group will be verified by a party with no reporting line into the business that produced them. The change covers scope one, two and three, and applies to the operating companies on the same terms as the parent.",
      "The previous arrangement had verification commissioned by the operating company. The board's view is that this was defensible in isolation and indefensible as a group standard, because the reviewer's continued engagement depended on the business being reviewed.",
      "Verification is now commissioned centrally and reported to the environmental review committee. The committee is chaired by a non-executive director, and its findings reach the board whether or not management accepts them.",
      "The group expects reported figures to move in the first year under the new regime, in both directions and at several sites. It has said in advance that it will publish those movements rather than restate prior years quietly, on the basis that a reporting change which only ever improves the numbers is not a reporting change worth making.",
      "The full methodology will be published alongside the annual report.",
    ],
    coverImage: unsplash("1509391366360-2e959784a276", COVER_WIDTH),
  },
  {
    id: "art-2026-05-30",
    title: "Warrick Corporation appoints Priya Raman to lead global infrastructure",
    slug: "priya-raman-global-infrastructure",
    category: "corporate",
    date: "2026-05-30",
    readTime: 2,
    summary:
      "Raman takes responsibility for the group's generation, grid and logistics assets across London and Singapore.",
    content: [
      "Priya Raman has been appointed Head of Global Infrastructure with immediate effect. She takes responsibility for the group's generation, grid and logistics assets, working from London and Singapore.",
      "Raman joined the group in 2017 and built the operational reporting standard now used across all three operating companies. That standard is the reason site performance can be compared across entities at all, and it was adopted group-wide two years after she proposed it.",
      "She succeeds a role that had been split across two functions since 2023. The board's view was that a split mandate over a single asset base produces slower decisions and no additional oversight.",
    ],
    coverImage: unsplash("1497366216548-37526070297c", COVER_WIDTH),
  },
  {
    id: "art-2026-05-08",
    title: "Clara opens its commerce platform to selected external brands",
    slug: "clara-platform-external-brands",
    category: "technology",
    date: "2026-05-08",
    readTime: 4,
    summary:
      "A small cohort of hardware brands will sell through Clara's fulfilment and returns infrastructure without white-labelling their products.",
    content: [
      "Clara will allow a small cohort of external hardware brands onto its commerce platform this year. Participating brands keep their own identity, their own pricing and their own customer relationship, and use Clara's fulfilment, payments and returns infrastructure underneath.",
      "The cohort is capped at twelve brands for the first year. Clara has been explicit that the cap exists to protect delivery performance rather than to create scarcity, and that it will not be raised while any market is running above its carrier headroom.",
      "Returns are the part of the offer Clara considers most valuable and most often underestimated. The platform's returns handling was built for its own hardware, where a returned unit is triaged, graded and either refurbished or parted out rather than written off, and that process transfers to third-party hardware with very little change.",
      "Terms will not be published. Clara has said the arrangements are individually negotiated and that publishing a standard rate card for a twelve-brand cohort would misrepresent how the programme works.",
    ],
    coverImage: unsplash("1441986300917-64674bd600d8", COVER_WIDTH),
  },
  {
    id: "art-2026-04-17",
    title: "Warrick Motors completes durability testing on its second-generation powertrain",
    slug: "second-generation-powertrain-durability",
    category: "automotive",
    date: "2026-04-17",
    readTime: 3,
    summary:
      "The unit completed the full commercial duty cycle programme at Coventry. Production intent is unchanged for 2027.",
    content: [
      "The second-generation commercial powertrain has completed durability testing at the Coventry engineering campus. The programme ran the unit through the full commercial duty cycle, including the cold-start and sustained-gradient cases that ended the first generation's testing early in 2021.",
      "Production intent is unchanged for 2027. The unit is targeted at the regional logistics segment rather than at long-haul, a scope the engineering team has held to since the programme was approved despite repeated commercial interest in widening it.",
      "Testing surfaced one thermal management issue at sustained load, which has been addressed in the current build. Warrick Motors has published the failure case in its engineering summary on the grounds that a durability programme that reports no failures is a programme that was not testing hard enough.",
    ],
    coverImage: unsplash("1503376780353-7e6692767b70", COVER_WIDTH),
  },
  {
    id: "art-2026-03-26",
    title: "Group commits to a stated emissions path as a condition of project approval",
    slug: "emissions-path-project-approval",
    category: "sustainability",
    date: "2026-03-26",
    readTime: 4,
    summary:
      "Capital projects that cannot show a reduction trajectory will not proceed, regardless of return profile.",
    content: [
      "Capital projects across the group must now present a stated emissions reduction trajectory as a condition of approval. A project that cannot show one will not proceed, and the return profile is not a mitigating factor.",
      "The requirement applies at the approval gate rather than at commissioning. The group's experience is that a reduction path introduced after a project is underway becomes an offsetting exercise, because by then the design decisions that determine the profile have already been made.",
      "Two projects in the current pipeline have been returned to design as a result. Both are expected to come back, later and with a different specification, which the investment committee has described as the intended outcome rather than a delay.",
      "The requirement does not apply retrospectively to assets already in operation. Those remain covered by the group's existing site-level reduction commitments and by the verification regime described in the annual report.",
    ],
    coverImage: unsplash("1466611653911-95081537e5b7", COVER_WIDTH),
  },
  {
    id: "art-2026-02-11",
    title: "Warrick Corporation marks its two hundredth grid connection",
    slug: "two-hundredth-grid-connection",
    category: "corporate",
    date: "2026-02-11",
    readTime: 2,
    summary:
      "The milestone connection was energised in the north of England, twenty-eight years after the group's first industrial contract.",
    content: [
      "The group energised its two hundredth grid connection this month, at a site in the north of England roughly forty miles from the industrial contract it started with in 1998.",
      "The group has not marked the milestone publicly beyond this note. Its position is that a connection count measures duration rather than quality, and that the figure worth reporting is availability across the installed base, which is published each year in the annual report.",
    ],
    coverImage: unsplash("1473341304170-971dccb5ac1e", COVER_WIDTH),
  },
];

/* --------------------------------------------------------------------------
   Helpers. Kept here so the filtering rule lives beside the data it applies
   to and the page component stays declarative.
   -------------------------------------------------------------------------- */
export const filterByCategory = (list, categoryId) =>
  categoryId === "all" ? list : list.filter((item) => item.category === categoryId);

export const categoryLabel = (categoryId) =>
  categories.find((category) => category.id === categoryId)?.label ?? categoryId;

/* One shared formatter. Locale is pinned so the server and the client agree;
   swap to the user's locale when internationalisation lands. */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatArticleDate = (isoDate) =>
  dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
