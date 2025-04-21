import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHouse,
  FaUser,
  FaArrowRightFromBracket,
  FaBars,
  FaXing,
  FaInfinity,
  FaGear,
} from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [])

  return (
    <aside
      className={`bg-gray-900 text-white p-1 transition-all duration-300 
        ${isOpen ? "w-50" : "w-15"} h-full`}
    >
      <button
        className="text-white text-2xl p-3 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaXing /> : <FaBars />}
      </button>

      <nav className="flex flex-col items-center justify-between mt-5 h-11/12">
        <div>
          <Link
            to="/dashboard"
            className="flex items-center p-3 mb-3 hover:bg-gray-700 rounded"
          >
            <FaHouse className="text-2xl transition-all hover:scale-120" />
            <span className={`${isOpen ? "ml-3" : "hidden"} transition-all`}>
              Home
            </span>
          </Link>

          <Link
            to="/dashboard/user"
            className="flex items-center p-3 mb-3 hover:bg-gray-700 rounded"
          >
            <FaUser className="text-2xl transition-all hover:scale-120" />
            <span className={`${isOpen ? "ml-3" : "hidden"} transition-all`}>
              Profile
            </span>
          </Link>

          <Link
            to="/dashboard/about"
            className="flex items-center p-3 mb-3 hover:bg-gray-700 rounded"
          >
            <FaInfinity className="text-2xl translate-all hover:scale-120" />
            <span className={`${isOpen ? "ml-3" : "hidden"} transition-all`}>
              About
            </span>
          </Link>
        </div>

        <div>
          <button
            className="flex items-center mb-3 cursor-pointer p-3 hover:bg-red-600 rounded"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <FaArrowRightFromBracket className="text-2xl transition-all hover:scale-120" />
            <span className={`${isOpen ? "ml-3" : "hidden"} transition-all`}>
              Logout
            </span>
          </button>

          <Link
            to="/dashboard/settings"
            className="flex items-center p-3 mb-3 hover:bg-gray-700 rounded"
          >
            <FaGear className="text-2xl active:rotate-18 transition-all hover:scale-120" />
            <span className={`${isOpen ? "ml-3" : "hidden"} transition-all`}>
              Settings
            </span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
