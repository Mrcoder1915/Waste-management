import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import Chart from "../components/Chart";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar />
        <Cards />
        <Chart />
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;