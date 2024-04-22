"use client";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "./redux/api/userApi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/home/HomePage";
import ContactPage from "./pages/public/contact/ContactPage";
import AboutPage from "./pages/public/about/AboutPage";
import BlogPage from "./pages/services/BlogPage";
import ExchangePage from "./pages/services/ExchangePage";
import MobilePage from "./pages/services/MobilePage";
import ReportPage from "./pages/services/ReportPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/public/auth/SignInPage";
import SignUpPage from "./pages/public/auth/SignUpPage";
import DashboardAdminPage from "./pages/admin/dashboard/DashboardAdminPage";
import ProfileUserPage from "./pages/user/ProfileUserPage";
import ProfileAdminPage from "./pages/admin/profile/ProfileAdmin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: userData, isSuccess: userSuccess } = useGetUserQuery();

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("access_token") && cookies.get("refresh_token")) {
      setIsLoggedIn(true);
    }

    if (userSuccess) {
      cookies.set("user_role", userData.user.role);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSuccess, userData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {isLoggedIn && userSuccess ? (
          <>
            {cookies.get("user_role") === "ADMIN" ? (
              <>
                <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
                <Route path="/admin/profile" element={<ProfileAdminPage />} />
              </>
            ) : (
              <Route path="/" element={<HomePage />} />
            )}
          </>
        ) : null}

        {isLoggedIn ? (
          <>
            <Route path="/report" element={<ReportPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/mobile" element={<MobilePage />} />
            <Route path="/exchange" element={<ExchangePage />} />
            <Route path="/user/profile" element={<ProfileUserPage />} />
          </>
        ) : null}

        {!isLoggedIn && (
          <>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
