import React, { useEffect, useRef, useState } from "react";
import FinanceLogo from "./FinanceLogo";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const ProtectedLayout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const mobileMenuRef = useRef(null);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }

      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
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

  const handleLogout = async () => {
    try {
      await api.post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
      setProfile(null);
      setShowAccountMenu(false);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

            {/* Account */}
            <div ref={accountMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowAccountMenu((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  {/* Profile summary */}
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {profile?.username || "User"}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-slate-400">
                      {profile?.email || "No email available"}
                    </p>
                  </div>

                  {/* Account */}
                  <div className="p-2">
                    <NavLink
                      to="/account"
                      onClick={() => setShowAccountMenu(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      <span className="text-base">👤</span>
                      Account
                    </NavLink>

                    {/* Logout will be connected next */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <span className="text-base">↪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
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
