import { ReactNode } from "react";
import { Container } from "../catalyst/container";
import Sidebar from "../Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-row lg:overflow-hidden lg:pl-64">
      <Container className="flex h-screen! lg:w-64  justify-center fixed left-0">
        <Sidebar />
      </Container>
      <Container className="flex-1">{children}</Container>
    </div>
  );
};

export default DashboardLayout;
