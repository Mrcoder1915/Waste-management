import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-4xl">404 NOT FOUND</h1>
        <span className="opacity-50">
          {" "}
          please go back to home
          <Link to="/" className="underline text-blue-300 ml-2 font-bold">
            Home
          </Link>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
