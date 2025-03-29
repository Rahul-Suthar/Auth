import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

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

        setData(res.data);
      } catch (err) {
        setError("Error fetching data.");
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
    <main>
    <h1 className="text-2xl font-bold">Dashboard</h1>
    {error && <p className="text-red-500">{error}</p>}
    {data && <p className="text-green-500">{data.message}</p>}
    </main>
  );
};

export default Home;
