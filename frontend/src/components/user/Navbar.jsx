import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHouse,
  FaUser,
  FaGear,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="bg-[##FDF2F2] p-2 transition-all duration-300 h-13 w-full"
    >
      <nav className="flex items-center justify-between relative h-full">
        <img className="w-18" src={logo} alt="Logo" />
        <div className="flex items-center justify-center h-full gap-10">
          <Link
            to="/dashboard"
          >
            <FaHouse className="text-2xl transition-all" />
          </Link>

          <Link
            to="/dashboard/user"
          >
            <FaUser className="text-2xl transition-all" />
          </Link>

          <Link
            to="/dashboard/settings"
          >
            <FaGear className="text-2xl active:rotate-18 transition-all" />
          </Link>

        </div>

        <div>
          <button
            className="cursor-pointer p-4"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <FaArrowRightFromBracket className="text-2xl text-[#FF4F4F] transition-all" />
          </button>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
