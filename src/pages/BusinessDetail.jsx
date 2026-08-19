import { useParams } from "react-router-dom";
import PlaceholderPage from "./PlaceholderPage";
import { businessDivisions } from "../data/navigationData";

/**
 * BusinessDetail
 * ---------------------------------------------------------------------------
 * Resolves /businesses/:slug against the navigation data. An unrecognised
 * slug falls through to a not-found state rather than throwing, so a stale
 * link from a press release never breaks the page.
 */
export default function BusinessDetail() {
  const { slug } = useParams();
  const division = businessDivisions.find((item) => item.id === slug);

  if (!division) {
    return (
      <PlaceholderPage
        eyebrow="Our Businesses"
        title="Division Not Found"
        description="We could not match that address to a company in the group. Check the link, or browse the full portfolio from the Our Businesses menu."
      />
    );
  }

  return (
    <PlaceholderPage
      eyebrow={division.descriptor}
      title={division.name}
      description={`Established ${division.established}. The full company profile is in production and will replace this page.`}
    />
  );
}
