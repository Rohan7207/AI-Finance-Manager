import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      console.log("Please fill all fields");
      return;
    }

    try {
      const userData = {
        username,
        email,
        password,
      };

      const response = await api.post("/users/register", userData);

      console.log("Registration successful:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.log("Registration failed:", err.response?.data || err.message);
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
      <div className="h-screen flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h2>

          <p className="mt-2 text-slate-500">
            Start managing your finances today.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-full border rounded-lg border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                type="text"
                placeholder="Enter your name"
              />
            </div>

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

            <button
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              type="submit"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <span className="font-semibold text-emerald-600 cursor-pointer hover:text-emerald-700">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
