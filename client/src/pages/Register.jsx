import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

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

            {registerMessage && (
              <p
                className={`text-sm ${
                  registerSuccess ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {registerMessage}
              </p>
            )}

            <button
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={registerLoading}
            >
              {registerLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
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

export default Register;
