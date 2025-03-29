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
      console.log("Registration successful:", res.data);
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
      className="flex flex-col items-center p-10 border border-gray-600 rounded-4xl shadow-lg shadow-gray-400"
    >
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">Register</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        className="border border-gray-500  p-3 rounded-2xl mb-6 w-72"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="border border-gray-500  p-3 rounded-2xl mb-6 w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border border-gray-500 p-3 rounded-2xl mb-6 w-72"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-50 bg-green-600 font-bold text-md text-white px-6 py-2 rounded-2xl cursor-pointer
          hover:bg-green-700 hover:w-full transition-all duration-300"
      >
        Register
      </button>

      <p className="mt-6 text-gray-600">
        Already have an account?
        <Link to="/auth/login" className="ml-2 text-blue-600 underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Login;
