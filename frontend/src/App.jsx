import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome"; // Import Welcome page
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/auth/Login"; // Your login page
import Register from "./components/auth/Register"; // Your register page
import Layout from "./components/user/Layout"; // Import Layout
import Home from "./components/user/Home"; // Import Home
import Profile from "./components/user/Profile"; // Import Profile
import About from "./components/user/About";
import Settings from "./components/user/Settings";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
};

export default App;
