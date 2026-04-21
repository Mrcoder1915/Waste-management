import React, { ReactNode } from "react";
import { Container } from "../catalyst/container";

const Dashboardlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full grid grid-cols-2">
      <Container>{children}</Container>
    </div>
  );
};

export default Dashboardlayout;
