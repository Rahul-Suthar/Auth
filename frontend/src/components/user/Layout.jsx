import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [apiResponse, setApiResponse] = useState({ type: "", message: "" });
  const [tasks, setTasks] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setApiResponse({ type: "error", message: "Unauthorized. Please Log in."});
          setTimeout(() => navigate("/"), 1000);
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;

        const userRes = await axios.get(`${apiUrl}/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data.user);

        const taskRes = await axios.get(`${apiUrl}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(taskRes.data);

        setApiResponse({
          type: "success",
          message: "Welcome back!",
        });
 
      } catch (err) {
        setApiResponse({
          type: "error",
          message: err.response?.data?.error || "Failed to load dashboard",
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
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className="bg-[#FDF2F2F2] h-full md:flex items-center justify-center p-8">
        <Outlet context={{ user, tasks, setTasks, apiResponse }} />
      </div>
    </div>
  );
};

export default Layout;
