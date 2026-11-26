import { Route, Routes } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import HealthcarePage from "@/pages/HealthcarePage";
import SwarnaPrashanaPage from "@/pages/SwarnaPrashanaPage";
import ApproachPage from "@/pages/ApproachPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { legalPage } from "@/pages/LegalPages";
import { legalDocs } from "@/content/legal";

const legalRoutes = legalDocs.map((d) => ({ path: d.path.slice(1), Page: legalPage(d.path) }));

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="healthcare" element={<HealthcarePage />} />
        <Route path="swarna-prashana" element={<SwarnaPrashanaPage />} />
        <Route path="our-approach" element={<ApproachPage />} />
        <Route path="contact" element={<ContactPage />} />
        {legalRoutes.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
