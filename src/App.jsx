import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import SiteLayout from "./components/layout/SiteLayout";
import AppRoutes from "./routes/AppRoutes";

/**
 * App
 * ---------------------------------------------------------------------------
 * Root composition: router, persistent chrome, route table. Everything else
 * lives in src/pages, src/routes and src/components.
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteLayout>
        <AppRoutes />
      </SiteLayout>
    </BrowserRouter>
  );
}
