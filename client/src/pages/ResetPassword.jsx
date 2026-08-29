import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import FinanceLogo from "../components/FinanceLogo";

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
                  Secure your account
                </p>

                <h1 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 xl:text-6xl">
                  Get back in,{" "}
                  <span className=" mt-1 text-emerald-600">Stay secure.</span>
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
                  Create a new password and get back to managing your finances
                  with confidence.
                </p>
              </div>

              {/* Security visual */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 text-emerald-600"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3L19 6V11C19 15.5 16.1 19.3 12 21C7.9 19.3 5 15.5 5 11V6L12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Your account stays protected
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Secure password recovery for your financial workspace
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center px-8">
            <div className="w-full max-w-sm">
              {/* Reset Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Create a new password
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose a new password to secure your Nivora account.
                  </p>
                </div>

                {!token ? (
                  <div className="mt-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                      <span className="text-xl font-bold text-red-500">!</span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      Invalid reset link
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      This password reset link is missing or invalid. Please
                      request a new reset link.
                    </p>

                    <Link
                      to="/login"
                      className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                    >
                      Back to login
                    </Link>
                  </div>
                ) : messageType === "success" ? (
                  <div className="mt-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                      <span className="text-xl font-bold text-emerald-600">
                        ✓
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      Password updated
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Your password has been changed successfully. You can now
                      sign in with your new password.
                    </p>

                    <Link
                      to="/login"
                      className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
                    >
                      Continue to login
                    </Link>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                      {/* New Password */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          New password
                        </label>

                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a new password"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Confirm password
                        </label>

                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your new password"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                        />
                      </div>

                      {message && (
                        <div
                          className={`rounded-xl px-4 py-3 ${
                            messageType === "success"
                              ? "border border-emerald-100 bg-emerald-50"
                              : "border border-red-100 bg-red-50"
                          }`}
                        >
                          <p
                            className={`text-sm ${
                              messageType === "success"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {message}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? "Updating password..." : "Update password"}
                      </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-slate-500">
                      Remember your password?{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                      >
                        Back to login
                      </Link>
                    </p>
                  </>
                )}
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
          <div className="flex flex-1 mt-8 items-start justify-center">
            <div className=" w-full max-w-sm">
              <div>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  Reset your password
                </h1>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Create a new password and get back to your financial
                  workspace.
                </p>
              </div>

              {!token ? (
                <div className="mt-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <span className="text-xl font-bold text-red-500">!</span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    Invalid reset link
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    This reset link is missing or invalid. Please request a new
                    password reset link.
                  </p>

                  <Link
                    to="/login"
                    className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Back to login
                  </Link>
                </div>
              ) : messageType === "success" ? (
                <div className="mt-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                    <span className="text-xl font-bold text-emerald-600">
                      ✓
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    Password updated
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Your password has been changed successfully. You can now
                    sign in with your new password.
                  </p>

                  <Link
                    to="/login"
                    className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Continue to login
                  </Link>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    {/* New Password */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        New password
                      </label>

                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a new password"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Confirm password
                      </label>

                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
                      />
                    </div>

                    {message && (
                      <div
                        className={`rounded-xl px-4 py-3 ${
                          messageType === "success"
                            ? "border border-emerald-100 bg-emerald-50"
                            : "border border-red-100 bg-red-50"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            messageType === "success"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {message}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Updating password..." : "Update password"}
                    </button>
                  </form>

                  <p className="mt-7 text-center text-sm text-slate-500">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Back to login
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Bottom */}
          <p className="pt-5 text-center text-[11px] text-slate-400">
            Secure access to your financial workspace
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
