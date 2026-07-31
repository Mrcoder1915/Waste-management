import { ReactNode } from "react";
import { Container } from "../catalyst/container";
import { Heading, Subheading } from "../catalyst/heading";
import { Recycle } from "lucide-react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen py-10">
      <Container className="absolute">
        <img
          src="auth-bg.png"
          alt="Authentication Background"
          className="fixed top-0 left-0 w-screen h-screen object-cover object-bottom -z-10"
        />
      </Container>

      <div className="z-0 flex flex-col p-10 mx-auto">
        <Heading color="success" className="flex items-center gap-3">
          <Recycle size={90} />
          WASTE SEGREGATON
        </Heading>
        <Subheading>Management System</Subheading>
        <span className="mt-5 max-w-4/5 mb-2 px-3 py-1 text-xs font-bold tracking-widest text-gray-800 uppercase bg-emerald-500/50 rounded-full border ">
          Smart waste management and robotics-powered segregation for a cleaner
          and greener future
        </span>
      </div>
      <Container>{children}</Container>
    </div>
  );
};

export default AuthLayout;
