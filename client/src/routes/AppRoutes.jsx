import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import AppList from "../pages/AppList";
import CreateApp from "../pages/CreateApp";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<AdminLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/apps"
            element={<AppList />}
          />

          <Route
            path="/apps/create"
            element={<CreateApp />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}