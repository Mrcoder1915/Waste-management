import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../../components/super-admin/SuperAdminSidebar";

export default function SuperAdminLayout() {
  return (
    <div
      className="flex min-h-screen bg-slate-50 text-[15px]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <SuperAdminSidebar />
      <main className="flex-1 p-7 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
