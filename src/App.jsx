import React, { useEffect } from "react";
import "aos/dist/aos.css";
import Home from "./pages/Home/Home";
import Layout from "./Layout/Layout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import Login from "./pages/Home/Login/Login";
import Profile from "./pages/Home/Student/Profile";

const App = () => {
  const { pathname } = useLocation();

  // Sahifani harakatlantirishda yuqoriga ko‘tarish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // AOS kutubxonasini yuklash
  useEffect(() => {
    const loadAOS = async () => {
      const AOS = await import("aos");
      AOS.init({
        once: true,
      });
    };
    loadAOS();
  }, []);

  // Tokenni localStorage'dan olish
  const token = localStorage.getItem("token");

  return (
    <Layout>
      <Routes>
        {/* Token mavjud bo‘lsa, Login sahifasiga kirishni cheklash */}
        <Route path="/login" element={token ? <Navigate to="/profile" /> : <Login />} />
        
        {/* Himoyalangan yo‘llar */}
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        
        {/* Ochiq yo‘llar */}
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Layout>
  );
};

export default App;
