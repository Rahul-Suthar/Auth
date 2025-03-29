import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 px-10 py-4 bg-[#f8f6f3]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
