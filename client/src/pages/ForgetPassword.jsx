import React from "react";
import api from "../api";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/forget-password", {
        email,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center px-8 py-10 lg:px-16">
        <div className="max-w-lg">
          <p className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
            AI Finance Manager
          </p>

          <p className="mt-5 text-3xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Take control of your finances.
          </p>

          <p className="mt-5 text-base lg:text-lg leading-7 lg:leading-8 text-slate-500">
            Track your money, understand your spending, and make better
            financial decisions with one simple platform.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Forget your Password?
          </h2>

          <p className="mt-2 text-slate-500">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-emerald-100"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* success */}
            {message && <p className="text-sm text-emerald-600">{message}</p>}

            {/* button */}
            <button
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Remember your password?
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
