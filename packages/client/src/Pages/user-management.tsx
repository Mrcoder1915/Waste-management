import DashboardLayout from "../components/layouts/dashbord";
import UserManagement from "../components/user-management";

const UserManagementPage = () => {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-10 bg-gray-100 min-h-screen">
        <UserManagement />
      </div>
    </DashboardLayout>
  );
};

export default UserManagementPage;
