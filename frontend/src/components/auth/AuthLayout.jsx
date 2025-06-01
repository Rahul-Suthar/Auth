import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";

const AuthLayout = () => {
  return (
      <div className="bg-[#fcf1f1f2] flex flex-row justify-center w-full h-screen relative">
        <img className="absolute w-20 top-4 left-5" src={logo} alt="Logo" />
        <Outlet />
      </div>
  );
};

export default AuthLayout;
