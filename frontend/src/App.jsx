import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./components/user/Layout";
import Home from "./components/user/Home";
import Profile from "./components/user/Profile";
import Settings from "./components/user/Settings";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Analytics />
      <SpeedInsights/>
    </>
  );
};

export default App;
