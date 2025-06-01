import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const Submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setSuccess("Login Successful! Redirecting...");
      // console.log("Login Successful:", res.data);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      document.querySelectorAll("input").forEach((e) => {
        e.value = "";
        setEmail("");
        setPassword("");
      });
    }
  };

  return (
    <form
      onSubmit={Submit}
      className="flex flex-col items-center p-5 w-[350px] h-[380px] absolute top-60 bg-[#eddadae6] rounded-[50px] shadow-[8px_13px_4px_#00000040]"
    >
      <h1 className="text-black text-3xl mb-10">Login</h1>

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
        className="w-50 flex items-center justify-center gap-3 bg-green-600 font-bold text-md text-white px-6 py-2 rounded-2xl cursor-pointer
          hover:bg-green-700 hover:w-65 transition-all duration-300"
      >
        Login <FaArrowRightToBracket />
      </button>

      <p className="mt-7 text-gray-600">
        new user? -
        <Link to="/register" className="ml-2 text-[#0036fb] underline">
          register
        </Link>
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </form>
  );
};

export default Login;
