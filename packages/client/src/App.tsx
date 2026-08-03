import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SignInPage from "./Pages/SignIn";
import Protected from "./ProtectedRoute/Protected";
import Segregation from "./Pages/Segregation";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import SuperAdmin from "./Pages/super-admin/Dashboard";
import SuperAdminProtection from "./ProtectedRoute/super-admin";
import UserManagementPage from "./Pages/user-management";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/segregation" element={<Segregation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route element={<SuperAdminProtection />}>
            <Route path="/super-admin" element={<SuperAdmin />} />
          </Route>
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
