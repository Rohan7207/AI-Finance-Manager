import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      console.log("Please fill all fields");
      return;
    }

    try {
      const userData = {
        email,
        password,
      };

      const response = await api.post("/users/login", userData);

      console.log("Login successful:", response.data);
      setUser(response.data.user);

      navigate("/dashboard");
    } catch (err) {
      console.log("Login failed:", err.response?.data || err.message);
    }
  }

  return (
    <div className="min-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-start px-8 py-10 lg:justify-center lg:px-16 lg:py-0">
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

            <div className="flex justify-end">
              <span className="text-sm font-semibold text-emerald-600 cursor-pointer hover:text-emerald-700">
                Forgot password?
              </span>
            </div>

            <button
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              type="submit"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <span className="font-semibold text-emerald-600 cursor-pointer hover:text-emerald-700">
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
