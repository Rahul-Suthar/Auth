import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [apiResponse, setApiResponse] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please Log in.");
          setTimeout(() => navigate("/"), 1000);
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);

        setApiResponse({
          type: "success",
          message: res.data.message,
        });
        console.log("User data fetched successfully.");
        console.log(res.data);
      } catch (err) {
        setApiResponse({
          type: "error",
          message: err.response?.data?.error || "Error fetching data",
        });
      }
    };

    fetchData();

    const tokenRemoved = () => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      }
    };

    window.addEventListener("storage", tokenRemoved);
    return () => window.removeEventListener("storage", tokenRemoved);
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 px-10 py-4 bg-[#f8f6f3]">
        <Outlet context={{ user, apiResponse }} />
      </div>
    </div>
  );
};

export default Layout;
