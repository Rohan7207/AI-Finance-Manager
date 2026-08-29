import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import FinanceLogo from "../components/FinanceLogo";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  async function handleForgotPassword(e) {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      setForgotSuccess(false);
      setForgotMessage("Please enter your email address.");
      return;
    }

    try {
      setForgotLoading(true);
      setForgotMessage("");
      setForgotSuccess(false);

      const response = await api.post("/users/forgot-password", {
        email: forgotEmail,
      });

      setForgotMessage(response.data.message);
      setForgotSuccess(true);
    } catch (err) {
      setForgotSuccess(false);

      if (err.code === "ECONNABORTED") {
        setForgotMessage(
          "The request took too long. Please check your internet connection and try again.",
        );
      } else if (!err.response) {
        setForgotMessage(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );
      } else {
        setForgotMessage(
          err.response.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setForgotLoading(false);
    }

    setForgotEmail("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoginMessage("");

    if (!email.trim() || !password.trim()) {
      setLoginMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoginLoading(true);

      const response = await api.post("/users/login", {
        email,
        password,
      });

      setUser(response.data.user);

      navigate("/dashboard");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setLoginMessage(
          "The request took too long. Please check your internet connection and try again.",
        );
      } else if (!err.response) {
        setLoginMessage(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );
      } else {
        setLoginMessage(
          err.response.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setLoginLoading(false);
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

              <div className="mt-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                  Your financial workspace
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 xl:text-6xl">
                  Welcome back.
                  <span className="block text-emerald-600">
                    Your money is waiting.
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
                  Continue tracking your spending, managing your budget, and
                  making clearer financial decisions.
                </p>
              </div>

              {/* Small financial visual */}
              <div className="mt-12 flex items-end gap-2">
                {[30, 45, 38, 58, 50, 72, 64, 82].map((height, index) => (
                  <div
                    key={index}
                    className="w-5 rounded-t-md bg-emerald-500/20"
                    style={{ height: `${height}px` }}
                  >
                    <div
                      className="w-full rounded-t-md bg-emerald-500"
                      style={{
                        height: `${height * 0.65}px`,
                      }}
                    />
                  </div>
                ))}

                <span className="ml-4 mb-1 text-xs font-medium text-slate-400">
                  Your financial progress
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center px-8">
            <div className="w-full max-w-md">
              {/* Login Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Sign in to Nivora
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Continue where you left off.
                  </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">
                        Password
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(true);
                          setForgotMessage("");
                        }}
                        className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {loginMessage && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-sm text-red-600">{loginMessage}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Signing in..." : "Sign in"}
                  </button>
                </form>

                {/* Register */}
                <p className="mt-5 text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Create one
                  </Link>
                </p>
              </div>

              <p className="mt-5 text-center text-xs text-slate-400">
                Secure access to your financial workspace
              </p>
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
          <div className="flex flex-1 mt-8 items-start justify-center">
            <div className="w-full max-w-sm">
              {/* Welcome */}
              <div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h1>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Let's pick up where you left off.
                </p>
              </div>

              {/* Login Form */}
              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
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

                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Forgot Password */}
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(true);
                        setForgotMessage("");
                      }}
                      className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Error */}
                {loginMessage && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">{loginMessage}</p>
                  </div>
                )}

                {/* Sign In */}
                <button
                  className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {/* Register */}
              <p className="mt-5 text-center text-sm text-slate-500">
                New to Nivora?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom */}
          <p className="pt-5 text-center text-[11px] text-slate-400">
            Secure access to your financial workspace
          </p>
        </div>
      </div>

      {/* ================= FORGOT PASSWORD MODAL ================= */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Forgot your password?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your email and we'll send you a secure link to reset your
                password.
              </p>
            </div>

            <form onSubmit={handleForgotPassword}>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />

              {forgotMessage && (
                <div
                  className={`mt-3 rounded-xl px-4 py-3 ${
                    forgotSuccess
                      ? "border border-emerald-100 bg-emerald-50"
                      : "border border-red-100 bg-red-50"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      forgotSuccess ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {forgotMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={forgotLoading}
                className="mt-5 w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {forgotLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-4 w-full rounded-xl py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              Back to login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
