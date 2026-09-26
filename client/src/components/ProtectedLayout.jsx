import React, { useEffect, useRef, useState } from "react";
import FinanceLogo from "./FinanceLogo";
import { NavLink, Outlet } from "react-router-dom";
import api from "../api";

const ProtectedLayout = () => {
  const [profile, setProfile] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile", {
          withCredentials: true,
        });

        setProfile(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const navigation = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transactions", path: "/transactions" },
    { label: "Budgets", path: "/budgets" },
    { label: "Insights", path: "/insights" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <FinanceLogo />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}

                    {isActive && (
                      <span className="absolute -inset-x-2 -top-1 h-9 rounded-t-xl border-x border-t border-emerald-200" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Navigation */}
            <div ref={mobileMenuRef} className="relative md:hidden">
              <button
                type="button"
                onClick={() => setShowMobileMenu((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <span className="text-lg">☰</span>
              </button>

              {showMobileMenu && (
                <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMobileMenu(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Outlet context={{ profile }} />
    </div>
  );
};

export default ProtectedLayout;
