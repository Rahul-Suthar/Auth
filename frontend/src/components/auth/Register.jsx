import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/auth/register`, {
        username,
        email,
        password,
      });

      setSuccess(res.data.message);
      // console.log("Registration successful:", res.data);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      document.querySelectorAll("input").forEach((e) => {
        setUsername("");
        setEmail("");
        setPassword("");
      });
    }
  };

  return (
    <form
      onSubmit={Submit}
      className="flex flex-col items-center p-5 w-[350px] h-[430px] absolute top-55 bg-[#eddadae6] rounded-[50px] shadow-[8px_13px_4px_#00000040]"
    >
      <h1 className="text-black text-3xl mb-7">Register</h1>

      <input
        type="text"
        name="username"
        placeholder="username"
        required
        className="bg-[#ffffffe6] p-2 px-5 rounded-2xl mb-8 w-65 shadow-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        name="email"
        placeholder="email"
        required
        className="bg-[#ffffffe6] p-2 px-5 rounded-2xl mb-8 w-65 shadow-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        required
        className="bg-[#ffffffe6] p-2 px-5 rounded-2xl mb-8 w-65 shadow-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-50 bg-green-600 font-bold text-md text-white px-6 py-2 rounded-2xl cursor-pointer
          hover:bg-green-700 hover:w-65 transition-all duration-300"
      >
        Register
      </button>

      <p className="mt-7 text-gray-600">
        already a user? -
        <Link to="/login" className="ml-2 text-[#0036fb] underline">
          Login
        </Link>
      </p>

      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </form>
  );
};

export default Login;
