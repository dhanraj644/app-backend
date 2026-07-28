import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import AppList from "../pages/AppList";
import CreateApp from "../pages/CreateApp";
import EditApp from "../pages/EditApp";
import AppDetails from "../pages/AppDetails";
import CheckIns from "../pages/CheckIns";

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
          <Route
            path="/apps/edit/:id"
            element={<EditApp />}
          />
          <Route
            path="/apps/:id"
            element={<AppDetails />}
          />
          <Route
            path="/check-ins"
            element={<CheckIns />}
          />
        </Route>
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
      />
    </BrowserRouter>
  );
}