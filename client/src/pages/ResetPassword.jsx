import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Text shown to user
  const [messageType, setMessageType] = useState(""); // success/error
  const [loading, setLoading] = useState(false); // Reseting...

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!password.trim() || !confirmPassword.trim()) {
      setMessage("Please fill in both password fields.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (!token) {
      setMessage("Invalid reset link.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/users/reset-password", {
        token,
        password,
      });

      setMessage(response.data.message);
      setMessageType("success");

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setMessage(
          "The request took too long. Please check your internet connection and try again.",
        );
      } else if (!err.response) {
        setMessage(
          "Unable to connect to the server. Please check your internet connection and try again.",
        );
      } else {
        setMessage(
          err.response.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center px-16">
        <div className="max-w-lg">
          <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
            AI Finance Manager
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">
            Secure your financial workspace.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            Create a new password and get back to managing your finances
            securely.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="min-h-screen flex items-start justify-center px-6 pt-16 pb-12 lg:items-center lg:px-8 lg:py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Reset your password
          </h2>

          <p className="mt-2 text-slate-500">Enter your new password below.</p>

          {!token ? (
            <div className="mt-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl font-bold text-red-500">!</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Invalid reset link
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                This password reset link is missing or invalid. Please request a
                new password reset link.
              </p>

              <Link
                to="/login"
                className="mt-6 block w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Back to Login
              </Link>
            </div>
          ) : messageType === "success" ? (
            <div className="mt-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <span className="text-2xl font-bold text-emerald-600">✓</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Password reset successfully
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Your password has been updated. You can now sign in with your
                new password.
              </p>

              <Link
                to="/login"
                className="mt-6 block w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* New Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {message && (
                  <p
                    className={`text-sm ${
                      messageType === "success"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Back to login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
