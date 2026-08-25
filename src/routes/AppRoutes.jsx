import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import NewsPage from "../pages/NewsPage";
import ContactPage from "../pages/ContactPage";
import SustainabilityPage from "../pages/SustainabilityPage";
import InnovationPage from "../pages/InnovationPage";
import BusinessDetail from "../pages/BusinessDetail";
import PlaceholderPage from "../pages/PlaceholderPage";

/**
 * Routes still waiting on their production page. Listing them as data keeps
 * the JSX below down to the routes that actually differ from one another;
 * when a page is built, lift its entry out of this table and give it an
 * explicit <Route> with its own element.
 */
const PLACEHOLDER_ROUTES = [
    { path: "/leadership", eyebrow: "The Group", title: "Leadership & Heritage" },
    { path: "/board", eyebrow: "The Group", title: "Board of Directors" },
    { path: "/businesses", eyebrow: "The Group", title: "Our Businesses" },
    {
        path: "/ethics-governance",
        eyebrow: "Responsibility",
        title: "Ethics and Governance",
    },

    /* Utility strip destinations */
    { path: "/careers", eyebrow: "People", title: "Careers" },
    { path: "/investor-relations", eyebrow: "Shareholders", title: "Investor Relations" },
    { path: "/global-presence", eyebrow: "Worldwide", title: "Global Presence" },
    { path: "/media-center", eyebrow: "Press", title: "Media Center" },
    { path: "/annual-reports", eyebrow: "Insights", title: "Annual Reports" },
    { path: "/brand-assets", eyebrow: "Insights", title: "Brand Assets" },

    /* Footer legal strip */
    { path: "/privacy", eyebrow: "Legal", title: "Privacy Policy" },
    { path: "/terms", eyebrow: "Legal", title: "Terms of Service" },
    { path: "/sitemap", eyebrow: "Legal", title: "Sitemap" },
];

/**
 * AppRoutes
 * ---------------------------------------------------------------------------
 * The application's route table. React Router ranks routes by specificity, so
 * the order here is for readability rather than matching.
 *
 * NOTE for /news: articles open in a modal on the index rather than at their
 * own URL. When deep links are needed, add `/news/:slug` alongside the index
 * route — NewsPage already resolves the open article from an id, so the modal
 * can be driven by a route param without restructuring the page.
 */
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/innovation" element={<InnovationPage />} />

            <Route path="/businesses/:slug" element={<BusinessDetail />} />

            {PLACEHOLDER_ROUTES.map(({ path, eyebrow, title }) => (
                <Route
                    key={path}
                    path={path}
                    element={<PlaceholderPage eyebrow={eyebrow} title={title} />}
                />
            ))}

            <Route
                path="*"
                element={
                    <PlaceholderPage
                        eyebrow="Error 404"
                        title="Page Not Found"
                        description="The address you followed does not match anything on this site. It may have moved, or the link may be out of date."
                    />
                }
            />
        </Routes>
    );
}
