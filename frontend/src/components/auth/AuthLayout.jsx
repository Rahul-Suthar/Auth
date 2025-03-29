import { Link, Outlet } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f8f6f3]">
      <Link
        to="/"
        className="absolute top-3 left-3 flex items-center px-2 py-1 border border-gray-400 rounded-lg shadow-md
        font-medium text-gray-500 hover:shadow-green-800 hover:text-black transition-all duration-300"
      >
        <FaAngleLeft /> Back
      </Link>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
