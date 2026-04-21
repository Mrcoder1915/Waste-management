import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import Chart from "../components/Chart";
import Table from "../components/Table";
import DashboardLayout from "../components/layouts/dashbord";

const Dashboard = () => {
  return (
    <DashboardLayout>
    <div className="flex w-full bg-gray-100 min-h-screen">

      <div className="flex-1 p-8">
        <Topbar />
        <Cards />
        <Chart />
        <Table />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Dashboard;
