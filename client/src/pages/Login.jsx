import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="min-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-start px-8 py-10 lg:justify-center lg:px-16 lg:py-0">
          <div className="max-w-lg">
            <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
              AI Finance Manager
            </p>

            <p className="mt-5 text-3xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Welcome back to your financial workspace.
            </p>

            <p className="mt-5 text-base lg:text-lg leading-7 lg:leading-8 text-slate-500">
              Pick up where you left off and stay on top of your spending,
              goals, and financial decisions.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="min-h-screen flex items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back!
            </h2>

            <p className="mt-2 text-slate-500">
              Continue managing your finances.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              {loginMessage && (
                <p className="text-sm text-red-500">{loginMessage}</p>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setForgotMessage("");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={loginLoading}
              >
                {loginLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm min-h-[420px] rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Forgot your password?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter your email and we'll send you a link to reset your
                password.
              </p>
            </div>

            <form onSubmit={handleForgotPassword}>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
              />

              {forgotMessage && (
                <p
                  className={`mt-2 text-sm ${
                    forgotSuccess ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {forgotMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={forgotLoading}
                className="mt-4 w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {forgotLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="mt-5 w-full text-sm text-gray-500"
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
