import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import FinanceLogo from "../components/FinanceLogo";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setRegisterMessage("");
    setRegisterSuccess(false);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setRegisterMessage("Please fill in all fields");
      return;
    }

    try {
      setRegisterLoading(true);

      const response = await api.post("/users/register", {
        username,
        email,
        password,
      });

      setRegisterSuccess(true);
      setRegisterMessage("Account created successfully.");

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setRegisterMessage(
          "The request took too long. Please check your internet connection and try again.",
        );
      } else if (!err.response) {
        setRegisterMessage(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );
      } else {
        setRegisterMessage(
          err.response.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
        {/* ================= DESKTOP ================= */}
        <div className="hidden min-h-screen lg:grid lg:grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col justify-center overflow-hidden px-12 xl:px-20">
            {/* Background decoration */}
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-300/10 blur-3xl" />

            <div className="relative z-10 max-w-xl">
              {/* Brand */}
              <Link to="/" className="flex items-center gap-2.5">
                <FinanceLogo />
              </Link>

              {/* Left */}
              <div className="mt-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                  Start your financial journey
                </p>

                <h1 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 xl:text-6xl">
                  Take control.
                  <span className="block text-emerald-600">
                    Build your future.
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
                  Create your Nivora workspace, understand your spending, and
                  make smarter financial decisions with confidence.
                </p>
              </div>

              {/* Financial journey visual */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-emerald-600"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M15 13h5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <circle cx="15" cy="13" r="1" fill="currentColor" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Your financial journey starts here
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Build better habits, one decision at a time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center px-8 pt-4">
            <div className="w-full max-w-md">
              {/* Register Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Create your Nivora account
                  </h2>

                  <p className="mt-3 text-sm text-slate-500">
                    Set up your workspace and start taking control of your
                    finances.
                  </p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Name
                    </label>

                    <input
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>

                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>

                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      type="password"
                      placeholder="Create a password"
                    />
                  </div>

                  {/* Message */}
                  {registerMessage && (
                    <div
                      className={`rounded-xl px-4 py-3 ${
                        registerSuccess
                          ? "border border-emerald-100 bg-emerald-50"
                          : "border border-red-100 bg-red-50"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          registerSuccess ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {registerMessage}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                    disabled={registerLoading}
                  >
                    {registerLoading ? "Creating account..." : "Create account"}
                  </button>
                </form>

                {/* Login */}
                <p className="mt-5 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex min-h-screen flex-col bg-slate-50 px-5 py-6 lg:hidden">
          {/* Top Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <FinanceLogo />
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              {/* Welcome */}
              <div>
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  Create your account
                </h1>

                <p className=" mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Set up your financial workspace and take control of your
                  money.
                </p>
              </div>

              {/* Register Form */}
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Name
                  </label>

                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                    type="password"
                    placeholder="Create a password"
                  />
                </div>

                {/* Message */}
                {registerMessage && (
                  <div
                    className={`rounded-xl px-4 py-3 ${
                      registerSuccess
                        ? "border border-emerald-100 bg-emerald-50"
                        : "border border-red-100 bg-red-50"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        registerSuccess ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {registerMessage}
                    </p>
                  </div>
                )}

                {/* Create Account */}
                <button
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={registerLoading}
                >
                  {registerLoading ? "Creating account..." : "Create account"}
                </button>
              </form>

              {/* Login */}
              <p className="mt-5 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom */}
          <p className="pt-5 text-center text-[11px] text-slate-400">
            Your personal financial workspace starts here
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
