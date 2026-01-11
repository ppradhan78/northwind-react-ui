import { Routes, Route } from "react-router-dom";
import Home from "../../app/pages/Home";
import Reports from "../../app/pages/Reports";
import Settings from "../../app/pages/Settings";
import Profile from "../../app/pages/Profile";
import RegionListPage from "../../app/pages/Region/RegionListPage";
import RegionFormPage from "../../app/pages/Region/RegionFormPage";
import RegionDetailsPage from "../../app/pages/Region/RegionDetailsPage";
import CategoryListPage from "../pages/Category/CategoryListPage";
import CategoryFormPage from "../pages/Category/CategoryFormPage";
import CategoryDetailsPage from "../pages/Category/CategoryDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/categories" element={<CategoryListPage />} />
      <Route path="/categories/new" element={<CategoryFormPage />} />
      <Route path="/categories/:id" element={<CategoryDetailsPage />} />
      <Route path="/categories/edit/:id" element={<CategoryFormPage />} />

      <Route path="/regions" element={<RegionListPage />} />
      <Route path="/regions/new" element={<RegionFormPage />} />
      <Route path="/regions/edit/:id" element={<RegionFormPage />} />
      <Route path="/regions/:id" element={<RegionDetailsPage />} />

      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
