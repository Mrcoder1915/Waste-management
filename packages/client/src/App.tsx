import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SignInPage from "./Pages/SignIn";
import Protected from "./ProtectedRoute/Protected";
import Segregation from "./Pages/Segregation";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import SuperAdminLayout from "./Pages/super-admin/SuperAdminLayout";
import SuperAdminOverview from "./Pages/super-admin/Overview";
import SuperAdminUsers from "./Pages/super-admin/Users";
import SuperAdminLogs from "./Pages/super-admin/Logs";
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
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<SuperAdminOverview />} />
              <Route path="users" element={<SuperAdminUsers />} />
              <Route path="logs" element={<SuperAdminLogs />} />
            </Route>
          </Route>
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
